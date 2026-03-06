const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database("db.sqlite");

// Create table
db.run(`
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    priority TEXT DEFAULT 'Medium',
    isDone INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

// GET all tasks
app.get("/tasks", (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        res.json(rows);
    });
});

// ADD task
app.post("/tasks", (req, res) => {
    const { title, priority } = req.body;

    db.run(
        "INSERT INTO tasks (title, priority) VALUES (?, ?)",
        [title, priority],
        function (err) {
            res.json({ id: this.lastID });
        }
    );
});

// UPDATE task
app.put("/tasks/:id", (req, res) => {
    const { title, priority } = req.body;

    db.run(
        "UPDATE tasks SET title=?, priority=? WHERE id=?",
        [title, priority, req.params.id],
        () => {
            res.json({ updated: true });
        }
    );
});

// TOGGLE status
app.patch("/tasks/:id/status", (req, res) => {
    db.run(
        "UPDATE tasks SET isDone = NOT isDone WHERE id=?",
        [req.params.id],
        () => {
            res.json({ toggled: true });
        }
    );
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
    db.run(
        "DELETE FROM tasks WHERE id=?",
        [req.params.id],
        () => {
            res.json({ deleted: true });
        }
    );
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});