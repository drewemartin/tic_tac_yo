require 'rails_helper'

describe User do
  context "Before creation" do
    it "has a valid factory" do
      expect(FactoryGirl.create(:user)).to be_valid
    end
  	xit "is invalid without email"
  	xit "is invalid to have identical email"
  	xit "is invalid without first_name"
  	xit "is invalid without last_name"
  	xit "is invalid without age"
  	xit "age should be greater than 18 years old"
  	xit "is invalid without an address"
  	xit "password should be greater than 3 chars"
  end

  context "After creation" do
		xit "latitude should NOT be empty, if the address is a valid one"
		xit "longitude should NOT be empty, if the address is a valida one"
	end

	context "As for Association" do
		xit "it should have many 'favorites'"
		xit "it should have many 'favorite_users'"
		xit "it should have many 'favorited_you'"
		xit "it should have many 'private_messages'"
	end
end
