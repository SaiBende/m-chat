'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { useMChat } from '@/context/MChatContext';
import { useEffect, useState } from 'react';
import Image from 'next/image';


export default function HomePage() {
  const router = useRouter();
  const { answers, isLoaded, reset } = useMChat();
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    if (isLoaded) {
      const answersCount = Object.keys(answers).length;
      setHasSavedProgress(answersCount > 0);
      setSavedCount(answersCount);
    }
  }, [answers, isLoaded]);

  const handleStartNew = () => {
    reset();
    router.push('/questionnaire');
  };

  const handleResume = () => {
    router.push('/questionnaire');
  };

  if (!isLoaded) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
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
        <Card className="w-full max-w-md shadow-2xl rounded-2xl relative z-10">
          <CardContent className="p-6 space-y-6 text-center">
            <div className="text-center">
              <p>Loading...</p>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">

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


      <Card className=" relative w-full z-10 max-w-md shadow-2xl rounded-2xl">
        <CardContent className="p-6 space-y-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">M-CHAT-R/F Autism Screener</h1>
          <p className="text-sm text-gray-600">
            Answer 20 quick questions about your child`s behavior to get an early autism risk assessment.
          </p>
          <Separator />

          {hasSavedProgress ? (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800 font-medium">
                  Progress Found
                </p>
                <p className="text-xs text-blue-600">
                  {savedCount} of 20 questions answered
                </p>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleResume}
                  className="w-full text-white text-md"
                >
                  Resume Assessment
                </Button>
                <Button
                  onClick={handleStartNew}
                  variant="outline"
                  className="w-full text-md"
                >
                  Start New Assessment
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => router.push('/questionnaire')}
              className="w-full text-white text-md"
            >
              Start Assessment
            </Button>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
