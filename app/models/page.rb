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
    'crossword'
  ]
  validates :user_id, :title, :handle, :company, :layout, :position, :theme, :presence => true
  validates :handle, :uniqueness => true, :length => { minimum: 4 }
  validates :position, :inclusion => { in: ['left', 'center', 'right'] }
  validates :layout, :inclusion => { in: ['one-column', 'sidebar-left', 'sidebar-right'] }
  validates :theme, :inclusion => { in: THEMES }
  before_validation :set_defaults

  extend FriendlyId
  friendly_id :handle, :use => :slugged

  attr_reader :time_ago
  belongs_to :user

  has_many :widgets, inverse_of: :page, dependent: :destroy
  accepts_nested_attributes_for :widgets # lets you add widget info in with user_params

  def self.new_starting_page
    page = Page.new({title: "My New Page"})
    page.widgets << Widget.new_headline_widget

    page.widgets << Widget.new_text_widget
    text_widget = page.widgets.last
    title = text_widget.fields.first
    title.content = "About Us"

    body = text_widget.fields.last
    body.content = "Enter content that tells your visitors about your company and what you do. You can write about your history, your team, the areas you service, or anything else you'd like to share."

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
    end
end
