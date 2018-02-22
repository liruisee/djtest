from django.shortcuts import render,render_to_response
from django.http import JsonResponse
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_protect
from django.template.context_processors import csrf
import json


# Create your views here.
def index(request):
    # return HttpResponse('abc')
    return render_to_response('test/stats.html')


def main_page(request):
    return render_to_response('html/main_page.html')


def table(request):
    return render_to_response('test/tables.html', {'head_list': ['姓名', '年龄', '户口', '学历', '政治面貌']*8,
                                                   'data_list': [['张三', '18', '北京', '博士', '党员']*8,
                                                                 ['李四', '23', '上海', '硕士', '团员']*8]*2})


def table2(request):
    return render_to_response('test/tables2.html', {'head_list': ['姓名', '年龄', '户口', '学历', '政治面貌']*8,
                                                   'data_list': [['张三', '18', '北京', '博士', '党员']*8,
                                                                 ['李四', '23', '上海', '硕士', '团员']*8]*2})


def write_table_test(request):
    return JsonResponse({'head_list': ['姓名', '年龄', '户口', '学历', '政治面貌']*2,
                                                   'data_list': [['张三', '18', '北京', '博士', '党员']*2,
                                                                 ['李四', '23', '上海', '硕士', '团员']*2]*2})


def charts(request):
    return render_to_response('test/stats.html', {})


def example(request):
    return render_to_response('test/example.html', {'head_list': ['姓名', '年龄', '户口', '学历', '政治面貌']*8,
                                                   'data_list': [['张三', '18', '北京', '博士', '党员']*8,
                                                                 ['李四', '23', '上海', '硕士', '团员']*8]*2})


def register(request):
    return render(request, 'test/regist.html', {})


def check_form(request):
    print(request.method)
    return HttpResponse('success')


def ajax_post(request):
    if request.method == 'POST':
        return JsonResponse({'key': '5', 'value': '10'})
