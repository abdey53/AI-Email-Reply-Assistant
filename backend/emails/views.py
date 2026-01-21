from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from openai import OpenAI
from django.conf import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)

@api_view(['POST'])
@permission_classes([AllowAny])
def generate_reply(request):

    email_text = request.data.get("email_text")
    tone = request.data.get("tone", "professional")

    if not email_text:
        return Response(
            {"error": "email_text is required"},
            status=400
        )

    response = client.responses.create(
        model="gpt-4.1-mini",
        input=f"Reply in {tone} tone: {email_text}"
    )

    return Response({"reply": response.output_text})

