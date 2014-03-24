class AddThemeToPages < ActiveRecord::Migration
  def change
    add_column :pages, :theme, :string, null: false
  end
end
