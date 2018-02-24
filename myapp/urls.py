from django.conf.urls import include, url
from myapp import views
from fktest import settings
from myapp import users

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
    url(r'register/$', views.register),
    url(r'register_user', users.register_user),
    url(r'login', users.user_login),
    url(r'logout', users.user_logout),
    url(r'ajax_post', views.ajax_post),
    url(r'create_group', users.create_group),
    url(r'add_user', users.add_user),
    url(r'clear_group', users.clear_group),
]
