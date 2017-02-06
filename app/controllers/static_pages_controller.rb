class StaticPagesController < ApplicationController
    skip_before_action :authenticate
    
    def home
    end

    def help
    end
end
