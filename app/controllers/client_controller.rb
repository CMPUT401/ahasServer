class ClientController < PersonController
  def new
  end

  def index
  end

  def create
    render json: params
    
    #Pull attributes from params
    name = params[:name] 
    address = params[:address]
    phoneNumber = params[:phoneNumber]
    email = params[:email]
    licos = params[:licos]
    aish = params[:aish ]
    socialAssistance =  params[:socialAssistance]
    pets = params[:pets]


  end
end
