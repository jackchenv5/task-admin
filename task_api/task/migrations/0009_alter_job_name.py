# Generated by Django 5.0.6 on 2024-05-16 09:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("task", "0008_job_start_time_alter_job_create_time_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="job",
            name="name",
            field=models.CharField(max_length=512, null=True),
        ),
    ]