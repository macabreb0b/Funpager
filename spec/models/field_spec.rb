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

require 'spec_helper'

describe Field do
  pending "add some examples to (or delete) #{__FILE__}"
end
