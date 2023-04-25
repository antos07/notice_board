from rest_framework import serializers

from board.models import Notice, Comment


class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        exclude = ('in_favourites_of',)
        read_only_fields = ('author',)


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('author', 'reply_to',)
