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

# TODO(2017-10-19) - rename to feature
# TODO(2017-10-19) - use enumerated type as source of truth instead of "label"
# TODO(2017-10-19) - remove "tag" column and just let frontend display the feature how it wants

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
        styles: {
            inline: "440x",
            big: "600x600>"
        },
        s3_region: ENV['AWS_REGION']

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

    def self.new_title_field(placeholder)
        Field.new({ 
            label: "Title:", 
            content_type: "text", 
            tag: 'h3',
            content: "",
            placeholder: placeholder
        })
    end

    def self.new_text_field(placeholder)
        Field.new({ 
            label: "Text:", 
            content_type: "textarea", 
            tag: 'p',
            content: "",
            placeholder: placeholder
        })
    end

    def self.new_image_field
        Field.new({ 
            label: "Image:", 
            content_type: "file", 
            tag: 'img',
            content: ""
        })
    end

    def self.new_url_field(placeholder)
        Field.new({ 
            label: "URL:", 
            content_type: "url", 
            tag: 'a',
            content: "",
            placeholder: placeholder
        })
    end

    def self.new_description_field(placeholder)
        Field.new({ 
            label: "Description:", 
            content_type: "textarea", 
            tag: 'p',
            content: "",
            placeholder: placeholder
        })
    end

    def self.new_alignment_field(default_alignment)
        # TODO(2017-10-19)
        # should this have "feature options" model and "default feature option"? or maybe just a list of options?
        # .. could also just let frontend worry about it
        Field.new({
            label: "Alignment:",
            content_type: "radio",
            tag: 'N/A',
            content: default_alignment,
        })
    end

    def set_tag
        self.tag ||= TAGS[self.label]
    end
end
