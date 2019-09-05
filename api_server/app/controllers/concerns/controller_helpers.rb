module ControllerHelpers
  extend ActiveSupport::Concern

  included do
    :get_members_attendance
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
