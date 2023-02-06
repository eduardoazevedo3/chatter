class ChatMessage < ApplicationRecord
  attribute :text, :encrypted

  after_commit :cable_send_message, on: :create

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
    ["#{author_id}_#{user_id}", "#{user_id}_#{author_id}"].each do |room|
      ActionCable.server.broadcast "chat_messages_#{room}", cable_serialized_message
    end
  end

  def cable_serialized_message
    {
      message: {
        id:,
        text:,
        createdAt: created_at,
        updatedAt: updated_at,
        author:
      }
    }
  end
end
