import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
function EditIdeaPage() {
 const { id } = useParams(); // получаем id из URL
 const navigate = useNavigate();
 const [nick, setNick] = useState('');
 const [name, setName] = useState('');
 const [description, setDescription] = useState('');
 const [loading, setLoading] = useState(true);
 useEffect(() => {
 // TODO: Загрузить данные идеи по id из URL
 console.log(`Загрузка идеи с id: ${id}`);
 setLoading(false);
 }, [id]);
 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 // TODO: Отправить обновленные данные на сервер
 console.log(`Обновление идеи ${id}:`, { nick, name, description });
 alert('Сохранение будет доступно после настройки бэкенда!');
 };
 if (loading) return <div>Загрузка...</div>;
 return (
 <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
 <h1>Редактирование идеи #{id}</h1>
 <form onSubmit={handleSubmit}>
 <div style={{ marginBottom: '16px' }}>
    <label>Никнейм:</label>
 <input
 type="text"
 value={nick}
 onChange={(e) => setNick(e.target.value)}
 required
 style={{ width: '100%', padding: '10px', marginTop: '8px' }}
 />
 </div>
 <div style={{ marginBottom: '16px' }}>
 <label>Название:</label>
 <input
 type="text"
 value={name}
 onChange={(e) => setName(e.target.value)}
 required
 style={{ width: '100%', padding: '10px', marginTop: '8px' }}
 />
 </div>
 <div style={{ marginBottom: '16px' }}>
 <label>Описание:</label>
 <textarea
 value={description}
 onChange={(e) => setDescription(e.target.value)}
 required
 rows={4}
 style={{ width: '100%', padding: '10px', marginTop: '8px' }}
 />
 </div>
 <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
 Сохранить изменения
 </button>
 </form>
 </div>
 );
}
export default EditIdeaPage;