from django.contrib import admin
# cuando usamos ModelForm
from .forms import RegForm
# para poder utilizar los modelos en la interfaz de administracion
from .models import Registrado
# Register your models here.

class AdminRegistrado(admin.ModelAdmin):
    # esta lista de campos seran los que veamos en la base de datos admin
    list_display = ["__unicode__", "cp", "nombre", "timestamp", "actualizado"]
    # esto no nos sirve porque ahora usamos modelforms
    class Meta:
        model = Registrado
    #form = RegForm
    

admin.site.register(Registrado, AdminRegistrado)
