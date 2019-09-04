module Api
  class VotesController < ApplicationController
    before_action :set_vote, only: [:show, :update, :destroy]

    # GET /votes
    def index
      @votes = Vote.all

      render json: @votes
    end

    # GET /votes/1
    def show
      render json: @vote
    end

    
    # # function to put client-side vote data into correct format
    # def formatVote (vote_params)
    #   vote_params[:attendees].each do |attendee, attendance|
    #     vote_data


    # end
    
    
    
    # POST /votes
    def create

      params[:attendees].each do |attendee, attendance|
        vote_data = {attended: attendance, activity_id: params[:activity_id], attendee_id: attendee.to_i, voter_id: params[:voter]}
        puts vote_data
        @vote = Vote.new(vote_data)
        @vote.save!
      end
      # if @vote.save
      #   render json: @vote, status: :created, location: @vote
      # else
      #   render json: @vote.errors, status: :unprocessable_entity
      # end
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
        params.require(:vote).permit(:attended?)
      end
  end
end