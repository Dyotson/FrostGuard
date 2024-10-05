from django.db import models

class GuardianPositionData(models.Model):
    sender = models.CharField(max_length=255)
    altitude = models.BigIntegerField()
    latitude_i = models.BigIntegerField()
    longitude_i = models.BigIntegerField()


class GuardianTelemetryData(models.Model):
    sender = models.CharField(max_length=255)
    barometric_pressure = models.DecimalField(max_digits=15, decimal_places=12)
    relative_humidity = models.DecimalField(max_digits=15, decimal_places=12)
    temperature = models.DecimalField(max_digits=15, decimal_places=12)
    timestamp = models.DateTimeField()
