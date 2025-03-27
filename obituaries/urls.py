from django.urls import path
from . import views

urlpatterns = [
    path('', views.ObituaryListView.as_view(), name='obituary_list'),
    path('create/', views.ObituaryCreateView.as_view(), name='obituary_create'),
    path('<slug:slug>/', views.ObituaryDetailView.as_view(), name='obituary_detail'),
]
