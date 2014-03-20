class AddContentTypeToFields < ActiveRecord::Migration
  def change
    add_column :fields, :content_type, :string, null: false
  end
end
