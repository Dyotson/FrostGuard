import threading
import json

from datetime import datetime
from pytz import timezone

import paho.mqtt.client as mqtt


from frostguard_api.models import GuardianTelemetryData

# america/santiago
TIMEZONE = timezone('America/Santiago')


class MqttClient(mqtt.Client):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.loop_thread = threading.Thread(target=self.loop_forever)
        self.address = 'mosquitto.local'
        self.port = 1883
        self.topic = 'msh/US/2/json/LongFast/!fa6f163c'
        self.saved_timestamp = None

    def on_connect(self, client, userdata, flags, rc):
        self.log(f'Connected with result code {rc}')
        self.subscribe(self.topic)
        self.log(f'Subscribed to topic {self.topic}')

    def on_message(self, client, userdata, message):
        payload = self.format_payload(message.payload)
        if payload:
            self.log(f'Message on topic {message.topic}: {payload}')
            self.pass_data_ai(payload)
            self.save_data_db(payload)
    
    def start(self):
        self.connect(self.address, self.port)
        self.log('STARTING MQTT CLIENT')
        self.loop_thread.start()

    def log(self, msg):
        with open('telemetry.log', 'a') as f:
            f.write(f'{msg}\n')
        print(msg)

    def format_payload(self, payload):
        '''
        Shitty AF. Only works for environmental data.
        '''
        payload = json.loads(payload)
        try:
            payload = {
                'sender': payload['sender'],
                'temperature': payload['payload']['temperature'],
                'relative_humidity': payload['payload']['relative_humidity'],
                'barometric_pressure': payload['payload']['barometric_pressure'],
                'timestamp': datetime.now(TIMEZONE).strftime('%Y-%m-%d %H:%M:%S %z'),
            }
        except KeyError:
            payload = False
        finally:
            return payload
    
    # method pass data to AI model
    def pass_data_ai(self, data):
        pass
        
    # method save data to db model
    def save_data_db(self, data):
        if data:
            GuardianTelemetryData.objects.create(**data)