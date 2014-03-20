class CreateWidgets < ActiveRecord::Migration
  def change
    create_table :widgets do |t|
      t.references :page, index: true, null: false
      t.string :type, null: false

      t.timestamps
    end
  end
end
