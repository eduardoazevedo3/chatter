class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.boolean :active, default: true, null: false
      t.string :full_name, null: false
      t.string :email, null: false
      t.string :phone_number, limit: 20

      t.timestamps
      t.index :email, unique: true
    end
  end
end
