# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :block do
  	association :blocker, factory: :user
  	association :blocked, factory: :user
  end
end
