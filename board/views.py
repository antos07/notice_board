from django.db.models import QuerySet
from drf_spectacular.utils import (extend_schema, extend_schema_view,
                                   OpenApiParameter, )
from rest_access_policy import AccessViewSetMixin
from rest_framework import viewsets
from rest_framework.generics import get_object_or_404

from board.access_policies import BoardElementAccessPolicy
from board.models import Notice, Comment
from board.serializers import NoticeSerializer, CommentSerializer


class NoticeViewSet(AccessViewSetMixin, viewsets.ModelViewSet):
    queryset = Notice.objects
    serializer_class = NoticeSerializer
    access_policy = BoardElementAccessPolicy

    def perform_create(self, serializer: NoticeSerializer) -> None:
        serializer.save(author=self.request.user)


_comment_detail_schema = extend_schema(
    parameters=[
        OpenApiParameter(
            name='id',
            type=int,
            location='path',
            description="A unique integer value identifying this comment.",
        ),
    ])


@extend_schema_view(
    retrieve=_comment_detail_schema,
    update=_comment_detail_schema,
    partial_update=_comment_detail_schema,
    destroy=_comment_detail_schema,
)
@extend_schema(
    parameters=[
        OpenApiParameter(
            name='notice_pk',
            type=int,
            location='path',
            description="A unique integer value identifying the notice.",
        ),
    ],
)
class CommentViewSet(AccessViewSetMixin, viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    access_policy = BoardElementAccessPolicy

    def get_queryset(self) -> QuerySet:
        return Comment.objects.filter(reply_to=self.get_reply_to())

    def perform_create(self, serializer: CommentSerializer) -> None:
        serializer.save(author=self.request.user, reply_to=self.get_reply_to())

    def get_reply_to(self) -> Notice:
        return get_object_or_404(Notice, pk=self.kwargs['notice_pk'])
