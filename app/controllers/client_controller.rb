class ClientController < PersonController
  
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
  
  private
  def filter_client_keys(clients)
    clients.map do |client|
      { id: client.id, firstName: client.firstName, lastName: client.lastName}
    end
  end

  private
  def client_params
    params.require(:client).permit(:firstName, :lastName, :address, :phoneNumber, :email,
                                   :licos, :aish, :socialAssistance,
                                   :pets, :alternativeContactLastName, :alternativeContactFirstName, 
                                   :alternativeContactPhoneNumber, :alternativeContactAddress,  
                       :notes, :alternativeContact2ndPhone, :alternateContactEmail)
  end
end

