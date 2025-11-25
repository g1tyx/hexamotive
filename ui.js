// ui.js
import { BUILDING_TYPES } from "./buildingTypes.js";
import {
  TRACK_TYPES,
  TRAIN_TYPES,
  getTrackType,
  getTrainType,
} from "./railwayTypes.js";

import { formatNumber } from "./utilities/numberFormatting.js";

export class UIManager {
  constructor(gameState, callbacks) {
    this.gameState = gameState;
    this.callbacks = callbacks;
    this.mode = "building";
    this.selectedBuildingType = "hub";
    this.selectedTrackType = "basic_track";
    this.selectedTrainType = "basic_train";
    this.trainAction = "place-track";
    this.buildingCategory = "special";

    this.createControlsContainerHTML();
    this.init();
  }

  createControlsContainerHTML() {
    let controlsDiv = document.getElementById("controls");
    if (!controlsDiv) {
      controlsDiv = document.createElement("div");
      controlsDiv.id = "controls";
      document.body.appendChild(controlsDiv);
    }

    const uiHTML = `
      <div id="resource-display">
        <div style="font-size: 11px; margin-bottom: 5px; color: #aaa;">
          Hub Resources:
        </div>
        <div id="resource-totals"></div>
      </div>
      
      <div class="main-tabs">
        <ul class="tab-list">
          <li class="tab-item active" data-mode="building">
            <span class="tab-icon">🏢</span>
            <span class="tab-text">Buildings</span>
          </li>
          <li class="tab-item" data-mode="place">
            <span class="tab-icon">🚂</span>
            <span class="tab-text">Rail System</span>
          </li>
          <li class="tab-item" data-mode="remove">
            <span class="tab-icon">❌</span>
            <span class="tab-text">Remove</span>
          </li>
        </ul>
        <div class="tab-panels">
          <div class="tab-panel visible" data-panel="building">
            <div class="sub-tabs">
              <ul class="subtab-list">
                <li class="subtab-item" data-category="special">
                  <span class="subtab-icon">🏗️</span>
                  <span class="subtab-text">Core</span>
                </li>
                <li class="subtab-item" data-category="tier1">
                  <span class="subtab-icon">⛏️</span>
                  <span class="subtab-text">Extract</span>
                </li>
                <li class="subtab-item" data-category="tier2">
                  <span class="subtab-icon">🏭</span>
                  <span class="subtab-text">Refine</span>
                </li>
                <li class="subtab-item" data-category="tier3">
                  <span class="subtab-icon">⚡</span>
                  <span class="subtab-text">Powered</span>
                </li>
              </ul>
            </div>
            <div class="subtab-panels">
              <div class="subtab-panel visible" data-subpanel="special">
                <div id="building-detail-special" class="item-detail"></div>
                <div style="font-size: 11px; margin-bottom: 8px; color: #aaa;">
                  Special Buildings:
                </div>
                <div id="building-options-special"></div>
              </div>
              <div class="subtab-panel" data-subpanel="tier1">
                <div id="building-detail-tier1" class="item-detail"></div>
                <div style="font-size: 11px; margin-bottom: 8px; color: #aaa;">
                  Tier 1 - Basic Resources:
                </div>
                <div id="building-options-tier1"></div>
              </div>
              <div class="subtab-panel" data-subpanel="tier2">
                <div id="building-detail-tier2" class="item-detail"></div>
                <div style="font-size: 11px; margin-bottom: 8px; color: #aaa;">
                  Tier 2 - Processing:
                </div>
                <div id="building-options-tier2"></div>
              </div>
              <div class="subtab-panel" data-subpanel="tier3">
                <div id="building-detail-tier3" class="item-detail"></div>
                <div style="font-size: 11px; margin-bottom: 8px; color: #aaa;">
                  Tier 3 - Advanced:
                </div>
                <div id="building-options-tier3"></div>
              </div>
            </div>
          </div>
          
          <div class="tab-panel" data-panel="place">
            <div class="sub-tabs">
              <ul class="subtab-list">
                <li class="subtab-item selected" data-action="place-track">
                  <span class="subtab-icon">🛤️</span>
                  <span class="subtab-text">Track</span>
                </li>
                <li class="subtab-item" data-action="place-train">
                  <span class="subtab-icon">🚆</span>
                  <span class="subtab-text">Train</span>
                </li>
              </ul>
            </div>
            <div class="subtab-panels">
              <div class="subtab-panel visible" data-subpanel="place-track">
                <div id="track-detail" class="item-detail"></div>
                <div style="font-size: 11px; margin-bottom: 8px; color: #aaa;">
                  Select Track Type:
                </div>
                <div id="track-options"></div>
              </div>
              <div class="subtab-panel" data-subpanel="place-train">
                <div id="train-detail" class="item-detail"></div>
                <div style="font-size: 11px; margin-bottom: 8px; color: #aaa;">
                  Select Train Type:
                </div>
                <div id="train-type-options"></div>
              </div>
            </div>
          </div>
          
          <div class="tab-panel" data-panel="remove">
            <div style="font-size: 13px; margin-bottom: 5px; color: #aaa;">
              Click on a track or building to remove it.<br/> <br/> 
              <b> Right clicking is a more convenient way to remove </b><br/> <br/> 
              Removed buildings and tracks will refund building costs to your hubs. <br/> <br/> 
              Trains can be removed from a Train Depot Building
            </div>
          </div>
        </div>
      </div>
    `;

    controlsDiv.innerHTML = uiHTML;

    if (!document.getElementById("ui-styles")) {
      const style = document.createElement("style");
      style.id = "ui-styles";
      style.textContent = `
        #controls {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.85);
          color: white;
          padding: 12px;
          border-radius: 8px;
          font-size: 14px;
          max-width: 380px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
        }
        
        #resource-display {
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid #444;
        }
        #resource-totals {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .resource-item {
          background: linear-gradient(135deg, #2a2a2a 0%, #222 100%);
          border: 1px solid #444;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .resource-amount {
          font-weight: bold;
          color: #4a9eff;
        }
        
        .main-tabs {
          margin-top: 8px;
        }
        .tab-list {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 4px;
        }
        .tab-item {
          background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);
          padding: 10px 16px;
          border-radius: 8px 8px 0 0;
          cursor: pointer;
          position: relative;
          border: 2px solid #444;
          border-bottom: none;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          flex: 1;
        }
        .tab-item:hover:not(.active) {
          background: linear-gradient(180deg, #333 0%, #222 100%);
          border-color: #555;
        }
        .tab-item.active {
          background: #2a2a2a;
          border-color: #ffcc00;
          border-bottom-color: #2a2a2a;
          z-index: 10;
        }
        .tab-icon {
          font-size: 18px;
          filter: grayscale(0.5);
          transition: filter 0.2s;
        }
        .tab-item.active .tab-icon {
          filter: grayscale(0);
        }
        .tab-text {
          font-size: 11px;
          font-weight: 500;
          color: #999;
          transition: color 0.2s;
        }
        .tab-item.active .tab-text {
          color: #ffcc00;
        }
        .tab-item:hover .tab-text {
          color: #ccc;
        }
        
        .tab-panels {
          background: #2a2a2a;
          padding: 14px;
          border-radius: 0 6px 6px 6px;
          border: 2px solid #444;
          border-top: 2px solid #ffcc00;
          min-height: 120px;
        }
        .tab-panel {
          display: none;
        }
        .tab-panel.visible {
          display: block;
        }
        
        .sub-tabs {
          margin: -6px -6px 12px -6px;
          padding: 0;
        }
        .subtab-list {
          display: flex;
          list-style: none;
          margin: 0 0 16px 0;
          padding: 0;
          gap: 8px;
          border-bottom: 2px solid #444;
        }
        .subtab-item {
          background: transparent;
          padding: 8px 6px;
          cursor: pointer;
          position: relative;
          border: none;
          border-bottom: 3px solid transparent;
          margin-bottom: -2px;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 6px;
          flex: 1;
          justify-content: center;
        }
        .subtab-item:hover:not(.selected) {
          background: rgba(255, 255, 255, 0.05);
          border-bottom-color: #666;
        }
        .subtab-item.selected {
          background: transparent;
          border-bottom-color: #4a9eff;
        }
        .subtab-icon {
          font-size: 14px;
          filter: grayscale(0.5);
        }
        .subtab-item.selected .subtab-icon {
          filter: grayscale(0);
        }
        .subtab-text {
          font-size: 11px;
          font-weight: 500;
          color: #888;
          transition: color 0.2s;
        }
        .subtab-item.selected .subtab-text {
          color: #4a9eff;
        }
        .subtab-item:hover .subtab-text {
          color: #aaa;
        }
        
        .subtab-panels {
          background: transparent;
          padding: 0;
          border: none;
        }
        .subtab-panel {
          display: none;
        }
        .subtab-panel.visible {
          display: block;
        }
        
        .item-detail {
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          border: 2px solid #4a9eff;
          border-radius: 6px;
          padding: 12px;
          margin-bottom: 12px;
          min-height: 60px;
        }
        .item-detail.empty {
          display: none;
        }
        .item-detail-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .item-detail-emoji {
          font-size: 24px;
        }
        .item-detail-name {
          font-size: 16px;
          font-weight: 600;
          color: #fff;
        }
        .item-detail-info {
          font-size: 12px;
          color: #bbb;
          line-height: 1.5;
        }
        
        .building-option, .track-option, .train-option {
          background: linear-gradient(135deg, #333 0%, #2a2a2a 100%);
          color: white;
          border: 2px solid #555;
          padding: 8px 12px;
          margin: 4px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          display: inline-block;
          transition: all 0.2s ease;
        }
        .building-option:hover:not(.locked), 
        .track-option:hover:not(.locked), 
        .train-option:hover:not(.locked) {
          background: linear-gradient(135deg, #3a3a3a 0%, #333 100%);
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        .building-option.selected, 
        .track-option.selected, 
        .train-option.selected {
          background: linear-gradient(135deg, #4a5a6f 0%, #3a4a5f 100%);
          border-color: #4a9eff;
          box-shadow: 0 0 12px rgba(74, 158, 255, 0.4);
        }
        .building-option.locked, 
        .track-option.locked, 
        .train-option.locked {
          background: linear-gradient(135deg, #4a3333 0%, #3a2a2a 100%);
          border-color: #6a4444;
          cursor: pointer;
          filter: none;
          opacity: 1;
        }
        .building-option.locked:hover, 
        .track-option.locked:hover, 
        .train-option.locked:hover {
          background: linear-gradient(135deg, #5a3a3a 0%, #4a3333 100%);
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        .building-cost, .track-cost, .train-cost {
          font-size: 11px;
          color: #ccc;
          margin-top: 4px;
          font-weight: 500;
        }
        .building-cost.insufficient, 
        .track-cost.insufficient, 
        .train-cost.insufficient {
          color: #ff6b6b;
          font-weight: 600;
        }
      `;
      document.head.appendChild(style);
    }
  }

