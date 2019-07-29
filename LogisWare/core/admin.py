from django.contrib import admin
from core.models import Client, Quote, State, Delivery, ReasonNotToDeliver

admin.site.register(Delivery)
admin.site.register(Client)
admin.site.register(Quote)
admin.site.register(State)
admin.site.register(ReasonNotToDeliver)
