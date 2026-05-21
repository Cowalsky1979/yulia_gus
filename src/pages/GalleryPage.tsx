import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Idea } from "../types";

function GalleryPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Функция загрузки идей с сервера
  const loadIdeas = async () => {
    try {
      setLoading(true);
      // Отправляем GET-запрос на бэкенд
      const response = await fetch("http://localhost:3001/ideas");

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();
      setIdeas(data);
    } catch (err) {
      setError("Не удалось загрузить идеи. Убедитесь, что сервер запущен.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Добавьте эту функцию внутрь компонента GalleryPage, после loadIdeas (30 строка)
  const deleteIdea = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить эту идею?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/ideas/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Ошибка при удалении");
      }

      // Обновляем список - удаляем идею из состояния
      setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea.id !== id));
    } catch (err) {
      alert("Не удалось удалить идею");
      console.error(err);
    }
  };

  // Загружаем идеи при монтировании компонента
  useEffect(() => {
    loadIdeas();
  }, []);

  if (loading) return <div>Загрузка идей...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Галерея идей</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
          justifyContent: "center",
        }}
      >
        {ideas.map((idea) => (
          <div
            key={idea.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              width: "280px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{idea.name}</h3>
            <p>
              <strong>Автор:</strong> {idea.nick}
            </p>
            <p>{idea.description}</p>
            <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
              <Link to={`/edit/${idea.id}`}>
                <button style={{ padding: "6px 12px", cursor: "pointer" }}>
                  Редактировать
                </button>
              </Link>
              <button
                onClick={() => deleteIdea(idea.id)}
                style={{
                  padding: "6px 12px",
                  cursor: "pointer",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                }}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryPage;
