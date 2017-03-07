class SchedulesController < ApplicationController
 def create
    schedule = schedule_params 
    # extract the client id from the JSON to a Client object
    # schedule['clientId'] = Client.find_by(id: schedule['clientId'])
    @schedule = Schedule.new(schedule)

    if @schedule.save
      render json: { success: true }
    else
      render status: :error, json: { success: false, errors: @schedule.errors.full_messages }
    end
  end

end
