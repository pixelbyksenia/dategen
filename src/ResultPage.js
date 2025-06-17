import React from 'react';
import './ResultPage.css';

function ResultPage({ formData, onBack }) {
  const generateDescription = (data) => {
    const age = data.birthDate ? Math.floor((new Date() - new Date(data.birthDate)) / (365.25 * 24 * 60 * 60 * 1000)) : '';
    const zodiacSigns = {
      aries: 'Овен', taurus: 'Телец', gemini: 'Близнецы', cancer: 'Рак',
      leo: 'Лев', virgo: 'Дева', libra: 'Весы', scorpio: 'Скорпион',
      sagittarius: 'Стрелец', capricorn: 'Козерог', aquarius: 'Водолей', pisces: 'Рыбы'
    };
    const eyeColors = {
      brown: 'карие', blue: 'голубые', green: 'зеленые', gray: 'серые',
      hazel: 'ореховые', amber: 'янтарные', heterochromia: 'разные'
    };
    const gender = data.gender === 'male' ? 'мужчина' : 'женщина';
    const relationshipGoals = {
      serious: 'серьезные отношения', friendship: 'дружбу', flirt: 'флирт', marriage: 'брак', casual: 'несерьезные отношения'
    };
    const maritalStatus = {
      single: data.gender === 'male' ? 'не женат' : 'не замужем',
      divorced: data.gender === 'male' ? 'разведен' : 'разведена',
      inRelationship: 'в отношениях',
      widowed: data.gender === 'male' ? 'вдовец' : 'вдова'
    };

    // Склонение для возраста
    const getAgeDeclension = (age) => {
      const lastDigit = age % 10;
      const lastTwoDigits = age % 100;
      
      if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return 'лет';
      } else if (lastDigit === 1) {
        return 'год';
      } else if (lastDigit >= 2 && lastDigit <= 4) {
        return 'года';
      } else {
        return 'лет';
      }
    };

    // Склонение для детей
    const getChildrenDeclension = (count) => {
      const lastDigit = count % 10;
      const lastTwoDigits = count % 100;
      
      if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return 'детей';
      } else if (lastDigit === 1) {
        return 'ребенок';
      } else if (lastDigit >= 2 && lastDigit <= 4) {
        return 'ребенка';
      } else {
        return 'детей';
      }
    };

    let description = `${data.name} — ${age}-${getAgeDeclension(age)} ${gender} с ${eyeColors[data.eyeColor]} глазами. `;
    
    if (data.hobbies.length > 0) {
      const hobbiesText = data.hobbies.join(', ');
      description += `Увлекается ${hobbiesText}. `;
    }

    description += `Рост ${data.height} см, вес ${data.weight} кг. `;
    description += `По знаку зодиака — ${zodiacSigns[data.zodiacSign]}. `;

    if (data.maritalStatus) {
      description += `Семейное положение: ${maritalStatus[data.maritalStatus]}. `;
    }

    if (data.hasChildren === 'yes') {
      description += `Есть ${data.childrenCount} ${getChildrenDeclension(data.childrenCount)}`;
      if (data.childrenLiveTogether === 'yes') {
        description += ', живут вместе. ';
      } else {
        description += ', живут отдельно. ';
      }
    }

    description += `Цель — ${relationshipGoals[data.relationshipGoal]}. `;

    // Добавляем персонализированные фразы в зависимости от данных
    if (data.hobbies.includes('Путешествия')) {
      description += 'Любит открывать новые места и знакомиться с разными культурами. ';
    }
    if (data.hobbies.includes('Спорт')) {
      description += 'Ведет активный образ жизни и ценит физическую активность. ';
    }
    if (data.hobbies.includes('Чтение')) {
      description += 'Интеллектуально развит и любит глубокие разговоры. ';
    }
    if (data.hobbies.includes('Музыка')) {
      description += 'Чувствительная натура с развитым вкусом к искусству. ';
    }

    // Добавляем фразы в зависимости от возраста
    if (age < 25) {
      description += 'Молодой и энергичный, готов к новым впечатлениям. ';
    } else if (age < 35) {
      description += 'Зрелый и целеустремленный, знает чего хочет от жизни. ';
    } else {
      description += 'Опытный и мудрый, ценит качество отношений. ';
    }

    return description;
  };

  return (
    <div className="result-page">
      <div className="result-container">
        <h1>{formData.name}</h1>
        <div className="description">
          {generateDescription(formData)}
        </div>
        <button onClick={onBack} className="back-button">
          Вернуться к форме
        </button>
      </div>
    </div>
  );
}

export default ResultPage; 