#!/bin/bash

bundle install
rails assets:precompile

git add .
git ci -m 'Deploy to Heroku'
git push 

git push heroku master && heroku run rake db:migrate && heroku restart

