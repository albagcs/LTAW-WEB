from django.shortcuts import render
from .models import Registrado
from .forms import RegForm
# Create your views here.
# Vistas (para los usuarios vean). Hay un pedido y luego una respuesta
# alguien selecciona un enlace, la url deduce el request y busca la vista correcta.
# La vista obtiene datos de la BD de acuerdo a los parametros pasadios en la url, cargara
# un temple o plantilla (response)

def shop(request):
    return render(request, "shop.html")
    # para que esta modificaccion sea efectiva hay que configurar urls.py
    # hay que tener una view que renderice el archivo

def bikes(request):    
    return render(request, "bikes.html")
    # para que esta modificaccion sea efectiva hay que configurar urls.py
    # hay que tener una view que renderice el archivo
def books(request):    
    return render(request, "books.html")
    # para que esta modificaccion sea efectiva hay que configurar urls.py
    # hay que tener una view que renderice el archivo

def music(request):    
    return render(request, "music.html")
    # para que esta modificaccion sea efectiva hay que configurar urls.py
    # hay que tener una view que renderice el archivo

def contact(request):  
    # con model forms
    # form = RegForm(request.POST or None)
    # if form.is_valid():
    #   form.save(), asi se guarda en la base de datos  
    titulo = ""
    form = RegForm(request.POST or None)
    context = {
        "form" : form
    }

    if form.is_valid():
    # cleaned data es un diccionario
        form_data = form.cleaned_data
        print form_data
        # conseguimos datos de forms.py
        user = form_data.get("usuario")
        ema = form_data.get("email_form")
        codigo = form_data.get("postal_code")
        # create, crear y guardar en la base de datos
        obj = Registrado.objects.create(nombre=user,cp=codigo,email=ema)
        context = {
            "titulo": "Gracias %s, ya se ha registrado." %(user)
        }
    return render(request, "contact.html", context)
    # para que esta modificaccion sea efectiva hay que configurar urls.py
    # hay que tener una view que renderice el archivo

def view_bikes(request):    
    return render(request, "view_bike.html")
    # para que esta modificaccion sea efectiva hay que configurar urls.py
    # hay que tener una view que renderice el archivo

