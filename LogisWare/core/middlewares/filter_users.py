
from django.contrib.auth import get_user_model, login, logout
from django.contrib import messages
from django.utils.safestring import mark_safe

from django.conf import settings


class FilterUserMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.

        if str(request.path).startswith('/delivery'):
            if request.user.is_authenticated == True and request.user.is_delivery == False:
                self.process_error_message(request)
        elif str(request.path).startswith('/sales'):
            if request.user.is_authenticated == True and request.user.is_sales == False:
                self.process_error_message(request)
        elif str(request.path).startswith("/procurement"):
            if request.user.is_authenticated == True and request.user.is_procurement == False:
                self.process_error_message(request)

        # Code to be executed for each request/response after
        # the view is called.

        return self.get_response(request)

    def process_error_message(self, request):
        messages.error(
            request,
            mark_safe(
                "We couldn't take you to the page you requested. Kindly login again. If problem still persist, go to the home page and try login in again")
        )
        logout(request)
