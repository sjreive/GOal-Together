module Api

  class UsersController < ApplicationController
    before_action :set_user, only: [:show, :update, :destroy]
    before_action :authenticate_user, except: [:create]

    def find_current_user
      render :json => current_user.as_json(except: [:password_digest])
    end

    def find
      @user = User.find_by(email: params[:user][:email])
      @users = User.all
      users_api_data = append_commitment_score(@users)
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
        puts "****************************************"
        puts "****************************************"
        puts "This is the score for #{commitment.id} : #{commitment_score.inspect} for #{user.id}"
        user_commitment_score += commitment_score[user.id]
        puts "This is the user commitment score #{user_commitment_score}"
        puts "****************************************"
        puts "****************************************"

        end
      end

      return user_commitment_score == 0 ? 100 : user_commitment_score/commitment_count
    end
        
      # append attendance record to the commitment record
      def append_commitment_score(users)
        
        users_api_data = {};
    
        users.each do |user|
          hashed_user = user.as_json
          hashed_user[:commitment_score] =  user_commitment_score(user)
          users_api_data[user["id"]] = hashed_user
        end
    
        return users_api_data
    
      end
    
    # GET /users
    def index
      users = []
      @commitments = current_user.commitments

      @commitments.each do |commitment| 
        commitment.members.each do |member|
          user = User.find(member.user_id)
          if user && !users.include?(user)
            users.push(user)
          end
        end
      end

      users_api_data = append_commitment_score(users)
      render json: users_api_data
    end

    # GET /users/1
    def show
      render json: @user
    end

    # POST /users
    def create
      @user = User.find_by(email: user_params[:email])
      if @user
        if @user.first_name
          render json: user.errors, status: :conflict
        else
          @user.update_attributes(user_params)
          if @user.avatar_url == ""
            @user.avatar_url = 'uiujwq03yj9pglrudhq1'
          end
          @user.save
          puts "##AFTER## #{@user.avatar_url}"
          hashed_user = @user.as_json
          hashed_user[:commitment_score] = 0
          render json: hashed_user.as_json(except: [:password_digest]), status: :created
        end
      else

        @user = User.new(user_params)
        if @user.avatar_url == ""
          @user.avatar_url = 'uiujwq03yj9pglrudhq1'
        end

        if @user.save
          render json: @user.as_json(except: [:password_digest]), status: :created
        else
          render json: @user.errors, status: :unprocessable_entity
        end
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