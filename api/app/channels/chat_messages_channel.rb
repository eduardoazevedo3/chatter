class ChatMessagesChannel < ApplicationCable::Channel
  def subscribed
    p '***'
    p params
    p '---'
    stream_from "chat_messages_#{current_user.id}" if current_user
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
