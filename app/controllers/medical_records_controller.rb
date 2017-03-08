class MedicalRecordsController < ApplicationController
  def create
    
    @medical_record = MedicalRecord.new(medical_record_params)

    if @medical_record.save
      render status: 201, json: { success: true }
    else
      render status: :error, json: { success: false, errors: @medical_record.errors.full_messages}
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
  
  private

  def medical_record_params
    params.require(:medical_record).permit(:temperature, :notes, :medications, :eyes, :oral,
                                    :ears, :glands, :skin, :abdomen, :urogential,
                                    :nervousSystem, :musculoskeletal, :cardiovascular, :heart_rate,
                                    :respiratory, :respiratory_rate, :attitudeBAR, :attitudeQAR,
                                    :attitudeDepressed, :eyesN, :eyesA, :mmN, :mmPale, :mmJaundiced,
                                    :mmTacky, :earsN, :earsA, :earsEarMites, :earsAU, :earsAD,
                                    :earsAS, :glandsN, :glandsA, :skinN, :skinA, :abdomenN,
                                    :abdomenA, :urogentialN, :urogentialA, :nervousSystemN, :nervousSystemA,
                                    :musculoskeletalN, :musculoskeletalA, :cardiovascularN, :cardiovascularA, :respiratoryN,
                                    :respiratoryA)
  end
end



