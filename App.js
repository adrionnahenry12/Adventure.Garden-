import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  Modal,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GMG_PAGES = [
  {
    image: require('./assets/books/gmg/page-1.jpg'),
    text: `Grandma's Magic Garden
The Secret Garden Guardians
Written by Adrionna Henry`,
  },
  {
    image: require('./assets/books/gmg/page-2.jpg'),
    text: `Copyright
Grandma's Magic Garden: The Secret Garden Guardians
Copyright © 2026 Adrionna Henry. All rights reserved.
First Edition
This story introduces nature, herbs, flowers, and fungi for educational purposes.
Children should never eat, pick, touch, or use unknown plants or mushrooms without
the guidance of a trusted, knowledgeable adult.`,
  },
  {
    image: require('./assets/books/gmg/page-3.jpg'),
    text: `Dedication
For every little explorer with a curious heart, a growing mind,
and a love for the world around them.`,
  },
  {
    image: require('./assets/books/gmg/page-4.jpg'),
    text: `Meet the Garden Explorers
Milo and Jay are spending the summer with Grandma.
Behind her house is a garden full of surprises - and a tiny
red-and-gold guide named Luma.
Their adventure is about to begin!`,
  },
  {
    image: require('./assets/books/gmg/page-5.jpg'),
    text: `The Road to Grandma's
“Are we there yet?” asked Milo.
“Not yet!” said Jay.
Outside were tall trees, tiny streams, and a forest full of secrets.
Grandma lived where the woods seemed to whisper.
This summer, the boys were about to discover why.`,
  },
  {
    image: require('./assets/books/gmg/page-6.jpg'),
    text: `The Garden Gate
Grandma hugged Milo and Jay. “Welcome, my little explorers!”
Behind her house, they found a tiny green gate.
They pushed it open.
WHOOSH!
Something magical was waiting on the other side.`,
  },
  {
    image: require('./assets/books/gmg/page-7.jpg'),
    text: `A Tiny Friend Appears
A red-and-gold ladybug landed on Milo’s finger.
“Hello! I’m Luma,” she said. “Come see the secrets of the garden!”
The boys stared.
A talking ladybug?
This garden really was magical!`,
  },
  {
    image: require('./assets/books/gmg/page-8.jpg'),
    text: `Dandelion Wishes
Luma flew toward a sunny patch of dandelions.
“Aren’t those weeds?” Milo asked.
“Look closer,” said Luma.
A bee buzzed from flower to flower.
“Even little flowers can help feed pollinators.”
Jay smiled. “Can I make a wish?”
“Of course! But caring for nature is magic you can really do.”`,
  },
  {
    image: require('./assets/books/gmg/page-9.jpg'),
    text: `The Flower Path
Next came a path filled with colorful flowers.
Some smelled sweet. Some swayed softly in the breeze.
“Plants can be special,” said Luma, “but Garden Explorers never taste or touch unknown
plants without a trusted grown-up.”
Milo and Jay nodded.
They would look, learn, and stay safe.`,
  },
  {
    image: require('./assets/books/gmg/page-10.jpg'),
    text: `The Mushroom Circle
Under an old tree, the boys found a circle of mushrooms.
“Whoa!” said Jay. “Can we eat them?”
“No!” said Luma. “In the wild, we look - we do not taste.”
She explained that fungi help break down old leaves and return nutrients to the soil.
“Mushrooms are nature’s cleanup crew!” Milo said.`,
  },
  {
    image: require('./assets/books/gmg/page-11.jpg'),
    text: `Garden Helpers
Buzz! Flutter! Wiggle!
The garden was busy.
Bees visited flowers. Worms moved through the soil. Birds carried seeds. A spider hurried
across her web.
“Everybody has a job,” said Luma.
Milo smiled. “The whole garden is a team!”`,
  },
  {
    image: require('./assets/books/gmg/page-12.jpg'),
    text: `Garden Trouble
One part of the garden was dry and droopy.
“I’ll fix it!” said Milo.
“Me too!” said Jay.
“Wait,” said Luma. “Good Garden Guardians work together.”`,
  },
  {
    image: require('./assets/books/gmg/page-13.jpg'),
    text: `Working Together
The boys checked the soil and found the broken watering hose.
Then they worked side by side, carefully helping with Grandma nearby.
Little by little, the thirsty plants perked up.
Soon, the garden looked happier.`,
  },
  {
    image: require('./assets/books/gmg/page-14.jpg'),
    text: `The Garden's Magic
As the sun began to set, Luma glowed.
“Do you know the garden’s greatest magic?”
“Fairy dust?” Milo guessed.
“Magic soil?” Jay asked.
Luma laughed. “Teamwork!”
Flowers, animals, water, soil, and people all helped one another.
“Everything is connected,” Milo whispered.`,
  },
  {
    image: require('./assets/books/gmg/page-15.jpg'),
    text: `Garden Guardians
Luma smiled at the boys.
“You came here as explorers,” she said. “Now you know how to care for the garden.”
Milo and Jay stood proudly together.
They were Garden Guardians!`,
  },
  {
    image: require('./assets/books/gmg/page-16.jpg'),
    text: `The Promise
Back at Grandma’s house, she wrapped the boys in a big hug.
“What did you learn?” she asked.
“A garden is more than flowers,” said Milo.
“Every creature has an important job,” said Jay.
Together they promised:
“Be curious. Be careful. Be kind to nature!”`,
  },
  { image: require('./assets/books/gmg/page-17.jpg'), text: '' },
  { image: require('./assets/books/gmg/page-18.jpg'), text: '' },
  { image: require('./assets/books/gmg/page-19.jpg'), text: '' },
  { image: require('./assets/books/gmg/page-20.jpg'), text: '' },
  { image: require('./assets/books/gmg/page-21.jpg'), text: '' },
  {
    image: require('./assets/books/gmg/page-22.jpg'),
    text: `Draw Your Own Magic Garden
What would grow in your magic garden?`,
  },
  {
    image: require('./assets/books/gmg/page-23.jpg'),
    text: `Garden Guardian Certificate
This certifies that
________________________________
has learned to be curious, careful, and kind to nature.
Signed: ________________________________`,
  },
  {
    image: require('./assets/books/gmg/page-24.jpg'),
    text: `Keep Exploring!
Look closely.
Ask questions.
Help living things.
And always explore nature with a trusted grown-up.
The garden has more secrets waiting for you.`,
  },
];

