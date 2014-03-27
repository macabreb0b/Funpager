class AddHitCountToPages < ActiveRecord::Migration
  def change
    add_column :pages, :hit_count, :integer
  end
end
