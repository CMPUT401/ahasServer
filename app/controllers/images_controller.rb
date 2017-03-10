class ImagesController < ApplicationController
  include Rails.application.routes.url_helpers
  before_action :authenticate_user

  def index
    filter = params[:filter]
    filtered_images = filter_index(Patient.find_by(id: params[:patient_id]).images,
                                   filter)
    filtered_images = add_location filtered_images
    render json: { success: true, images: filtered_images }
  end

  private

  def filter_index(images, filter)
    images.select do |image|
      image.picture_type == filter
    end
  end

  def add_location(images)
    images.map do |image|
      image.location = asset_url image.name
    end
  end

end
