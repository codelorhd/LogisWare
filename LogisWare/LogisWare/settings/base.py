import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__name__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '0n)-k@$ci9ql&x%w4)$+7yj#n4+zl5_!+1eip%-*@^1$klxm0m'

# SECURITY WARNING: don't run with debug turned on in production!

ALLOWED_HOSTS = ["127.0.0.1", "192.168.1.52"]

# Application definition

INSTALLED_APPS = [
    'users.apps.UsersConfig',
    'communication.apps.CommunicationConfig',
    'core.apps.CoreConfig',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'LogisWare.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'LogisWare.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
# 'PASSWORD': 'is82k2kdjd82j2jj'
#     }
# }

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'logisdb',
#         'USER': 'root',
#         'PASSWORD': 'is82k2kdjd82j2jj',
#         'HOST': 'localhost',
#         'PORT': '3306',
#     }
# }

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


STATIC_URL = '/static/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
MEDIA_URL = '/media/'
AUTH_USER_MODEL = "users.User"
TIME_ZONE = 'Africa/Lagos'
LOGIN_REDIRECT_URL = 'login_success'
LOGIN_URL = "login"

WELCOME_NEW_USER_EMAIL = 'LogisWare Account Information <noreply@chert.ng>'
ADMIN_EMAIL_ADDRESS = "admchertlogiswarein@gmail.com"

TIME_ZONE = 'Africa/Lagos'
USE_TZ = True

# EMAIL_HOST_USER = "chertlogisware@gmail.com"
# EMAIL_HOST_PASSWORD = 'chertlogisware_2019'
# DEFAULT_FROM_EMAIL = "chertlogisware@gmail.com"

EMAIL_HOST_USER = "regnifymessages@gmail.com"
EMAIL_HOST_PASSWORD = 'regnify_2_0_1_9_messages'
DEFAULT_FROM_EMAIL = "regnifymessages@gmail.com"


#mysql_root: is82k2kdjd82j2

#logisware[]2019