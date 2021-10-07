from django.shortcuts import render,redirect
from .forms import CreateUserForm,UpdateProfilForm
from django.contrib.auth import login, authenticate, logout as logout_, update_session_auth_hash
from django.contrib import messages
from django.contrib.auth.forms import User,PasswordChangeForm

# Create your views here.
def index(request):
    return render(request,"main/index.html",{})


def register(response):
    if response.method == 'POST':
        form =CreateUserForm(response.POST)
        if form.is_valid():
            user = form.save()
            login(response,user)
            return redirect('home')
    else:
        form = CreateUserForm()
    context={'form':form}
    return render(response,'main/singup.html',context)


def loginPage(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request,username=username,password=password)
        if user is not None :
            login(request,user)
            return redirect('home')
        else:
            messages.info(request, 'Le nom d\'utilisateur ou le mot de passe est incorrect.')
            context = {}
            return render(request, 'main/login.html', context)

    context = {}
    return render(request, 'main/login.html', context)

def logout(request):
    logout_(request)
    return redirect('/login')


def profil(request):
    if request.user.is_authenticated:
        is_updated=False
        if request.method=="POST":
            update=UpdateProfilForm(request.POST,instance=request.user)
            if update.is_valid():
                update.save()
                is_updated=True
            return render(request,'main/profile.html',{'form':update,'is_updated':is_updated,'edit_pass':False})
        else:
            update = UpdateProfilForm(instance=request.user)
            return render(request,'main/profile.html',{'form':update,'is_updated':is_updated,'edit_pass':False})
    else:
        return redirect("/login")

def edit_password(request):
    if request.user.is_authenticated:
        is_updated=False
        if request.method=="POST":
            update=PasswordChangeForm(data=request.POST,user=request.user)
            if update.is_valid():
                update.save()
                is_updated=True
                update_session_auth_hash(request,update.user)
                return redirect("/profil/")
            return render(request,'main/profile.html',{'form':update,'is_updated':is_updated,'edit_pass':True})
        else:
            update = PasswordChangeForm(user=request.user)
            return render(request,'main/profile.html',{'form':update,'is_updated':is_updated,'edit_pass':True})

    else:
        return redirect("/login")