require 'rails_helper'

describe Block do
	context "before creation" do
		it "has a valid factory" do
			expect(FactoryGirl.create(:block)).to be_valid
		end
		it "is invalid without a blocker" do
			expect(FactoryGirl.build(:block, blocker:nil)).to_not be_valid
		end
		it "is invalid without a blocked" do
			expect(FactoryGirl.build(:block, blocked: nil)).to_not be_valid
		end
	end

	context "as for association" do
		it "it should belongs to a blocker" do
			block = FactoryGirl.create(:block)
			expect(block).to respond_to(:blocker)
		end
		it "it should belongs to a blocked" do
			block = FactoryGirl.create(:block)
			expect(block).to respond_to(:blocked)
		end
	end
  
end
