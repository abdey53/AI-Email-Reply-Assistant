import json
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from openai import OpenAI
from django.conf import settings
from emails.models import EmailReply

client = OpenAI(api_key=settings.OPENAI_API_KEY)


@csrf_exempt          # 🔥 MUST BE FIRST
@api_view(['POST'])
def generate_reply(request):

    try:
        data = json.loads(request.body.decode("utf-8"))
    except Exception:
        data = {}

    email_text = data.get("email_text")
    tone = data.get("tone", "professional")

    if not email_text:
        return Response(
            {
                "error": "email_text is required",
                "received_data": data
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
