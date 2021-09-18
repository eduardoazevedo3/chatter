class V1::ChatMessagesController < ApplicationController
  before_action :set_chat_message, only: [:show, :update, :destroy]

  # GET /chat_messages
  def index
    chat_messages = ChatMessage.includes(:user, :author)
    render json: chat_messages.as_json(include: [:user, :author])
  end

  # GET /chat_messages/1
  def show
    render json: @chat_message
  end

  # POST /chat_messages
  def create
    chat_message = ChatMessage.new(chat_message_params)

    if chat_message.save
      render json: chat_message, status: :created
    else
      render json: chat_message.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /chat_messages/1
  def update
    if @chat_message.update(chat_message_params)
      render json: @chat_message
    else
      render json: @chat_message.errors, status: :unprocessable_entity
    end
  end

  # DELETE /chat_messages/1
  def destroy
    @chat_message.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_chat_message
    @chat_message = ChatMessage.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def chat_message_params
    params.require(:chat_message).permit(
      :author_id,
      :user_id,
      :delivered,
      :read,
      :text
    )
  end
end
