// mobileDetection.js
// Detects mobile devices and shows a friendly message to use desktop instead

export function checkMobileAndWarn() {
  // Detect mobile devices (phones specifically, not tablets)
  const isMobile = /iPhone|Android/i.test(navigator.userAgent);
  const isSmallScreen = window.innerWidth < 768;
  const isPhone = isMobile && isSmallScreen;

  if (isPhone) {
    showMobileWarning();
  }
}

function showMobileWarning() {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'mobile-warning-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #1a1a2e;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    padding: 20px;
  `;

  // Create friendly modal
  const modal = document.createElement('div');
  modal.style.cssText = `
    background: rgba(0, 0, 0, 0.85);
    border: 2px solid #4a9eff;
    border-radius: 10px;
    padding: 40px 30px;
    max-width: 400px;
    text-align: center;
    color: white;
    font-family: Arial, sans-serif;
    box-shadow: 0 10px 40px rgba(74, 158, 255, 0.3);
  `;

modal.innerHTML = `
  <h2 style="margin: 0 0 20px 0; color: #4a9eff; font-size: 28px; font-weight: normal;">
    Desktop Recommended
  </h2>
  <p style="margin: 0 0 15px 0; line-height: 1.6; color: #ccc; font-size: 16px;">
    Hexamotive is optimized for larger screens like desktops and tablets.
  </p>
  <p style="margin: 0 0 25px 0; line-height: 1.6; color: #999; font-size: 15px;">
    The game requires more screen space to function properly.
  </p>
  <p style="margin: 0; font-size: 15px; color: #4a9eff; font-weight: normal;">
    Please visit this page on a computer or tablet.
  </p>
`;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Prevent interaction with the page
  document.body.style.overflow = 'hidden';
  
  // Disable canvas and other interactions
  const canvas = document.getElementById('hexCanvas');
  if (canvas) {
    canvas.style.pointerEvents = 'none';
  }
}

// Auto-run when imported
checkMobileAndWarn();