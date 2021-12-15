class User < ApplicationRecord
  devise :database_authenticatable, :recoverable, :rememberable, :validatable

  include DeviseTokenAuth::Concerns::User

  after_commit :remove_devise_cache

  has_many :chat_messages, dependent: :restrict_with_error
  has_many :authored_chat_messages, class_name: :ChatMessage, foreign_key: :author_id, dependent: :restrict_with_error

  validates :full_name, presence: true, length: { minimum: 1, maximum: 255 }
  validates :email, length: { maximum: 255 }
  validates :phone_number, length: { maximum: 20 }

  add_scope :search do |query|
    where('users.full_name LIKE ?', "%#{query}%") if query.present?
  end

  def self.find(id)
    Rails.cache.fetch("users/#{id}", expires_in: 1.minute) do
      find_by!(id: id)
    end
  end

  def self.dta_find_by(attrs = {})
    cache_key = attrs.to_json.gsub(/"|{|}/, '')

    Rails.cache.fetch("users/#{cache_key}", expires_in: 1.minute) do
      find_by(attrs)
    end
  end

  private

  def remove_devise_cache
    cache_key = { uid: uid }.to_json.gsub(/"|{|}/, '')
    Rails.cache.delete_multi(["users/#{cache_key}", "users/#{id}"])
  end
end
