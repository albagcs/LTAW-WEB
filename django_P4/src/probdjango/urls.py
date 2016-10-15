"""probdjango URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    # tienda...porque django toma todo desde el directorio raiz src
    url(r'^$', 'tienda.views.shop', name='shop'),
    url(r'^bikes.html/', 'tienda.views.bikes', name='bikes'),
    url(r'^books.html/', 'tienda.views.books', name='books'),
    url(r'^music.html/', 'tienda.views.music', name='music'),
    url(r'^contact.html/', 'tienda.views.contact', name='contact'),
    url(r'^view_bike.html/', 'tienda.views.view_bikes', name='view_bikes'),
    url(r'^shop.html/', 'tienda.views.shop', name='shop'),
]

if settings.DEBUG:
    # anadimos, para diferenciar entre mddo produccion y desarrollo
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    
