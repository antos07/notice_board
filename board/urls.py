from rest_framework import routers

from board.views import NoticeViewSet

router = routers.DefaultRouter()
router.register('notices', NoticeViewSet, basename='notices')

urlpatterns = router.urls
