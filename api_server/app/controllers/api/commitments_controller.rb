module Api
  class CommitmentsController < ApplicationController
    before_action :set_commitment, only: [:show, :update, :destroy]
    include ::ControllerHelpers 
    before_action :authenticate_user

    
    # Calculate attendance so for all activities for this commitment
    def commitment_score commitment
      
      commitment_score = {}
      activity_count = commitment.activities.count
      "-------------- #{activity_count} ---------------"
      commitment.activities.each do |activity|
        @activity = activity.as_json
        @attendance = get_members_attendance(@activity)

        @attendance.each do |member, attendance| 

          if commitment_score[member] && attendance == true
            commitment_score[member] += 100
          elsif commitment_score[member] && attendance == false
            commitment_score[member] += 0
          elsif !commitment_score[member]  && attendance == false
            commitment_score[member] = 0
          else 
            commitment_score[member] = 100
          end

        end
      end

      commitment_score.each do |member, attendance|
        commitment_score[member] = attendance / activity_count
      end

     return commitment_score

    end
    
  # append attendance record to the commitment record
  def append_attendance_record commitments
    commitments_api_data = {};

    commitments.each do |commitment|
      hashed_commitment = commitment.as_json
      hashed_commitment[:attendance] =  commitment_score(commitment)

      hashed_commitment[:joined] = commitment.user_has_joined?(current_user.id)

      commitments_api_data[commitment["id"]] = hashed_commitment
    end

    return commitments_api_data

  end
    # GET /commitments
    def index
      commitments = current_user.commitments
    
      commitments_api_data = append_attendance_record(commitments)
     
      render json: commitments_api_data
    end

    # GET /commitments/1
    def show
      
      render json: @commitment
    end

    # POST /commitments
    def create
      @commitment = Commitment.new(commitment_params)
      if @commitment.save
        Member.create!(
          commitment_id: @commitment.id,
          user_id: current_user.id,
          joined: true
        )
        @commitment.add_members_and_invite(params[:member_emails], User.find(current_user.id))
        render json: @commitment, status: :created
      else
        render json: @commitment.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /commitments/1
    def update
      if @commitment.update(commitment_params)
        render json: @commitment
      else
        render json: @commitment.errors, status: :unprocessable_entity
      end
    end

    # DELETE /commitments/1
    def destroy
      @commitment.destroy
    end

    def attendance
      render json: {
        "commitment_id" => 1,
        "activity_attendance" => [{ "John" => true } , { "Jane" => false }, { "Bob" => true }]
      }
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_commitment
        @commitment = Commitment.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def commitment_params
        params.require(:commitment).permit(:name, :description, :start_date, :end_date, :stakes, :activity_type, :thumbnail)
      end
  end
end