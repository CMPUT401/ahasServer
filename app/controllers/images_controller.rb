class ImagesController < ApplicationController
  include Rails.application.routes.url_helpers
  before_action :authenticate_user
  
  def create
    image = Image.new image_params
    patient_id = params[:patient_id]
    unless patient_id == image.patient_id
      render status: :error, json: { success: false, error: "Patient ID does not match route" }
    end
    if image.save
      puts 'success'
      render status: 201, json: { success: true }
    else
      puts 'failure'
      render status: :error, json: { success: false, errors: image.errors.full_messages }
    end
  end

  def index
    filtered_images = filter_fields(Patient.find_by(id: params[:patient_id]).images.order(date: :desc))
    render satus: 200, json: { success: true, images: filtered_images }
  end

  def filter
    filter = params[:filter]
    if  ["lab_result", "radiograph", "portrait"].include? filter
       filtered_images = filter_fields(Patient.find_by(id: params[:patient_id]).images.where("picture_type = ?", filter).order(date: :desc))
       render satus: 200, json: { success: true, images: filtered_images }
    else
      render status: :error, json: { success: false, error: "Filter does not exist" }
    end
  end
  def show
    image = Image.find(:id)

    if image
      render status: 200, json: { success: true, image: image }
    else
      render status: 404, json: { success: false }
    end
  end

  private

  def image_params
    params.require(:image).permit(:data, :picture_type, :name, :patient_id, :date)
  end

  def filter_index(images, filter)
    images.select do |image|
      image.picture_type == filter
    end
  end

  def filter_fields(images)
    images.map do |image|
      { name: image.name, date: image.date, picture_type: image.picture_type, id: image.id }
    end
  end

  def add_location(images)
    # Attach asset_path to json
    images.map do |image|
      image.location = ActionController::Base.helpers.asset_path(image.name)
    end
  end

end
