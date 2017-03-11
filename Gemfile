source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.0.2'
gem 'react_on_rails', '~> 6'
gem 'pg', '~> 0.18'
gem 'puma', '~> 3.0'
gem 'uglifier'
gem 'bootstrap', '~> 4.0.0.alpha6'
gem 'sass-rails', '~> 5.0'
gem 'jquery-rails'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.5'
gem 'haml-rails'
gem 'rspec-rails'

gem 'devise'
gem 'omniauth-facebook'
gem 'faraday'

group :development, :test do
  gem 'pry'
  gem 'pry-remote'
  gem 'pry-nav'
  gem 'dotenv-rails'
  gem 'rails-controller-testing'
  gem 'capybara'
  gem 'warden'
  gem 'factory_girl_rails'
  gem 'database_cleaner'
  gem 'vcr'
  gem 'webmock'
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

gem 'rails_12factor', group: :production
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem 'mini_racer', platforms: :ruby

source 'https://rails-assets.org' do
  gem 'rails-assets-tether', '>= 1.3.3'
end

ruby '2.3.0'
