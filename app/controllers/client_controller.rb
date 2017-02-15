class ClientController < PersonController
  def new
  end

  def index
  end

  def create
    #Pull attributes from params
    name = params[:name]
    address = params[:address]
    phoneNumber = params[:phoneNumber]
    email = params[:email]
    licos = params[:licos]
    aish = params[:aish ]
    socialAssistance =  params[:socialAssistance]
    pets = params[:pets]

    @client = Client.new(name: name, address: address, phoneNumber: phone, email: email, \
                        licos: licos, aish: aish ,socialAssistance: socialAssistance,\
                        pets: pets)
   if @client.save
     response.status = :created
    else
     render status: :error, json: { errors: @client.errors.full_messages }
    end
  end
end
