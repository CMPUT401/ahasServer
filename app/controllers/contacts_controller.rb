class ContactsController < ApplicationController

  def create
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

  private

  def contact_params
    params.require(:contact).permit(:first_name, :last_name, :address,
                                    :phone_number, :email, :fax_number,
                                    :contact_type)
  end
end
