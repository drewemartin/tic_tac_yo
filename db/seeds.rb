# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

20.times do 
  User.create!(
    :email => Faker::Internet.email,
    :crypted_password => "password#{(1..4500).to_a.sample}",
    :salt => "sodium",
    :first_name => Faker::Name.first_name,
    :last_name => Faker::Name.last_name,
    :username => Faker::Internet.user_name,
    :gender => ["male", "female"].sample,
    :gender_preference => ["any","female", "male"].sample,
    :address => "#{(1..700).to_a.sample} W 45th St New York, NY 10036, USA",
    :biography => Faker::Lorem.sentence(2),
    :date_of_birth => Time.now - ((18..45).to_a.sample).years
    )
end

 