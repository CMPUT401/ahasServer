class MedicationsController < ApplicationController
  before_action :authenticate_user

  def show
    medication = Medication.find_by(id: params[:id])

    if medication
      render json: { success: true, medication: medication }
    else
      render status: 404, json: { success: false, error: 'Medication not found' }
    end
  end

  def index
    medications = Patient.find_by(id: params[:patient_id]).medications
    if medications
      render json: { success: true, medications: medications }
    else
      render status: 404, json: { success: false, error: 'Medication not found' }
    end
  end

  private
end
