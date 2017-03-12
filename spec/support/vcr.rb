require 'vcr'

VCR.configure do |config|
  config.cassette_library_dir = "spec/fixtures/vcr_cassettes"
  config.hook_into :webmock
  config.default_cassette_options = { :serialize_with => :json, :record => :once }
  config.allow_http_connections_when_no_cassette = true

  # ==> Print VCR output to console
  # config.debug_logger = $stderr
end

