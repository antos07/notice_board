from django.urls import path, include
from rest_framework import routers
from rest_framework_nested.routers import NestedSimpleRouter

from board.views import NoticeViewSet, CommentViewSet, FavouriteNoticeViewSet

router = routers.DefaultRouter()
router.register('notices', NoticeViewSet, basename='notices')
router.register('favourites/notices', FavouriteNoticeViewSet,
                basename='favourite-notices')

comment_router = NestedSimpleRouter(router, 'notices', lookup='notice')
comment_router.register('comments', CommentViewSet, basename='notice-comments')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(comment_router.urls)),
]
