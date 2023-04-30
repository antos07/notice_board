from django.db.models import QuerySet
from drf_spectacular.utils import (extend_schema, extend_schema_view,
                                   OpenApiParameter, )
from rest_access_policy import AccessViewSetMixin
from rest_framework import viewsets, mixins, exceptions, permissions
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.request import Request
from rest_framework.response import Response

from board.access_policies import BoardElementAccessPolicy
from board.models import Notice, Comment
from board.serializers import (NoticeSerializer, CommentSerializer,
                               NoticeIdSerializer, )


class NoticeViewSet(AccessViewSetMixin, viewsets.ModelViewSet):
    queryset = Notice.objects
    serializer_class = NoticeSerializer
    access_policy = BoardElementAccessPolicy

    def perform_create(self, serializer: NoticeSerializer) -> None:
        serializer.save(author=self.request.user)

    @action(detail=False)
    def my(self, request: Request) -> Response:
        """Notices from the current user"""
        notices = self.get_queryset()
        notices = notices.filter(author=request.user)
        serializer = self.get_serializer(notices, many=True)
        return Response(serializer.data)


_comment_detail_schema = extend_schema(
    parameters=[
        OpenApiParameter(
            name='id',
            type=int,
            location=OpenApiParameter.PATH,
            description='A unique integer value identifying this comment.',
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
            location=OpenApiParameter.PATH,
            description='A unique integer value identifying the notice.',
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


@extend_schema_view(
    destroy=extend_schema(
        parameters=[
            OpenApiParameter(
                name='id',
                type=int,
                location=OpenApiParameter.PATH,
                description='A unique integer value identifying the notice.',
            )
        ]
    )
)
class FavouriteNoticeViewSet(mixins.CreateModelMixin, mixins.ListModelMixin,
                             mixins.DestroyModelMixin,
                             viewsets.GenericViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self) -> QuerySet:
        return Notice.objects.filter(in_favourites_of=self.request.user)

    def get_serializer_class(self):
        if self.action == 'list':
            return NoticeSerializer
        return NoticeIdSerializer

    def perform_create(self, serializer: NoticeIdSerializer) -> None:
        notice_id = serializer.validated_data['id']
        try:
            notice = Notice.objects.get(id=notice_id)
        except Notice.DoesNotExist:
            raise exceptions.ParseError(detail='Notice with given id does '
                                               'not exist.')
        notice.in_favourites_of.add(self.request.user)

    def perform_destroy(self, instance: Notice) -> None:
        instance.in_favourites_of.remove(self.request.user)
