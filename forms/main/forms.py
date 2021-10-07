from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm,UserChangeForm
from django.contrib.auth import login,authenticate
import re


class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password1', 'password2']
        widgets = {
            'username': forms.TextInput(attrs={'placeholder': 'username'}),
            'first_name': forms.TextInput(attrs={'placeholder': 'votre prenom'}),
            'last_name': forms.TextInput(attrs={'placeholder': 'votre nom'}),
            'email': forms.TextInput(attrs={'placeholder': 'votre Email'}),
            'password1': forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'alphabet'}),
            'password2': forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Password confirmation'}),
            }



class UpdateProfilForm(UserChangeForm):
    class Meta:
        model=User
        fields=["username","first_name","last_name","email","password"]
        widgets={
            "username":forms.TextInput(attrs={'class':'form-control p-0 border-0','placeholder':"example-prenom"}),
            "first_name":forms.TextInput(attrs={'class':'form-control p-0 border-0','placeholder':"example-nom"}),
            "last_name":forms.TextInput(attrs={'class':'form-control p-0 border-0'  ,'placeholder':"example-prenom"}),
            "email":forms.EmailInput(attrs={'class':'form-control p-0 border-0' ,'placeholder':"example-email@admin.com"}),
            "password":forms.HiddenInput()
        }
    def clean(self):
        cleaned_data=super(UpdateProfilForm,self).clean()
        (username,first_name,last_name)=[self.cleaned_data['username'],self.cleaned_data['first_name'],self.cleaned_data['last_name']]
        if re.search("\A[0-9]",username) is not None:
                self.add_error('username',"should not begin with numbers")
        if re.search("\A[0-9]",first_name) is not None:
                self.add_error('first_name',"should not begin with numbers")
        if re.search("\A[0-9]",last_name) is not None:
             self.add_error('last_name',"should not begin with numbers")
        if re.search("[@-_.+\-]",first_name) is not None:
            self.add_error('first_name',"should not contain ( @ / - / _ / . / + )")
        if re.search("[@-_.+\-]",last_name)is not None:
            self.add_error('last_name',"should not contain ( @ / - / _ / . / + )")
        return cleaned_data