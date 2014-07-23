# Read about factories at https://github.com/thoughtbot/factory_girl
require 'faker'
FactoryGirl.define do
  factory :private_message do
  	association :sender, factory: :user
  	association :recipient, factory: :user
  	message {Faker::Lorem.sentence}
  end
end
