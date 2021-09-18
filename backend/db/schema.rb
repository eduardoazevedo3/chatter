# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_09_18_000912) do

  create_table "chat_messages", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "author_id", null: false
    t.bigint "user_id", null: false
    t.boolean "delivered", default: false, null: false
    t.boolean "read", default: false, null: false
    t.text "text", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["author_id"], name: "index_chat_messages_on_author_id"
    t.index ["user_id"], name: "index_chat_messages_on_user_id"
  end

  create_table "users", charset: "utf8mb4", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.boolean "active", default: true, null: false
    t.string "full_name", null: false
    t.string "email", null: false
    t.string "phone_number", limit: 20
    t.boolean "allow_password_change", default: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.json "tokens"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "chat_messages", "users"
  add_foreign_key "chat_messages", "users", column: "author_id"
end
