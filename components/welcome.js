// welcomeScreen.js

export class WelcomeScreen {
  constructor() {
    this.modalId = 'welcome-modal';
    this.createModal();
    this.injectStyles();
  }

  createModal() {
    const modal = document.createElement('div');
    modal.id = this.modalId;
    modal.className = 'welcome-modal';
    
    modal.innerHTML = `
      <div class="welcome-overlay"></div>
      <div class="welcome-content">
        <div class="welcome-header">
          <h1 class="welcome-title">
            <span class="welcome-hex">⬡</span>
            Welcome to Hexamotive
            <span class="welcome-hex">⬡</span>
          </h1>
          <p class="welcome-subtitle">A Hexagonal Transportation & Logistics Empire</p>
        </div>
        
        <div class="welcome-body">
          <div class="welcome-section">
            <h2 class="section-title">🎯 Getting Started</h2>
            <ul class="instruction-list">
              <li><strong>First Hub:</strong> Your first hub is FREE and comes with starter resources (wood, grain, ore)</li>
              <li><strong>Goal:</strong> Build production chains, transport resources, and expand your network</li>
              <li><strong>Resources:</strong> All hubs share a common resource pool shown in the top-right</li>
            </ul>
          </div>

          <div class="welcome-section">
            <h2 class="section-title">🖱️ Controls</h2>
            <div class="controls-grid">
              <div class="control-item">
                <span class="control-icon">🖱️</span>
                <div>
                  <strong>Click</strong>
                  <p>Place buildings, tracks, trains</p>
                </div>
              </div>
              <div class="control-item">
                <span class="control-icon">✋</span>
                <div>
                  <strong>Drag</strong>
                  <p>Pan the camera around</p>
                </div>
              </div>
              <div class="control-item">
                <span class="control-icon">🔍</span>
                <div>
                  <strong>Scroll</strong>
                  <p>Zoom in and out</p>
                </div>
              </div>
              <div class="control-item">
                <span class="control-icon">👆</span>
                <div>
                  <strong>Right-Click</strong>
                  <p>Quick remove items</p>
                </div>
              </div>
            </div>
          </div>

          <div class="welcome-section">
            <h2 class="section-title">🏗️ Building System</h2>
            <ul class="instruction-list">
              <li><strong>Core Buildings:</strong> Hubs for storage and distribution</li>
              <li><strong>Tier 1 (Extract):</strong> Gather raw materials from terrain</li>
              <li><strong>Tier 2 (Refine):</strong> Process materials into advanced goods</li>
              <li><strong>Tier 3 (Powered):</strong> High-tech buildings requiring electricity</li>
              <li><strong>Terrain Matters:</strong> Buildings can only be placed on compatible terrain types</li>
            </ul>
          </div>

          <div class="welcome-section">
            <h2 class="section-title">🚂 Railway System</h2>
            <ul class="instruction-list">
              <li><strong>Tracks:</strong> Place on hex edges to connect buildings (Cost: 1 ore each)</li>
              <li><strong>Trains:</strong> Automatically pick up and deliver resources</li>
              <li><strong>Smart Routing:</strong> Trains randomly choose paths at junctions</li>
              <li><strong>Pickup/Delivery:</strong> Happens at the midpoint of each track segment</li>
              <li><strong>Capacity:</strong> Each train has a cargo limit - plan accordingly</li>
            </ul>
          </div>

          <div class="welcome-section">
            <h2 class="section-title">⚡ Production Chains</h2>
            <ul class="instruction-list">
              <li>Buildings produce resources → stored in their output inventory</li>
              <li>Trains pick up from outputs when passing by</li>
              <li>Trains deliver to buildings that need those inputs (or to hubs)</li>
              <li>Buildings consume inputs to produce more outputs</li>
              <li>Keep production flowing to unlock new technologies!</li>
            </ul>
          </div>

          <div class="welcome-section">
            <h2 class="section-title">💡 Pro Tips</h2>
            <ul class="instruction-list">
              <li>🔴 <strong>Red text</strong> in costs means you can't afford it yet</li>
              <li>🗑️ Removing buildings/tracks <strong>refunds</strong> their cost</li>
              <li>💾 Use the <strong>Save/Load</strong> button (bottom-left) to preserve your progress</li>
              <li>🏢 Click on buildings to see their inventory and production status</li>
              <li>🔋 Some trains need power - build generators to keep them running</li>
            </ul>
          </div>

          <div class="welcome-footer-section">
            <div class="quick-start">
              <h3>⚡ Quick Start Guide</h3>
              <ol>
                <li>Place your free hub on grass or sand</li>
                <li>Build extractors (farms, mines) near your hub</li>
                <li>Connect them with tracks (click hex edges)</li>
                <li>Deploy trains to transport resources</li>
                <li>Expand and unlock new buildings!</li>
              </ol>
            </div>
          </div>
        </div>

        <div class="welcome-actions">
          <button class="welcome-btn" id="start-game-btn">
            Start Building! 🚀
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.attachEventListeners();
  }

  injectStyles() {
    if (document.getElementById('welcome-modal-styles')) return;

    const style = document.createElement('style');
    style.id = 'welcome-modal-styles';
    style.textContent = `
      .welcome-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        display: none;
        align-items: center;
        justify-content: center;
      }

