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

  has_many :obtained_messages, class_name: "PrivateMessage", foreign_key: 'recipient_id', dependent: :destroy
  has_many :users_i_recieved_messages_from, through: :obtained_messages, source: :sender

  geocoded_by :address   
	after_validation :geocode 
  
  validates :first_name, length: {minimum: 2}
  validates :last_name, length: {minimum: 2}
  validates_format_of :first_name, :with => /\A[a-zA-Z]+\z/
  #commented out because causes failure of db creation with postgres
  # validates_format_of :last_name, :with => /\A[a-zA-Z]+\z/
  # validates :username, length: {minimum: 4}
  validates :username,:email, uniqueness: true
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i

	validates :email,:first_name,:last_name,:address, :date_of_birth, :username, :presence => true
	validates :email, :uniqueness => true
	validate :check_user_greater_or_equal_than_18_years_old

  #paperclip configuration
  has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/
  validates_with AttachmentSizeValidator, :attributes => :avatar, :less_than => 1.megabytes
  def current_age
    age = DateTime.now.year - date_of_birth.year
  end

  def has_blocked(user)
    blocked_users.include?(user) ? true : false
  end

  def has_favorited(user)
    favorite_users.include?(user) ? true : false
  end

  def gender_i_like
    if gender_preference == "any"
      interested_in = "I like girls and guys"
    else
      interested_in = "I like #{gender_preference}s"
    end
  end

  scope :most_recent_five, -> { all.limit(10) }

  scope :by_city, lambda{|city| near(city) unless (city.nil? || city == 'all')}

  scope :by_gender, lambda{|gender| where(gender: gender) unless (gender.nil? || gender == 'all')}

  scope :by_age_range, lambda {|from_age, to_age|
    datetime_birth_year_from = DateTime.new(DateTime.now.year-from_age) unless from_age.nil?
    datetime_birth_year_to = DateTime.new(DateTime.now.year-to_age) unless to_age.nil?
    where(date_of_birth: (datetime_birth_year_to)..datetime_birth_year_from) unless (from_age.nil? || to_age.nil?)
  }

  scope :everyone_but_current, lambda {|current_user| where("id != ?",current_user.id) unless current_user.nil?}


	private

	def check_user_greater_or_equal_than_18_years_old
			return if(date_of_birth.nil?)
			current_year = DateTime.now.year
			if (current_year - date_of_birth.year) < 18
				errors.add(:date_of_birth,"the user is less than 18 years old.")
			end
	end

end
