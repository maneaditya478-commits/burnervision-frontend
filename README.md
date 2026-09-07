# BurnerVision — AI-Based Single-Image Comprehensive Gas Burner Condition Assessment

**Inspect. Analyze. Understand.**

> **AI-assisted visual condition assessment for circular cast-iron gas burners.**

---

## ⚠️ Important Inspection & Safety Disclaimer

**BurnerVision is a visual inspection aid — NOT a gas-safety certification system.**

- This software evaluates RGB camera images to visually detect surface deposits, corrosion indications, geometry symmetry, and crack-like surface discontinuities on circular multi-ring cast-iron gas burners.
- It **does NOT** measure or claim to certify actual LPG gas pressure, LPG leakage, internal gas temperature, internal pipe blockages, or combustion safety parameters.
- All structural and surface outputs strictly use conservative terminology:
  - *"Visual corrosion indication"*
  - *"Possible crack-like visual indication"*
  - *"Possible structural damage"*
  - *"Possible discontinuity"*
  - *"Possible perspective distortion"*

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework**: React 19 + Vite
- **Styling & UI**: Tailwind CSS v4 + Lucide React Icons
- **Data Visualizations**: Recharts
- **State Management**: React Context (`AppContext`) with persistent `localStorage` support
- **Integration Layer**: Unified API Service (`src/services/api.js`) supporting live FastAPI endpoints and built-in **Demo / Simulated CV Results** fallback.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```

---

## 🔌 Connecting to Python / FastAPI Backend

The application is pre-configured with a clean API Service layer (`src/services/api.js`).

### Environment Variable Setup
Create a `.env` file in the root directory (or use `.env.local`):
```env
VITE_API_BASE_URL=http://localhost:8000
```

### FastAPI Integration Contract

#### 1. Analyze Burner Image
- **Endpoint**: `POST /analyze`
- **Payload**:
```json
{
  "image": "data:image/jpeg;base64,..."
}
```
- **Response Schema**:
```json
{
  "id": "INSP-2026-0901",
  "date": "2026-09-07 14:30",
  "timestamp": 1788704520000,
  "overall_damage_status": "NORMAL | CLEANING REQUIRED | INSPECTION NEEDED",
  "overall_score": 92,
  "recommendation": "No significant visual abnormality detected...",
  "image_quality": {
    "score": 91,
    "status": "GOOD",
    "lighting": "Adequate",
    "glare": "Low"
  },
  "burner_detection": {
    "detected": true,
    "confidence": 0.97,
    "center_point": [300, 300]
  },
  "geometry": {
    "outer_radius_px": 240,
    "inner_radius_px": 100,
    "ring_count": 3,
    "symmetry_score": 0.96,
    "radial_deviation": "1.1%",
    "perspective_status": "Normal"
  },
  "ports": {
    "total_visible": 144,
    "suspected_obstructed": 2,
    "confidence": 0.94
  },
  "dirt": {
    "score": 14,
    "level": "LOW",
    "coverage_percent": 4.2,
    "explanation": "Minimal carbon soot detected."
  },
  "corrosion": {
    "score": 9,
    "level": "NONE",
    "coverage_percent": 1.1,
    "explanation": "Visual corrosion indication minimal."
  },
  "crack_evidence": {
    "score": 4,
    "confidence": 0.04,
    "candidate_count": 0,
    "explanation": "No crack-like visual indications detected."
  },
  "ring_discontinuity": {
    "count": 0,
    "explanation": "All circular ring contours are continuous."
  },
  "structural_damage": {
    "score": 5,
    "confidence": 0.05,
    "explanation": "No structural damage visually detected."
  },
  "deformation": {
    "status": "NONE",
    "magnitude": "0.3%"
  },
  "perspective": {
    "status": "Normal",
    "angle_deg": 2.1
  }
}
```

#### 2. Backend Health Check
- **Endpoint**: `GET /health`
- **Response**:
```json
{
  "status": "ok",
  "pipeline": "V0.4.1 Frozen"
}
```

---

## 🎨 Main Dashboard & Features

1. **Sidebar Navigation**: Quick navigation across Dashboard, New Inspection, History, Analytics, System Status, and Settings.
2. **Dashboard**: High-level visual inspection metrics, condition distribution donut chart, and recent activity.
3. **New Inspection Page**:
   - Drag-and-drop file upload zone.
   - Live camera / photo capture button.
   - Quick test presets (Normal, Surface Dirt, Possible Crack).
   - Recommended Photo Capture Guide.
4. **CV Analysis Pipeline Loading**: 6-stage animated processing sequence (V0.1 Image Quality -> V0.2 Geometry -> V0.3 Surface -> V0.4.1 Damage -> Synthesis).
5. **Comprehensive Inspection Report**:
   - Overall status card (NORMAL, CLEANING REQUIRED, INSPECTION NEEDED).
   - Interactive multi-layer visual overlay maps (Original, Annotated, Crack Map, Damage Map, Surface Anomaly Map) with custom map legend.
   - Circular multi-ring SVG geometry diagram (Outer, Middle, Inner rings, ports, radial symmetry).
   - Surface deposit & visual corrosion indication breakdown.
   - Damage & discontinuity breakdown.
   - Actionable recommendations panel.
6. **Inspection History**: Searchable, filterable log with report modal and JSON/Print export.
7. **Analytics Page**: Recharts visual condition distribution, deposit trends, corrosion trends, and ring health radar chart.
8. **System Status**: System diagnostic panel highlighting frozen `V0.4.1` Classical CV Foundation pipeline telemetry.
9. **Settings Page**: API Base URL config and instant **Demo / Simulated CV Results** mode toggle switch.

---

## 📄 License & Version
- **Version**: V0.4.1 Frozen (Classical CV Foundation)
- **Author**: BurnerVision Engineering Team
