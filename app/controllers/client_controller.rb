class ClientController < PersonController
  before_action :authenticate_user
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

  def index
    clients = Client.all
    client_list = filter_client_keys clients

    render json: { success: true, clients: client_list}
  end

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

