class MedicationController < ApplicationController
  before_action :authenticate_user

  def create
    medication = parse_meication_params
    Medicine.transaction do
      success = medication.map(&:save)
      unless success.all?
        errored = medication.select { |medicine| !medicine.error.blank? } # Do we need to do anything?
        render status: :error, json: { errors: errored }
        raise ActiveRecord::Rollback
      end
      render status: 201, json: { success: true }
    end
  end

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

  private

  def parse_medication_params
    params[:medication].map do |medicine|
      Medicine.new medicine.permit(:name, :patient_id, :medical_record_id, :date)
    end
  end
end
