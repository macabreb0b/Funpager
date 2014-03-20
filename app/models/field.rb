# == Schema Information
#
# Table name: fields
#
#  id         :integer          not null, primary key
#  widget_id  :integer          not null
#  label      :string(255)      not null
#  content    :text             not null
#  created_at :datetime
#  updated_at :datetime
#

class Field < ActiveRecord::Base
  validates :label, :widget, :content, :presence => true
  belongs_to :widget
end
