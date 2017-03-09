class SchedulesController < ApplicationController 
  
  def create 
    schedule = schedule_params
    # extract the schedule id from the JSON to a Client object
    scheduleStartDate = schedule[:appointmentStartDate].to_i
    scheduleEndDate = schedule[:appointmentEndDate].to_i
    schedule[:appointmentStartDate] = Time.at(scheduleStartDate).to_s
    schedule[:appointmentEndDate] = Time.at(scheduleEndDate).to_s
    @schedule = Schedule.new(schedule)


    if @schedule.save
      render status: 201, json: { success: true }
    else
     
      render status: :error, json: { success: false, errors: @schedule.errors.full_messages }
    end
  end

  def show
    schedule = Schedule.find_by(id: params[:id])
    if schedule
      render json: { success: true, schedule: schedule }
    else
      render status: 404, json: { success: false, error: 'Schedule not found' }
    end
  end

  def index
    schedules = Schedule.all
    schedule_list = filter_schedule_keys schedules
    
    render json: { success: true, schedules: schedule_list}
  end
  
  private
  def filter_schedule_keys(schedules)
    schedules.map do |schedule|
      { id: schedule.id, appointmentDate: schedule.appointmentDate, duration: schedule.duration,\
      clientId: schedule.clientId
      }
    end
  end

  def schedule_params
    params.require(:schedule).permit(:appointmentStartDate, :appointmentEndDate, :scheduleId, :reason, :notes, :location, :duration)
  end
end
