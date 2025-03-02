const express = require('express');
const app = express();

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
    app.use(express.json()); // Middleware to parse JSON requests

    app.post('/api/persons', (req, res) => {
        const { name, number } = req.body;
    
        // Check if name or number is missing
        if (!name || !number) {
            return res.status(400).json({ error: 'Name or number is missing' });
        }
    
        
        const nameExists = persons.some(p => p.name === name);
        if (nameExists) {
            return res.status(400).json({ error: 'Name must be unique' });
        }
    
        const newPerson = {
            id: Math.floor(Math.random() * 1000000).toString(), // Convert to string
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
