import express, { Request, Response } from "express";

const app = express();
const PORT = 3001;

// Express ДАННЫЕ (храним в памяти, пока без базы данных)
let ideas = [
  {
    id: 1,
    nick: "ДжонДоу",
    name: "Умный будильник",
    description: "Будильник, который анализирует фазы сна",
  },
  {
    id: 2,
    nick: "Креативщик",
    name: "Платформа для обмена навыками",
    description: "Меняю английский на программирование",
  },
  {
    id: 3,
    nick: "Эко-Френдли",
    name: "Карта переработки",
    description: "Точки приема вторсырья с бонусами",
  },
];
let nextId = 4;

// MIDDLEWARE
app.use(express.json()); // Позволяет читать JSON из тела запроса

// Настройка CORS (разрешаем запросы с фронтенда)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ============ ЭНДПОИНТЫ API ============

/**
 * GET /ideas - получить все идеи
 */
app.get("/ideas", (req: Request, res: Response) => {
  res.json(ideas);
});

/**
 * GET /ideas/:id - получить одну идею по ID
 */
app.get("/ideas/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const idea = ideas.find((i) => i.id === id);
  if (!idea) {
    return res.status(404).json({ message: "Идея не найдена" });
  }
  res.json(idea);
});

/**
 * POST /ideas - создать новую идею
 */
app.post("/ideas", (req: Request, res: Response) => {
  const { nick, name, description } = req.body;
  // Валидация - проверяем, что все поля заполнены
  if (!nick || !name || !description) {
    return res.status(400).json({ message: "Все поля обязательны" });
  }
  const newIdea = {
    id: nextId++,
    nick,
    name,
    description,
  };
  ideas.push(newIdea);
  res.status(201).json(newIdea);
});

/**
 * PUT /ideas/:id - полностью обновить идею
 */
app.put("/ideas/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const { nick, name, description } = req.body;
  const index = ideas.findIndex((i) => i.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Идея не найдена" });
  }
  ideas[index] = { id, nick, name, description };
  res.json(ideas[index]);
});

/**
 * DELETE /ideas/:id - удалить идею
 */
app.delete("/ideas/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const index = ideas.findIndex((i) => i.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Идея не найдена" });
  }
  ideas.splice(index, 1);
  res.status(204).send();
});

// ЗАПУСК СЕРВЕРА
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
