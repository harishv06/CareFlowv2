# CareFlow v2 - Hospital Staff Dashboard

Digital healthcare management system developed for Tamil Nadu Government hospitals, designed to streamline patient flow and improve operational efficiency across OPD services.

## Overview

CareFlow v2 is a comprehensive hospital staff dashboard created for the Tamil Nadu Health & Family Welfare Department. The system enables real-time management of outpatient services, doctor availability, laboratory operations, and patient communication.

**Note:** This is an independent project developed for Tamil Nadu Government hospitals and is not an official government application.

## Key Features

### Doctor Management
- Real-time availability tracking for medical staff
- Three-state status system (Available, Busy, Not Available)
- Quick status updates with visual indicators

### OPD Queue System
- Digital token-based patient queue management
- Live current and next token display
- Queue control with start, pause, and skip functionality
- Visual status indicators for queue state

### Laboratory Management
- Status tracking for multiple laboratory departments
- Equipment health monitoring
- Three-state operation status (Open, Busy, Closed)

### Alert System
- SMS notification system for patients
- Pre-configured quick message templates
- Custom message support for specific situations
- Targeted alerts by department

### Manual Controls
- Override capabilities for automated predictions
- Department-specific status updates
- Comprehensive notes and logging

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Code Quality**: ESLint with TypeScript support

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/CareFlowv2.git
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

4. Access the application at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

The optimized production build will be generated in the `dist` directory.

## Project Structure

```
CareFlowv2/
├── public/                          # Static assets
│   └── tamilnadu-government-logo-01.png
├── src/
│   ├── components/                  # React components
│   │   └── HospitalDashboard.tsx   # Main dashboard component
│   ├── types/                       # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx                      # Root component
│   ├── main.tsx                     # Application entry point
│   └── index.css                    # Global styles
├── index.html                       # HTML template
├── package.json                     # Project dependencies
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite configuration
└── tailwind.config.js              # Tailwind CSS configuration
```

## Development

### Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Create optimized production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## Contributing

This project is developed for the Tamil Nadu Government Health & Family Welfare Department. Contributions, suggestions, and feedback are welcome!

## License

This project is developed for public health services.

## Contact

For queries, suggestions, or support:
- **Email**: Harishv06.edu@gmail.com
- **Project**: CareFlow v2 - Hospital Management System
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