      .welcome-modal.visible {
        display: flex;
      }

      .welcome-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
      }

      .welcome-content {
        position: relative;
        background: rgba(0, 0, 0, 0.85);
        border: 2px solid #444;
        border-radius: 8px;
        max-width: 700px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
      }

      .welcome-header {
        background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);
        padding: 20px;
        border-bottom: 2px solid #ffcc00;
        text-align: center;
      }

      .welcome-title {
        margin: 0;
        font-size: 28px;
        color: #fff;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
      }

      .welcome-hex {
        color: #ffcc00;
        font-size: 32px;
      }

      .welcome-subtitle {
        margin: 8px 0 0 0;
        font-size: 14px;
        color: #aaa;
        font-weight: 400;
      }

      .welcome-body {
        padding: 20px;
      }

      .welcome-section {
        margin-bottom: 20px;
        padding-bottom: 16px;
        border-bottom: 1px solid #444;
      }

      .welcome-section:last-child {
        border-bottom: none;
      }

      .section-title {
        margin: 0 0 12px 0;
        font-size: 16px;
        color: #4a9eff;
        font-weight: 600;
      }

      .instruction-list {
        margin: 0;
        padding-left: 20px;
        color: #ccc;
        line-height: 1.7;
        font-size: 13px;
      }

      .instruction-list li {
        margin-bottom: 6px;
      }

      .instruction-list strong {
        color: #fff;
      }

      .controls-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 10px;
        margin-top: 12px;
      }

      .control-item {
        background: linear-gradient(135deg, #2a2a2a 0%, #222 100%);
        border: 1px solid #444;
        border-radius: 6px;
        padding: 10px;
        display: flex;
        align-items: flex-start;
        gap: 8px;
      }

      .control-icon {
        font-size: 20px;
        flex-shrink: 0;
      }

      .control-item strong {
        display: block;
        color: #fff;
        margin-bottom: 3px;
        font-size: 13px;
      }

      .control-item p {
        margin: 0;
        font-size: 11px;
        color: #aaa;
      }

      .welcome-footer-section {
        background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
        border: 1px solid #444;
        border-radius: 6px;
        padding: 16px;
        margin-top: 8px;
      }

      .quick-start h3 {
        margin: 0 0 12px 0;
        font-size: 16px;
        color: #ffcc00;
      }

      .quick-start ol {
        margin: 0;
        padding-left: 20px;
        color: #ccc;
        line-height: 1.7;
        font-size: 13px;
      }

      .quick-start li {
        margin-bottom: 6px;
      }

      .welcome-actions {
        background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);
        padding: 16px 20px;
        border-top: 2px solid #444;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .welcome-btn {
        padding: 12px 40px;
        border: 2px solid #4a9eff;
        border-radius: 6px;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        background: linear-gradient(135deg, #4a5a6f 0%, #3a4a5f 100%);
        color: white;
        box-shadow: 0 0 12px rgba(74, 158, 255, 0.4);
      }

      .welcome-btn:hover {
        background: linear-gradient(135deg, #5a6a7f 0%, #4a5a6f 100%);
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(74, 158, 255, 0.5);
      }

      .welcome-btn:active {
        transform: translateY(0);
      }

      /* Scrollbar styling */
      .welcome-content::-webkit-scrollbar {
        width: 8px;
      }

      .welcome-content::-webkit-scrollbar-track {
        background: #1a1a1a;
      }

      .welcome-content::-webkit-scrollbar-thumb {
        background: #444;
        border-radius: 4px;
      }

      .welcome-content::-webkit-scrollbar-thumb:hover {
        background: #555;
      }

      /* Mobile responsive */
      @media (max-width: 768px) {
        .welcome-content {
          max-width: 95%;
          margin: 10px;
        }

        .welcome-title {
          font-size: 22px;
        }

        .welcome-hex {
          font-size: 26px;
        }

        .welcome-body {
          padding: 16px;
        }

        .controls-grid {
          grid-template-columns: 1fr;
        }
      }
    `;

    document.head.appendChild(style);
  }

  attachEventListeners() {
    const modal = document.getElementById(this.modalId);
    const startBtn = document.getElementById('start-game-btn');
    const overlay = modal.querySelector('.welcome-overlay');

    const closeModal = () => {
      this.hide();
    };

    startBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Prevent closing when clicking inside the content
    modal.querySelector('.welcome-content').addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('visible')) {
        closeModal();
      }
    });
  }

  show() {
    const modal = document.getElementById(this.modalId);
    if (modal) {
      modal.classList.add('visible');
    }
  }

  hide() {
    const modal = document.getElementById(this.modalId);
    if (modal) {
      modal.classList.remove('visible');
    }
  }
}

// Export a singleton instance for easy use
export const welcomeScreen = new WelcomeScreen();