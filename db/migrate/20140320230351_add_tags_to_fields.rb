class AddTagsToFields < ActiveRecord::Migration
  def change
    add_column :fields, :tag, :string, {limit: 20, null: false}
  end
end
