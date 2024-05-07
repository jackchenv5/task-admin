from django.urls import path, include

urlpatterns = [
    path('', include('snippets.urls')),
    path('', include('user.urls')),
    path('api-auth/', include('rest_framework.urls')),
]