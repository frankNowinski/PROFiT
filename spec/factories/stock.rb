FactoryGirl.define do
  factory :stock do
    id SecureRandom.uuid
    ticker 'AAPL'
    shares 3
    purchased_date '2017-03-10'
    purchased_price '140'
  end
end

