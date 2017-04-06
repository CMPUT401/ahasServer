# Controls HTTP responses to /api/contacts (PUT, POST, GET, PATCH)
#
# @author Justin Barclay & Mackenzie Bligh
# @see  https://github.com/CMPUT401/vettr_server/wiki/API-Documentation#clients
class ContactsController < ApplicationController
  before_action :authenticate_user, except: [:destroy]
  before_action :authenticate_admin, only: [:destroy]
  # Handles HTTP POST request sent to /api/contacts.
  # @example request body
  #   {
  #   "contact":
  #     {
  #       "first_name": "Justin"
  #       "last_name": "Barclay",
  #       "addressLine1": "116 St & 85 Ave, Edmonton, AB T6G 2R3",
  #       "email": "fakejustin@ualberta.ca",
  #       "phone_number": "555-555-5555",
  #       "fax_number": "555-555-5556",
  #       "contact_type": "Veterinarian"
  #      }
  #   }
  # @example success response
  #   {
  #   "success": true
  #   }
  # @example failure response
  #   {
  #   "success": false,
  #   "errors": [....] // list of errors
  #   }
  # @return HTTP 201 if success: true JSON
  # @return HTTP 500 if failure: false JSON
  def create
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

  # Handles HTTP PATCH or PUT request sent to /api/contact/{id}, and replies with a specific contact's info, or an error in a JSON.
  # @example request body
  #  	{
  #    contact:
  #			{
  #      first_name: "Jeff",
  #      last_name: :Barclay,
  #      addressLine1: :something,
  #      phone_number: '556-6655',
  #      fax_number: ' ',
  #      email: 'valid@example.pizza',
  #      contact_type: 'Veterinarian'
  #      }
  #		}
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
  # @return HTTP 404 if not found: false JSON
  # @return HTTP 500 if error updating : false JSON
  def update
    @contact = Contact.find_by(id: params[:id])

    if @contact.nil?
      render status: 404, json: {success: false, error: "Client not found"}
    elsif @contact.update(contact_params)
      render json: { success: true}
    else
      render status: 500, json: {success: false, errors: @contact.errors.full_messages}
    end
  end

  # Handles HTTP GET request sent to /api/contacts/{id}, and replies with specific client's info, or an error in a JSON.
  # @example success response
  #   {
  #    "success": "true"
  #    "contact":
  #       {
  #         "first_name": "Justin",
  #         "last_name": "Barclay"
  #         "addressLine1": "116 St & 85 Ave, Edmonton, AB T6G 2R3",
  #         "email": "fakejustin@ualberta.ca",
  #         "phone_number": "555-555-5555",
  #         "fax_number": "555-555-5556",
  #         "contact_type": "Veterinarian"
  #       }
  #    }
  # @example failure response
  #   {
  #    "success": false,
  #    "errors": [....] // list of errors
  #    }
  # @return HTTP 200 if success: true JSON
  # @return HTTP 404 if failure: false on failure
  def show
    @contact = Contact.find_by(id: params[:id])
    if @contact
      render json: { success: true, contact: @contact }
    else
      render status: :error, json: { success: false, error: 'Contact not found' }
    end
  end

  # Handles HTTP GET request sent to /api/contacts and replies with an index containing a list of contact IDs, last names, and first names.
  # @example success response
  #   {
  #    "success": "true"
  #    "patients": [ { "first_name": "Justin", "last_name": "Barclay", "id": 1}...]
  #   }
  # @return HTTP 200 if success: true JSON
  def index
    contacts = Contact.all
    contact_list = filter_contact_keys contacts

    render json: { success: true, contacts: contact_list }
  end

  def destroy
    contact = Contact.find_by(id: params[:id])
    unless contact.nil?
      if Contact.destroy(params[:id])
        render status: 200, json: { success: true }
      else
        render status: :error, json: {success: false, error: 'Unable to delete contact' }
      end
    else
      render status: 404, json: { success: false, error: 'Contact not found' }
    end
  end

  private
  def filter_contact_keys(contacts)
    contacts.map do |contact|
      { id: contact.id, first_name: contact.first_name, contact_type: contact.contact_type,
        last_name: contact.last_name }
    end
  end

  def contact_params
    params.require(:contact).permit(:first_name, :last_name, :addressLine1,
                                    :addressLine2, :addressLine3,
                                    :phone_number, :email, :fax_number,
                                    :contact_type)
  end
end
