import threading

import paho.mqtt.client as mqtt


class MqttClient(mqtt.Client):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.loop_thread = threading.Thread(target=self.loop_forever)
        self.address = 'mosquitto.local'
        self.port = 1883
        self.topic = '#'
    
    def log(self, msg):
        print(msg)
        with open('mqtt.log', 'a') as f:
            f.write(f'{msg}\n')

    def on_connect(self, client, userdata, flags, rc):
        self.log(f'Connected with result code {rc}')
        self.subscribe(self.topic)
        self.loc('Subscribed to topic {self.topic}')

    def on_message(self, client, userdata, message):
        self.log(f'Message on topic {message.topic}: {message.payload}')
    
    def start(self):
        self.connect(self.address, self.port)
        self.loop_thread.start()