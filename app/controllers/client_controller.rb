class ClientController < PersonController
  def new
  end

  def index
  end

  def create
    @client = Client.new(client_params)

   if @client.save
      render status: 201, json: {success: true}
    else
     render status: :error, json: {success: false, errors: @client.errors.full_messages}
    end
  end

  def client_params
    params.require(:client).permit(:name, :address, :phone, :email,
                        :licos, :aish ,:socialAssistance,
                        :pets)
  end
end
