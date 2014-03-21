class AddRankToWidgets < ActiveRecord::Migration
  def change
    add_column :widgets, :rank, :integer, :null => false
  end
end
