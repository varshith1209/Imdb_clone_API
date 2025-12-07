from watchlist.views import WatchlistAPI,Platform,ReviewAPI,UserReview,ReviewViewSet,UserWatchlistViewSet
from django.urls import path,include
from rest_framework.routers import DefaultRouter

router=DefaultRouter()
router.register('platforms',Platform,basename="platform")
router.register('watchlist',WatchlistAPI,basename='watchlist')
router.register('reviews',ReviewViewSet,basename="reviews")
router.register('my-watchlist',UserWatchlistViewSet,basename="user-watchlist")

urlpatterns = [
    path('auth/',include('accounts.urls')),
    path('',include(router.urls)),
    path('watchlist/<int:pk>/reviews/',ReviewAPI.as_view(), name='watchlist-reviews'),
    path('user-reviews/<str:username>/',UserReview.as_view(), name='user-reviews'),
]


