from django.urls import path
from emails.views import generate_reply

urlpatterns = [
    path('generate-reply/', generate_reply, name= "generate_reply")
    
]
