class ChatMessage < ApplicationRecord
  attribute :text, :encrypted

  belongs_to :author, class_name: 'User'
  belongs_to :user

  validates :text, presence: true, length: { maximum: 500 }

  add_scope :by_room do |author_id, user_id|
    where(
      author_id: [author_id, user_id],
      user_id: [author_id, user_id]
    )
  end

  private

  def cable_send_message
    message = { id: id, author_id: author_id, text: text, created_at: created_at }
    ActionCable.server.broadcast("chat_messages_#{user_id}", message: message)
  end
end
