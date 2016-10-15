/* ESTE CÓDIGO ESTÁ SITUADO EN EL HEAD DE HTML, EN LA SECCIÓN SCRIPTS */
/* Using an XMLHttpRequest Object:
      So, now that we have an XMLHttpRequest object created, what do we do with it? We use it to make HTTP requests. 
      To do so, we initialize the object with the open() method, which takes three arguments.

          XMLHttpRequest open() Method Arguments
          Argument  Description
          Request Type  String. Usually POST, GET, or HEAD
          URL String. The URL receiving the request.
          Asynchronous  Boolean. Whether the request should be made asynchronously (true) or synchronously (false).
          A typical open() method call is shown below.

          xmlhttp.open("GET","Demo.xml",true);

          GET:
    The GET method is used to send information to the server as part of the URL. The server returns the same header 
    information that the HEAD method returns, but it also returns the body of the message (i.e, the content of the page). 
    Any name-value pairs to be processed by the receiving page should be passed along the querystring. The call would look 
    like this:
              xmlhttp.open("GET","Demo?FirstName=Nat&LastName=Dunn",true);
              The response would be the same as the response shown for the HEAD method followed by the message body, 
              which would typically be simple text, JSON, HTML or XML.Again, the XMLHttpRequest request is sent as follows:
                                              xmlhttp.send(null);
          POST
    The POST method is used to send information as an enclosed entity. The call would look like this:
              xmlhttp.open("POST","Demo",true);
              The response header is somewhat different in that it specifies that the returned content is not cacheable. 
              Like with GET, the message body would typically be plain text, HTML or XML.
              The XMLHttpRequest request is sent as follows:
                        xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
                        xmlhttp.send("FirstName=Nat&LastName=Dunn");
    As you can see, with POST, we first need to set the content type to "application/x-www-form-urlencoded;charset=UTF-8". 
    This tells the server to expect form data. In the send method, we include name-value pairs. These name-value pairs are 
    available to the receiving page for processing.

Data can be sent in this manner with the HEAD and GET methods, which is why null was passed in the previous examples.

                                    Asynchronous vs. Synchronous Requests
The asynchronous argument should almost always be set to true. After all, that's the "A" in Ajax.
 Synchronous calls force the browser to wait for a response from the server before continuing. This leaves the user 
 unable to interact with the browser until the response is complete. Asynchronous requests allow the browser to continue to
process code while waiting for a response.
 */

 /*                                           Handling the Response
When using asynchronous calls, we cannot be sure when the response will come, so we must write code that waits for the 
response and handles it when it arrives. We do this with a callback function. Callback functions are functions that are 
triggered by some event. In our case, the event we are looking for is a change in the state of the xmlhttp response.

The xmlhttp object's readyState property holds the current state of the response. There are five possible states (0-4), 
which are described below. Browsers do not necessarily inform you of all states; states 0 and 3 in particular may not 
appear when you run the demo file.

Values of the readyState Property
State Description
0 uninitialized
1 loading
2 loaded
3 interactive
4 complete
Each change in the readyState is captured by the xmlhttp object's onreadystatechange event handler. We can assign a 
callback function to this property like this:

xmlhttp.onreadystatechange = function() { //Do something here }
This use of an anonymous or unnamed function may be new to you. In JavaScript, functions are first-class objects and can 
be assigned to variables or properties of other objects. We could also create a named function and assign that function to
 xmlhttp.onreadystatechange like this:
                                      xmlhttp.onreadystatechange = handler;


In practice, before doing anything with the xmlhttp response data, we want to make sure the readyState is complete (4), 
so we put a condition inside our function to check for this:
                        xmlhttp.onreadystatechange=function() { if (xmlhttp.readyState==4) { //Do something here } }
Now we're ready to do something with the data returned. Before looking at an example, let's take a look at the properties 
and methods of the xmlhttp object, so we know what's available to us.
                        XMLHttpRequest Object Properties
                          Property  Description
                          onreadystatechange  Specifies the callback function to be triggered when the ready state changes.
                          readyState  Holds the state of the response.
                          responseText  Holds the message body as a string.
                          responseXML Holds the message body as an XML object.
                          status  Holds the status code returned from the server (e.g, 200 for success, 404 for page not 
                                  found, etc.).
                          statusText  Holds the status text returned from the server.

                        XMLHttpRequest Object Methods
                          Method  Description
                          abort() Aborts the xmlhttp request.
                          getAllResponseHeaders() Retrieves the values of all the HTTP headers as a string.
                          getResponseHeader(header) Retrieves the value of the specified HTTP header as a string.
                          open(Method,URL,Async)  Initializes the XMLHttpRequest object.
                          send(postData)  Sends the HTTP request to the server.
                          setRequestHeader(header,value)  Specifies the name and value of an HTTP header.
A common application is to check the status property to make sure that the request was successful (200) and then to output the message body to a div on the HTML page. The following sample file demonstrates this. To run the demo, first start the Node.js server:
 */
<script>\
  function buscador(){\
    var texto = document.getElementById("bar").value;\ /* VALUE ES LO QUE ESCRIBIMOS */
      if(document.getElementById("bar").value.length >= 3){\
        var xhttp = new XMLHttpRequest();\
        /* CUANDO EL ESTADO CAMBIE, SE EJECUTARÁ FUNCTION() */
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