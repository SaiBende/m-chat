'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMChat } from '@/context/MChatContext';
import { questionPassFailMap } from '@/data/questionsMapping';
import { followUpQuestionsMap } from '@/data/followupquestion';
import { questions } from '@/data/questions';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Image from 'next/image';


export default function ResultPage() {
  const { answers, resultData, isLoaded, saveResult, reset } = useMChat();
  const router = useRouter();
  const [failCount, setFailCount] = useState(0);
  const [riskLevel, setRiskLevel] = useState('');
  const [followUps, setFollowUps] = useState<number[]>([]);
  const [followUpResponses, setFollowUpResponses] = useState<Record<number, 'yes' | 'no'>>({});
  const [showFinalResult, setShowFinalResult] = useState(false);
  const [showResponses, setShowResponses] = useState(false);

  useEffect(() => {
    
    if (!isLoaded) return;

   
    if (resultData) {
      setFailCount(resultData.failCount);
      setRiskLevel(resultData.riskLevel);
      setFollowUpResponses(resultData.followUpResponses);
      setShowFinalResult(true);
      return;
    }

  
    const answersCount = Object.keys(answers).length;
    const hasAnswers = answersCount === 20;
    

    if (!hasAnswers) {
      router.push('/questionnaire');
      return;
    }

    
    let count = 0;
    const neededFollowUps: number[] = [];

    for (let q = 1; q <= 20; q++) {
      const userAns = answers[q];
      const passFail = questionPassFailMap[q][userAns];
      if (passFail === 'fail') {
        count++;
        if (followUpQuestionsMap[q]) neededFollowUps.push(q);
      }
    }

    setFailCount(count);
    if (count <= 2) setRiskLevel('Low Risk');
    else if (count <= 7) setRiskLevel('Medium Risk');
    else setRiskLevel('High Risk');
    setFollowUps(count > 2 && count <= 7 ? neededFollowUps : []);
  }, [answers, router, resultData, isLoaded]);

  const getColor = (risk: string) => {
    switch (risk) {
      case 'Low Risk': return 'bg-green-500';
      case 'Medium Risk': return 'bg-yellow-500';
      case 'High Risk': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleFollowUpChange = (qNo: number, value: 'yes' | 'no') => {
    setFollowUpResponses(prev => ({ ...prev, [qNo]: value }));
  };

  const finalizeResult = () => {
    
    let adjustedFails = 0;
    
    for (let q = 1; q <= 20; q++) {
      const userAns = answers[q];
      const initialPassFail = questionPassFailMap[q][userAns];
      
     
      if (followUpQuestionsMap[q] && initialPassFail === 'fail') {
        const followUpAns = followUpResponses[q];
        if (followUpAns === 'yes') continue; 
      }
      
      if (initialPassFail === 'fail') {
        adjustedFails++;
      }
    }
    
    
    const adjustedRisk = 
      adjustedFails <= 2 ? 'Low Risk' : 
      adjustedFails <= 7 ? 'Medium Risk' : 
      'High Risk';
    
    
    saveResult({
      answers,
      failCount: adjustedFails,
      riskLevel: adjustedRisk,
      followUpResponses
    });
    
    setFailCount(adjustedFails);
    setRiskLevel(adjustedRisk);
    setShowFinalResult(true);
  };

  const toggleResponses = () => {
    setShowResponses(!showResponses);
  };

  
  if (!isLoaded) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
        
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
        <Card className="relative z-10 w-full max-w-4xl shadow-xl rounded-2xl">
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
    <main className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
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
      <Card className="relative z-10 w-full max-w-4xl shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-6" id="result-content">
          <h2 className="text-xl font-bold text-center">M-CHAT-R/F Risk Score</h2>
          <Separator />

          {!showFinalResult ? (
            followUps.length > 0 ? (
              <div className="space-y-4">
                <p className="text-xl font-bold text-center">
                  Please answer the following follow-up questions to finalize the result:
                </p>
                {followUps.map(q => (
                  <div key={q} className="space-y-2">
                    <p className="font-medium text-gray-800">Q{q}: {followUpQuestionsMap[q]}</p>
                    <div className="flex gap-4">
                      <Button
                        variant={followUpResponses[q] === 'yes' ? 'default' : 'outline'}
                        onClick={() => handleFollowUpChange(q, 'yes')}
                      >
                        Yes
                      </Button>
                      <Button
                        variant={followUpResponses[q] === 'no' ? 'default' : 'outline'}
                        onClick={() => handleFollowUpChange(q, 'no')}
                      >
                        No
                      </Button>
                    </div>
                  </div>
                ))}
                <Button className="mt-4 w-full" onClick={finalizeResult}>
                  Submit Follow-Up Responses
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-700">Score: <strong>{failCount}</strong> out of 20</h3>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-md font-medium">Risk Level:</span>
                  <Badge className={`${getColor(riskLevel)} text-white`}>{riskLevel}</Badge>
                </div>
                {riskLevel === 'High Risk' && (
                  <p className="text-sm text-red-600 font-semibold">
                    Immediate professional evaluation is strongly recommended.
                  </p>
                )}
                {riskLevel === 'Low Risk' && (
                  <p className="text-sm text-green-600">
                    Your child is at low risk. No immediate action is required.
                  </p>
                )}
                <div className="flex gap-2 mt-4">
                  <Button onClick={finalizeResult} className="flex-1">
                    Save Result
                  </Button>
                </div>
              </div>
            )
          ) : (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-700">Score: <strong>{failCount}</strong> out of 20</h3>
               
                <div className="flex items-center justify-center gap-2">
                  <span className="text-md font-medium">Risk Level:</span>
                  <Badge className={`${getColor(riskLevel)} text-white`}>{riskLevel}</Badge>
                </div>
                
                {resultData && (
                  <p className="text-sm text-gray-500">
                    Completed on: {new Date(resultData.completedAt).toLocaleDateString()}
                  </p>
                )}
                
                {riskLevel === 'Medium Risk' && (
                  <>
                    <p className="text-sm text-yellow-600">
                      Based on your follow-up responses, please consult a pediatrician for further evaluation.
                    </p>
                    <p className="text-sm text-gray-500">(This is not a diagnosis.)</p>
                  </>
                )}
                {riskLevel === 'High Risk' && (
                  <p className="text-sm text-red-600 font-semibold">
                    Immediate professional evaluation is strongly recommended.
                  </p>
                )}
                {riskLevel === 'Low Risk' && (
                  <p className="text-sm text-green-600">
                    Your child is at low risk. No immediate action is required.
                  </p>
                )}
              </div>

              {/* Show responses section */}
              {showResponses && (
                <div className="space-y-4">
                  <Separator />
                  <h4 className="font-semibold text-center">Your Responses</h4>
                  <div className="grid gap-2 max-h-96 overflow-y-auto">
                    {Object.entries(answers).map(([qNo, answer]) => (
                      <div key={qNo} className="text-sm p-2 bg-gray-50 rounded">
                        <p className="font-medium">Q{qNo}: {questions[parseInt(qNo) - 1]}</p>
                        <p className="text-blue-600 capitalize mt-1">Answer: {answer}</p>
                      </div>
                    ))}
                  </div>
                  
                  {Object.keys(followUpResponses).length > 0 && (
                    <>
                      <h5 className="font-medium">Follow-up Responses:</h5>
                      <div className="grid gap-2">
                        {Object.entries(followUpResponses).map(([qNo, response]) => (
                          <div key={qNo} className="text-sm p-2 bg-blue-50 rounded">
                            <p className="font-medium">Follow-up Q{qNo}: {followUpQuestionsMap[parseInt(qNo)]}</p>
                            <p className="text-blue-600 capitalize mt-1">Answer: {response}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <Button onClick={toggleResponses} variant="outline" className="flex-1">
                  {showResponses ? 'Hide' : 'View'} Responses
                </Button>
                <Button onClick={reset} className="flex-1">
                  Restart Assessment
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
