import React from "react";
import Link from "next/link";
import { Mail, Github, ExternalLink, Brain, HeartPulse } from "lucide-react";


import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t bg-card text-card-foreground z-10 relative">
      <div className="container px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Branding & Description */}
          <div className="md:col-span-4 flex flex-col space-y-3">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Brain className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">M-CHAT-R/F</span>
                <span className="text-xs text-muted-foreground leading-tight">Autism Screener</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              The Modified Checklist for Autism in Toddlers, Revised with Follow-Up (M-CHAT-R/F) 
              is a validated developmental screening tool for toddlers between 16 and 30 months of age.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="font-medium text-sm mb-3">Screening</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/questionnaire" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Start Assessment
                </Link>
              </li>
              <li>
                <Link href="/results" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  View Results
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About M-CHAT-R/F
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-3">
            <h3 className="font-medium text-sm mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://mchatscreen.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <span>Official M-CHAT Website</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.cdc.gov/ncbddd/autism/screening.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <span>CDC Autism Information</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.autismspeaks.org/screen-your-child" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <span>Autism Speaks</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact/Legal */}
          <div className="md:col-span-3">
            <h3 className="font-medium text-sm mb-3">Legal & Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <Mail className="h-3 w-3 mr-1" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-xs text-muted-foreground mb-4 md:mb-0">
            © {currentYear} M-CHAT-R/F Digital Screener. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
              <a href="https://github.com/SaiBende" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">GitHub</span>
                <Github className="h-4 w-4" />
              </a>
            </Button>
            
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="flex items-center">
                Made with <HeartPulse className="h-3 w-3 mx-1 text-red-500" /> for autism awareness
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-3 bg-muted/50 rounded-md">
          <p className="text-xs text-muted-foreground text-center">
            DISCLAIMER: This digital version of M-CHAT-R/F is for informational purposes only.
            It is not a substitute for professional medical advice, diagnosis, or treatment.
            Always seek the advice of a qualified healthcare provider with questions regarding medical conditions.
          </p>
        </div>
      </div>
    </footer>
  );
}