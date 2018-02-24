from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.contrib.auth import authenticate
from django.contrib.auth.models import Group
from django.contrib.auth import login,logout
from django.contrib.auth.decorators import login_required


def get_user(user_name):
    try:
        user = User.objects.get(username=user_name)
    except Exception:
        user = None
    return user


def get_group(group_name):
    try:
        group = Group.objects.get(name=group_name)
    except Exception:
        group = None
    return group


def register_user(request):
    print(request.method)
    print(request.user.is_authenticated())
    if request.method == 'POST':
        username = request.POST.get('user_name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        print(username, email, password)
        user = get_user(user_name=username)
        print(dir(user))
        if user is None:
            User.objects.create_user(username=username, email=email, password=password)
        return HttpResponse('regist success')
    else:
        return HttpResponse('regist failed')


def user_login(request):
    print(request.method)
    if request.method == 'POST' or request.method == 'GET':
        print('start')
        username = request.POST.get('user_name')
        password = request.POST.get('password')
        print(username, password)
        user = authenticate(username=username, password=password)
        if user is not None and user.is_active:
            login(request, user)
            return HttpResponse('login success')
            # return HttpResponseRedirect("/myapp/login/")
        else:
            return HttpResponse('login failed')


@login_required(login_url='/myapp/regist/')
def user_logout(request):
    print(request.method)
    print(request.user.is_authenticated)
    logout(request)
    return HttpResponse('logout')


def create_group(request):
    print(request.method)
    print(request.user.is_authenticated)
    # logout(request)
    if request.method == 'POST':
        group_name = request.POST.get('group_name')
        if group_name:
            Group.objects.update_or_create(name=group_name)
        return JsonResponse('%s用户组创建成功' % group_name, safe=False)
    else:
        return HttpResponse('method error')


def add_user(request):
    if request.method == 'POST':
        user_name = request.POST.get('user_name')
        group_name = request.POST.get('group_name')
        user = get_user(user_name)
        group = get_group(group_name=group_name)
        print(user.user_permissions.all())
        if user and group:
            user.groups.add(group)
            return HttpResponse('add success')
        else:
            return HttpResponse('user or group is not exists')
    else:
        return HttpResponse('the method is error!!')


def clear_group(request):
    if request.method == 'POST':
        group_name = request.POST.get('group_name')
        group = get_group(group_name)
        if group:
            group.user_set.clear()
            return HttpResponse('clear success')
        else:
            return HttpResponse('this group is not exists')
    else:
        return HttpResponse('the method error!!')

