from django.shortcuts import render

from django.shortcuts import get_object_or_404
from users.serializers import UserSerializer
from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model, get_user

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.decorators import api_view


from django.utils.crypto import get_random_string
import random
import string
from users.util import NewUserMessages
from core.views import generate_password

from django.utils import timezone


from staffleave.models import Request, Leave, LeaveType, Department, Staff
from staffleave.serializers import RequestSerializer, LeaveSerializer, LeaveTypeSerializer, DepartmentSerializer, StaffSerializer
from staffleave.permissions import IsUserHumanResource

from rest_framework import mixins
from .utils import get_jwt_token


@login_required
def home(request):

    context = {
        "debug": True
    }

    token = get_jwt_token(request)
    context['access_token'] = token['access']
    context['refresh_token'] = token['refresh']

    return render(request, 'staffleave/human_resource.html', context)

# API VIEWS


@api_view(["GET"])
def get_current_user(request):
    import json

    user = request.user

    message = {
        "id": user.id,
        "is_delivery": user.is_delivery,
        "is_sales": user.is_sales,
        "is_procurement": user.is_procurement,
        "is_human_resource": user.is_human_resource,
        "name": user.name,
        "email": user.email,
        "is_active": user.is_active,
    }

    return Response(message, status=status.HTTP_200_OK, headers={})

# END OF API VIEWS


class StaffViewset(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    permission_classes = [IsAuthenticated, IsUserHumanResource]

    def update(self, request, *args, **kwargs):

        pk = kwargs['pk']
        name = str(request.data['name'])
        email = str(request.data['email'])
        department = str(request.data['department'])

        staff = Staff.objects.filter(pk=pk)
        department = Department.objects.filter(pk=department)

        # start of ceation of user
        if department.count() == 0:
            return Response({'message': "No department with such data"}, status=status.HTTP_400_BAD_REQUEST, headers={})

        if staff.count() == 0:
            return Response({'message': "No Staff with such data"}, status=status.HTTP_400_BAD_REQUEST, headers={})

        if (email is not None and len((str(email)).strip()) > 0
                and ((name is not None) and len((str(name)).strip()) > 0)):

            staff = staff.first()

            user = staff.user
            user.name = name
            user.email = email
            user.save()

            staff.department = department.first()
            staff.save()

        else:
            return Response({'message': "No staff data supplied"}, status=status.HTTP_400_BAD_REQUEST, headers={})

        # except ValueError as identifier:
        #     return Response({'message': str(identifier)}, status=status.HTTP_400_BAD_REQUEST, headers={})

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        name = str(request.data['name'])
        email = str(request.data['email'])
        department = str(request.data['department'])
        department = Department.objects.filter(pk=department)

        # start of ceation of user
        if department.count() == 0:
            return Response({'No department with such data': str(error_message)}, status=status.HTTP_400_BAD_REQUEST, headers={})

        if (email is not None and len((str(email)).strip()) > 0
                and ((name is not None) and len((str(name)).strip()) > 0)):

            user_count = get_user_model().objects.filter(
                email=email
            ).count()

            if user_count == 0:
                new_user = get_user_model().objects.create(
                    email=email,
                    name=name,
                    email_verified=False,
                    is_super_admin=True
                )

                department = department.first()

                new_user.is_sales = False
                new_user.is_procurement = False
                new_user.is_delivery = False
                new_user.is_finance = False

                new_user.is_super_admin = False
                new_user.save()

                user_password = generate_password()

                new_user.set_password(
                    user_password
                )
                new_user.save()

                Staff.objects.create(
                    department=department,
                    user=new_user
                )

                # send first time user mails
                new_user_messages_obj = NewUserMessages()
                new_user_messages_obj.send_welcome_message(
                    new_user.email, new_user.name, None, new_user, user_password, request.user)

                success_message = "An account has been created for " + name
            else:
                error_message = "A User with that email already exist."
                return Response({'message': str(error_message)}, status=status.HTTP_400_BAD_REQUEST, headers={})

            # end of creation of user
            # Changing from serializer.data to request.data,
            # On submission, the error is that it keeps looking for a
            # a pk value, i don't have that unless I put it in the data
            headers = self.get_success_headers(request.data)
            return Response(request.data, status=status.HTTP_201_CREATED, headers=headers)


class DepartmentViewset(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated, IsUserHumanResource]

    def update(self, request, *args, **kwargs):

        pk = kwargs['pk']
        name = str(request.data['name'])

        try:
            objects = Department.objects.filter(name__iexact=name)
            if(objects.count() > 0):
                # Check if it is the same model we are trying to edit.
                for object in objects:
                    if int(object.pk) == int(pk):
                        pass
                    else:
                        raise ValueError("A Leave Type named " +
                                         name + " already exists.")

        except ValueError as identifier:
            return Response({'message': str(identifier)}, status=status.HTTP_400_BAD_REQUEST, headers={})

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        name = str(request.data['name'])

        try:

            if (Department.objects.filter(name__iexact=name).count() == 0):
                pass
            else:
                raise ValueError("A Department named " +
                                 name + " already exists.")

            self.perform_create(serializer)
        except ValueError as identifier:
            return Response({'message': str(identifier)}, status=status.HTTP_400_BAD_REQUEST, headers={})

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class LeaveTypeViewset(viewsets.ModelViewSet):
    queryset = LeaveType.objects.all()
    serializer_class = LeaveTypeSerializer
    permission_classes = [IsAuthenticated, IsUserHumanResource]

    def update(self, request, *args, **kwargs):

        pk = kwargs['pk']
        name = str(request.data['name'])

        try:
            print(LeaveType.objects.filter(pk=pk,))
            objects = LeaveType.objects.filter(name__iexact=name)
            if(objects.count() > 0):
                # Check if it is the same model we are trying to edit.
                for object in objects:
                    print(object.pk)
                    if int(object.pk) == int(pk):
                        pass
                    else:
                        raise ValueError("A Leave Type named " +
                                         name + " already exists.")

            # if (LeaveType.objects.filter(name__iexact=name).count() == 0):
            #     pass
            # else:
            #     raise ValueError("A Leave Type named " +
            #                      name + " already exists.")
        except ValueError as identifier:
            return Response({'message': str(identifier)}, status=status.HTTP_400_BAD_REQUEST, headers={})

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        name = str(request.data['name'])

        try:

            if (LeaveType.objects.filter(name__iexact=name).count() == 0):
                pass
            else:
                raise ValueError("A Leave Type named " +
                                 name + " already exists.")

            self.perform_create(serializer)
        except ValueError as identifier:
            return Response({'message': str(identifier)}, status=status.HTTP_400_BAD_REQUEST, headers={})

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class RequestViewset(viewsets.ModelViewSet):
    """ A simple ViewSet for viewing and editing Requests"""
    queryset = Request.objects.all()
    serializer_class = RequestSerializer
    permission_classes = [IsAuthenticated, IsUserHumanResource]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    # def list(self, request,format=None):

    # def get_queryset(self):
    #     return self.request.user.accounts.all()


class LeaveViewset(viewsets.ModelViewSet):
    queryset = Leave.objects.all()
    serializer_class = LeaveSerializer

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)
