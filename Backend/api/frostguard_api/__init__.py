import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "your_project.settings")
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"

from . import mqtt

mqtt_client = mqtt.MqttClient()
mqtt_client.start()