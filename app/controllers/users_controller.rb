class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      redirect_to root_url
    else
      flash[:errors] = @user.errors.full_messages
      render 'new'
    end
  end

  def new
    @user = User.new
    render 'new'
  end

  def show
    @user = User.find(params[:id])
    render 'show'
  end

  private
    def user_params
      params.require(:user).permit(:password, :username, :email)
    end
end
