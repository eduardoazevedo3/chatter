class RemoveDecryptedTextFromChatMessages < ActiveRecord::Migration[6.1]
  def up
    remove_column :chat_messages, :decrypted_text
  end

  def down
    add_column :chat_messages, :decrypted_text, :text, null: false, after: :read
  end
end
