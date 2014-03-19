class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.references :user, index: true
      t.string :title, null: false
      t.string :handle, null: false
      t.text :body
      t.string :company, null: false
      t.string :layout, null: false
      t.string :position, null: false

      t.timestamps
    end

    add_index :pages, :handle, unique: true
  end
end
