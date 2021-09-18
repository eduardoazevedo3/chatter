class DeviseTokenAuthCreateUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :provider, :string, null: false, default: 'email', after: :id
    add_column :users, :uid, :string, null: false, default: '', after: :provider
    add_column :users, :allow_password_change, :boolean, default: false, after: :phone_number
    add_column :users, :remember_created_at, :datetime, after: :reset_password_sent_at
    add_column :users, :tokens, :json, after: :reset_password_token
    add_index  :users, [:uid, :provider], unique: true
  end
end
