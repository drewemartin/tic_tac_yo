class User < ActiveRecord::Base
  authenticates_with_sorcery!

  attr_accessor :password, :password_confirmation

  has_many :favorites, foreign_key: 'favoriter_id', dependent: :destroy
  has_many :favorite_users, through: :favorites, source: :favorited
  has_many :favorited_by, class_name: "Favorite", foreign_key: 'favorited_id', dependent: :destroy
  has_many :favorited_you, through: :favorited_by, source: :favoriter


  has_many :blocks, foreign_key: 'blocker_id', dependent: :destroy
  has_many :blocked_users, through: :blocks, source: :blocked
  has_many :blocked_by, class_name: "Block", foreign_key: 'blocked_id', dependent: :destroy
  has_many :blocked_you, through: :blocked_by, source: :blocker

  has_many :private_messages, foreign_key: 'sender_id', dependent: :destroy
  has_many :users_i_sent_messages, through: :private_messages, source: :recipient
  has_many :obtained_messages, class_name: "PrivateMessage", foreign_key: 'recipient_id'
  has_many :users_i_recieved_messages_from, through: :obtained_messages source: :sender

  geocoded_by :address   
	after_validation :geocode 
  
  validates :first_name, presence: true
  validates :first_name, length: {minimum: 2}
  validates :last_name, presence: true
  validates :last_name, length: {minimum: 2}
  validates_format_of :first_name, :with => /\A[a-zA-Z]+\z/
  validates_format_of :last_name, :with => /\A[a-zA-Z]+\z/
  validates :username, presence: true
  validates :username, length: {minimum: 4}
  validates :username, uniqueness: true
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
  validates :email, uniqueness: true
  validates :crypted_password, presence: true
  validates :crypted_password, length: {minimum: 8}
  validates :crypted_password, uniqueness: true

	validates :email,:first_name,:last_name,:address, :date_of_birth, :presence => true
	validates :email, :uniqueness => true
	validates :password, :length => {:minimum => 4 }
	validate :check_user_greater_or_equal_than_18_years_old

	private
	def check_user_greater_or_equal_than_18_years_old
			return if(date_of_birth.nil?)
			current_year = DateTime.now.year
			if (current_year - date_of_birth.year) < 18
				errors.add(:date_of_birth,"the user is less than 18 years old.")
			end
	end

end
