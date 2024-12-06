console.clear();
console.log('Iniciando practica-premios');

const express = require ('express')

const app = express() 

const { v4 } = require('uuid');

let premiosMTV = [
    {
      _id: v4(),
      categoria: "Mejor Artista",
      ganador: "Taylor Swift",
      anio: 2023,
    },
    {
      _id: v4(),
      categoria: "Mejor Video",
      ganador: "Harry Styles - As It Was",
      anio: 2022, // Cambié el año aquí
    },
    {
      _id: v4(),
      categoria: "Mejor Grupo",
      ganador: "BTS",
      anio: 2023,
    },
    {
      _id: v4(),
      categoria: "Artista Revelacion",
      ganador: "Ice Spice",
      anio: 2023,
    },
    {
      _id: v4(),
      categoria: "Mejor Colaboracion",
      ganador: "Shakira y Karol G - TQG",
      anio: 2023,
    },
  ];
// para recibir información del form // Middleware
app.use (express.urlencoded({extended: false}))

// Busco elementos (TODOS)
app.get ('/', (req, res, next) => {
    try {
        res.status(200).json(premiosMTV)
    } catch (error) {
        next(error)
    }
})
 
// Busco un elemento (SOLO UNO)
app.get ('/premios/id/:_id', (req, res, next) => {
    try {
        const {_id} = req.params
        const busqueda = premiosMTV.find(premio => premio._id == _id)
        res.status(200).json(busqueda)
    } catch (error) {
        next(error)
    }
})

// Añado un elemento 
app.post ('/premios', (req, res, next) => {
    try {

        const { categoria, ganador, anio } = req.body

        // Creo el nuevo premio 
        let nuevo = {_id: v4(), categoria, ganador, anio}
        premiosMTV = [nuevo, ...premiosMTV ]
        res.status(200).jsonp(premiosMTV)

    } catch (error) {
        next(error)
    }
})

// Modifico un elemento  
app.put ('/premios', (req, res, next) => {
    try {
        // Recibo datos por Body
        // Guardo todas las propiedades en un nuevo Object datos
        const { _id, ...datos} = req.body

        const buscar = premiosMTV.findIndex (premio => premio._id == _id)

        premiosMTV[buscar] = {...req.body}

        res.status(200).json (premiosMTV)

    } catch (error) {
        next(error)
    }
})

// Elimino un elemento 
app.delete ('/premios/id/:_id', (req, res, next) => {
    try {

        const {_id} = req.params
        const busqueda = premiosMTV.filter(premio => premio._id != _id)
        
        premiosMTV = busqueda
        
        res.status(200).json(premiosMTV)


    } catch (error) {
        next(error)
    }
}) 

// Middleware para gestionar errores
        app.use(( req , res , next  )=>{
            let error = new Error()
                error.message = 'No encuentro el Endpoint'
                error.status  = 404
                next(error)
        })

        app.use(( error , req , res , next  )=>{
                let { status , message } = error
                    status = status || 500
                
                res.status(status).json(`Error en la API: ${message}`)
        })

app.listen (3000, (req, res) => {
    console.log('Puerto OK');
    
})