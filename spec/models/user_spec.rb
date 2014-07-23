require 'rails_helper'

describe User do
  context "Before creation" do
    it "has a valid factory" do
      user1 = FactoryGirl.build(:user)
      expect(user1).to be_valid
    end
  	it "is invalid without email" do
      expect(FactoryGirl.build(:user,email:nil)).to_not be_valid
    end
  	it "is invalid to have identical email" do
      user1 = FactoryGirl.create(:user)
      expect(FactoryGirl.build(:user,email:user1.email)).to_not be_valid
    end
  	it "is invalid without first_name" do
      expect(FactoryGirl.build(:user,first_name:nil)).to_not be_valid
    end
  	it "is invalid withouts last_name" do
      expect(FactoryGirl.build(:user,last_name:nil)).to_not be_valid
    end
  	it "is invalid without age" do
      expect(FactoryGirl.build(:user,age:nil)).to_not be_valid
    end
  	it "age should be greater than 18 years old" do
      expect(FactoryGirl.build(:user,age: 17)).to_not be_valid
    end
  	it "is invalid without an address" do
      expect(FactoryGirl.build(:user,address:nil)).to_not be_valid
    end
  	it "password should be greater than 3 chars" do
      expect(FactoryGirl.build(:user,password:"123")).to_not be_valid
    end
  end

  context "After creation" do
		it "latitude should NOT be empty, if the address is a valid one" do
      user1 = FactoryGirl.create(:user)
      expect(user1.latitude).to_not be_nil  
    end
		it "longitude should NOT be empty, if the address is a valida one" do
      user1 = FactoryGirl.create(:user)
      expect(user1.longitude).to_not be_nil 
    end
	end

	context "As for Association" do
		it "it should have many 'favorites'" do
      expect(FactoryGirl.create(:user)).to respond_to(:favorites)
    end
    it "it should have many 'favorited_by'" do
    	expect(FactoryGirl.create(:user)).to respond_to(:favorited_by)
    end
		it "it should have many 'favorite_users'" do
            expect(FactoryGirl.create(:user)).to respond_to(:favorite_users)
    end
		it "it should have many 'favorited_you'" do
        expect(FactoryGirl.create(:user)).to respond_to(:favorited_you)
    end

    it "it should have many 'blocks'" do
      user = FactoryGirl.create(:user)
      expect(user).to respond_to(:blocks)
    end
    it "it should have many 'blocked_users'" do
      user = FactoryGirl.create(:user)
      expect(user).to respond_to(:blocked_users)
    end
    it "it should have many 'blocked_by'" do
      user = FactoryGirl.create(:user)
      expect(user).to respond_to(:blocked_by)
    end
    it "it should have many 'blocked_you'" do
      user = FactoryGirl.create(:user)
      expect(user).to respond_to(:blocked_you)
    end

		it "it should have many 'private_messages'" do
        expect(FactoryGirl.create(:user)).to respond_to(:private_messages)
    end
	end
end
