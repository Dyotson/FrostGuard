from . import mqtt

mqtt_client = mqtt.MqttClient()
mqtt_client.start()