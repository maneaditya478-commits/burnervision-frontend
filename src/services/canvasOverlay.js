/**
 * Canvas Overlay Rendering Helper
 * Draws Computer Vision annotation layers on top of circular multi-ring gas burner images.
 */

export function renderBurnerOverlayCanvas(canvas, imageObj, activeTab, report) {
  if (!canvas || !imageObj || !report) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;

  // Clear canvas with dark background
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, width, height);

  // Draw background image fitted with aspect ratio preservation
  const imgAspect = (imageObj.width && imageObj.height) ? (imageObj.width / imageObj.height) : 1;
  let drawW = width;
  let drawH = height;
  let offsetX = 0;
  let offsetY = 0;

  if (imgAspect > 1) {
    // Landscape
    drawH = width / imgAspect;
    offsetY = (height - drawH) / 2;
  } else if (imgAspect < 1) {
    // Portrait (e.g. 3024x4032)
    drawW = height * imgAspect;
    offsetX = (width - drawW) / 2;
  }

  ctx.drawImage(imageObj, offsetX, offsetY, drawW, drawH);

  if (activeTab === 'original') {
    return; // Plain original image
  }

  const centerX = width / 2;
  const centerY = height / 2;
  const scale = width / 600; // Normalized to 600px canvas coordinates

  const outerR = (report.geometry?.outer_radius_px || 240) * scale;
  const middleR = (report.geometry?.middle_radius_px || 170) * scale;
  const innerR = (report.geometry?.inner_radius_px || 100) * scale;

  ctx.save();

  // 1. ANNOTATED MAP VIEW
  if (activeTab === 'annotated') {
    // Structural Rings (Cyan)
    ctx.strokeStyle = '#06b6d4'; // Cyan
    ctx.lineWidth = 3 * scale;
    ctx.setLineDash([8 * scale, 4 * scale]);
    [outerR, middleR, innerR].forEach(r => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.setLineDash([]);

    // Center point marker
    ctx.fillStyle = '#06b6d4';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 6 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2 * scale;
    ctx.stroke();

    // Detected Ports (White = Normal, Orange = Obstructed)
    const ringRadii = [outerR, middleR, innerR];
    const isCleaningOrDamaged = report.overall_damage_status === 'CLEANING REQUIRED' || report.overall_damage_status === 'INSPECTION NEEDED';

    ringRadii.forEach((r, idx) => {
      const count = (idx + 1) * 24;
      for (let i = 0; i < count; i++) {
        const angle = (i * 2 * Math.PI) / count;
        const px = centerX + r * Math.cos(angle);
        const py = centerY + r * Math.sin(angle);

        const isObstructed = isCleaningOrDamaged && i % 4 === 0;

        ctx.fillStyle = isObstructed ? '#f97316' : '#ffffff'; // Orange vs White
        ctx.beginPath();
        ctx.arc(px, py, (isObstructed ? 4.5 : 3.5) * scale, 0, Math.PI * 2);
        ctx.fill();

        if (isObstructed) {
          ctx.strokeStyle = 'rgba(249, 115, 22, 0.4)';
          ctx.lineWidth = 2 * scale;
          ctx.beginPath();
          ctx.arc(px, py, 7 * scale, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    });

    // Highlighting crack-like indication if present
    if (report.overall_damage_status === 'INSPECTION NEEDED') {
      ctx.strokeStyle = '#ef4444'; // Red
      ctx.lineWidth = 4 * scale;
      ctx.beginPath();
      ctx.moveTo(centerX + outerR * 0.8, centerY - outerR * 0.3);
      ctx.lineTo(centerX + outerR * 0.98, centerY - outerR * 0.5);
      ctx.stroke();

      // Pulsing highlight circle
      ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
      ctx.beginPath();
      ctx.arc(centerX + outerR * 0.9, centerY - outerR * 0.4, 25 * scale, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 2. CRACK & DISCONTINUITY MAP VIEW
  if (activeTab === 'crack') {
    // Darken background slightly to bring out overlay
    ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
    ctx.fillRect(0, 0, width, height);

    if (report.overall_damage_status === 'INSPECTION NEEDED') {
      // Possible crack-like visual indication vector
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 5 * scale;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 10 * scale;

      ctx.beginPath();
      ctx.moveTo(centerX + outerR * 0.78, centerY - outerR * 0.32);
      ctx.lineTo(centerX + outerR * 0.99, centerY - outerR * 0.52);
      ctx.stroke();

      // Candidate points (Red target crosshairs)
      const points = [
        [centerX + outerR * 0.88, centerY - outerR * 0.42],
        [centerX - outerR * 0.6, centerY - outerR * 0.55]
      ];

      points.forEach(([px, py], i) => {
        ctx.strokeStyle = '#f87171';
        ctx.lineWidth = 2 * scale;
        ctx.beginPath();
        ctx.arc(px, py, 14 * scale, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(px, py, 4 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${11 * scale}px sans-serif`;
        ctx.fillText(`Indication #${i + 1}`, px + 18 * scale, py + 4 * scale);
      });
      ctx.shadowBlur = 0;
    } else {
      // Clear notification no cracks
      ctx.fillStyle = '#22c55e';
      ctx.font = `bold ${16 * scale}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('No crack-like visual indications detected', centerX, centerY);
    }
  }

  // 3. DAMAGE MAP VIEW
  if (activeTab === 'damage') {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
    ctx.fillRect(0, 0, width, height);

    if (report.overall_damage_status === 'INSPECTION NEEDED') {
      // Draw structural damage heatmap zone
      const grad = ctx.createRadialGradient(
        centerX + outerR * 0.8, centerY + outerR * 0.3, 10 * scale,
        centerX + outerR * 0.8, centerY + outerR * 0.3, 70 * scale
      );
      grad.addColorStop(0, 'rgba(239, 68, 68, 0.7)');
      grad.addColorStop(0.5, 'rgba(249, 115, 22, 0.4)');
      grad.addColorStop(1, 'rgba(239, 68, 68, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX + outerR * 0.8, centerY + outerR * 0.3, 70 * scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2 * scale;
      ctx.setLineDash([4 * scale, 4 * scale]);
      ctx.beginPath();
      ctx.arc(centerX + outerR * 0.8, centerY + outerR * 0.3, 70 * scale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    } else if (report.overall_damage_status === 'CLEANING REQUIRED') {
      ctx.fillStyle = 'rgba(249, 115, 22, 0.2)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerR, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = '#22c55e';
      ctx.font = `bold ${16 * scale}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('Structure intact — no deformation detected', centerX, centerY);
    }
  }

  // 4. SURFACE ANOMALY MAP VIEW (Dirt & Visual Corrosion Indication)
  if (activeTab === 'surface') {
    // Dirt deposits (Amber overlay blobs)
    ctx.fillStyle = 'rgba(245, 158, 11, 0.45)';
    const dirtBlobs = [
      [centerX - outerR * 0.3, centerY + outerR * 0.4, 45 * scale],
      [centerX + outerR * 0.45, centerY - outerR * 0.45, 55 * scale]
    ];
    dirtBlobs.forEach(([bx, by, br]) => {
      ctx.beginPath();
      ctx.arc(bx, by, br, 0, Math.PI * 2);
      ctx.fill();
    });

    // Visual Corrosion Indications (Rust/Orange-Red blobs)
    if (report.corrosion?.score > 20) {
      ctx.fillStyle = 'rgba(194, 65, 12, 0.55)';
      const rustBlobs = [
        [centerX + outerR * 0.4, centerY + outerR * 0.4, 50 * scale],
        [centerX - outerR * 0.5, centerY - outerR * 0.3, 40 * scale]
      ];
      rustBlobs.forEach(([rx, ry, rr]) => {
        ctx.beginPath();
        ctx.arc(rx, ry, rr, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  }

  ctx.restore();
}
