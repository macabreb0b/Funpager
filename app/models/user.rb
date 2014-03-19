# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)      not null
#  password_digest :string(255)      not null
#  token           :string(255)      not null
#  email           :string(255)
#  avatar_url      :string(255)
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  attr_reader :password
  validates :username, :token, :email, :password_digest, :presence => true
  validates :username, :token, :email, :uniqueness => true
  validates :password, length: {minimum: 3, allow_nil: true}

  before_validation :set_token

  has_many :pages

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.is_password?(password) ? user : nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def self.generate_token
    SecureRandom::urlsafe_base64(16)
  end

  def reset_session_token!
    self.token = User.generate_token
    self.save!
    self.token
  end

  private

    def set_token
      self.token ||= User.generate_token
    end
end
