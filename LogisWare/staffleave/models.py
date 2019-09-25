from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

# Create your models here.


class Staff(models.Model):
    user = models.ForeignKey(
        get_user_model(), on_delete=models.SET_NULL, null=True, blank=False)
    department = models.ForeignKey(
        "staffleave.Department", on_delete=models.SET_NULL, null=True, blank=False)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.name


class Department(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)

    def __str__(self):
        return self.name


class LeaveType(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)
    maximum_days = models.IntegerField()
    include_working_days = models.BooleanField(default=False)
    start_month = models.IntegerField()
    end_month = models.IntegerField()
    number_of_days_to_notify = models.IntegerField()

    def __str__(self):
        return self.name


class Request(models.Model):
    staff = models.ForeignKey(Staff, null=True,
                              blank=False, on_delete=models.SET_NULL)
    leave = models.ForeignKey(
        'staffleave.Leave', null=True, blank=False, on_delete=models.SET_NULL)
    date_requested = models.DateTimeField(auto_now_add=True)

    statuses = [
        ('PENDING', 'Pending'),
        ('REJECTED', 'Rejected'),
        ('APPROVED', 'Approved'),
    ]
    status = models.CharField(
        max_length=20, choices=statuses, default="PENDING")

    def __str__(self):
        return self.name


class Leave(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False)
    leave_type = models.ForeignKey(
        "staffleave.LeaveType", on_delete=models.SET_NULL, null=True, blank=False)
    date_to_start = models.DateField(
        default=timezone.now, auto_now=False, auto_now_add=False)
    date_to_end = models.DateField(
        auto_now_add=False, auto_now=False, default=timezone.now)

    def __str__(self):
        return self.name
