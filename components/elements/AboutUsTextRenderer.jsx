"use client";
import React, { useState, useEffect, useRef } from 'react';


const CursedText = ({ children }) => {
  const [cursedText, setCursedText] = useState(children);
  const intervalRef = useRef(null);
  const spanRef = useRef(null); 

  const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*&%$#@!';
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

  // const getRandomChar = () => possibleChars[Math.floor(Math.random() * possibleChars.length)];
  const getRandomColor = () => `hsl(0, ${80 + Math.random() * 20}%, ${15 + Math.random() * 20}%)`; 

  const applyCursedEffect = (text) => {
    let newText = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === ' ' || char === '–' || char === '-') { // ignore spaces
        newText += char;
        continue;
      }
      const randomNumber = Math.random();
      // if (randomNumber < 0.05) { // 5% prob to replace symbol to random
      //   newText += getRandomChar();
      // } else 
      if (randomNumber < 0.3 && charMap[char]) { // 30% prob to replace symbol by key
        newText += charMap[char];
      } else {
        newText += char;
      }
    }
    return newText;
  };

  useEffect(() => {
    const targetElement = spanRef.current; 

    if (targetElement) {
      const originalText = children;

      intervalRef.current = setInterval(() => {
        const newCursedText = applyCursedEffect(originalText);
        setCursedText(newCursedText);

        targetElement.style.color = getRandomColor();

        const xOffset = Math.random() * 3 - 1.5;
        const yOffset = Math.random() * 3 - 1.5;
        const rotation = Math.random() * 2 - 3; // lil rotation
        targetElement.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`;
        targetElement.style.opacity = `${0.7 + Math.random() * 0.3}`; // lil opacity


      }, 250);
    }

    return () => {
      clearInterval(intervalRef.current);
      if (targetElement) {
          targetElement.style.color = '';
          targetElement.style.transform = '';
          targetElement.style.opacity = '1';
      }
    };
  }, [children]); // Перезапускаем эффект, если дочерний элемент изменился

  return <span ref={spanRef} className="cursed-effect">{cursedText}</span>;
};

// Компонент AboutUsTextRenderer остается таким же, как в предыдущем блоке кода
const AboutUsTextRenderer = ({ children }) => {
  const renderChildren = (nodes) => {
    return React.Children.map(nodes, (child) => {
      if (React.isValidElement(child)) {
        if (child.props && child.props.className && child.props.className.includes('cursed')) {
          let childTextContent = '';
          // Более надежный способ извлечения текста, даже если он разбит на части
          const getTextContent = (elemChildren) => {
            let text = '';
            React.Children.forEach(elemChildren, (c) => {
              if (typeof c === 'string') {
                text += c;
              } else if (React.isValidElement(c) && c.props.children) {
                text += getTextContent(c.props.children); // Рекурсия для вложенных элементов
              }
            });
            return text;
          };

          childTextContent = getTextContent(child.props.children);

          // Если текст пуст после попыток извлечения (например, элемент <li className="cursed" />)
          // можно поставить заглушку или не применять CursedText
          if (!childTextContent && child.type === 'li' && child.props.children && typeof child.props.children[0] === 'string' ) {
             // Специальный случай для вашего <li>– zbiory</li>, если тире не часть текста
             childTextContent = child.props.children[0].startsWith('– ') ? child.props.children[0].substring(2) : child.props.children[0];
          } else if (!childTextContent && Array.isArray(child.props.children)) {
            // Попытка для вашего случая <li>– zbiory</li> -> здесь child.props.children будет массив ['– zbiory']
            const firstChild = child.props.children[0];
            if (typeof firstChild === 'string') {
                childTextContent = firstChild.replace(/^–\s*/, ''); // Удаляем "– " в начале, если есть
            }
          }


          if (childTextContent) {
            // Если "cursed" элемент это li, и у него есть текстовый маркер типа "– ",
            // его нужно отобразить отдельно, а CursedText применить только к самому тексту.
            const matchDash = childTextContent.match(/^(–\s*|•\s*|-\s*)/);
            let prefix = '';
            let coreText = childTextContent;

            if (matchDash) {
                prefix = matchDash[0];
                coreText = childTextContent.substring(prefix.length);
            }


            if (coreText) { // Применяем эффект только если есть текст после префикса
                 return React.cloneElement(child, {
                    ...child.props,
                    children: <>{prefix}<CursedText>{coreText}</CursedText></>
                });
            } else if (prefix) { // Если есть только префикс, но нет текста для CursedText
                 return React.cloneElement(child, {
                    ...child.props,
                    children: <>{prefix}</> // Просто отображаем префикс
                });
            } else {
                // Если текст пустой, а префикса нет, можно либо вернуть оригинал, либо заглушку
                 return React.cloneElement(child, {
                    ...child.props, // Возвращаем оригинал, если текст пуст
                 });
            }


          } else {
            // Если текст извлечь не удалось, просто клонируем элемент без CursedText
            // Это может произойти, если <p className="cursed"></p> или <p className="cursed"><img src="..." /></p>
            return React.cloneElement(child, { ...child.props });
          }
        }

        if (child.props && child.props.children) {
          return React.cloneElement(child, {
            ...child.props,
            children: renderChildren(child.props.children)
          });
        }
      }
      return child;
    });
  };

  return <div className="about-us-text-renderer">{renderChildren(children)}</div>;
};


export default AboutUsTextRenderer;