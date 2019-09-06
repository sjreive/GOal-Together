module Api

  class UsersController < ApplicationController
    before_action :set_user, only: [:show, :update, :destroy]
    before_action :authenticate_user

    def find_current_user
      render :json => current_user.as_json(only: [:id, :first_name])
    end

    def find
      @user = User.find_by(email: params[:user][:email])
      if @user
        render json: @user
      else
        @errors = @user.errors.full_messages
        render json: @errors
      end
    end

    # Calculate attendance so for all this users' commitments
    def user_commitment_score user
  
      user_commitment_score = 0;
      commitment_count = 0;
      
      user.commitments.each do | commitment |
        if (commitment_score(commitment) != {})
        commitment_count += 1
        commitment_score = commitment_score(commitment)
        puts "This is the score for #{commitment.id} : #{commitment_score.inspect} for #{user.id}"
        user_commitment_score += commitment_score[user.id]
        puts "This is the user commitment score #{user_commitment_score}"
        end
      end
      
      puts "This is the user commitment score #{user_commitment_score/commitment_count}"
      return user_commitment_score/commitment_count
    end
        
      # append attendance record to the commitment record
      def append_commitment_score
        @users = User.all
        users_api_data = {};
    
        @users.each do |user|
          hashed_user = user.as_json
          hashed_user[:commitment_score] =  user_commitment_score(user)
          users_api_data[user["id"]] = hashed_user
        end
    
        return users_api_data
    
      end
    
    # GET /users
    def index
      users_api_data = append_commitment_score
      render json: users_api_data
    end

    # GET /users/1
    def show
      render json: @user
    end

    # POST /users
    def create
      @user = User.new(user_params)

      if @user.save
        render json: @user, status: :created, location: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /users/1
    def update
      if @user.update(user_params)
        render json: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    # DELETE /users/1
    def destroy
      @user.destroy
    end

    def attendance
      render json: [{ "Val" => 85 } , { "Liz" => 30 }, { "Celine" => 97 }]
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_user
        @user = User.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :avatar_url)
      end
  end
end