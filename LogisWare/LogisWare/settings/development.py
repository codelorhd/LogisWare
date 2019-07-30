from .base import *



# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

CURRENT_DOMAIN = "127.0.0.1"

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'