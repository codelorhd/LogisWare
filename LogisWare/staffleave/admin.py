from django.contrib import admin
from staffleave.models import Staff, Department, LeaveType, Leave, Request

# Register your models here.
admin.site.register(Staff)
admin.site.register(Department)
admin.site.register(LeaveType)
admin.site.register(Leave)
admin.site.register(Request)
