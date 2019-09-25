from django.db import models

from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import ugettext_lazy as _
from users.managers import CustomUserManager


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, null=True)
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )

    email_verified = models.BooleanField(
        ('email_verified'),
        default=False,
        help_text=_(
            'Designates whether this user has verified the email supplied'
        ),
    )

    name = models.CharField(
        _('name'),
        max_length=255
    )

    is_super_admin = models.BooleanField(default=False)

    # Special Roles;
    is_sales = models.BooleanField(default=True)
    is_procurement = models.BooleanField(default=False)
    is_delivery = models.BooleanField(default=False)
    is_human_resource = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    objects = CustomUserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email
