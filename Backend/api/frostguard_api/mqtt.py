import threading
import json

from datetime import datetime
from pytz import timezone


import paho.mqtt.client as mqtt

# america/santiago
TIMEZONE = timezone('America/Santiago')


class MqttClient(mqtt.Client):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.loop_thread = threading.Thread(target=self.loop_forever)
        self.address = 'mosquitto.local'
        self.port = 1883
        self.topic = 'msh/US/2/json/LongFast/!fa6f163c'

    def on_connect(self, client, userdata, flags, rc):
        self.log(f'Connected with result code {rc}')
        self.subscribe(self.topic)
        self.log('Subscribed to topic {self.topic}')

    def on_message(self, client, userdata, message):
        payload = self.format_payload(message.payload)
        self.log(f'Message on topic {message.topic}: {payload}')
    
    def start(self):
        self.connect(self.address, self.port)
        self.loop_thread.start()

    def log(self, msg):
        with open('telemetry.log', 'a') as f:
            f.write(f'{msg}\n')
        print(msg)

    def format_payload(self, payload):
        payload = json.loads(payload)
        return {
            'sender': payload['sender'],
            'timestamp': datetime.now(TIMEZONE).isoformat(),
            'temperature': payload['payload']['temperature'],
            'relative_humidity': payload['payload']['relative_humidity'],
            'barometric_pressure': payload['payload']['barometric_pressure']
        }
    
    # method pass data to model