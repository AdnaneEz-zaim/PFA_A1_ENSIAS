from django.urls import path,include
from . import views

urlpatterns = [
    path('',views.index,name="index"),
    path('login/',views.loginPage,name="login"),
    path('logout/',views.logout,name="logout"),
    path('register/',views.register,name="register"),
    path('profil/',views.profil,name="profil"),
    path('profil/edit-password/',views.edit_password,name="profil"),
]