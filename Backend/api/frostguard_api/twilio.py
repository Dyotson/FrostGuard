from twilio.rest import Client
from frostguard_api.models import GuardianZone
import os

def send_twilio_message(guardian_zone: GuardianZone):    
    account_sid = os.getenv('TWILIO_ACCOUNT_SID')
    auth_token = os.getenv('TWILIO_AUTH_TOKEN')
    client = Client(account_sid, auth_token)

    phone_numbers = guardian_zone.get_phone_numbers()

    for phone_number in phone_numbers:
        message = client.messages.create(
            from_='whatsapp:+14155238886',
            content_sid='HXb5b62575e6e4ff6129ad7c8efe1f983e',
            content_variables='{"1":"12/1","2":"3pm"}',
            to=f'whatsapp:{phone_number}'
        )

        print(message.sid)
