import functools

from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from board.models import Notice
from board.serializers import NoticeSerializer


def authenticated(test_method: callable) -> callable:
    @functools.wraps(test_method)
    def wrapper(self, *args, **kwargs):
        self.client.force_authenticate(self.user)

    return wrapper


class NoticeViewSetTest(APITestCase):
    def setUp(self) -> None:
        self.user = get_user_model().objects.create_user(
            username='test',
            email='test@test.com',
            password='test_password'
        )
        self.notice = Notice.objects.create(
            title='Test notice',
            text='Test text',
            author=self.user
        )

    def test_list_return_all_notices(self):
        notices = Notice.objects.all()
        serializer = NoticeSerializer(notices, many=True)
        response = self.client.get(reverse('notices-list'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_notice_detail_returns_correct_data(self):
        serializer = NoticeSerializer(self.notice)
        response = self.client.get(reverse('notices-detail',
                                           kwargs={'pk': self.notice.id}))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_notice_detail_returns_404_for_nonexistent_notice(self):
        response = self.client.get(reverse('notices-detail',
                                           kwargs={'pk': self.notice.id + 1}))

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_unauthorized_user_can_not_create_notice(self):
        response = self.client.post(reverse('notices-list'), {
            'title': 'Impossible notice',
            'text': 'empty text'
        })

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    @authenticated
    def test_authorized_user_can_create_notice(self):
        response = self.client.post(reverse('notices-list'), {
            'title': 'New notice',
            'text': 'New text'
        })

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Notice.objects.filter(title='New notice',
                                              text='New text').exists())

    def test_unauthorized_user_can_not_edit_notice(self):
        response = self.client.patch(reverse('notices-detail',
                                             kwargs={'pk': self.notice.id}), {
                                         'title': 'Impossible notice',
                                         'text': 'empty text'
                                     })

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    @authenticated
    def test_authorized_user_can_edit_own_notice(self):
        response = self.client.patch(reverse('notices-detail',
                                             kwargs={'pk': self.notice.id}), {
                                         'title': 'New notice',
                                         'text': 'New text'
                                     })

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(Notice.objects.filter(title='New notice',
                                              text='New text').exists())

    @authenticated
    def test_authorized_user_can_not_edit_notice_from_others(self):
        self.notice.author = get_user_model().object.create_user(
            username='newuser',
            email='newuser@email.com',
            password='new_password!!!'
        )
        self.notice.save()

        response = self.client.patch(reverse('notices-detail',
                                             kwargs={'pk': self.notice.id}), {
                                         'title': 'New notice',
                                         'text': 'New text'
                                     })

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
