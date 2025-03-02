const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(express.json());
morgan.token('post-data', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ''; 
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));


let persons = [
    { id: "1", name: "Arto Hellas", number: "040-123456" },
    { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
    { id: "3", name: "Dan Abramov", number: "12-43-234345" },
    { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
];

app.get('/api/persons', (req, res) => {
    res.json(persons);
});
app.get('/info', (req, res) => {
    const numEntries = persons.length;
    const currentTime = new Date().toString();

    res.send(`
        <p>Phonebook has info for ${numEntries} people</p>
        <p>${currentTime}</p>
    `);
});

    app.get('/api/persons/:id', (req, res) => {
        const id = req.params.id;  
        const person = persons.find(p => p.id === id); 
    
        if (!person) {
            return res.status(404).json({ error: 'Person not found' });
        }
    
        res.json(person);
    });
    app.delete('/api/persons/:id', (req, res) => {
        const id = req.params.id;
        const personExists = persons.some(p => p.id === id);
    
        if (!personExists) {
            return res.status(404).json({ error: 'Person not found' });
        }
    
        persons = persons.filter(p => p.id !== id); 
    
        res.status(204).end();
    });
    app.use(express.json()); 

    app.post('/api/persons', (req, res) => {
        const { name, number } = req.body;
    
      

    
        const newPerson = {
            id: Math.floor(Math.random() * 1000000).toString(), 
            name,
            number
        };
    
        persons.push(newPerson); 
    
        res.status(201).json(newPerson); 
      });



const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
