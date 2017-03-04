class ClientController < PersonController
  def index; end

  def create
    @client = Client.new(client_params)

    if @client.save
      render status: 201, json: { success: true }
    else
      render status: :error, json: { success: false,
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

  private

  def client_params
    params.require(:client).permit(:name, :address, :phoneNumber, :email,
                                   :licos, :aish, :socialAssistance,
                                   :pets, :alternativeContactPhoneNumber, :alternativeContactAddress,  
                       :notes, :alternativeContact2ndPhone, :alternateContactEmail)
  end
end
