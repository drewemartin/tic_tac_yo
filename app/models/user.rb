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

  geocoded_by :address   
	after_validation :geocode 

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
