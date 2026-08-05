import express, { Request, Response, NextFunction } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toLocaleString();
    console.log(`[${timestamp}] Incoming Request: ${req.method} to ${req.url}`);
    next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
    const userAgent = req.get("User-Agent");

    if (!userAgent) {
        return res.status(400).json({
            error: "Browser Identification Missing!"
        });
    }

    next();
});

interface Task {
    id: number;
    title: string;
}

let tasks: Task[] = [
    { id: 1, title: "Learn Express" },
    { id: 2, title: "Master REST APIs" }
];

app.get("/tasks", (req: Request, res: Response) => {
    res.json(tasks);
});

app.post("/tasks", (req: Request, res: Response) => {
    const newTask: Task = {
        id: req.body.id != null ? Number(req.body.id) : tasks.length + 1,
        title: req.body.title
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.put("/tasks/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);

    const task = tasks.find(t => t.id === id);

    if (task) {
        task.title = req.body.title;

        res.json({
            message: "Task updated successfully",
            task
        });
    } else {
        res.status(404).json({
            error: "Task not found"
        });
    }
});

app.delete("/tasks/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);

    tasks = tasks.filter(t => t.id !== id);

    res.json({
        message: `Task ${id} deleted`,
        remainingTasks: tasks
    });
});

app.listen(PORT, () => {
    console.log(`REST API Server running at http://localhost:${PORT}`);
});