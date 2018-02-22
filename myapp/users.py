from django.contrib.auth.models import User
from django.http import HttpResponse
from django.contrib.auth import authenticate


def register_user(request):
    if request.method == 'POST':
        username = request.POST.get('user_name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = User.objects.create_user(username, email, password)
        user.save()
        return HttpResponse('regist success')
    else:
        return HttpResponse('regist failed')


def auth_user(request):
    if request.method == 'POST':
        username = request.POST.get('user_name')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        print(dir(user))
        print(type(user))
        if user is not None:
            return HttpResponse('login success')
        else:
            return HttpResponse('login failed')
