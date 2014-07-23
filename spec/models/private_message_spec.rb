require 'rails_helper'

describe PrivateMessage do
	context "before creation" do
		it "has a valid factory" do
			expect(FactoryGirl.create(:private_message)).to be_valid 
		end
		it "is invalid without a sender" do
			expect(FactoryGirl.build(:private_message,sender: nil)).to_not be_valid
		end
		it "is invalid without a recipient" do
			expect(FactoryGirl.build(:private_message,recipient: nil)).to_not be_valid
		end
		it "message should not be empty" do
				expect(FactoryGirl.build(:private_message, message:"")).to_not be_valid		
		end
	end

	context "after creation" do
	end

	context "as for association" do
		it "it should belongs to a sender" do
			expect(FactoryGirl.create(:private_message)).to respond_to(:sender)
		end
		it "is should belongs to a recipient" do
						expect(FactoryGirl.create(:private_message)).to respond_to(:recipient)
		end
	end
end
