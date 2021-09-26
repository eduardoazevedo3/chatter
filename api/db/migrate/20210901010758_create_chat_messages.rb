class CreateChatMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :chat_messages do |t|
      t.references :author, null: false, foreign_key: { to_table: :users }
      t.references :user, null: false, foreign_key: true
      t.boolean :delivered, null: false, default: false
      t.boolean :read, null: false, default: false
      t.text :text, null: false

      t.timestamps
    end
  end
end
