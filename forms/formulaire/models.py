from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Formulaire(models.Model):
    title=models.CharField(max_length=100)
    description=models.CharField(max_length=500)
    created_date=models.DateTimeField(auto_now_add=True)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    is_active=models.BooleanField(default=True)

    def __str__(self):
        return "title : "+self.title+" created in :"+str(self.created_date)
    
    def get_clients(self):
        return self.client_set.all()

    def get_questions(self):
        return self.question_set.all()

quest_types=(
    ('text','text'),
    ('checkbox','checkbox'),
    ('radio','radio')
)
class Question(models.Model):
    text=models.CharField(max_length=500)
    quest_type=models.CharField(max_length=200,choices=quest_types)
    is_required=models.BooleanField(default=False)
    form=models.ForeignKey(Formulaire,on_delete=models.CASCADE)

    def __str__(self):
        return "text : "+self.text
    
    def get_options(self):
        return self.option_set.all()

    def get_responses(self):
        return self.response_set.all()

class Option(models.Model):
    text=models.CharField(max_length=500)
    question=models.ForeignKey(Question,on_delete=models.CASCADE)

    def __str__(self):
        return "text : "+self.text

class Submission(models.Model):
    form = models.ForeignKey(Formulaire, on_delete=models.CASCADE)
    submission_date = models.DateTimeField(auto_now_add=True)

class Response(models.Model):
    question = models.ForeignKey(Question,on_delete=models.CASCADE)
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE,default= None )
    text=models.CharField(max_length=500,default= None)
    def __str__(self):
        return str(self.text)