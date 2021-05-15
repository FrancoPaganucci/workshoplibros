const express = require("express");
const server = express();

// MIDDLEWARES
server.use(express.json());

// === VALIDAR AUTOR ===
const validarAutor = (req,res,next) => {
    const autor_id = req.params.id;
    const autor_ok = BIBLIOGRAFIA.find(autor => autor.id == autor_id);
    console.log(autor_ok);
    if (!autor_ok) {
        res.status(400).json({error: `Autor con id ${autor_ok} no existe.`});
    } else {
        next();
    };
};

// === VALIDAR LIBRO ===
const validarLibro = (req,res,next) => {
    // Acá no importa validar autor_id porque ya lo hizo el middleware anterior
    const autor_id = req.params.id;
    const id_libro = req.params.idLibro;
    const autor_ok = BIBLIOGRAFIA.find(autor => autor.id == autor_id);
    const libro_ok = autor_ok.libros.find(libro => libro.id == id_libro);
    if (!libro_ok) {
        res.status(400).json({error: `Libro con id ${autor_ok} no existe.`});
    } else {
        next();
    }
}

// VARIABLES
const PORT = 3000;
const BIBLIOGRAFIA = [
    {
        id: 1,
        nombre: "Jorge Luis",
        apellido: "Borges",
        pais: "Argentina",
        libros: [
            {
                id: 1,
                titulo: "Ficciones",
                año: 1944,
                descripcion: "Libro de cuentos cortos. Incluye un prólogo escrito por el autor y los siguientes cuentos: Tlön, Uqbar, Orbis Tertius, El acercamiento a Almotásim, Pierre Menard, autor del Quijote, Las ruinas circulares, La lotería en Babilonia, Examen de la obra de Herbert Quain, La biblioteca de Babel y El jardín de senderos que se bifurcan."
            },
            {
                id: 2,
                titulo: "El Aleph",
                año: 1949,
                descripcion: "uno de los libros de cuentos más representativos del escritor argentino Jorge Luis Borges. Esta obra marca un punto de inflexión respecto al estilo que destilaba su colección anterior de cuentos, Ficciones; aun manteniendo su estilo sobrio y perfeccionista, el escritor aborda aquí otra serie de eventos u objetos inverosímiles enmarcados en un ambiente realista, lo que contribuye a resaltar su carácter fantástico."
            }
        ]
    },
    {
        id: 2,
        nombre: "Herman",
        apellido: "Hesse",
        pais: "Alemania/Suiza",
        libros: [
            {
                id: 1,
                titulo: "Siddhartha",
                año: 1922,
                descripcion: "Siddhartha es una novela alegórica escrita por Hermann Hesse en 1922 tras la primera guerra mundial. La misma relata la vida de un hombre hindú llamado Siddhartha. La obra ha sido considerada por el autor como un «poema hindú» y también, como la expresión esencial de su forma de vida."
            },
            {
                id: 2,
                titulo: "El lobo estepario",
                año: 1927,
                descripcion: "Décima novela de Hesse, es uno de los títulos más célebres del escritor, que combina el estilo autobiográfico con algunos elementos de fantasía, especialmente hacia el final de la obra. El libro es en gran parte un reflejo de la profunda crisis espiritual que sufrió Hesse en la década de 1920, mientras retrata la división del protagonista entre su humanidad y su lobuna apariencia huraña, su agresividad y su desarraigo."
            }
        ]
    },
    {
        id: 3,
        nombre: "Haruki",
        apellido: "Murakami",
        pais: "Japón",
        libros: [
            {
                id: 1,
                titulo: "Kafka en la orilla",
                año: 2002,
                descripcion: "Novela japonesa de Haruki Murakami publicada en 2002. A finales de 2005, los críticos del suplemento literario del New York Times proclamaron Kafka en la orilla la mejor novela del año. La obra consta de dos historias diferentes, pero relacionadas entre sí. La narrativa avanza y retrocede entre las historias, alternando capítulos para contar cada historia."
            },
            {
                id: 2,
                titulo: "1Q84",
                año: 2009,
                descripcion: "El título hace referencia a la novela 1984 de George Orwell, pero se escribe de esa manera porque en japonés, la letra «q» y el número «9» son homófonos y ambos se pronuncian «kyū». Esta referencia se confirma por el contenido del libro. La acción sucede en 1984 cuando Aomame se da cuenta de que se ha introducido en una realidad deformada, a la que llama 1Q84, y además, otro de los personajes tiene un paralelismo con el gran hermano de Orwell."
            }
        ]
    }
];

// =========== ROUTING ============
// traer todos los autores y todos sus libros
server.get('/', (req,res) => {
    console.log("GET ALL");
    res.status(200).json(BIBLIOGRAFIA);
});

// ====> /autores/:id/libros
// GET --> devuelve todos los libros según un autor
server.get('/autores/:id/libros', validarAutor,(req,res) => {
    const autor_id = req.params.id;
    const autor_ok = BIBLIOGRAFIA.find(autor => autor.id == autor_id);
    res.status(200).json(autor_ok.libros);
});

// POST --> agrega un nuevo libro al autor
server.post('/autores/:id/libros', validarAutor, (req,res) => {
    const autor_id = req.params.id;
    const autor_ok = BIBLIOGRAFIA.find(autor => autor.id == autor_id);
    const NUEVO_LIBRO = {
        id: autor_ok.libros.length + 1,
        titulo: req.body.titulo,
        año: req.body.año,
        descripcion: req.body.descripcion
    };
    autor_ok.libros.push(NUEVO_LIBRO);
    res.status(200).json(NUEVO_LIBRO);
});

// ====> /autores/:id/libros:idLibro
// GET --> devuelve libro con el id indicado del autor
server.get('/autores/:id/libros/:idLibro', validarAutor, validarLibro, (req,res) => {
    const autor_id = req.params.id;
    const autor_ok = BIBLIOGRAFIA.find(autor => autor.id == autor_id);
    const libro_id = req.params.idLibro;
    const libro_ok = autor_ok.libros.find(libro => libro.id == libro_id);
    res.status(200).json(libro_ok);
});

// PUT --> modifica el libro con el id indicado del autor


// DELETE --> elimina el libro con el id indicado del autor


// ========== PORT =============
server.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});