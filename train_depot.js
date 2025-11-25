// train_depot.js - UI component for train depot buildings
import {
  TRAIN_TYPES,
  TRACK_TYPES,
  getTrackType,
  getTrainType,
} from "./railwayTypes.js";

export class TrainDepotUI {
  constructor(container, building, buildingDef, gameState) {
    this.container = container;
    this.building = building;
    this.buildingDef = buildingDef;
    this.gameState = gameState;
    this.elements = {};
    this.trainDataSnapshot = null;

    this.render();
  }

  render() {
    // Create the UI structure
    const html = `
      <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #666;">
        <div style="font-weight: bold; margin-bottom: 8px; color: #4a9eff;">🚂 Train Summary</div>
        
        <div id="trainSummaryGrid">
          <!-- Train summary grid will be populated here -->
        </div>
      </div>
    `;

    this.container.innerHTML = html;

    // Store reference to dynamic element
    this.elements.trainSummaryGrid =
      this.container.querySelector("#trainSummaryGrid");

    // Initial update
    this.updateTrainDisplay();
  }

  getCargoTotal(cargo) {
    return Object.values(cargo).reduce((sum, amount) => sum + amount, 0);
  }

  updateTrainDisplay() {
    if (!this.gameState || !this.gameState.trains) {
      return;
    }

    // Group trains by type
    const trainsByType = {};
    this.gameState.trains.forEach((train) => {
      if (!trainsByType[train.type]) {
        trainsByType[train.type] = [];
      }
      trainsByType[train.type].push(train);
    });

    const trainTypes = Object.keys(trainsByType);

    // If no trains exist
    if (trainTypes.length === 0) {
      this.elements.trainSummaryGrid.innerHTML =
        '<div style="color: #666; font-style: italic; padding: 8px; font-size: 11px;">No trains in the system</div>';
      return;
    }

    // Get existing grid container or create it
    let gridContainer = this.elements.trainSummaryGrid.querySelector(
      '[style*="grid-template-columns"]'
    );
    if (!gridContainer) {
      gridContainer = document.createElement("div");
      gridContainer.style.cssText =
        "display: grid; grid-template-columns: 1fr; gap: 8px;";
      this.elements.trainSummaryGrid.innerHTML = "";
      this.elements.trainSummaryGrid.appendChild(gridContainer);
    }

    // Get existing cards
    const existingCards = new Map();
    gridContainer.querySelectorAll("[data-train-type]").forEach((card) => {
      const type = card.getAttribute("data-train-type");
      existingCards.set(type, card);
    });

    // Remove cards for train types that no longer exist
    existingCards.forEach((card, type) => {
      if (!trainsByType[type]) {
        card.remove();
      }
    });

    // Update or create cards for each train type
    for (const [trainType, trains] of Object.entries(trainsByType)) {
      const trainsAtCapacity = trains.filter((t) => {
        const cargoTotal = this.getCargoTotal(t.cargo);
        return cargoTotal >= t.cargoCapacity;
      }).length;

      const available = trains.length - trainsAtCapacity;

      let card = existingCards.get(trainType);

      if (card) {
        // Update existing card stats only
        const totalEl = card.querySelector('[data-stat="total"]');
        const capacityEl = card.querySelector('[data-stat="capacity"]');
        const availableEl = card.querySelector('[data-stat="available"]');

        if (totalEl) totalEl.textContent = `Total: ${trains.length}`;
        if (capacityEl) {
          capacityEl.textContent = `At capacity: ${trainsAtCapacity}`;
          capacityEl.style.color = trainsAtCapacity > 0 ? "#ffaa00" : "#aaa";
        }
        if (availableEl) {
          availableEl.textContent = `Available: ${available}`;
          availableEl.style.color = available > 0 ? "#4ade80" : "#aaa";
        }
      } else {
        // Create new card
        card = this.createTrainTypeCard(
          trainType,
          trains.length,
          trainsAtCapacity,
          available
        );
        gridContainer.appendChild(card);
      }
    }
  }

