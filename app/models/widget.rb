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


class Widget < ActiveRecord::Base
    NAMES = [
        'Headline',
        'Text',
        'Image',
        'Contact', # deprecated
        'Hours', # deprecated
        'Social', # deprecated
        'Services', # deprecated
        'Button'
    ]

    validates :page, :name, :rank, :presence => true
    validates :name, inclusion: { in: NAMES }

    belongs_to :page

    has_one :owner, through: :page

    has_many :fields, inverse_of: :widget, dependent: :destroy
    accepts_nested_attributes_for :fields

    def self.new_headline_widget
        widget = Widget.new({ name: "Headline" })
        widget.fields << Field.new_company_name_field
        widget.fields << Field.new_tagline_field
        widget.rank = 1.0

        return widget
    end

    def self.new_text_widget_for_starting_page(rank)
        widget = Widget.new({ 
            name: "Text", 
            rank: rank,
        })
        widget.fields << Field.new_title_field("About Us")
        widget.fields << Field.new_text_field(
            "Enter content that tells your visitors about your company and what you do. 
            You can write about your history, your team, the areas you service, 
            or anything else you'd like to share."
        )

        return widget
    end

    def self.new_text_widget(page_id, rank)
        widget = Widget.new({ 
            page_id: page_id, 
            name: "Text", 
            rank: rank,
        })
        widget.fields << Field.new_title_field('Title')
        widget.fields << Field.new_text_field('Description')

        return widget
    end

    def self.new_link_widget(page_id, rank)
        widget = Widget.new({ 
            page_id: page_id, 
            name: 'Button', 
            rank: rank,
        })
        widget.fields << Field.new_title_field('Link text')
        widget.fields << Field.new_url_field('Link URL')

        return widget
    end

    def self.new_photo_widget(page_id, rank)
        widget = Widget.new({ 
            page_id: page_id, 
            name: 'Image', 
            rank: rank,
        })
        widget.fields << Field.new_title_field('Title')
        widget.fields << Field.new_description_field('Oh caption, my caption')
        widget.fields << Field.new_photo_field

        return widget
    end

    def check_rank
        page = (self.page_id ? Page.find(self.page_id) : self.page)
        last_rank = page.widgets.pluck('rank').sort!.last
        puts 'checking rank'
        self.rank ||= (last_rank + 1)
    end
end
