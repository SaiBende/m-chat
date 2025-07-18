# M-CHAT-R/F Digital Screener

A simple, step-by-step web app for the Modified Checklist for Autism in Toddlers, Revised with Follow-Up (M-CHAT-R/F). Built with Next.js for parents and professionals to screen children for autism risk.

---

## How It Works

1. **Start the Test**
   - Click "Start" to begin the 20-question assessment about your child's behavior.

2. **Answer Questions**
   - Each question is shown one at a time.
   - Select "Yes" or "No" for each.
   - Progress bar shows how far you've come.

3. **Save Progress**
   - Your answers are saved automatically as you go.

4. **Submit & Get Results**
   - After all questions, submit to see your child's risk level.
   - Results are based on your answers and clinical scoring rules.

5. **Follow-Up (if needed)**
   - If your score is medium risk, you'll be prompted for a few follow-up questions for clarification.

6. **Review Recommendations**
   - The app gives clear next steps based on your score (low, medium, or high risk).

---

## Scoring Logic

- **Low Risk (0–2 failed items):** No action needed unless you have concerns.
- **Medium Risk (3–7 failed items):** Follow-up questions are shown. If risk remains, see a specialist.
- **High Risk (8+ failed items):** Immediate referral recommended.

### Actual Implementation

```tsx
// Initial assessment logic
for (let q = 1; q <= 20; q++) {
  const userAns = answers[q];
  const passFail = questionPassFailMap[q][userAns];
  if (passFail === 'fail') {
    count++;
    if (followUpQuestionsMap[q]) neededFollowUps.push(q);
  }
}

// Risk level determination
if (count <= 2) setRiskLevel('Low Risk');
else if (count <= 7) setRiskLevel('Medium Risk');
else setRiskLevel('High Risk');

// Only show follow-ups for medium risk
setFollowUps(count > 2 && count <= 7 ? neededFollowUps : []);

// Follow-up logic
const finalizeResult = () => {
  let adjustedFails = 0;
  
  for (let q = 1; q <= 20; q++) {
    const userAns = answers[q];
    const initialPassFail = questionPassFailMap[q][userAns];
    
    // If this was a failed item with follow-up and they passed the follow-up
    if (followUpQuestionsMap[q] && initialPassFail === 'fail') {
      const followUpAns = followUpResponses[q];
      if (followUpAns === 'yes') continue; // Don't count this as a fail
    }
    
    if (initialPassFail === 'fail') {
      adjustedFails++;
    }
  }
  
  // Recalculate risk based on follow-up responses
  const adjustedRisk = 
    adjustedFails <= 2 ? 'Low Risk' : 
    adjustedFails <= 7 ? 'Medium Risk' : 
    'High Risk';
};
```

---

## Getting Started

First, run the development server:

```bash
npm install # Install dependencies
npm run dev # Start the server
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Live At [https://m-chat-r.vercel.app](https://m-chat-r.vercel.app)

---

## Project Structure

```
m-chat-r/
├── src/
│   ├── app/                      # Pages and routing
│   │   ├── page.tsx              # Home page
│   │   ├── questionnaire/        # Main assessment
│   │   └── result/               # Results page
│   ├── components/               # UI components
│   │   └── ui/                   # Base components
│   ├── context/                  # State management
│   │   └── MChatContext.tsx      # Global state for assessment
│   ├── data/                     # Assessment data
│   │   ├── questions.ts          # The 20 M-CHAT-R questions
│   │   ├── questionsMapping.ts   # Maps answers to pass/fail
│   │   └── followupquestion.ts   # Follow-up questions                    # 
├── public/                       # Static assets
│   └── background.jpeg           # Background image
└── README.md
```

---

## Important Notes

- This is a **screening tool**, not a diagnosis.
- Always discuss results with a healthcare provider.
- Early intervention can make a big difference.

---

## License & Credits

M-CHAT-R/F © Robins, D., Fein, D., & Barton, M. (2009).  
This app is for educational and screening use only.

---

## Contributing

Pull requests and feedback are welcome!

Similar code found with 2 license types