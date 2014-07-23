require 'rails_helper'

describe Favorite do
  context "before creation" do
  	it "has a valid factory" do
  		expect(FactoryGirl.create(:favorite)).to be_valid
  	end
  	it "is invalid without a favoriter" do
  		expect(FactoryGirl.build(:favorite, favoriter:nil)).to_not be_valid
  	end
  	it "is invalid without a favorirted" do
  		 expect(FactoryGirl.build(:favorite, favorited:nil)).to_not be_valid
  	end
  end

  context "as for association" do
  	it "should belongs to a favoriter" do
  		 favorite = FactoryGirl.create(:favorite)
  		 expect(favorite).to respond_to(:favoriter)
  	end
  	it "should belongs to a favorited" do
  		 favorite = FactoryGirl.create(:favorite)
  		 expect(favorite).to respond_to(:favorited)
  	end
  end
end
