# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-06-25 20:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tienda', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='registrado',
            name='cp',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
