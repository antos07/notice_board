from rest_framework import viewsets

from board.models import Notice
from board.serializers import NoticeSerializer


class NoticeViewSet(viewsets.ModelViewSet):
    queryset = Notice.objects
    serializer_class = NoticeSerializer

    def perform_create(self, serializer: NoticeSerializer) -> None:
        serializer.save(author=self.request.user)
