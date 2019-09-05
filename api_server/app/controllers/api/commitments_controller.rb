module Api
  class CommitmentsController < ApplicationController
    before_action :set_commitment, only: [:show, :update, :destroy]
    include ::ControllerHelpers 

    
    #Get All attendance for all activities for this commitment
    def commitment_score
      commitment_score = {}
      @commitment.activities.each do |activity|
        @activity = activity
        @attendance = get_members_attendance
        puts "attenance for #{@activity.title} is #{@attendance}"
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
        puts "attendance score for #{@activity.title} is #{commitment_score}"
      end
     puts commitment_score
  end
    
    
    # GET /commitments
    def index
      @commitments = Commitment.all

      render json: @commitments
    end

    # GET /commitments/1
    def show
      commitment_score
      render json: @commitment
    end

    # POST /commitments
    def create
      @commitment = Commitment.new(commitment_params)
  
      if @commitment.save
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
        params.require(:commitment).permit(:name, :description, :start_date, :end_date, :buy_in_cents, :activity_type, :thumbnail)
      end
  end
end