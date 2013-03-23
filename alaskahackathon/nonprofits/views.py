# Create your views here.

from django.core import serializers

from django.views.decorators.http import require_http_methods

from django.http import HttpResponse
from django.http import HttpResponseRedirect

from django.core.context_processors import csrf

from django.core.mail import send_mail

from django.shortcuts import render_to_response, redirect

from wtforms.ext.django.orm import model_form
from alaskahackathon.nonprofits.models import Application

ApplicationForm = model_form(Application, exclude=['id','date'])

@require_http_methods(["GET", "POST"])
def application(request):
    application_form = ApplicationForm()
    entered = False

    if request.method == 'POST':
        if request.POST['submit'] == 'Enter':
            request.session['np_application_form'] = request.POST
        else:
            pass

        return redirect('nonprofit-application')

    else:
        if request.session.get('np_application_form'):
            application_form = ApplicationForm(request.session['np_application_form'],)
            del request.session['np_application_form']
            if application_form.validate():
                import pprint
                pprint.pprint(application_form.data)
                application = Application.objects.create(**application_form.data)
                application_form = ApplicationForm()
                entered = True #Lovely amounts of no db validation
                print send_mail(
                            'New Application: %s - %s <%s>' % (application.organization_name, application.contact_full_name, application.contact_email_address),
                            serializers.serialize('json', [application,], indent=2),
                            'registration@alaskahackathon.mailgun.org',
                            ['shane@bogomip.com', 'alaskahackathon@gmail.com']
                        )

    args = dict(application_form=application_form, entered=entered)
    args.update(csrf(request))
    return render_to_response('nonprofit-application.html', args)
