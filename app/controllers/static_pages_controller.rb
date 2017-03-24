class StaticPagesController < ApplicationController
  include ActionView::Rendering
  def home
    render 'index.html'
  end

end
