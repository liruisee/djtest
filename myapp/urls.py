from django.conf.urls import include, url
from myapp import views
from fktest import settings

urlpatterns = [
    # Examples:
    # url(r'^$', 'fktest.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'index/$', views.index),
    url(r'main_page/$', views.main_page),
    url(r'tables/$', views.table),
    url(r'tables2/$', views.table2),
    url(r'write_table_test/$', views.write_table_test),
    url(r'charts/$', views.charts),
    url(r'example/$', views.example),
    url(r'regist/$', views.register),
    url(r'check_form/$', views.check_form),
    url(r'ajax_post', views.ajax_post)
]
