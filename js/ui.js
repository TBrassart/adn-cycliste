// js/ui.js
(function (window, document) {
  "use strict";

  const ADNUI = {
    /**
     * Génère dynamiquement le formulaire à partir du metricsSchema
     */
    generateDynamicForm() {
      const container = document.getElementById("dynamic-form");
      if (!container) return;

      const schema = window.metricsSchema;
      container.innerHTML = ""; // reset

      Object.entries(schema).forEach(([category, fields]) => {
        const section = document.createElement("section");
        section.classList.add("form-section");

        const title = document.createElement("h3");
        title.textContent =
          category.charAt(0).toUpperCase() + category.slice(1);
        section.appendChild(title);

        Object.entries(fields).forEach(([key, meta]) => {
          const fieldDiv = document.createElement("div");
          fieldDiv.classList.add("form-field");
          fieldDiv.dataset.fieldKey = key;

          const label = document.createElement("label");
          label.textContent = meta.label;
          label.setAttribute("for", key);

          let input;
          switch (meta.type) {
            case "number":
            case "range":
              input = document.createElement("input");
              input.type = meta.type;
              input.id = key;
              input.name = key;
              input.min = meta.range?.[0];
              input.max = meta.range?.[1];
              if (meta.type === "range") {
                input.value = Math.round(
                  (meta.range?.[0] + meta.range?.[1]) / 2
                );
                const span = document.createElement("span");
                span.classList.add("range-value");
                span.textContent = input.value;
                input.addEventListener(
                  "input",
                  () => (span.textContent = input.value)
                );
                fieldDiv.appendChild(span);
              }
              break;

            case "select":
              input = document.createElement("select");
              input.id = key;
              input.name = key;
              meta.options?.forEach((opt) => {
                const option = document.createElement("option");
                option.value = opt;
                option.textContent = opt;
                input.appendChild(option);
              });
              break;

            case "boolean":
              input = document.createElement("input");
              input.type = "checkbox";
              input.id = key;
              input.name = key;
              break;

            default:
              input = document.createElement("input");
              input.type = "text";
              input.id = key;
              input.name = key;
          }

          fieldDiv.appendChild(label);
          fieldDiv.appendChild(input);

          // 🔹 Dépendance (ex: triDistance dépend de triathlon)
          if (meta.dependsOn) {
            fieldDiv.dataset.dependsOn = meta.dependsOn;
            fieldDiv.style.display = "none"; // caché par défaut
          }

          section.appendChild(fieldDiv);
        });

        container.appendChild(section);
      });

      // ✅ Gestion dynamique des dépendances (triathlon → triDistance)
      const checkboxes = container.querySelectorAll("input[type='checkbox']");
      checkboxes.forEach((box) => {
        box.addEventListener("change", () => {
          const key = box.name;
          const dependentFields = container.querySelectorAll(
            `[data-depends-on="${key}"]`
          );
          dependentFields.forEach((div) => {
            div.style.display = box.checked ? "flex" : "none";
          });
        });
      });
    },

    /**
     * Affiche la carte du profil avec détails + debug
     */
    renderProfileCard(result) {
	  const container = document.getElementById("profile-card");
	  if (!container) return;

	  const { profile, metrics, matches } = result;
	  if (!profile) return;

	  container.classList.remove("profile-card--empty");
	  container.innerHTML = "";

	  // ✅ Génération des barres de compatibilité
	  const matchBars = (matches || [])
		.map((m) => {
		  const safePercent = isNaN(m.percent)
			? 0
			: Math.max(2, Math.min(100, m.percent));
		  const color =
			getComputedStyle(document.documentElement).getPropertyValue(
			  "--accent-color"
			) || "#2563eb";
		  return `
			<div class="match-bar">
			  <div class="match-bar-label">${m.emoji || "🚴‍♂️"} ${m.name}</div>
			  <div class="match-bar-track">
				<div class="match-bar-fill" style="width:${safePercent}%;background:${color};"></div>
			  </div>
			  <div class="match-bar-percent">${safePercent}%</div>
			</div>
		  `;
		})
		.join("");

	  const mainMatch = (matches && matches[0]) ? matches[0] : null;
	  let debugHtml = "";

	  // ✅ Bloc debug détaillé (✔️/❌)
	  if (mainMatch && mainMatch.details && mainMatch.details.length) {
		debugHtml =
		  `<ul class="debug-list">` +
		  mainMatch.details
			.map((d) => {
			  const icon = d.matched ? "✔️" : "❌";
			  const weightInfo = d.weight
				? ` (poids ${(d.weight * 100).toFixed(1)}%)`
				: "";
			  const actual =
				d.actual === null || d.actual === undefined ? "—" : d.actual;
			  return `
				<li>
				  ${icon}
				  <strong>${d.label}</strong> :
				  attendu <code>${d.expected}</code>,
				  obtenu <code>${actual}</code>${weightInfo}
				</li>
			  `;
			})
			.join("") +
		  `</ul>`;
	  }

	  // ✅ Construction du HTML complet de la carte
	  container.innerHTML = `
		<div class="profile-card-header">
		  <div class="profile-emoji">${profile.emoji}</div>
		  <div>
			<div class="profile-title">${profile.name}</div>
			<div class="profile-badge">Score global : ${
			  metrics.globalScore || 0
			}/100</div>
		  </div>
		</div>

		<div class="profile-metrics">
		  <div><strong>FTP :</strong> ${metrics.physiologie?.ftp || "-"} W</div>
		  <div><strong>Poids :</strong> ${metrics.physiologie?.weight || "-"} kg</div>
		  <div><strong>W/kg :</strong> ${metrics.physiologie?.wkg || 0}</div>
		  <div><strong>Volume :</strong> ${metrics.entrainement?.volume || 0} h/sem</div>
		</div>

		<p class="profile-description">
		  ${profile.description}
		  ${
			profile.percent
			  ? `<br><span style="font-size:0.8rem;color:#6b7280;">Profil principal estimé à ${profile.percent}%.</span>`
			  : ""
		  }
		</p>

		<h4>Profils compatibles</h4>
		<div class="match-list">
		  ${matchBars || "<p>Aucune correspondance trouvée.</p>"}
		</div>

		<div id="debug-info" style="display:none;margin-top:8px;">
		  <h4>Détails matching (debug)</h4>
		  ${debugHtml || "<p>Aucun détail disponible.</p>"}
		</div>
	  `;
	},

    /**
     * Affiche le radar chart
     */
    renderRadarChart(result) {
      const canvas = document.getElementById("adn-radar-chart");
      if (!canvas || !window.Chart) return;

      const ctx = canvas.getContext("2d");
      const data = result.metrics.capacites;
      const labels = Object.keys(data);
      const values = Object.values(data);

      if (window.radarChartInstance) window.radarChartInstance.destroy();

      window.radarChartInstance = new Chart(ctx, {
        type: "radar",
        data: {
          labels,
          datasets: [
            {
              label: "Profil du cycliste",
              data: values,
              fill: true,
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            r: {
              min: 0,
              max: 10,
            },
          },
        },
      });
    },

    /**
     * Bascule l'affichage du debug
     */
    toggleDebugInfo() {
      const debugDiv = document.getElementById("debug-info");
      const button = document.getElementById("debug-toggle");

      if (!debugDiv || !button) {
        console.warn("Debug area not found");
        return;
      }

      const isVisible = debugDiv.style.display === "block";
      debugDiv.style.display = isVisible ? "none" : "block";
      button.textContent = isVisible ? "Afficher debug" : "Masquer debug";
    },

    // Ces fonctions existent peut-être encore pour compatibilité
    initThemeSelector() {},
    updateRangeLabels() {},
    toggleTriathlonFields() {},
  };

  window.ADNUI = ADNUI;
})(window, document);
