from twilio.rest import Client
from frostguard_api.models import GuardianAlert, GuardianPositionData, GuardianTelemetryData
import os

def send_twilio_message(
        guardian_position_data: GuardianPositionData, 
        guardian_telemetry_data: GuardianTelemetryData,
        guardian_alert: GuardianAlert,
        control_methods_list: list,
    ):
    account_sid = os.getenv('TWILIO_ACCOUNT_SID')
    auth_token = os.getenv('TWILIO_AUTH_TOKEN')
    client = Client(account_sid, auth_token)

    guardian_zone = guardian_position_data.guardian_zone
    phone_numbers = guardian_zone.get_phone_numbers()

    body_message = f"""
¡Spring Frost Alert!

Expected Temperature: {guardian_telemetry_data.temperature} °C
Start Date: {guardian_alert.start_datetime.strftime('%H:%M %d-%m-%Y')}
Combat System: {', '.join(control_methods_list[:-1]) + (' and ' + control_methods_list[-1] if control_methods_list else '')}
"""
    
    content_variables = {
        "temperature": f"{guardian_telemetry_data.temperature}",
        "start_time": f"{guardian_alert.start_datetime.strftime('%H:%M %d-%m-%Y')}",
        "combat_systems": f"{', '.join(control_methods_list[:-1]) + (' and ' + control_methods_list[-1] if control_methods_list else '')}"
    }

    for phone_number in phone_numbers:
        message = client.messages.create(
            from_='whatsapp:+14155238886',
            body=body_message,
            to=f'whatsapp:{phone_number}'
        )

        print(message.sid)
