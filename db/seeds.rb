# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


20.times do |title, description, goal, start_time, end_time, picture_url, category, user|
  var date = Date.new
  var date_nb = %w(18 19 20 21 22 23 24 25 26 27 28 29 30)

  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name
  username = Faker::Internet.user_name('Nancy')
  gender = 'female'
  email = Faker::Internet.email
  biography = Faker::Lorem.paragraph
    :crypted_password => "password#{(1..4500).to_a.sample}",
  address = Faker::Address.street_name,
     :date_of_birth => Time.now - ((18..45).to_a.sample).years
  rypted_password = 

 
  
  User.create!( 
    :first_name => first_name,
    :last_name => last_name,
    :username => username,
    :gender => gender,
    :biography=> biography,
    :email => email,
    :biography => biography
    )
end

20.times do |title, description, goal, start_time, end_time, picture_url, category, user|
  username = Faker::Internet.user_name('Nancy')
  gender = 'male'
  email = Faker::Internet.email
  biography = Faker::Lorem.paragraph 
 
 
  
  User.create!( 
    :first_name => first_name,
    :last_name => last_name,
    :username => username,
    :gender => gender,
    :biography=> biography,
    :email => email,
    :biography => biography
    )
end

