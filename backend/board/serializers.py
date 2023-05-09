from rest_framework import serializers

from board.models import Notice, Comment


class NoticeSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    class Meta:
        model = Notice
        exclude = ('in_favourites_of',)
        read_only_fields = ('author',)


class NoticeIdSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=False)

    class Meta:
        model = Notice
        fields = ('id',)


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('author', 'reply_to',)
