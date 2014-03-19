class SessionsController < ApplicationController
  def new
    @user = User.new
    render 'new'
  end

  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])

    if @user
      login!(@user)
      redirect_to user_url(@user)
    else
      @user = User.new(user_params)
      flash.now[:errors] = "Invalid username or password"
      render 'new'
    end
  end

  def destroy
    logout!
    redirect_to root_url
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
