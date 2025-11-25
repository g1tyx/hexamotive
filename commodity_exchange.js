// commodity_exchange.js - UI component for commodity exchange buildings
import { getBuildingType } from "./buildingTypes.js";

export class CommodityExchangeUI {
  constructor(container, building, buildingDef, gameState) {
    this.container = container;
    this.building = building;
    this.buildingDef = buildingDef;
    this.gameState = gameState;
    this.elements = {};
    this.resourceRefreshInterval = null;
    this.resourcePrices = {
      wood: 2,
      ore: 5,
      coal: 8,
      iron: 15,
      grain: 1,
      stone: 3,
      steel: 50,
      flour: 4,
      planks: 6,
    };

    this.render();
    this.startResourceRefreshLoop();
  }

  render() {
    // Create the UI structure
    const html = `
      <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #666;">
        <div style="font-weight: bold; margin-bottom: 8px; color: #4a9eff;">💰 Commodity Exchange</div>
        
        <div id="resource-display" style="margin-bottom: 12px;">
          <div style="font-size: 11px; margin-bottom: 5px; color: #aaa;">
            Hub Resources:
          </div>
          <div id="resource-totals"></div>
        </div>

        <div id="gold-display" style="margin-bottom: 12px; padding: 8px; background: rgba(255, 215, 0, 0.1); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 4px;">
          <div style="font-size: 11px; color: #aaa; margin-bottom: 4px;">Current Gold:</div>
          <div style="font-size: 16px; font-weight: bold; color: #ffd700;">
            🪙 <span id="gold-amount">0</span>
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML = html;

    // Store references to dynamic elements
    this.elements.resourceTotals =
      this.container.querySelector("#resource-totals");
    this.elements.goldAmount = this.container.querySelector("#gold-amount");

    // Initial update
    this.updateResourceDisplay();
  }

  updateResourceDisplay() {
    if (!this.elements.resourceTotals) return;

    // Look up hubResourceTotals fresh from gameState each time since it's reassigned
    const hubTotals = this.gameState.hubResourceTotals || {};
    const gold = hubTotals.gold || 0;

    // Update gold display
    if (this.elements.goldAmount) {
      this.elements.goldAmount.textContent = Math.floor(gold).toLocaleString();
    }

    // Get all resources, filter out gold
    const allResources = Object.entries(hubTotals);
    const sellableResources = allResources.filter(
      ([type, _]) => type !== "gold"
    );

    // Check if we need to rebuild (resources changed)
    const currentResourceKeys = sellableResources
      .map(([type, _]) => type)
      .sort()
      .join(",");
    if (this.lastResourceKeys !== currentResourceKeys) {
      this.lastResourceKeys = currentResourceKeys;
      this.rebuildResourceCards(sellableResources, hubTotals);
      return;
    }

    // Handle empty state
    if (sellableResources.length === 0) {
      if (
        this.elements.resourceTotals.innerHTML !==
        '<div style="color: #888; font-size: 11px; padding: 8px;">No resources available to sell</div>'
      ) {
        this.elements.resourceTotals.innerHTML =
          '<div style="color: #888; font-size: 11px; padding: 8px;">No resources available to sell</div>';
      }
      return;
    }

    // Just update the values in existing cards
    this.updateResourceCardValues(sellableResources);
  }

  rebuildResourceCards(sellableResources, hubTotals) {
    // Clear container
    this.elements.resourceTotals.innerHTML = "";

    if (sellableResources.length === 0) {
      this.elements.resourceTotals.innerHTML =
        '<div style="color: #888; font-size: 11px; padding: 8px;">No resources available to sell</div>';
      return;
    }

    // Resource type to emoji mapping
    const resourceEmojis = {
      wood: "🪵",
      ore: "⛏️",
      coal: "🔥",
      iron: "🔩",
      grain: "🌾",
      stone: "🪨",
      steel: "🔩",
      flour: "🌾",
      planks: "🪵",
    };

    // Resource type to gold price mapping (example prices)

    // Create resource cards
    sellableResources.forEach(([resourceType, amount]) => {
      const emoji = resourceEmojis[resourceType] || "📦";
      const price = this.resourcePrices[resourceType] || 1;
      const hasResources = amount > 0;

      const card = document.createElement("div");
      card.className = "resource-card";
      card.setAttribute("data-resource-card", resourceType);
      card.style.cssText = `
        background: rgba(74, 158, 255, 0.05);
        border: 1px solid rgba(74, 158, 255, 0.3);
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 8px;
        ${!hasResources ? "opacity: 0.5;" : ""}
      `;

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 18px;">${emoji}</span>
            <div>
              <div style="font-weight: bold; color: #4a9eff; font-size: 12px;">
                ${resourceType.charAt(0).toUpperCase() + resourceType.slice(1)}
              </div>
              <div class="resource-amount" style="font-size: 10px; color: #aaa;">
                ${Math.floor(amount)} available
              </div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 10px; color: #aaa;">Price:</div>
            <div style="font-size: 11px; color: #ffd700; font-weight: bold;">
              🪙 ${price}
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 6px;">
          <button 
            class="sell-btn sell-50"
            data-resource="${resourceType}"
            data-percent="50"
            ${!hasResources ? "disabled" : ""}
            style="
              flex: 1;
              padding: 6px 10px;
              background: ${hasResources ? "#4a9eff" : "#333"};
              color: white;
              border: none;
              border-radius: 3px;
              cursor: ${hasResources ? "pointer" : "not-allowed"};
              font-size: 10px;
              font-weight: bold;
              transition: background 0.2s;
            "
          >
            Sell 50%
            <div style="font-size: 9px; font-weight: normal; margin-top: 2px;">
              🪙 ${Math.floor(amount * 0.5 * price).toLocaleString()}
            </div>
          </button>
          
          <button 
            class="sell-btn sell-all"
            data-resource="${resourceType}"
            data-percent="100"
            ${!hasResources ? "disabled" : ""}
            style="
              flex: 1;
              padding: 6px 10px;
              background: ${hasResources ? "#22c55e" : "#333"};
              color: white;
              border: none;
              border-radius: 3px;
              cursor: ${hasResources ? "pointer" : "not-allowed"};
              font-size: 10px;
              font-weight: bold;
              transition: background 0.2s;
            "
          >
            Sell All
            <div style="font-size: 9px; font-weight: normal; margin-top: 2px;">
              🪙 ${Math.floor(amount * price).toLocaleString()}
            </div>
          </button>
        </div>
      `;

      this.elements.resourceTotals.appendChild(card);
    });

    // Attach event listeners to all sell buttons
    this.attachSellButtonListeners();
  }

  updateResourceCardValues(sellableResources) {
    // Resource type to gold price mapping (example prices)

    sellableResources.forEach(([resourceType, amount]) => {
      const card = this.container.querySelector(
        `[data-resource-card="${resourceType}"]`
      );
      if (!card) return;

      const price = this.resourcePrices[resourceType] || 1;
      const hasResources = amount > 0;

      // Update amount display
      const amountDisplay = card.querySelector(".resource-amount");
      if (amountDisplay) {
        amountDisplay.textContent = `${Math.floor(amount)} available`;
      }

      // Update opacity
      card.style.opacity = hasResources ? "1" : "0.5";

      // Update buttons
      const sell50Btn = card.querySelector(".sell-50");
      const sellAllBtn = card.querySelector(".sell-all");

      if (sell50Btn) {
        sell50Btn.disabled = !hasResources;
        sell50Btn.style.cursor = hasResources ? "pointer" : "not-allowed";
        sell50Btn.style.background = hasResources ? "#4a9eff" : "#333";
        const goldAmount50 = sell50Btn.querySelector("div");
        if (goldAmount50) {
          goldAmount50.textContent = `🪙 ${Math.floor(
            amount * 0.5 * price
          ).toLocaleString()}`;
        }
      }

      if (sellAllBtn) {
        sellAllBtn.disabled = !hasResources;
        sellAllBtn.style.cursor = hasResources ? "pointer" : "not-allowed";
        sellAllBtn.style.background = hasResources ? "#22c55e" : "#333";
        const goldAmountAll = sellAllBtn.querySelector("div");
        if (goldAmountAll) {
          goldAmountAll.textContent = `🪙 ${Math.floor(
            amount * price
          ).toLocaleString()}`;
        }
      }
    });
  }

  attachSellButtonListeners() {
    const sellButtons = this.container.querySelectorAll(".sell-btn");

    sellButtons.forEach((btn) => {
      if (!btn.disabled) {
        btn.addEventListener("click", (e) => {
          const resourceType = e.currentTarget.getAttribute("data-resource");
          const percent = parseInt(
            e.currentTarget.getAttribute("data-percent")
          );
          this.handleSellResource(resourceType, percent);
        });

        btn.addEventListener("mouseenter", (e) => {
          if (!e.target.disabled) {
            const isSellAll = e.target.classList.contains("sell-all");
            e.target.style.background = isSellAll ? "#16a34a" : "#3b82f6";
          }
        });

        btn.addEventListener("mouseleave", (e) => {
          if (!e.target.disabled) {
            const isSellAll = e.target.classList.contains("sell-all");
            e.target.style.background = isSellAll ? "#22c55e" : "#4a9eff";
          }
        });
      }
    });
  }

  handleSellResource(resourceType, percent) {
    const hubTotals = this.gameState.hubResourceTotals || {};
    const availableAmount = hubTotals[resourceType] || 0;
    const amountToSell = Math.floor(availableAmount * (percent / 100));
    // Dispatch custom event for the main game to handle
    const event = new CustomEvent("sellResource", {
      detail: {
        resourceType: resourceType,
        percent: percent,
        price: this.resourcePrices[resourceType],
        amount: amountToSell,

        buildingLocation: {
          col: this.building.col,
          row: this.building.row,
        },
      },
    });
    window.dispatchEvent(event);

    console.log(
      `Selling ${percent}% of ${resourceType} from Commodity Exchange`
    );
  }

  startResourceRefreshLoop() {
    // Update every 500ms to keep resources current
    this.resourceRefreshInterval = setInterval(() => {
      this.updateResourceDisplay();
    }, 500);
  }

  // Called by InfoPanel.update() when the building data changes
  update(building, params) {
    this.building = building;
    // No need to store params - we always read fresh from gameState
  }

  // Called when the building is deselected or removed
  cleanup() {
    if (this.resourceRefreshInterval) {
      clearInterval(this.resourceRefreshInterval);
      this.resourceRefreshInterval = null;
    }
    this.elements = {};
  }
}
