# Generated by Django 5.0.4 on 2024-04-20 19:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="KeyLogin",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "login",
                    models.CharField(
                        verbose_name="URL сервиса, в который мы логинимся"
                    ),
                ),
                ("key", models.CharField(verbose_name="Открытый ключ сервиса")),
            ],
        ),
        migrations.DeleteModel(
            name="Service",
        ),
    ]
