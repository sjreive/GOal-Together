module ControllerHelpers
  extend ActiveSupport::Concern

  included do
    :get_members_attendance
  end

  # Checks votes to determine if a member attended
    def didAttend? member_id
      
      trueVotesCount = Vote.where("attendee_id = ? AND activity_id = ? AND attended = ?", member_id, @activity.id, true).count
      falseVotesCount = Vote.where("attendee_id = ? AND activity_id = ? AND attended = ?", member_id, @activity.id, false).count
  
      if trueVotesCount > falseVotesCount
        return true
      else
        return false
      end
        
    end  
  
  
  
  # create member attendance record for a given activity
     def get_members_attendance
      @commitment_id = @activity.commitment_id
      @activity_members = Member.where(commitment_id: @commitment_id)
      
      attendance_record = {}
      
      @activity_members.each do |member|
        attendance_record[member.user_id] = didAttend?(member.user_id)
      end
      return attendance_record
    end




  end
