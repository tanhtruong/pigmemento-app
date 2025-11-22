

# 📱 Pigmemento App  
**Educational Melanoma Recognition Trainer**  
*React Native + Expo mobile app*

> **Disclaimer:**  
> Pigmemento is an **educational tool only** — it is **not intended for diagnosis or clinical decision-making**.

---

## 🚀 Overview

Pigmemento is a mobile training app designed to help **GPs and dermatology learners** practice visual melanoma recognition using real dermoscopic images, guided review tools, and a spaced-repetition workflow.  
It connects to the **Pigmemento API** for case data, model inference, and user progress tracking.

---

## 🧩 Features

### 🧠 Case Quiz  
- View a dermoscopic image + minimal clinical info  
- Guess **benign vs malignant**  
- Immediate feedback after submission

### 🎯 Guided Review  
- Ground-truth explanation  
- Model probabilities (benign/malignant)  
- Grad-CAM heatmap overlay  
- Teaching points and lesion cues

### ⏱️ Timed Drills  
- Quick-fire practice rounds  
- Accuracy + latency tracking

### 🔁 Spaced Repetition  
- Algorithm surfaces cases the user frequently misses

### 📊 Fairness + Metrics  
- Tracks performance across:  
  - Skin tone proxy  
  - Body site  
- Sensitive case selection for training completeness

---

## 🛠️ Tech Stack

### Frontend
- **React Native** (Expo)
- **TypeScript**
- **React Navigation**
- **React Query**
- **Expo Image / File Uploads**

### Backend (separate project)
- ASP.NET Core (C#) Web API  
- PostgreSQL  
- S3 or Cloudflare R2 for images  
- Python or ONNX-based ML inference

---

## 📂 Project Structure

```
pigmemento-app/
  ├─ app/                # Screens and navigation
  ├─ components/         # UI components
  ├─ hooks/              # Theme and data hooks
  ├─ services/           # API clients
  ├─ assets/             # Icons, images
  ├─ theme/              # Light/dark mode styles
  ├─ utils/              # Helpers
  ├─ README.md           # ← this file
  └─ ...
```

---

## ⚙️ Environment Setup

### 1. Install dependencies
```bash
npm install
# or
yarn install
```

### 2. Set up environment variables  
Create `.env`:

```
API_BASE_URL=https://api.pigmemento.app
```

For local backend:
```
API_BASE_URL=http://localhost:5000
```

### 3. Start the development server
```bash
expo start
```

### 4. Run on device / simulator
- iOS Simulator: press **i**  
- Android Emulator: press **a**  
- Physical device: scan QR code via Expo Go

---

## 🔌 API Endpoints Used by the App

### GET /cases  
Fetch quiz cases (no truth in list mode)

### GET /cases/{id}  
Full case details for review screen

### POST /infer  
Uploads an image → returns:  
```json
{
  "probs": { "benign": 0.xx, "malignant": 0.xx },
  "camPngUrl": "https://..."
}
```

### POST /register, POST /login  
JWT-based authentication

### POST /answers  
Stores quiz attempts, correctness, latency

---

## 🎨 Theming & Dark Mode

The app uses a custom `ThemeProvider` with hooks:

```tsx
const { colors } = useTheme();
```

Works on:
- iOS system dark/light mode  
- Manual override (future setting)

---

## 🛡️ Compliance, Privacy & Safety

- No clinical/diagnostic claims  
- All images are anonymized  
- EXIF data removed before storage  
- GDPR-friendly: minimal personal data  
- Educational intent emphasized in UI

---

## 🧪 Development Notes

### Testing
- Jest + React Native Testing Library (planned)
- Manual visual verification for UI & theming

### Linting
```bash
npm run lint
```

### Formatting
```bash
npm run format
```

---

## 📦 Deployment

### App builds (Expo EAS)
```bash
eas build --platform ios
eas build --platform android
```

### Config
- App config in `app.json` / `app.config.ts`
- Production API URL provided via EAS Secrets

---

## 📄 License
Proprietary — internal development use.