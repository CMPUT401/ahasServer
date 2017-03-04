class ContactsController < ApplicationController

  def create
    puts params.to_json
    unless params.keys.include? 'contact'
      @contact = Client.new
      render status: :error, json: { success: false, errors: [@contact.errors.full_messages]}
    end

    @contact = Contact.new(contact_params)
    if @contact.save
      render status: 201, json: { success: true }
    else
      render status: :error, json: { success: false,
                                     errors: @contact.errors.full_messages }
    end
  end

  def show
    @contact = Contact.find_by(id: params[:id])
    if @contact
      render json: { success: true, contact: @contact }
    else
      render status: :error, json: { success: false, error: 'Contact not found' }
    end
  end

  def index
    contacts = Contact.all
    contact_list = filter_contact_keys contacts
    
    render json: { success: true, contacts: contact_list }
  end

  private
  def filter_contact_keys(contacts)
    contacts.map do |contact|
      { id: contact.id, first_name: contact.first_name,
        last_name: contact.last_name }
    end
  end

  def contact_params
    params.require(:contact).permit(:first_name, :last_name, :address,
                                    :phone_number, :email, :fax_number,
                                    :contact_type)
  end
end