const CWD_PAGES = [
  {
    image: require('./assets/books/cwd/page-1.jpg'),
    text: `Camping with Dad
By Adrionna Henry
A wildlife adventure about family, discovery,
and respecting the great outdoors.`,
  },
  {
    image: require('./assets/books/cwd/page-2.jpg'),
    text: `Copyright
Camping with Dad
Copyright © 2026 Adrionna Henry
All rights reserved.
First edition.
Printed through Amazon KDP.`,
  },
  {
    image: require('./assets/books/cwd/page-3.jpg'),
    text: `This Book Belongs To
__________________________________
Adventure awaits!`,
  },
  {
    image: require('./assets/books/cwd/page-4.jpg'),
    text: `For Little Explorers
For every child who loves adventure,
and every dad who makes the journey special.`,
  },
  {
    image: require('./assets/books/cwd/page-5.jpg'),
    text: '“Wake up, explorers!” Dad called. Jordan jumped out of bed. Amir grabbed his backpack. Today was their very first camping trip! “Are we really sleeping in the woods?” Amir asked. Dad grinned. “Under the stars!” The boys cheered. Their adventure was about to begin.',
  },
  {
    image: require('./assets/books/cwd/page-6.jpg'),
    text: 'Into the Woods. The car rolled past tall trees, rocky hills, and sparkling streams. Jordan pressed his face against the window. “Look! A deer!” Dad slowed down. “Remember, boys. The forest is their home. We’re the visitors.” Amir smiled. “Then we’ll be good guests.”',
  },
  {
    image: require('./assets/books/cwd/page-7.jpg'),
    text: 'Setting Up Camp. They arrived at the campsite just right. Tall trees, fresh air, and a stream nearby. “Let’s set up our home for the night,” Dad said. They worked together to put up the tent. Uh-oh! The tent fell over and landed on Amir! “Hahaha! I’m okay!” Amir laughed. They all laughed and tried again. This time, the tent stood tall! “Teamwork makes the dream work!” Dad high-fived the boys.',
  },
  {
    image: require('./assets/books/cwd/page-8.jpg'),
    text: 'Tracks in the Mud. After lunch, Dad said, “Let’s explore!” They followed a trail through the trees. The ground was soft from last night’s rain. Jordan spotted something. “Look! Bunny tracks!” Tiny footprints in the mud led down the path. They followed the tracks quietly and there he was! A little rabbit, sitting still in the sunshine. “He’s so cute!” Amir whispered. They watched for a while, then waved goodbye.',
  },
  {
    image: require('./assets/books/cwd/page-9.jpg'),
    text: 'The Forest Is Talking. Dad held up a hand. “Shhh… let’s listen.” The boys quieted down. The woods were alive with sounds! “Tap, tap, tap!” said the woodpecker. “Tweet, tweet!” sang the birds. “Shhhhhh…” whispered the leaves in the breeze. Nature has so many ways of talking to us. “All we have to do is listen.” Dad smiled.',
  },
  {
    image: require('./assets/books/cwd/page-10.jpg'),
    text: 'Look, Don’t Touch. As they walked quietly, Jordan spotted something between the trees. “Look! A deer!” Amir gasped. The deer lifted its head and looked their way. Dad gently said, “We look with our eyes, not our hands. Wild animals need their space to feel safe.” The boys nodded. They watched the deer for a little while, then let it go back to its day.',
  },
  {
    image: require('./assets/books/cwd/page-11.jpg'),
    text: 'A Little Wildlife Detective. Jordan found a feather soft as a cloud. “Whose could this be?” Amir spotted tiny marks on a tree. “Maybe a squirrel climbed here!” Dad showed them a print in the dirt. “Looks like a raccoon. He was here last night!” The boys were having so much fun being wildlife detectives! Nature leaves clues everywhere! You just have to look.',
  },
  {
    image: require('./assets/books/cwd/page-12.jpg'),
    text: 'Stay on the Trail. A bright butterfly danced near some pretty flowers. Amir took a step toward it. “I want to catch it!” Dad gently stopped him. “Let’s look with our eyes, not our hands.” He pointed to the trail. “When we stay on the trail, we protect tiny plants, insects, and animals who live here.” Amir smiled and held back. The butterfly flew free, and so did the adventure!',
  },
  {
    image: require('./assets/books/cwd/page-13.jpg'),
    text: 'Campfire Dinner. After a big day of exploring, it was time for campfire dinner. Dad cooked hot dogs and veggies in foil packets. The boys roasted marshmallows until they were gooey and golden brown. “Mmm… this is the best!” Jordan grinned. Amir’s marshmallow stayed on the stick a little too long. “Uh-oh!” It turned black like a little piece of charcoal! “It’s not burned, it’s extra crispy!” Amir laughed. The best meals are the ones shared with the people you love.',
  },
  {
    image: require('./assets/books/cwd/page-14.jpg'),
    text: 'Who Goes Hooo? As the fire died down, the woods became quiet and cool. The stars peeked out one by one. Suddenly, Amir tilted his head. “Hoooo! Hoooo!” What was that? It came again, from deep in the trees. Jordan whispered, “It’s an owl!” They stayed very still and listened. Then there he was! A big, brown owl perched on a branch, watching them with wise, round eyes. The night has its own magic, if you’re quiet enough to hear it.',
  },
  {
    image: require('./assets/books/cwd/page-15.jpg'),
    text: 'Eyes in the Darkness. As the night grew quiet, Jordan spotted something shiny near the bushes. “Dad, look! What’s that?” Two little eyes reflected in the dark. Dad crouched down and put a gentle hand on Jordan’s shoulder. “That’s an animal, son. Some animals see much better at night. Let’s give it space and let it do its thing.” So the boys stayed close to Dad and backed away quietly. They left the animal in peace. “We didn’t scare it!” Amir whispered. “That’s what good explorers do.” Dad smiled.',
  },
  {
    image: require('./assets/books/cwd/page-16.jpg'),
    text: 'A Sky Full of Stars. Later, Dad spread out a blanket outside the tent. The boys lay down beside him and looked up. Thousands of stars twinkled like tiny lights. “Wow… look at all of them!” Jordan said. “It’s like the whole sky is showing off!” Amir giggled. Dad pointed to the sky. “Those stars have been shining long before us… and they’ll keep shining long after us too.” He smiled. “I love camping with you, Dad.” The boys said together. “And I love adventuring with you.” Dad whispered. They stayed there a long time, just talking, dreaming, and watching the stars.',
  },
  {
    image: require('./assets/books/cwd/page-17.jpg'),
    text: 'Leave No Mess Behind. The next morning, Dad had one last lesson for the boys. “We take care of nature, so nature can keep taking care of us.” Jordan and Amir got to work. They picked up every piece of trash, put it in the bag, and made sure their campsite was cleaner than they found it. “We don’t just visit the outdoors,” Dad said. “We protect it.” The boys high-fived. Team Clean Camp was the best team!',
  },
  {
    image: require('./assets/books/cwd/page-18.jpg'),
    text: 'Until Next Time. As they rode down the road, the boys were tired, but their hearts were full. “I saw a deer, an owl, and a raccoon!” Amir said. “And I learned so many cool things!” Jordan added. Dad smiled. “The best adventures teach us something… and bring us closer together.” Jordan looked out the window. “When can we come back?” he asked. “Sooner than you think,” Dad promised. “Some places just feel like home.” Every trip, every lesson, every moment together… that’s what makes real adventures unforgettable.',
  },
  {
    image: require('./assets/books/cwd/page-19.jpg'),
    text: `What Did We Discover?
Animal tracks can tell us who passed by.
Birds and leaves make the forest feel alive.
Wild animals need space - look, don't touch.
Stay on the trail and leave nature where you found it.`,
  },
  {
    image: require('./assets/books/cwd/page-20.jpg'),
    text: `Jordan & Amir's Explorer Rules
1. Stay close to a grown-up.
2. Respect wildlife.
3. Keep the campsite clean.
4. Listen, look, and learn.
5. Take only pictures and leave only footprints.`,
  },
  {
    image: require('./assets/books/cwd/page-21.jpg'),
    text: `My Camping Adventure
Draw your favorite animal or outdoor discovery here!
____________________________________________
____________________________________________
____________________________________________`,
  },
  {
    image: require('./assets/books/cwd/page-22.jpg'),
    text: `What Can You Hear?
Next time you're outside, stop and listen.
Can you hear birds? Wind? Leaves? Water?
The outdoors has its own music.`,
  },
  {
    image: require('./assets/books/cwd/page-23.jpg'),
    text: `Keep Exploring
Be curious. Be kind. Respect nature.
Every adventure can teach us something.`,
  },
  {
    image: require('./assets/books/cwd/page-24.jpg'),
    text: `About the Author
Adrionna Henry writes children's stories
about family, imagination, learning, and adventure.
Thank you for reading Camping with Dad!`,
  },
];

