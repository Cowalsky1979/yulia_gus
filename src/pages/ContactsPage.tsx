import { useState, useRef } from "react";
import avatar from "./assets/avatar.jpg";
import styles from "./ContactsPage.module.css";

function ContactsPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const emailRef = useRef<HTMLSpanElement>(null);

  const validate = () => {
    const newErrors = { name: "", email: "", message: "" };
    if (!formData.name.trim()) newErrors.name = "Введите имя";
    if (!formData.email.trim()) {
      newErrors.email = "Введите email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Некорректный email";
    }
    if (!formData.message.trim()) newErrors.message = "Введите сообщение";
    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.message;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Форма отправлена:", formData);
    alert("Спасибо за обратную связь!");
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setErrors({ name: "", email: "", message: "" });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("student@example.com");
      alert("Email скопирован в буфер обмена!");
    } catch {
      alert("Не удалось скопировать email");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={avatar} alt="Фото профиля" className={styles.avatar} />
        <h1 className={styles.name}>Гусева Юлия</h1>
        <p className={styles.title}>Frontend Developer</p>
        <p className={styles.bio}>
          Создаю современные веб-приложения с фокусом на пользовательский опыт.
          Увлекаюсь React, TypeScript и архитектурой фронтенда.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Контакты</h2>
        <div className={styles.contacts}>
          <div className={styles.emailRow}>
            <span ref={emailRef}>igu@sfedu.ru</span>
            <button className={styles.copyBtn} onClick={copyEmail}>
              Копировать
            </button>
          </div>
          <div className={styles.socials}>
            <a
              href="#"
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="#"
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram
            </a>
            <a
              href="#"
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              VK
            </a>
          </div>
        </div>
      </div>

      {submitted && (
        <div className={styles.successMsg}>
          Сообщение отправлено! Я свяжусь с вами в ближайшее время.
        </div>
      )}

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Обратная связь</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">
              Имя
            </label>
            <input
              id="name"
              className={styles.input}
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Ваше имя"
            />
            {errors.name && <span style={{ color: "red", fontSize: "0.85rem" }}>{errors.name}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className={styles.input}
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="your@email.com"
            />
            {errors.email && <span style={{ color: "red", fontSize: "0.85rem" }}>{errors.email}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="message">
              Сообщение
            </label>
            <textarea
              id="message"
              className={styles.textarea}
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder="Ваше сообщение..."
            />
            {errors.message && <span style={{ color: "red", fontSize: "0.85rem" }}>{errors.message}</span>}
          </div>

          <button type="submit" className={styles.submitBtn}>
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactsPage;
