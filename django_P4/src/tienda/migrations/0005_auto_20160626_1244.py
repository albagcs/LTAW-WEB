# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-06-26 12:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tienda', '0004_auto_20160626_1240'),
    ]

    operations = [
        migrations.AlterField(
            model_name='registrado',
            name='email',
            field=models.EmailField(max_length=254),
        ),
    ]
