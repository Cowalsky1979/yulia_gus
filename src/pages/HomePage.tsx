import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Idea } from '../types';

function GalleryPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Позже заменим на реальный запрос к бэкенду
    console.log('Загрузка идей...');
    setLoading(false);
  }, []);

  if (loading) return <div>Загрузка идей...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Галерея идей</h1>
      {ideas.length === 0 ? (
        <p>Пока нет идей. Будьте первым, кто добавит идею!</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
          {ideas.map((idea) => (
            <div
              key={idea.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                width: '280px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <h3>{idea.name}</h3>
              <p><strong>Автор:</strong> {idea.nick}</p>
              <p>{idea.description}</p>
              <Link to={`/edit/${idea.id}`}>
                <button>Редактировать</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GalleryPage;