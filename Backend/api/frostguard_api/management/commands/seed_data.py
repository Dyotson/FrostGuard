from django.core.management.base import BaseCommand
from frostguard_api.models import GuardianPositionData, GuardianTelemetryData
from django.utils import timezone
from decimal import Decimal


import random
from datetime import timedelta

class Command(BaseCommand):
    help = 'Seed the database with initial data'

    sender_ids = ["!fa6f163c", "!fb7f164c", "!fc6f165c", "!fd6f163c"]

    def handle(self, *args, **kwargs):
        GuardianPositionData.objects.create(
            sender="!fa6f163c",
            altitude=1000,
            latitude_i=Decimal('-41.301871'),
            longitude_i=Decimal('-73.508575'),
        )

        GuardianPositionData.objects.create(
            sender="!fb7f164c",
            altitude=1000,
            latitude_i=Decimal('-41.302509'),
            longitude_i=Decimal('-73.508724'),
        )

        GuardianPositionData.objects.create(
            sender="!fc6f165c",
            altitude=1000,
            latitude_i=Decimal('-41.301889'),
            longitude_i=Decimal('-73.508063')
        )

        GuardianPositionData.objects.create(
            sender="!fd6f163c",
            altitude=1000,
            latitude_i=Decimal('-41.302576'),
            longitude_i=Decimal('-73.508203'),
        )

        for _ in range(10):
            random_days = random.randint(0, 365)
            timestamp = timezone.now() - timedelta(days=random_days)

            for id in self.sender_ids:
                GuardianTelemetryData.objects.create(
                    sender=id,
                    barometric_pressure=Decimal(f"{random.uniform(900, 999)}"),
                    relative_humidity=Decimal(f"{random.uniform(20, 80)}"),
                    temperature=Decimal(f"{random.uniform(-1, 20)}"),
                    timestamp=timestamp.isoformat()
                )
        self.stdout.write(self.style.SUCCESS('Successfully seeded the database'))
