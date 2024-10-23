import { useState } from 'react';
import styles from './component.module.css'

function CurrencyConverter({ rates, setHistory }) {
	const [amount, setAmount] = useState(0);
	const [fromCurrency, setFromCurrency] = useState('USD');
	const [toCurrency, setToCurrency] = useState('EUR');
	const [result, setResult] = useState(null);
	const [inputValue, setInputValue] = useState(''); // Локальное состояние для input

	const convertCurrency = () => {
		const parsedAmount = parseFloat(inputValue);
		if (!isNaN(parsedAmount) && rates[fromCurrency] && rates[toCurrency]) {
			const conversionRate = rates[toCurrency] / rates[fromCurrency];
			const convertedAmount = (parsedAmount * conversionRate).toFixed(2);
			setResult(convertedAmount);
			setHistory(prev => [
				...prev,
				{ amount: parsedAmount, fromCurrency, toCurrency, convertedAmount }
			]);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<input
					type="number"
					min={0}
					value={inputValue} // Используем локальное состояние для input
					onChange={e => setInputValue(e.target.value)} // Обновляем только локальное состояние
					placeholder="0"
				/>
				<select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
					{Object.keys(rates).map(currency => (
						<option key={currency} value={currency}>
							{currency}
						</option>
					))}
				</select>
				<span> to </span>
				<select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
					{Object.keys(rates).map(currency => (
						<option key={currency} value={currency}>
							{currency}
						</option>
					))}
				</select>
			</div>
			<button onClick={convertCurrency} className={styles.button}>Convert</button>
			{inputValue && result && (
				<p>
					{inputValue} {fromCurrency} = {result} {toCurrency}
				</p>
			)}
		</div>
	);
}

export default CurrencyConverter;