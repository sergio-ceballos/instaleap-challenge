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

## Arquitectura

El proyecto sigue una arquitectura por capas que promueve la separación de responsabilidades y facilita el mantenimiento. Todo parte de la carpeta src:

- routes      : Definición de rutas y endpoints.
- controllers : Manejo de validaciones de solicitudes y formateo de respuestas.
- services    : Lógica de negocio para calcular distancias y gestionar la caché.
- repositories: Guardado de la información en MongoDB y Redis.
- models      : Definición de modelos y tipos utilizados en la aplicación.
- middlewares : Validación con Joi, manejo de logs, errores, etc.
- utils       : Funciones auxiliares reutilizables (e.g., claves para caché).
- config      : Configuración centralizada (API keys, Redis, variables de entorno).

---

## Estimación

Estimo que la aplicación estaría lista de 4 a 5 días.

---

## Mejoras

- ¿Qué mejorarías de tu código? ¿por qué?

Me hubiera gustado agregar test de integración porque en mi opinión siempre es bueno tener testeados flujos enteros en los procesos mas claves. También haber podido conectar los logs a una herramienta en la nube ya que estas están enfocadas en este tipo de tareas como Datadog o New Relic. Por último me hubiera gustado poder desplegar los contenedores en un cloud como AWS usando su servicio ECS o Fargate.

- ¿Qué compromisos harías para cumplir con el tiempo? ¿Qué harías la próxima vez para entregar más y sacrificar menos?

Codificar horas extra si es necesario para cumplir con el objetivo. La próxima vez creo que haría una estructura del proyecto un poco mas visual, antes de empezar a codificar, en cuanto a componentes externos (mongo, redis, docker, aws, etc) como internos (estructura de carpetas).

- ¿Crees que tu aplicación es segura? ¿por qué?

Si me parece una aplicación segura ya que implementé json web tokens para proteger los endpoints, también evité el uso de consultas harcodeadas para evitar inyección SQL, aunque si bien lo hice con mongodb y mongoose, en caso de haber escogido una base de datos relacional lo hubiera hecho con algun ORM como Sequelize o Prisma. Además agregué una capa de validación extra en los parametros de entrada (bien sea por params o body) de las request a los endpoints usando joi, evitando asi cualquier error no esperado.

- ¿Qué harías para medir el comportamiento de tu producto en un entorno de producción?

Primero implementaría herramientas de monitoreo para rastrear métricas clave como rendimiento, errores y uso de recursos. También me aseguraría de centralizar logs para analizar eventos importantes y configuraría alertas que me notifiquen de posibles problemas. Por último, usaría herramientas para analizar cómo interactúan los usuarios con el sistema y realizaría ajustes con base en esa información.

