from django.urls import path, include

urlpatterns = [
    path('', include('user.urls')),
    path('api-auth/', include('rest_framework.urls')),
]