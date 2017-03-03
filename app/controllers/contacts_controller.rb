class ContactsController < ApplicationController
  def create
    @contact = Contact.new(contact_params)

    if @contact.save
      render status: 201, json: { success: true }
    end
      render status: :error, json: { success: false,
                                     errors:  @contact.errors.full_messages  }
  end

  private
  
  def contact_params
    params.require(:contact).permit(:first_name, :last_name, :address,
                                    :phone_number, :email, :fax_number, :type)
  end
end