  init() {
    this.setupMainTabs();
    this.setupBuildingSubTabs();
    this.setupRailSubTabs();
    this.setupBuildingPalette();
    this.updateResourceDisplay();
    this.startResourceRefreshLoop();
  }

  startResourceRefreshLoop() {
    this.resourceRefreshInterval = setInterval(() => {
      this.updateResourceDisplay();
      this.refreshBuildingPalette();
      this.refreshTrackPalette();
      this.refreshTrainTypePalette();
    }, 500);
  }

  destroy() {
    if (this.resourceRefreshInterval) {
      clearInterval(this.resourceRefreshInterval);
    }
  }

  setupMainTabs() {
    document.querySelectorAll(".tab-item").forEach((tab) => {
      tab.addEventListener("click", () => {
        this.setMode(tab.dataset.mode);
      });
    });
  }

  setupBuildingSubTabs() {
    document.querySelectorAll(".subtab-item[data-category]").forEach((tab) => {
      tab.addEventListener("click", () => {
        const category = tab.dataset.category;
        this.buildingCategory = category;

        document
          .querySelectorAll(".subtab-item[data-category]")
          .forEach((t) => {
            t.classList.remove("selected");
          });
        tab.classList.add("selected");

        document
          .querySelectorAll(".subtab-panel[data-subpanel]")
          .forEach((panel) => {
            const panelCategory = panel.dataset.subpanel;
            if (panelCategory === category) {
              panel.classList.add("visible");
            } else {
              panel.classList.remove("visible");
            }
          });
      });
    });
  }

