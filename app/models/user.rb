class User < ActiveRecord::Base
  authenticates_with_sorcery!

  has_many :favorites, foreign_key: 'favoriter_id', dependent: :destroy
  has_many :favorite_users, through: :favorites, source: :favorited
  has_many :favorited_by, class_name: "Favorite", foreign_key: 'favorited_id', dependent: :destroy
  has_many :favorited_you, through: :favorited_by, source: :favoriter
  #  foriegn_key:'favoriter_id'
  # has_many :favorited_users, through: :favorites, source: :favorited
  # has_many :favorites, class_name:'favorite',dependent: :destroy
  #  foreitign_key:'favorited_id'

end