const BFTA_PAGES = [
  {
    image: require('./assets/books/bfta/page-1.jpg'),
    text: 'Kani and Anias loved big trucks. Dump trucks, garbage trucks, and delivery trucks were cool. But their favorite truck of all was the big red fire truck!',
  },
  {
    image: require('./assets/books/bfta/page-2.jpg'),
    text: 'One sunny morning, Kani and Anias heard a sound coming down the street. WEE-OOO! WEE-OOO! “Look!” shouted Kani. “A fire truck!”',
  },
  {
    image: require('./assets/books/bfta/page-3.jpg'),
    text: 'The shiny red truck rolled toward the neighborhood fire station. Its lights flashed bright red. Its giant wheels rumbled along the road.',
  },
  {
    image: require('./assets/books/bfta/page-4.jpg'),
    text: 'Kani and Anias hurried over with their grown-up to take a closer look. Outside the station stood Firefighter Maya. “Welcome! Would you like to learn about our fire truck?” “Yes!” Kani and Anias shouted together.',
  },
  {
    image: require('./assets/books/bfta/page-5.jpg'),
    text: 'Firefighter Maya showed them the long water hose. “This hose helps us spray water on fires,” she explained.',
  },
  {
    image: require('./assets/books/bfta/page-6.jpg'),
    text: 'Next, she showed them a firefighter helmet, heavy coat, gloves, boots, and an air tank. “Firefighters wear special equipment to keep us safe,” she said.',
  },
  {
    image: require('./assets/books/bfta/page-7.jpg'),
    text: 'Anias pointed toward a tall ladder on top of the truck. “What’s that for?” “That ladder helps us reach high places.”',
  },
  {
    image: require('./assets/books/bfta/page-8.jpg'),
    text: 'Just then—BEEP! BEEP! BEEP! An alarm rang inside the station. The firefighters quickly grabbed their gear.',
  },
  {
    image: require('./assets/books/bfta/page-9.jpg'),
    text: '“There’s an emergency!” said Firefighter Maya. Kani and Anias watched from a safe place as the firefighters climbed aboard.',
  },
  {
    image: require('./assets/books/bfta/page-10.jpg'),
    text: 'VROOM! The big red fire truck rolled away.',
  },
  {
    image: require('./assets/books/bfta/page-11.jpg'),
    text: 'Later that afternoon, the fire truck returned. Firefighter Maya had good news. “We helped a family whose smoke alarm went off,” she told them. “Everyone got outside safely.”',
  },
  {
    image: require('./assets/books/bfta/page-12.jpg'),
    text: 'Kani’s eyes grew wide. “What should we do if we hear a smoke alarm?” “Great question,” said Firefighter Maya. “First, stay calm. Get outside quickly with your family. Never hide during a fire, and never go back inside for toys.”',
  },
  {
    image: require('./assets/books/bfta/page-13.jpg'),
    text: 'Kani stopped. Anias dropped. Then both of them rolled across the grass. Everyone laughed. “You’ve got it!” said Firefighter Maya.',
  },
  {
    image: require('./assets/books/bfta/page-14.jpg'),
    text: 'Before leaving, Kani and Anias got one more surprise. They were allowed to sit inside the parked fire truck. “Whoa!” said Kani. “There are so many buttons!” said Anias.',
  },
  {
    image: require('./assets/books/bfta/page-15.jpg'),
    text: 'Firefighter Maya laughed. “Every tool has an important job. Firefighters help during fires, accidents, rescues, and many other emergencies.” Kani looked around the giant truck. “Firefighters are helpers.” “They sure are,” said Firefighter Maya.',
  },
  {
    image: require('./assets/books/bfta/page-16.jpg'),
    text: 'As the sun began to set, Kani and Anias waved goodbye. “Thank you, firefighters!”',
  },
  {
    image: require('./assets/books/bfta/page-17.jpg'),
    text: 'On the way home, they talked about everything they had learned. They knew smoke alarms were important. They knew to get outside during a fire. They knew never to hide. They knew how to stop, drop, and roll.',
  },
  {
    image: require('./assets/books/bfta/page-18.jpg'),
    text: 'And most importantly… They learned that the big red fire truck wasn’t just exciting. It carried brave helpers ready to protect their community. That night, Kani smiled as he closed his eyes. Anias whispered, “Maybe tomorrow we’ll hear the fire truck again.” And somewhere in the neighborhood… WEE-OOO! WEE-OOO! Another big fire truck adventure was beginning.',
  },
];

