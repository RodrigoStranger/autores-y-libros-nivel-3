// Creacion de Colecciones (tablas):
db.createCollection("Generos");
db.createCollection("Autores");
db.createCollection("Libros");
db.createCollection("Usuarios");

// Creacion de Generos:
db.Generos.insertMany([
    { nombre: "Ficción", descripcion: "Narrativa que describe eventos y personajes que no corresponden a la realidad, pero que pueden estar inspirados en hechos reales." },
    { nombre: "No Ficción", descripcion: "Obras literarias que se basan en hechos reales, investigaciones, biografías y relatos verídicos." },
    { nombre: "Ciencia Ficción", descripcion: "Género que imagina futuros avances científicos y tecnológicos, así como sus impactos en la sociedad, el espacio o el tiempo." },
    { nombre: "Fantasía", descripcion: "Narrativa que presenta mundos imaginarios con elementos sobrenaturales, como magia, criaturas fantásticas y mundos alternativos." },
    { nombre: "Misterio", descripcion: "Obras que giran en torno a resolver enigmas, crímenes o sucesos inexplicables, y cuya trama se desarrolla a través de la investigación." },
    { nombre: "Romántico", descripcion: "Historias centradas en relaciones amorosas, explorando el amor, los sentimientos y las complejidades de las relaciones románticas." },
    { nombre: "Biografía", descripcion: "Relato de la vida de una persona, escrito por otro autor, generalmente con un enfoque histórico, social o emocional." },
    { nombre: "Historia", descripcion: "Género que estudia y narra hechos y eventos pasados de la humanidad, interpretando su relevancia y contexto a lo largo del tiempo." },
    { nombre: "Terror", descripcion: "Género literario cuyo objetivo es generar miedo, horror y tensión en el lector a través de situaciones macabras o sobrenaturales." },
    { nombre: "Autoayuda", descripcion: "Libros que buscan mejorar la vida del lector proporcionando consejos prácticos sobre bienestar, desarrollo personal y emocional." }
]);

// Creacion de Autores:
db.Autores.insertMany([
    { nombre: "Gabriel García Márquez", fecha_nacimiento: ISODate("1927-03-06"), nacionalidad: "Colombia" },
    { nombre: "Plinio Apuleyo Mendoza", fecha_nacimiento: ISODate("1932-01-01"), nacionalidad: "Colombia" },
    { nombre: "Mario Vargas Llosa", fecha_nacimiento: ISODate("1936-03-28"), nacionalidad: "Perú" },
    { nombre: "Jorge Luis Borges", fecha_nacimiento: ISODate("1899-08-24"), nacionalidad: "Argentina" },
    { nombre: "Adolfo Bioy Casares", fecha_nacimiento: ISODate("1914-09-15"), nacionalidad: "Argentina" },
    { nombre: "Pablo Neruda", fecha_nacimiento: ISODate("1904-07-12"), nacionalidad: "Chile" },
    { nombre: "Julio Cortázar", fecha_nacimiento: ISODate("1914-08-26"), nacionalidad: "Argentina" },
    { nombre: "Isabel Allende", fecha_nacimiento: ISODate("1942-08-02"), nacionalidad: "Chile" },
    { nombre: "Carlos Fuentes", fecha_nacimiento: ISODate("1928-11-11"), nacionalidad: "México" },
    { nombre: "Octavio Paz", fecha_nacimiento: ISODate("1914-03-31"), nacionalidad: "México" },
    { nombre: "Laura Esquivel", fecha_nacimiento: ISODate("1950-09-30"), nacionalidad: "México" },
    { nombre: "Rubén Darío", fecha_nacimiento: ISODate("1867-01-18"), nacionalidad: "Nicaragua" },
    { nombre: "Mario Benedetti", fecha_nacimiento: ISODate("1920-09-14"), nacionalidad: "Uruguay" },
    { nombre: "Vicente Huidobro", fecha_nacimiento: ISODate("1893-01-10"), nacionalidad: "Chile" },
    { nombre: "Alejo Carpentier", fecha_nacimiento: ISODate("1904-12-26"), nacionalidad: "Cuba" },
    { nombre: "Juan Rulfo", fecha_nacimiento: ISODate("1917-05-16"), nacionalidad: "México" },
    { nombre: "Sor Juana Inés de la Cruz", fecha_nacimiento: ISODate("1648-11-12"), nacionalidad: "México" },
    { nombre: "Horacio Quiroga", fecha_nacimiento: ISODate("1878-12-31"), nacionalidad: "Uruguay" },
    { nombre: "Eduardo Galeano", fecha_nacimiento: ISODate("1940-09-03"), nacionalidad: "Uruguay" },
    { nombre: "María Dueñas", fecha_nacimiento: ISODate("1960-01-01"), nacionalidad: "España" },
    { nombre: "Ricardo Piglia", fecha_nacimiento: ISODate("1941-12-24"), nacionalidad: "Argentina" },
    { nombre: "César Vallejo", fecha_nacimiento: ISODate("1892-03-16"), nacionalidad: "Perú" },
    { nombre: "José María Arguedas", fecha_nacimiento: ISODate("1911-01-18"), nacionalidad: "Perú" },
    { nombre: "Alfredo Bryce Echenique", fecha_nacimiento: ISODate("1939-02-19"), nacionalidad: "Perú" },
    { nombre: "Ricardo Palma", fecha_nacimiento: ISODate("1833-02-07"), nacionalidad: "Perú" }
]);

