import { useState, useEffect, useRef, useCallback } from 'react';

const CursedEffect = ({ children }) => {
	const [cursedText, setCursedText] = useState(children);
	const spanRef = useRef(null);

	const getRandomColor = useCallback( () => `hsl(0, ${80 + Math.random() * 20}%, ${30 + Math.random() * 20}%)`, []);

	const applyCursedEffect = useCallback((text) => {
		const charMap = {
			'O': '0', 'o': '0', 'О': '0', 'о': '0',
			'E': '3', 'e': '3', 'Е': '3', 'е': '3',
			'A': '4', 'a': '4', 'А': '4', 'а': '4',
			'I': '1', 'i': '1', 'І': '1', 'і': '1',
			'S': '5', 's': '5',
			'T': '7', 't': '7',
			'G': '6', 'g': '6',
			'B': '8', 'b': '8',
			'Z': '2', 'z': '2',
			'L': '1', 'l': '1',
		};

		let newText = '';
		for (let i = 0; i < text.length; i++) {
			const char = text[i];
			const randomNumber = Math.random();

			if (randomNumber < 0.3 && charMap[char]) { // 30% prob to replace symbol by key
				newText += charMap[char];
				continue;
			}

			newText += char;
		}
		return newText;
	}, []);

	useEffect(() => {
		const targetElement = spanRef.current;
		let curseInterval = null;
		if (targetElement) {
			if(typeof children !== 'string') {
				console.error('CursedEffect: children prop must be a string');
				return;
			}
			const originalText = children;

			curseInterval = setInterval(() => {
				const newCursedText = applyCursedEffect(originalText);
				setCursedText(newCursedText);
				targetElement.style.color = getRandomColor();
				const xOffset = Math.random() * 3 - 1.5;
				const yOffset = Math.random() * 3 - 1.5;
				const rotation = Math.random() * 5 - 3; // lil rotation
				targetElement.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`;
			}, 120);
		}

		return () => {
			clearInterval(curseInterval);
		};
	}, [children, applyCursedEffect, getRandomColor]);

	return <span ref={spanRef} className="cursed-effect">{cursedText}</span>;
};

export default CursedEffect;