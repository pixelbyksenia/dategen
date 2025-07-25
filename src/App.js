import React, { useState } from 'react';
import { differenceInYears } from 'date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Autocomplete, TextField, Chip, Slider, Input, FormControlLabel, RadioGroup, Radio, FormControl, FormLabel } from '@mui/material';
import { ru } from 'date-fns/locale';
import './App.css';
import ResultPage from './ResultPage';
import  hobbieOptions  from './hobbieOptions';

function App() {
  const [currentPage, setCurrentPage] = useState('form');
  const [formData, setFormData] = useState({
    name: '',
    birthDate: null,
    gender: '',
    hobbies: [],
    height: 170,
    weight: 70,
    zodiacSign: '',
    eyeColor: '',
    relationshipGoal: '',
    maritalStatus: '',
    hasChildren: '',
    childrenCount: '',
    childrenLiveTogether: ''
  });

  console.log(hobbieOptions);

  const getZodiacSign = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricorn';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'aquarius';
    return 'pisces';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    if (date) {
      const zodiacSign = getZodiacSign(date);
      setFormData(prevState => ({
        ...prevState,
        birthDate: date,
        zodiacSign: zodiacSign
      }));
    }
  };

  const handleHobbiesChange = (event, newValue) => {
    if (newValue.length <= 3) {
      setFormData(prevState => ({
        ...prevState,
        hobbies: newValue
      }));
    }
  }

  const handleHeightChange = (event, newValue) => {
    setFormData(prevState => ({
      ...prevState,
      height: newValue
    }));
  };

  const handleWeightChange = (event, newValue) => {
    setFormData(prevState => ({
      ...prevState,
      weight: newValue
    }));
  };

  const handleWeightBlur = () => {
    if (formData.weight < 0) {
      setFormData(prevState => ({
        ...prevState,
        weight: 0
      }));
    } else if (formData.weight > 200) {
      setFormData(prevState => ({
        ...prevState,
        weight: 200
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Проверяем, что все обязательные поля заполнены
    if (formData.name && formData.birthDate && formData.gender && 
        formData.hobbies.length > 0 && formData.eyeColor && 
        formData.relationshipGoal && 
        formData.maritalStatus && formData.hasChildren) {
      setCurrentPage('result');
    } else {
      alert('Пожалуйста, заполните все обязательные поля');
    }
  };

  const handleBackToForm = () => {
    setCurrentPage('form');
  };

  const getZodiacSignName = (sign) => {
    const signs = {
      aries: 'Овен',
      taurus: 'Телец',
      gemini: 'Близнецы',
      cancer: 'Рак',
      leo: 'Лев',
      virgo: 'Дева',
      libra: 'Весы',
      scorpio: 'Скорпион',
      sagittarius: 'Стрелец',
      capricorn: 'Козерог',
      aquarius: 'Водолей',
      pisces: 'Рыбы'
    };
    return signs[sign] || '';
  };

  if (currentPage === 'result') {
    return <ResultPage formData={formData} onBack={handleBackToForm} />;
  }

  return (
    <div className="App">
      <div className="form-container">
        <h1>Создай свой идеальный профиль</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Имя:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <FormControl component="fieldset">
              <FormLabel component="legend">Пол:</FormLabel>
              <RadioGroup
                row
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <FormControlLabel value="male" control={<Radio />} label="Мужчина" />
                <FormControlLabel value="female" control={<Radio />} label="Женщина" />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="form-group">
            <label>Дата рождения:</label>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
              <DatePicker
                value={formData.birthDate}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    variant: "outlined",
                    className: "mui-date-picker"
                  }
                }}
                maxDate={new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate())}
                minDate={new Date(new Date().getFullYear() - 50, new Date().getMonth(), new Date().getDate())}
                format="dd.MM.yyyy"
              />
            </LocalizationProvider>
            {formData.birthDate && (
              <div className="zodiac-info">
                <p>Знак зодиака: {getZodiacSignName(formData.zodiacSign)}</p>
                <p>Возраст: {differenceInYears(new Date(), formData.birthDate)} лет</p>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Увлечения (максимум 3):</label>
            <Autocomplete
              multiple
              id="hobbies"
              options={hobbieOptions}
              value={formData.hobbies}
              onChange={handleHobbiesChange}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Выберите или введите увлечения..."
                  required={formData.hobbies.length === 0}
                  helperText={formData.hobbies.length > 0 ? `Выбрано: ${formData.hobbies.length}/3` : ''}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    className="hobby-chip"
                  />
                ))
              }
              className="hobbies-autocomplete"
              getOptionLabel={(option) => {
                if (typeof option === 'string') {
                  return option;
                }
                return option;
              }}
              isOptionEqualToValue={(option, value) => option === value}
            />
          </div>

          <div className="form-group">
            <label htmlFor="height">Рост (см):</label>
            <div className="height-slider-container">
              <Slider
                value={formData.height}
                onChange={handleHeightChange}
                min={140}
                max={220}
                step={1}
                marks={[
                  { value: 140, label: '140' },
                  { value: 160, label: '160' },
                  { value: 180, label: '180' },
                  { value: 200, label: '200' },
                  { value: 220, label: '220' }
                ]}
                valueLabelDisplay="auto"
                className="height-slider"
              />
              <div className="height-value">{formData.height} см</div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="weight">Вес (кг):</label>
            <div className="weight-slider-container">
              <Slider
                value={formData.weight}
                onChange={handleWeightChange}
                min={40}
                max={150}
                step={0.5}
                marks={[
                  { value: 40, label: '40' },
                  { value: 60, label: '60' },
                  { value: 80, label: '80' },
                  { value: 100, label: '100' },
                  { value: 120, label: '120' },
                  { value: 140, label: '140' }
                ]}
                valueLabelDisplay="auto"
                className="weight-slider"
              />
              <div className="weight-value">{formData.weight} кг</div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="eyeColor">Цвет глаз:</label>
            <select
              id="eyeColor"
              name="eyeColor"
              value={formData.eyeColor}
              onChange={handleChange}
              required
            >
              <option value="">Выберите цвет глаз</option>
              <option value="brown">Карие</option>
              <option value="blue">Голубые</option>
              <option value="green">Зеленые</option>
              <option value="gray">Серые</option>
              <option value="hazel">Ореховые</option>
              <option value="amber">Янтарные</option>
              <option value="heterochromia">Разные</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="relationshipGoal">Цель знакомства:</label>
            <select
              id="relationshipGoal"
              name="relationshipGoal"
              value={formData.relationshipGoal}
              onChange={handleChange}
              required
            >
              <option value="">Выберите цель</option>
              <option value="serious">Серьезные отношения</option>
              <option value="friendship">Дружба</option>
              <option value="flirt">Флирт</option>
              <option value="marriage">Брак</option>
              <option value="casual">Несерьезные отношения</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="maritalStatus">Семейное положение:</label>
            <select
              id="maritalStatus"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              required
            >
              <option value="">Выберите статус</option>
              <option value="single">Не женат/не замужем</option>
              <option value="divorced">Разведен/а</option>
              <option value="inRelationship">В отношениях</option>
              <option value="widowed">Вдовец/вдова</option>
            </select>
          </div>

          <div className="form-group">
            <FormControl component="fieldset">
              <FormLabel component="legend">Дети:</FormLabel>
              <RadioGroup
                name="hasChildren"
                value={formData.hasChildren}
                onChange={handleChange}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Есть" />
                <FormControlLabel value="no" control={<Radio />} label="Нет" />
              </RadioGroup>
            </FormControl>
          </div>

          {formData.hasChildren === 'yes' && (
            <>
              <div className="form-group">
                <label htmlFor="childrenCount">Количество детей:</label>
                <input
                  type="number"
                  id="childrenCount"
                  name="childrenCount"
                  value={formData.childrenCount}
                  onChange={handleChange}
                  min="1"
                  max="10"
                />
              </div>

              <div className="form-group">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Дети живут вместе:</FormLabel>
                  <RadioGroup
                    name="childrenLiveTogether"
                    value={formData.childrenLiveTogether}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="yes" control={<Radio />} label="Да" />
                    <FormControlLabel value="no" control={<Radio />} label="Нет" />
                  </RadioGroup>
                </FormControl>
              </div>
            </>
          )}

          <button type="submit" className="submit-button">
            Сгенерировать описание
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
