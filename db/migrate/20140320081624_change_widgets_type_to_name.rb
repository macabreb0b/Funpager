class ChangeWidgetsTypeToName < ActiveRecord::Migration
  def change
    rename_column :widgets, :type, :name
  end
end
