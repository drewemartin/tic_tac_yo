# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :favorite do
  	association :favoriter, factory: :user
  	association :favorited, factory: :user
  end
end
