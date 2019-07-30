from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'logisdb',
        'USER': 'root',
        'PASSWORD': 'logisware[]2019',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
