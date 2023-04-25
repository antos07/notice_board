from rest_framework import serializers

from board.models import Notice


class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        exclude = ('in_favourites_of',)
        read_only_fields = ('author',)
