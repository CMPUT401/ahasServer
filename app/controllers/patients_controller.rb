# Controls access to the patient instances stored in the API database
#
#
# @author Justin Barclay & Mackenzie Bligh
# @see https://github.com/CMPUT401/vettr_server/wiki/API-Documentation#clients

class PatientsController < ApplicationController
  before_action :authenticate_user

  # Handles HTTP POST request sent to /api/client.
  # @example request body
  #   {
  #        "patient":
  #            {
  #                "client": "client id",
  #                "species": "cat",
  #                "name": "Chairman Meow",
  #                "age": 17,
  #                "gender": "Male",
  #                "colour": "Red",
  #                "tattoo": 197265,
  #                "microchip": nil,
  #                "reproductive_status": "Spade"
  #            }
  #    }
  # @example failure response
  #   {
  #   "success": false,
  #   "errors": [....] // list of errors
  #   }
  # @return HTTP 201 if success: true JSON
  # @return HTTP 500 if failure: false JSON
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

  # Handles HTTP GET request sent to /api/patients/{id}, and replies with specific patients's info, or an error in a JSON.
  # @example success response
  #   {
  #       "success": true,
  #       "patient": 
  #           { 
  #               "id": "patient_id",
  #               "species": "cat",
  #               "name": "Chairman Meow",
  #               "age": 17,
  #               "gender": "Male",
  #               "colour": "Red",
  #               "tattoo": 197265,
  #               "microchip": nil,
  #               "reproductive_status": "Spade"
  #           "client":{  
  #                 "id":443855961,
  #                 "firstName":"Justin",
  #                 "address":"116 St \u0026 85 Ave, Edmonton, AB T6G 2R3",
  #                 "phoneNumber":"7805555555",
  #                 "email":"fakejustin@ualberta.ca",
  #                 "licos":123456.0,
  #                 "aish":null,
  #                 "socialAssistance":76543.0,
  #                 "pets":"12404",
  #                 "created_at":"2017-03-22T07:31:04.999Z",
  #                 "updated_at":"2017-03-22T07:31:04.999Z",
  #                 "alternativeContactEmail":null,
  #                 "lastName":"Barclay",
  #                 "alternativeContactLastName":null,
  #                 "alternativeContactFirstName":null,
  #                 "alternativeContactPhoneNumber":null,
  #                 "alternativeContactAddress":null,
  #                 "notes":null,
  #                 "alternativeContact2ndPhone":null
  #                 }},
  #           "generalAlerts":  
  #           [  
  #           [{  
  #               "id":298486374,
  #               "body":"You are not supposed to understand this",
  #               "initials":"GG",
  #               "medical_record_id":980190962,
  #               "created_at":"2017-03-22T07:31:04.979Z",
  #               "updated_at":"2017-03-22T07:31:04.979Z",
  #               "is_alert":true
  #           }]] 
  #
  #   "medicationAlerts":[  
  #       {  
  #           "id":980190962,
  #           "name":"Hydrogen Dioxide",
  #           "medical_record_id":980190962,
  #           "patient_id":980190962,
  #           "created_at":"2017-03-22T07:31:05.130Z",
  #           "updated_at":"2017-03-22T07:31:07.492Z",
  #           "reminder":1492840800,
  #           "med_type":"Medicine"
  #       }]
  #   }
  #   } 
  # @example failure response
  #   {
  #    "success": false,
  #    "errors": [....] // list of errors
  #    }
  # @return HTTP 200 if success: true JSON
  # @return HTTP 404 if failure: false on failure
  def show
    @patient = Patient.find_by(id: params[:id])
    @medical_records = MedicalRecord.where(patient_id: params[:id])
    @generalAlerts = []
    @medicationAlerts = []
    @medications = Medication.where(patient_id: params[:id])

    @medical_records.each do |medRec|
      @notes = Note.where(medical_record_id: medRec.id, is_alert: true)
      @notes.each do |note|
        if note != nil
          @generalAlerts.append(note)
        end
      end
    end

    @medications.each do |med|
      if med.reminder.to_i < (Date.today + 3.months).to_time.to_i and med.reminder != 0 and med.reminder != nil and med != nil
        @medicationAlerts.append(med)
      end
    end

    if @patient
      # Return client with a patient, to match UI
      # UI always shows the client info with a patient info

      client = Client.find(@patient.client_id)
      @patient = @patient.attributes
      @patient['client'] = client.attributes

      render json: { success: true, patient: @patient, generalAlerts: @generalAlerts, medicationAlerts: @medicationAlerts}
    else
      render status: 404, json: {success: false, error: 'Patient not found'}
    end
  end

  # Handles HTTP GET request sent to /api/patients/{id}, and replies with specific patients's info, or an error in a JSON.
  # @example success response
  #   {
  #   "success": "true"
  #   "patients": [ { "name": "Chairman Meow, "id": 1}...]
  #   } 
  # @example failure response
  #   {
  #    "success": false,
  #    "errors": [....] // list of errors
  #    }
  # @return HTTP 200 if success: true JSON
  # @return HTTP 404 if failure: false on failure

  def index
    patients = Patient.all
    patient_list = filter_patient_keys patients

    render json: { success: true, patients: patient_list }
  end

  private
  def filter_patient_keys(patients)
    patients.map do |patient|
      { id: patient.id, first_name: patient.first_name, last_name: patient.last_name }
    end
  end

  def patient_params
    params.require(:patient).permit(:first_name, :last_name, :gender, :client, :species,
                                    :reproductive_status, :tattoo, :microchip,
                                    :age, :colour)
  end
end
