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
#

class Page < ActiveRecord::Base
  validates :user_id, :title, :handle, :company, :layout, :position, :presence => true
  validates :handle, :uniqueness => true, :length => { minimum: 4 }
  validates :position, :inclusion => { in: ['left', 'center', 'right'] }
  validates :layout, :inclusion => { in: ['one-column', 'sidebar-left', 'sidebar-right'] }
  before_validation :set_defaults

  belongs_to :user
  has_many :widgets, inverse_of: :page

  def generate_handle
    SecureRandom.urlsafe_base64(6)
  end

  private
    def set_defaults # can I get rid of this method by putting values into the site_builder?
      self.position = 'center' if self.position.nil?
      self.layout = 'one-column' if self.layout.nil?
      self.company = 'My Company' if self.company.nil?
      self.handle = self.generate_handle if self.handle.nil?
    end
end
