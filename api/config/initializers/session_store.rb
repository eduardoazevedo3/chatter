# Be sure to restart your server when you modify this file.

Rails.application.configure do
  config.session_store :cookie_store, key: '_chatter_session'
  config.middleware.use config.session_store, config.session_options
end
