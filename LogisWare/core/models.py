from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

# Client


class Client (models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    email = models.CharField(max_length=255, null=True, blank=True)
    phone_one = models.CharField(max_length=255, null=True, blank=True)
    phone_two = models.CharField(max_length=255, null=True, blank=True)
    company_name = models.CharField(max_length=255, null=True, blank=True)

    date_added = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name


class Quote(models.Model):
    client = models.ForeignKey(
        Client, on_delete=models.SET_NULL, null=True, blank=True)
    manager = models.ForeignKey(
        get_user_model(), on_delete=models.SET_NULL, null=True, blank=False)

    date_uploaded = models.DateTimeField(default=timezone.now)
    date_eta = models.DateTimeField(blank=True, null=True)
    quote_number = models.CharField(max_length=15)
    quote_statuses = [
        ('PRSNG', 'Processing'),
        ('APRSNG', 'Awaiting Processing'),
        ('AWAARIVAL', 'Awaiting Arrival'),
        ('ARRIVED', 'Arrived'),

        ('PENDING_FINANCE', 'Pending Approval'),
        ('NOTPAID_DELIVER', 'Not Paid, Allow Delivery'),
        ('PAID_DELIVER', 'Paid, Allow Delivery'),

        ('AWAITDELIVERY', 'Awaiting Delivery'),
        ('DELIVERED', 'Delivered'),
        ('NOTDELIVERED', 'Not Delivered'),
    ]
    status = models.CharField(
        max_length=20, choices=quote_statuses, default="APRSNG")

    # reference = models.CharField(max_length=1000)

    # quote_rejected = models.BooleanField(default=False)
    # quote_rejected_reason_types = [
    #     ('CLIENT_HAS_A_DEBIT', 'Client has previous debit'),
    #     ('OTHER_REASONS', 'Some Others'),
    # ]
    # quote_rejected_reason_type = models.CharField(
    #     max_length=20, choices=quote_rejected_reason_types, blank=True, null=True)
    # reason_for_rejection = models.CharField(
    #     max_length=1000, null=True, blank=True)

    delivery = models.ForeignKey(
        'Delivery', on_delete=models.SET_NULL, blank=False, null=True)

    # quote_items = models.ManyToManyField('QuoteItem')

    def __str__(self):
        return self.quote_number


# class QuoteItem (models.Model):
#     # quote = models.ForeignKey(
#     #     Quote, on_delete=models.CASCADE, null=True, blank=False)
#     description = models.CharField(max_length=1000)
#     quantity = models.IntegerField(default=1)
#     part_number = models.CharField(max_length=50, null=True, blank=True)

#     unit_price = models.FloatField(default=0.0)

#     quote_item_statuses = [
#         ('APRSNG', 'Awaiting Processing'),
#         ('AWAARIVAL', 'Awaiting Arrival'),
#         ('ARRIVED', 'Arrived'),

#         ('PENDING_FINANCE', 'Pending Approval'),
#         ('NOTPAID_DELIVER', 'Not Paid, Allow Delivery'),
#         ('PAID_DELIVER', 'Paid, Allow Delivery'),

#         ('AWAITDELIVERY', 'Awaiting Delivery'),
#         ('DELIVERED', 'Delivered'),
#         ('NOTDELIVERED', 'Not Delivered'),
#     ]
#     quote_item_status = models.CharField(
#         max_length=20, choices=quote_item_statuses, default="APRSNG")

#     date_delivered = models.DateTimeField(null=True, blank=True)
#     date_processed = models.DateTimeField(null=True, blank=True)
#     date_arrived = models.DateTimeField(null=True, blank=True)
#     date_finance_approved = models.DateTimeField(null=True, blank=True)

#     def __str__(self):
#         return self.part_number + " : " + self.description

# Delivery


class State(models.Model):
    name = models.CharField(max_length=20, null=False, blank=False)

    def __str__(self):
        return self.name


class ReasonNotToDeliver(models.Model):
    text = models.CharField(max_length=100, null=False, blank=False)
    code = models.CharField(max_length=10, null=False, blank=False)

    def __str__(self):
        return self.text


class Delivery(models.Model):
    delivered_by = models.ForeignKey(
        get_user_model(), on_delete=models.SET_NULL, null=True, blank=True)

    not_delivered_why = models.ForeignKey(
        ReasonNotToDeliver, on_delete=models.SET_NULL, null=True, blank=True)
    other_reasons = models.CharField(max_length=1000, null=True, blank=True)

    delivery_location = models.CharField(
        max_length=1000, default='CHERT SYSTEMS SOLUTION')
    delivery_types = [
        ('PICK_UP', 'Pick Up'),
        ('DELIVER', ' We Deliver'),
    ]
    delivery_type = models.CharField(
        max_length=10, choices=delivery_types, blank=True, default='PICK_UP')
    date_delivered = models.DateField(null=True, blank=True)
    delivery_state = models.ForeignKey(
        State, on_delete=models.SET_NULL, null=True)
