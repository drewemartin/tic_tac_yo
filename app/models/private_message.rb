class PrivateMessage < ActiveRecord::Base
	belongs_to :sender, class_name: "User"
	belongs_to :recipient, class_name: "User"

	validates :sender, :recipient, :presence => true
	validates :message, length: { minimum: 1 }

	scope :by_recipient, lambda{|recipient| where(recipient: recipient) unless recipient.nil?}

	scope :excluding_by_senders, lambda{|senders| where.not(sender: senders) if senders.any?}
end
