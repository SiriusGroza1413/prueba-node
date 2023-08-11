#### Este archivo .md proporciona detalles acerca de los endpoints creados asi como de los resultados que devuelven.

# Nombre de endpoint: /order  
### Tipo de solicitud: GET  
Detalle de la solicitud: Esta solicitud al endpoint mencionado devuelve todas las ordenes de la base de datos de forma  
 detallada, en caso de que no exista ninguna orden en la BD se devolvera un mensaje indicandolo.  
Informacion enviada el servidor: N/A

JSON devuelto por el servidor:

```
[
  {
    "_id": String (ID de la orden),
    "type": String (Tipo de orden),
    "description": String (Descripcion de la orden),
    "route": {
      "pickup": {
        "location": {
          "name": String (Nombre de la localizacion),
          "placeId": String (ID de la localizacion)
        },
        "_id": String (ID del punto de ruta)
      },
      "dropoff": {
        "location": {
          "name": String (Nombre de la localizacion),
          "placeId": String (ID de la localizacion)
        },
        "_id": String (ID del punto de ruta)
      },
      "distance": Number (Distancia entre el punto "pickup" y "dropoff")
      "_id": String (ID de la ruta)
    },
    "status": Enum[String] (En espera - En progreso - Cancelado - Completado),
    "truck": {
      "_id": String (ID del camión),
      "model": String (Modelo),
      "make": String (Fabricante),
      "year": Number (año),
      "color": String (color),
      "transportWeight": Number (Peso del transporte),
    },
  }
]
```


# Nombre de endpoint: /order  
### Tipo de solicitud: POST  
Detalle de la solicitud: Esta solicitud al endpoint mencionado crea una nueva orden, asi como los puntos y la ruta.   
Informacion enviada el servidor: BODY  

### Parametros a enviar por BODY:

 (*) Indica que el parametro a enviar es obligatorio

- Type: String*
- Description String*
- TruckId: String*
- routeData: Object*
- pickup: Object* (Propiedad de routeData)
- dropoff: Object* (Propiedad de routeData)
- name: String* (propiedad del objeto pickup y dropoff)
- locationId: String* (propiedad del objeto pickup y dropoff)  
  
Ejemplo:
```
{
  "type": "Un tipo",
  "description": "Una descripción",
  "truckId": "647e7f2708f76ab0e20a6c98",
  "routeData": {
    "pickup": {
      "name": "Yosemite, CA",
      "placeId": "FW142584"
    },
    "dropoff": {
      "name": "Yellowstone, WY",
      "placeId": "TFW181818"
    }
  }
}

```

# Nombre de endpoint: /order/:idorden
### Tipo de solicitud: PUT
Detalle de la solicitud: Esta solicitud modifica una order existente (pasando su respectivo ID por Query).  
En caso de que la order que quiera ser modificada se encuentre con su estatus "En progreso" no se podrá  
modificar la misma y se devolvera un mensaje al respecto

### Parametros a enviar por QUERY:

ID de una orden válida  
Ejemplo: http/localhost/3000/order/2347eu3jjj234k34


### Parametros a enviar por BODY:

(*) Indica que el parametro a enviar es obligatorio


- Type: String
- Description String
- TruckId: String
- routeData: Object
- pickup: Object (Propiedad de routeData) * solo si se envia un routeData
- dropoff: Object (Propiedad de routeData) * solo si se envia un routeData
- name: String* (propiedad del objeto pickup y dropoff) * solo si se envia un pickup & point dentro de routeData
- locationId: String* (propiedad del objeto pickup y dropoff) * solo si se envia un pickup & point dentro de routeData

Ejemplo en caso de no querer cambiar la ruta:
```
{
  "type": "Otra orden",
  "description": "Otra descripcion",
  "truckId": "647e7f2708f76ab0e20a6c98",
}
```
Ejemplo en caso de asignar una nueva ruta sin cambiar la descripcion:

```
{
  "type": "Un tipo",
  "truckId": "647e7f2708f76ab0e20a6c98",
  "routeData": {
    "pickup": {
      "name": "Paris, Fr",
      "placeId": "P3774"
    },
    "dropoff": {
      "name": "Le Mans, Fr",
      "placeId": "LeMa24"
    }
  }
}

```

# Nombre de endpoint: /order/:idorder 
### Tipo de solicitud: DELETE
Detalle de la solicitud: Esta solicitud del tipo DELETE borra el registro de una orden completa de la base de datos.  
En caso de que el ID proporcionado por query sea de una orden en curso no se podra eliminar.
Este endpoint devuelve un mensaje indicando si la operacion fue exitosa o no.


# Nombre de endpoint: /route  
### Tipo de solicitud: GET  
Detalle de la solicitud: Esta solicitud devuelve todas las rutas creadas en la base de datos, en caso de no encontrarlas  
devuelve un mensaje especifico

Ejemplo de respuesta:

```
[
  {
    "_id": "64aef450b9a0d3d0fc7dcad6",
    "pickup": {
      "location": {
        "name": "Yosemite, CA",
        "placeId": "FW"
      },
      "_id": "64aef450b9a0d3d0fc7dcad2",
    },
    "dropoff": {
      "location": {
        "name": "Yellowstone, WY",
        "placeId": "TFW"
      },
      "_id": "64aef450b9a0d3d0fc7dcad4",
    },
    "distance": 2,
  },
]
```

# Nombre de endpoint: /route/:idroute
### Tipo de solicitud: DELETE
Detalle de la solicitud: Esta solicitud se encarga de borrar una ruta especificada por su id pasado por query  
(no borra los puntos que se crearon en la ruta, estos se mantienen como documentos separados en su coleccion)
En caso se que la ruta se encuentre asignada a una orden con su status "En progreso" no se eliminara la orden y  
devolverá un mensaje especifico.
   
  



