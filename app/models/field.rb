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
    TAGS = {
        'Company Name:' => 'h1',
        'Tagline:' => 'h2',
        'Title:' => 'h3',
        'Text:' => 'p',
        'Description:' => 'p',
        'Url:' => 'a',
        'URL:' => 'a',
        'Facebook:' => 'a', # deprecated
        'Twitter:' => 'a', # deprecated
        'LinkedIn:' => 'a', # deprecated
        'Tumblr:' => 'a', # deprecated
        'Service:' => 'li', # deprecated
        'Email:' => 'a', # deprecated
        'Phone:' => 'p', # deprecated
        'Address:' => 'p', # deprecated
        'Image:' => 'img',
        'Street:' => 'p', # deprecated
        'City:' => 'p', # deprecated
        'Postal Code:' => 'p' # deprecated
    }

    validates :label, :widget, :content_type, :tag, :presence => true
    before_validation :set_tag
    belongs_to :widget

    has_attached_file :image,
        :styles => {
            :inline => "440x",
            :big  => "600x600>"
        }

    validates_attachment_content_type :image, :content_type => ["image/jpg", "image/jpeg", "image/png"]

    def self.new_company_name_field
        Field.new({ 
            label: "Company Name:", 
            content_type: "text", 
            tag: 'h1',
            content: "Your Company Name"
        })
    end

    def self.new_tagline_field
        Field.new({ 
            label: "Tagline:", 
            content_type: "text", 
            tag: 'h2',
            content: "Your Tagline Here"
        })
    end

    def self.new_title_field(content)
        Field.new({ 
            label: "Title:", 
            content_type: "text", 
            tag: 'h3',
            content: content
        })
    end

    def self.new_text_field(content)
        Field.new({ 
            label: "Text:", 
            content_type: "textarea", 
            tag: 'p',
            content: content
        })
    end

    def self.new_photo_field
        Field.new({ 
            label: "Image:", 
            content_type: "file", 
            tag: 'img',
            content: ""
        })
    end

    def self.new_url_field(content)
        Field.new({ 
            label: "URL:", 
            content_type: "text", 
            tag: 'a',
            content: content
        })
    end

    def self.new_description_field(content)
        Field.new({ 
            label: "Description:", 
            content_type: "textarea", 
            tag: 'p',
            content: content
        })
    end
    
### These constructor functions don't get called, just for reference:
    #
    #
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
