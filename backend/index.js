const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Message = require('./models/message');
const Project = require('./models/project');
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/portfolio')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.log(err);
    });
app.get('/', (req, res) => {
    res.json({
        message: 'Portfolio API is working'
    });
});
app.post('/message', async (req, res) => {
    const { name, email, subject, message } = req.body;
    const myMessage = await Message.create({name,email,subject,message});
    res.json({
        message: 'Message added successfully',
        data: myMessage
    });
});
app.post('/projects', async (req, res) => {
    const { title, description, image, link } = req.body;
    const project = await Project.create({
        title,
        description,
        image,
        link
    });
    res.json({
        message: 'Project added successfully',
        data: project
    });
});
app.get('/projects', async (req, res) => {
    const projects = await Project.find();
    res.json({ message: 'Projects data',data: projects
    });
});
app.put('/projects/:id', async (req, res) => {
    const { title, description, image, link } = req.body;
    const project = await Project.findByIdAndUpdate(
        req.params.id,
        {
            title,
            description,
            image,
            link
        },
        {
            new: true
        }
    );
    res.json({
        message: 'Project updated successfully',
        data: project
    });
});
app.delete('/projects/:id', async (req, res) => {
    const project = await Project.findByIdAndDelete(
        req.params.id
    );
    res.json({
        message: 'Project deleted successfully',
        data: project
    });
});
app.get('/messages', async (req, res) => {
    const messages = await Message.find();
    res.json({
        message: 'Messages data',
        data: messages
    });
});
app.listen(3000, () => {
    console.log('Server running on port 3000');
});