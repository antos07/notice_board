from django.conf import settings
from django.db import models


class Notice(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL,
                               on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=256)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    last_edited_at = models.DateTimeField(auto_now=True)

    # A hack to add favourites into a default user model
    # without redefining it.
    in_favourites_of = models.ManyToManyField(settings.AUTH_USER_MODEL,
                                              related_name='favourites')

    @property
    def is_edited(self):
        return self.created_at != self.last_edited_at


class Comment(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL,
                               on_delete=models.SET_NULL, null=True)
    reply_to = models.ForeignKey(Notice, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    last_edited_at = models.DateTimeField(auto_now=True)
