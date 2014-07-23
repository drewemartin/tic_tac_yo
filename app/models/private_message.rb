class PrivateMessage < ActiveRecord::Base
	belongs_to :sender, class_name: "User"
	belongs_to :recipient, class_name: "User"

	validates :sender, :recipient, :presence => true
	validates :message, length: { minimum: 1 }
end
