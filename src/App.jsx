import { useState, useEffect } from 'react';
import CurrencyConverter from './Components/CurrencyConverter.jsx';

// Список популярных валют
const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'BYN', 'KZT', 'RUB', 'MDL', 'AZN', 'UZS', 'GEL'];

const App = () => {
  const [rates, setRates] = useState({});


  useEffect(() => {
    // Получаем курсы валют через API
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => response.json())
      .then(data => {
        // Фильтруем только популярные валюты
        const filteredRates = Object.keys(data.rates)
          .filter(currency => popularCurrencies.includes(currency))
          .reduce((obj, currency) => {
            obj[currency] = data.rates[currency];
            return obj;
          }, {});

        setRates(filteredRates);
      })
      .catch(error => console.error('Error fetching the currency data:', error));
  }, []);

  return (
    <div className="blockContainer">
      <h1>Конвертер валют
      </h1>
      <CurrencyConverter rates={rates} />
    </div>
  );
}

export default App;