from django.contrib import admin
from .models import Streamplatform,Watchlist,Reviews,UserWatchlist
# Register your models here.
admin.site.register(Streamplatform)
admin.site.register(Watchlist)
admin.site.register(Reviews)
admin.site.register(UserWatchlist)
