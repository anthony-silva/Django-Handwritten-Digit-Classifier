from django.urls import path
from . import views

app_name = 'digits'
urlpatterns = [
    # ex: /results/
    path('', views.DigitsIndexView, name='digits_index'),
    path('result/', views.DigitsResultView, name='digits_result'),
]
