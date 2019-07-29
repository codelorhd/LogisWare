from django import forms
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm 

class UserRegisterForm(UserCreationForm):
    email = forms.EmailField()
    name = forms.CharField(max_length=100)

    class Meta:
        model = get_user_model()
        fields = ['name', 'email', 'password1', 'password2']


class UserUpdateForm(forms.ModelForm):
    # email = forms.EmailField( required = False )
    name = forms.CharField(max_length=255)

    class Meta:
        model = get_user_model()
        fields = [ 'name']