# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

ActiveRecord::Base.transaction do
  demo = User.new({
    username: 'demo_user',
    email: 'demo_email@gmail.com',
    password: 'demo'
  })
  demo.save!

  p1 = Page.new_starting_page
  p1.title = "Cold Thunder Rocks"
  p1.company = "Cold Thunder"
  p1.theme = "skulls"
  p1.handle = "coldthuner"
  p1.owner = demo


  p2 = Page.new_starting_page
  p2.title = "Zach and Miri Tie the Knot"
  p2.company = "Zach and Miri"
  p2.theme = "feathers"
  p2.handle = "zachandmiri"
  p2.owner = demo


  p3 = Page.new_starting_page
  p3.title = "Twin Donuts"
  p3.company = "Twin Donuts"
  p3.theme = "tablecloth"
  p3.handle = "twindonuts"
  p3.owner = demo

  p1.save!
  p2.save!
  p3.save!

end