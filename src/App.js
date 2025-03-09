import React, { useEffect } from "react";
import { useCalculator } from "./hooks/useCalculator";

import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const App = () => {
  const { calc, handlers } = useCalculator();

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Prevent default behavior for calculator keys
      if (event.key.match(/^[0-9.]$/) || "+-*/=Enter".includes(event.key)) {
        event.preventDefault();
      }

      // Number keys
      if (event.key.match(/^[0-9]$/)) {
        handlers.numClickHandler(event.key);
        return;
      }

      // Operator mapping
      const operatorMap = {
        '+': '+',
        '-': '-',
        '*': 'X',
        '/': '/',
        'Enter': '=',
        '=': '=',
        'Escape': 'C',
        '.': '.',
      };

      const mappedKey = operatorMap[event.key];
      if (mappedKey) {
        handlers.buttonClickHandler(null, mappedKey);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handlers]);

  // Determine what to display based on calculator state
  const getDisplayValue = () => {
    if (calc.error) return calc.error;
    
    // If we're entering a new number
    if (calc.num !== "0") {
      return calc.num;
    }
    
    // If we have a result and an operator
    if (calc.res !== "0" && calc.sign) {
      return `${calc.res} ${calc.sign}`;
    }
    
    // Just show the result
    return calc.res;
  };

  return (
    <Wrapper>
      <Screen 
        value={getDisplayValue()}
        error={calc.error}
        history={calc.history}
      />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={(e) => handlers.buttonClickHandler(e, btn)}
              aria-label={getAriaLabel(btn)}
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};

const getAriaLabel = (btn) => {
  const labels = {
    'C': 'Clear',
    '+-': 'Change sign',
    '%': 'Percentage',
    '/': 'Divide',
    'X': 'Multiply',
    '-': 'Subtract',
    '+': 'Add',
    '=': 'Equals',
    '.': 'Decimal point'
  };
  return labels[btn] || `Number ${btn}`;
};

export default App;
