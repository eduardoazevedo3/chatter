class ChatMessage < ApplicationRecord
  attribute :text, :encrypted

  belongs_to :author, class_name: 'User'
  belongs_to :user

  validates :text, presence: true, length: { maximum: 500 }
end
