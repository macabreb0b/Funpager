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
        title_field = Field.new_title_field('e.g., About Us')
        title_field.content = "About Us"
        widget.fields << title_field

        description_field = Field.new_text_field("Once upon a time...")
        description_field.content = "Enter content that tells your visitors about your company and what you do. You can write about your history, your team, the areas you service, or anything else you'd like to share."
        widget.fields << description_field

        return widget
    end

    def self.new_text_widget(page_id, rank)
        widget = Widget.new({ 
            page_id: page_id, 
            name: "Text", 
            rank: rank,
        })
        widget.fields << Field.new_title_field('e.g., About Us')
        widget.fields << Field.new_text_field("Once upon a time...")

        return widget
    end

    def self.new_link_widget(page_id, rank)
        widget = Widget.new({ 
            page_id: page_id, 
            name: 'Button', 
            rank: rank,
        })
        widget.fields << Field.new_title_field('e.g., Make Payment')
        widget.fields << Field.new_url_field('http://')

        return widget
    end

    def self.new_image_widget(page_id, rank)
        widget = Widget.new({ 
            page_id: page_id, 
            name: 'Image', 
            rank: rank,
        })
        widget.fields << Field.new_title_field("e.g., My Newest Painting")
        widget.fields << Field.new_description_field('Oh caption, my caption...')
        widget.fields << Field.new_image_field

        return widget
    end

    def check_rank
        page = (self.page_id ? Page.find(self.page_id) : self.page)
        last_rank = page.widgets.pluck('rank').sort!.last
        puts 'checking rank'
        self.rank ||= (last_rank + 1)
    end

    def adjust_rank(destination)
        sorted_ranks = self.page.widgets.pluck(:rank).sort!

        new_rank = case destination
        when 'decrement'
            current_rank_index = sorted_ranks.index(self.rank)
            if current_rank_index - 2 < 0
                # we're one-away from top (or at the top)
                sorted_ranks.first - 1
            else
                (sorted_ranks[current_rank_index - 2] + sorted_ranks[current_rank_index - 1]) / 2
            end
        when 'increment'
            current_rank_index = sorted_ranks.index(self.rank)

            if current_rank_index + 2 >= sorted_ranks.length
                sorted_ranks.last + 1
            else
                (sorted_ranks[current_rank_index + 1] + sorted_ranks[current_rank_index + 2]) / 2
            end
        when 'top'
            if self.rank == sorted_ranks.first
                self.rank
            else
                sorted_ranks.first - 1
            end
        when 'bottom'
            if self.rank == sorted_ranks.last
                self.rank
            else
                sorted_ranks.last + 1
            end
        end

        puts "#{destination} #{self.rank} to #{new_rank}"
        puts "all_ranks = #{sorted_ranks}"
        self.rank = new_rank
    end
end
