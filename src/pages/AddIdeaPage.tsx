import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function AddIdeaPage() {
 // useState - хук для создания состояния компонента
 // [значение, функция_для_изменения] = useState(начальное_значение)
 const [nick, setNick] = useState('');
 const [name, setName] = useState('');
 const [description, setDescription] = useState('');
 const navigate = useNavigate(); // для перенаправления
 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault(); // предотвращаем перезагрузку страницы
 // TODO: Отправить данные на сервер
 console.log({ nick, name, description });
 alert('Идея будет отправлена после настройки бэкенда!');
 };
 return (
 <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
 <h1>Добавить новую идею</h1>
 <form onSubmit={handleSubmit}>
 <div style={{ marginBottom: '16px' }}>
 <label>Ваш никнейм:</label>
 <input
 type="text"
 value={nick}
 onChange={(e) => setNick(e.target.value)}
 required
 style={{ width: '100%', padding: '10px', marginTop: '8px' }}
 />
 </div>
 <div style={{ marginBottom: '16px' }}>
 <label>Название идеи:</label>
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
 Опубликовать идею
 </button>
 </form>
 </div>
 );
}
export default AddIdeaPage;
