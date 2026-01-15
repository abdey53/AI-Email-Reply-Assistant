from django.db import models

# Create your models here.

class EmailReply(models.Model):
    email_text = models.TextField()
    tone = models.CharField(max_length=50)
    ai_reply = models.TextField()
    created_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.tone