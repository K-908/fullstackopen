const express = require('express');
const morgan = require('morgan')
const cors = require('cors')

const app = express();

app.use(cors())

app.use(express.json())
app.use((request, response, next) => {
  if (request.method === 'POST') {
    morgan(':method :url :status :res[content-length] - :response-time ms :post')(request, response, next);
  } else {
    next()
  }
});
app.use(morgan('tiny'))


morgan.token('post', function (request, response) {
  return request.method === 'POST' ? (JSON.stringify(request.body)) : ''
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
  response.send('<h1>Helo World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(prs => prs.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).send({ error: 'Person not found' })
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(prs => prs.id !== id)

  response.status(204).end()
})

const getNextId = () => {
  const id = persons.length > 0
    ? Math.max(...persons.map(prs => prs.id))
    : 0
  return id + 1
}

const generateNumber = () => {
  let number = ''
  for (let i = 0; i < 10; i++) {
    number += (Math.floor(Math.random() * 10)).toString()
    if (i === 1 || i === 3) {
      number += '-'
    }
  }
  return number
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({
      error: 'Name missing'
    })
  }

  if (persons.map(prs => prs.name).includes(body.name)) {
    return response.status(400).json({
      error: 'Name is already on the list'
    })
  }
  let number;
  if (!body.number) {
    number = generateNumber()
  } else {
    number = body.number
  }
  const person = {
    name: body.name,
    id: getNextId(),
    number: number
  }
  persons = persons.concat(person)
  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