const UI_TEXT = {
  en: {
    welcomeTitle: 'Hi, friend! Welcome to Adventure Garden.',
    welcomeBody: 'I’m Adrionna, your adventure guide. Pick a story world and let’s explore together!',
    hearWelcome: '🔊 Hear My Welcome',
    chooseWorld: 'Choose Your World',
    playLearn: 'Play & Learn',
    readListen: 'READ & LISTEN →',
    teacher: 'Teacher',
    captions: 'Captions',
    readPage: '🔊 Read This Page',
    autoRead: '▶ Auto Read',
    stopStory: '⏸ Stop Story',
    home: '← Home',
    previous: '← Previous',
    next: 'Next →',
    language: 'Language',
  },
  es: {
    welcomeTitle: '¡Hola, amiguito! Bienvenido a Adventure Garden.',
    welcomeBody: 'Soy Adrionna, tu guía de aventuras. ¡Elige un mundo de cuentos y exploremos juntos!',
    hearWelcome: '🔊 Escucha mi bienvenida',
    chooseWorld: 'Elige tu mundo',
    playLearn: 'Juega y aprende',
    readListen: 'LEER Y ESCUCHAR →',
    teacher: 'Maestra',
    captions: 'Subtítulos',
    readPage: '🔊 Leer esta página',
    autoRead: '▶ Lectura automática',
    stopStory: '⏸ Detener cuento',
    home: '← Inicio',
    previous: '← Anterior',
    next: 'Siguiente →',
    language: 'Idioma',
  },
};

