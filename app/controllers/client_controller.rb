# Controls access to the client instances stored in the API database
#
#
# @author Justin Barclay & Mackenzie Bligh
# @see https://github.com/CMPUT401/vettr_server/wiki/API-Documentation#clients
class ClientController < PersonController
  before_action :authenticate_user

  # Handles HTTP POST request sent to /api/client.
  # @example success response
  #   {
  #    "success": true,
  #    "client":
  #        {
  #        "firstName": "Justin"
  #        "lastName": "Barclay"
  #        "address": "116 St & 85 Ave, Edmonton, AB T6G 2R3"
  #        "phoneNumber": "7805555555"
  #        "email": "fakejustin@ualberta.ca"
  #        "licos": "123456"
  #        "socialAssistance": "76543"
  #        "pets": "12404"
  #        "alternativeContactFirstName": "John"
  #        "alternativeContactLastName": "Wick"
  #        "alternativeContactPhoneNumber": "17809904957"
  #        "alternativeContactAddress": "1234 Fake St & 96 Ave, Edmonton, AB T8G 2EF"
  #        "notes": "His dog is super bitey"
  #        "alternativeContact2ndPhone": "7804737373"
  #        }
  #   }
  # @example failure response
  #   {
  #   "success": false,
  #   "errors": [....] // list of errors
  #   }
  # @return HTTP 201 if success: true JSON
  # @return HTTP 500 if failure: false JSON
  def create
    client = client_params
    @client = Client.new(client)

    if @client.save
      render status: 201, json: { success: true }
    else
      render status: 500, json: { success: false,
                                  errors: @client.errors.full_messages }
    end
  end

  # Handles HTTP GET request sent to /api/client/{id}, and replies with specific client's info, or an error in a JSON.
  # @example success response
  #   {
  #    "success": true,
  #    "client":
  #        {
  #        "firstName": "Justin"
  #        "lastName": "Barclay"
  #        "address": "116 St & 85 Ave, Edmonton, AB T6G 2R3"
  #        "phoneNumber": "7805555555"
  #        "email": "fakejustin@ualberta.ca"
  #        "licos": "123456"
  #        "socialAssistance": "76543"
  #        "pets": "12404"
  #        }
  #   }
  # @example failure response
  #   {
  #    "success": false,
  #    "errors": [....] // list of errors
  #    }
  # @return HTTP 200 if success: true JSON
  # @return HTTP 404 if failure: false on failure
  def show
    client = Client.find_by(id: params[:id])
    if client
      patients = client.patients
      client = client.attributes

      client['patients'] = filter_patients_keys(patients)
      render json: { success: true, client: client }
    else
      render status: 404, json: { success: false, error: 'Client not found' }
    end
  end

  # Handles HTTP GET request sent to /api/client and replies with an index containing a list of client IDs, last names, and first names.
  # @example success response
  #   {
  #   success":true,
  #   clients":[
  #      {
  #          "id":443855961,
  #          "firstName":"Justin",
  #          "lastName":"Barclay"
  #      },
  #      {
  #          "id":298486374,
  #          "firstName":null,
  #          "lastName":null
  #      }
  #   				]
  #  	}
  # @return HTTP 200 if success: true JSON
  def index
    clients = Client.all
    client_list = filter_client_keys clients

    render json: { success: true, clients: client_list}
  end

  # Handles HTTP PATCH or PUT request sent to /api/client/{id}, and replies with specific client's info, or an error in a JSON.
  # @example success response
  #   {"success":true}
  # @example failure response
  #   {
  #    "success": false,
  #    "errors": [....] // list of errors
  #    }
  #
  # @todo add to wiki page.
  #
  # @return HTTP 200 if success: true JSON
  # @return HTTP 404 if client not found: false JSON
  # @return HTTP 500 if error updating client: false JSON
  def update
    @client = Client.find_by(id: params[:id])

    if @client.nil?
      render status: 404, json: {success: false, error: "Client not found"}
    elsif @client.update(client_params)
      render json: { success: true}
    else
      render status: 500, json: {success: false, errors: @client.errors.full_messages}
    end
  end

  private
  def filter_client_keys(clients)
    clients.map do |client|
      { id: client.id, firstName: client.firstName, lastName: client.lastName}
    end
  end

  def filter_patients_keys(patients)
    patients.map do |patient|
      { id: patient.id, first_name: patient.first_name, last_name: patient.last_name }
    end
  end

  private
  def client_params
    params.require(:client).permit(:firstName, :lastName, :address, :phoneNumber, :email,
                                   :licos, :aish, :socialAssistance,
                                   :pets, :alternativeContactLastName, :alternativeContactFirstName,
                                   :alternativeContactPhoneNumber, :alternativeContactAddress,
                                   :notes, :alternativeContact2ndPhone, :alternativeContactEmail)
  end
end

