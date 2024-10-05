from django.db import models

class GuardianZone(models.Model):
    name = models.CharField(max_length=255, unique=True)


class GuardianAlert(models.Model):
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    message_recommendation = models.TextField()
    guardian_zone = models.ForeignKey(GuardianZone, on_delete=models.PROTECT)


class GuardianPositionData(models.Model):
    sender = models.CharField(max_length=255, unique=True)
    altitude = models.BigIntegerField()
    latitude_i = models.BigIntegerField()
    longitude_i = models.BigIntegerField()
    guardian_zone = models.ForeignKey(GuardianZone, on_delete=models.PROTECT, null=True)


class GuardianTelemetryData(models.Model):
    sender = models.CharField(max_length=255)
    barometric_pressure = models.DecimalField(max_digits=15, decimal_places=12)
    relative_humidity = models.DecimalField(max_digits=15, decimal_places=12)
    temperature = models.DecimalField(max_digits=15, decimal_places=12)
    timestamp = models.DateTimeField()
