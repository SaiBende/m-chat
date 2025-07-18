'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMChat } from '@/context/MChatContext';
import { questions } from '@/data/questions';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';


export default function QuestionnairePage() {
  const { answers, setAnswer, isLoaded } = useMChat();
  const [step, setStep] = useState(0);
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const router = useRouter();

  const selected = answers[step + 1];
  const percentage = Math.round(((step + 1) / questions.length) * 100);

  useEffect(() => {

    if (!isLoaded) return;


    const answeredQuestions = Object.keys(answers).map(Number).sort((a, b) => a - b);
    if (answeredQuestions.length > 0) {
      const lastAnswered = answeredQuestions[answeredQuestions.length - 1];
      if (lastAnswered < 20) {
        setStep(lastAnswered);
      } else {
        setStep(19);
      }
    }
  }, [answers, isLoaded]);

  const handleAnswer = (answer: 'yes' | 'no') => {
    setAnswer(step + 1, answer);
  };

  const handleNext = () => {
    if (step === questions.length - 1) {

      router.push('/result');
    } else {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSaveProgress = () => {

    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  const handleSaveAndExit = () => {

    router.push('/');
  };


  if (!isLoaded) {
    return (
      <main className="relative z-10 flex items-center justify-center min-h-screen bg-slate-100 p-4">
        {/* background Logic*/}
        <div className="fixed inset-0 z-0">
          <Image
            src="/background.jpeg"
            alt="Background"
            fill
            priority
            className="object-cover "
            sizes="100vw"
          />
          <div className="absolute inset-0 " />
        </div>
        <Card className="w-full max-w-xl text-center shadow-xl">
          <CardContent className="p-6 space-y-6">
            <div className="text-center">
              <p>Loading...</p>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      {/* background Logic */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/background.jpeg"
          alt="Background"
          fill
          priority
          className="object-cover "
          sizes="100vw"
        />
        <div className="absolute inset-0 " />
      </div>
      <Card className="w-full max-w-xl shadow-xl relative z-10">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-lg">Question {step + 1} of {questions.length}</CardTitle>
          <div className="space-y-2">
            <Progress value={percentage} className="w-full" />
            <p className="text-sm text-gray-500">{percentage}% Complete</p>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {showSaveMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <p className="text-sm text-green-800">Progress saved successfully!</p>
            </div>
          )}

          <div className="text-center">
            <p className="text-base leading-relaxed">{questions[step]}</p>
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              variant={selected === 'yes' ? 'default' : 'outline'}
              onClick={() => handleAnswer('yes')}
              aria-pressed={selected === 'yes'}
              aria-label="Answer Yes"
            >
              Yes & Next
            </Button>
            <Button
              variant={selected === 'no' ? 'default' : 'outline'}
              onClick={() => handleAnswer('no')}
              aria-pressed={selected === 'no'}
              aria-label="Answer No"
            >
              No & Next
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={step === 0}
              aria-label="Previous Question"
              className="w-full sm:w-auto"
            >
              Previous
            </Button>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={handleSaveProgress}
                aria-label="Save Progress"
                className="w-full sm:w-auto"
              >
                Save Progress
              </Button>
              <Button
                variant="outline"
                onClick={handleSaveAndExit}
                aria-label="Save and Exit"
                className="w-full sm:w-auto"
              >
                Save & Exit
              </Button>
            </div>

            <Button
              onClick={handleNext}
              disabled={!selected}
              aria-label={step === questions.length - 1 ? 'Submit Assessment' : 'Next Question'}
              className="w-full sm:w-auto"
            >
              {step === questions.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </div>

        </CardContent>
      </Card>
    </main>
  );
}
