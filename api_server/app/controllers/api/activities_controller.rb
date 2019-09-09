module Api
  class ActivitiesController < ApplicationController
    before_action :set_activity, only: [:show, :update, :destroy]
    include ::ControllerHelpers
    # before_action :authenticate_user
    
    ## CONTROLLER HELPERS ##
    
    # create member attendance record & voting record for a given activity
    def get_members_attendance activity
      @commitment_id = @activity["commitment_id"]
      @activity_members = Member.where(commitment_id: @commitment_id)
      
      attendance_record = {}
      voting_record = {}
      
      @activity_members.each do |member|
        attendance_record[member.user_id] = didAttend?(member.user_id)
        voting_record[member.user_id] = voted?(member.user_id, activity["id"])
      end
        
      return attendance_record, voting_record

    end 

    # append attendance & voting record to the activity record
    def append_attendance_record(activities)
      activities_api_data = {};

      activities.each do |activity|
        @activity = activity.as_json
        attendance_record, voting_record = get_members_attendance(@activity)
        @activity[:attendance] = attendance_record
        @activity[:voted] = voting_record
        activities_api_data[@activity["id"]] = @activity
      end

      return activities_api_data

    end

  
    ## API END POINTS ##
   
    
    # GET /activities
    def index
      activities = []
      @commitments = current_user.commitments

      @commitments.each do |commitment| 
        commitment.activities.each do |activity| 
          activities.push(activity)
        end
      end

      activities_api_data = append_attendance_record(activities)
      render json: activities_api_data
    end
  
    # GET /activities/1
    def show
      @members_attendance = get_members_attendance
      render json: [@activity, @members_attendance]
    end
  
    # POST /activities
    def create
      @activity = Activity.new(activity_params)
  
      if @activity.save
        render json: @activity, status: :created, location: @activity
      else
        render json: @activity.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /activities/1
    def update
      if @activity.update(activity_params)
        render json: @activity
      else
        render json: @activity.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /activities/1
    def destroy
      @activity.destroy
    end

    # def attendance
    #   render json: {
    #     "commitment_id" => 1,
    #     "activity_id" => 1,
    #     "activity_attendance" => [{ "Frank" => true } , { "Francis" => false }, { "Francita" => true }]
    #   }
    # end
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_activity
        @activity = Activity.find(params[:id])
      end
  
      # Only allow a trusted parameter "white list" through.
      def activity_params
        params.require(:activity).permit(:title, :date)
      end
  end
end
