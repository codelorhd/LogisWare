from django.urls import path
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.conf import settings

from rest_framework import routers

from staffleave import views as staffleave_views
from users import views as users_views

router = routers.DefaultRouter()
router.register(r'requests', staffleave_views.RequestViewset)
# Leave Models
router.register(r'users', users_views.UsersViewset)
router.register(r'model', staffleave_views.LeaveViewset)
router.register(r'staff', staffleave_views.StaffViewset)
router.register(r'types', staffleave_views.LeaveTypeViewset)
router.register(r'departments', staffleave_views.DepartmentViewset)


# register another routers

urlpatterns = [
    url(r'users/current', staffleave_views.get_current_user, name="get_current_user_api"),

]

urlpatterns = urlpatterns + router.urls