const SPANISH_STORY = {
  'gmg:0': `El Jardín Mágico de la Abuela
Los Guardianes del Jardín Secreto
Escrito por Adrionna Henry`,
  'gmg:1': `Derechos de autor
El Jardín Mágico de la Abuela: Los Guardianes del Jardín Secreto
Copyright © 2026 Adrionna Henry. Todos los derechos reservados.
Primera edición.
Esta historia presenta la naturaleza, hierbas, flores y hongos con fines educativos.
Los niños nunca deben comer, recoger, tocar ni usar plantas u hongos desconocidos sin la ayuda de un adulto de confianza que sepa del tema.`,
  'gmg:2': `Dedicatoria
Para cada pequeño explorador con un corazón curioso, una mente en crecimiento y amor por el mundo que le rodea.`,
  'gmg:3': `Conoce a los exploradores del jardín
Milo y Jay pasarán el verano con la abuela.
Detrás de su casa hay un jardín lleno de sorpresas y una pequeña guía roja y dorada llamada Luma.
¡Su aventura está a punto de comenzar!`,
  'gmg:4': `El camino a casa de la abuela
“¿Ya llegamos?”, preguntó Milo.
“¡Todavía no!”, dijo Jay.
Afuera había árboles altos, pequeños arroyos y un bosque lleno de secretos.
La abuela vivía donde parecía que el bosque susurraba.
Ese verano, los niños descubrirían por qué.`,
  'gmg:5': `La puerta del jardín
La abuela abrazó a Milo y Jay. “¡Bienvenidos, mis pequeños exploradores!”
Detrás de su casa encontraron una pequeña puerta verde.
La empujaron para abrirla.
¡WHOOSH!
Algo mágico esperaba al otro lado.`,
  'gmg:6': `Aparece una pequeña amiga
Una mariquita roja y dorada se posó en el dedo de Milo.
“¡Hola! Soy Luma”, dijo. “¡Vengan a ver los secretos del jardín!”
Los niños se quedaron mirando.
¿Una mariquita que habla?
¡Este jardín sí era mágico!`,
  'gmg:7': `Deseos de diente de león
Luma voló hacia un lugar soleado lleno de dientes de león.
“¿No son malas hierbas?”, preguntó Milo.
“Mira más de cerca”, dijo Luma.
Una abeja zumbó de flor en flor.
“Incluso las flores pequeñas pueden ayudar a alimentar a los polinizadores.”
Jay sonrió. “¿Puedo pedir un deseo?”
“¡Claro! Pero cuidar la naturaleza es una magia que de verdad puedes hacer.”`,
  'gmg:8': `El sendero de flores
Después llegaron a un camino lleno de flores de muchos colores.
Algunas olían dulce. Otras se movían suavemente con la brisa.
“Las plantas pueden ser especiales”, dijo Luma, “pero los Exploradores del Jardín nunca prueban ni tocan plantas desconocidas sin un adulto de confianza.”
Milo y Jay asintieron.
Mirarían, aprenderían y se mantendrían seguros.`,
  'gmg:9': `El círculo de hongos
Debajo de un árbol viejo, los niños encontraron un círculo de hongos.
“¡Guau!”, dijo Jay. “¿Podemos comerlos?”
“¡No!”, dijo Luma. “En la naturaleza, miramos; no probamos.”
Explicó que los hongos ayudan a descomponer hojas viejas y devolver nutrientes al suelo.
“¡Los hongos son el equipo de limpieza de la naturaleza!”, dijo Milo.`,
  'gmg:10': `Ayudantes del jardín
¡Bzzz! ¡Aleteo! ¡Movimiento!
El jardín estaba ocupado.
Las abejas visitaban flores. Los gusanos se movían por la tierra. Los pájaros llevaban semillas. Una araña corría por su telaraña.
“Todos tienen un trabajo”, dijo Luma.
Milo sonrió. “¡Todo el jardín es un equipo!”`,
  'gmg:11': `Problemas en el jardín
Una parte del jardín estaba seca y caída.
“¡Yo lo arreglo!”, dijo Milo.
“¡Yo también!”, dijo Jay.
“Esperen”, dijo Luma. “Los buenos Guardianes del Jardín trabajan juntos.”`,
  'gmg:12': `Trabajando juntos
Los niños revisaron la tierra y encontraron la manguera de riego rota.
Luego trabajaron lado a lado, ayudando con cuidado mientras la abuela estaba cerca.
Poco a poco, las plantas sedientas se levantaron.
Pronto, el jardín se veía más feliz.`,
  'gmg:13': `La magia del jardín
Cuando el sol empezó a ponerse, Luma brilló.
“¿Saben cuál es la mayor magia del jardín?”
“¿Polvo de hadas?”, adivinó Milo.
“¿Tierra mágica?”, preguntó Jay.
Luma se rio. “¡El trabajo en equipo!”
Las flores, los animales, el agua, la tierra y las personas se ayudaban entre sí.
“Todo está conectado”, susurró Milo.`,
  'gmg:14': `Guardianes del Jardín
Luma sonrió a los niños.
“Llegaron aquí como exploradores”, dijo. “Ahora saben cómo cuidar el jardín.”
Milo y Jay se pararon orgullosos juntos.
¡Eran Guardianes del Jardín!`,
  'gmg:15': `La promesa
De vuelta en casa de la abuela, ella abrazó a los niños.
“¿Qué aprendieron?”, preguntó.
“Un jardín es más que flores”, dijo Milo.
“Cada criatura tiene un trabajo importante”, dijo Jay.
Juntos prometieron:
“¡Sé curioso. Sé cuidadoso. Sé amable con la naturaleza!”`,
  'gmg:21': `Dibuja tu propio jardín mágico
¿Qué crecería en tu jardín mágico?`,
  'gmg:22': `Certificado de Guardián del Jardín
Esto certifica que
________________________________
ha aprendido a ser curioso, cuidadoso y amable con la naturaleza.
Firma: ________________________________`,
  'gmg:23': `¡Sigue explorando!
Mira de cerca.
Haz preguntas.
Ayuda a los seres vivos.
Y explora siempre la naturaleza con un adulto de confianza.
El jardín tiene más secretos esperándote.`,
  'cwd:0': `Acampando con Papá
Por Adrionna Henry
Una aventura de vida silvestre sobre la familia, el descubrimiento y el respeto por la naturaleza.`,
  'cwd:1': `Derechos de autor
Acampando con Papá
Copyright © 2026 Adrionna Henry
Todos los derechos reservados.
Primera edición.
Impreso a través de Amazon KDP.`,
  'cwd:2': `Este libro pertenece a
__________________________________
¡La aventura te espera!`,
  'cwd:3': `Para pequeños exploradores
Para cada niño que ama la aventura y cada papá que hace especial el viaje.`,
  'cwd:18': `¿Qué descubrimos?
Las huellas de animales pueden decirnos quién pasó por allí.
Los pájaros y las hojas hacen que el bosque se sienta vivo.
Los animales salvajes necesitan espacio: mira, no toques.
Quédate en el sendero y deja la naturaleza donde la encontraste.`,
  'cwd:19': `Reglas de explorador de Jordan y Amir
1. Mantente cerca de un adulto.
2. Respeta la vida silvestre.
3. Mantén limpio el campamento.
4. Escucha, mira y aprende.
5. Toma solo fotografías y deja solo huellas.`,
  'cwd:20': `Mi aventura de campamento
¡Dibuja aquí tu animal favorito o descubrimiento al aire libre!
____________________________________________
____________________________________________
____________________________________________`,
  'cwd:21': `¿Qué puedes escuchar?
La próxima vez que estés afuera, detente y escucha.
¿Puedes oír pájaros? ¿Viento? ¿Hojas? ¿Agua?
El aire libre tiene su propia música.`,
  'cwd:22': `Sigue explorando
Sé curioso. Sé amable. Respeta la naturaleza.
Cada aventura puede enseñarnos algo.`,
  'cwd:23': `Sobre la autora
Adrionna Henry escribe cuentos infantiles sobre familia, imaginación, aprendizaje y aventura.
¡Gracias por leer Acampando con Papá!`,
};

