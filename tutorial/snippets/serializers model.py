from rest_framework import serializers
from snippets.models  import Snippet
class SnippetSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Snippet
        fields = ['id', 'title','owner', 'code', 'linenos', 'language', 'style']