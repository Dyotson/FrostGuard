# Generated by Django 5.1.1 on 2024-10-05 18:24

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frostguard_api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='GuardianZone',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.AlterField(
            model_name='guardianpositiondata',
            name='sender',
            field=models.CharField(max_length=255, unique=True),
        ),
        migrations.CreateModel(
            name='GuardianAlert',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_datetime', models.DateTimeField()),
                ('end_datetime', models.DateTimeField()),
                ('message_recommendation', models.TextField()),
                ('guardian_zone', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='frostguard_api.guardianzone')),
            ],
        ),
        migrations.AddField(
            model_name='guardianpositiondata',
            name='guardian_zone',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='frostguard_api.guardianzone'),
        ),
    ]