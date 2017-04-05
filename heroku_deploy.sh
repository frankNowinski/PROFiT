#!/bin/bash

rails assets:precompile

heroku run rails db:migrate
heroku restart

git push heroku master
