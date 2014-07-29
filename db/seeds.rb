# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.delete_all

40.times do 
    first_name = Faker::Name.first_name
    last_name = Faker::Name.last_name
    email = (first_name + "_" + last_name).downcase + "@tictacyo.com"
    username = first_name + " " + last_name
    address = ["New York, NY, USA", "Toronto, ON, CANADA", "London, UK"].sample
  User.create!(
    :email => email,
    :crypted_password => "12345",
    :first_name => first_name,
    :last_name => last_name,
    :username => username,
    :salt => "sodium",
    :gender => ["male", "female"].sample,
    :gender_preference => ["any","female", "male"].sample,
    :address => address,
    :biography => Faker::Lorem.paragraph(2),
    :date_of_birth => Time.now - ((18..70).to_a.sample).years
    )
    sleep 0.5
end

 



