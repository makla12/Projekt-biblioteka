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
  const getRandomColor = () => `hsl(0, ${80+ Math.random() * 20}%, ${30+ Math.random() * 20}%)`; 

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
        const rotation = Math.random() * 5 - 3; // lil rotation
        targetElement.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`;
        // targetElement.style.opacity = `${0.7 + Math.random() * 0.3}`; // lil opacity


      }, 120);
    }

    return () => {
      clearInterval(intervalRef.current);
      if (targetElement) {
          targetElement.style.color = '';
          targetElement.style.transform = '';
          targetElement.style.opacity = '1';
      }
    };
  }, [children]);

  return <span ref={spanRef} className="cursed-effect">{cursedText}</span>;
};
const AboutUsTextRenderer = ({ children }) => {
  const renderChildren = (nodes) => {
    return React.Children.map(nodes, (child) => {
      if (React.isValidElement(child)) {
        if (child.props && child.props.className && child.props.className.includes('cursed')) {
          let childTextContent = '';
          
          const getTextContent = (elemChildren) => {
            let text = '';
            React.Children.forEach(elemChildren, (c) => {
              if (typeof c === 'string') {
                text += c;
              } else if (React.isValidElement(c) && c.props.children) {
                text += getTextContent(c.props.children);
              }
            });
            return text;
          };

          childTextContent = getTextContent(child.props.children);

          if (!childTextContent && child.type === 'li' && child.props.children && typeof child.props.children[0] === 'string' ) {
             childTextContent = child.props.children[0].startsWith('– ') ? child.props.children[0].substring(2) : child.props.children[0];
          } else if (!childTextContent && Array.isArray(child.props.children)) {
            const firstChild = child.props.children[0];
            if (typeof firstChild === 'string') {
                childTextContent = firstChild.replace(/^–\s*/, '');
            }
          }


          if (childTextContent) {
            const matchDash = childTextContent.match(/^(–\s*|•\s*|-\s*)/);
            let prefix = '';
            let coreText = childTextContent;

            if (matchDash) {
                prefix = matchDash[0];
                coreText = childTextContent.substring(prefix.length);
            }


            if (coreText) { 
                 return React.cloneElement(child, {
                    ...child.props,
                    children: <>{prefix}<CursedText>{coreText}</CursedText></>
                });
            } else if (prefix) { 
                 return React.cloneElement(child, {
                    ...child.props,
                    children: <>{prefix}</>
                });
            } else {
                 return React.cloneElement(child, {
                    ...child.props, 
                 });
            }


          } else {
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