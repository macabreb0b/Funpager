class AddAttachmentImageToFields < ActiveRecord::Migration
  def self.up
    change_table :fields do |t|
      t.attachment :image
    end
  end

  def self.down
    drop_attached_file :fields, :image
  end
end
