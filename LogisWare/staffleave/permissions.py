from rest_framework import permissions


class IsUserHumanResource(permissions.BasePermission):
    def has_permission(self, request, view):

        return request.user.is_human_resource == True
