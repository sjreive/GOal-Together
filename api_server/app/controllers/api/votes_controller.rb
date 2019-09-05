module Api
  class VotesController < ApplicationController
    before_action :set_vote, only: [:show, :update, :destroy]
    include ::ControllerHelpers

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

    #Function to check if user has voted for a given activity
    def voted? voter_id, activity_id
      votes = Vote.where("voter_id = ? AND activity_id = ?", voter_id, activity_id).count

      if votes > 0
        return true
      else
        return false
      end
    end
    
    # GET /votes
    def index
      @votes = Vote.all

      render json: @votes
    end

    # GET /votes/1
    def show
      render json: @vote
    end

      
    # POST /votes
    def create

     if voted?(params[:voter], params[:activity_id])
      render json: "already voted!"
     else
      params[:attendees].each do |attendee, attendance|
        vote_data = {attended: attendance, activity_id: params[:activity_id], attendee_id: attendee.to_i, voter_id: params[:voter]}
        puts vote_data
        @vote = Vote.new(vote_data)
        @vote.save!
      end
    end

    end

    # PATCH/PUT /votes/1
    def update
      if @vote.update(vote_params)
        render json: @vote
      else
        render json: @vote.errors, status: :unprocessable_entity
      end
    end

    # DELETE /votes/1
    def destroy
      @vote.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_vote
        @vote = Vote.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def vote_params
        params.require(:vote).permit(:attended)
      end
    end
end