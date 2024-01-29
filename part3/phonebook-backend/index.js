const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('responseBody', function (request, response) {
  return request.method === 'POST' ? ` - ${JSON.stringify(request.body)}` : ''
})

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }

const unknownEndpoint = (request, response) => {
  console.log("Error: unknown endpoint")
  response.status(404).send({ error: "unknown endpoint" })
}

app.use(express.json())
//app.use(cors())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :responseBody'))

app.use((req, res, next) => {
  const oldSend = res.send;

  res.send = function (data) {
    res.body = data;
    oldSend.apply(res, arguments)
  }
  next();
})

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(prs => prs.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/api/info', (request, response) => {
  response.send(`Phonebook has info for ${persons.length} people\n${Date()}`)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(prs => prs.id === id)

  if (person) {
    persons = persons.filter(prs => prs.id !== id)
    response.status(201).send({ message: "Item deleted successfully" })
  } else {
    response.status(404).send({ error: "Item not found" })
  }

})

const generateId = () => {
  const id = Math.floor(Math.random() * 999999)
  return id
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  let bad = false
  if (!body.number || body.number === "" || !body.name || body.name === "") {
    bad = true
    response.status(400).send({ error: "There isn't a phone number or name" })
  }
  const person = persons.find(prs => prs.name === body.name)
  if (person) {
    bad = true
    response.status(400).send({ error: `${body.name} is already on the list` })
  }
  if (!bad) {
    const newPerson = {
      "id": generateId(),
      "name": body.name,
      "number": body.number
    }
    persons = persons.concat(newPerson)
    //console.log(newPerson)
    response.json(newPerson)
  }
})

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})