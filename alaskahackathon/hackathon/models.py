from django.db import models
from django.contrib.syndication.views import Feed

class Subscriber(models.Model):
    date = models.DateTimeField(auto_now=True, db_index=True)
    full_name = models.CharField(max_length=200, default="Full Name*")
    email_address = models.EmailField(max_length=200, default="Email Address*")
