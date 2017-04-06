# Controller for interacting with medications
# This is a protected class and requires the user to login before it can access any of the functions
#
#
# @author Justin Barclay & Mackenzie Bligh
# @see https://github.com/CMPUT401/vettr_server/wiki/API-Documentation#medications

class MedicationsController < ApplicationController
  before_action :authenticate_user

  # Handles GET requests to get a medication, route: /api/patients/:patient_id/medications/:id
  # @return HTTP 200, JSON
  # @return HTTP 404, JSON
  def show
    medication = Medication.find_by(id: params[:id])
    if medication
      render json: { success: true, medication: medication }
    else
      render status: 404, json: { success: false, error: 'Medication not found' }
    end
  end

  # Handles GET request for index of all medication for a patient, route: /api/patients/:paient_id/medications
  # @example reponse
  #   {
  #     "success": "true",
  #    "patient_id": integer,
  #    "medications": [{"id": integer, "type": string, "name": string "reminder": date as integer}...]
  #   }
  # @return HTTP 200, JSON
  def index
    medications = Patient.find_by(id: params[:patient_id]).medications
    if medications
      render json: { success: true, medications: filter_type(medications) }
    else
      render status: 404, json: { success: false, error: 'Medication not found' }
    end
  end

  # def filter
  #   medications
  # end

  # Handles HTTP DELETE request sent to /api/medications/{id}, and replies with a true response, or an error in a JSON.
  # @example request body
  # @example success response
  #   {"success":true}
  # @example failure response
  #   {
  #    "success": false,
  #    "errors": [....] // list of errors
  #    }
  #
  # @todo add to wiki page.
  #
  # @return HTTP 200 if success: true JSON
  # @return HTTP 404 if schedule instance not found: false JSON
  # @return HTTP 500 if error updating schedule instance: false JSON
  def destroy
    @medication= Medication.find_by(id: params[:id])

    if @medication.nil?
      render status: 404, json: {success: false, error: "Schedule not found"}
    elsif @medication.destroy
      render json: { success: true}
    else
      render status: 500, json: {success: false, errors: @medication.errors.full_messages}
    end

  end

  private

  def filter_type(medications)
    type = params[:med_filter]
    if !type.nil?
      medications.select do |medication|
        type == medication.med_type
      end
    else
      medications
    end
  end

  def medication_params
    params.require(:medications).permit(:name, :reminder, :med_type)
  end
end
