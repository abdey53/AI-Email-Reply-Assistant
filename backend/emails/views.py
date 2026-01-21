from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from openai import OpenAI
from django.conf import settings
from emails.models import EmailReply

client = OpenAI(api_key=settings.OPENAI_API_KEY)


@api_view(['POST'])
@authentication_classes([BasicAuthentication])  # 🔥 THIS IS THE KEY
@permission_classes([AllowAny])
def generate_reply(request):

    email_text = request.data.get("email_text")
    tone = request.data.get("tone", "professional")

    if not email_text:
        return Response(
            {
                "error": "email_text is required",
                "received_data": request.data
            },
            status=400
        )

    prompt = f"""
    You are a professional email assistant.
    Generate a {tone} reply for the following email:

    "{email_text}"
    """

    response = client.responses.create(
        model="gpt-4.1-mini",
        input=prompt
    )

    ai_reply = response.output_text

    EmailReply.objects.create(
        email_text=email_text,
        tone=tone,
        ai_reply=ai_reply
    )

    return Response({"reply": ai_reply})
