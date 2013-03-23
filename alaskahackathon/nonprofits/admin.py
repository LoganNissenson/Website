from django.contrib import admin
from alaskahackathon.nonprofits.models import Application

class ApplicationAdmin(admin.ModelAdmin):
    date_hierarchy = 'date'
    list_display = ('date', 'organization_name', 'contact_full_name')

admin.site.register(Application, ApplicationAdmin)

