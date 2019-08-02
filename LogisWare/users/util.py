from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth import get_user_model, login, logout
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.template.loader import render_to_string
from .tokens import activation_token
from django.core.mail import EmailMessage, send_mail
from django.utils.html import strip_tags
from django.conf import settings

# An utility class to send first time users the neccesary messages
# Messages such as welcome, email verification etc


class NewUserMessages():

    def send_welcome_message(self, receiver_email, receiver_name, request, user, user_password=None, admin=None):

        if request is None:
            domain = settings.CURRENT_DOMAIN
        else:
            current_site = get_current_site(request)
            domain = current_site.domain

        welcome_message_template = "users/registrations/new_user.html"
        message = render_to_string(
            welcome_message_template,
            {
                'user': user,
                'domain': domain,
                'login_link': domain + "/login",
                'password': user_password,
                'admin': admin
            }
        )
        mail_subject = "Account Information | CHERT"

        send_mail(subject=mail_subject, from_email=settings.WELCOME_NEW_USER_EMAIL,
                  message=message, html_message=message, recipient_list=[receiver_email])
