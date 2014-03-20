# == Schema Information
#
# Table name: widgets
#
#  id         :integer          not null, primary key
#  page_id    :integer          not null
#  type       :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#

class Widget < ActiveRecord::Base
  validates :page, :type, :presence => true
  belongs_to :page
  has_many :fields

  TYPES = ['headline', 'text', 'picture']
end
