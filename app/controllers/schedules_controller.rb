class SchedulesController < ApplicationController 
  
  def create 
    schedule = schedule_params
    # extract the client id from the JSON to a Client object
    scheduleDate = schedule[:appointmentDate].to_i
    schedule[:appointmentDate] = Time.at(scheduleDate).to_s
    @schedule = Schedule.new(schedule)


    if @schedule.save
      render status: 201, json: { success: true }
    else
     
      render status: :error, json: { success: false, errors: @schedule.errors.full_messages }
    end
  end

  def schedule_params
    params.require(:schedule).permit(:appointmentDate, :clientId, :reason, :notes, :location, :duration)
  end
end
