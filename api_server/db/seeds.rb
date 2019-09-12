# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "Seeding Data ..."

puts "Finding or Creating Users ..."
User.destroy_all
usr1 = User.create(
  first_name: "John",
  last_name: "Smith",
  email: "john.smith@gmail.com",
  password: "123456",
  password_confirmation: "123456",
  avatar_url: "c73xjbgjfszmycs1upz1"
)

usr2 = User.create(
  first_name: "Jane",
  last_name: "Smith",
  email: "Jane.smith@gmail.com",
  password: "123456",
  password_confirmation: "123456",
  avatar_url: "sm60szzowvbzol0luccq"
)
usr3 = User.create(
  first_name: "Liz",
  last_name: "Jones",
  email: "liz.jones@gmail.com",
  password: "123456",
  password_confirmation: "123456",
  avatar_url: "pfhshugcpcfiboh9rhq5"
)


usr4 = User.create(
  first_name: "Sarah",
  last_name: "Reive",
  email: "sarahjreive@gmail.com",
  password: "123456",
  password_confirmation: "123456",
  avatar_url: "mdaijyu0shsvhwywfxma"
)

usr5 = User.create(
  first_name: "Kendall",
  last_name: "Rowe",
  email: "kendall.rowe312@gmail.com",
  password: "123456",
  password_confirmation: "123456",
  avatar_url: "j7goqehca3grbnhrysn4"
)

usr6 = User.create(
  first_name: "Jessie",
  last_name: "Wang",
  email: "jessie@jessie.com",
  password: "123456",
  password_confirmation: "123456",
  avatar_url: "rd6dqy6twvadw5wa6dal"
)

usr7 = User.create(
  first_name: "T",
  last_name: "Dog",
  email: "T@Dog.com",
  password: "123456",
  password_confirmation: "123456",
  avatar_url: "ojjzwmlvfm0yw7nx6yen"
)

usr8 = User.create(
  first_name: "Jay Jay",
  last_name: "Ting",
  email: "Jay@Jay.com",
  password: "123456",
  password_confirmation: "123456",
  avatar_url: "kiwq5lxaj1o8xqbi5c3h"
)

# Commitments
Commitment.destroy_all
puts "Re-creating Commitments ..."
cmt1 = Commitment.create(
  name: "Get jacked",
  description: "We're getting so fit together",
  start_date: 10.days.ago,
  end_date: 3.days.from_now,
  activity_type: "Fitness",
  stakes: "Buys everyone a pint",
  thumbnail: "https://media.gettyimages.com/vectors/flat-dumbbell-icon-vector-id501279419?s=612x612"
)

cmt2 = Commitment.create(
  name: "Book Club",
  description: "We mostly just drink wine",
  start_date: 60.days.ago,
  end_date: 60.days.from_now,
  activity_type: "Social",
  stakes: "Buys snacks",
  thumbnail: "https://pbs.twimg.com/profile_images/1652308321/BookStairs_Icon_400x400.gif"
)

cmt3 = Commitment.create(
  name: "Get Fit",
  description: "Go to the gym regularly during bootcamp",
  start_date: 20.days.ago,
  end_date: 3.days.from_now,
  activity_type: "Fitness",
  stakes: "Secret Dare",
  thumbnail: "https://media.gettyimages.com/vectors/flat-dumbbell-icon-vector-id501279419?s=612x612"
)

cmt4 = Commitment.create(
  name: "Book Club",
  description: "Mostly we just drink wine...",
  start_date: 20.days.ago,
  end_date: 3.days.from_now,
  activity_type: "Fitness",
  stakes: "Buys everyone a pint",
  thumbnail: "https://media.gettyimages.com/vectors/flat-dumbbell-icon-vector-id501279419?s=612x612"
)

Member.create!(
  commitment_id: 1,
  user_id: 1,
  joined: false
)
Member.create!(
  commitment_id: 1,
  user_id: 2,
  joined: true
)
Member.create!(
  commitment_id: 1,
  user_id: 3,
  joined: true
)

