import json
from django.http import HttpResponse
from django.shortcuts import render
from django.core import serializers
from .supportworkflow import *

#VIEWS 
def home(request):
    return render(request, 'index.html')
def ask(request):
    response = {}
    if request.method == 'POST':
        data = json.load(request)
        response = run_customer_support(query=data['query'])
        
    return HttpResponse(json.dumps(response),content_type='application/json')