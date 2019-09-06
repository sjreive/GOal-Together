module Api
  class ActivitiesController < ApplicationController
    before_action :set_activity, only: [:show, :update, :destroy]
    include ::ControllerHelpers
    before_action :authenticate_user
    
    ## CONTROLLER HELPERS ##
    
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

    # append attendance record to the activity record
    def append_attendance_record
      @activities = Activity.all
      activities_api_data = {};

      @activities.each do |activity|
        @activity = activity.as_json
        @activity[:attendance] =  get_members_attendance(@activity)
        activities_api_data[@activity["id"]] = @activity
      end

      return activities_api_data

    end

  
    ## API END POINTS ##
   
    
    # GET /activities
    def index
      
      activities_api_data = append_attendance_record
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
