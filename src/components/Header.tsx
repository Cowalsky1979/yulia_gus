import { NavLink } from "react-router-dom";

const linkStyle = {
  color: "white",
  marginRight: "20px",
  textDecoration: "none",
};

const activeStyle = {
  ...linkStyle,
  borderBottom: "2px solid white",
  paddingBottom: "2px",
};

export function Header() {
  return (
    <header
      style={{
        backgroundColor: "#282c34",
        padding: "10px 20px",
        marginBottom: "20px",
      }}
    >
      <nav>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
        >
          Главная
        </NavLink>
        <NavLink
          to="/gallery"
          style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
        >
          Галерея идей
        </NavLink>
        <NavLink
          to="/add"
          style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
        >
          Добавить идею
        </NavLink>
        <NavLink
          to="/contacts"
          style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
        >
          Контакты
        </NavLink>
      </nav>
    </header>
  );
}
