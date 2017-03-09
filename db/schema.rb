# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170309060927) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "clients", force: :cascade do |t|
    t.string   "firstName"
    t.string   "address"
    t.string   "phoneNumber"
    t.string   "email"
    t.float    "licos"
    t.float    "aish"
    t.float    "socialAssistance"
    t.string   "pets"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.string   "alternativeContactEmail"
    t.string   "lastName"
    t.string   "alternativeContactLastName"
    t.string   "alternativeContactFirstName"
    t.string   "alternativeContactPhoneNumber"
    t.string   "alternativeContactAddress"
    t.string   "notes"
    t.string   "alternativeContact2ndPhone"
    t.index ["lastName", "firstName"], name: "index_clients_on_lastName_and_firstName", using: :btree
  end

  create_table "contacts", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "phone_number"
    t.string   "fax_number"
    t.string   "email"
    t.string   "address"
    t.string   "contact_type"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "medical_records", force: :cascade do |t|
    t.float    "temperature"
    t.text     "exam_notes"
    t.text     "medications"
    t.string   "eyes"
    t.string   "oral"
    t.string   "ears"
    t.string   "glands"
    t.string   "skin"
    t.string   "abdomen"
    t.string   "urogential"
    t.string   "nervousSystem"
    t.string   "musculoskeletal"
    t.string   "cardiovascular"
    t.integer  "heart_rate"
    t.string   "respiratory"
    t.integer  "respiratory_rate"
    t.boolean  "attitudeBAR"
    t.boolean  "attitudeQAR"
    t.boolean  "attitudeDepressed"
    t.boolean  "eyesN"
    t.boolean  "eyesA"
    t.boolean  "mmN"
    t.boolean  "mmPale"
    t.boolean  "mmJaundiced"
    t.boolean  "mmTacky"
    t.boolean  "earsN"
    t.boolean  "earsA"
    t.boolean  "earsEarMites"
    t.boolean  "earsAU"
    t.boolean  "earsAD"
    t.boolean  "earsAS"
    t.boolean  "glandsN"
    t.boolean  "glandsA"
    t.boolean  "skinN"
    t.boolean  "skinA"
    t.boolean  "abdomenN"
    t.boolean  "abdomenA"
    t.boolean  "urogentialN"
    t.boolean  "urogentialA"
    t.boolean  "nervousSystemN"
    t.boolean  "nervousSystemA"
    t.boolean  "musculoskeletalN"
    t.boolean  "musculoskeletalA"
    t.boolean  "cardiovascularN"
    t.boolean  "cardiovascularA"
    t.boolean  "respiratoryN"
    t.boolean  "respiratoryA"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.integer  "patient_id",        null: false
    t.string   "summary"
    t.text     "signature"
    t.datetime "date"
  end

  create_table "notes", force: :cascade do |t|
    t.text     "body"
    t.string   "initials"
    t.integer  "medical_record_id", null: false
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.index ["medical_record_id"], name: "index_notes_on_medical_record_id", using: :btree
  end

  create_table "patients", force: :cascade do |t|
    t.string   "species"
    t.string   "name"
    t.integer  "age"
    t.string   "colour"
    t.integer  "tattoo"
    t.integer  "microchip"
    t.string   "reproductive_status"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.integer  "client_id"
    t.string   "gender"
    t.index ["client_id"], name: "index_patients_on_client_id", using: :btree
  end

  create_table "schedules", force: :cascade do |t|
    t.datetime "appointmentDate"
    t.integer  "clientId"
    t.string   "reason"
    t.string   "notes"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "password_digest"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
  end

  add_foreign_key "patients", "clients"
end
