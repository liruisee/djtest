from django.conf.urls import include, url
from myapp import views
from fktest import settings

urlpatterns = [
    # Examples:
    # url(r'^$', 'fktest.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'index/$', views.index),
]
