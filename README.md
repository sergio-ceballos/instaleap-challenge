## Preguntas

- ¿Cómo se obtienen los datos de las tiendas y pedidos? ¿Existe una base de datos o un servicio externo que los proporcione, o debo simularlos?
- ¿Cuál es el formato esperado de los datos de las tiendas? Por ejemplo, ¿qué tipo de estructura tienen las coordenadas (lat, long)?
- ¿Qué criterios definen que una tienda está abierta o cerrada? ¿Solo horarios o puedo asumir un estado constante?
- ¿Cómo se calcula nextDeliveryTime?¿Es un valor predefinido o se debe calcular en función de algún algoritmo?
- ¿Cómo se define "la tienda más cercana"? ¿Se usa el cálculo del tiempo de viaje, o hay otros factores a considerar?
- ¿Qué datos proporcionará el cliente en la request? ¿Incluyen solo coordenadas, o también otras preferencias como horario de entrega o tipos de productos?
- ¿Que tipo de autenticación es requerido para el endpoint? ¿Hay algún mecanismo de seguridad requerido, como jwt o algo similar?
- ¿Qué tipos de errores debo manejar y devolver? Por ejemplo, ¿qué pasa si no hay tiendas abiertas o si las coordenadas no son válidas?
- ¿El registro de las llamadas al endpoint debe persistirse en una base de datos? Si es así, ¿qué información debe almacenarse?
- ¿Cuántos usuarios simultáneos debo considerar al evaluar el rendimiento del endpoint? ¿O esto no es tan necesario?

## Respuestas

- Los datos de las tiendas están por tu cuenta.
- La estructura puedes definirla, esa que mencionas las veo bien.
- Puedes asumir un booleano abierto o cerrado.
- El parámetro nextDeliveryTime es un slot de entrega. Los slots por ejemplo se ven así: 8:00 a.m. a 8:59 a.m. y otro de 9:00 a.m. a 9:59 a.m.
- Puedes ir desde cálculo de distancia en línea recta, hasta tiempo de viaje.
- La entrada es una orden, esa orden ya debería tener una ubicación de entrega.
- Auth, manejo de errores y log van por tu cuenta. Me gustaria ver como lo manejas.
- Podrías contarnos cómo se comporta tu endpoint en distintos escenarios de carga.


---

El proyecto sigue una arquitectura por capas que promueve la separación de responsabilidades y facilita el mantenimiento. Todo parte de la carpeta src:

- routes      : Definición de rutas y endpoints.
- controllers : Manejo de validaciones de solicitudes y formateo de respuestas.
- services    : Lógica de negocio para calcular distancias y gestionar la caché.
- repositories: Guardado de la información en MongoDB y Redis.
- models      : Definición de modelos y tipos utilizados en la aplicación.
- middlewares : Validación con Joi, manejo de logs, errores, etc.
- utils       : Funciones auxiliares reutilizables (e.g., claves para caché).
- config      : Configuración centralizada (API keys, Redis, variables de entorno).


Estimo que la aplicación estaría lista de 4 a 5 días.


