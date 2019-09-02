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
  name: "John Smith",
  email: "john.smith@gmail.com",
  password: "123456",
  avatar_url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABLFBMVEX////9yI7/T09iPzP2tHvyP0RzSj7ioHHWNDr5tnz6SUv4uYBrQzrPlmn2tXz/SEz3p3VYNi72sHL/QUL86dvyOkLnrof4wpZVMiv/zpLxMTf9x41dNypwRjr9xIXyuILjsX/lp3PkOj/UKDVZMSL7fmNVKxr1hGS2imT83dvzZ1X/x8XialT/gn7dNzzEl23usX1rPjDxKjH1lWvqi2Xzv4jZQkFUJQ362Lx2Uj/crHv85dP+9e791ayieVn3mpjzT1DwExz9z536tbXdV0rumWzlionfaGfbVFf2iIrTHSj96+vo4+H0amyhjojTycXieHb41sj0XF77zs3+rqr/m5j4o6H1dHTUIyuNdW2IZFfCtrOmjYSbh4Hf1tK0n5h1V01wV1OLZEuWdGft8o0QAAAMK0lEQVR4nO2deUMaSRPG5RoRDAaViCAQ4hGMqxISPBIkbtxcSmQ37sZVVmF9v/93eOdgmJme7unuoasbXZ8/ZY76UdVVXd0zMjUlR61ut3d+fnOtlWKxlRvm0zrdbrd/fn5+rcVirwHNG0edbv9mMNjYWFtbW1lZiZna71DOue32+9cDbcM+zThPK/0jx2IOdXo3g33dxiGXo5Ur0hm3vfMrbV8HG30btjRNe30r1XyKOr2rlQ0/21AbfifqbIOYiYY9QwfUStcKQPDq3QTQ+Z142zP8FniCZup1VxWRR72rYGNN2SOx1T0frNGPtwAnwom3N5hhR3LibX+wz3S0Zkv5SOxpGywGG9ro3WywHjwC1Er/U8sXW2PEM8TkPARQdyKlzkCqW+LhY9es5iHsq+LrXG2A8MVKmlclRYC9feaY45OGSlHBgHKgH1DN1K2jATkQA6gkTDvsWZFPszhABSWxA5NC/TlGWTYF4sNGqBmlsmdu17KSqONEuYA9mCyKH4LSB6LevfdB+EhDcEjYk4OnNxHEbnVcBfHJqoi9GHMTIRpQSqrpzELNYWLBQ9Ai1MAB+/twfDQHmgOxBQwINgllBATvEa+g5jAxSg51CGHbi3NAQCY+aMIu4BhkBAQuiHA1gi1CTULIuXcfLEaZ+YBLPlSMUougLEIoF/LwwRIOQPjYR+CQkH37kVcdkFrPyacTkvbmxlcPIEh5HaiBLu3fiK8V/HygzYVwF4ZwICyh6GEYig+SUHCiCedADXIciiUMywdJKDKVhueDrIfiCEMH6H0hHIsPctYmiHA8B4IS3orINFxdhGxCEbl0fD7IDnh8QhF8kKsYrTEJxx6ANiHcStRYmUYUHyhhKZghG6DYLJ+Cvg9AwqDuKZs9bNeeiNHubq19SKYE3EA8JxFm83dP4jPjK50uFyOGlpeXm7t3BEbAfYsuYSBm29WZmfg4yozYXFp+3sZWT0BCfMnPHo7Dp7MViz64EeMhhhFyIx+3XJpvh+Qz2QhojvxuLA0ACWcxgDV+vjQT29CNNRQRdA/Y/2gJH2A6KCRZEUGfou2jhNk2GyCP13yIbYmPmPr6pzsKYDqM13w6lEeIzr2zdQJhRgiZreceJ8JuH3qTaRYdhBkxPkPljVPYZ6I0rw+9ESkazFHTQwj6oIJnZoqkmTQYoNeJsE/ueVJNviqLMPJOGqFn3nboHYWQhBFnDg780Je7zUdrISThcnuECP3gnmsXOPtEIqEzsSkBPwXtSjXZaYlRujsihH681JVqslWJhE6qgX6lxJVqpBI60xrwd7v21RA6NR/82cvBilrC0iEwoGs1ShEh+DuWTqpRQwj/yozTQCkihH8XQXGmkfA+ydVwIGbzcqtFSVIqHT6faKzht+txiT5sG+v84J2FKb3mZ2M1Yw0/LpHQXOevzc5KeV19P9uO45ZnYAlNykh7RcYrQf8+wS8/pT22hCOgHlGT8VrXM8L6mkPY3K29CwH4rrbbpB50AA/4fh4P6BC+y2az+UNuwMO8fh71mykvghMS14BtwmbWLCZ3fJG6fGedRvciNOAByYUjwt2stU5Ft9WtZt6qsru0A8vvgQkzJECbcLk2JHzORfh8SFijub74ERawRXShLMJIGXZWQ8wzEglhcw15GMojhB2Ik0AIWxLpURp5Z9ka4wKMRKyT8vSpArAPF+mEVmXL73LWw908YxUFzjRTdMJIpB3La5yABqKWj7UZDizDAk4dUec0keJypBhi7m2eRd+DLB4BE5ILoqu3CLtXynIedJBOTS1RZ96gKkO7UFea2j0BCnrOZqqVoXfAYIDgnYWFiA9UCYRlGR40dZCZ90MCExaL5Qh04+TW4sES2kcBE348gO/uUVXkEUpJMI+Ej4T3kXBJ3s7Mf4BQwlwNRygxStUQoisaeOMqzaCOodissBACr1yQhK5o4Egq07rqRMvrxscMjBLW8nFCW0UMoQloQODoi6NP6YTwO79YpakDsTptq4pAFiuuz2iAilIpy0Cc9qhar1d01ev1qvcDqgvVDEN/mJYDfBgkqg9VBamvXmR8pjWZCGm7VIpqhSHUif6RWKHz0RONOhf6pjWYdFqkBWqVusCm0IV+J/rjVI/UIMYqwz5qUSGgv+pjp27uyuDBw5ZJVIqq/UhHLIgGJFIhqnUmPIWVYiR04S1gAl7UZ6GGAmeqKKDKQciPyK9JAGQO1FCAykPUEjp7E4VYBH+yhFnoKrgQxGL5SGGl92mxMu8u/ri6yMv3UXGV8GnxyLPSP97rluXJ8p+t1kF8XgRisSzjCcSQWlxyHBkSUR9+kxaeXrUORowh8k2xXD6YxPBE9N7OOryIenaZmPJAkR2sXK93T2h2Ial1YO2FcyBObnYh6RlPvmkuqTY3hJ5NT9czbIOxMl29p4R6G6jPbyhubNb1w2buLaHJGIRotv/V+H0mNABIkdqs21/CPSfU5V+zKFbq0yMvPwBCa2nGXNQ31/VdizYG4AMhJKwnxh844XAO+3AJ4w+csBp/4ISuJYH7RfjzOHG5SSesxhHCzcvE8U/VxjNoM1XIJXKNCwqhh0/X0tRFQz+vkNpUDUDTB91OQ7kWa4AOV+emhuc1PqhGCNTmcSFhKfeKvKmG+s9sli9zwzMLxxPsRtuBJuJbDr54+o3rzIl1o+NAS8x4eozGPWdOqBtbv+Y8ZvrjlIBnuPAVcu6vk7hks5VKeOWO0yqZDolRS6kt1TiotrYbCyhhIhEnvzUcEKMm4UJje4Igt7YXFuai0ShqZu5Vmo6HiVFd+tXmFhYmA9LGi+IQ37Ag+mM0MbzeBEC68TCETHGKidGEc0mlkAge1okMcYqP0ahySAwezon0OMXEaMJ3XemQeLxQcRoco2ogz/4i4WGdSIlTTIziCS3Iv87gAf8k44WIU6YYdWlh4U9gvtaPhSADcGEaFKe4GA0k1Bl/gE7ozqKBDsQ7MSBOeWLU1lwUMFJbdECME8lxiotRKqFuAxzhdzogT5yGiFEL8RIK8KTBcn+MEwlxiotRpjs0ToAIC4wG+DS3jkNMr8+FA9RbZBjAkwKbCT6rU1Ecog4Y9TdcbJcvwDjxOGeZy42o/8mPaABiD6XI/FJyPyAAzxq2RzgJzb+hiBYg/lgqYCLRgKgYW/Y6Eyfi8HAvog2IxCkrYKIAMUX9UEBsZiMcHexGHAEiiKyAiQLEguO3HLMhUazROqKtdXzbzH7d3DcAwuMcuyn4I+fWX1pan6MfHHzZ3DEAIdeAwQf0XM6Sd2qU4gfUJR7wzLugzWYMMmJTwX/mASyIT6Z2scAbSTAH+SOBEH8wKm/WBSgXF15CGiLWZhIh/uggwETjQjjhiTdKWRB9RxAJU7yAEPO2nyghxSTcV0AkND6hXQ4hFL8ffsnbjWM+JhPijg4CTOTE94jfw/VyrIScgIncd+GEviANgRiWEHdr8S1iA3cbTsSQhNg7N0QDbuIJ+WwNR+hvk01C0RvhaDkMhRiKEA8oviD6ymEYxDCEBEDxBfEDiZBnKIYhJN1WeIf4DVMsuBFDEBLvKrxDPCYTsiPyE5JvKrxDPCbfi91gbkLSIDQkmPCMOAx5nMhNGHRTwR3iGaFY8FnMSxjkQtEd4kWgD1mdyEsYeM+C2IJILIeQhIEuFF0QyeUwjMliCMUWxO2AYgFGGHjLRG5bKCGuO3RLBaHQDjG4WKghFFkuWnunyeTOzosXLyaEULdkZyeZPN0T9VjG57+TbhmoKKsMQuO2Ox5L/v4siPDLahInt1chCYcew2j1iyDCr9jLe7zKZnKU6/uIvsBzufRVECH1Rskko80pHhdG6bfdEUR4Sr8To806Y4q9daJ/s6eCCH8/XcWPRG4f8olyz9XV098FEU6dfP7yNXmqcxJJZRIaZpyeJr9++Sx6qeaPN29f/vLb3qol6YTD++799svLt2/+EMxmaXE+Y27Cx59+MlGTDuoeCOGeA5Y0wT49jZsWZOZh/kmP/UtIGV0mqYMK5EMHzCQzbmyZAEzoPFs4RE3HP7E8tMiruU9Dj43ARpJF6KA+BSF8Sny4+JHwkfCR8JHw3hKSf3JNPiHQOxcTRAgD6Ptns8oI56H+txsxTGUTzgABknONZEKgPGOqlZ7H/XCeVML5CvBPHvt+b00uYeaI999j/h8Fd2Y3Alfk8AAAAABJRU5ErkJggg=="
)

