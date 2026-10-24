# 🚀 ResumeCraft Pro - AI-Powered ATS Resume Builder

> **React Frontend** with Freemium & Student Pricing Architecture (Spring Boot Backend Ready)

---

## 🌟 Key Features Built

### 1. 🎨 High-Converting, Engaging UI ("Log dekh kar stay kare")
- **Live Side-by-Side Paper Preview**: Dynamic A4 realistic preview that updates instantly in real-time as you type.
- **ATS Compatibility Score Engine (0-100)**: Real-time dynamic ATS scoring with actionable tips (missing action verbs, quantifying numbers, skills checklist).
- **Multiple Professional Templates**:
  - 🚀 **Modern Tech (ATS Standard)**: High-impact 2-column header, skill pills, clean sectioning.
  - 💼 **Executive Clean**: Traditional corporate look with subtle rules and serif/sans headers.
  - 🎓 **Student & Fresher**: Specially optimized for campus placements, education & projects first.
  - 💎 **Creative Vanguard (Pro Exclusive)**: Sleek colored sidebar with photo avatar.
- **Dynamic Customizer**:
  - 6 Professional Accent Colors (Royal Indigo, Emerald, Electric Blue, Violet, Rose, Slate).
  - 3 Typographic Styles (Plus Jakarta Modern Sans, Space Mono, Classic Serif).
  - Zoom controls (65% to 115%).
- **AI Bullet & Summary Booster**: 1-click enhancement generating impactful, quantifiable action bullets.
- **Pre-loaded Demo Profiles**: Quick 1-click loading of Full Stack Java Developer profile or Fresher Graduate profile so users never face a blank screen.

---

### 2. 🎁 Freemium Usage & Student Discount ("1-2 baar free, fir rupaye lage", "Unacademy students special")
- **Usage Limiter**:
  - Every user starts with **2 Free High-Resolution PDF Downloads**.
  - Tracked in `localStorage` & Header badge (`Free: 2/2 remaining`).
  - Upon using 2 free downloads, the interactive **Upgrade / Paywall Modal** opens automatically.
- **🎓 Unacademy & College Student Discount**:
  - Prominent student discount banner (`Flat 70% OFF for Unacademy / College Students`).
  - Interactive Coupon Code input: Enter `UNACADEMY` or `STUDENT` to trigger celebratory confetti and slash price to **₹29 / ₹49**.
  - Simulated Instant Checkout flow (UPI / QR / Cards dummy flow) that immediately activates Pro status.
- **Demo Reset Button**: In the top "Load Sample Profile" menu, you can click "🔄 Reset Free Trial (2/2 Demo)" anytime to test the flow again.

---

### 3. ☕ Spring Boot Integration Ready
All data operations are centralized in `src/services/apiService.js`. When you build your Spring Boot backend later, simply update:
```javascript
const USE_REAL_BACKEND = true;
const BACKEND_BASE_URL = "http://localhost:8080/api/v1";
```
Endpoints planned for Spring Boot:
- `POST /api/v1/resumes` -> Save user resume JSON
- `GET /api/v1/resumes/current` -> Fetch resume
- `POST /api/v1/payment/verify-order` -> Razorpay / Cashfree webhook verification
- `POST /api/v1/ai/polish-text` -> OpenAI / Gemini ATS enhancement

---

## 🏃‍♂️ How to Run Locally

```bash
cd resume-builder-react
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.
