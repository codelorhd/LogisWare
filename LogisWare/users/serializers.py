from collections import OrderedDict

from django.contrib.auth import get_user_model

from rest_framework import serializers



class UserSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = get_user_model()
        fields = ( "url", "id", 'email', 'is_active', 'name' )
    
    # email = serializers.EmailField()
    # is_active = serializers.BooleanField(default=True)
    # name = serializers.CharField(max_length=255)
    
    # def to_representation(self, instance):
    #     response_dict = OrderedDict()
    #     response_dict['id'] = instance.id
    #     response_dict['email'] = instance.email
    #     response_dict['is_active'] = instance.is_active
    #     response_dict['name'] = instance.name
        
    #     return response_dict