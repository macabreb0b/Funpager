# == Schema Information
#
# Table name: widgets
#
#  id         :integer          not null, primary key
#  page_id    :integer          not null
#  name       :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#  rank       :float            not null
#

require 'spec_helper'

describe Widget do
  pending "add some examples to (or delete) #{__FILE__}"
end
