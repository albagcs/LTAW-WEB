var http = require('http');
var fs = require('fs');
var path = require('path');
var primeraEntrada = true;
var choices = ["bicis", "libros", "discos",
"discount","disconnected", "discobirdy", "bicisvint",
"bicisdesc","biciscarreras", "library", 
"librarian", "libroverne"];
var form = '';
function onRequest(request, response) {
  console.log('request starting...');
  var filePath = '.' + request.url;
  /* muestra el archivo/recurso a descargar */
  console.log(filePath);
  if(filePath=="./"){
    filePath = './index.html';
  }
  /* nos muestra el método de la petición http */
  console.log(request.method);
  if(request.method == "GET"){

    if(filePath == './shop.html'){
    //Te pide el form. Preparamos la página shop.html e incluimos contact
      
      filePath = './shop.html';
      page = '<!DOCTYPE html>\
              <html lang="es ES">\
              <head>\
	              <title>My first shop online</title>\
	              <meta charset="UTF-8">\
	              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\
	              <link rel="stylesheet" type="text/css" href="shop_style.css">\
	              <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" type="text/css">\
                <link href= "https://fonts.googleapis.com/css?family=Source+Sans+Pro:200" rel="stylesheet" type="text/css">\
                <script src="http://code.jquery.com/jquery-latest.js"></script>\
                <script src = "main.js"></script>\
                <script type="text/javascript">\
                  function setcookie() {\
                    var x = document.cookie; \
                    window.alert(x);\
                } \
                </script>\
                <script>\
                  function buscador(){\
                    var texto = document.getElementById("bar").value;\
                    if(document.getElementById("bar").value.length >= 3){\
                      var xhttp = new XMLHttpRequest();\
                      xhttp.onreadystatechange = function() {\
                        if (xhttp.readyState == 4 && xhttp.status == 200) {\
                          document.getElementById("bar").innerHTML = xhttp.responseText;\
                          var seleccionados = JSON.parse(xhttp.responseText);\
                          if(seleccionados.rec[0] != null){\
                            document.getElementById("subsection1").innerHTML = seleccionados.rec[0].name;\
                            document.getElementById("subsection2").innerHTML = seleccionados.rec[1].name;\
                            document.getElementById("subsection3").innerHTML = seleccionados.rec[2].name;\
                            document.getElementById("subsection4").innerHTML = seleccionados.rec[3].name;\
                          }else{\
                            document.getElementById("subsection1").innerHTML ="";\
                            document.getElementById("subsection2").innerHTML ="";\
                            document.getElementById("subsection3").innerHTML ="";\
                            document.getElementById("subsection4").innerHTML ="";\
                          }\
                        }\
                    };\
                    xhttp.open("POST", "./getstring", true);\
                    xhttp.setRequestHeader("Content-type", "text/plain");\
                    xhttp.send(texto);\
                    }\
                  }\
                  function liclick(valor){\
                    if(valor == 1){\
                      document.getElementById("bar").value = document.getElementById("subsection1").innerHTML;\
                    }\
                    if(valor == 2){\
                      document.getElementById("bar").value = document.getElementById("subsection2").innerHTML;\
                    }\
                    if(valor == 3){\
                      document.getElementById("bar").value = document.getElementById("subsection3").innerHTML;\
                    }\
                    if(valor == 4){\
                      document.getElementById("bar").value = document.getElementById("subsection4").innerHTML;\
                    }\
                  }\
                </script>\
              </head>\
              <body>\
              <!--Barra de navegación -->\
	              <header>\
                  <nav>\
                    <ul class = "menu">\
                      <li><a href ="shop.html">Introduction</a></li>\
                      <li><a href ="bikes.html">Bikes</a></li>\
                      <li><a href ="music.html">Music</a></li>\
                      <li><a href ="books.html">Books</a></li>\
                      <li><a href ="contactar.html">Contact</a></li>\
                      <li><a onclick="setcookie()"><span class="icon-cart">Cookie</span></a></li>\
                    </ul>\
                    <div class="search_bar">\
                      <li><input type="text" id = "bar" onkeydown="buscador()">\
                        <ul>\
                          <li id="subsection1" onclick="liclick(1)"></li>\
                          <li id="subsection2" onclick="liclick(2)"></li>\
                          <li id="subsection3" onclick="liclick(3)"></li>\
                          <li id="subsection4" onclick="liclick(4)"></li>\
                        </ul>\
                      </li>\
                    </div>\
                   </nav>\
                </header>\
                <div id= "intro">\
	                <p style="font-size:140%;"><b>We hope you could find anything you were looking for. Please, enjoy it!</b></p>\
                  <div id="box">\
		              <img src="bckg.jpg" align="center" alt="think" />\
	                </div>\
                </div>\
                <div id="shop">\
  		            <p style="font-size:140%;"><b>BMB: Here below you appreciate a brief summary of our stuff</b></p>\
                </div>\
                <!-- Imágenes -->\
                <div class="summary">\
  	              <img src="big.gif" align="center" alt="bikes" />\
                  <img src="music.jpg" align="center" alt="music" />\
   	              <img src="bog.gif" align="center" alt="books" />\
 	                <p style="color:white;"><b>Best bikes ever~/~Hard to find the best single~/~Ideal for books geeks </b></p>\
                </div>\
              </body>\
              </html>';
      if(request.headers.cookie ==null){
        var rand = Math.random();
        var cookie = setcookie(rand);
        response.writeHead(200, {
          'Set-Cookie': cookie,
          'Content-Type': 'text/html'
        });
        response.end(page);

      }else{
        response.writeHead(200,{'Content-Type': 'text/html'});
        response.end(page);
      }            


    }else if(filePath == './contactar.html'){

      form = '<!DOCTYPE html>\
              <html lang="es ES">\
              <head>\
	              <title>My first shop online</title>\
	              <meta charset="UTF-8">\
	              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\
	              <link rel="stylesheet" type="text/css" href="items_style.css">\
	              <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" type="text/css">\
                <link href= "https://fonts.googleapis.com/css?family=Source+Sans+Pro:200" rel="stylesheet" type="text/css">\
                <script src="http://code.jquery.com/jquery-latest.js"></script>\
                  <script type="text/javascript">\
                    function setcookie() {\
                      var x = document.cookie; \
                      window.alert(x);\
                    } \
                </script>\
                </head>\
                <body style="background-image: url(cont.jpg);background-repeat: no-repeat;font-family: Raleway, sans-serif">\
                <!--Barra de navegación -->\
	                <header>\
                    <nav>\
                      <ul class = "menu">\
                        <li><a href ="shop.html">Introduction</a></li>\
                        <li><a href ="bikes.html">Bikes</a></li>\
                        <li><a href ="music.html">Music</a></li>\
                        <li><a href ="books.html">Books</a></li>\
                        <li><a href ="contactar.html">Contact</a></li>\
                        <li><a onclick="setcookie()" href ="contactar.html"><span class="icon-cart"></span>Cookie</a></li>\
                      </ul>\
                      <div class="search_bar">\
                        <a href="#" class=""></a>\
                        <input type="text" id = "bar">\
                      </div>\
                    </nav>\
                  </header>\
                  <div id="title">\
                    <p style="font-size:140%;"><b>Contact</b></p>\
                  </div>\
                  <div id = "view_contact"> \
                    <h1>Please, fill the form</h1> \
                    <form name="myForm" action="" onsubmit="" method="post"> \
                      Color:<input type="color" name="color" value="#ff0000"><br></br> \
                      Date:<input type="date" name="fecha"><br></br> \
                      Dial-1:<input type="radio" name="dial" value="dial1"><br></br> \
                      Dial-2:<input type="radio" name="dial" value="dial2"><br></br> \
                      Numeric field:<input type="number" name="numerico"><br></br> \
                      Text 1:<input type="text" name="text1"><br></br> \
                      Text 2:<input type="text" name="text2"><br></br> \
                      <input type="submit" value="Registrarse"><br></br> \
                    </form> \
                  </div> \
                </body> \
                </html>';
      response.setHeader('Content-Type', 'text/html');
      response.writeHead(200);
      response.end(form);        

    }else{
      var extname = path.extname(filePath);
      var contentType = 'text/html';
      switch (extname) {
        case '.js':
          contentType = 'text/javascript';
          break;
        case '.css':
          contentType = 'text/css';
          break;
      }
      fs.exists(filePath, function(exists) {

        if (exists) {
          fs.readFile(filePath, function(error, content) {
            if (error) {
              response.writeHead(500);
              response.end();
            }else {  
              response.writeHead(200, { 'Content-Type': contentType });
              response.end(content, 'utf-8');
            }
          });  
        }else {
          response.writeHead(404);
          response.end();
        }

      });
    }
  }
  if(request.method == "POST"){
    // Depende de quien sea el que envía el POST.
      if(filePath == './getstring'){
      request.on('data', function(mydata) {
        var formdata = mydata.toString();
        //console.log(formdata);
      
        var string;
        var recommendations =JSON.parse('{"rec":[]}');
        var j = 1;
        for (var i = choices.length - 1; i >= 0; i--){
          string = choices[i];
          letters = string.substring(0, formdata.length);
          if (formdata == letters){
            recommendations.rec.push(
            {id: j, name: string}
            );
            j += 1;
          }
        }
        
        console.log("string '" + string + "' chosen");
        response.writeHead(200, {"Content-Type": "text/plain"});
        var myJSONText = JSON.stringify(recommendations);
        response.end(myJSONText);
        console.log("string sent");
        }); 
    }
    //Si es el Contactar:
    if(filePath == './contactar.html' ){
      
      request.on('data',function(mydata){
        var formdata = mydata.toString();
        console.log(formdata);

        var color = formdata.split("&")[0];
        color = color.split("=")[1];
        console.log(color);

        var fecha = formdata.split("&")[1];
        fecha = fecha.split("=")[1];
        console.log(fecha);
        var dial = formdata.split("&")[2];
        dial = dial.split("=")[1];
        console.log(dial);
        var numerico = formdata.split("&")[3];
        numerico = numerico.split("=")[1];
        console.log(numerico);
        var text1 = formdata.split("&")[4];
        text1 = text1.split("=")[1];
        console.log(text1);
        var text2 = formdata.split("&")[5];
        text2 = text2.split("=")[1];
        console.log(text2);
        form = '<!DOCTYPE html>\
                <html lang="es ES">\
                <head>\
	                <title>My first shop online</title>\
	                <meta charset="UTF-8">\
	                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\
	                <link rel="stylesheet" type="text/css" href="items_style.css">\
	                <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" type="text/css">\
                    <link href= "https://fonts.googleapis.com/css?family=Source+Sans+Pro:200" rel="stylesheet" type="text/css">\
                    <script src="http://code.jquery.com/jquery-latest.js"></script>\
                      <script type="text/javascript">\
                        function setcookie() {\
                            var x = document.cookie; \
                            window.alert(x);\
                      } \
                    </script>\
                </head>\
                <body style="background-image: url(cont.jpg);background-repeat: no-repeat;font-family: Raleway, sans-serif">\
                  <!--Barra de navegación -->\
	                <header>\
                    <nav>\
                      <ul class = "menu">\
                        <li><a href ="shop.html">Introduction</a></li>\
                        <li><a href ="bikes.html">Bikes</a></li>\
                        <li><a href ="music.html">Music</a></li>\
                        <li><a href ="books.html">Books</a></li>\
                        <li><a href ="contactar.html">Contact</a></li>\
                        <li><a onclick="setcookie()"><span class="icon-cart"></span></a></li>\
                      </ul>\
                      <div class="search_bar">\
                        <a href="#" class=""></a>\
                        <input type="text" id = "bar">\
                      </div>\
                    </nav>\
                  </header>\
                  <div id="title">\
                    <p style="font-size:140%;"><b>Contact</b></p>\
                  </div>\
                  <div id = "view_contact"> \
                    <h1>Your data has been received</h1> \
                    <img src="ok.png" width="60px" height="60px" > \
                    <form name="myForm" action="" onsubmit="" method="post"> \
                      Color:<input type="text" name="color" value="'+color+'"><br></br> \
                      Date:<input type="date" name="fecha" value="'+fecha+'"><br></br> \
                      Dial-1:<input type="text" name="dial1" value="'+dial+'"><br></br> \
                      Dial-2:<input type="text" name="dial2" value="'+dial+'"><br></br> \
                      Numeric field:<input type="number" name="numerico" value="'+numerico+'"><br></br> \
                      Text 1:<input type="text" name="text1" value="'+text1+'"><br></br> \
                      Text 2:<input type="text" name="text2" value="'+text2+'"><br></br> \
                    </form> \
                    <p>We will keep in contact with you for further information</p>\
                  </div> \
                </body> \
                </html>';

        response.setHeader('Content-Type', 'text/html');
        response.writeHead(200);
        response.end(form);
        });
    }
    //Si son o Bicicletas Discos libros
    if(filePath == './bikes.html' || filePath == './music.html' || filePath == './books.html'){
      
      var CookieFinal = request.headers.cookie;
      console.log(CookieFinal)

      form = '<!DOCTYPE html>\
              <html>\
              <head>\
                <title>My first shop online</title>\
                  <meta charset="UTF-8">\
                  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\
                  <link rel="stylesheet" type="text/css" href="items_style.css">\
                  <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" type="text/css">\
                  <link href= "https://fonts.googleapis.com/css?family=Source+Sans+Pro:200" rel="stylesheet" type="text/css">\
                  <script src="http://code.jquery.com/jquery-latest.js"></script>\
                  <script type="text/javascript">\
                    function setcookie() {\
                      var x = document.cookie; \
                      window.alert(x);\
                    } \
                  </script>\
              </head>\
              <body style="background-image: url(cont.jpg);background-repeat: no-repeat;font-family: Raleway, sans-serif">\
                <header>\
                  <nav>\
                    <ul class = "menu">\
                      <li><a href ="shop.html">Inicio</a></li>\
                      <li><a href ="bikes.html">Bicicletas</a></li>\
                      <li><a href ="music.html">Discos</a></li>\
                      <li><a href ="books.html">Libros</a></li>\
                      <li><a href ="contactar.html">Contact</a></li>\
                      <li><a onclick="setcookie()"><span class="icon-cart"></span></a></li>\
                    </ul>\
                    <div class="search_bar">\
                      <a href="#" class=""></a>\
                      <input type="text" id = "bar">\
                    </div>\
                  </nav>\
                </header>\
                <div id="title">\
                    <p style="font-size:140%;"><b>Contact</b></p>\
                  </div>\
                <div id = "view_contact"><br></br><br></br> \
                <img src="ok.png" width="60px" height="60px" > \
                  <form name="myForm" action="" onsubmit="" method="post"> \
                    <br></br> \
                       Compra Final:<input type="text" name="nombre" value="'+CookieFinal+'"><br></br> \
                  </form> \
                </div> \
                </body> \
                </html>';
        response.setHeader('Content-Type', 'text/html');
        response.writeHead(200);
        response.end(form);

    }

  }
 function setcookie(value) {
        var cookie_name = "usuario=";
        var cookie_name2 = " expires=Thu, 18 Dec 2016 12:00:00 UTC";
        return cookie_name+value+cookie_name2;
 }
}
http.createServer(onRequest).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');
