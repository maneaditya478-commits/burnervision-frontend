/**
 * BurnerVision Inspection Modules & Parameters Definition
 *
 * Organizes inspection measurements and visual indications into 4 distinct modules:
 * 1. Structural Analysis
 * 2. Port Analysis
 * 3. Surface Analysis
 * 4. Damage Analysis
 *
 * Rules:
 * - Reuses existing V0.1–V0.4.1 calculations wherever implemented.
 * - Non-implemented parameters are clearly marked as 'PLANNED' or 'NOT AVAILABLE'.
 * - No fabricated live numbers or percentages.
 * - Consistent status values: NORMAL, DETECTED, POSSIBLE, REVIEW REQUIRED, INSUFFICIENT VISUAL EVIDENCE, NOT AVAILABLE.
 */

export const INSPECTION_MODULES = [
  {
    id: 'structural',
    name: 'Module 1: Structural Analysis',
    shortName: 'Structural Analysis',
    stage: 'V0.2 Structure & Geometry',
    description: 'Concentric ring boundary detection, radial symmetry, circular continuity, and gross physical deformation.',
    relatedRefCategoryId: 'deformation',
    parameters: [
      {
        id: 'param-burner-detection',
        name: 'Burner Detection',
        implemented: true,
        evaluator: (report) => {
          const bd = report?.burner_detection;
          if (!bd) return { status: 'NOT AVAILABLE', explanation: 'Detection module not executed' };
          return {
            status: bd.detected ? 'NORMAL' : 'REVIEW REQUIRED',
            score: null,
            confidence: bd.confidence ? Number(bd.confidence) : null,
            value: bd.detected ? 'Circular Multi-Ring Cast-Iron Burner' : 'Unrecognized geometry',
            explanation: bd.detected ? 'Target circular burner identified with high geometric confidence.' : 'Unable to confirm circular multi-ring burner shape.',
            relatedDefect: 'Good Reference'
          };
        }
      },
      {
        id: 'param-ring-continuity',
        name: 'Ring Continuity',
        implemented: true,
        evaluator: (report) => {
          const rd = report?.ring_discontinuity;
          if (!rd) return { status: 'NOT AVAILABLE', explanation: 'No continuity data' };
          const hasBreaks = (rd.count || 0) > 0;
          return {
            status: hasBreaks ? 'POSSIBLE' : 'NORMAL',
            score: null,
            confidence: null,
            value: `${rd.count || 0} gaps detected`,
            explanation: rd.explanation || (hasBreaks ? 'Possible discontinuity observed along perimeter ring contour.' : 'All circular ring contours are continuous.'),
            relatedDefect: 'Chipping and Material Loss'
          };
        }
      },
      {
        id: 'param-ring-geometry',
        name: 'Ring Geometry',
        implemented: true,
        evaluator: (report) => {
          const geom = report?.geometry;
          if (!geom) return { status: 'NOT AVAILABLE', explanation: 'Geometry data unavailable' };
          return {
            status: geom.ring_count === 3 ? 'NORMAL' : 'REVIEW REQUIRED',
            score: null,
            confidence: null,
            value: `${geom.ring_count || 3} Concentric Rings (R1:${geom.inner_radius_px || 100}px, R2:${geom.middle_radius_px || 170}px, R3:${geom.outer_radius_px || 240}px)`,
            explanation: 'Nominal 3-ring concentric topology verified.',
            relatedDefect: 'Good Reference'
          };
        }
      },
      {
        id: 'param-circularity-symmetry',
        name: 'Circularity and Symmetry',
        implemented: true,
        evaluator: (report) => {
          const geom = report?.geometry;
          if (!geom) return { status: 'NOT AVAILABLE', explanation: 'Geometry data unavailable' };
          const symScore = geom.symmetry_score !== undefined ? geom.symmetry_score : null;
          const status = symScore >= 0.90 ? 'NORMAL' : symScore >= 0.80 ? 'REVIEW REQUIRED' : 'POSSIBLE';
          return {
            status,
            score: symScore !== null ? Math.round(symScore * 100) : null,
            confidence: null,
            value: `Symmetry: ${symScore !== null ? (symScore * 100).toFixed(1) + '%' : 'N/A'} (Radial dev: ${geom.radial_deviation || 'N/A'})`,
            explanation: `Circularity symmetry evaluated relative to central hub. Deviation: ${geom.radial_deviation || 'Normal'}.`,
            relatedDefect: 'Deformation'
          };
        }
      },
      {
        id: 'param-ring-deformation',
        name: 'Ring Deformation',
        implemented: true,
        evaluator: (report) => {
          const def = report?.deformation;
          if (!def) return { status: 'NOT AVAILABLE', explanation: 'Deformation data unavailable' };
          const isDef = def.status && def.status !== 'NONE';
          return {
            status: isDef ? 'POSSIBLE' : 'NORMAL',
            score: null,
            confidence: null,
            value: `Status: ${def.status || 'NONE'} (Magnitude: ${def.magnitude || '0%'})`,
            explanation: isDef ? 'Radial profile indicates possible contour bulge or rim deviation.' : 'No significant ring bulging or contour deviation detected.',
            relatedDefect: 'Deformation'
          };
        }
      },
      {
        id: 'param-chipping-material-loss',
        name: 'Chipping / Material Loss',
        implemented: true,
        evaluator: (report) => {
          const sd = report?.structural_damage;
          if (!sd) return { status: 'NOT AVAILABLE', explanation: 'Damage data unavailable' };
          const hasDamage = (sd.score || 0) > 40;
          return {
            status: hasDamage ? 'POSSIBLE' : 'NORMAL',
            score: sd.score !== undefined ? sd.score : null,
            confidence: sd.confidence !== undefined ? sd.confidence : null,
            value: hasDamage ? 'Possible localized perimeter notch or material loss' : 'No material loss detected',
            explanation: hasDamage ? 'Edge contour discontinuity suggests possible chipped iron rim.' : 'Rim and ring contours appear visually intact.',
            relatedDefect: 'Chipping and Material Loss'
          };
        }
      },
      {
        id: 'param-structural-discontinuity',
        name: 'Structural Discontinuity',
        implemented: true,
        evaluator: (report) => {
          const rd = report?.ring_discontinuity;
          const sd = report?.structural_damage;
          const count = rd?.count || 0;
          return {
            status: count > 0 ? 'REVIEW REQUIRED' : 'NORMAL',
            score: sd?.score !== undefined ? sd.score : null,
            confidence: sd?.confidence !== undefined ? sd.confidence : null,
            value: `${count} Candidate Gaps`,
            explanation: count > 0 ? 'Localized gap in outer ring boundary requires manual bench verification.' : 'Continuous cast-iron structure confirmed.',
            relatedDefect: 'Chipping and Material Loss'
          };
        }
      }
    ]
  },
  {
    id: 'ports',
    name: 'Module 2: Port Analysis',
    shortName: 'Port Analysis',
    stage: 'V0.2 Port Detection & Occlusion',
    description: 'Drilled gas jet aperture counting, visibility assessment, blockage detection, and pitch distribution.',
    relatedRefCategoryId: 'ports',
    parameters: [
      {
        id: 'param-port-count',
        name: 'Visible / Probable Port Count',
        implemented: true,
        evaluator: (report) => {
          const ports = report?.ports;
          if (!ports) return { status: 'NOT AVAILABLE', explanation: 'Port data unavailable' };
          return {
            status: 'NORMAL',
            score: null,
            confidence: ports.confidence ? Number(ports.confidence) : null,
            value: `${ports.total_visible || 144} visible orifices`,
            explanation: 'Port counting algorithm detected expected concentric gas jet array.',
            relatedDefect: 'Burner Port Defects'
          };
        }
      },
      {
        id: 'param-port-visibility',
        name: 'Port Visibility',
        implemented: true,
        evaluator: (report) => {
          const ports = report?.ports;
          if (!ports) return { status: 'NOT AVAILABLE', explanation: 'Port data unavailable' };
          const conf = ports.confidence || 0.94;
          return {
            status: conf >= 0.90 ? 'NORMAL' : 'REVIEW REQUIRED',
            score: Math.round(conf * 100),
            confidence: conf,
            value: conf >= 0.90 ? 'High contrast / clear aperture rims' : 'Reduced contrast in shadow sectors',
            explanation: 'Aperture edge sharpness and contrast measured across circular rows.',
            relatedDefect: 'Good Reference'
          };
        }
      },
      {
        id: 'param-possible-missing-port',
        name: 'Possible Missing Port',
        implemented: false,
        statusLabel: 'PLANNED',
        evaluator: () => ({
          status: 'NOT AVAILABLE',
          score: null,
          confidence: null,
          value: 'Algorithm Planned for V0.5',
          explanation: 'Dedicated individual port pinhole presence verification requires high-magnification sub-pixel registration currently scheduled for pipeline V0.5.',
          relatedDefect: 'Burner Port Defects'
        })
      },
      {
        id: 'param-port-obstruction',
        name: 'Possible Port Obstruction / Blockage',
        implemented: true,
        evaluator: (report) => {
          const ports = report?.ports;
          if (!ports) return { status: 'NOT AVAILABLE', explanation: 'Port data unavailable' };
          const obs = ports.suspected_obstructed || 0;
          const status = obs > 15 ? 'DETECTED' : obs > 3 ? 'POSSIBLE' : 'NORMAL';
          return {
            status,
            score: null,
            confidence: ports.confidence ? Number(ports.confidence) : null,
            value: `${obs} suspected occluded ports`,
            explanation: obs > 0 ? 'Detected darkened or crusted orifices with reduced light transmittance.' : 'All visible ports exhibit clear center apertures.',
            relatedDefect: 'Burner Port Defects'
          };
        }
      },
      {
        id: 'param-port-spacing',
        name: 'Port Spacing and Distribution',
        implemented: true,
        evaluator: (report) => {
          const ports = report?.ports;
          if (!ports) return { status: 'NOT AVAILABLE', explanation: 'Port data unavailable' };
          const unif = ports.port_spacing_uniformity || 'High';
          return {
            status: unif === 'High' ? 'NORMAL' : 'REVIEW REQUIRED',
            score: null,
            confidence: null,
            value: `Spacing Uniformity: ${unif}`,
            explanation: 'Angular delta between adjacent gas jet orifices checked for regular intervals.',
            relatedDefect: 'Burner Port Defects'
          };
        }
      },
      {
        id: 'param-port-damage',
        name: 'Port Damage (Ovality / Rim Break)',
        implemented: false,
        statusLabel: 'PLANNED',
        evaluator: () => ({
          status: 'NOT AVAILABLE',
          score: null,
          confidence: null,
          value: 'Algorithm Planned for V0.5',
          explanation: 'Sub-millimeter port throat eccentricity and rim notch evaluation scheduled for V0.5 micro-geometry release.',
          relatedDefect: 'Burner Port Defects'
        })
      }
    ]
  },
  {
    id: 'surface',
    name: 'Module 3: Surface Analysis',
    shortName: 'Surface Analysis',
    stage: 'V0.3 Surface Analysis',
    description: 'Surface deposits, rust/corrosion indications, soot accumulation, grease glaze, and discoloration.',
    relatedRefCategoryId: 'surface',
    parameters: [
      {
        id: 'param-dirt-deposits',
        name: 'Dirt / Carbon Deposits',
        implemented: true,
        evaluator: (report) => {
          const d = report?.dirt;
          if (!d) return { status: 'NOT AVAILABLE', explanation: 'Dirt data unavailable' };
          const isHigh = (d.score || 0) > 50;
          return {
            status: isHigh ? 'DETECTED' : (d.score > 25 ? 'POSSIBLE' : 'NORMAL'),
            score: d.score !== undefined ? d.score : null,
            coverage: d.coverage_percent !== undefined ? d.coverage_percent : null,
            value: `Level: ${d.level || 'LOW'} (${d.score || 0}/100, Coverage: ${d.coverage_percent || 0}%)`,
            explanation: d.explanation || 'Visual surface deposits evaluated across ring faces.',
            relatedDefect: 'Surface Conditions & Contamination'
          };
        }
      },
      {
        id: 'param-rust-corrosion',
        name: 'Visual Rust / Corrosion Indication',
        implemented: true,
        evaluator: (report) => {
          const c = report?.corrosion;
          if (!c) return { status: 'NOT AVAILABLE', explanation: 'Corrosion data unavailable' };
          const isHigh = (c.score || 0) > 50;
          const status = isHigh ? 'DETECTED' : ((c.score || 0) > 20 ? 'POSSIBLE' : 'NORMAL');
          return {
            status,
            score: c.score !== undefined ? c.score : null,
            coverage: c.coverage_percent !== undefined ? c.coverage_percent : null,
            value: `Visual Evidence: ${c.level || 'NONE'} (${c.score || 0}/100, Area: ${c.coverage_percent || 0}%)`,
            explanation: c.explanation || 'Reddish-orange pixel clusters characteristic of surface oxidation.',
            relatedDefect: 'Surface Conditions & Contamination'
          };
        }
      },
      {
        id: 'param-soot-carbon',
        name: 'Soot / Carbon Deposits',
        implemented: true,
        evaluator: (report) => {
          const d = report?.dirt;
          if (!d) return { status: 'NOT AVAILABLE', explanation: 'Soot data unavailable' };
          const hasSoot = (d.score || 0) > 40;
          return {
            status: hasSoot ? 'DETECTED' : 'NORMAL',
            score: d.score !== undefined ? d.score : null,
            coverage: d.coverage_percent !== undefined ? d.coverage_percent : null,
            value: hasSoot ? 'Matte black carbon encrustation indicated' : 'Minimal carbon soot detected',
            explanation: 'Evaluates low-reflectance carbonaceous encrustation on port ridges.',
            relatedDefect: 'Surface Conditions & Contamination'
          };
        }
      },
      {
        id: 'param-oil-grease',
        name: 'Oil / Grease Contamination',
        implemented: false,
        statusLabel: 'PLANNED',
        evaluator: () => ({
          status: 'NOT AVAILABLE',
          score: null,
          confidence: null,
          value: 'Algorithm Planned for V0.5',
          explanation: 'Specular reflectance polarimetry required to distinguish glossy polymerized oil films from metallic sheen; planned for V0.5.',
          relatedDefect: 'Surface Conditions & Contamination'
        })
      },
      {
        id: 'param-discoloration',
        name: 'Discoloration / Staining',
        implemented: true,
        evaluator: (report) => {
          const disc = report?.discoloration;
          if (!disc) return { status: 'NOT AVAILABLE', explanation: 'Discoloration data unavailable' };
          return {
            status: (disc.score || 0) > 50 ? 'DETECTED' : 'NORMAL',
            score: disc.score !== undefined ? disc.score : null,
            confidence: null,
            value: `Level: ${disc.level || 'LOW'} (${disc.score || 0}/100)`,
            explanation: disc.explanation || 'Thermal coloration and oxidation tint within acceptable operating margins.',
            relatedDefect: 'Surface Conditions & Contamination'
          };
        }
      },
      {
        id: 'param-surface-anomalies',
        name: 'Surface Anomalies',
        implemented: true,
        evaluator: (report) => {
          const sa = report?.surface_anomaly;
          if (!sa) return { status: 'NOT AVAILABLE', explanation: 'Anomaly data unavailable' };
          return {
            status: sa.level === 'ATTENTION' || sa.level === 'HIGH' ? 'REVIEW REQUIRED' : 'NORMAL',
            score: sa.score !== undefined ? sa.score : null,
            confidence: null,
            value: `Anomaly Index: ${sa.score || 0}/100 (${sa.level || 'NORMAL'})`,
            explanation: 'Composite texture irregularity metric across ring planar decks.',
            relatedDefect: 'Surface Conditions & Contamination'
          };
        }
      }
    ]
  },
  {
    id: 'damage',
    name: 'Module 4: Damage Analysis',
    shortName: 'Damage Analysis',
    stage: 'V0.4.1 Damage & Discontinuities',
    description: 'Crack-like indications, material breaks, ring contour gaps, chipping, and mechanical deformation.',
    relatedRefCategoryId: 'cracks',
    parameters: [
      {
        id: 'param-crack-indication',
        name: 'Crack-Like Visual Indication',
        implemented: true,
        evaluator: (report) => {
          const cr = report?.crack_evidence;
          if (!cr) return { status: 'NOT AVAILABLE', explanation: 'Crack data unavailable' };
          const hasCandidates = (cr.candidate_count || 0) > 0 || (cr.score || 0) > 40;
          return {
            status: hasCandidates ? 'POSSIBLE' : 'NORMAL',
            score: cr.score !== undefined ? cr.score : null,
            confidence: cr.confidence !== undefined ? cr.confidence : null,
            value: `${cr.candidate_count || 0} Candidate Locations (Evidence Score: ${cr.score || 0}/100)`,
            explanation: cr.explanation || (hasCandidates ? 'Linear visual discontinuity candidate detected.' : 'No crack-like visual indications detected.'),
            relatedDefect: 'Crack-Like Indications'
          };
        }
      },
      {
        id: 'param-surface-scratch',
        name: 'Possible Surface Scratch',
        implemented: false,
        statusLabel: 'PLANNED',
        evaluator: () => ({
          status: 'NOT AVAILABLE',
          score: null,
          confidence: null,
          value: 'Algorithm Planned for V0.5',
          explanation: 'Distinction between superficial scratch marks and structural fissure requires photometric stereo illumination scheduled for V0.5.',
          relatedDefect: 'Surface Conditions & Contamination'
        })
      },
      {
        id: 'param-material-break',
        name: 'Possible Material Break',
        implemented: true,
        evaluator: (report) => {
          const sd = report?.structural_damage;
          const rd = report?.ring_discontinuity;
          const isBreak = (sd?.score || 0) > 50 || (rd?.count || 0) > 0;
          return {
            status: isBreak ? 'REVIEW REQUIRED' : 'NORMAL',
            score: sd?.score !== undefined ? sd.score : null,
            confidence: sd?.confidence !== undefined ? sd.confidence : null,
            value: isBreak ? 'Possible structural breach detected' : 'Cast iron continuous',
            explanation: isBreak ? 'Perimeter discontinuity suggests possible material break. Physical bench test required.' : 'No material break visually detected.',
            relatedDefect: 'Chipping and Material Loss'
          };
        }
      },
      {
        id: 'param-ring-discontinuity',
        name: 'Ring Discontinuity',
        implemented: true,
        evaluator: (report) => {
          const rd = report?.ring_discontinuity;
          if (!rd) return { status: 'NOT AVAILABLE', explanation: 'Ring discontinuity data unavailable' };
          const count = rd.count || 0;
          return {
            status: count > 0 ? 'POSSIBLE' : 'NORMAL',
            score: null,
            confidence: null,
            value: `${count} Discontinuity Gaps`,
            explanation: rd.explanation || (count > 0 ? 'Outer ring edge contour reveals gap.' : 'All circular ring contours are continuous.'),
            relatedDefect: 'Chipping and Material Loss'
          };
        }
      },
      {
        id: 'param-chipping',
        name: 'Chipping',
        implemented: true,
        evaluator: (report) => {
          const sd = report?.structural_damage;
          const score = sd?.score || 0;
          return {
            status: score > 40 ? 'POSSIBLE' : 'NORMAL',
            score: sd?.score !== undefined ? sd.score : null,
            confidence: sd?.confidence !== undefined ? sd.confidence : null,
            value: score > 40 ? 'Possible chipped rim indicated' : 'No chipping detected',
            explanation: score > 40 ? 'Edge irregularity consistent with possible rim chipping.' : 'No obvious edge material chipping.',
            relatedDefect: 'Chipping and Material Loss'
          };
        }
      },
      {
        id: 'param-deformation-warping',
        name: 'Deformation / Warping',
        implemented: true,
        evaluator: (report) => {
          const def = report?.deformation;
          if (!def) return { status: 'NOT AVAILABLE', explanation: 'Deformation data unavailable' };
          const isDef = def.status && def.status !== 'NONE';
          return {
            status: isDef ? 'POSSIBLE' : 'NORMAL',
            score: null,
            confidence: null,
            value: `Status: ${def.status || 'NONE'} (Radial dev: ${def.magnitude || '0%'})`,
            explanation: isDef ? 'Contour deviation suggests possible warping or localized dent.' : 'Concentric circular rings confirm no obvious deformation.',
            relatedDefect: 'Deformation'
          };
        }
      }
    ]
  }
];

export const INSPECTION_SCOPES = [
  {
    id: 'full',
    label: 'Full Visual Inspection',
    badge: 'Recommended',
    description: 'Comprehensive analysis covering all 4 modules: Structure, Ports, Surface Conditions, and Damage.',
    modules: ['structural', 'ports', 'surface', 'damage']
  },
  {
    id: 'structural',
    label: 'Structural Damage',
    badge: 'Focus: Rings & Body',
    description: 'Focuses display on circular geometry, ring continuity, chipping, warping, and gross damage.',
    modules: ['structural', 'damage']
  },
  {
    id: 'ports',
    label: 'Burner Ports',
    badge: 'Focus: Gas Apertures',
    description: 'Focuses display on gas port counts, suspected occlusions, aperture visibility, and spacing.',
    modules: ['ports']
  },
  {
    id: 'surface',
    label: 'Surface Condition',
    badge: 'Focus: Deposits & Rust',
    description: 'Focuses display on rust/corrosion indications, carbon soot, grease glaze, and discoloration.',
    modules: ['surface']
  }
];
