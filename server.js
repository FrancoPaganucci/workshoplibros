const express = require("express");
const server = express();

// MIDDLEWARES
server.use(express.json());

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
    console.log("GET ALL")
    res.status(200).json(BIBLIOGRAFIA);
});



// ========== PORT =============
server.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
})