  createTrainTypeCard(trainType, total, atCapacity, available) {
    const card = document.createElement("div");
    card.setAttribute("data-train-type", trainType);
    card.style.cssText = `
      padding: 10px;
      background: rgba(74, 158, 255, 0.05);
      border-radius: 5px;
      border: 1px solid rgba(74, 158, 255, 0.3);
    `;

    // Get the train name from the train type ID
    const trainTypeData = getTrainType(trainType);
    const displayName = trainTypeData ? trainTypeData.name : trainType;

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <div style="font-weight: bold; color: #4a9eff; font-size: 12px;">
          ${displayName}
        </div>
        <button 
          class="removeTrainsBtn" 
          style="
            padding: 4px 8px;
            background: #ff4444;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-size: 10px;
          "
        >
          Remove All
        </button>
      </div>
      <div data-stat="total" style="font-size: 11px; color: #aaa; margin-bottom: 3px;">
        Total: ${total}
      </div>
      <div data-stat="capacity" style="font-size: 11px; color: ${
        atCapacity > 0 ? "#ffaa00" : "#aaa"
      };">
        At capacity: ${atCapacity}
      </div>
      <div data-stat="available" style="font-size: 11px; color: ${
        available > 0 ? "#4ade80" : "#aaa"
      };">
        Available: ${available}
      </div>
    `;

    // Add event listeners to button
    const btn = card.querySelector(".removeTrainsBtn");
    btn.addEventListener("click", () => {
      this.removeTrainsByType(trainType);
    });

    btn.addEventListener("mouseenter", (e) => {
      e.target.style.background = "#dd3333";
    });

    btn.addEventListener("mouseleave", (e) => {
      e.target.style.background = "#ff4444";
    });

    return card;
  }

  removeTrainsByType(trainType) {
    // Show confirmation UI
    const card = this.container.querySelector(`[data-train-type="${trainType}"]`);
    if (!card) return;

    const trainTypeData = getTrainType(trainType);
    const displayName = trainTypeData ? trainTypeData.name : trainType;

    // Store original content
    const originalContent = card.innerHTML;

    // Replace with confirmation UI
    card.innerHTML = `
      <div style="text-align: center; padding: 15px;">
        <div style="color: #ff4444; font-weight: bold; margin-bottom: 12px; font-size: 12px;">
          Really? Remove all ${displayName} trains?
        </div>
        <div style="display: flex; gap: 8px; justify-content: center;">
          <button 
            class="confirmRemove" 
            style="
              padding: 6px 12px;
              background: #ff4444;
              color: white;
              border: none;
              border-radius: 3px;
              cursor: pointer;
              font-size: 11px;
              font-weight: bold;
            "
          >
            Yes, Remove
          </button>
          <button 
            class="cancelRemove" 
            style="
              padding: 6px 12px;
              background: #666;
              color: white;
              border: none;
              border-radius: 3px;
              cursor: pointer;
              font-size: 11px;
            "
          >
            Cancel
          </button>
        </div>
      </div>
    `;

    // Add confirm button handler
    const confirmBtn = card.querySelector(".confirmRemove");
    confirmBtn.addEventListener("click", () => {
      const event = new CustomEvent("removeTrainsByType", {
        detail: {
          trainType: trainType,
          depotLocation: { col: this.building.col, row: this.building.row },
        },
      });
      window.dispatchEvent(event);
      console.log("Remove all trains of type:", trainType);
    });

    confirmBtn.addEventListener("mouseenter", (e) => {
      e.target.style.background = "#dd3333";
    });

    confirmBtn.addEventListener("mouseleave", (e) => {
      e.target.style.background = "#ff4444";
    });

    // Add cancel button handler
    const cancelBtn = card.querySelector(".cancelRemove");
    cancelBtn.addEventListener("click", () => {
      card.innerHTML = originalContent;
      // Re-attach the remove button listener
      this.reattachRemoveButton(card, trainType);
    });

    cancelBtn.addEventListener("mouseenter", (e) => {
      e.target.style.background = "#555";
    });

    cancelBtn.addEventListener("mouseleave", (e) => {
      e.target.style.background = "#666";
    });
  }

  reattachRemoveButton(card, trainType) {
    const btn = card.querySelector(".removeTrainsBtn");
    if (!btn) return;

    btn.addEventListener("click", () => {
      this.removeTrainsByType(trainType);
    });

    btn.addEventListener("mouseenter", (e) => {
      e.target.style.background = "#dd3333";
    });

    btn.addEventListener("mouseleave", (e) => {
      e.target.style.background = "#ff4444";
    });
  }

  // Called by InfoPanel.update() when the building data changes
  update(building, gameState) {
    this.building = building;
    this.gameState = gameState;

    // Only update if train data has actually changed
    const newTrainData = this.getTrainDataSnapshot();
    if (
      this.trainDataSnapshot &&
      this.trainDataEquals(this.trainDataSnapshot, newTrainData)
    ) {
      return; // No changes, skip update
    }
    this.trainDataSnapshot = newTrainData;

    // Update the display
    this.updateTrainDisplay();
  }

  // Create a lightweight snapshot of train data for comparison
  getTrainDataSnapshot() {
    if (!this.gameState || !this.gameState.trains) {
      return { count: 0, trains: {} };
    }

    const snapshot = { count: this.gameState.trains.length, trains: {} };
    this.gameState.trains.forEach((train) => {
      const cargoTotal = this.getCargoTotal(train.cargo);
      snapshot.trains[train.id] = {
        type: train.type,
        cargoTotal: cargoTotal,
        capacity: train.cargoCapacity,
      };
    });
    return snapshot;
  }

  // Compare two snapshots for equality
  trainDataEquals(snap1, snap2) {
    if (snap1.count !== snap2.count) return false;

    const ids1 = Object.keys(snap1.trains);
    const ids2 = Object.keys(snap2.trains);

    if (ids1.length !== ids2.length) return false;

    for (const id of ids1) {
      const t1 = snap1.trains[id];
      const t2 = snap2.trains[id];

      if (
        !t2 ||
        t1.type !== t2.type ||
        t1.cargoTotal !== t2.cargoTotal ||
        t1.capacity !== t2.capacity
      ) {
        return false;
      }
    }

    return true;
  }

  // Called when the building is deselected or removed
  cleanup() {
    // Clear references
    this.elements = {};
    this.trainDataSnapshot = null;
  }
}