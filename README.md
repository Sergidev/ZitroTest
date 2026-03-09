#Splash

He implementado ua aimación propia para el logo y una carga de laoding de 5 segundos, y automáticamente carga la escena Menu, como mandaba el requisito.

#Menu

En esta escena un simple manager tiene referencias de dos botones para cambiar a las escenas Quiz y Slots.

#Quiz

He implementado un quiz de Pokémon utilizando un archivo JSON, he implementado los controladores de las respuestas y las preguntas por separado, modularizándolo todo lo posible, para que sea fácil de implementar varios quizs diferentes o en otras escenas.

#Slots

He implementado una arquitectura basada en datos inmutables en la clase SlotData, utilizando copias volátiles para cada columna de slots, que se setean random al incio. Cada columna tiene 5 posiciones y 5 figuras, que irán moviéndose hacia la siguiente posición, y volviendo a la primera cuando lleguen al final. La máquina de slots es de 3x3 pero hay 5 figuras, ya que es lo mínimo para poder hacer el efecto de spinning (necesitaba una posición por encima y otra por debajo de las 3 figuras visibles en cada columna de slots). 

La lógica de spinning es completamente asíncrona, permitiendo un control preciso de los intervalos de spin (random de entre 3 y 5 segundos) y 2 segundos entre columna y columna. Esta implementación garantiza que los resultados sean totalmente aleatorios, pero es mucho delay para testear bien cuando sale un premio, yo recomiendo bajar a la mitad o incluso más estos delays de tiempo para poder testear y ver los efectos sin frustrarse.

Finalmente, he añadido eventos para sincronizar la parada de los spins y validar la línea de premio central una vez detenido el movimiento. También desactivo los botones de Spin y Menu mientras los slots estén girando, para evitar errores.

#Extras

Para facilitar el desarrollo de esta prueba en concreato, he creado un manager en cada escena para la navegación e interacción de los botones y he implementado los requisitos y/o particularidades de cada feature por separado, favoreciendo la simplicidad, el bajo acoplamiento y escalabilidad del código. He creado un AudioManager y un TransitionManager singletons persistentes entre escenas para poder transicionar de manera smooth entre escenas y reproducir sonidos en cualquiera de ellas. No era un requisito, pero me ha parecido interesante implementarlos.
