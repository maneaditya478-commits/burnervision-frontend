/**
 * BurnerVision API Service Layer
 * Connects frontend to Python/FastAPI backend or provides Demo / Simulated CV Results fallback.
 */

import { generateMockAnalysisResult, INITIAL_INSPECTIONS_HISTORY } from './mockData';

// Configurable API Base URL from environment variable
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Health check endpoint ping
 */
export async function checkBackendHealth(customUrl = API_BASE_URL) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(`${customUrl}/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return {
        online: true,
        pipeline: data.pipeline || 'V0.4.1 Frozen',
        message: 'Connected to BurnerVision FastAPI Backend'
      };
    }
  } catch (err) {
    // Silent catch, fallback offline status
  }

  return {
    online: false,
    pipeline: 'V0.4.1 Frozen (Offline)',
    message: 'Backend unreachable. Using Demo / Simulated CV Results.'
  };
}

/**
 * Send image to backend /analyze or return simulated result
 * @param {string|File} imageInput 
 * @param {boolean} isDemoMode 
 * @param {string} presetType 
 * @param {object|null} imageMeta
 */
export async function analyzeBurnerImage(imageInput, isDemoMode = true, presetType = 'preset_random', imageMeta = null) {
  let imageBase64 = '';

  // Handle File object or base64 string or public URL string
  if (imageInput instanceof File) {
    imageBase64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(imageInput);
    });
  } else if (typeof imageInput === 'string') {
    imageBase64 = imageInput;
  }

  // If in Demo Mode or no backend, return simulated result
  if (isDemoMode) {
    // Artificial 1.2s delay to simulate real CV processing
    await new Promise(r => setTimeout(r, 1200));
    return generateMockAnalysisResult(imageBase64, presetType, imageMeta);
  }

  // Call Live FastAPI backend
  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageBase64 })
    });

    if (!response.ok) {
      throw new Error(`API response error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return {
      ...result,
      isDemoResult: false,
      badge_label: 'LIVE CV ANALYSIS',
      disclaimer: 'Visual inspection aid — not a safety certification'
    };
  } catch (error) {
    console.warn('Backend API request failed. Falling back to Demo Mode:', error.message);
    // Fallback gracefully to demo result with indicator
    const fallbackResult = generateMockAnalysisResult(imageBase64, presetType, imageMeta);
    fallbackResult.demoLabel = 'Demo / Simulated CV Results (API Fallback)';
    return fallbackResult;
  }
}

/**
 * Fetch inspection history log
 */
export async function fetchInspectionHistory(isDemoMode = true) {
  if (isDemoMode) {
    return INITIAL_INSPECTIONS_HISTORY;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/history`);
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    // Fallback to initial mock history
  }

  return INITIAL_INSPECTIONS_HISTORY;
}
