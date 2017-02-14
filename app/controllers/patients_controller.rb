class PatientsController < ApplicationController
  skip_before_action :authenticate

  def create
    patient = patient_params
    puts patient.to_json
    # extract the client id from the JSON to a Client object
    patient['client'] = Client.find_by(id: patient['client'])
    @patient = Patient.new(patient)

    if @patient.save
      response.status = 201
    else
      render status: :error, json: { errors: @patient.errors.full_messages }
    end
  end

  private

  def patient_params
    params.require(:patient).permit(:name, :gender, :client, :species,
                                    :reproductive_status, :tattoo, :microchip,
                                    :age, :colour)
  end
end
