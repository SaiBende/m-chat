'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type YesNo = 'yes' | 'no';
export type PassFail = 'pass' | 'fail';

interface AnswerMap {
  [questionNumber: number]: YesNo;
}

interface ResultData {
  answers: AnswerMap;
  failCount: number;
  riskLevel: string;
  followUpResponses: Record<number, 'yes' | 'no'>;
  completedAt: string;
}

interface MChatContextProps {
  answers: AnswerMap;
  resultData: ResultData | null;
  isLoaded: boolean;
  setAnswer: (qNo: number, answer: YesNo) => void;
  saveResult: (data: Omit<ResultData, 'completedAt'>) => void;
  reset: () => void;
}

const MChatContext = createContext<MChatContextProps | null>(null);

export const useMChat = () => {
  const ctx = useContext(MChatContext);
  if (!ctx) throw new Error('MChatContext used outside Provider');
  return ctx;
};

export const MChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedAnswers = localStorage.getItem('mchat-answers');
      const savedResult = localStorage.getItem('mchat-result');
      
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers));
      }
      
      if (savedResult) {
        setResultData(JSON.parse(savedResult));
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const setAnswer = (qNo: number, answer: YesNo) => {
    const newAnswers = { ...answers, [qNo]: answer };
    setAnswers(newAnswers);
    localStorage.setItem('mchat-answers', JSON.stringify(newAnswers));
  };

  const saveResult = (data: Omit<ResultData, 'completedAt'>) => {
    const resultWithTimestamp: ResultData = {
      ...data,
      completedAt: new Date().toISOString()
    };
    setResultData(resultWithTimestamp);
    localStorage.setItem('mchat-result', JSON.stringify(resultWithTimestamp));
  };

  const reset = () => {
    setAnswers({});
    setResultData(null);
    localStorage.removeItem('mchat-answers');
    localStorage.removeItem('mchat-result');
  };

  return (
    <MChatContext.Provider value={{ answers, resultData, isLoaded, setAnswer, saveResult, reset }}>
      {children}
    </MChatContext.Provider>
  );
};