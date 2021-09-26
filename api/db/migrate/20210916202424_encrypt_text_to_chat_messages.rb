class EncryptTextToChatMessages < ActiveRecord::Migration[6.1]
  def up
    rename_column :chat_messages, :text, :decrypted_text
    add_column :chat_messages, :text, :text, null: false, after: :decrypted_text

    ChatMessage.all.each do |message|
      message.update!(text: message.decrypted_text)
    end
  end

  def down
    ChatMessage.all.each do |message|
      message.update!(decrypted_text: message.text)
    end

    remove_column :chat_messages, :text
    rename_column :chat_messages, :decrypted_text, :text
  end
end
