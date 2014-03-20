# == Schema Information
#
# Table name: widgets
#
#  id         :integer          not null, primary key
#  page_id    :integer          not null
#  name       :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#

class Widget < ActiveRecord::Base
  NAMES = ['headline', 'text']
  validates :page, :name, :presence => true
  validates :name, inclusion: { in: NAMES }
  belongs_to :page

  has_many :fields, inverse_of: :widget, dependent: :destroy
  accepts_nested_attributes_for :fields

  def self.new_headline_widget
    widget = Widget.new({ name: "headline" })
    widget.fields << Field.new_company_name_field
    widget.fields << Field.new_tagline_field
    return widget
  end

  def self.new_text_widget
    widget = Widget.new({ name: "text" })
    widget.fields << Field.new_title_field
    widget.fields << Field.new_text_field
    return widget
  end
end
