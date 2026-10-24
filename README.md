# 🚀 AI Resume Builder & ATS Checker (Uncodemy Edition)

Full-stack production-grade AI Resume Builder and 100% Free Applicant Tracking System (ATS) Checker designed for students and freshers.

## 🏗️ Architecture

```
AiResumeBuilder/
├── resume-builder-react/    # Frontend: React 19 + Vite + Tailwind CSS (Vercel)
└── resume-backend/          # Backend: Spring Boot 3.4.3 + MySQL JPA + Docker (Render)
```

- **Frontend:** React 19, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti, HTML2Canvas & jsPDF.
- **Backend:** Java 21, Spring Boot 3.4.3, Spring Data JPA, MySQL 8.0, Groq AI Llama-3, Redis, Apache Kafka.
- **Database:** MySQL 8.0 (Local & Aiven Cloud).
- **Deployment:**
  - Frontend: **Vercel** (`resume-builder-react` as Root Directory)
  - Backend: **Render** (`resume-backend` as Root Directory with Dockerfile)
  - Database: **Aiven Cloud MySQL**

## 🌟 Key Features
- **100% Free Student ATS Resume Checker:** Evaluates candidate resumes against Taleo, Workday, Greenhouse & iCIMS screening filters.
- **14-Point Recruiter Screening Checklist:** Instant feedback with exact points for contact, skills density, action verbs, and metrics.
- **7 Official Black & White ATS Resume Templates:** Clean monochrome formatting with 0% parsing errors.
- **AI Resume Copilot:** Automated bullet polisher and resume generator powered by Groq AI.
- **Direct Email Delivery & PDF Export:** One-click instant A4 PDF export and email dispatch.

## 🚀 Quick Start

### 1. Backend (Spring Boot + MySQL)
```bash
cd resume-backend
./mvnw clean spring-boot:run
```
API runs on `http://localhost:8080/api/v1`

### 2. Frontend (React + Vite)
```bash
cd resume-builder-react
npm install
npm run dev
```
Client runs on `http://localhost:5173`