  setupRailSubTabs() {
    document.querySelectorAll(".subtab-item[data-action]").forEach((tab) => {
      tab.addEventListener("click", () => {
        const action = tab.dataset.action;
        this.trainAction = action;

        document.querySelectorAll(".subtab-item[data-action]").forEach((t) => {
          t.classList.remove("selected");
        });
        tab.classList.add("selected");

        document
          .querySelectorAll(".subtab-panel[data-subpanel]")
          .forEach((panel) => {
            if (panel.dataset.subpanel === action) {
              panel.classList.add("visible");
            } else {
              panel.classList.remove("visible");
            }
          });

        this.notifyModeChange();
      });
    });

    this.updateTrackPalette();
    this.updateTrainTypePalette();
  }

  setMode(mode) {
    this.mode = mode;

    document.querySelectorAll(".tab-item").forEach((t) => {
      t.classList.remove("active");
    });
    const activeTab = document.querySelector(`[data-mode="${mode}"]`);
    if (activeTab) activeTab.classList.add("active");

    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.classList.remove("visible");
    });
    const panel = document.querySelector(`[data-panel="${mode}"]`);
    if (panel) panel.classList.add("visible");

    // Restore the previous state when switching back to a tab
    if (this.mode === "building") {
      // Restore building category subtab visibility
      document.querySelectorAll(".subtab-item[data-category]").forEach((t) => {
        if (t.dataset.category === this.buildingCategory) {
          t.classList.add("selected");
        } else {
          t.classList.remove("selected");
        }
      });

      document
        .querySelectorAll(".subtab-panel[data-subpanel]")
        .forEach((subpanel) => {
          if (subpanel.dataset.subpanel === this.buildingCategory) {
            subpanel.classList.add("visible");
          } else {
            subpanel.classList.remove("visible");
          }
        });

      // Refresh the building palette and detail
      this.updateBuildingPalette();
      this.updateBuildingSelectionState();
      this.updateBuildingDetail();
    } else if (this.mode === "place") {
      // Restore rail system subtab visibility
      document.querySelectorAll(".subtab-item[data-action]").forEach((t) => {
        if (t.dataset.action === this.trainAction) {
          t.classList.add("selected");
        } else {
          t.classList.remove("selected");
        }
      });

      document
        .querySelectorAll(".subtab-panel[data-subpanel]")
        .forEach((subpanel) => {
          if (subpanel.dataset.subpanel === this.trainAction) {
            subpanel.classList.add("visible");
          } else {
            subpanel.classList.remove("visible");
          }
        });

      // Refresh the track/train palettes and details based on current action
      if (this.trainAction === "place-track") {
        this.updateTrackPalette();
        this.updateTrackSelectionState();
        this.updateTrackDetail();
      } else if (this.trainAction === "place-train") {
        this.updateTrainTypePalette();
        this.updateTrainTypeSelectionState();
        this.updateTrainDetail();
      }
    }

    this.notifyModeChange();
  }

  notifyModeChange() {
    if (this.callbacks.onModeChange) {
      if (this.mode === "place") {
        const action = this.trainAction;
        if (action === "place-track") {
          this.callbacks.onModeChange("place");
        } else if (action === "place-train") {
          this.callbacks.onModeChange("train");
        }
      } else {
        this.callbacks.onModeChange(this.mode);
      }
    }
  }

  updateTrackPalette() {
    const container = document.getElementById("track-options");
    if (!container) return;

    container.innerHTML = "";

    Object.values(TRACK_TYPES).forEach((trackType) => {
      const button = document.createElement("button");
      button.className = "track-option";
      button.dataset.trackType = trackType.id;

      const canAfford = this.canAffordTrack(trackType);
      const costText = this.formatTrackCost(trackType);

      button.innerHTML = `
        <div>${trackType.emoji} ${trackType.name}</div>
        ${costText ? `<div class="track-cost">${costText}</div>` : ""}
      `;

      if (!trackType.unlocked) {
        button.classList.add("locked");
        button.title = "Locked - unlock through progression";
      } else if (!canAfford) {
        button.classList.add("locked");
        button.title = "Not enough resources";
      }

      if (trackType.id === this.selectedTrackType) {
        button.classList.add("selected");
      }

      button.addEventListener("click", () => {
        if (trackType.unlocked && this.canAffordTrack(trackType)) {
          this.selectTrack(trackType.id);
        }
      });

      container.appendChild(button);
    });

    this.updateTrackDetail();
  }

  updateTrainTypePalette() {
    const container = document.getElementById("train-type-options");
    if (!container) return;

    container.innerHTML = "";

    Object.values(TRAIN_TYPES).forEach((trainType) => {
      const button = document.createElement("button");
      button.className = "train-option";
      button.dataset.trainType = trainType.id;

      const canAfford = this.canAffordTrain(trainType);
      const costText = this.formatTrainCost(trainType);

      button.innerHTML = `
        <div>${trainType.emoji} ${trainType.name}</div>
        ${costText ? `<div class="train-cost">${costText}</div>` : ""}
      `;

      if (!trainType.unlocked) {
        button.classList.add("locked");
        button.title = "Locked - unlock through progression";
      } else if (!canAfford) {
        button.classList.add("locked");
        button.title = "Not enough resources";
      }

      if (trainType.id === this.selectedTrainType) {
        button.classList.add("selected");
      }

      button.addEventListener("click", () => {
        if (trainType.unlocked && this.canAffordTrain(trainType)) {
          this.selectTrainType(trainType.id);
        }
      });

      container.appendChild(button);
    });

    this.updateTrainDetail();
  }

  canAffordTrack(trackType) {
    if (!trackType.cost) return true;
    const hubTotals = this.gameState.hubResourceTotals || {};
    for (const [resourceType, requiredAmount] of Object.entries(
      trackType.cost
    )) {
      const availableAmount = hubTotals[resourceType] || 0;
      if (availableAmount < requiredAmount) return false;
    }
    return true;
  }

  canAffordTrain(trainType) {
    if (!trainType.cost) return true;
    const hubTotals = this.gameState.hubResourceTotals || {};
    for (const [resourceType, requiredAmount] of Object.entries(
      trainType.cost
    )) {
      const availableAmount = hubTotals[resourceType] || 0;
      if (availableAmount < requiredAmount) return false;
    }
    return true;
  }

  canAffordBuilding(buildingType) {
    if (buildingType.id === "hub" && !this.gameState.initialHubPlaced) {
      return true;
    }
    if (!buildingType.cost) return true;
    const hubTotals = this.gameState.hubResourceTotals || {};
    for (const [resourceType, requiredAmount] of Object.entries(
      buildingType.cost
    )) {
      const availableAmount = hubTotals[resourceType] || 0;
      if (availableAmount < requiredAmount) return false;
    }
    return true;
  }

