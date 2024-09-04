const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
app.use(express.static('build'))
app.use(cors())

app.use(express.json());
morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return '-'; // Para otros métodos HTTP, retorna un valor por defecto
});

// Función personalizada para morgan en formato personalizado
app.use(morgan((tokens, req, res) => {
  const contentLength = tokens.res(req, res, 'content-length');
  const responseTime = tokens['response-time'](req, res);
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    contentLength,
    '-',
    responseTime + ' ms',
    tokens.body(req)
  ].join(' ');
}));


let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${
      persons.length
    } people</p><p>${new Date().toString()}</p> `
  );
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = persons.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  } else if (persons.map(person => person.name).includes(body.name)) {
    return response.status(400).json({
        error: "name must be unique"
      })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

app.put("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const body = request.body;

  const personIndex = persons.findIndex(person => person.id === id);

  if (personIndex === -1) {
    return response.status(404).json({ error: "Person not found" });
  }

  const updatedPerson = {
    ...persons[personIndex],
    name: body.name,
    number: body.number,
  };

  persons[personIndex] = updatedPerson;

  response.json(updatedPerson);
});


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
