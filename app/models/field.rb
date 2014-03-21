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
#  tag          :string(20)       not null
#

class Field < ActiveRecord::Base
  TAGS = {'Company Name:' => 'h1',
    'Tagline:' => 'h2',
    'Title:' => 'h3',
    'Text:' => 'p',
    'Description:' => 'p',
    'Url:' => 'a'}
  validates :label, :widget, :content_type, :tag, :presence => true
  before_validation :set_tag
  belongs_to :widget

  def self.new_company_name_field
    field = Field.new({ label: "Company Name:", content_type: "text", content: "Your Company Name", tag: 'h1' })
  end

  def self.new_tagline_field
    field = Field.new({ label: "Tagline:", content_type: "text", content: "Your Tagline Here", tag: 'h2' })
  end

  def self.new_title_field
    field = Field.new({ label: "Title:", content_type: "text", tag: 'h3' })
  end


  def self.new_text_field
    field = Field.new({ label: "Text:", content_type: "textarea", tag: 'p' })
  end

  def self.new_description_field
    field = Field.new({ label: "Description:", content_type: "textarea", tag: 'p' })
  end

  def self.new_url_field
    field = Field.new({ label: "Url:", content_type: "text", tag: 'a' })
  end

  def set_tag
    self.tag ||= TAGS[self.label]
  end
end
