# Create your views here.

from django.views.decorators.http import require_http_methods

from django.http import HttpResponse
from django.http import HttpResponseRedirect

from django.core.context_processors import csrf

from django.shortcuts import render_to_response, redirect

from wtforms.ext.django.orm import model_form
from alaskahackathon.hackathon.models import Subscriber

SubscriberForm = model_form(Subscriber, exclude=['date'])

def comingsoon(request):
    return render_to_response('comingsoon.html')

@require_http_methods(["GET", "POST"])
def main(request):
    subscriber_form = SubscriberForm()
    subscribed = False

    if request.method == 'POST':
        if request.POST['submit'] == 'Subscribe':
            request.session['subscriber_form'] = request.POST
        else:
            pass

        return redirect('index')

    else:
        if request.session.get('subscriber_form'):
            subscriber_form = SubscriberForm(request.session['subscriber_form'],)
            del request.session['subscriber_form']
            if subscriber_form.validate():
                subscriber = Subscriber.objects.create(full_name=subscriber_form.full_name.data, email_address=subscriber_form.email_address.data)
                subscriber_form = SubscriberForm()    
                subscribed = True #Lovely amounts of no db validation

    args = dict(subscriber_form=subscriber_form, subscribed=subscribed)
    args.update(csrf(request))
    return render_to_response('index.html', args)
