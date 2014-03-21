class ChangeWidgetsRankToFloat < ActiveRecord::Migration
  def change
    change_column :widgets, :rank, :float, :null => false
  end
end
