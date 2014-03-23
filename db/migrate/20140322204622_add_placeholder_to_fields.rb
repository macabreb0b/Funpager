class AddPlaceholderToFields < ActiveRecord::Migration
  def change
    add_column :fields, :placeholder, :string
  end
end
