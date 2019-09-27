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

CURRENT_DOMAIN = "192.168.1.52"

INSTALLED_APPS = [
    'users.apps.UsersConfig',
    'communication.apps.CommunicationConfig',
    'core.apps.CoreConfig',
    'staffleave.apps.StaffleaveConfig',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'axes',
    'django_cron',
    'imagefit',
    'rest_framework',
]


AUTHENTICATION_BACKENDS = [
    # AxesBackend should be the first backend in the AUTHENTICATION_BACKENDS list.
    'axes.backends.AxesBackend',

    # Django ModelBackend is the default authentication backend.
    'django.contrib.auth.backends.ModelBackend',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    
    'core.middlewares.filter_users.FilterUserMiddleware',


    # AxesMiddleware should be the last middleware in the MIDDLEWARE list.
    # It only formats user lockout messages and renders Axes lockout responses
    # on failed user authentication attempts from login views.
    # If you do not want Axes to override the authentication response
    # you can skip installing the middleware and use your own views.
    'axes.middleware.AxesMiddleware',
]

ROOT_URLCONF = 'LogisWare.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
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


REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],

    'DEFAULT_AUTHENTICATION_CLASSES': [
        # Login for the apps
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        # // https://github.com/davesque/django-rest-framework-simplejwt

        # Allow login from the browser
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ]
}

# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


STATIC_URL = '/static/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
# STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATICFILES_DIRS = (
  os.path.join(BASE_DIR, 'static/'),
)

MEDIA_URL = '/media/'
AUTH_USER_MODEL = "users.User"
TIME_ZONE = 'Africa/Lagos'
LOGIN_REDIRECT_URL = 'login_success'
LOGIN_URL = "login"

WELCOME_NEW_USER_EMAIL = 'LogisWare Account Information <logiswarechert@gmail.com>'
ADMIN_EMAIL_ADDRESS = "logiswarechert@gmail.com"

TIME_ZONE = 'Africa/Lagos'
USE_TZ = True

# EMAIL_HOST_USER = "chertlogisware@gmail.com"
# EMAIL_HOST_PASSWORD = 'chertlogisware_2019'
# DEFAULT_FROM_EMAIL = "chertlogisware@gmail.com"

EMAIL_HOST_USER = "logiswarechert@gmail.com"
EMAIL_HOST_PASSWORD = 'che28282813jdj28(02-1'
DEFAULT_FROM_EMAIL = "logiswarechert@gmail.com"

# DJANGO AXES: For Password Policy
AXES_ENABLED = True
AXES_FAILURE_LIMIT = 5
AXES_COOLOFF_TIME = 48  # Hours
# AXES_LOCKOUT_URL

#mysql_root: is82k2kdjd82j2

#logisware[]2019