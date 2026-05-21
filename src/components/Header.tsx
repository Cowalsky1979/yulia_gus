import { Link } from 'react-router-dom';
export function Header()
 {
 return (
 <header style={{
 backgroundColor: '#282c34',
 padding: '10px 20px',
 marginBottom: '20px'
 }}>
 <nav>
 <Link to="/" style={{
 color: 'white',
 marginRight: '20px',
 textDecoration: 'none'
 }}>
 Главная
 </Link>
 <Link to="/gallery" style={{
 color: 'white',
 marginRight: '20px',
 textDecoration: 'none'
 }}>
 Галерея идей
 </Link>
 <Link to="/add" style={{
 color: 'white',
 textDecoration: 'none'
 }}>
 Добавить идею
 </Link>
 </nav>
 </header>
 );
14
}