formatTrackCost(trackType) {
  if (!trackType.cost) return "";
  const hubTotals = this.gameState.hubResourceTotals || {};
  const costParts = [];
  for (const [resourceType, amount] of Object.entries(trackType.cost)) {
    const available = hubTotals[resourceType] || 0;
    const insufficient = available < amount;
    if (insufficient) {
      costParts.push(`<span style="color: #ff6b6b;">${amount} ${resourceType}</span>`);
    } else {
      costParts.push(`${amount} ${resourceType}`);
    }
  }
  return costParts.join(", ");
}

formatTrainCost(trainType) {
  if (!trainType.cost) return "";
  const hubTotals = this.gameState.hubResourceTotals || {};
  const costParts = [];
  for (const [resourceType, amount] of Object.entries(trainType.cost)) {
    const available = hubTotals[resourceType] || 0;
    const insufficient = available < amount;
    if (insufficient) {
      costParts.push(`<span style="color: #ff6b6b;">${amount} ${resourceType}</span>`);
    } else {
      costParts.push(`${amount} ${resourceType}`);
    }
  }
  return costParts.join(", ");
}

  formatBuildingCost(buildingType) {
    if (!buildingType.cost) return "";
    const hubTotals = this.gameState.hubResourceTotals || {};
    const costParts = [];
    for (const [resourceType, amount] of Object.entries(buildingType.cost)) {
      const available = hubTotals[resourceType] || 0;
      const insufficient = available < amount;
      if (insufficient) {
        costParts.push(
          `<span style="color: #ff6b6b;">${amount} ${resourceType}</span>`
        );
      } else {
        costParts.push(`${amount} ${resourceType}`);
      }
    }
    return costParts.join(", ");
  }

  selectTrack(trackTypeId) {
    this.selectedTrackType = trackTypeId;
    this.updateTrackSelectionState();
    this.updateTrackDetail();
    if (this.callbacks.onTrackSelect) {
      this.callbacks.onTrackSelect(this.selectedTrackType);
    }
  }

  selectTrainType(trainTypeId) {
    this.selectedTrainType = trainTypeId;
    this.updateTrainTypeSelectionState();
    this.updateTrainDetail();
    if (this.callbacks.onTrainTypeSelect) {
      this.callbacks.onTrainTypeSelect(this.selectedTrainType);
    }
  }

  updateTrackSelectionState() {
    document.querySelectorAll(".track-option").forEach((button) => {
      if (button.dataset.trackType === this.selectedTrackType) {
        button.classList.add("selected");
      } else {
        button.classList.remove("selected");
      }
    });
  }

  updateTrainTypeSelectionState() {
    document.querySelectorAll(".train-option").forEach((button) => {
      if (button.dataset.trainType === this.selectedTrainType) {
        button.classList.add("selected");
      } else {
        button.classList.remove("selected");
      }
    });
  }

  setupBuildingPalette() {
    // Setup click handlers for each category
    const categories = ["special", "tier1", "tier2", "tier3"];
    categories.forEach((category) => {
      const container = document.getElementById(`building-options-${category}`);
      if (container) {
        container.addEventListener("click", (e) => {
          const button = e.target.closest(".building-option");
          if (!button) return;

          const buildingTypeId = button.dataset.buildingType;
          const buildingType = Object.values(BUILDING_TYPES).find(
            (bt) => bt.id === buildingTypeId
          );

          if (buildingType) {
            this.selectBuilding(buildingTypeId);
          }
        });
      }
    });

    this.updateBuildingPalette();
  }

  updateBuildingPalette() {
    const categories = ["special", "tier1", "tier2", "tier3"];

    categories.forEach((category) => {
      const container = document.getElementById(`building-options-${category}`);
      if (!container) return;

      container.innerHTML = "";

      const buildingsInCategory = Object.values(BUILDING_TYPES).filter(
        (bt) => bt.category === category
      );

      buildingsInCategory.forEach((buildingType) => {
        const button = document.createElement("button");
        button.className = "building-option";
        button.dataset.buildingType = buildingType.id;

        const canAfford = this.canAffordBuilding(buildingType);
        const costText = this.formatBuildingCost(buildingType);

        button.innerHTML = `
          <div>${buildingType.emoji} ${buildingType.name}</div>
          ${costText ? `<div class="building-cost">${costText}</div>` : ""}
        `;

        if (!canAfford) {
          button.classList.add("locked");
        }

        if (buildingType.id === this.selectedBuildingType) {
          button.classList.add("selected");
        }

        container.appendChild(button);
      });
    });

    this.updateBuildingDetail();
  }

  updateResourceDisplay() {
    const container = document.getElementById("resource-totals");
    if (!container) return;

    const hubTotals = this.gameState.hubResourceTotals || {};
    container.innerHTML = "";

    if (Object.keys(hubTotals).length === 0) {
      container.innerHTML =
        '<div style="color: #888; font-size: 11px;">No resources yet</div>';
      return;
    }

    Object.entries(hubTotals).forEach(([resourceType, amount]) => {
      const resourceItem = document.createElement("div");
      resourceItem.className = "resource-item";

      const resourceEmojis = {
        wood: "🪵",
        ore: "⛏️",
        coal: "🪨",
        iron: "🔩",
        grain: "🌾",
        stone: "🪨",
        planks: "📏",
        steel: "🔩",
        gold: "🪙",
      };

      const emoji = resourceEmojis[resourceType] || "📦";

      resourceItem.innerHTML = `
        <span>${emoji}</span>
        <span>${resourceType}:</span>
        <span class="resource-amount">${formatNumber(amount)}</span>
      `;

      container.appendChild(resourceItem);
    });
  }

  selectBuilding(buildingTypeId) {
    this.selectedBuildingType = buildingTypeId;

    // Find which category this building belongs to
    const buildingType = Object.values(BUILDING_TYPES).find(
      (bt) => bt.id === buildingTypeId
    );

    if (buildingType && buildingType.category) {
      this.buildingCategory = buildingType.category;

      // Update category tab selection
      document.querySelectorAll(".subtab-item[data-category]").forEach((t) => {
        if (t.dataset.category === buildingType.category) {
          t.classList.add("selected");
        } else {
          t.classList.remove("selected");
        }
      });

      // Update category panel visibility
      document
        .querySelectorAll(".subtab-panel[data-subpanel]")
        .forEach((panel) => {
          if (panel.dataset.subpanel === buildingType.category) {
            panel.classList.add("visible");
          } else {
            panel.classList.remove("visible");
          }
        });
    }

    this.updateBuildingSelectionState();
    this.updateBuildingDetail();
    if (this.callbacks.onBuildingSelect) {
      this.callbacks.onBuildingSelect(this.selectedBuildingType);
    }
  }

  updateBuildingSelectionState() {
    document.querySelectorAll(".building-option").forEach((button) => {
      if (button.dataset.buildingType === this.selectedBuildingType) {
        button.classList.add("selected");
      } else {
        button.classList.remove("selected");
      }
    });
  }

  getMode() {
    if (this.mode === "place") {
      const action = this.trainAction;
      if (action === "place-track") return "place";
      else if (action === "place-train") return "train";
    }
    return this.mode;
  }

  getSelectedBuilding() {
    return this.selectedBuildingType;
  }

  getSelectedTrackType() {
    return this.selectedTrackType;
  }

  getSelectedTrainType() {
    return this.selectedTrainType;
  }

  refreshBuildingPalette() {
    if (this.mode === "building") {
      this.updateBuildingAffordability();
    }
  }

  refreshTrackPalette() {
    if (this.mode === "place" && this.trainAction === "place-track") {
      this.updateTrackAffordability();
    }
  }

  refreshTrainTypePalette() {
    if (this.mode === "place" && this.trainAction === "place-train") {
      this.updateTrainTypeAffordability();
    }
  }

  updateBuildingAffordability() {
    Object.values(BUILDING_TYPES).forEach((buildingType) => {
      const button = document.querySelector(
        `[data-building-type="${buildingType.id}"]`
      );
      if (!button) return;

      const canAfford = this.canAffordBuilding(buildingType);
      const costText = this.formatBuildingCost(buildingType);

      const costElement = button.querySelector(".building-cost");
      if (costElement && costText) {
        costElement.innerHTML = costText; // Changed from textContent to innerHTML
        if (canAfford) {
          costElement.classList.remove("insufficient");
        } else {
          costElement.classList.add("insufficient");
        }
      }

      if (canAfford) {
        button.classList.remove("locked");
      } else {
        button.classList.add("locked");
      }
    });
  }

  updateTrackAffordability() {
    Object.values(TRACK_TYPES).forEach((trackType) => {
      const button = document.querySelector(
        `[data-track-type="${trackType.id}"]`
      );
      if (!button) return;

      const canAfford = this.canAffordTrack(trackType);
      const costText = this.formatTrackCost(trackType);

      const costElement = button.querySelector(".track-cost");
      if (costElement && costText) {
        costElement.innerHTML = costText;
        if (canAfford) {
          costElement.classList.remove("insufficient");
        } else {
          costElement.classList.add("insufficient");
        }
      }

      if (!trackType.unlocked) {
        button.classList.add("locked");
        button.title = "Locked - unlock through progression";
      } else if (canAfford) {
        button.classList.remove("locked");
        button.title = "";
      } else {
        button.classList.add("locked");
        button.title = "Not enough resources";
      }
    });
  }

  updateTrainTypeAffordability() {
    Object.values(TRAIN_TYPES).forEach((trainType) => {
      const button = document.querySelector(
        `[data-train-type="${trainType.id}"]`
      );
      if (!button) return;

      const canAfford = this.canAffordTrain(trainType);
      const costText = this.formatTrainCost(trainType);

      const costElement = button.querySelector(".train-cost");
      if (costElement && costText) {
        costElement.innerHTML = costText;
        if (canAfford) {
          costElement.classList.remove("insufficient");
        } else {
          costElement.classList.add("insufficient");
        }
      }

      if (!trainType.unlocked) {
        button.classList.add("locked");
        button.title = "Locked - unlock through progression";
      } else if (canAfford) {
        button.classList.remove("locked");
        button.title = "";
      } else {
        button.classList.add("locked");
        button.title = "Not enough resources";
      }
    });
  }

  refresh() {
    this.updateResourceDisplay();
  }

  updateBuildingDetail() {
    const detailContainer = document.getElementById(
      `building-detail-${this.buildingCategory}`
    );
    if (!detailContainer) return;

    const buildingType = Object.values(BUILDING_TYPES).find(
      (bt) => bt.id === this.selectedBuildingType
    );

    if (!buildingType) {
      detailContainer.classList.add("empty");
      return;
    }

    detailContainer.classList.remove("empty");

    let infoHTML = "";
    if (buildingType.description) {
      infoHTML += `<div>Description: ${buildingType.description} </div>`;
    }

    if (buildingType.produces) {
      infoHTML += `<div>Produces: ${buildingType.produces.amount} ${buildingType.produces.type}</div>`;
    }

    if (buildingType.consumes && buildingType.consumes.length > 0) {
      const consumesList = buildingType.consumes
        .map((item) => `${item.amount} ${item.type}`)
        .join(", ");
      infoHTML += `<div>Consumes: ${consumesList}</div>`;
    }

    if (buildingType.productionSpeed) {
      infoHTML += `<div>Speed: ${buildingType.productionSpeed}</div>`;
    }

    if (buildingType.capacity) {
      const capacityList = Object.entries(buildingType.capacity)
        .map(([res, amt]) => `${res}: ${amt}`)
        .join(", ");
      infoHTML += `<div>Storage: ${capacityList}</div>`;
    }

    detailContainer.innerHTML = `
      <div class="item-detail-header">
        <div class="item-detail-emoji">${buildingType.emoji}</div>
        <div class="item-detail-name">${buildingType.name}</div>
      </div>
      <div class="item-detail-info">${infoHTML}</div>
    `;
  }

  updateTrackDetail() {
    const detailContainer = document.getElementById("track-detail");
    if (!detailContainer) return;

    const trackType = getTrackType(this.selectedTrackType);

    if (!trackType) {
      detailContainer.classList.add("empty");
      return;
    }

    detailContainer.classList.remove("empty");

    let infoHTML = "";
    if (trackType.description) {
      infoHTML += `<div>${trackType.description}</div>`;
    }
    if (trackType.speedMultiplier !== undefined) {
      infoHTML += `<div>Speed: ${trackType.speedMultiplier}x</div>`;
    }

    detailContainer.innerHTML = `
      <div class="item-detail-header">
        <div class="item-detail-emoji">${trackType.emoji}</div>
        <div class="item-detail-name">${trackType.name}</div>
      </div>
      <div class="item-detail-info">${infoHTML}</div>
    `;
  }

  updateTrainDetail() {
    const detailContainer = document.getElementById("train-detail");
    if (!detailContainer) return;

    const trainType = getTrainType(this.selectedTrainType);

    if (!trainType) {
      detailContainer.classList.add("empty");
      return;
    }

    detailContainer.classList.remove("empty");

    let infoHTML = "";
    if (trainType.description) {
      infoHTML += `<div>${trainType.description}</div>`;
    }
    infoHTML += `<div>Cargo Capacity: ${trainType.cargoCapacity} units</div>`;
    infoHTML += `<div>Speed: ${trainType.speed} units/s</div>`;

    detailContainer.innerHTML = `
      <div class="item-detail-header">
        <div class="item-detail-emoji">${trainType.emoji}</div>
        <div class="item-detail-name">${trainType.name}</div>
      </div>
      <div class="item-detail-info">${infoHTML}</div>
    `;
  }
}
