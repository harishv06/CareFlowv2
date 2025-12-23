# CareFlow v2 - Hospital Staff Dashboard

A modern hospital management dashboard for the Tamil Nadu Government Health & Family Welfare Department.

## Features

- **Doctor Status Management**: Real-time tracking of doctor availability
- **OPD Queue Management**: Token-based queue system for outpatient departments
- **Lab Status Monitoring**: Track status and equipment health of various labs
- **Manual Override**: Staff can override AI predictions for department status
- **Patient Alerts**: Send SMS alerts to patients for delays, closures, and custom messages

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd CareFlowv2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
CareFlowv2/
├── src/
│   ├── components/
│   │   └── HospitalDashboard.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## License

This project is developed for the Tamil Nadu Government Health & Family Welfare Department.
