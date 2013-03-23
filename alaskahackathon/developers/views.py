# Create your views here.

import json

from django.core import serializers

from django.views.decorators.http import require_http_methods

from django.http import HttpResponse
from django.http import HttpResponseRedirect

from django.core.context_processors import csrf

from django.core.mail import send_mail

from django.shortcuts import render_to_response, redirect

from wtforms.ext.django.orm import model_form
from alaskahackathon.developers.models import Registration

RegistrationForm = model_form(Registration, exclude=['id','date'])

@require_http_methods(["GET", "POST"])
def registration(request):
    registration_form = RegistrationForm()
    registered = False

    if request.method == 'POST':
        if request.POST['submit'] == 'Enter':
            request.session['dev_registration_form'] = request.POST
        else:
            pass

        return redirect('developer-registration')

    else:
        if request.session.get('dev_registration_form'):
            registration_form = RegistrationForm(request.session['dev_registration_form'],)
            del request.session['dev_registration_form']
            if registration_form.validate():
                import pprint
                pprint.pprint(registration_form.data)
                registration = Registration.objects.create(**registration_form.data)
                registration_form = RegistrationForm()
                registered = True #Lovely amounts of no db validation
                print send_mail(
                            'New Developer: %s <%s>' % (registration.full_name, registration.email_address), 
                            serializers.serialize('json', [registration,], indent=2),
                            'registration@alaskahackathon.mailgun.org',
                            ['shane@bogomip.com', 'alaskahackathon@gmail.com']
                        )
                    
    args = dict(registration_form=registration_form, registered=registered)
    args.update(csrf(request))
    return render_to_response('developer-registration.html', args)
