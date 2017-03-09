class User < ApplicationRecord
  has_many :stocks

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:facebook]

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email    = auth.info.email if auth.info.email
      user.name     = auth.info.name
      user.password = Devise.friendly_token[0,20]
    end
  end
end
