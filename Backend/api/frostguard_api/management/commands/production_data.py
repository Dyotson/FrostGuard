from django.core.management.base import BaseCommand
from frostguard_api.models import (
    GuardianPositionData, 
    GuardianZone, 
    ZoneContact,
    ControlMethod
)
from decimal import Decimal

class Command(BaseCommand):
    help = 'Seed the database with initial data'

    def handle(self, *args, **kwargs):
        zone_1 = GuardianZone.objects.create(
            name="Zona 1",
            has_sprinklers=True,
            has_roof=True,
            has_heaters=True,
            has_fans=True,
            crop_type="Trigo",
            description="Descripción la Araucana",
            coordinates=[
                {
                    "lat": -33.522864,
                    "lng": -70.568973,
                },
                {
                    "lat": -33.522879,
                    "lng": -70.568649,
                },
                {
                    "lat": -33.523201,
                    "lng": -70.568944,
                },
                {
                    "lat": -33.523198,
                    "lng": -70.568642,
                },
            ]
        )

        # Control Method
        ControlMethod.objects.create(
            name="Aspersor 1",
            active=True,
            guardian_zone=zone_1,
            control_type='aspersion'
        )

        ControlMethod.objects.create(
            name="Techo 1",
            active=True,
            guardian_zone=zone_1,
            control_type='roof'
        )

        ControlMethod.objects.create(
            name="Calefactor 1",
            active=True,
            guardian_zone=zone_1,
            control_type='heater'
        )

        ControlMethod.objects.create(
            name="Ventilador 1",
            active=True,
            guardian_zone=zone_1,
            control_type='fan'
        )

        ZoneContact.objects.create(
            phone_number="+56976247701",
            guardian_zone=zone_1
        )

        ZoneContact.objects.create(
            phone_number="+56965839529",
            guardian_zone=zone_1
        )

        GuardianPositionData.objects.create(
            sender="!fa9ffc24",
            altitude=619,
            latitude_i=Decimal('-33.523033'),
            longitude_i=Decimal('-70.568807'),
            guardian_zone=zone_1
        )

        self.stdout.write(self.style.SUCCESS('Successfully seeded the database'))