const getStoryText = (world, page, language) => {
  if (!world) return '';
  if (language === 'es') {
    return SPANISH_STORY[`${world.id}:${page}`]
      ?? world.pages[page]?.text
      ?? '';
  }
  return world.pages[page]?.text ?? '';
};

const worlds = [
  {
    id: 'gmg',
    title: "Grandma's Magic Garden",
    subtitle: 'World 1 • Read, learn & grow',
    emoji: '🌿🐞',
    pages: GMG_PAGES,
  },
  {
    id: 'cwd',
    title: 'Camping with Dad',
    subtitle: 'World 2 • Family outdoor adventure',
    emoji: '🏕️',
    pages: CWD_PAGES,
  },
  {
    id: 'bfta',
    title: 'The Big Fire Truck Adventures',
    subtitle: 'World 3 • Heroes, friendship & safety',
    emoji: '🚒',
    pages: BFTA_PAGES,
  },
];

const actions = [
  ['🎮', 'Games', 'games'],
  ['🎵', 'ABC & Music', 'music'],
  ['🎨', 'Coloring', 'coloring'],
  ['⭐', 'Rewards', 'rewards'],
  ['🐾', 'Adventure Pet', 'pet'],
  ['👩🏾‍🏫', 'Teacher', 'teacher'],
  ['👨‍👩‍👧', 'Parent Zone', 'parent'],
];

