// infoPanel.js - Manages the info display panel

import { TrainDepotUI } from "./train_depot.js";
import { CommodityExchangeUI } from "./commodity_exchange.js";
import { welcomeScreen } from "./components/welcome.js";

export class InfoPanel {
  constructor() {
    this.elements = {};
    this.selectedBuilding = null;
    this.selectedBuildingKey = null;
    this.currentBuildingUI = null; // Track current building-specific UI component
    this.gameState = null; // Store game state reference
    this.createPanel();

    // Map building types to their UI components
    this.buildingUIComponents = {
      train_depot: TrainDepotUI,
      commodity_exchange: CommodityExchangeUI,
    };
  }

  createPanel() {
    // Create main info div
    const infoDiv = document.createElement("div");
    infoDiv.id = "info";
    infoDiv.style.cssText = `
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 10px;
      border-radius: 5px;
      font-size: 14px;
      min-width: 200px;
      max-width: 350px;
    `;

    infoDiv.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>Drag to move | Scroll to zoom | Click edges to place tracks</span>
        <button id="helpButton" style="
          background: linear-gradient(135deg, #4a5a6f 0%, #3a4a5f 100%);
          color: white;
          border: 2px solid #4a9eff;
          border-radius: 4px;
          padding: 2px 6px;
          font-size: 14px;
          cursor: pointer;
          font-weight: 600;
          box-shadow: 0 0 8px rgba(74, 158, 255, 0.3);
          flex-shrink: 0;
        ">❓</button>
      </div>
      <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #666;">
        
        <div>Zoom: <span id="zoomLevel">100</span>%</div>
        <div>Tracks placed: <span id="trackCount">0</span></div>
        <div>Trains: <span id="trainCount">0</span></div>
        <div>Power Supply: <span id="powerSupply">0</span></div>
        <div>Power Demand: <span id="powerDemand">0</span></div>
      </div>
      <div id="buildingDetails" style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #666; display: none;">
        <div style="font-weight: bold; margin-bottom: 5px;">Selected Building</div>
        <div id="buildingStaticInfo"></div>
        <div id="buildingDynamicInfo"></div>
        <div id="buildingSpecificUI"></div>
      </div>
    `;

    document.body.appendChild(infoDiv);

    // Store references to span elements
    this.elements.zoomLevel = document.getElementById("zoomLevel");
    this.elements.trackCount = document.getElementById("trackCount");
    this.elements.trainCount = document.getElementById("trainCount");
    this.elements.powerSupply = document.getElementById("powerSupply");
    this.elements.powerDemand = document.getElementById("powerDemand");
    this.elements.buildingDetails = document.getElementById("buildingDetails");
    this.elements.buildingStaticInfo =
      document.getElementById("buildingStaticInfo");
    this.elements.buildingDynamicInfo = document.getElementById(
      "buildingDynamicInfo"
    );
    this.elements.buildingSpecificUI =
      document.getElementById("buildingSpecificUI");

    // Add event listeners to help button
    const helpButton = document.getElementById("helpButton");

    helpButton.addEventListener("click", () => {
      welcomeScreen.show();
    });

    helpButton.addEventListener("mouseenter", () => {
      helpButton.style.background =
        "linear-gradient(135deg, #5a6a7f 0%, #4a5a6f 100%)";
      helpButton.style.boxShadow = "0 0 12px rgba(74, 158, 255, 0.5)";
    });

    helpButton.addEventListener("mouseleave", () => {
      helpButton.style.background =
        "linear-gradient(135deg, #4a5a6f 0%, #3a4a5f 100%)";
      helpButton.style.boxShadow = "0 0 8px rgba(74, 158, 255, 0.3)";
    });
  }

  // Call this when a building is clicked
  showBuildingDetails(building, buildingDef, gameState) {
    this.selectedBuilding = building;
    this.selectedBuildingKey = `${building.col},${building.row}`;
    this.gameState = gameState;
    console.log({ building, buildingDef });

    if (!building || !buildingDef) {
      this.elements.buildingDetails.style.display = "none";
      this.cleanupBuildingUI();
      return;
    }

    this.elements.buildingDetails.style.display = "block";

    // Build the STATIC info HTML (only needs to be set once)
    let staticHtml = `
      <div style="margin-bottom: 8px;">
        <span style="font-size: 24px;">${buildingDef.emoji}</span>
        <strong> ${buildingDef.name}</strong>
      </div>
      <div style="font-size: 12px; color: #aaa;">
        Location: (${building.col}, ${building.row})
      </div>
    `;

    // Show what the building produces/consumes (static)
    if (buildingDef.produces && buildingDef.produces.length > 0) {
      staticHtml += `<div style="margin-top: 8px; font-size: 11px; color: #aaa;">`;
      staticHtml += `Produces: `;
      staticHtml += buildingDef.produces
        .map((p) => `${p.amount}x ${p.type}`)
        .join(", ");
      staticHtml += `</div>`;
    }

    if (buildingDef.consumes && buildingDef.consumes.length > 0) {
      staticHtml += `<div style="margin-top: 3px; font-size: 11px; color: #aaa;">`;
      staticHtml += `Consumes: `;
      staticHtml += buildingDef.consumes
        .map((c) => `${c.amount}x ${c.type}`)
        .join(", ");
      staticHtml += `</div>`;
    }

    // Show if it can be removed (static)
    if (building.canRemove === false) {
      staticHtml += `<div style="margin-top: 8px; font-size: 11px; color: #ff6b6b;">⚠️ Cannot be removed</div>`;
    }

    this.elements.buildingStaticInfo.innerHTML = staticHtml;

    // Update dynamic info
    this.updateBuildingDynamicInfo(building);

    // Initialize building-specific UI component
    this.initializeBuildingUI(building, buildingDef, gameState);
  }

  // Initialize building-specific UI component
  initializeBuildingUI(building, buildingDef, gameState) {
    // Clean up previous building UI if it exists
    this.cleanupBuildingUI();

    // Check if this building type has a specific UI component
    const UIComponent = this.buildingUIComponents[building.type];

    if (UIComponent) {
      // Create new instance of the building-specific UI
      this.currentBuildingUI = new UIComponent(
        this.elements.buildingSpecificUI,
        building,
        buildingDef,
        gameState
      );
    }
  }

  // Clean up building-specific UI
  cleanupBuildingUI() {
    if (this.currentBuildingUI && this.currentBuildingUI.cleanup) {
      this.currentBuildingUI.cleanup();
    }
    this.currentBuildingUI = null;
    this.elements.buildingSpecificUI.innerHTML = "";
  }

  // Update only the dynamic parts of building info (progress, inventory)
  updateBuildingDynamicInfo(building) {
    if (!building) return;

    let dynamicHtml = "";

    // Show production progress if applicable
    if (building.productionProgress !== undefined) {
      const progressPercent = Math.round(building.productionProgress * 100);
      dynamicHtml += `
        <div style="margin-top: 5px;">
          <div style="font-size: 11px; color: #aaa;">Production Progress</div>
          <div style="background: #333; height: 12px; border-radius: 3px; overflow: hidden;">
            <div style="background: #4a9eff; height: 100%; width: ${progressPercent}%;"></div>
          </div>
          <div style="font-size: 10px; color: #aaa; text-align: right;">${progressPercent}%</div>
        </div>
      `;
    }

    // Show inventory
    if (building.inventory) {
      // Input inventory
      if (
        building.inventory.inputs &&
        Object.keys(building.inventory.inputs).length > 0
      ) {
        dynamicHtml += `<div style="margin-top: 8px; font-size: 12px;">`;
        dynamicHtml += `<div style="color: #aaa;">Inputs:</div>`;
        for (let resource in building.inventory.inputs) {
          const amount = building.inventory.inputs[resource];
          dynamicHtml += `<div style="padding-left: 10px;">📦 ${resource}: ${amount}</div>`;
        }
        dynamicHtml += `</div>`;
      }

      // Output inventory
      if (
        building.inventory.outputs &&
        Object.keys(building.inventory.outputs).length > 0
      ) {
        dynamicHtml += `<div style="margin-top: 8px; font-size: 12px;">`;
        dynamicHtml += `<div style="color: #aaa;">Outputs:</div>`;
        for (let resource in building.inventory.outputs) {
          const amount = building.inventory.outputs[resource];
          dynamicHtml += `<div style="padding-left: 10px;">📦 ${resource}: ${amount}</div>`;
        }
        dynamicHtml += `</div>`;
      }
    }

    this.elements.buildingDynamicInfo.innerHTML = dynamicHtml;
  }

  // Call this to clear building selection
  clearBuildingDetails() {
    this.selectedBuilding = null;
    this.selectedBuildingKey = null;
    this.gameState = null;
    this.cleanupBuildingUI();
    this.elements.buildingDetails.style.display = "none";
  }

  update(params) {
    const { map, placed_tracks, trains, zoom, powerSupply, powerDemand } =
      params;

    // Update tile count
    if (this.elements.tileCount) {
      this.elements.tileCount.textContent = Object.keys(map).length;
    }

    // Update zoom level
    if (this.elements.zoomLevel) {
      this.elements.zoomLevel.textContent = Math.round(zoom * 100);
    }

    // Update track count
    if (this.elements.trackCount) {
      this.elements.trackCount.textContent = Object.keys(placed_tracks).length;
    }

    // Update train count
    if (this.elements.trainCount) {
      this.elements.trainCount.textContent = trains.length;
    }
    if (this.elements.powerSupply) {
      this.elements.powerSupply.textContent = powerSupply;
    }
    if (this.elements.powerDemand) {
      this.elements.powerDemand.textContent = powerDemand;
    }

    // Only update dynamic info if a building is selected
    if (
      this.selectedBuilding &&
      this.selectedBuildingKey &&
      params.placed_buildings
    ) {
      const currentBuilding = params.placed_buildings[this.selectedBuildingKey];

      // If building still exists, update its dynamic info
      if (currentBuilding) {
        this.updateBuildingDynamicInfo(currentBuilding);

        // Update building-specific UI component if it exists
        if (this.currentBuildingUI && this.currentBuildingUI.update) {
          this.currentBuildingUI.update(currentBuilding, params);
        }
      } else {
        // Building was removed
        this.clearBuildingDetails();
      }
    }
  }
}