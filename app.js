//Se utiliza const ya que lo que va a guardar es de un tamaño fijo
const http = require('http');
//El require jala el codigo al archivo de js
const fs = require('fs');
const log4js = require('log4js')

const logger = log4js.getLogger();
logger.level = 'debug';
/*
Diferentes maneras de declarar una funcion anonima en JS.
Las funciones anónimas dentro de funciones en JS se utilizan asi como el
polimorfismo en JAVA.

let server = function(){};
http.createServer(server){};

http.createServer(function(){});
*/

/* Como estamos creando un servidor se pasan las variables request y response ya
que esas son las acciones que puede realizar minimamente el servidor */

/* Con el readFileSync el archivo que se lee se hace sincrono
   let file = fs.readFileSync("./index.html");
*/

http.createServer((request, response)=>{
  /* Con el readFile el archivo que se lee se hace asincrono.
  Todos los callbacks son funciones anonimas pero no todas las funciones
  anonimas son callbacks */
  fs.readFile('./index.html', (err, html)=>{
    logger.info('Conexion a la aplicación');
    if(err){
      logger.warn('404 - Not Found');
      //Para poder mandar el tipo de error http
      response.writeHead(404, {'Content-Type':'text/html'});
      response.write('404 - Not Found');
      response.end();
    }else {
      logger.info('200 - OK');
    //Comienza a escribir la petición
    response.write(html);
    //Hace que la conexion se corte
    response.end();
    }
});

  //El .listen espera a recibir en que puerto va a correr la petición.
}).listen(4000);
