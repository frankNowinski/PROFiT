#!/bin/bash

bundle install
rails assets:precompile

git push heroku master && heroku run rake db:migrate && heroku restart

