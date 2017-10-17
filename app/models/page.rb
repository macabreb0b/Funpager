# == Schema Information
#
# Table name: pages
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  title      :string(255)      not null
#  handle     :string(255)      not null
#  body       :text
#  company    :string(255)      not null
#  layout     :string(255)      not null
#  position   :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#  theme      :string(255)      not null
#  slug       :string(255)
#  hit_count  :integer
#

require 'action_view'

class Page < ActiveRecord::Base
    include ActionView::Helpers::DateHelper

    THEMES = [
        'carbon',
        'tablecloth',
        'paper-cup',
        'brushed-steel',
        'skulls',
        'stardust',
        'feathers',
        'food-party',
        'giftly',
        'crossword',
        'water',
        'spartan'
    ]
    
    validates :user_id, :title, :handle, :company, :layout, :position, :theme, :hit_count, :presence => true
    validates :handle, :slug, :uniqueness => true, :length => { minimum: 4 }
    validates :position, :inclusion => { in: ['left', 'center', 'right'] }
    validates :layout, :inclusion => { in: ['one-column', 'sidebar-left', 'sidebar-right'] }
    validates :theme, :inclusion => { in: THEMES }
    before_validation :set_defaults

    extend FriendlyId
    friendly_id :handle, :use => :slugged

    def should_generate_new_friendly_id?
        slug.blank? || handle_changed?
    end

    def get_next_widget_rank(previous_widget_rank)
        previous_widget_rank_float = Float(previous_widget_rank)

        sorted_ranks = self.widgets.map(&:rank).sort()

        new_rank = sorted_ranks.last + 1  # put it in last position by default
        sorted_ranks.each_with_index do |rank, idx| 
            rank_float = Float(rank)
            if rank_float > previous_widget_rank_float
                new_rank = (previous_widget_rank_float + rank_float) / 2.0

                break
            end
        end

        return new_rank
    end

    belongs_to :owner,
        foreign_key: :user_id,
        primary_key: :id,
        class_name: 'User'

    has_many :widgets, inverse_of: :page, dependent: :destroy
    accepts_nested_attributes_for :widgets # lets you add widget info in with user_params


    def self.new_starting_page
        page = Page.new({ title: "My New Page" })
        page.widgets << Widget.new_headline_widget

        page.widgets << Widget.new_text_widget_for_starting_page(rank: 2.0)

        page.title = "My New Page"

        return page
    end

    def generate_handle
        SecureRandom.urlsafe_base64(6)
    end

    def time_ago
        @time_ago = time_ago_in_words(self.created_at)
    end

    private
        def set_defaults # can I get rid of this method by putting values into the site_builder?
            self.position = 'center' if self.position.nil?
            self.layout = 'one-column' if self.layout.nil?
            self.company = 'My Company' if self.company.nil?
            self.handle = self.generate_handle if self.handle.nil?
            self.theme = THEMES.sample() if self.theme.nil?
            self.hit_count = 0 if self.hit_count.nil?
        end
end
