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
    @medications = Medication.where("medical_record_id = ?", params[:id])
    if @medical_record
      render json: { success: true, medical_record: @medical_record, medications: @medications }
    else
      render status: :error, json: { success: false, error: 'Medical Record not found' }
    end
  end

  def index
    patient = Patient.find_by(id: params[:patient_id]).medical_records.order(created_at: :desc)
    filtered_records = filter_medical_records_keys patient
    render status: 200, json: { success: true, medical_records: filtered_records }
  end
def update
    @record = MedicalRecord.find_by(id: params[:id])
    @medications = params[:medications]
    #puts "record created today " + @record.created_at.today?.to_s

    # let's exit early
    unless @record.created_at.today?
      render status: :error, json: { success: false, error: "Medical Record is not editable after 1 day"}
      return
    end 

    #not nesting too deep
    if @record.update(medical_record_params)
      unless @medications.nil?
        updateMedication @medications
      end
      render status: 201, json: { success: true }
    else
      render status: :error, json: {success: false, errors: @record.errors.full_messages}
    end
end
    private
  def filter_medical_records_keys(medical_records)
    medical_records.map do |medical_record|
      { id: medical_record.id, summary: medical_record.summary, created_at: medical_record.created_at.to_i }
    end
  end

  def medical_record_params
    params.require(:medical_record).permit(:summary, :date, :exam_notes, :signature, :temperature, :medications, :eyes, :oral,
                                           :ears, :glands, :skin, :abdomen, :urogenital, :follow_up_instructions,
                                           :nervousSystem, :musculoskeletal, :cardiovascular, :heart_rate,
                                           :respiratory, :respiratory_rate, :attitudeBAR, :attitudeQAR,
                                           :attitudeDepressed, :eyesN, :eyesA, :mmN, :mmPale, :mmJaundiced,
                                           :mmTacky, :earsN, :earsA, :earsEarMites, :earsAU, :earsAD,
                                           :earsAS, :glandsN, :glandsA, :skinN, :skinA, :abdomenN, :mcsMod, :oralA, :oralN,
                                           :abdomenA, :urogenitalN, :urogenitalA, :nervousSystemN, :nervousSystemA,
                                           :musculoskeletalN, :musculoskeletalA, :cardiovascularN, :cardiovascularA, :respiratoryN,
                                           :respiratoryA, :patient_id, :mcsN, :mcsSevere, :weight, :weightUnit, :bcsVal, :mcsMild)
  end

  def create_medications(medications, medical_record_id)
    success = nil
    medication_records = parse_medications(medications, medical_record_id)
    Medication.transaction do
      success = medication_records.each(&:save)
      unless success.all?
        raise ActiveRecord::Rollback
      end
    end
    medication_records
  end

  def updateMedication(medications)
    # Here is how to update, this needs to handle the case where they add new medication to the medical record as well 
    errors = []
    medications.each do |medication_num|
      filtered_medication = medications[medication_num].permit(:name, :patient_id, :medical_record_id, :reminder,
                                                               :date, :med_type, :id)

      med = Medication.find(filtered_medication[:id]) #This is going to break on us, learn the difference between find and find_by
      if med.created_at.today?
        med.update filtered_medication
        errors.push med.errors.full_messages
      else
        errors.push 'Medication is not editable after 1 day'
      end
    end
    errors
  end
  
  def parse_medications(medications, medical_record_id)
    meds = []
    medications.each do |medication_num|
      medication = medications[medication_num]
      medication[:medical_record_id] = medical_record_id
      meds.append Medication.new medication.permit(:name, :patient_id, :medical_record_id, :reminder,
                                       :date, :med_type)
    end
    meds
  end
end