Member.create!(
  commitment_id: 2,
  user_id: 1,
  joined: true
)
Member.create!(
  commitment_id: 2,
  user_id: 2,
  joined: false
)
Member.create!(
  commitment_id: 2,
  user_id: 3,
  joined: true
)


# New members
Member.create!(
  commitment_id: 3,
  user_id: 4,
  joined: true
)

Member.create!(
  commitment_id: 3,
  user_id: 6,
  joined: true
)

Member.create!(
  commitment_id: 3,
  user_id: 7,
  joined: true
)

Member.create!(
  commitment_id: 3,
  user_id: 8,
  joined: true
)

Member.create!(
  commitment_id: 4,
  user_id: 4,
  joined: false
)

Member.create!(
  commitment_id: 4,
  user_id: 5,
  joined: true
)

puts "Finding or Creating Activities ..."
Activity.destroy_all
act1 = Activity.create(
  title: "Gym visit 1",
  date: 5.days.ago,
  commitment_id: cmt1.id
)

act2 = Activity.create(
  title: "Spin class",
  date: 2.days.ago,
  commitment_id: cmt1.id
)

act3 = Activity.create(
  title: "Getting Loaded & Reading the Hobbit",
  date: 200.days.from_now,
  commitment_id: cmt2.id
)

act3 = Activity.create(
  title: "Body Pump",
  date: 100.days.from_now,
  commitment_id: cmt3.id
)

act4 = Activity.create(
  title: "Spin Class",
  date: 10.days.ago
  commitment_id: cmt3.id
)

act5 = Activity.create(
  title: "Body Pump",
  date: 5.days.ago
  commitment_id: cmt3.id
)

act7 = Activity.create(
  title: "Yoga",
  date: 5.days.from_now,
  commitment_id: cmt3.id
)

act6 = Activity.create(
  title: "Body Pump",
  date: 10.days.ago,
  commitment_id: cmt3.id
)

puts "Finding or Creating Votes ..."

# User 1 votes
act1.votes.create!({
  attended: true,
  attendee_id: usr1.id,
  voter_id: usr2.id
})
  
act1.votes.create!({
  attended: false,
  attendee_id: usr1.id,
  voter_id: usr3.id
})

# User 2 Votes
act1.votes.create!({
  attended: true,
  attendee_id: usr2.id,
  voter_id: usr1.id
})

act1.votes.create!({
  attended: false,
  attendee_id: usr2.id,
  voter_id: usr3.id
})

# User 3 Votes
act1.votes.create!({
  attended: true,
  attendee_id: usr3.id,
  voter_id: usr1.id
})

act1.votes.create!({
  attended: true,
  attendee_id: usr3.id,
  voter_id: usr2.id
})

#User 4 votes
# activity 4


#activity 5
act5.votes.create!({
  attended: false,
  attendee_id: usr4.id,
  voter_id: usr4.id
})

act5.votes.create!({
  attended: true,
  attendee_id: usr6.id,
  voter_id: usr4.id
})

act5.votes.create!({
  attended: false,
  attendee_id: usr7.id,
  voter_id: usr4.id
})

act5.votes.create!({
  attended: true,
  attendee_id: usr8.id,
  voter_id: usr4.id
})

#activity 6
act6.votes.create!({
  attended: true,
  attendee_id: usr4.id,
  voter_id: usr4.id
})

act6.votes.create!({
  attended: true,
  attendee_id: usr6.id,
  voter_id: usr4.id
})

act6.votes.create!({
  attended: true,
  attendee_id: usr7.id,
  voter_id: usr4.id
})

act6.votes.create!({
  attended: true,
  attendee_id: usr8.id,
  voter_id: usr4.id
})


#User 6 votes
# activity 4
act4.votes.create!({
  attended: false,
  attendee_id: usr4.id,
  voter_id: usr6.id
})

act4.votes.create!({
  attended: true,
  attendee_id: usr6.id,
  voter_id: usr6.id
})

