class NotesController < ApplicationController
  before_action :check_patient_medical_relation, :authenticate_user

  # Handles HTTP POST request sent to ‘/api/patients/{patient_id}/medical_records/{medical_record_id}/notes’
  # @example request body
  #   {
  #      "note": {
  #         "medical_record_id": "integer",
  #         "body": "text",
  #         "initials": "string"
  #   }
  # @example failure response
  #   {
  #   "success": false,
  #   "errors": [....] // list of errors
  #   }
  # @return HTTP 201 if success: true JSON
  # @return HTTP 500 if failure: false JSON
  def create
    # Sanity check
    if params[:note].nil?
      render status: :error, json: { success: false, error: "Parameter 'Note' not found" }
    end

    @note = Note.new notes_params

    if @note.save
      render status: 201, json: { success: true }
    else
      render status: :error, json: { success: false, errors: @note.errors.full_messages }
    end
  end

  # Handles HTTP GET request sent to ‘/api/patients/{patient_id}/medical_records/{medical_record_id}/notes{note_id}’  and replies with specific note's info, or an error in a JSON.
  # @example success response
  #   {
  #     "success": "true"
  #     "note": {
  #         "medical_record_id": "integer",
  #         "body": "text",
  #         "initials": "string"
  #       }
  #   }
  # @example failure response
  #   {
  #    "success": false,
  #    "errors": [....] // list of errors
  #    }
  # @return HTTP 200 if success: true JSON
  # @return HTTP 404 if failure: false on failure
  def show
    note = Note.find_by id: params[:id]
    if !note.nil?
      render status: 200, json: { success: true, note: note }
    else
      render status: 404, json: { success: false, error: 'Note not found' }
    end
  end

  # Handles HTTP GET request sent to ‘/api/patients/{patient_id}/medical_records/{medical_record_id}/notes’ and replies with an index containing a list of note IDs and dates created.
  # @example success response
  #    {
  #      "success": "true",
  #      "notes": [{"id": "integer", "date_created": "datetime"}...]
  #    }
  # @return HTTP 200 if success: true JSON
  def index
    record = MedicalRecord.find_by(id: params[:medical_record_id])

    if record.nil?
      render status: 404, json: { success: false, error: 'Resource not found' }
    else
      # notes = filter_notes_keys record.notes
      render status: 200, json: { success: true, notes: record.notes }
    end
  end

  private
  def check_patient_medical_relation
    if patient_medical_record_relations_exist?
      render status: 404, json: { success: false, error: 'Resource not found'}
    end
  end

  def filter_notes_keys(notes)
    notes.map do |note|
      { id: note.id, date_created: note.created_at }
    end
  end

  def notes_params
    params.require(:note).permit(:body, :initials, :medical_record_id, :is_alert)
  end

  def patient_medical_record_relations_exist?
    MedicalRecord.find_by(patient_id: params[:patient_id], id: params[:medical_record_id]).nil?
  end

end
