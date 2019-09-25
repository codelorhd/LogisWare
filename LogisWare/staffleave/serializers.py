from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import serializers

from collections import OrderedDict

from staffleave.models import Leave, Request, LeaveType, Department, Staff
from users.serializers import UserSerializer


class StaffSerializer(serializers.HyperlinkedModelSerializer):

    # The view-name is required and to get this
    # you need to use the DefaultRouter for a ViewSet
    # that leads to that model's details
    # This must be set in the urls, when the default router is used
    # then the view_name will be the <modelname>-detail

    # user = serializers.HyperlinkedRelatedField(
    #     required=False, view_name="user-detail", read_only=True)

    # department = serializers.HyperlinkedRelatedField(
    #     required=False, view_name="department-detail", read_only=True)

    user = serializers.PrimaryKeyRelatedField(
        queryset=get_user_model().objects.all(), required=False)

    department = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all())

    class Meta:
        model = Staff
        fields = ('url', 'id', 'department', 'user')


class DepartmentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Department
        fields = ('url', 'id', 'name')


class LeaveTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LeaveType
        fields = ('url', 'id', 'name', 'maximum_days', 'include_working_days',
                  'start_month', 'end_month', 'number_of_days_to_notify')


class LeaveSerializer(serializers.HyperlinkedModelSerializer):

    name = serializers.CharField()
    date_to_start = serializers.DateField()
    date_to_end = serializers.DateField()

    class Meta:
        model = Leave
        fields = ('url', 'id', 'name',  'leave_type',
                  'date_to_end', 'date_to_start')


class RequestSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Request
        fields = '__all__'

    def create(self, validated_data):
        """
        Remove the owner field from the validated_data
        this causes the rest_framework to cough
        Fix this if you could, but I am not using it here, hence 
        the removal.
        """
        del validated_data['owner']

        return super().create(validated_data)
