from formulaire.models import Submission
from django.urls import path,include
from . import views

urlpatterns=[
    path('home/',views.home,name='home'),
    path('home/create-form/save<int:id>/',views.save_form,name="save_form"),
    path('home/create-form/',views.create_form,name="create_form"),
    path('home/form<int:id>/',views.form_view,name="form_view"),
    path('home/form<int:id>/detail/',views.detail,name="detail"),
    path('home/form<int:id>/save/',views.submission_save,name="submission_save"),
    path('home/form<int:id>/data/',views.form_data,name="form_data"),
]