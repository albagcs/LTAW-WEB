from __future__ import unicode_literals

from django.db import models

# aaah, no puedo usar acentos :( ni caracteres no ingleses
# Create your models here. Los modelos seran la estructura de la base de
# datos. Un modelo contiene campos y comportamiento de los datos que seran
# almacenados en la base de datos. En mi caso no los usare, hasta
# implementar el buscador en la tienda. Hare el ejemplo de 'Karlita'.
# Podemos verlo como una tabla


class Registrado(models.Model):

# hereda codigo de django ya escrito
# ej formulario para registrarse. Queremos recibir boletin
# semanal
# Campos/atributos dentro del modelo, que se guardaran en la base de datos
# Django tiene varios tipos de datos/campos. Buscamos django model fields
# (null, blank,CharField...)
    # blank, default no puede estar en blanco, se puede cambiar
    nombre = models.CharField(max_length=120, blank=True, null=True)
    email = models.EmailField()
    cp = models.IntegerField(blank=True, null=True)
    # El momento en el que la persona se registra en el sistema
    timestamp = models.DateTimeField(auto_now_add=True, auto_now=False)
    # Determinamos
    actualizado = models.DateTimeField(auto_now_add=False, auto_now=True)
    # Hay que definir unicode. NO EXPLICA POR QUE. Usamos python 2.7.6

    def __unicode__(self):  # __str__ para python3
        return self.email


# Hay que ir a settings.py de probdjango, a INSTALLED_APPS, anadir app tienda
# Con los modelos movemos datos a la base de datos (valga la redundancia)
# SIEMPRE que los modificamos hay que hacer migrations en dos pasos:
    # python manage.py makemigrations (en el directorio src)
    # python managy.py migrate
