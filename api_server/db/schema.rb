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

ActiveRecord::Schema.define(version: 2019_08_29_233316) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.string "title"
    t.datetime "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "commitment_id"
    t.index ["commitment_id"], name: "index_activities_on_commitment_id"
  end

  create_table "commitments", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "start_date"
    t.datetime "end_date"
    t.integer "buy_in_cents"
    t.string "activity_type"
    t.string "thumbnail"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "members", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "commitment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["commitment_id"], name: "index_members_on_commitment_id"
    t.index ["user_id"], name: "index_members_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password"
    t.string "avatar_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "votes", force: :cascade do |t|
    t.boolean "attended?"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "activity_id"
    t.bigint "attendee_id"
    t.bigint "voter_id"
    t.index ["activity_id"], name: "index_votes_on_activity_id"
    t.index ["attendee_id"], name: "index_votes_on_attendee_id"
    t.index ["voter_id"], name: "index_votes_on_voter_id"
  end

  add_foreign_key "activities", "commitments"
  add_foreign_key "members", "commitments"
  add_foreign_key "members", "users"
  add_foreign_key "votes", "activities"
  add_foreign_key "votes", "users", column: "attendee_id"
  add_foreign_key "votes", "users", column: "voter_id"
end
