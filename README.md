# Opsmate - SEV Incident Management

A modern SEV (severity incident) management interface with an AI-powered copilot experience.

## Features

- **Canvas View**: Interactive investigation workspace with collapsible sections
- **AI Copilot**: Intelligent assistant for incident analysis and resolution
- **Root Cause Analysis**: Automated identification and linking of related incidents
- **Mitigation Tracking**: Action items with one-click execution

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx        # Top navigation bar
│   ├── Canvas.jsx        # Left panel - investigation workspace
│   ├── Copilot.jsx       # Right panel - AI assistant
│   ├── SectionCard.jsx   # Collapsible section component
│   ├── Badge.jsx         # Priority/status badges
│   ├── RootCauseContent.jsx
│   └── MitigationContent.jsx
├── App.jsx               # Main application
├── main.jsx              # Entry point
└── index.css             # Global styles & Tailwind
```

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

