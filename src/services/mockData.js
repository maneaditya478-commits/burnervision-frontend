/**
 * BurnerVision Mock Data & Simulated Computer Vision Output Generator
 * Explicitly labeled as "Demo / Simulated CV Results"
 */

// Helper to generate canvas-based procedural burner images for realistic visualization presets
export function generateSampleBurnerImage(type = 'normal') {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';

  // Dark background
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 600, 600);

  // Cast iron circular burner base
  const centerX = 300;
  const centerY = 300;

  // Outer rim shadow
  const grad = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, 270);
  grad.addColorStop(0, '#334155');
  grad.addColorStop(0.7, '#1e293b');
  grad.addColorStop(1, '#0f172a');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 270, 0, Math.PI * 2);
  ctx.fill();

  // Cast iron texture rings
  const ringRadii = [240, 170, 100];
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 14;
  ringRadii.forEach(r => {
    ctx.beginPath();
    ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
    ctx.stroke();
  });

  // Draw ports (small circular gas jet openings around rings)
  ctx.fillStyle = '#090d16';
  ringRadii.forEach((r, idx) => {
    const count = (idx + 1) * 24;
    for (let i = 0; i < count; i++) {
      const angle = (i * 2 * Math.PI) / count;
      const px = centerX + r * Math.cos(angle);
      const py = centerY + r * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(px, py, idx === 0 ? 5 : 4, 0, Math.PI * 2);
      ctx.fill();

      // If dirty or damaged, simulate clogged ports or surface rust
      if (type === 'cleaning' && i % 5 === 0) {
        ctx.fillStyle = '#78350f'; // Dirt deposit
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#090d16';
      }
    }
  });

  // Center hub hole
  ctx.fillStyle = '#020617';
  ctx.beginPath();
  ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Add condition-specific visual indicators
  if (type === 'cleaning') {
    // Dirt and soot deposit patches
    ctx.fillStyle = 'rgba(120, 53, 15, 0.45)';
    ctx.beginPath();
    ctx.arc(centerX - 60, centerY + 80, 55, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(180, 83, 9, 0.35)';
    ctx.beginPath();
    ctx.arc(centerX + 110, centerY - 90, 70, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 'inspection') {
    // Rust / corrosion visual indications and crack-like discontinuity line
    ctx.fillStyle = 'rgba(194, 65, 12, 0.6)'; // Rust patch
    ctx.beginPath();
    ctx.arc(centerX + 90, centerY + 90, 65, 0, Math.PI * 2);
    ctx.fill();

    // Crack-like discontinuity across outer ring
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(centerX + 210, centerY - 80);
    ctx.lineTo(centerX + 265, centerY - 120);
    ctx.stroke();

    // Secondary discontinuity
    ctx.beginPath();
    ctx.moveTo(centerX - 150, centerY - 140);
    ctx.lineTo(centerX - 180, centerY - 110);
    ctx.stroke();
  }

  return canvas.toDataURL('image/jpeg', 0.85);
}

// Default initial history dataset
export const INITIAL_INSPECTIONS_HISTORY = [
  {
    id: 'INSP-2026-0901',
    date: '2026-09-06 14:22',
    timestamp: 1788704520000,
    burnerName: 'Cast-Iron Triple Ring #A12',
    isDemo: true,
    overall_damage_status: 'NORMAL',
    overall_score: 94,
    recommendation: 'No significant visual abnormality detected. Regular routine inspection recommended in 6 months.',
    image_quality: { score: 96, status: 'EXCELLENT', lighting: 'Optimal', glare: 'Low' },
    burner_detection: { detected: true, confidence: 0.98, bbox: [50, 50, 500, 500] },
    geometry: { outer_radius_px: 240, inner_radius_px: 100, ring_count: 3, center: [300, 300], symmetry_score: 0.96, radial_deviation: '1.2%', perspective_status: 'Normal' },
    ports: { total_visible: 144, suspected_obstructed: 2, confidence: 0.95 },
    dirt: { score: 12, level: 'LOW', coverage_percent: 3.4, explanation: 'Minimal surface soot or carbon dust observed.' },
    corrosion: { score: 8, level: 'NONE', coverage_percent: 0.8, explanation: 'Visual corrosion indication minimal.' },
    discoloration: { score: 14, level: 'LOW', explanation: 'Uniform thermal oxidation.' },
    surface_anomaly: { score: 10, level: 'NORMAL' },
    crack_evidence: { score: 2, confidence: 0.05, candidate_count: 0, explanation: 'No crack-like visual indications detected.' },
    ring_discontinuity: { count: 0, explanation: 'All circular ring contours are continuous.' },
    structural_damage: { score: 3, confidence: 0.04, status: 'INTACT', explanation: 'No structural damage visually detected.' },
    deformation: { status: 'NONE', magnitude: '0.2%' },
    perspective: { status: 'Normal', angle_deg: 2.1 },
    disclaimer: 'Visual inspection aid — not a safety certification'
  },
  {
    id: 'INSP-2026-0902',
    date: '2026-09-05 10:15',
    timestamp: 1788603300000,
    burnerName: 'Commercial Multi-Ring #C08',
    isDemo: true,
    overall_damage_status: 'CLEANING REQUIRED',
    overall_score: 72,
    recommendation: 'Visual surface deposits detected. Thorough port cleaning and carbon deposit removal recommended.',
    image_quality: { score: 88, status: 'GOOD', lighting: 'Acceptable', glare: 'Moderate' },
    burner_detection: { detected: true, confidence: 0.96, bbox: [48, 52, 498, 495] },
    geometry: { outer_radius_px: 238, inner_radius_px: 98, ring_count: 3, center: [298, 302], symmetry_score: 0.91, radial_deviation: '2.8%', perspective_status: 'Normal' },
    ports: { total_visible: 144, suspected_obstructed: 18, confidence: 0.91 },
    dirt: { score: 68, level: 'HIGH', coverage_percent: 28.5, explanation: 'Heavy grease and soot deposits obscuring outer port slots.' },
    corrosion: { score: 25, level: 'MILD', coverage_percent: 7.2, explanation: 'Mild visual corrosion indication around middle ring.' },
    discoloration: { score: 45, level: 'MODERATE', explanation: 'Localized thermal discoloration patches.' },
    surface_anomaly: { score: 62, level: 'ATTENTION' },
    crack_evidence: { score: 10, confidence: 0.12, candidate_count: 0, explanation: 'No crack-like visual indications detected.' },
    ring_discontinuity: { count: 0, explanation: 'Ring contours intact.' },
    structural_damage: { score: 12, confidence: 0.10, status: 'INTACT', explanation: 'No structural damage visually detected.' },
    deformation: { status: 'NONE', magnitude: '0.5%' },
    perspective: { status: 'Normal', angle_deg: 3.4 },
    disclaimer: 'Visual inspection aid — not a safety certification'
  },
  {
    id: 'INSP-2026-0903',
    date: '2026-09-03 16:40',
    timestamp: 1788453600000,
    burnerName: 'Heavy Industrial Cast Burner #X9',
    isDemo: true,
    overall_damage_status: 'INSPECTION NEEDED',
    overall_score: 41,
    recommendation: 'Possible crack-like visual indication and surface oxidation detected. Manual physical bench inspection recommended.',
    image_quality: { score: 92, status: 'EXCELLENT', lighting: 'Good', glare: 'Low' },
    burner_detection: { detected: true, confidence: 0.99, bbox: [50, 50, 500, 500] },
    geometry: { outer_radius_px: 242, inner_radius_px: 102, ring_count: 3, center: [300, 300], symmetry_score: 0.82, radial_deviation: '4.5%', perspective_status: 'Possible distortion' },
    ports: { total_visible: 144, suspected_obstructed: 32, confidence: 0.88 },
    dirt: { score: 55, level: 'MODERATE', coverage_percent: 18.2, explanation: 'Moderate carbon build-up on port ridges.' },
    corrosion: { score: 74, level: 'HIGH', coverage_percent: 34.0, explanation: 'Significant visual corrosion indication across outer rim.' },
    discoloration: { score: 68, level: 'HIGH', explanation: 'Severe heat oxidation discoloration.' },
    surface_anomaly: { score: 76, level: 'HIGH' },
    crack_evidence: { score: 82, confidence: 0.89, candidate_count: 2, explanation: 'Possible crack-like visual indication detected on outer ring sector.' },
    ring_discontinuity: { count: 2, explanation: 'Possible discontinuity in outer ring contour line.' },
    structural_damage: { score: 78, confidence: 0.85, status: 'SUSPECTED', explanation: 'Possible structural damage visually indicated.' },
    deformation: { status: 'POSSIBLE DEFORMATION', magnitude: '3.1%' },
    perspective: { status: 'Possible perspective distortion', angle_deg: 8.7 },
    disclaimer: 'Visual inspection aid — not a safety certification'
  }
];

/**
 * Generate a complete simulated CV result object for any user-uploaded or captured image.
 * Explicitly follows V0.1 -> V0.2 -> V0.3 -> V0.4.1 pipeline contract.
 */
export function generateMockAnalysisResult(imageSrc, presetType = 'preset_random') {
  const sampleTypes = ['normal', 'cleaning', 'inspection'];
  const chosenType = presetType.includes('normal')
    ? 'normal'
    : presetType.includes('cleaning')
    ? 'cleaning'
    : presetType.includes('inspection')
    ? 'inspection'
    : sampleTypes[Math.floor(Math.random() * sampleTypes.length)];

  const isNormal = chosenType === 'normal';
  const isCleaning = chosenType === 'cleaning';

  const overall_damage_status = isNormal
    ? 'NORMAL'
    : isCleaning
    ? 'CLEANING REQUIRED'
    : 'INSPECTION NEEDED';

  const overall_score = isNormal ? 92 : isCleaning ? 68 : 38;

  const recommendation = isNormal
    ? 'No significant visual abnormality detected. Standard periodic cleaning recommended.'
    : isCleaning
    ? 'Visual surface deposits detected. Thorough cleaning of gas ports recommended.'
    : 'Possible crack-like visual indication and surface degradation detected. Manual inspection recommended.';

  const now = new Date();
  const id = `INSP-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

  return {
    id,
    date: now.toISOString().replace('T', ' ').substring(0, 16),
    timestamp: now.getTime(),
    isDemoResult: true,
    demoLabel: 'Demo / Simulated CV Results',
    disclaimer: 'Visual inspection aid — not a safety certification',
    overall_damage_status,
    overall_score,
    recommendation,
    
    // V0.1 Image Quality
    image_quality: {
      score: 91,
      status: 'GOOD',
      resolution: '1920x1080',
      lighting: 'Adequate uniform illumination',
      glare: 'Low',
      occlusion: 'None',
      blur_score: 12.4
    },
    
    // V0.2 Burner Detection & Geometry
    burner_detection: {
      detected: true,
      confidence: 0.97,
      type: 'Circular Multi-Ring Cast-Iron Burner',
      center_point: [300, 300],
      bounding_box: [40, 40, 520, 520]
    },
    geometry: {
      outer_radius_px: 240,
      middle_radius_px: 170,
      inner_radius_px: 100,
      ring_count: 3,
      symmetry_score: isNormal ? 0.96 : isCleaning ? 0.90 : 0.81,
      radial_deviation: isNormal ? '1.1%' : isCleaning ? '2.5%' : '4.8%',
      perspective_status: isNormal ? 'Normal' : 'Possible perspective distortion'
    },
    ports: {
      total_visible: 144,
      suspected_obstructed: isNormal ? 1 : isCleaning ? 24 : 38,
      confidence: 0.94,
      port_spacing_uniformity: isNormal ? 'High' : 'Reduced by deposits'
    },
    
    // V0.3 Surface Analysis
    dirt: {
      score: isNormal ? 14 : isCleaning ? 76 : 58,
      level: isNormal ? 'LOW' : isCleaning ? 'HIGH' : 'MODERATE',
      coverage_percent: isNormal ? 4.2 : isCleaning ? 31.8 : 22.4,
      explanation: isNormal
        ? 'Minimal carbon soot detected.'
        : 'Visually detected surface deposits obscuring multiple port rows.'
    },
    corrosion: {
      score: isNormal ? 9 : isCleaning ? 28 : 81,
      level: isNormal ? 'NONE' : isCleaning ? 'MILD' : 'HIGH',
      coverage_percent: isNormal ? 1.1 : isCleaning ? 8.4 : 36.2,
      label: 'Visual corrosion indication',
      explanation: isNormal
        ? 'No significant surface rust patterns detected.'
        : 'Visual corrosion indication detected on outer perimeter and port ridges.'
    },
    discoloration: {
      score: isNormal ? 18 : isCleaning ? 42 : 72,
      level: isNormal ? 'NORMAL' : 'HIGH',
      explanation: 'Thermal heat bloom and surface oxidation coloration.'
    },
    surface_anomaly: {
      score: isNormal ? 12 : isCleaning ? 64 : 79,
      level: isNormal ? 'NORMAL' : 'ATTENTION'
    },
    
    // V0.4.1 Damage Analysis
    crack_evidence: {
      score: isNormal ? 4 : isCleaning ? 12 : 86,
      confidence: isNormal ? 0.04 : isCleaning ? 0.11 : 0.91,
      candidate_count: isNormal ? 0 : isCleaning ? 0 : 2,
      label: 'Possible crack-like visual indication',
      explanation: isNormal || isCleaning
        ? 'No crack-like visual indications detected.'
        : 'Possible crack-like visual indication detected near outer ring sector.'
    },
    ring_discontinuity: {
      count: isNormal ? 0 : isCleaning ? 0 : 2,
      label: 'Possible discontinuity',
      explanation: isNormal || isCleaning
        ? 'All circular ring contours are continuous.'
        : 'Possible discontinuity identified in outer ring edge contour.'
    },
    structural_damage: {
      score: isNormal ? 5 : isCleaning ? 15 : 82,
      confidence: isNormal ? 0.05 : isCleaning ? 0.12 : 0.88,
      label: 'Possible structural damage',
      explanation: isNormal || isCleaning
        ? 'No structural damage visually detected.'
        : 'Possible structural damage visually indicated across ring body.'
    },
    deformation: {
      status: isNormal ? 'NONE' : isCleaning ? 'MINOR' : 'POSSIBLE DEFORMATION',
      label: 'Possible deformation',
      magnitude: isNormal ? '0.3%' : isCleaning ? '1.0%' : '3.6%'
    },
    perspective: {
      status: isNormal ? 'Normal' : 'Possible perspective distortion',
      angle_deg: isNormal ? 2.1 : 6.4
    },

    // Image maps base data / preset image URL
    original_image: imageSrc || generateSampleBurnerImage(chosenType)
  };
}
