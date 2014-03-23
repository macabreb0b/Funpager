# == Schema Information
#
# Table name: fields
#
#  id                 :integer          not null, primary key
#  widget_id          :integer          not null
#  label              :string(255)      not null
#  content            :text             not null
#  created_at         :datetime
#  updated_at         :datetime
#  content_type       :string(255)      not null
#  tag                :string(20)       not null
#  image_file_name    :string(255)
#  image_content_type :string(255)
#  image_file_size    :integer
#  image_updated_at   :datetime
#  placeholder        :string(255)
#

class Field < ActiveRecord::Base
  TAGS = {'Company Name:' => 'h1',
    'Tagline:' => 'h2',
    'Title:' => 'h3',
    'Text:' => 'p',
    'Description:' => 'p',
    'Url:' => 'a',
    'Email:' => 'a',
    'Phone:' => 'p',
    'Address:' => 'p',
    'Image:' => 'img',
    'Street:' => 'p',
    'City:' => 'p',
    'Postal Code:' => 'p',
  }

  validates :label, :widget, :content_type, :tag, :presence => true
  before_validation :set_tag
  belongs_to :widget

  has_attached_file :image, :style => {
    :big => "600x600>",
    :small => "50x50#" # set more sizes after this line
  }

  def self.new_company_name_field
    Field.new({ label: "Company Name:", content_type: "text", content: "Your Company Name", tag: 'h1' })
  end

  def self.new_tagline_field
    Field.new({ label: "Tagline:", content_type: "text", content: "Your Tagline Here", tag: 'h2' })
  end

  def self.new_title_field
    Field.new({ label: "Title:", content_type: "text", tag: 'h3' })
  end

  def self.new_text_field
    Field.new({ label: "Text:", content_type: "textarea", tag: 'p' })
  end


### These constructor functions don't get called, just for reference:
  # def self.new_description_field
  #   Field.new({ label: "Description:", content_type: "textarea", tag: 'p' })
  # end
  #
  # def self.new_url_field
  #   Field.new({ label: "Url:", content_type: "text", tag: 'a' })
  # end
  #
  # def self.new_image_field
  #   Field.new({ label: "Image:", content_type: "file", tag: 'img' })
  # end
  #
  # def self.new_tel_field
  #   Field.new({ label: "Phone:", content_type: 'tel', tag: 'p' })
  # end
  #
  # def self.new_email_field
  #   Field.new({ label: "Email:", content_type: 'email', tag: 'a' })
  # end
  #
  # def self.new_street_field
  #   Field.new({ label: "Address:", content_type: 'text', tag: 'p' })
  # end
  #
  # def self.new_city_field
  #   Field.new({ label: "City:", content_type: 'text', tag: 'p' })
  # end
  #
  # def self.new_state_field
  #   Field.new({ label: "State:", content_type: 'text', tag: 'p' })
  # end
  #
  # def self.new_postal_code_field
  #   Field.new({ label: "Postal Code:", content_type: 'text', tag: 'p' })
  # end

  def set_tag
    self.tag ||= TAGS[self.label]
  end
end
