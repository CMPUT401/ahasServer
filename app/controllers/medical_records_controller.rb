class MedicalRecordsController < ApplicationController
  before_action :authenticate_user

  def create
    medications = params[:medications]
    @medical_record = MedicalRecord.new medical_record_params

    if @medical_record.save
      unless medications.nil?
        create_medications(medications, @medical_record.id)
      end
      render status: 201, json: { success: true }
    else
      render status: :error, json: { success: false, errors: @medical_record.errors.full_messages }
    end
  end

  def show
    @medical_record = MedicalRecord.find_by(id: params[:id])
    if @medical_record
      render json: { success: true, medical_record: @medical_record }
    else
      render status: :error, json: { success: false, error: 'Medical Record not found' }
    end
  end

  def index
    patient = Patient.find_by(id: params[:patient_id])
    filtered_records = filter_medical_records_keys patient.medical_records
    render status: 200, json: { success: true, medical_records: filtered_records }
  end

  def update
    @record = MedicalRecord.find_by(id: params[:id])

    #puts "record created today " + @record.created_at.today?.to_s

    if @record.created_at.today?
      if @record.update(medical_record_params)
        render status: 201, json: {success: true}
      else
        render status: :error, json: {success: false, errors: @record.errors.full_messages}
      end
    else
      render status: :error, json: { success: false, error: "Medical Record is not editable after 1 day"}
    end

  end
  private
  def filter_medical_records_keys(medical_records)
    medical_records.map do |medical_record|
      { id: medical_record.id, exam_notes: medical_record.exam_notes, created_at: medical_record.created_at.to_i }
    end
  end

  def medical_record_params
    params.require(:medical_record).permit(:summary, :date, :exam_notes, :signature, :temperature, :medications, :eyes, :oral,
                                           :ears, :glands, :skin, :abdomen, :urogential, :follow_up_instructions,
                                           :nervousSystem, :musculoskeletal, :cardiovascular, :heart_rate,
                                           :respiratory, :respiratory_rate, :attitudeBAR, :attitudeQAR,
                                           :attitudeDepressed, :eyesN, :eyesA, :mmN, :mmPale, :mmJaundiced,
                                           :mmTacky, :earsN, :earsA, :earsEarMites, :earsAU, :earsAD,
                                           :earsAS, :glandsN, :glandsA, :skinN, :skinA, :abdomenN,
                                           :abdomenA, :urogentialN, :urogentialA, :nervousSystemN, :nervousSystemA,
                                           :musculoskeletalN, :musculoskeletalA, :cardiovascularN, :cardiovascularA, :respiratoryN,
                                           :respiratoryA, :patient_id, :mcsN, :mcsSevere, :weight, :weightUnit, :bcsVal, :mcsMild)
  end

  def create_medications(medications, medical_record_id)
    success = nil
    medication_records = parse_medications(medications, medical_record_id)
    Medication.transaction do
      success = medication_records.map(&:save)
      unless success.all?
        raise ActiveRecord::Rollback
      end
    end
    success
  end

  def parse_medications(medications, medical_record_id)
    medications.map do |medication|
      medication['medical_record_id'] = medical_record_id
      Medication.new medication.permit(:name, :patient_id, :medical_record_id,
                                       :date, :med_type)
    end
  end

end



