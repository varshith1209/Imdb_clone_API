from rest_framework.test import APITestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth.models import User
class Register_test(APITestCase):
    
    def test_register(self):
        data={
            "username":"varshith",
            "email": "v@gmail.com",
            "password":"pass123",
            "confirm_password":"pass123"
        }
        response=self.client.post(reverse('register'),data,format='json')
        
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
        
class Login_test(APITestCase):
    def setUp(self):
        user=User.objects.create_user(username="nani",password='nani')
        
    def test_login(self):
        data={
            "username":"nani",
            "password":"nani"
        }    
        response=self.client.post(reverse('login'),data,format='json')
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        
        
# Create your tests here.
