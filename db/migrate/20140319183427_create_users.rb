class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :password_digest, null: false
      t.string :token, null: false
      t.string :email
      t.string :avatar_url

      t.timestamps
    end

    add_index :users, :username, unique: true
    add_index :users, :token, unique: true
  end
end
