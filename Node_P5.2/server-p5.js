var http = require('http');
var fs = require('fs');
var path = require('path');
var primeraEntrada = true;
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
  if(request.method == "POST"){
    // Depende de quien sea el que envía el POST.

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
  }
}
http.createServer(onRequest).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');