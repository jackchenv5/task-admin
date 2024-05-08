from django.urls import path, include

urlpatterns = [
    path('', include('task.urls')),
    path('', include('user.urls')),
    path('api-auth/', include('rest_framework.urls')),
]