class SorceryCore < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email,            :null => false
      t.string :crypted_password, :null => false
      t.string :salt,             :null => false
      t.string :first_name
      t.string :last_name
      t.string :age
      t.string :username
      t.string :gender
      t.string :gender_preference
      t.string :address
      t.decimal :longitude, precision: 9, scale: 6
      t.decimal :latitude, precision: 9, scale: 6
      t.text :biography
      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end