"""
WSGI config for LogisWare project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

import os
import sys

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'LogisWare.settings.production')

sys.path.append("/home/server/LogisWare/env")

application = get_wsgi_application()
