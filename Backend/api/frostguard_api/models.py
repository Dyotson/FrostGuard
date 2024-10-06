from django.db import models

class GuardianZone(models.Model):
    name = models.CharField(max_length=255, unique=True)
    has_sprinklers = models.BooleanField(default=False)
    has_roof = models.BooleanField(default=False)
    has_heaters = models.BooleanField(default=False)
    has_fans = models.BooleanField(default=False)
    crop_type = models.CharField(default=False)
    description = models.CharField(max_length=255, default="")
    coordinates = models.JSONField(default=list)

    def get_phone_numbers(self):
        return [contact.phone_number for contact in self.zone_contact.all()]


class GuardianAlert(models.Model):
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    message_recommendation = models.TextField()
    guardian_zone = models.ForeignKey(GuardianZone, on_delete=models.PROTECT)
    active = models.BooleanField(default=False)


class GuardianPositionData(models.Model):
    sender = models.CharField(max_length=255, unique=True)
    altitude = models.BigIntegerField()
    latitude_i = models.DecimalField(max_digits=30, decimal_places=12)
    longitude_i = models.DecimalField(max_digits=30, decimal_places=12)
    guardian_zone = models.ForeignKey(GuardianZone, on_delete=models.PROTECT, null=True)


class GuardianTelemetryData(models.Model):
    sender = models.CharField(max_length=255)
    barometric_pressure = models.DecimalField(max_digits=15, decimal_places=12)
    relative_humidity = models.DecimalField(max_digits=15, decimal_places=12)
    temperature = models.DecimalField(max_digits=15, decimal_places=12)
    timestamp = models.DateTimeField()


class ZoneContact(models.Model):
    phone_number = models.CharField(max_length=20)
    guardian_zone = models.ForeignKey(
        GuardianZone, 
        related_name="zone_contact", 
        on_delete=models.PROTECT
    )
