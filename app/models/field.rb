# == Schema Information
#
# Table name: fields
#
#  id           :integer          not null, primary key
#  widget_id    :integer          not null
#  label        :string(255)      not null
#  content      :text             not null
#  created_at   :datetime
#  updated_at   :datetime
#  content_type :string(255)      not null
#

class Field < ActiveRecord::Base
  validates :label, :widget, :content, :content_type, :presence => true
  belongs_to :widget

  def self.new_company_name_field
    field = Field.new({ label: "Company Name:", content_type: "text" })
  end

  def self.new_tagline_field
    field = Field.new({ label: "Tagline:", content_type: "text" })
  end

  def self.new_text_field
    field = Field.new({ label: "Text:", content_type: "textarea"})
  end

  def self.new_title_field
    field = Field.new({ label: "Title:", content_type: "text"})
  end

  def self.new_description_field
    field = Field.new({ label: "Description:", content_type: "textarea" })
  end

  def self.new_url_field
    field = Field.new({ label: "Url:", content_type: "text" })
  end
end
