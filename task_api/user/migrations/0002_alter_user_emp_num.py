# Generated by Django 5.0.6 on 2024-05-16 07:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="emp_num",
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
    ]
