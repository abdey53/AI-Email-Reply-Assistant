from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from groq import Groq
from django.conf import settings

client = Groq(api_key=settings.GROQ_API_KEY)


@api_view(["POST"])
@permission_classes([AllowAny])
def generate_reply(request):
    email_text = request.data.get("email_text")
    tone = request.data.get("tone", "professional")

    if not email_text:
        return Response({"error": "email_text is required"}, status=400)

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that writes professional email replies."
                },
                {
                    "role": "user",
                    "content": f"Reply to this email in a {tone} tone:\n\n{email_text}"
                }
            ],
            temperature=0.7,
        )

        return Response({
            "reply": response.choices[0].message.content
        })

    except Exception as e:
        print("Groq Error:", e)
        return Response({"error": str(e)}, status=500)