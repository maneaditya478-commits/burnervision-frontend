/**
 * BurnerVision Visual Defect Reference Library Data
 * Integrates official comparative visual references for circular multi-ring cast-iron gas burners.
 *
 * Note: BurnerVision is a visual inspection aid, not a certified gas-safety testing apparatus.
 * RGB visual indications cannot confirm internal micro-cracks, metal fatigue, gas leakage,
 * pressure differentials, or combustion kinetics.
 */

export const REFERENCE_CATEGORIES = [
  {
    id: 'chipping',
    key: 'A',
    name: 'Chipping & Material Loss',
    shortTitle: 'Chipping & Breakage',
    summary: 'Localized loss of cast-iron material along ring edges, rims, or port boundaries.',
    image: '/reference-library/chipping_material_loss.png',
    originalFilename: '5c6c0328-f041-4ec4-8e7f-e7279f4296b4.png',
    severity: 'HIGH',
    module: 'Structural Analysis / Damage Analysis',
    relatedModuleId: 'structural',
    subItems: [
      {
        id: 'outer-ring-chipping',
        name: 'Outer Ring Chipping',
        status: 'POSSIBLE MATERIAL LOSS',
        characteristics: 'Irregular chipped cavity along the perimeter brass/iron outer ring boundary.',
        whyItMatters: 'Compromises burner flame ring boundary integrity and can alter air-fuel perimeter flow.',
        commonCauses: 'Mechanical impact during handling, thermal shock cycle stress, or brittle cast iron fracture.',
        limitations: 'Surface 2D photography cannot measure chip cavity depth or micro-fissure propagation into burner core.',
        action: 'Perform physical calliper bench measurement; replace burner if chip breaches flame port perimeter.'
      },
      {
        id: 'inner-ring-chipping',
        name: 'Inner Ring Chipping',
        status: 'POSSIBLE MATERIAL LOSS',
        characteristics: 'Notch or chunk missing from the inner circular hub rim.',
        whyItMatters: 'Can disrupt burner seating on gas injector manifold and induce uneven central flame ring ignition.',
        commonCauses: 'Rough seating, mechanical tool impact during servicing, or thermal expansion stress.',
        limitations: 'RGB images can identify perimeter irregularity but cannot verify burner gas seat seal hermeticity.',
        action: 'Inspect central mounting seating surface. Check for seating wobble or gap before re-lighting.'
      },
      {
        id: 'edge-material-loss',
        name: 'Edge Material Loss',
        status: 'DEFECT INDICATED',
        characteristics: 'Jagged contour break with missing cast iron material exposing rough grain fracture.',
        whyItMatters: 'Loss of structural metal reduces wall thickness adjacent to gas jet orifices, increasing blowout risk.',
        commonCauses: 'Severe physical impact or progressive thermal cracking leading to detachment.',
        limitations: '2D visual inspection cannot determine whether detached particles fell into gas delivery chambers.',
        action: 'Mandatory manual bench verification. Quarantine burner if fracture touches port cavity.'
      },
      {
        id: 'surface-chipping',
        name: 'Surface Chipping',
        status: 'REVIEW REQUIRED',
        characteristics: 'Shallow spalling or flaking on the top planar face of the burner rings.',
        whyItMatters: 'Creates crevices where cooking grease and carbon soot accumulate, accelerating localized oxidation.',
        commonCauses: 'Thermal cycling, surface corrosion pitting, or metallurgical surface defects.',
        limitations: 'Surface roughness cannot be distinguished from heavy carbon encrustation without physical cleaning.',
        action: 'Wire brush cleaning and ultrasonic bath, followed by surface profile reinspection.'
      }
    ],
    comparison: {
      goodSide: {
        title: 'Good Burner',
        subtitle: 'No chipping, full material intact',
        features: [
          'Smooth, continuous outer brass rim contour',
          'Intact inner ring boundary without notches',
          'Uniform wall thickness adjacent to all port rows'
        ]
      },
      defectiveSide: {
        title: 'Defective Burner',
        subtitle: 'Chipping or material loss',
        callouts: [
          'Outer ring chipping (rim notch)',
          'Edge material loss (jagged fracture)',
          'Inner ring chipping (hub perimeter breach)'
        ],
        whatToLookFor: 'Look for interruptions in the circular perimeter silhouette, lighter rough-textured exposed fracture facets, and missing material notches.'
      }
    }
  },
  {
    id: 'ports',
    key: 'B',
    name: 'Burner Port Defects',
    shortTitle: 'Port Blockage & Missing',
    summary: 'Disrupted gas jet openings including blocked, obstructed, or missing port geometries.',
    image: '/reference-library/port_defects.png',
    originalFilename: '72a85db5-2b03-4d08-b128-d4efb9e2c9a9.png',
    severity: 'CRITICAL',
    module: 'Port Analysis',
    relatedModuleId: 'ports',
    subItems: [
      {
        id: 'missing-burner-port',
        name: 'Missing Burner Port',
        status: 'PORT ANOMALY DETECTED',
        characteristics: 'Absence of expected drilled port orifice in regular circular array, or plugged/damaged port blank.',
        whyItMatters: 'Causes localized flame gap, unburned fuel pocket accumulation, and uneven heat distribution.',
        commonCauses: 'Casting or manufacturing error, plugged port insert, or severe localized slag fusing.',
        limitations: 'Camera perspective angle or shadow may obscure port opening if angle exceeds 5 degrees.',
        action: 'Verify port drill-through using calibrated pin gauge; reject if manufacturing defect.'
      },
      {
        id: 'blocked-burner-ports',
        name: 'Blocked Burner Ports',
        status: 'PORT OBSTRUCTION DETECTED',
        characteristics: 'Clusters of gas orifices filled with dark hardened deposits, boiled-over residues, or carbon slag.',
        whyItMatters: 'Forces gas into adjacent ports causing jet yellow-tipping, incomplete combustion, and elevated CO emissions.',
        commonCauses: 'Boiled-over food grease, polymerized cooking oils, and heavy carbon soot formation.',
        limitations: 'Optical inspection sees surface blockage only; cannot assess internal gas gallery debris.',
        action: 'Chemical degreasing and needle clear-out. Re-test port flow rate prior to putting back in service.'
      },
      {
        id: 'possible-port-obstruction',
        name: 'Possible Port Obstruction',
        status: 'POSSIBLE OBSTRUCTION',
        characteristics: 'Partial narrowing or shadow contrast reduction across port apertures.',
        whyItMatters: 'Reduces port effective discharge coefficient, distorting burner flame stability.',
        commonCauses: 'Particulate dust, light carbon dusting, or oxidation patina forming inside orifice throats.',
        limitations: 'Requires consistent perpendicular lighting to differentiate shadow from true obstruction.',
        action: 'Compressed air blow-out and follow-up high-resolution macro re-capture.'
      },
      {
        id: 'port-damage',
        name: 'Port Damage',
        status: 'REVIEW REQUIRED',
        characteristics: 'Ovalization, edge cracking, or gouging of the circular port aperture rims.',
        whyItMatters: 'Alters laminar gas exit velocity, leading to flame lift-off or flashback into burner mixing chamber.',
        commonCauses: 'Improper mechanical cleaning with oversized metal drill bits or rough wire tools.',
        limitations: 'Sub-millimeter port throat ovality requires micrometer optical verification.',
        action: 'Inspect port rim circle using optical comparator; do not use oversized drill bits for clearing.'
      }
    ],
    comparison: {
      goodSide: {
        title: 'Good Burner',
        subtitle: 'All ports present and open',
        features: [
          'Uniform circular port diameters across all 3 rings',
          'Clear high-contrast dark centers signifying open throats',
          'Consistent angular pitch and radial spacing'
        ]
      },
      defectiveSide: {
        title: 'Defective Burner',
        subtitle: 'Missing or blocked ports',
        callouts: [
          'Missing burner port (orifice absent or filled)',
          'Blocked burner ports (clustered carbon/grease occlusion)',
          'Irregular flame port array'
        ],
        whatToLookFor: 'Look for dark clusters that obscure expected port holes, inconsistent hole spacing, and ports filled with light or crusted matter.'
      }
    }
  },
  {
    id: 'cracks',
    key: 'C',
    name: 'Crack-Like Indications',
    shortTitle: 'Crack Indications',
    summary: 'Linear visual discontinuities and fissures across rings, hubs, or between adjacent ports.',
    image: '/reference-library/crack_indications.png',
    originalFilename: '412bcbe7-e789-40b8-85a5-d7e8bfdf7a7f.png',
    severity: 'CRITICAL',
    module: 'Damage Analysis',
    relatedModuleId: 'damage',
    subItems: [
      {
        id: 'radial-crack',
        name: 'Radial Crack-Like Indication',
        status: 'CRITICAL REVIEW REQUIRED',
        characteristics: 'Dark, irregular linear trace traversing radially from the outer rim inward across port rows.',
        whyItMatters: 'Risk of catastrophic burner fracture during thermal expansion, causing uncontrolled gas release.',
        commonCauses: 'Thermal cycling fatigue, localized quenching thermal shock, or cast iron residual casting stress.',
        limitations: 'Visual RGB inspection cannot verify crack depth, sub-surface propagation, or through-wall penetration.',
        action: 'Immediate quarantine. Perform dye penetrant inspection (PT) or magnetic particle testing (MT).'
      },
      {
        id: 'crack-near-port',
        name: 'Crack Near Port Indication',
        status: 'CRITICAL REVIEW REQUIRED',
        characteristics: 'Stress crack initiating at high-stress concentration port rim edge and propagating to adjacent port or rim.',
        whyItMatters: 'Links port orifices together, creating enlarged irregular gas leaks and burner flashback risks.',
        commonCauses: 'High thermal gradient between combustion flame port boundary and cooler burner body.',
        limitations: 'Surface soot lines can mimic micro-cracks; requires solvent wipe to distinguish.',
        action: 'Solvent wipe test followed by stereomicroscope examination. Replace burner if crack confirmed.'
      },
      {
        id: 'inner-ring-crack',
        name: 'Inner Ring Crack-Like Indication',
        status: 'CRITICAL REVIEW REQUIRED',
        characteristics: 'Fine linear indication branching along the inner ring collar or web.',
        whyItMatters: 'Threatens structural connection between outer burner body and gas intake injector seat.',
        commonCauses: 'Uneven clamping torque or thermal differential between burner base and gas manifold.',
        limitations: 'Surface texture shadows in rough casting may resemble fine fissures.',
        action: 'Manual bench inspection. Perform non-destructive testing before returning to operation.'
      }
    ],
    comparison: {
      goodSide: {
        title: 'Good Burner',
        subtitle: 'No cracks, fully intact',
        features: [
          'Continuous unbroken cast-iron matrix',
          'No dark radial lines interrupting rings',
          'Smooth inter-port bridge web material'
        ]
      },
      defectiveSide: {
        title: 'Defective Burner',
        subtitle: 'Visible cracks',
        callouts: [
          'Radial crack (traversing outer ring to ports)',
          'Crack near port (inter-port stress fracture)',
          'Inner ring crack (branching inner collar fissure)'
        ],
        whatToLookFor: 'Look for thin, jagged dark lines running across rings or connecting ports that do not match the circular machine lines.'
      }
    }
  },
  {
    id: 'deformation',
    key: 'D',
    name: 'Deformation & Warping',
    shortTitle: 'Ring Deformation & Warping',
    summary: 'Distortion of circular concentricity, rim bulging, denting, or out-of-plane planar warping.',
    image: '/reference-library/deformation_warping.png',
    originalFilename: '817d75cc-1595-46c5-808b-c210820a3550.png',
    severity: 'HIGH',
    module: 'Structural Analysis',
    relatedModuleId: 'structural',
    subItems: [
      {
        id: 'ring-deformation',
        name: 'Ring Deformation',
        status: 'POSSIBLE DEFORMATION',
        characteristics: 'Deviation from concentric circular geometry, exhibiting ovality or eccentric radii.',
        whyItMatters: 'Prevents even gas distribution across rings and causes uneven thermal expansion against burner pan.',
        commonCauses: 'Prolonged overheating beyond cast iron metallurgical creep threshold, or heavy dropped loads.',
        limitations: 'Perspective tilt in photographs can simulate circular eccentricity; requires perpendicular overhead capture.',
        action: 'Measure burner with 3-point circular dial indicator on precision surface plate.'
      },
      {
        id: 'ring-bulging',
        name: 'Ring Bulging',
        status: 'POSSIBLE DEFORMATION',
        characteristics: 'Localized outward radial protrusion where the outer rim extends beyond nominal circular radius.',
        whyItMatters: 'Indicates severe localized thermal creep or internal stress release.',
        commonCauses: 'Persistent localized hot spot from blocked adjacent ports concentrating flame energy.',
        limitations: 'Camera lens radial distortion (barrel distortion) must be calibrated out.',
        action: 'Gauge outer circumference against nominal ring template.'
      },
      {
        id: 'outer-ring-dent',
        name: 'Outer Ring Dent',
        status: 'POSSIBLE DEFORMATION',
        characteristics: 'Inward concave depression along the outer brass/iron ring boundary.',
        whyItMatters: 'Pinches outer ring port orifices and compromises mechanical fit into cooktop chassis.',
        commonCauses: 'High-energy mechanical drop or rough handling against hard steel surfaces.',
        limitations: 'Shadow variations near rim can appear as indentations.',
        action: 'Check outer diameter clearance against chassis receptacle; discard if ports are compressed.'
      },
      {
        id: 'warping-or-bending',
        name: 'Warping or Bending (Side View)',
        status: 'POSSIBLE WARPING',
        characteristics: 'Out-of-plane vertical curvature where burner does not lie flat on a planar reference surface.',
        whyItMatters: 'Causes burner rocking, gas manifold seal leakage, and asymmetric secondary air suction.',
        commonCauses: 'Uneven cooling, severe thermal gradients, or water quenching on hot burner.',
        limitations: 'Top-down RGB photography has limited sensitivity to vertical z-axis warp; side view or 3D profilometry required.',
        action: 'Place burner on flat granite surface plate; test with feeler gauge (reject if gap > 0.5mm).'
      }
    ],
    comparison: {
      goodSide: {
        title: 'Good Burner',
        subtitle: 'Circular shape, no deformation',
        features: [
          'Perfect concentric circles verified by green dashed reference',
          'Uniform circular clearance around all 360 degrees',
          'Side view: flat, even horizontal baseline'
        ]
      },
      defectiveSide: {
        title: 'Defective Burner',
        subtitle: 'Ring deformation / bending / warping',
        callouts: [
          'Outer ring bulge (red dashed reference reveals deviation)',
          'Outer ring dent (inward rim displacement)',
          'Side view (warped): visible vertical curvature and bowing'
        ],
        whatToLookFor: 'Compare actual ring perimeter against a true circle. Look for wavy outer contours, flat spots, or out-of-plane vertical bending in profile.'
      }
    }
  },
  {
    id: 'surface',
    key: 'E',
    name: 'Surface Conditions & Contamination',
    shortTitle: 'Surface Oxidation & Deposits',
    summary: 'Surface rust, carbon soot encrustation, polymerized oil/grease, and heat burn discoloration.',
    image: '/reference-library/surface_conditions.png',
    originalFilename: '2309d64f-2c26-42a7-98a3-8d3046c6da11.png',
    severity: 'MEDIUM',
    module: 'Surface Analysis',
    relatedModuleId: 'surface',
    subItems: [
      {
        id: 'rust-corrosion',
        name: 'Visual Rust / Corrosion Indication',
        status: 'VISUAL INDICATION DETECTED',
        characteristics: 'Orange-brown to reddish-brown granular oxide deposits across cast iron and brass interfaces.',
        whyItMatters: 'Progressive iron oxidation degrades metal matrix, widens port throat tolerances, and causes spalling.',
        commonCauses: 'Exposure to ambient moisture, corrosive cleaning chemicals, or saline food spills.',
        limitations: 'Visual color clustering cannot measure oxide layer thickness or pit depth beneath the oxide.',
        action: 'Mechanical wire brushing followed by rust converter treatment if surface pitting is shallow.'
      },
      {
        id: 'soot-carbon-deposits',
        name: 'Soot / Carbon Deposits',
        status: 'SURFACE DEPOSIT DETECTED',
        characteristics: 'Velvety matte-black to crusty carbonaceous coating adhering to ring grooves and port exits.',
        whyItMatters: 'Indicates unburned hydrocarbons from rich fuel mixture; progressively clogs port apertures.',
        commonCauses: 'Improper gas-to-air mixer shutter ratio, low gas supply pressure, or burner port restriction.',
        limitations: 'Cannot distinguish elemental carbon from polymerized cooking grease without chemical spot test.',
        action: 'Clean burner thoroughly; inspect and calibrate gas-air mixing venturi.'
      },
      {
        id: 'oil-grease-contamination',
        name: 'Oil / Grease Contamination',
        status: 'CONTAMINATION DETECTED',
        characteristics: 'Glossy, specular, dark amber-to-black tacky film covering cast iron texture.',
        whyItMatters: 'Combusts into acrid smoke during burner firing and bakes into rock-hard carbon port blockages.',
        commonCauses: 'Cooking oil overflow, spatter, and lack of regular degreasing maintenance.',
        limitations: 'High specular reflection from grease can produce false glare warnings during image capture.',
        action: 'Alkaline degreasing wash and warm water rinse. Ensure 100% dry before re-assembly.'
      },
      {
        id: 'discoloration-staining',
        name: 'Discoloration / Staining & Burn Marks',
        status: 'THERMAL PATINA DETECTED',
        characteristics: 'Blue, violet, straw, or dark brown rainbow heat-tint bands on brass and cast iron rings.',
        whyItMatters: 'Marks localized high-temperature zones and past extreme thermal exposure.',
        commonCauses: 'Natural high-temperature gas flame operation, localized flame impingement, or chemical stain reaction.',
        limitations: 'Normal thermal tempering oxidation often looks dramatic without indicating metallurgical failure.',
        action: 'Acceptable if uniform and unassociated with deformation or metal loss; log baseline coloration.'
      },
      {
        id: 'dirt-dust-deposits',
        name: 'Dirt and Surface Deposits',
        status: 'REVIEW REQUIRED',
        characteristics: 'Dry mineral dust, food particulate crusts, or foreign debris on burner deck.',
        whyItMatters: 'Fouls port gas flow and can ignite as glowing embers.',
        commonCauses: 'General kitchen environment airborne dust, seasoning spills, and lack of cover.',
        limitations: 'Shallow loose dirt easily wiped off may trigger false anomaly detection.',
        action: 'Standard solvent wipe and dry prior to secondary inspection.'
      }
    ],
    comparison: {
      goodSide: {
        title: 'Good Burner',
        subtitle: 'Clean surface, no corrosion or contamination',
        features: [
          'Uniform dark cast-iron matte texture',
          'Clean brass trim rings free of rust or grease glaze',
          'Zoom inspection confirms clear metal pores with zero deposit build-up'
        ]
      },
      defectiveSide: {
        title: 'Defective Burner',
        subtitle: 'Surface contamination or corrosion',
        callouts: [
          'Rust / corrosion (rough orange-brown oxide)',
          'Soot / carbon deposit (matte black crusting)',
          'Oil / grease contamination (specular gloss film)',
          'Discoloration / burn marks (thermal oxidation rings)'
        ],
        whatToLookFor: 'Look for discoloration patches, glossy or oily sheen, orange rust speckling, and dark soot cakes obscuring the natural cast iron metal finish.'
      }
    }
  },
  {
    id: 'good-reference',
    key: 'F',
    name: 'Good Reference Standard',
    shortTitle: 'Acceptable Baseline',
    summary: 'Baseline reference standard displaying intact rings, open ports, circular geometry, and uniform surface appearance.',
    image: '/reference-library/chipping_material_loss.png', // Left side shows the verified good burner standard
    originalFilename: 'IMG_1222_reference_standard',
    severity: 'NORMAL',
    module: 'All Modules Baseline',
    relatedModuleId: 'good',
    subItems: [
      {
        id: 'intact-rings',
        name: 'Intact Outer and Inner Rings',
        status: 'NORMAL',
        characteristics: 'Continuous concentric circular rims with unbroken brass highlights and no chipping.',
        whyItMatters: 'Guarantees uniform physical flame stabilization and secure burner chassis seating.',
        commonCauses: 'Proper manufacture, careful handling, and operation within design thermal limits.',
        limitations: 'Confirms visual surface completeness only; internal microstructure requires metallurgical audit.',
        action: 'Pass visual check. Maintain standard periodic inspection schedule.'
      },
      {
        id: 'visible-unobstructed-ports',
        name: 'Visible, Unobstructed Ports',
        status: 'NORMAL',
        characteristics: 'All drilled port orifices clearly visible, circular, unobstructed, and evenly spaced across all 3 rings.',
        whyItMatters: 'Ensures stoichiometric air-fuel mixing, clean blue flame combustion, and minimal CO emission.',
        commonCauses: 'Routine cleaning, correct combustion parameters, and no past grease clogs.',
        limitations: 'Camera lighting must illuminate port centers uniformly to avoid false dark shadows.',
        action: 'Pass port audit. Ready for operation.'
      },
      {
        id: 'no-obvious-chipping',
        name: 'No Obvious Chipping or Material Loss',
        status: 'NORMAL',
        characteristics: 'Complete edges and surfaces without notches, flakes, breaks, or missing cast iron sections.',
        whyItMatters: 'Maintains design wall thicknesses and burner structural integrity.',
        commonCauses: 'Intact structural matrix without mechanical damage.',
        limitations: 'Sub-surface voids not visible via RGB surface photography.',
        action: 'Pass material loss audit.'
      },
      {
        id: 'no-crack-indications',
        name: 'No Obvious Crack-Like Indications',
        status: 'NORMAL',
        characteristics: 'Smooth uninterrupted surface between ports and across ring webs without linear fissures.',
        whyItMatters: 'No risk of structural fracture propagation during thermal cycling.',
        commonCauses: 'Uniform thermal distribution and proper cast iron metallurgy.',
        limitations: 'Micro-cracks below camera optical resolution (~0.1mm) cannot be detected without dye penetrant.',
        action: 'Pass crack screening.'
      },
      {
        id: 'no-deformation',
        name: 'No Obvious Deformation or Warping',
        status: 'NORMAL',
        characteristics: 'Perfect concentric circles conforming to nominal circular guide; flat horizontal plane in side view.',
        whyItMatters: 'Maintains even gap against cooktop chassis and avoids mechanical binding.',
        commonCauses: 'Burner operated within rated thermal limits without thermal shock quenching.',
        limitations: 'Planar flatness best verified on granite plate with feeler gauge.',
        action: 'Pass geometry audit.'
      },
      {
        id: 'acceptable-surface',
        name: 'Clean or Acceptable Surface Appearance',
        status: 'NORMAL',
        characteristics: 'Consistent cast-iron texture with normal light patina; no active corrosion crusts or heavy grease blankets.',
        whyItMatters: 'Optimal heat radiation and minimal contamination transfer.',
        commonCauses: 'Proper operational maintenance and correct storage.',
        limitations: 'Surface patina develops naturally over normal operating hours.',
        action: 'Pass surface check. Standard routine cleaning recommended.'
      }
    ],
    comparison: {
      goodSide: {
        title: 'Verified Good Burner Reference',
        subtitle: 'Optimal baseline standard',
        features: [
          'All ports present, round, and clear',
          'Complete outer, middle, and inner rings',
          'Zero chipping, crack traces, or visible deformation',
          'Uniform clean surface with acceptable operational patina'
        ]
      },
      defectiveSide: {
        title: 'Comparison Standard',
        subtitle: 'Reference baseline for defect detection',
        callouts: [
          'Used to visually compare against suspected defects',
          'Enables immediate side-by-side differentiation in library'
        ],
        whatToLookFor: 'Use this reference standard as the visual benchmark. Any divergence from concentricity, complete rings, clear ports, or uniform surfaces requires investigation.'
      }
    }
  }
];

