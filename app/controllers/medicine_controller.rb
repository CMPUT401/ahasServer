class MedicineController < ApplicationController
  before_action :authenticate_user

  def show
    medicine = Medicine.find_by(id: params[:id])

    if medicine
      render json: { success: true, medicine: medicine }
    else
      render status: 404, json: { success: false, error: 'Medicine not found' }
    end
  end

    def index
    medicine = Patient.find_by(id: params[:patient_id]).medicine

    if medicine
      render json: { success: true, medicine: medicine }
    else
      render status: 404, json: { success: false, error: 'Medicine not found' }
    end
  end
end
