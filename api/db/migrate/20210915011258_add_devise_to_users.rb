# frozen_string_literal: true

class AddDeviseToUsers < ActiveRecord::Migration[6.1]
  def self.up
    # Database authenticatable
    add_column :users, :encrypted_password, :string, null: false, default: '', after: :phone_number

    # Recoverable
    add_column :users, :reset_password_token, :string, after: :encrypted_password
    add_column :users, :reset_password_sent_at, :datetime, after: :reset_password_token

    # Index
    add_index :users, :reset_password_token, unique: true
  end

  def self.down
    raise ActiveRecord::IrreversibleMigration
  end
end
