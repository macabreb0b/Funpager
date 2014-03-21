# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20140320230351) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "fields", force: true do |t|
    t.integer  "widget_id",               null: false
    t.string   "label",                   null: false
    t.text     "content",                 null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "content_type",            null: false
    t.string   "tag",          limit: 20, null: false
  end

  add_index "fields", ["widget_id"], name: "index_fields_on_widget_id", using: :btree

  create_table "pages", force: true do |t|
    t.integer  "user_id"
    t.string   "title",      null: false
    t.string   "handle",     null: false
    t.text     "body"
    t.string   "company",    null: false
    t.string   "layout",     null: false
    t.string   "position",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "pages", ["handle"], name: "index_pages_on_handle", unique: true, using: :btree
  add_index "pages", ["user_id"], name: "index_pages_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "token",           null: false
    t.string   "email"
    t.string   "avatar_url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["token"], name: "index_users_on_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

  create_table "widgets", force: true do |t|
    t.integer  "page_id",    null: false
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "rank",       null: false
  end

  add_index "widgets", ["page_id"], name: "index_widgets_on_page_id", using: :btree

end