usr2 = User.create(
  name: "Jane Smith",
  email: "Jane.smith@gmail.com",
  password: "123456",
  avatar_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbg4n40okGbHtt3E5fdzEK-xBLbBUk54tTbyKxz3cZlKupKk0s"
)
usr3 = User.create(
  name: "Elizabeth Jones",
  email: "liz.jones@gmail.com",
  password: "123456",
  avatar_url: "https://www.shareicon.net/data/2016/06/25/786550_people_512x512.png"
)

# Commitments
Commitment.destroy_all
puts "Re-creating Commitments ..."
cmt1 = Commitment.create(
  name: "Get swoll",
  description: "We're getting so fit together",
  start_date: 10.days.ago,
  end_date: 3.days.from_now,
  buy_in_cents: 10000,
  activity_type: "Fitness",
  thumbnail: "https://media.gettyimages.com/vectors/flat-dumbbell-icon-vector-id501279419?s=612x612"
)

cmt2 = Commitment.create(
  name: "Book Club",
  description: "We mostly just drink wine",
  start_date: 60.days.ago,
  end_date: 60.days.from_now,
  buy_in_cents: 2000,
  activity_type: "Social",
  thumbnail: "https://pbs.twimg.com/profile_images/1652308321/BookStairs_Icon_400x400.gif"
)

usr1.commitments << cmt1
usr2.commitments << cmt1
usr3.commitments << cmt1

usr1.commitments << cmt2
usr2.commitments << cmt2
usr3.commitments << cmt2

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

puts "Finding or Creating Votes ..."

# User 1 votes
act1.votes.create!({
  attended?: true,
  attendee_id: usr1.id,
  voter_id: usr2.id
})
  
act1.votes.create!({
  attended?: false,
  attendee_id: usr1.id,
  voter_id: usr3.id
})

# User 2 Votes
act1.votes.create!({
  attended?: true,
  attendee_id: usr2.id,
  voter_id: usr1.id
})
act1.votes.create!({
  attended?: false,
  attendee_id: usr2.id,
  voter_id: usr3.id
})

# User 3 Votes
act1.votes.create!({
  attended?: true,
  attendee_id: usr3.id,
  voter_id: usr1.id
})

act1.votes.create!({
  attended?: true,
  attendee_id: usr3.id,
  voter_id: usr2.id
})