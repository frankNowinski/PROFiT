#!/bin/bash

bundle install
rails assets:precompile

git add .
git ci --amend --no-edit
git push -f 

git push heroku master && heroku run rake db:migrate && heroku restart