// Creacion de Libros:
db.Libros.insertMany([
    { titulo: "Cien Años de Soledad", fecha_publicacion: ISODate("1967-06-05"), sinopsis: "Una obra maestra de Gabriel García Márquez que narra la historia de la familia Buendía en el mítico pueblo de Macondo, explorando el realismo mágico y las complejidades del tiempo.", disponibilidad: true, paginas: 417, generos: ["Ficción"], autores: ["Gabriel García Márquez"] },
    { titulo: "El Amor en los Tiempos del Cólera", fecha_publicacion: ISODate("1985-06-05"), sinopsis: "Una novela de Gabriel García Márquez que narra la historia de un amor que sobrevive a través del tiempo, la enfermedad y la guerra.", disponibilidad: true, paginas: 368, generos: ["Romántico", "Ficción"], autores: ["Gabriel García Márquez"] },
    { titulo: "Crónica de una Muerte Anunciada", fecha_publicacion: ISODate("1981-06-01"), sinopsis: "Un relato de Gabriel García Márquez sobre un asesinato premeditado en un pequeño pueblo, explorando el destino y la inevitabilidad.", disponibilidad: true, paginas: 120, generos: ["Misterio", "Ficción"], autores: ["Gabriel García Márquez", "Plinio Apuleyo Mendoza"] },

    { titulo: "La Fiesta del Chivo", fecha_publicacion: ISODate("2000-01-01"), sinopsis: "Una obra de Mario Vargas Llosa que describe la dictadura de Trujillo en la República Dominicana a través de una trama de terror y opresión.", disponibilidad: true, paginas: 512, generos: ["Historia", "Ficción"], autores: ["Mario Vargas Llosa"] },
    { titulo: "Conversación en La Catedral", fecha_publicacion: ISODate("1969-01-01"), sinopsis: "Una novela de Mario Vargas Llosa que relata la historia de un periodista que busca la verdad sobre la corrupción política en Perú durante la dictadura de Odría.", disponibilidad: true, paginas: 552, generos: ["Historia", "Ficción"], autores: ["Mario Vargas Llosa"] },
    { titulo: "La Casa Verde", fecha_publicacion: ISODate("1966-01-01"), sinopsis: "Una novela compleja de Mario Vargas Llosa que explora la vida en una ciudad peruana ficticia y las tensiones políticas y sociales de la época.", disponibilidad: true, paginas: 460, generos: ["Ficción", "Historia"], autores: ["Mario Vargas Llosa"] },
    
    { titulo: "Ficciones", fecha_publicacion: ISODate("1944-01-01"), sinopsis: "Un conjunto de relatos de Borges que exploran laberintos, realidades alternativas, y lo infinito en el marco del realismo fantástico.", disponibilidad: true, paginas: 245, generos: ["Ficción", "Fantasía"], autores: ["Jorge Luis Borges"] },
    { titulo: "El Aleph", fecha_publicacion: ISODate("1949-06-01"), sinopsis: "Un libro de Jorge Luis Borges que presenta una colección de cuentos con temas de infinito, tiempo y el concepto de universos paralelos.", disponibilidad: true, paginas: 252, generos: ["Ficción", "Fantasía"], autores: ["Jorge Luis Borges", "Adolfo Bioy Casares"] },
    { titulo: "Labyrinths", fecha_publicacion: ISODate("1962-01-01"), sinopsis: "Una colección de cuentos y ensayos de Jorge Luis Borges que explora temas de lo imposible, los laberintos, la identidad y la eternidad.", disponibilidad: true, paginas: 310, generos: ["Ficción", "Fantasía"], autores: ["Jorge Luis Borges"] },
    
    { titulo: "Veinte Poemas de Amor y Una Canción Desesperada", fecha_publicacion: ISODate("1924-01-01"), sinopsis: "Una colección de poemas románticos y apasionados escritos por Pablo Neruda, que exploran el amor y la pérdida.", disponibilidad: true, paginas: 92, generos: ["Romántico", "Ficción"], autores: ["Pablo Neruda"] },
    { titulo: "Canto General", fecha_publicacion: ISODate("1950-01-01"), sinopsis: "Un extenso poema épico de Pablo Neruda que describe la historia de América Latina y sus luchas sociales, políticas y culturales.", disponibilidad: true, paginas: 530, generos: ["Historia", "Ficción"], autores: ["Pablo Neruda"] },
    { titulo: "Confieso que he Vivido", fecha_publicacion: ISODate("1974-01-01"), sinopsis: "Una autobiografía de Pablo Neruda en la que reflexiona sobre su vida, su poesía y su compromiso político.", disponibilidad: true, paginas: 334, generos: ["Autoayuda", "Ficción"], autores: ["Pablo Neruda"] },
    
    { titulo: "Rayuela", fecha_publicacion: ISODate("1963-06-28"), sinopsis: "Una novela innovadora de Julio Cortázar que presenta múltiples formas de lectura, rompiendo las convenciones de la narrativa tradicional.", disponibilidad: true, paginas: 364, generos: ["Ficción", "Fantasía"], autores: ["Julio Cortázar"] },
    { titulo: "Bestiario", fecha_publicacion: ISODate("1951-01-01"), sinopsis: "Una colección de cuentos de Julio Cortázar que mezcla lo real con lo surreal y lo extraño, donde las fronteras entre lo humano y lo animal se disipan.", disponibilidad: true, paginas: 162, generos: ["Ficción", "Fantasía"], autores: ["Julio Cortázar"] },
    { titulo: "Final del Juego", fecha_publicacion: ISODate("1956-01-01"), sinopsis: "Un conjunto de relatos de Julio Cortázar que explora los límites de la realidad y la fantasía, con su característico estilo experimental.", disponibilidad: true, paginas: 226, generos: ["Ficción", "Fantasía"], autores: ["Julio Cortázar"] },
    
    { titulo: "La Casa de los Espíritus", fecha_publicacion: ISODate("1982-11-01"), sinopsis: "La novela debut de Isabel Allende, que narra la historia de una familia a través de generaciones, explorando el realismo mágico y los cambios sociales en Chile.", disponibilidad: true, paginas: 464, generos: ["Ficción", "Historia"], autores: ["Isabel Allende"] },
    { titulo: "Eva Luna", fecha_publicacion: ISODate("1987-01-01"), sinopsis: "Una obra de Isabel Allende que narra la historia de Eva Luna, una mujer que, mediante su capacidad de contar historias, da voz a su pueblo.", disponibilidad: true, paginas: 396, generos: ["Ficción", "Romántico"], autores: ["Isabel Allende"] },
    { titulo: "Paula", fecha_publicacion: ISODate("1994-03-01"), sinopsis: "Una novela autobiográfica de Isabel Allende en la que narra la vida de su hija Paula y la enfermedad que la llevó a la muerte.", disponibilidad: true, paginas: 384, generos: ["Biografía", "Ficción"], autores: ["Isabel Allende"] },
    
    { titulo: "La Muerte de Artemio Cruz", fecha_publicacion: ISODate("1962-01-01"), sinopsis: "Una de las obras más destacadas de Carlos Fuentes, que narra la vida de Artemio Cruz a través de su lecho de muerte, reflexionando sobre el poder y la corrupción.", disponibilidad: true, paginas: 320, generos: ["Ficción", "Historia"], autores: ["Carlos Fuentes"] },
    { titulo: "Terra Nostra", fecha_publicacion: ISODate("1975-01-01"), sinopsis: "Una novela épica de Carlos Fuentes que abarca la historia de España y América Latina, explorando temas de poder, cultura y memoria.", disponibilidad: true, paginas: 800, generos: ["Historia", "Ficción"], autores: ["Carlos Fuentes"] },
    { titulo: "Aura", fecha_publicacion: ISODate("1962-01-01"), sinopsis: "Una novela corta de Carlos Fuentes que mezcla lo sobrenatural y lo psicológico, narrando la historia de una joven que vive en un mundo de misterio y secretos.", disponibilidad: true, paginas: 130, generos: ["Misterio", "Fantasía"], autores: ["Carlos Fuentes"] }, 
    
    { titulo: "El Laberinto de la Soledad", fecha_publicacion: ISODate("1950-01-01"), sinopsis: "Una obra de Octavio Paz que analiza la identidad mexicana, la historia y la soledad del individuo en la cultura mexicana.", disponibilidad: true, paginas: 320, generos: ["No Ficción", "Historia"], autores: ["Octavio Paz"] },
    { titulo: "Piedra de Sol", fecha_publicacion: ISODate("1957-01-01"), sinopsis: "Un largo poema de Octavio Paz que explora temas como el tiempo, la vida, el amor y la muerte, usando la forma del soneto.", disponibilidad: true, paginas: 135, generos: ["Ficción", "Terror"], autores: ["Octavio Paz"] },
    { titulo: "El Arco y la Lira", fecha_publicacion: ISODate("1956-01-01"), sinopsis: "Un ensayo de Octavio Paz en el que reflexiona sobre el papel de la poesía en la vida humana y la cultura.", disponibilidad: true, paginas: 204, generos: ["No Ficción", "Historia"], autores: ["Octavio Paz"] },
    
    { titulo: "Como Agua para Chocolate", fecha_publicacion: ISODate("1989-01-01"), sinopsis: "Una novela de Laura Esquivel que mezcla recetas de cocina y relatos de amor, abordando la vida de una familia en el México revolucionario.", disponibilidad: true, paginas: 256, generos: ["Romántico", "Ficción"], autores: ["Laura Esquivel"] },
    { titulo: "La Ley del Amor", fecha_publicacion: ISODate("1995-01-01"), sinopsis: "Una novela de Laura Esquivel que explora el amor en sus diversas formas a lo largo del tiempo, entrelazando ciencia ficción y realismo mágico.", disponibilidad: true, paginas: 352, generos: ["Ciencia Ficción", "Romántico"], autores: ["Laura Esquivel"] },
    { titulo: "Tan Veloz como el Deseo", fecha_publicacion: ISODate("1995-01-01"), sinopsis: "Una novela de Laura Esquivel que narra las historias de varias mujeres en un contexto de amores, pasiones y secretos familiares.", disponibilidad: true, paginas: 368, generos: ["Romántico", "Ficción"], autores: ["Laura Esquivel"] },
    
    { titulo: "Azul", fecha_publicacion: ISODate("1888-01-01"), sinopsis: "Un libro de Rubén Darío que marca el inicio del modernismo en la poesía latinoamericana, con sus innovadoras formas y ritmos poéticos.", disponibilidad: true, paginas: 176, generos: ["Ficción", "Terror"], autores: ["Rubén Darío"] },
    { titulo: "Cantos de Vida y Esperanza", fecha_publicacion: ISODate("1905-01-01"), sinopsis: "Una obra poética de Rubén Darío que explora el sufrimiento humano, el amor y la muerte desde un enfoque modernista.", disponibilidad: true, paginas: 182, generos: ["Ficción", "Terror"], autores: ["Rubén Darío"] },
    { titulo: "Los Raros", fecha_publicacion: ISODate("1896-01-01"), sinopsis: "Una colección de ensayos de Rubén Darío donde reflexiona sobre la vida de diversos personajes destacados en la historia, la cultura y el arte.", disponibilidad: true, paginas: 210, generos: ["No Ficción", "Historia"], autores: ["Rubén Darío"] },
    
    { titulo: "La Tregua", fecha_publicacion: ISODate("1960-01-01"), sinopsis: "Una novela de Mario Benedetti que relata la historia de un hombre que, en medio de su rutina diaria, se encuentra con un amor inesperado.", disponibilidad: true, paginas: 238, generos: ["Romántico", "Ficción"], autores: ["Mario Benedetti"] },
    { titulo: "Gracias por el Fuego", fecha_publicacion: ISODate("1965-01-01"), sinopsis: "Una obra de Mario Benedetti que narra la historia de un joven que busca dar sentido a su vida en medio de una sociedad desigual.", disponibilidad: true, paginas: 240, generos: ["Ficción", "Autoayuda"], autores: ["Mario Benedetti"] },
    { titulo: "El Otro Yo", fecha_publicacion: ISODate("1965-01-01"), sinopsis: "Una novela de Mario Benedetti que explora las emociones, los sentimientos y las dificultades de un hombre atrapado en su vida cotidiana.", disponibilidad: true, paginas: 211, generos: ["Ficción", "Autoayuda"], autores: ["Mario Benedetti"] },
    
    { titulo: "Altazor", fecha_publicacion: ISODate("1931-01-01"), sinopsis: "Un poema vanguardista de Vicente Huidobro, que explora la ruptura de las estructuras lingüísticas y literarias convencionales.", disponibilidad: true, paginas: 180, generos: ["Ficción", "No Ficción"], autores: ["Vicente Huidobro"] },
    { titulo: "Poemas Árticos", fecha_publicacion: ISODate("1918-01-01"), sinopsis: "Una colección de poemas de Vicente Huidobro que refleja su estilo innovador y experimental, y sus preocupaciones sobre la naturaleza y el ser humano.", disponibilidad: true, paginas: 150, generos: ["Ficción", "No Ficción"], autores: ["Vicente Huidobro"] },
    { titulo: "La Poesía", fecha_publicacion: ISODate("1936-01-01"), sinopsis: "Un ensayo de Vicente Huidobro que analiza la creación poética y la búsqueda del sentido a través de la palabra.", disponibilidad: true, paginas: 220, generos: ["Ficción", "No Ficción"], autores: ["Vicente Huidobro"] },
    
    { titulo: "El Reino de Este Mundo", fecha_publicacion: ISODate("1949-01-01"), sinopsis: "Una novela de Alejo Carpentier que explora la historia de Haití, mezclando lo histórico y lo fantástico.", disponibilidad: true, paginas: 300, generos: ["Historia", "Fantasía"], autores: ["Alejo Carpentier"] },
    { titulo: "Los Pasos Perdidos", fecha_publicacion: ISODate("1953-01-01"), sinopsis: "Una novela de Alejo Carpentier que narra la experiencia de un músico cubano que viaja a América Latina, enfrentando sus propios dilemas existenciales.", disponibilidad: true, paginas: 330, generos: ["Historia", "Ficción"], autores: ["Alejo Carpentier"] },
    { titulo: "El Siglo de las Luces", fecha_publicacion: ISODate("1962-01-01"), sinopsis: "Una novela de Alejo Carpentier que explora el impacto de la Revolución Francesa en Cuba y América Latina.", disponibilidad: true, paginas: 350, generos: ["Historia", "Ficción"], autores: ["Alejo Carpentier"] },
    
    { titulo: "Pedro Páramo", fecha_publicacion: ISODate("1955-01-01"), sinopsis: "Una novela de Juan Rulfo que explora la historia de un joven que viaja a Comala, un pueblo donde descubre las voces de los muertos.", disponibilidad: true, paginas: 250, generos: ["Ficción", "Misterio"], autores: ["Juan Rulfo"] },
    { titulo: "El Llano en Llamas", fecha_publicacion: ISODate("1953-01-01"), sinopsis: "Una colección de cuentos de Juan Rulfo que capturan las luchas sociales y existenciales de los habitantes de un pueblo mexicano en el campo.", disponibilidad: true, paginas: 280, generos: ["Ficción", "Misterio"], autores: ["Juan Rulfo"] },
    
    { titulo: "Inundación Castálida", fecha_publicacion: ISODate("1689-01-01"), sinopsis: "Una obra literaria de Sor Juana Inés de la Cruz que refleja su profundo conocimiento de la teología, la poesía y la filosofía.", disponibilidad: true, paginas: 210, generos: ["No Ficción", "Ficción"], autores: ["Sor Juana Inés de la Cruz"] },
    { titulo: "Carta Atenagórica", fecha_publicacion: ISODate("1700-01-01"), sinopsis: "Una carta escrita por Sor Juana Inés de la Cruz en la que defiende el derecho de las mujeres a la educación y la intelectualidad.", disponibilidad: true, paginas: 150, generos: ["No Ficción", "Ficción"], autores: ["Sor Juana Inés de la Cruz"] },
    
    { titulo: "Cuentos de la Selva", fecha_publicacion: ISODate("1918-01-01"), sinopsis: "Una colección de cuentos de Horacio Quiroga que reflejan la vida y los peligros de la selva misionera en Argentina y Uruguay.", disponibilidad: true, paginas: 220, generos: ["Ficción", "Misterio"], autores: ["Horacio Quiroga"] },
    { titulo: "Los Buques Suicidantes", fecha_publicacion: ISODate("1937-01-01"), sinopsis: "Una obra de Horacio Quiroga que narra los misterios y las tragedias de un hombre que se enfrenta a la muerte a través de la literatura.", disponibilidad: true, paginas: 180, generos: ["Ficción", "Misterio"], autores: ["Horacio Quiroga"] },
    
    { titulo: "Las Venas Abiertas de América Latina", fecha_publicacion: ISODate("1971-01-01"), sinopsis: "Una obra de Eduardo Galeano que describe las injusticias económicas y sociales sufridas por América Latina a lo largo de su historia.", disponibilidad: true, paginas: 220, generos: ["Historia", "No Ficción"], autores: ["Eduardo Galeano"] },
    { titulo: "Memoria del Fuego", fecha_publicacion: ISODate("1986-01-01"), sinopsis: "Una trilogía de Eduardo Galeano que relata la historia de América Latina, desde sus inicios hasta el siglo XX, mediante una mirada crítica y poética.", disponibilidad: true, paginas: 350, generos: ["Historia", "No Ficción"], autores: ["Eduardo Galeano"] },
    
    { titulo: "La Templanza", fecha_publicacion: ISODate("2015-03-17"), sinopsis: "Una novela de María Dueñas que narra la historia de un hombre que se ve envuelto en el mundo del vino y el comercio durante el siglo XIX en México.", disponibilidad: true, paginas: 400, generos: ["Historia", "Romántico"], autores: ["María Dueñas"] },
    { titulo: "El Tiempo entre Costuras", fecha_publicacion: ISODate("2009-06-25"), sinopsis: "Una novela de María Dueñas que relata la historia de una joven costurera durante la Guerra Civil Española, entrelazando amor y espionaje.", disponibilidad: true, paginas: 450, generos: ["Historia", "Romántico"], autores: ["María Dueñas"] },
    { titulo: "Las Hijas del Capitán", fecha_publicacion: ISODate("2018-06-14"), sinopsis: "Una historia sobre tres hermanas que luchan por salir adelante después de la muerte de su padre, un capitán de barco.", disponibilidad: true, paginas: 380, generos: ["Romántico", "Ficción"], autores: ["María Dueñas"] },
    
    { titulo: "Artificial Respiration", fecha_publicacion: ISODate("1980-01-01"), sinopsis: "Una novela de Ricardo Piglia que explora la historia de un joven argentino y su relación con el arte, la política y la historia del país.", disponibilidad: true, paginas: 330, generos: ["Ficción", "Historia"], autores: ["Ricardo Piglia"] },
    { titulo: "The Absent City", fecha_publicacion: ISODate("1992-01-01"), sinopsis: "Una novela de Ricardo Piglia sobre la historia de un hombre que busca entender la ciudad de Buenos Aires a través de los ojos de otros.", disponibilidad: true, paginas: 320, generos: ["Ficción", "Historia"], autores: ["Ricardo Piglia"] },
    
    { titulo: "Los Heraldos Negros", fecha_publicacion: ISODate("1919-01-01"), sinopsis: "Un libro de poesía de César Vallejo que aborda el sufrimiento, la muerte y la angustia existencial, con un estilo profundamente emocional.", disponibilidad: true, paginas: 180, generos: ["Ficción", "No Ficción"], autores: ["César Vallejo"] },
    { titulo: "Trilce", fecha_publicacion: ISODate("1922-01-01"), sinopsis: "Una obra innovadora de César Vallejo que mezcla simbolismo, vanguardismo y surrealismo para explorar la vida humana, el sufrimiento y el amor.", disponibilidad: true, paginas: 240, generos: ["Ficción", "No Ficción"], autores: ["César Vallejo"] },
    { titulo: "Poemas Humanos", fecha_publicacion: ISODate("1939-01-01"), sinopsis: "Una colección de poemas de César Vallejo en los que el autor reflexiona sobre la injusticia social, la guerra y las dificultades humanas.", disponibilidad: true, paginas: 210, generos: ["Ficción", "No Ficción"], autores: ["César Vallejo"] },
    
    { titulo: "Los Ríos Profundos", fecha_publicacion: ISODate("1958-01-01"), sinopsis: "Una novela de José María Arguedas que relata la vida de un joven en los Andes peruanos y su relación con la cultura indígena y mestiza.", disponibilidad: true, paginas: 350, generos: ["Ficción", "Historia"], autores: ["José María Arguedas"]},
    { titulo: "El Zorro de Arriba y el Zorro de Abajo", fecha_publicacion: ISODate("1965-01-01"), sinopsis: "Una novela de José María Arguedas que narra el conflicto entre la tradición andina y la modernidad urbana en Perú.", disponibilidad: true, paginas: 400, generos: ["Ficción", "Historia"], autores: ["José María Arguedas"]},
    
    { titulo: "Un Mundo para Julius", fecha_publicacion: ISODate("1970-01-01"), sinopsis: "Una novela de Alfredo Bryce Echenique que cuenta la vida de un niño en Lima, explorando la desconexión de la clase alta peruana con la realidad social.", disponibilidad: true, paginas: 280, generos: ["Ficción", "Historia"], autores: ["Alfredo Bryce Echenique"]},
    { titulo: "La Amistad", fecha_publicacion: ISODate("2002-01-01"), sinopsis: "Una obra de Alfredo Bryce Echenique que explora las relaciones personales y la vida cotidiana de un hombre que busca un sentido en su existencia.", disponibilidad: true, paginas: 330, generos: ["Ficción"], autores: ["Alfredo Bryce Echenique"]},
    { titulo: "El Huésped", fecha_publicacion: ISODate("2001-01-01"), sinopsis: "Una novela de Alfredo Bryce Echenique sobre un hombre que trata de comprender la soledad y las conexiones humanas en un mundo cada vez más alienante.", disponibilidad: true, paginas: 290, generos: ["Ficción"], autores: ["Alfredo Bryce Echenique"]},
    
    { titulo: "Peruana", fecha_publicacion: ISODate("1872-01-01"), sinopsis: "Una colección de relatos y leyendas de Ricardo Palma que exploran mitos, supersticiones y misterios populares del Perú.", disponibilidad: true, paginas: 200, generos: ["Ficción", "Historia"], autores: ["Ricardo Palma"]},
    { titulo: "Cuentos de la Abuela", fecha_publicacion: ISODate("1890-01-01"), sinopsis: "Una serie de cuentos populares peruanos recopilados y adaptados por Ricardo Palma, explorando la cultura popular de su país.", disponibilidad: true, paginas: 250, generos: ["Ficción", "Historia"], autores: ["Ricardo Palma"]}
]);

// Creacion de Usuarios:
db.Usuarios.insertMany([
    { nombre: "Rodrigo", apellido_paterno: "Infanzón", apellido_materno: "Acosta", "telefono": "948899033", direccion: "Av. Principal 123, Lima", clave: "admin", fecha_nacimiento: ISODate("2004-04-16"), token : "" },
    { nombre: "Daniel", apellido_paterno: "Aguilar", apellido_materno: "Chirinos", "telefono": "943728489", direccion: "Calle Secundaria 456, Lima", clave: "admin", fecha_nacimiento: ISODate("2004-04-16"), token: "" },
    { nombre: "Enyel", apellido_paterno: "Panta", apellido_materno: "Huaracha", "telefono": "919056254", direccion: "Av. Lima", clave: "admin", fecha_nacimiento: ISODate("2005-04-23"), token: ""}
]);