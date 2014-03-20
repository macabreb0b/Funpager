class CreateFields < ActiveRecord::Migration
  def change
    create_table :fields do |t|
      t.references :widget, index: true, null: false
      t.string :label, null: false
      t.text :content, null: false

      t.timestamps
    end
  end
end
