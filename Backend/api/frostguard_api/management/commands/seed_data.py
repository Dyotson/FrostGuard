from django.core.management.base import BaseCommand
from frostguard_api.models import (
    GuardianPositionData, 
    GuardianTelemetryData, 
    GuardianZone, 
    GuardianAlert
)
from django.utils import timezone
from decimal import Decimal


import random
from datetime import timedelta

class Command(BaseCommand):
    help = 'Seed the database with initial data'

    sender_ids = ["!fa6f163c", "!fb7f164c", "!fc6f165c", "!fd6f163c", "!ga6f163c", "!gb6f163c", "!gc6f163c", "!gd6f163c", "!ge6f163c"]

    def handle(self, *args, **kwargs):
        zone_1 = GuardianZone.objects.create(
            name="Zona 1"
        )

        zone_2 = GuardianZone.objects.create(
            name="Zona 2"
        )

        GuardianAlert.objects.create(
            guardian_zone=zone_1,
            start_datetime=timezone.now() - timedelta(days=1),
            end_datetime=timezone.now() - timedelta(days=1) + timedelta(hours=2),
            message_recommendation="Utilizar estufas para calentas las plantas"
        )

        # Zone 1
        GuardianPositionData.objects.create(
            sender="!fa6f163c",
            altitude=1000,
            latitude_i=Decimal('-41.301871'),
            longitude_i=Decimal('-73.508575'),
            guardian_zone=zone_1
        )

        GuardianPositionData.objects.create(
            sender="!fb7f164c",
            altitude=1000,
            latitude_i=Decimal('-41.302509'),
            longitude_i=Decimal('-73.508724'),
            guardian_zone = zone_1
        )

        GuardianPositionData.objects.create(
            sender="!fc6f165c",
            altitude=1000,
            latitude_i=Decimal('-41.301889'),
            longitude_i=Decimal('-73.508063'),
            guardian_zone = zone_1
        )

        GuardianPositionData.objects.create(
            sender="!fd6f163c",
            altitude=1000,
            latitude_i=Decimal('-41.302576'),
            longitude_i=Decimal('-73.508203'),
            guardian_zone = zone_1,
        )

        # Zone 2
        GuardianPositionData.objects.create(
            sender="!ga6f163c",
            altitude=900,
            latitude_i=Decimal('-41.290773'),
            longitude_i=Decimal('-73.546889'),
            guardian_zone = zone_2,
        )

        GuardianPositionData.objects.create(
            sender="!gb6f163c",
            altitude=900,
            latitude_i=Decimal('-41.290846'),
            longitude_i=Decimal('-73.546210'),
            guardian_zone = zone_2,
        )

        GuardianPositionData.objects.create(
            sender="!gc6f163c",
            altitude=900,
            latitude_i=Decimal('-41.290203'), 
            longitude_i=Decimal('-73.546680'),
            guardian_zone = zone_2,
        )

        GuardianPositionData.objects.create(
            sender="!gd6f163c",
            altitude=900,
            latitude_i=Decimal('-41.290252'), 
            longitude_i=Decimal('-73.545959'),
            guardian_zone = zone_2,
        )

        GuardianPositionData.objects.create(
            sender="!ge6f163c",
            altitude=900,
            latitude_i=Decimal('-41.289886'), 
            longitude_i=Decimal('-73.546295'),
            guardian_zone = zone_2,
        )

        timestamp = timezone.now()
        for _ in range(48):

            for id in self.sender_ids:
                GuardianTelemetryData.objects.create(
                    sender=id,
                    barometric_pressure=Decimal(f"{random.uniform(900, 999)}"),
                    relative_humidity=Decimal(f"{random.uniform(20, 80)}"),
                    temperature=Decimal(f"{random.uniform(-1, 20)}"),
                    timestamp=timestamp.isoformat()
                )
            
            timestamp = timestamp - timedelta(hours=1)
        self.stdout.write(self.style.SUCCESS('Successfully seeded the database'))
