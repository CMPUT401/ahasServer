class PatientsController < ApplicationController
  #skip_before_action :authenticate

  def create
    patient = patient_params
    # extract the client id from the JSON to a Client object
    patient['client'] = Client.find_by(id: patient['client'])
    @patient = Patient.new(patient)

    if @patient.save
      render status: 201, json: { success: true }
    else
      render status: :error, json: { success: false, errors: @patient.errors.full_messages }
    end
  end

  def show
    patient = Patient.find_by(id: params[:id])
    if patient
      render json: { success: true, patient: patient }
    else
      render status: 404, json: {success: false, error: 'Patient not found'}
    end
    
    
  end

  def index
    patients = Patient.all
    patient_list = filter_patient_keys patients
    
    render json: { success: true, patients: patient_list }
  end

  private

  def filter_patient_keys(patients)
    patients.map do |patient|
      { id: patient.id, name: patient.name }
    end
  end
  
  def patient_params
    params.require(:patient).permit(:name, :gender, :client, :species,
                                    :reproductive_status, :tattoo, :microchip,
                                    :age, :colour)
  end
end
