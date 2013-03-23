from django.contrib import admin
from alaskahackathon.developers.models import Registration

class RegistrationAdmin(admin.ModelAdmin):
    date_hierarchy = 'date'
    list_display = ('date', 'full_name', 'email_address')

admin.site.register(Registration, RegistrationAdmin)

