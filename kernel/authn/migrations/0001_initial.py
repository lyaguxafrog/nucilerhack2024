# Generated by Django 5.0.4 on 2024-04-21 09:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("users", "0005_delete_keylogin"),
    ]

    operations = [
        migrations.CreateModel(
            name="Signature",
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
                ("signature", models.CharField(verbose_name="Не подписанная строка")),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="users.profile",
                    ),
                ),
            ],
        ),
    ]
