from django.shortcuts import render,redirect
from .models import Formulaire, Question,Response,Submission,Option
from django.http import JsonResponse, response
import re,json
from django.contrib.auth.models import User
from .utils import get_pie_plot, get_bar_plot

# Create your views here.




def home(request):
    if request.user.is_authenticated:
        if request.method=="POST":
            if "saved" in request.POST:
                form_id=int(request.POST["saved"][5:])
                form=request.user.formulaire_set.get(id=form_id)  
                if "is_active" in request.POST:          
                    form.is_active=True
                else:
                    form.is_active=False
                form.save()
            elif 'del-form' in request.POST:
                form_id=int(request.POST["del-form"])
                Formulaire.objects.get(id=form_id).delete()
        return render(request,"formulaire/home.html",{})
    else:
         return redirect("/login")







def create_form(request):
    if request.user.is_authenticated:
        if request.method=="POST":
            data=request.POST
            form=request.user.formulaire_set.create(title=data['title'],description=data['description'])
            return render(request,'formulaire/create_form.html',{'form':form})
    return JsonResponse({'status':404})

def save_form(request,id):
    if request.method=="POST":
        if request.is_ajax():
            try:
                data=request.POST
                data_=dict(data.lists())
                form=request.user.formulaire_set.get(id=id)
                questions=json.loads(data_['questions'][0])
                for q in questions:
                    question=form.question_set.create(text=q['text'],quest_type=q['type'],is_required=q['is_required'])
                    for opt in q['options']:
                        question.option_set.create(text=opt)
                return JsonResponse({"status":200})
            except:
                return JsonResponse({"status":500})
        else:
            return redirect(request,'/index/')


def form_view(request,id):
    return render(request,'formulaire/form_view.html',{})

def detail(request,id):
    return render(request,'formulaire/detail.html',{})

def submission_save(request,id):
    if request.method=="POST":
        if request.is_ajax():
            data=request.POST.dict()
            questions=json.loads(data['quest_responses'])
            form=Formulaire.objects.get(id=id)
            sub=form.submission_set.create()
            for q in questions:
                quest=Question.objects.get(id=q["id"])
                responses=q['responses']
                if q['type']=="text":
                    quest.response_set.create(text=responses[0],submission=sub,question=quest)
                else:
                    for res in responses:
                        option=Option.objects.get(id=int(res))
                        option.response_set.create(question=quest,submission=sub)      
    return JsonResponse({'r':200})
def form_data(request,id): 
    form=Formulaire.objects.get(id=id)        
    questions=[]
    title='r'
    for q in form.get_questions():
        options=[]
        y=[]
        x=[]
        for opt in q.get_options():
            options.append({'text':opt.text,'r':opt.pk})
            count=opt.response_set.count()
            if count!=0:
                y.append(opt.text)
                x.append(count)
        quest={'options':options,'text':q.text,'quest_type':q.quest_type,'is_required':q.is_required,'id':q.id}
        if request.GET['user']=='true':
            title=q.text
            if q.quest_type=='text':
                pie_graph="None"
                bar_graph="None"
            else:
                pie_graph=get_pie_plot(title,x,y)
                bar_graph=get_bar_plot(title,x,y)
            quest['pie_graph']=pie_graph
            quest['bar_graph']=bar_graph    
        questions.append(quest)
    
    return JsonResponse(
        {
            'title':form.title,
            'desc':form.description,
            'is_active':form.is_active,
            'questions':questions

        }
    )
