# Controller for interacting with medical records
# This is a protected class and requires the user to login before it can access any of the functions
#
#
# @author Justin Barclay & Mackenzie Bligh
# @see https://github.com/CMPUT401/vettr_server/wiki/API-Documentation#images
class MedicalRecordsController < ApplicationController
  before_action :authenticate_user

  # Handles POST requests to store medications and medical records, route: /api/patients/:patient_id/medical_records.
  # @example
  #   {
  #   "medical_record": {
  #                       "patient_id": "integer",
  #                      "data": "datetime",
  #                      "summary": "string"
  #                       "signature": "text",
  #                      "temperature": "float",
  #                      "exam_notes": "text",
  #                      "eyes": "string",
  #                      "oral": "string",
  #                      "ears": "string",
  #                      "glands": "string",
  #                      "skin": "string",
  #                      "abdomen": "string",
  #                      "urogenital": "string",
  #                      "nervousSystem": "string",
  #                      "musculoskeletal": "string",
  #                      "cardiovascular": "string",
  #                      "heart_rate": "integer",
  #                      "respiratory": "string",
  #                      "respiratory_rate": "integer",
  #                      "attitudeBAR": "Boolean",
  #                      "attitudeQAR": "Boolean",
  #                      "attitudeDepressed": "Boolean",
  #                      "eyesN": "Boolean",
  #                      "eyesA": "Boolean",
  #                      "mmN": "Boolean",
  #                      "mmPale": "Boolean",
  #                      "mmJaundiced": "Boolean",
  #                      "mmTacky": "Boolean",
  #                      "earsN": "Boolean",
  #                      "earsA": "Boolean",
  #                      "earsEarMites": "Boolean",
  #                      "earsAU": "Boolean",
  #                      "earsAD": "Boolean",
  #                      "earsAS": "Boolean",
  #                      "glandsN": "Boolean",
  #                      "glandsA": "Boolean",
  #                      "skinN": "Boolean",
  #                      "skinA": "Boolean",
  #                      "abdomenN": "Boolean",
  #                      "abdomenA": "Boolean",
  #                      "urogenitalN": "Boolean",
  #                      "urogenitalA": "Boolean",
  #                      "nervousSystemN": "Boolean",
  #                      "nervousSystemA": "Boolean",
  #                      "musculoskeletalN": "Boolean",
  #                      "musculoskeletalA": "Boolean",
  #                      "cardiovascularN": "Boolean",
  #                      "cardiovascularA": "Boolean",
  #                      "respiratoryN": "Boolean",
  #                      "respiratoryA": "Boolean"
  #                     }
  #   }
  # @example success
  #  {
  #      "success": true
  #  }
  # @example failure
  #   {
  #     "success": false,
  #     "errors": [....] // list of errors
  #   }
  # @return HTTP 201 on success, JSON
  # @return HTTP 500 on failure, JSON
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

  # Handles GET requests to view a medical records, route: /api/patients/:patient_id/medical_records/:id.
  # @example response
  #   {
  #   "success": true,
  #   "medical_record": {
  #                       "patient_id": "integer",
  #                      "data": "datetime",
  #                      "summary": "string"
  #                       "signature": "text",
  #                      "temperature": "float",
  #                      "exam_notes": "text",
  #                      "eyes": "string",
  #                      "oral": "string",
  #                      "ears": "string",
  #                      "glands": "string",
  #                      "skin": "string",
  #                      "abdomen": "string",
  #                      "urogenital": "string",
  #                      "nervousSystem": "string",
  #                      "musculoskeletal": "string",
  #                      "cardiovascular": "string",
  #                      "heart_rate": "integer",
  #                      "respiratory": "string",
  #                      "respiratory_rate": "integer",
  #                      "attitudeBAR": "Boolean",
  #                      "attitudeQAR": "Boolean",
  #                      "attitudeDepressed": "Boolean",
  #                      "eyesN": "Boolean",
  #                      "eyesA": "Boolean",
  #                      "mmN": "Boolean",
  #                      "mmPale": "Boolean",
  #                      "mmJaundiced": "Boolean",
  #                      "mmTacky": "Boolean",
  #                      "earsN": "Boolean",
  #                      "earsA": "Boolean",
  #                      "earsEarMites": "Boolean",
  #                      "earsAU": "Boolean",
  #                      "earsAD": "Boolean",
  #                      "earsAS": "Boolean",
  #                      "glandsN": "Boolean",
  #                      "glandsA": "Boolean",
  #                      "skinN": "Boolean",
  #                      "skinA": "Boolean",
  #                      "abdomenN": "Boolean",
  #                      "abdomenA": "Boolean",
  #                      "urogenitalN": "Boolean",
  #                      "urogenitalA": "Boolean",
  #                      "nervousSystemN": "Boolean",
  #                      "nervousSystemA": "Boolean",
  #                      "musculoskeletalN": "Boolean",
  #                      "musculoskeletalA": "Boolean",
  #                      "cardiovascularN": "Boolean",
  #                      "cardiovascularA": "Boolean",
  #                      "respiratoryN": "Boolean",
  #                      "respiratoryA": "Boolean"
  #                     }
  #   }
  # @return HTTP 200 on success, JSON
  # @return HTTP 404 on failure, JSON

  def show
    @medical_record = MedicalRecord.find_by(id: params[:id])
    @medications = Medication.where("medical_record_id = ?", params[:id])

    if @medical_record
      render json: { success: true, medical_record: @medical_record, medications: @medications}
    else
      render status: :error, json: { success: false, error: 'Medical Record not found' }
    end
  end

  # Handles GET requests to get the index of medical records for a patient, route: /api/patients/:patient_id/medical_records.
  # @example response
  #   {
  #     "success": "true",
  #     "medical_records": [{"id": integer, "summary": text, "created_at": integer}...]
  #   }
  # @return HTTP 200 on success, JSON
  
  def index
    patient = Patient.find_by(id: params[:patient_id]).medical_records.order(created_at: :desc)
    filtered_records = filter_medical_records_keys patient
    render status: 200, json: { success: true, medical_records: filtered_records }
  end
  # Handles PUT/PATCH requests to update medications and medical records, route: /api/patients/:patient_id/medical_records/:id.
  # @example
  #   {
  #   "medical_record": {
  #                       "patient_id": "integer",
  #                      "data": "datetime",
  #                      "summary": "string"
  #                       "signature": "text",
  #                      "temperature": "float",
  #                      "exam_notes": "text",
  #                      "eyes": "string",
  #                      "oral": "string",
  #                      "ears": "string",
  #                      "glands": "string",
  #                      "skin": "string",
  #                      "abdomen": "string",
  #                      "urogenital": "string",
  #                      "nervousSystem": "string",
  #                      "musculoskeletal": "string",
  #                      "cardiovascular": "string",
  #                      "heart_rate": "integer",
  #                      "respiratory": "string",
  #                      "respiratory_rate": "integer",
  #                      "attitudeBAR": "Boolean",
  #                      "attitudeQAR": "Boolean",
  #                      "attitudeDepressed": "Boolean",
  #                      "eyesN": "Boolean",
  #                      "eyesA": "Boolean",
  #                      "mmN": "Boolean",
  #                      "mmPale": "Boolean",
  #                      "mmJaundiced": "Boolean",
  #                      "mmTacky": "Boolean",
  #                      "earsN": "Boolean",
  #                      "earsA": "Boolean",
  #                      "earsEarMites": "Boolean",
  #                      "earsAU": "Boolean",
  #                      "earsAD": "Boolean",
  #                      "earsAS": "Boolean",
  #                      "glandsN": "Boolean",
  #                      "glandsA": "Boolean",
  #                      "skinN": "Boolean",
  #                      "skinA": "Boolean",
  #                      "abdomenN": "Boolean",
  #                      "abdomenA": "Boolean",
  #                      "urogenitalN": "Boolean",
  #                      "urogenitalA": "Boolean",
  #                      "nervousSystemN": "Boolean",
  #                      "nervousSystemA": "Boolean",
  #                      "musculoskeletalN": "Boolean",
  #                      "musculoskeletalA": "Boolean",
  #                      "cardiovascularN": "Boolean",
  #                      "cardiovascularA": "Boolean",
  #                      "respiratoryN": "Boolean",
  #                      "respiratoryA": "Boolean"
  #                     }
  #   }
  # @example success
  #  {
  #      "success": true
  #  }
  # @example failure
  #   {
  #     "success": false,
  #     "errors": [....] // list of errors
  #   }
  # @return HTTP 201 on success, JSON
  # @return HTTP 500 on failure, JSON
  def update
    @record = MedicalRecord.find_by(id: params[:id])
    @medications = params[:medications]

    # let's exit early
    puts
    unless @record.created_at.today?
      render status: :error, json: { success: false, error: "Medical Record is not editable after 1 day"}
      return
    end 

    #not nesting too deep
    if @record.update(medical_record_params)
      unless @medications.nil?
        updateMedication(@medications, @record[:id])
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
    params.require(:medical_record).permit(:summary, :date, :exam_notes, :signature, :temperature, :eyes, :oral,
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

  def updateMedication(medications, medical_record_id)
    # Here is how to update, this needs to handle the case where they add new medication to the medical record as well
    errors = []
    medications.each do |medication_num|
      filtered_medication = medications[medication_num].permit(:name, :patient_id, :medical_record_id, :reminder,
                                                               :date, :med_type, :id)

      med = Medication.find_by(id: filtered_medication[:id])
      if med == nil
        filtered_medication[:medical_record_id] = medical_record_id
        medication = Medication.new filtered_medication
        medication.save
        errors.push medication.errors.full_messages
      elsif med.created_at.today?
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



