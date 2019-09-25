from rest_framework_simplejwt.tokens import RefreshToken


def get_jwt_token(request):
    refresh = RefreshToken.for_user(request.user)

    print(refresh.access_token)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
