# Read about factories at https://github.com/thoughtbot/factory_girl
require 'faker'
FactoryGirl.define do
	sequence(:email) { |n| "user#{n}@tictacyo.com" }
  factory :user do
  	email
  	first_name {Faker::Name.first_name}
  	last_name	{Faker::Name.last_name}
  	age {18 + Random.rand(30)}
  	username {Faker::Name.name}
  	gender {['male','female','any'].shuffle.first}
  	gender_preference {['male','female','any'].shuffle.first}
  	address "Toronto, ON, Canada"
  	biography {Faker::Lorem.sentence}
  	password "1234"
		password_confirmation "1234"
  end
end
