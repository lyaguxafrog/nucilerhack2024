# Generated by Django 5.0.4 on 2024-04-21 02:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cloud", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="privatekeys",
            name="private_key",
            field=models.CharField(verbose_name="Зашифрованный приватный ключ"),
        ),
    ]
