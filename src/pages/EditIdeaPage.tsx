import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditIdeaPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [nick, setNick] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // ЗАГРУЖАЕМ ДАННЫЕ ИДЕИ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
  useEffect(() => {
    const loadIdea = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/ideas/${id}`);

        if (!response.ok) {
          throw new Error('Идея не найдена');
        }

        const data = await response.json();
        setNick(data.nick);
        setName(data.name);
        setDescription(data.description);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadIdea();
    }
  }, [id]);

  // ОТПРАВЛЯЕМ ОБНОВЛЕННЫЕ ДАННЫЕ НА СЕРВЕР
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:3001/ideas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nick,
          name,
          description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка при обновлении');
      }

      navigate('/gallery');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Загрузка данных идеи...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '50px' }}>{error}</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>Редактирование идеи #{id}</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Никнейм:</label>
          <input
            type="text"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            required
            disabled={isSubmitting}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Название:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isSubmitting}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Описание:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            disabled={isSubmitting}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              backgroundColor: '#ffc107',
              color: 'black',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/gallery')}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditIdeaPage;