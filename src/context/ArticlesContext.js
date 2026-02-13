import React, { createContext, useState, useContext } from 'react';

const ArticlesContext = createContext();

const initialArticles = [
  {
    id: 1,
    title: "Путешествие по вкусам: Секреты аутентичной неаполитанской пиццы",
    author: "Автор: Мистер Х",
    date: "28.02.2025",
    preview: "Когда речь заходит о пицце, в воображении сразу возникает образ забыть обо всём на свете, рождается в Неаполе. И это не просто блюдо, это целая культура, передаваемая из поколения в поколение.",
    fullText: "Неаполитанская пицца — это история о простоте, которая требует высочайшего мастерства. Истинные пиццайоло следуют строгим правилам, касающимся муки, воды, дрожжей и, конечно же, печи. Это искусство, которое невозможно имитировать.",
  },
  {
    id: 2,
    title: "Забытое искусство письма от руки: почему стоит вернуться к перу и бумаге",
    author: "Автор: Мистер Х",
    date: "28.02.2025",
    preview: "В эпоху цифровых технологий, когда клавиатура и сенсорный экран стали продолжением наших рук, кажется, что письмо от руки сообщение или электронное...",
    fullText: "Однако стоит ли так легко отказываться от этого древнего навыка? Исследования показывают, что ручное письмо стимулирует когнитивные функции мозга иначе, чем набор текста, улучшая запоминание информации и креативность.",
  },
];

export const ArticlesProvider = ({ children }) => {
  const [articles, setArticles] = useState(initialArticles);

  const addArticle = (text) => {
    if (!text || text.trim().length === 0) return;
    
    const words = text.trim().split(/\s+/);
    const title = words.slice(0, 8).join(' ') + (words.length > 8 ? '...' : '');
    const preview = text.length > 150 ? text.substring(0, 150) + '...' : text;
    
    const newArticle = {
      id: Date.now(),
      title: title,
      author: "Автор: Мистер Х",
      date: new Date().toLocaleDateString('ru-RU'),
      preview: preview,
      fullText: text,
    };
    
    setArticles(prev => [newArticle, ...prev]);
  };

  return (
    <ArticlesContext.Provider value={{ articles, addArticle }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useArticles must be used within ArticlesProvider');
  }
  return context;
};
