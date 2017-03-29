# Primary controller for interacting with images
# This is a protected class and requires the user to login before it can access any of the functions
#
#
# @author Justin Barclay & Mackenzie Bligh
# @see https://github.com/CMPUT401/vettr_server/wiki/API-Documentation#images
class ImagesController < ApplicationController
  include Rails.application.routes.url_helpers
  before_action :authenticate_user

  # Handles POST request to store images, route: /api/patients/:patient_id/images.
  # @example request
  #  {
  #    "success": "true"
  #    "image":
  #      {
  #        "name": "string",
  #        "data": "string",
  #        "id": "integer",
  #        "picture_type": {"lab_result", "radiograph", "portrait"},
  #        "patient_id": "integer",
  #        "date": "unix time",
  #      }
  #  }
  # @example success
  #   { 
  #     "success": true
  #   }
  # @example failure
  #   {
  #    "success": false,
  #    "errors": [....] // list of errors
  #   }
  # @return HTTP 201 on success, JSON
  # @return HTTP 500 on failure, JSON
  def create
    image = Image.new image_params
    patient_id = params[:patient_id]
    unless patient_id == image.patient_id.to_s
      render status: :error, json: { success: false, error: 'Patient ID does not match route' }
      return
    end
    if image.save
      if image.picture_type == 'portrait'
        patient = image.patient
        patient.portrait_id = image.id
        patient.save
      end
      render status: 201, json: { success: true }
    else
      render status: :error, json: { success: false, errors: image.errors.full_messages }
    end
  end

  # Handles GET request to get index for a patients images, route: /api/patients/:patient_id/images.
  # @example
  #   {
  #     "success": "true"
  #     "images": 
  #        [{
  #          "name": "string",
  #          "id": "integer",
  #          "picture_type": {"lab_result", "radiograph", "portrait"},
  #          "date": "unix time",
  #        }...]
  #   }
  #  @return HTTP 200
  def index
    filtered_images = filter_fields(Patient.find_by(id: params[:patient_id]).images.order(date: :desc))
    render satus: 200, json: { success: true, images: filtered_images }
  end

  # Handles GET request to get a filtered index of patients images, route: /api/patients/:patient_id/images/filter/:filter.
  # @example
  #   {
  #     "success": "true"
  #     "images": 
  #        [{
  #          "name": "string",
  #          "id": "integer",
  #          "picture_type": :filter,
  #          "date": "unix time",
  #        }...]
  #   }
  #  @return HTTP 200, JSON
  def filter
    filter = params[:filter]

    if ['lab_result', 'radiograph', 'portrait'].include? filter
      filtered_images = filter_fields(Patient.find_by(id: params[:patient_id]).images.where('picture_type = ?', filter).order(date: :desc))
      render satus: 200, json: { success: true, images: filtered_images }
    else
      render status: :error, json: { success: false, error: 'Filter does not exist' }
    end
  end
  # Handle GET request for a single image for a patient, route: /api/patients/:patient_id/image/:id.
  # @example response
  #   {
  #     "success": "true"
  #     "images": 
  #      {
  #        "name": "string",
  #        "data": "string",
  #        "picture_type": {"lab_result", "radiograph", "portrait"},
  #        "patient_id": "integer",
  #        "date": "unix time",
  #      }
  #   }
  # @example Failure
  #  { 
  #    "success": false,
  #    "errors": [....] // list of errors
  #  }
  # @return HTTP 200, JSON
  # @return HTTP 500, JSON
  def show
    image = Image.find_by(id: params[:id])

    if image
      render status: 200, json: { success: true, image: image }
    else
      render status: 404, json: { success: false }
    end
  end

  private

  # A private method to parse image params
  # @return Hash
  def image_params
    params.require(:image).permit(:data, :picture_type, :name, :patient_id, :date, :data_type)
  end

  # A private method to filter only necessary data for index methods
  # @return Array
  def filter_fields(images)
    images.map do |image|
      { name: image.name, date: image.date, picture_type: image.picture_type, id: image.id }
    end
  end
end