act4.votes.create!({
  attended: true,
  attendee_id: usr7.id,
  voter_id: usr6.id
})

act4.votes.create!({
  attended: true,
  attendee_id: usr8.id,
  voter_id: usr6.id
})

#activity 5
act5.votes.create!({
  attended: false,
  attendee_id: usr4.id,
  voter_id: usr6.id
})

act5.votes.create!({
  attended: true,
  attendee_id: usr6.id,
  voter_id: usr6.id
})

act5.votes.create!({
  attended: false,
  attendee_id: usr7.id,
  voter_id: usr6.id
})

act5.votes.create!({
  attended: true,
  attendee_id: usr8.id,
  voter_id: usr6.id
})

#activity 6
act6.votes.create!({
  attended: true,
  attendee_id: usr4.id,
  voter_id: usr6.id
})

act6.votes.create!({
  attended: true,
  attendee_id: usr6.id,
  voter_id: usr6.id
})

act6.votes.create!({
  attended: true,
  attendee_id: usr7.id,
  voter_id: usr6.id
})

act6.votes.create!({
  attended: true,
  attendee_id: usr8.id,
  voter_id: usr6.id
})


#User 7 votes

# activity 4
act4.votes.create!({
  attended: false,
  attendee_id: usr4.id,
  voter_id: usr7.id
})

act4.votes.create!({
  attended: true,
  attendee_id: usr6.id,
  voter_id: usr7.id
})

act4.votes.create!({
  attended: true,
  attendee_id: usr7.id,
  voter_id: usr7.id
})

act4.votes.create!({
  attended: true,
  attendee_id: usr8.id,
  voter_id: usr6.id
})

#activity 5
act5.votes.create!({
  attended: false,
  attendee_id: usr4.id,
  voter_id: usr7.id
})

act5.votes.create!({
  attended: true,
  attendee_id: usr6.id,
  voter_id: usr7.id
})

act5.votes.create!({
  attended: false,
  attendee_id: usr7.id,
  voter_id: usr7.id
})

act5.votes.create!({
  attended: true,
  attendee_id: usr8.id,
  voter_id: usr7.id
})

#activity 6
act6.votes.create!({
  attended: true,
  attendee_id: usr4.id,
  voter_id: usr7.id
})

act6.votes.create!({
  attended: true,
  attendee_id: usr6.id,
  voter_id: usr7.id
})

act6.votes.create!({
  attended: true,
  attendee_id: usr7.id,
  voter_id: usr7.id
})

act6.votes.create!({
  attended: true,
  attendee_id: usr8.id,
  voter_id: usr7.id
})

#User 8 votes

# activity 4
act4.votes.create!({
  attended: false,
  attendee_id: usr4.id,
  voter_id: usr8.id
})

act4.votes.create!({
  attended: true,
  attendee_id: usr6.id,
  voter_id: usr8.id
})

act4.votes.create!({
  attended: true,
  attendee_id: usr7.id,
  voter_id: usr8.id
})

act4.votes.create!({
  attended: true,
  attendee_id: usr8.id,
  voter_id: usr8.id
})

#activity 5
act5.votes.create!({
  attended: false,
  attendee_id: usr4.id,
  voter_id: usr8.id
})

act5.votes.create!({
  attended: true,
  attendee_id: usr6.id,
  voter_id: usr8.id
})

act5.votes.create!({
  attended: false,
  attendee_id: usr7.id,
  voter_id: usr8.id
})

act5.votes.create!({
  attended: true,
  attendee_id: usr8.id,
  voter_id: usr8.id
})

#activity 6
act6.votes.create!({
  attended: true,
  attendee_id: usr4.id,
  voter_id: usr8.id
})

act6.votes.create!({
  attended: true,
  attendee_id: usr6.id,
  voter_id: usr8.id
})

act6.votes.create!({
  attended: true,
  attendee_id: usr7.id,
  voter_id: usr8.id
})

act6.votes.create!({
  attended: true,
  attendee_id: usr8.id,
  voter_id: usr8.id
})
