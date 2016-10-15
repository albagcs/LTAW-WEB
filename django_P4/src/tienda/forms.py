from django import forms
from .models import Registrado
# en principio muy basico
# SE PUEDEN MANEJAR FORMULARIOS CON FORM O MODELFORM, ESTA SEGUNDA PRINCIPALMENTE
# PARA LA INTERFAZ ADMINISTRATIVA
class RegForm(forms.Form):

    usuario = forms.CharField(max_length = 100)
    email_form = forms.EmailField()
    postal_code = forms.IntegerField()

# con Model forms, es para la interfaz administrativa
#class RegForm(forms.ModelForm):
#    class Meta: # concepto mas complejo
            # modelo que definimos nosotros en models.py
#            model = Registrado
            # campos que queremos mostrar
            # hay que ir a admin.py para registrar el modelo
#            fields = ["nombre","email", "cp"]
    # para tener cleaned data, establacer validaciones
#    def clean_email(self):
#        email = self.cleaned_data.get("email")
#        email_base, proveedor = email.split("@")
#        dominio, extension = proveedor.split(".")
        # este return impone este email antes del registrado rellenado en el formulario
        #return "young@gmail.co"
        # esto no sigue el dont repeat yourself:
        #return self.cleaned_data.get("email")
#        if not dominio == "orange" in email:
#            raise forms.ValidationError("Your email should have orange domain")
        # con return guardamos en la base de datos
#        return email