from django.conf import settings
from django.conf.urls.defaults import *

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Example:
    # (r'^alaskahackathon/', include('alaskahackathon.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    (r'^admin/', include(admin.site.urls)),
)

urlpatterns += patterns('',
    #url(r'^$', 'alaskahackathon.hackathon.views.comingsoon'),
    url(r'^$', 'alaskahackathon.hackathon.views.main', name='index'),
    url(r'^nonprofits/application$', 'alaskahackathon.nonprofits.views.application', name='nonprofit-application'),
    url(r'^developers/registration$', 'alaskahackathon.developers.views.registration', name='developer-registration'),
    #url(r'^staging$', 'alaskahackathon.hackathon.views.main'),
)

urlpatterns += patterns('',
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
)
