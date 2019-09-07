class ApplicationController < ActionController::API
  include Knock::Authenticable
  # Before action: authentication
 
  # Checks votes to determine if a member attended
 def didAttend? member_id
      
  trueVotesCount = Vote.where("attendee_id = ? AND activity_id = ? AND attended = ?", member_id, @activity["id"], true).count
  falseVotesCount = Vote.where("attendee_id = ? AND activity_id = ? AND attended = ?", member_id, @activity["id"], false).count

  if trueVotesCount > falseVotesCount
    return true
  else
    return false
  end
    
end 


 #Function to check if user has voted for a given activity
 def voted? voter_id, activity_id
  votes = Vote.where("voter_id = ? AND activity_id = ?", voter_id, activity_id).count

  if votes > 0
    return true
  else
    return false
  end
end


  # Calculate attendance so for all activities for this commitment
   def commitment_score commitment
      
    commitment_score = {}
    activity_count = commitment.activities.count

    commitment.activities.each do |activity|
      @activity = activity.as_json
      @attendance = get_members_attendance(@activity)

      @attendance.each do |member, attendance|     
        if commitment_score[member] && attendance = true
          commitment_score[member] += 1
        elsif commitment_score[member] && attendance = false
          commitment_score[member] += 0
        elsif !commitment_score[member]  && attendance = false
          commitment_score[member] = 0
        else 
          commitment_score[member] = 1
        end
      end
    end

    commitment_score.each do |member, attendance|
      commitment_score[member] = attendance / activity_count * 100
    end

   return commitment_score

  end

  # create member attendance record for a given activity
  def get_members_attendance activity

    @commitment_id = @activity["commitment_id"]
    @activity_members = Member.where(commitment_id: @commitment_id)
    
    attendance_record = {}
    
    @activity_members.each do |member|
      attendance_record[member.user_id] = didAttend?(member.user_id)
    end
    return attendance_record
  end 



end
