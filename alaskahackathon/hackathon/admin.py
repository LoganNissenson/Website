from django.contrib import admin
from alaskahackathon.hackathon.models import Subscriber

class SubscriberAdmin(admin.ModelAdmin):
    date_hierarchy = 'date'
    list_display = ('date', 'full_name', 'email_address')

admin.site.register(Subscriber, SubscriberAdmin)

