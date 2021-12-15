module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user ||= verified_user
    end

    private

    def verified_user
      return reject_unauthorized_connection unless credentials

      user = User.find_by(email: credentials['uid'])
      return user if user.valid_token?(credentials['access-token'], credentials['client'])

      reject_unauthorized_connection
    end

    def credentials
      @credentials ||= JSON.parse(Base64.decode64(token)) if token
    end

    def token
      @token ||= request.params[:token]
    end
  end
end
