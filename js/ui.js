// js/ui.js
(function (window, document) {
  "use strict";

  let radarChart = null;
  const THEME_KEY = "adn-theme";

  const ADNUI = {
    initThemeSelector() {
      const select = document.getElementById("theme-select");
      if (!select) return;

      // Récup thème stocké
      const saved = localStorage.getItem(THEME_KEY) || "light";
      select.value = saved;
      this.switchTheme(saved);

      select.addEventListener("change", (e) => {
        this.switchTheme(e.target.value);
      });
    },

    switchTheme(themeName) {
      const themeLinks = document.querySelectorAll('link[data-theme]');
      themeLinks.forEach((link) => {
        const t = link.getAttribute("data-theme");
        link.disabled = t !== themeName;
      });

      // Gestion effet Noël (classe body)
      document.body.classList.toggle("noel-snow", themeName === "noel");

      localStorage.setItem(THEME_KEY, themeName);
    },

    updateRangeLabels() {
      const enduranceInput = document.getElementById("endurance");
      const enduranceValue = document.getElementById("endurance-value");
      const explosivityInput = document.getElementById("explosivity");
      const explosivityValue = document.getElementById("explosivity-value");

      if (enduranceInput && enduranceValue) {
        enduranceInput.addEventListener("input", () => {
          enduranceValue.textContent = enduranceInput.value;
        });
      }
      if (explosivityInput && explosivityValue) {
        explosivityInput.addEventListener("input", () => {
          explosivityValue.textContent = explosivityInput.value;
        });
      }
    },
	
	toggleTriathlonFields() {
	  const checkbox = document.getElementById("isTriathlete");
	  const container = document.getElementById("triathlon-fields");
	  if (!checkbox || !container) return;

	  const updateVisibility = () => {
		container.style.display = checkbox.checked ? "block" : "none";
	  };

	  checkbox.addEventListener("change", updateVisibility);
	  updateVisibility(); // initial
	},


    renderProfileCard(result) {
      const card = document.getElementById("profile-card");
      if (!card) return;

      if (!result) {
        card.classList.add("profile-card--empty");
        card.innerHTML = "<p>Renseigne tes données pour découvrir ton ADN cycliste.</p>";
        return;
      }

      const { metrics, profile } = result;
      card.classList.remove("profile-card--empty");

      card.innerHTML = `
        <div class="profile-card-header">
          <div class="profile-emoji">${profile.emoji}</div>
          <div>
            <div class="profile-title">${profile.name}</div>
            <div class="profile-badge">Score global : ${metrics.globalScore}/100</div>
          </div>
        </div>
        <div class="profile-metrics">
          <div><strong>FTP :</strong> ${metrics.ftp} W</div>
          <div><strong>Poids :</strong> ${metrics.weight} kg</div>
          <div><strong>W/kg :</strong> ${metrics.wkg}</div>
          <div><strong>Endurance :</strong> ${metrics.endurance}/10</div>
          <div><strong>Explosivité :</strong> ${metrics.explosivity}/10</div>
          <div><strong>Terrain :</strong> ${metrics.preference}</div>
        </div>
        <p class="profile-description">${profile.description}</p>
      `;
    },

    renderRadarChart(result) {
      const ctx = document.getElementById("adn-radar-chart");
      if (!ctx) return;

      if (!result) {
        if (radarChart) {
          radarChart.destroy();
          radarChart = null;
        }
        return;
      }

      const { metrics } = result;

      const data = {
        labels: ["W/kg", "Endurance", "Explosivité", "Score global"],
        datasets: [
          {
            label: "Profil cycliste",
            data: [
              metrics.wkg,
              metrics.endurance,
              metrics.explosivity,
              metrics.globalScore / 10 // remis sur /10 pour l'échelle
            ],
            fill: true,
            pointRadius: 3,
            borderWidth: 2
          }
        ]
      };

      const options = {
        responsive: true,
        scales: {
          r: {
            beginAtZero: true,
            suggestedMax: 10
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      };

      if (radarChart) {
        radarChart.data = data;
        radarChart.options = options;
        radarChart.update();
      } else {
        radarChart = new Chart(ctx, {
          type: "radar",
          data,
          options
        });
      }
    }
  };

  window.ADNUI = ADNUI;
})(window, document);
