from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='index'),
    path('ask/', views.ask, name='ask'),
]