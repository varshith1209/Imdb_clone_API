from watchlist.views import WatchlistAPI,Platform,ReviewAPI,UserReview,ReviewViewSet
from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter
router=DefaultRouter()
router.register('platforms',Platform,basename="platform")
router.register('watchlist',WatchlistAPI,basename='watchlist')
router.register('reviews',ReviewViewSet,basename="reviews")
urlpatterns = [
    
    # path('platforms/', Platform.as_view()),
    # path('platforms/<int:pk>/',Platformdetail.as_view()),
    path('auth/',include('accounts.urls')),
    path('',include(router.urls)),
    # path('watchlist/',WatchlistAPI.as_view()),
    path('platforms/<int:pk>/reviews/',ReviewAPI.as_view()),
    # path('reviews/', ReviewViewSet.as_view()),
    # path('reviews/<int:pk>/', ReviewViewSet.as_view()),
    path('reviews/<str:username>/',UserReview.as_view()),
]


