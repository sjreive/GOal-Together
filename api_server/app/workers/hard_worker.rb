class HardWorker
  include Sidekiq::Worker

  def perform(name, count)
    puts "time: #{Date.new} name: #{name} count: #{count}"
    # puts Activity.first.inspect
  end
end