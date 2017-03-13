class MedicalRecordsController < ApplicationController
  before_action :authenticate_user

  def create
    medicine = medicine_params
    @medical_record = MedicalRecord.new medical_record_params
  
    if @medical_record.save
      if not medicine.nil?
        save_medicine_in_db(medicine, @medical_record.id)
        puts Medice.all.to_json
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

  private

  def filter_medical_records_keys(medical_records)
    medical_records.map do |medical_record|
      { id: medical_record.id, exam_notes: medical_record.exam_notes, created_at: medical_record.created_at.to_i }
    end
  end

  def save_medicine_in_db(medicine, medical_record_id)
    if medicine.kind_of?(Array)
      medicine.each do |med|
        med.medical_record_id = medical_record_id
        Medicine.new med
      end
    else
      medicine = JSON.parse(medicine).attributes
      @med = Medicine.new(name: medicine, patient_id: medicine['patient_id'])
      puts @med.to_json
      @med.medical_record_id = medical_record_id
      @med.save
      puts @med.errors.full_message
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
                                           :respiratoryA, :patient_id)
  end

  def medicine_params
    params.require(:medicine).permit(:name, :patient_id)
  end
  
end



