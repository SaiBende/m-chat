import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from 'next/image';

function AboutPage() {
  return (
    <>
    {/* background Login */}
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
    <div className="relative z-10 container max-w-4xl py-8 px-4 md:py-12 space-y-8">
     
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">About M-CHAT-R/F</h1>
        <p className="text-sm font-bold">
          Understanding the Modified Checklist for Autism in Toddlers, Revised with Follow-Up
        </p>
      </div>

      <Separator />
      
      <Card>
        <CardHeader>
          <CardTitle>What is M-CHAT-R/F?</CardTitle>
          <CardDescription>Overview of the screening tool</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The Modified Checklist for Autism in Toddlers, Revised with Follow-Up (M-CHAT-R/F) is a validated 
            two-stage screening tool designed to identify children 16-30 months of age who should receive a more 
            thorough assessment for possible early signs of autism spectrum disorder (ASD).
          </p>
          <p>
            The M-CHAT-R/F is widely used by healthcare providers during regular well-child check-ups. 
            It consists of 20 yes/no questions that parents can answer about their child`s behavior.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Development and Validation</CardTitle>
          <CardDescription>Research foundation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The M-CHAT-R/F was developed by Diana Robins, Deborah Fein, and Marianne Barton. 
            It is an updated version of the original M-CHAT questionnaire, with improved efficiency 
            and a structured follow-up interview for certain responses.
          </p>
          <p>
            Research has shown that the M-CHAT-R/F has improved specificity compared to the original 
            M-CHAT, reducing the number of children who need to be referred for a comprehensive assessment.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How the Screening Works</CardTitle>
          <CardDescription>Understanding the process</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="text-lg font-medium">Two-Stage Process</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <span className="font-medium">Initial Screening:</span> Parents complete the 20-question M-CHAT-R questionnaire.
            </li>
            <li>
              <span className="font-medium">Follow-Up:</span> For children with medium-risk scores, healthcare providers conduct 
              a structured follow-up interview to clarify at-risk responses.
            </li>
          </ol>
          
          <h3 className="text-lg font-medium mt-6">Scoring</h3>
          <p>The M-CHAT-R/F uses a scoring system to determine risk levels:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-medium">Low Risk (0-2):</span> No further action needed unless surveillance indicates risk for ASD.</li>
            <li><span className="font-medium">Medium Risk (3-7):</span> Administer the Follow-Up interview to get additional information.</li>
            <li><span className="font-medium">High Risk (8-20):</span> Bypass the Follow-Up; refer immediately for diagnostic evaluation and intervention.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Important Considerations</CardTitle>
          <CardDescription>What parents should know</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside space-y-3">
            <li>
              The M-CHAT-R/F is a screening tool, not a diagnostic instrument. A positive result indicates 
              that a child may be at risk and should receive further evaluation.
            </li>
            <li>
              Early identification of autism is crucial. Research shows that early intervention can significantly 
              improve outcomes for children with autism spectrum disorder.
            </li>
            <li>
              Not all children who screen positive will be diagnosed with autism. The screening may identify 
              other developmental delays that would benefit from intervention.
            </li>
            <li>
              This online version provides a convenient way to complete the questionnaire, but results should 
              always be discussed with a healthcare provider.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>References and Resources</CardTitle>
          <CardDescription>For further information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-3">
            <li>
              <a 
                href="https://mchatscreen.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center"
              >
                Official M-CHAT Website
              </a>
            </li>
            <li>
              <a 
                href="https://www.cdc.gov/ncbddd/autism/screening.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center"
              >
                CDC: Autism Spectrum Disorder Screening
              </a>
            </li>
            <li>
              <a 
                href="https://www.autismspeaks.org/screen-your-child" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center"
              >
                Autism Speaks: Screen Your Child
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground italic">
        <p>
          © Robins, D., Fein, D., & Barton, M. (2009). The Modified Checklist for Autism in Toddlers, Revised with Follow-Up (M-CHAT-R/F).
        </p>
      </div>
    </div>
    </>
  );
}

export default AboutPage;