
const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

// عرض صفحة التطبيق
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// تخزين المهام مؤقتاً
let tasks = [];

// عرض المهام
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// إضافة مهمة
app.post('/tasks', (req, res) => {
    const task = {
        id: Date.now(),
        title: req.body.title,
        done: false
    };

    tasks.push(task);
    res.status(201).json(task);
});

// تعديل مهمة
app.put('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }

    task.title = req.body.title ?? task.title;
    task.done = req.body.done ?? task.done;

    res.json(task);
});

// حذف مهمة
app.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    tasks = tasks.filter(t => t.id !== id);

    res.json({ message: 'Task deleted' });
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