export const GOOD_VS_DEFECTIVE_PAIRS = [
  {
    id: 'comp-chipping',
    title: 'Intact Ring vs Chipping / Material Loss',
    category: 'Chipping and Material Loss',
    image: '/reference-library/chipping_material_loss.png',
    originalFilename: '5c6c0328-f041-4ec4-8e7f-e7279f4296b4.png',
    goodLabel: 'Intact Outer & Inner Rings',
    goodDesc: 'Full material intact, smooth continuous circular contour, uniform rim thickness.',
    defectLabel: 'Outer & Inner Ring Chipping / Material Loss',
    defectDesc: 'Rim notch chipping, jagged edge break, and inner hub material loss exposing raw rough matrix.',
    whatToLookFor: 'Scan the perimeter circle for breaks in outline smoothness. Look for bright jagged fracture faces where metal has detached.',
    recommendedAction: 'Measure remaining wall thickness. If chipping intersects any port orifice or chassis seat, replace burner.'
  },
  {
    id: 'comp-ports',
    title: 'Open Ports vs Blocked / Missing Ports',
    category: 'Burner Port Defects',
    image: '/reference-library/port_defects.png',
    originalFilename: '72a85db5-2b03-4d08-b128-d4efb9e2c9a9.png',
    goodLabel: 'All Ports Present & Open',
    goodDesc: 'Regular circular ports with dark, unobstructed orifices across outer, middle, and inner rings.',
    defectLabel: 'Missing & Blocked Burner Ports',
    defectDesc: 'One or more missing drilled ports (left) and clusters of ports heavily occluded with hardened carbon/grease (right).',
    whatToLookFor: 'Count and trace circular port arrays. Check for ports that appear solid, lighter in color, or buried under black encrustation.',
    recommendedAction: 'Clean with wire brush and solvent soak. For persistently blocked or missing ports, gauge orifice or replace unit.'
  },
  {
    id: 'comp-cracks',
    title: 'Intact Surface vs Crack-Like Indication',
    category: 'Crack-Like Indications',
    image: '/reference-library/crack_indications.png',
    originalFilename: '412bcbe7-e789-40b8-85a5-d7e8bfdf7a7f.png',
    goodLabel: 'Intact Surface (No Cracks)',
    goodDesc: 'Continuous cast-iron web without linear discontinuities or stress fissures.',
    defectLabel: 'Visible Crack-Like Indications',
    defectDesc: 'Radial crack traversing the outer ring, inter-port stress fissure, and branching inner ring crack.',
    whatToLookFor: 'Look for dark, jagged lines that cut across the circular rings or bridge two gas port holes. Wipe surface to verify not a loose hair or soot smudge.',
    recommendedAction: 'Remove burner from service immediately. Conduct solvent wipe test and dye penetrant inspection.'
  },
  {
    id: 'comp-deformation',
    title: 'Circular Ring vs Deformed Ring',
    category: 'Deformation & Warping',
    image: '/reference-library/deformation_warping.png',
    originalFilename: '817d75cc-1595-46c5-808b-c210820a3550.png',
    goodLabel: 'Circular Shape, No Deformation',
    goodDesc: 'Concentric rings conforming to circle template; perfectly flat horizontal profile in side view.',
    defectLabel: 'Ring Deformation / Bending / Warping',
    defectDesc: 'Outer ring bulge exceeding circle line, inward rim dent, and prominent vertical out-of-plane bowing in side view.',
    whatToLookFor: 'Overlay a circular reference ring over the image. In side profile, check for vertical waves or gap when placed on a flat counter.',
    recommendedAction: 'Check seating fit and rock stability on flat granite plate with feeler gauge. Replace if warped beyond 0.5 mm.'
  },
  {
    id: 'comp-surface',
    title: 'Clean Surface vs Corrosion / Contamination',
    category: 'Surface Conditions',
    image: '/reference-library/surface_conditions.png',
    originalFilename: '2309d64f-2c26-42a7-98a3-8d3046c6da11.png',
    goodLabel: 'Clean Surface (No Corrosion)',
    goodDesc: 'Clean matte iron texture, clear brass highlight rings, zero active rust or grease film.',
    defectLabel: 'Surface Contamination & Oxidation',
    defectDesc: 'Orange-brown rust corrosion, matte black carbon soot, glossy oil/grease glaze, and thermal burn marks.',
    whatToLookFor: 'Look for color contrast anomalies: orange speckles (rust), dark baked encrustations (soot), shiny wet-looking patches (grease), or rainbow discoloration bands.',
    recommendedAction: 'Clean with industrial degreaser and brass wire brush. If oxidation has caused structural pitting, measure remaining metal.'
  }
];
