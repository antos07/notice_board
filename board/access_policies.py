from rest_access_policy import AccessPolicy
from rest_framework.generics import GenericAPIView
from rest_framework.request import Request

from board.models import Notice


class BoardElementAccessPolicy(AccessPolicy):
    statements = [
        {
            'action': '<safe_methods>',  # get/head/options
            'principal': '*',
            'effect': 'allow',
        },
        {
            'action': 'create',
            'principal': 'authenticated',
            'effect': 'allow',
        },
        {
            'action': ['update', 'partial_update', 'destroy'],
            'principal': 'authenticated',
            'condition': 'is_author',
            'effect': 'allow',
        },
        {
            'action': '*',
            'principal': 'staff',
            'effect': 'allow',
        },
    ]

    @staticmethod
    def is_author(request: Request, view: GenericAPIView, action: str) -> bool:
        notice: Notice = view.get_object()
        return notice.author == request.user
