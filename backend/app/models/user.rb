class User < ApplicationRecord
  devise :database_authenticatable, :recoverable, :rememberable, :validatable

  include DeviseTokenAuth::Concerns::User

  has_many :chat_messages, dependent: :restrict_with_error
  has_many :authored_chat_messages, class_name: :ChatMessage, foreign_key: :author_id, dependent: :restrict_with_error

  validates :full_name, presence: true, length: { maximum: 255 }
  validates :email, length: { maximum: 255 }
  validates :phone_number, length: { maximum: 20 }

  add_scope :search do |query|
    where('users.full_name LIKE ?', "%#{query}%") if query.present?
  end
end
