class Favorite < ActiveRecord::Base
	belongs_to :favoriter, class_name: 'User'
	belongs_to :favorited, class_name: 'User'

	validates :favoriter,:favorited, presence: true
end
