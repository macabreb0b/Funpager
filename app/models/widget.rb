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
  NAMES = ['headline', 'text', 'picture']
  validates :page, :name, :presence => true
  validates :name, inclusion: { in: NAMES }
  belongs_to :page
  has_many :fields
end
