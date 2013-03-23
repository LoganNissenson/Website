from django.db import models

data_format_choices = [('xml', 'Well formed XML'), ('xls', 'Microsoft Excel'), ('sql', 'SQL Database'), ('api', 'Application Programming Interface (API)'), ('other', 'Other, please specify')]
organization_nonprofit_choices = [('yes', 'Yes, we are a legally recognized non-profit'), ('no', 'No')]
data_sensitive_choices = [('yes', 'Yes, we accept responsibility for the data being used for our project being developed through the Hackathon'), ('no', 'No')]
liaison_available_choices = [('oncall', 'A liaison will only be available via phone or email'), ('onsite', 'A liaison will be commited to being On Site during the Hackathon')]

class Application(models.Model):
    date = models.DateTimeField(auto_now=True, db_index=True)
    organization_name = models.CharField(max_length=1024, default='')
    organization_nonprofit = models.CharField(max_length=16, default='yes', choices=organization_nonprofit_choices)
    organization_description = models.TextField(max_length=8192, default='')
    contact_full_name = models.CharField(max_length=1024, default='')
    contact_email_address = models.CharField(max_length=1024, default='')
    contact_phone_number = models.CharField(max_length=1024, default='')
    data_format = models.CharField(max_length=16, default='sql', choices=data_format_choices)
    data_format_other = models.TextField(max_length=8192, default='', blank=True)
    data_sensitive = models.CharField(max_length=16, default='yes', choices=data_sensitive_choices)
    data_access = models.TextField(max_length=8192, default='')
    data_contents = models.TextField(max_length=8192, default='')
    data_media = models.TextField(max_length=8192, default='')
    liaison_available = models.CharField(max_length=16, default='onsite', choices=liaison_available_choices)
    liaison_full_name = models.CharField(max_length=1024, default='')
    liaison_email_address = models.CharField(max_length=1024, default='')
    liaison_phone_number = models.CharField(max_length=1024, default='')
    liaison_extra = models.TextField(max_length=8192, default='', blank=True)
    project_description = models.TextField(max_length=8192, default='')
