class ChangeHandleToSlug < ActiveRecord::Migration
  def change
    add_column :pages, :slug, :string, :unique => true, :index => true
  end
end
