from django.core.management.base import BaseCommand
from frostguard_api.models import GuardianPositionData, GuardianTelemetryData

import random
from datetime import datetime, timedelta

class Command(BaseCommand):
    help = 'Seed the database with initial data'

    sender_ids = ["!fa6f163c", "!fb7f164c", "!fc6f165c", "!fd6f163c"]

    def handle(self, *args, **kwargs):
        GuardianPositionData.objects.create(
            sender="!fa6f163c",
            altitude=1000,
            latitude_i=-41.301871,
            longitude_i=-73.508575,
        )

        GuardianPositionData.objects.create(
            sender="!fb7f164c",
            altitude=1000,
            latitude_i=-41.302509,
            longitude_i=-73.508724,
        )

        GuardianPositionData.objects.create(
            sender="!fc6f165c",
            altitude=1000,
            latitude_i=-41.301889,
            longitude_i=-73.508063
        )

        GuardianPositionData.objects.create(
            sender="!fd6f163c",
            altitude=1000,
            latitude_i=-41.302576,
            longitude_i=-73.508203,
        )

        for id in self.sender_ids:
            for _ in range(10):
                random_days = random.randint(0, 365)
                timestamp = datetime.now() - timedelta(days=random_days)

                GuardianTelemetryData.objects.create(
                    sender=id,
                    barometric_pressure=random.uniform(900, 1000),
                    relative_humidity=random.uniform(20, 80),
                    temperature=random.uniform(-1, 20),
                    timestamp=timestamp
                )
        self.stdout.write(self.style.SUCCESS('Successfully seeded the database'))