export default function App() {
  const [screen, setScreen] = useState('home');
  const [world, setWorld] = useState(null);
  const [page, setPage] = useState(0);
  const [stars, setStars] = useState(125);
  const [parentOpen, setParentOpen] = useState(false);
  const [answer, setAnswer] = useState('');
  const [autoRead, setAutoRead] = useState(false);
  const [language, setLanguage] = useState('en');
  const [captions, setCaptions] = useState(true);
  const [badges, setBadges] = useState(['Story Star']);
  const [completed, setCompleted] = useState({
    gmg: false,
    cwd: false,
    bfta: false,
  });
  const [pet, setPet] = useState({
    name: 'Sprout',
    type: '🐶',
    outfit: 'None',
    hunger: 80,
    happiness: 80,
    cleanliness: 80,
    energy: 80,
  });
  const [loaded, setLoaded] = useState(false);

  const t = (key) =>
    UI_TEXT[language]?.[key] ?? UI_TEXT.en[key] ?? key;

  const goHome = () => {
    Speech.stop();
    setAutoRead(false);
    setScreen('home');
    setWorld(null);
    setPage(0);
  };

  const addStars = (n) => setStars((s) => s + n);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('adventureGardenProgress');
        if (raw) {
          const p = JSON.parse(raw);
          if (typeof p.stars === 'number') setStars(p.stars);
          if (Array.isArray(p.badges)) setBadges(p.badges);
          if (p.completed) setCompleted(p.completed);
          if (p.pet) setPet(p.pet);
          if (p.language === 'en' || p.language === 'es') {
            setLanguage(p.language);
          }
          if (typeof p.captions === 'boolean') {
            setCaptions(p.captions);
          }
        }
      } catch (e) {
        console.warn('Could not load progress:', e);
      }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(
      'adventureGardenProgress',
      JSON.stringify({
        stars,
        badges,
        completed,
        pet,
        language,
        captions,
      })
    ).catch((e) => console.warn('Could not save progress:', e));
  }, [stars, badges, completed, pet, language, captions, loaded]);

  const earnBadge = (name) =>
    setBadges((b) => (b.includes(name) ? b : [...b, name]));

  const speak = (text, options = {}) => {
    Speech.stop();
    Speech.speak(text || 'Welcome to Adventure Garden!', {
      rate: 0.86,
      pitch: 1.03,
      language: language === 'es' ? 'es-US' : 'en-US',
      ...options,
    });
  };

  const openWorld = (w) => {
    Speech.stop();
    setAutoRead(false);
    setWorld(w);
    setPage(0);
    setScreen('reader');
  };

  const parentGate = () => setParentOpen(true);

  const checkGate = () => {
    if (answer.trim() === '7') {
      setParentOpen(false);
      setAnswer('');
      setScreen('parent');
    } else {
      Alert.alert(
        'Try again',
        'Ask a grown-up to solve the parent question.'
      );
    }
  };

  useEffect(() => {
    if (screen !== 'reader' || !world || !autoRead) return;

    const text = getStoryText(world, page, language).trim();

    if (!text) {
      setAutoRead(false);
      return;
    }

    Speech.stop();
    Speech.speak(text, {
      rate: 0.86,
      pitch: 1.03,
      language:
        language === 'es' && SPANISH_STORY[`${world.id}:${page}`]
          ? 'es-US'
          : 'en-US',
      onDone: () => {
        if (page < world.pages.length - 1) {
          addStars(1);
          setPage((p) => p + 1);
        } else {
          setAutoRead(false);
          if (!completed[world.id]) {
            setCompleted((c) => ({ ...c, [world.id]: true }));
            earnBadge(
              world.id === 'gmg'
                ? 'Garden Guardian'
                : world.id === 'cwd'
                  ? 'Camping Explorer'
                  : 'Fire Safety Hero'
            );
            addStars(20);
          }
        }
      },
      onStopped: () => {},
      onError: () => setAutoRead(false),
    });

    return () => {
      Speech.stop();
    };
  }, [autoRead, page, screen, world, language]);

  const goNextPage = () => {
    Speech.stop();
    setAutoRead(false);
    if (!world) return;

    if (page === world.pages.length - 2 && !completed[world.id]) {
      setCompleted((c) => ({ ...c, [world.id]: true }));
      earnBadge(
        world.id === 'gmg'
          ? 'Garden Guardian'
          : world.id === 'cwd'
            ? 'Camping Explorer'
            : 'Fire Safety Hero'
      );
      addStars(20);
    }

    addStars(2);
    setPage((p) => Math.min(world.pages.length - 1, p + 1));
  };

  const goPreviousPage = () => {
    Speech.stop();
    setAutoRead(false);
    setPage((p) => Math.max(0, p - 1));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      <View style={styles.topbar}>
        <Pressable onPress={goHome}>
          <Text style={styles.brand}>🌿 Adventure Garden</Text>
        </Pressable>

        <View style={styles.topControls}>
          <View style={styles.languagePill}>
            <Pressable
              onPress={() => setLanguage('en')}
              style={[
                styles.langBtn,
                language === 'en' && styles.langBtnActive,
              ]}
            >
              <Text style={styles.langText}>EN</Text>
            </Pressable>

            <Pressable
              onPress={() => setLanguage('es')}
              style={[
                styles.langBtn,
                language === 'es' && styles.langBtnActive,
              ]}
            >
              <Text style={styles.langText}>ES</Text>
            </Pressable>
          </View>

          <View style={styles.starPill}>
            <Text style={styles.starText}>⭐ {stars}</Text>
          </View>
        </View>
      </View>

      {screen === 'home' && (
        <ScrollView contentContainerStyle={styles.page}>
          <View style={styles.hero}>
            <View style={styles.guideCircle}>
              <Text style={styles.guideEmoji}>👩🏾‍🏫</Text>
            </View>

            <View style={styles.heroCopy}>
              <Text style={styles.kicker}>READ • PLAY • LEARN • GROW</Text>
              <Text style={styles.heroTitle}>{t('welcomeTitle')}</Text>
              <Text style={styles.heroBody}>{t('welcomeBody')}</Text>

              <Pressable
                style={styles.listenButton}
                onPress={() =>
                  speak(
                    language === 'es'
                      ? '¡Hola! Soy Adrionna. Bienvenido a Adventure Garden. ¡Vamos a explorar, aprender y divertirnos juntos!'
                      : "Hi friend! I'm Adrionna. Welcome to Adventure Garden. Let's explore, learn, and have fun together!"
                  )
                }
              >
                <Text style={styles.listenText}>{t('hearWelcome')}</Text>
              </Pressable>
            </View>
          </View>

          <Text style={styles.sectionTitle}>{t('chooseWorld')}</Text>

          {worlds.map((w) => (
            <Pressable
              key={w.id}
              style={styles.worldCard}
              onPress={() => openWorld(w)}
            >
              <View style={styles.worldEmoji}>
                <Text style={styles.bigEmoji}>{w.emoji}</Text>
              </View>

              <View style={styles.worldCopy}>
                <Text style={styles.worldTitle}>{w.title}</Text>
                <Text style={styles.worldSub}>{w.subtitle}</Text>
                <Text style={styles.openText}>{t('readListen')}</Text>
              </View>
            </Pressable>
          ))}

          <Text style={styles.sectionTitle}>{t('playLearn')}</Text>

          <View style={styles.actionGrid}>
            {actions.map((a) => (
              <Pressable
                key={a[2]}
                style={[
                  styles.action,
                  a[2] === 'parent' && { backgroundColor: '#E9F7EC' },
                ]}
                onPress={() =>
                  a[2] === 'parent' ? parentGate() : setScreen(a[2])
                }
              >
                <Text style={styles.actionEmoji}>{a[0]}</Text>
                <Text style={styles.actionText}>{a[1]}</Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.safety}>
            🛡️ Kid-friendly design • Parent gate for purchases & outside links
          </Text>
        </ScrollView>
      )}

      {screen === 'reader' && world && (
        <ScrollView contentContainerStyle={styles.page}>
          <Pressable style={styles.back} onPress={goHome}>
            <Text>{t('home')}</Text>
          </Pressable>

          <Text style={styles.readerTitle}>{world.title}</Text>
          <Text style={styles.pageCount}>
            Page {page + 1} of {world.pages.length}
          </Text>

          <Image
            source={world.pages[page].image}
            style={styles.bookPage}
            resizeMode="contain"
          />

          <View style={styles.accessRow}>
            <Text style={styles.accessLabel}>💬 {t('captions')}</Text>
            <Pressable
              style={[
                styles.captionToggle,
                captions && styles.captionToggleOn,
              ]}
              onPress={() => setCaptions((v) => !v)}
            >
              <Text style={styles.captionToggleText}>
                {captions ? 'ON' : 'OFF'}
              </Text>
            </Pressable>
          </View>

          {captions && !!getStoryText(world, page, language).trim() && (
            <View style={styles.captionBox}>
              <Text style={styles.captionText}>
                {getStoryText(world, page, language)}
              </Text>
            </View>
          )}

          {!getStoryText(world, page, language).trim() && (
            <Text>
              Picture or activity page. Explore it together, then tap Next.
            </Text>
          )}

          {language === 'es'
            && !SPANISH_STORY[`${world.id}:${page}`]
            && !!world.pages[page]?.text && (
              <Text>This page is currently available in English.</Text>
            )}

          <View style={styles.readerButtons}>
            <Pressable
              disabled={!getStoryText(world, page, language).trim()}
              style={styles.secondaryBtn}
              onPress={() => {
                setAutoRead(false);
                speak(getStoryText(world, page, language), {
                  language:
                    language === 'es'
                      && SPANISH_STORY[`${world.id}:${page}`]
                      ? 'es-US'
                      : 'en-US',
                });
                addStars(1);
              }}
            >
              <Text style={styles.secondaryText}>{t('readPage')}</Text>
            </Pressable>

            <Pressable
              style={styles.primaryBtn}
              onPress={() => {
                if (autoRead) {
                  Speech.stop();
                  setAutoRead(false);
                } else {
                  setAutoRead(true);
                }
              }}
            >
              <Text style={styles.primaryText}>
                {autoRead ? t('stopStory') : t('autoRead')}
              </Text>
            </Pressable>
          </View>

          <View style={styles.readerButtons}>
            <Pressable
              disabled={page === 0}
              style={[styles.linkBtn, page === 0 && styles.disabledBtn]}
              onPress={goPreviousPage}
            >
              <Text>{t('previous')}</Text>
            </Pressable>

            <Pressable
              disabled={page === world.pages.length - 1}
              style={[
                styles.linkBtn,
                page === world.pages.length - 1 && styles.disabledBtn,
              ]}
              onPress={goNextPage}
            >
              <Text>{t('next')}</Text>
            </Pressable>
          </View>

          <View style={styles.readerButtons}>
            <Pressable
              style={styles.linkBtn}
              onPress={() => {
                Speech.stop();
                setAutoRead(false);
                addStars(5);
                setScreen('games');
              }}
            >
              <Text>Play a Game 🎮</Text>
            </Pressable>

            <Pressable
              style={styles.linkBtn}
              onPress={() => {
                Speech.stop();
                setAutoRead(false);
                setPage(0);
              }}
            >
              <Text>↺ Start Over</Text>
            </Pressable>
          </View>
        </ScrollView>
      )}

      {screen === 'games' && (
        <Games onHome={goHome} addStars={addStars} speak={speak} />
      )}

      {screen === 'music' && (
        <Music onHome={goHome} addStars={addStars} speak={speak} />
      )}

      {screen === 'coloring' && (
        <Coloring onHome={goHome} addStars={addStars} />
      )}

      {screen === 'pet' && (
        <AdventurePet
          onHome={goHome}
          pet={pet}
          setPet={setPet}
          stars={stars}
          setStars={setStars}
          speak={speak}
        />
      )}

      {screen === 'teacher' && (
        <TeacherMode
          onHome={goHome}
          speak={speak}
          language={language}
          setLanguage={setLanguage}
        />
      )}

      {screen === 'rewards' && (
        <Rewards
          onHome={goHome}
          stars={stars}
          badges={badges}
          completed={completed}
        />
      )}

      {screen === 'parent' && (
        <ParentZone
          onHome={goHome}
          completed={completed}
          stars={stars}
        />
      )}

      <Modal visible={parentOpen} transparent animationType="fade">
        <View style={styles.modalShade}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Grown-ups only 🔒</Text>
            <Text style={styles.modalText}>What is 3 + 4?</Text>

            <TextInput
              value={answer}
              onChangeText={setAnswer}
              keyboardType="number-pad"
              style={styles.input}
              placeholder="Answer"
            />

            <Pressable style={styles.primaryBtn} onPress={checkGate}>
              <Text style={styles.primaryText}>Enter Parent Zone</Text>
            </Pressable>

            <Pressable
              style={styles.cancel}
              onPress={() => {
                setParentOpen(false);
                setAnswer('');
              }}
            >
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function TeacherMode({ onHome, speak, language, setLanguage }) {
  const [mode, setMode] = useState('spanish');
  const [aslIndex, setAslIndex] = useState(0);

  const spanishWords = [
    ['Hello', 'Hola', 'OH-lah'],
    ['Friend', 'Amigo / Amiga', 'ah-MEE-go / ah-MEE-gah'],
    ['Garden', 'Jardín', 'har-DEEN'],
    ['Book', 'Libro', 'LEE-bro'],
    ['Family', 'Familia', 'fah-MEE-lee-ah'],
    ['Thank you', 'Gracias', 'GRAH-see-ahs'],
    ['Please', 'Por favor', 'por fah-VOR'],
    ['I love you', 'Te quiero', 'teh kee-EH-ro'],
  ];

  const aslLessons = [
    {
      word: 'HELLO',
      icon: '👋',
      guide: 'Open hand near your forehead, then move the hand outward like a friendly salute.',
    },
    {
      word: 'THANK YOU',
      icon: '🤟',
      guide: 'Touch fingertips near your chin, then move your hand forward and slightly down.',
    },
    {
      word: 'FRIEND',
      icon: '🤝',
      guide: 'Hook index fingers together, then switch which finger is on top.',
    },
    {
      word: 'BOOK',
      icon: '📖',
      guide: 'Place palms together, then open them like the pages of a book.',
    },
    {
      word: 'LEARN',
      icon: '🧠',
      guide: 'Bring fingertips from an open palm up toward your forehead.',
    },
    {
      word: 'LOVE',
      icon: '❤️',
      guide: 'Cross both arms over your chest in a gentle hug.',
    },
  ];

  const lesson = aslLessons[aslIndex];

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Header title="Adventure Teacher" onHome={onHome} />

      <View style={styles.teacherHero}>
        <Text style={styles.teacherEmoji}>👩🏾‍🏫</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.teacherTitle}>Meet your Adventure Teacher</Text>
          <Text style={styles.teacherBody}>
            Learn English, Spanish, and beginner ASL with captions and visual guidance.
          </Text>
        </View>
      </View>

      <View style={styles.modeRow}>
        <Pressable
          style={[
            styles.modeBtn,
            mode === 'spanish' && styles.modeBtnActive,
          ]}
          onPress={() => setMode('spanish')}
        >
          <Text style={styles.modeText}>🇪🇸 Spanish</Text>
        </Pressable>

        <Pressable
          style={[styles.modeBtn, mode === 'asl' && styles.modeBtnActive]}
          onPress={() => setMode('asl')}
        >
          <Text style={styles.modeText}>🤟 ASL</Text>
        </Press
