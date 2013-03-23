from django.db import models

experience_choices = [
    ('newb', 'Newb, but looking to become a pro!'),
    ('spaghetti', 'I am a spaghetti coder that can bring together projects to make something useful.'),
    ('techie', 'I have a some systems experience and have spent a limited time working on programming projects.'),
    ('theguy', 'People have problems, I have solutions, and I will figure out how to provide them.'),
    ('ninja', 'I can ninja together code without much of a hassle.'),
    ('wizard', 'I am a sagely wizard full of programming knowledge, software, and web development experience.'),
    ]

class Registration(models.Model):
    date = models.DateTimeField(auto_now=True, db_index=True)
    full_name = models.CharField(max_length=1024, default='')
    email_address = models.CharField(max_length=1024, default='')
    phone_number = models.CharField(max_length=1024, default='')
    bio = models.TextField(max_length=8192, default='', blank=True)
    experience = models.CharField(max_length=16, choices=experience_choices)    
