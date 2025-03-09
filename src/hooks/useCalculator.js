import { useState, useCallback } from 'react';

const CALCULATOR_CONFIG = {
  MAX_DIGITS: 16,
  DECIMAL_SEPARATOR: ".",
  ERROR_MESSAGES: {
    DIVISION_BY_ZERO: "Can't divide with 0",
    OVERFLOW: "Number too large",
    INVALID_OPERATION: "Invalid operation"
  },
  OPERATORS: {
    ADD: "+",
    SUBTRACT: "-",
    MULTIPLY: "X",
    DIVIDE: "/"
  }
};

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => String(num).replace(/\s/g, "");

const math = (a, b, sign) => {
  const operations = {
    [CALCULATOR_CONFIG.OPERATORS.ADD]: (a, b) => a + b,
    [CALCULATOR_CONFIG.OPERATORS.SUBTRACT]: (a, b) => a - b,
    [CALCULATOR_CONFIG.OPERATORS.MULTIPLY]: (a, b) => a * b,
    [CALCULATOR_CONFIG.OPERATORS.DIVIDE]: (a, b) => {
      if (b === 0) throw new Error(CALCULATOR_CONFIG.ERROR_MESSAGES.DIVISION_BY_ZERO);
      return a / b;
    }
  };

  const result = operations[sign](a, b);
  if (!Number.isFinite(result)) {
    throw new Error(CALCULATOR_CONFIG.ERROR_MESSAGES.OVERFLOW);
  }
  return result;
};

export const useCalculator = () => {
  const [calc, setCalc] = useState({
    sign: "",
    num: "0",
    res: "0",
    error: null,
    history: []
  });

  const clearError = useCallback(() => {
    setCalc(prev => ({ ...prev, error: null }));
  }, []);

  const addToHistory = useCallback((operation) => {
    setCalc(prev => ({
      ...prev,
      history: [...prev.history, operation]
    }));
  }, []);

  const numClickHandler = useCallback((value) => {
    clearError();
    const currentNum = removeSpaces(calc.num);
    if (currentNum.length < CALCULATOR_CONFIG.MAX_DIGITS) {
      setCalc(prev => ({
        ...prev,
        num: prev.num === "0" ? String(value) : prev.num + value,
        res: !prev.sign ? "0" : prev.res,
      }));
    }
  }, [calc.num, clearError]);

  const comaClickHandler = useCallback((e) => {
    if (e) {
      e.preventDefault();
    }
    clearError();
    setCalc(prev => ({
      ...prev,
      num: !prev.num.toString().includes(CALCULATOR_CONFIG.DECIMAL_SEPARATOR) 
        ? prev.num + CALCULATOR_CONFIG.DECIMAL_SEPARATOR 
        : prev.num,
    }));
  }, [clearError]);

  const signClickHandler = useCallback((value) => {
    clearError();
    try {
      setCalc(prev => {
        if (prev.sign && prev.num && prev.res !== "0") {
          const newRes = toLocaleString(
            math(
              Number(removeSpaces(prev.res)),
              Number(removeSpaces(prev.num)),
              prev.sign
            )
          );
          addToHistory(`${prev.res} ${prev.sign} ${prev.num} = ${newRes}`);
          return {
            ...prev,
            sign: value,
            res: newRes,
            num: "0",
          };
        }
        
        return {
          ...prev,
          sign: value,
          res: prev.num || prev.res,
          num: "0",
        };
      });
    } catch (error) {
      setCalc(prev => ({ ...prev, error: error.message }));
    }
  }, [clearError, addToHistory]);

  const equalsClickHandler = useCallback(() => {
    if (calc.sign && calc.num) {
      try {
        setCalc(prev => {
          const result = prev.num === "0" && prev.sign === "/"
            ? CALCULATOR_CONFIG.ERROR_MESSAGES.DIVISION_BY_ZERO
            : toLocaleString(
                math(
                  Number(removeSpaces(prev.res)),
                  Number(removeSpaces(prev.num)),
                  prev.sign
                )
              );

          addToHistory(`${prev.res} ${prev.sign} ${prev.num} = ${result}`);

          return {
            ...prev,
            res: result,
            sign: "",
            num: "0",
          };
        });
      } catch (error) {
        setCalc(prev => ({ ...prev, error: error.message }));
      }
    }
  }, [calc.sign, calc.num, addToHistory]);

  const invertClickHandler = useCallback(() => {
    clearError();
    setCalc(prev => ({
      ...prev,
      num: prev.num !== "0" ? String(-Number(removeSpaces(prev.num))) : "0",
      res: prev.res !== "0" ? String(-Number(removeSpaces(prev.res))) : "0",
      sign: "",
    }));
  }, [clearError]);

  const percentClickHandler = useCallback(() => {
    clearError();
    setCalc(prev => {
      const num = prev.num !== "0" ? String(Number(removeSpaces(prev.num)) / 100) : "0";
      const res = prev.res !== "0" ? String(Number(removeSpaces(prev.res)) / 100) : "0";
      return {
        ...prev,
        num,
        res,
        sign: "",
      };
    });
  }, [clearError]);

  const resetClickHandler = useCallback(() => {
    clearError();
    setCalc({
      sign: "",
      num: "0",
      res: "0",
      error: null,
      history: []
    });
  }, [clearError]);

  const buttonClickHandler = useCallback((e, btn) => {
    if (e) {
      e.preventDefault();
    }
    if (btn === "C" || calc.res === CALCULATOR_CONFIG.ERROR_MESSAGES.DIVISION_BY_ZERO) {
      resetClickHandler();
    } else if (btn === "+-") {
      invertClickHandler();
    } else if (btn === "%") {
      percentClickHandler();
    } else if (btn === "=") {
      equalsClickHandler();
    } else if (["/", "X", "-", "+"].includes(btn)) {
      signClickHandler(btn);
    } else if (btn === ".") {
      comaClickHandler(e);
    } else {
      numClickHandler(btn);
    }
  }, [
    calc.res,
    resetClickHandler,
    invertClickHandler,
    percentClickHandler,
    equalsClickHandler,
    signClickHandler,
    comaClickHandler,
    numClickHandler
  ]);

  return {
    calc,
    handlers: {
      numClickHandler,
      signClickHandler,
      equalsClickHandler,
      comaClickHandler,
      invertClickHandler,
      percentClickHandler,
      resetClickHandler,
      buttonClickHandler
    }
  };
}; 