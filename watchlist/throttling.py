from rest_framework.throttling import UserRateThrottle

class ReviewThrottle(UserRateThrottle):
    scope='review-throttle'