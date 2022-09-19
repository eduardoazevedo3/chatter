class ChatMessagesChannel < ApplicationCable::Channel
  def subscribed
    return unless current_user && params[:room].present?

    room = params[:room].to_s.split('_')
    return unless room.size == 2

    author = User.find_by(id: room.last)
    return unless author && room.first == current_user.id.to_s

    stream_from("chat_messages_#{params[:room]}")
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
