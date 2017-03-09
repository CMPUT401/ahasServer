class SchedulesController < ApplicationController
 def create
    schedule = schedule_params
    # extract the client id from the JSON to a Client object
    @schedule = Schedule.new(schedule)

    if @schedule.save
      render status: 201, json: { success: true }
    else
      render status: :error, json: { success: false, errors: @schedule.errors.full_messages }
    end
  end
  def schedule_params
    params.require(:schedule).permit(:appointmentDate, :clientID, :reason, :notes, :location)
  end
end
