from django.conf.urls import include, url
from django.contrib import admin
from myapp import urls

urlpatterns = [
    # Examples:
    # url(r'^$', 'djtest.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'myapp/', include(urls))
]
