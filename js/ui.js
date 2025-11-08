// js/ui.js
(function (window, document) {
  "use strict";

  const ADNUI = {
    /* =========================
     * THEMES
     * ========================= */

    switchTheme(themeName) {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      links.forEach((link) => {
        if (link.href.includes("theme-")) {
          link.disabled = !link.href.includes(`theme-${themeName}.css`);
        }
      });
      localStorage.setItem("theme", themeName);
    },

    initThemeSelector() {
      const selector = document.getElementById("theme-select");
      if (!selector) {
        console.warn("⚠️ Aucun sélecteur de thème trouvé (#theme-select)");
        return;
      }

      const saved = localStorage.getItem("theme") || "light";
      selector.value = saved;
      this.switchTheme(saved);

      selector.addEventListener("change", (e) => {
        this.switchTheme(e.target.value);
      });
    },

    /* =========================
     * FORMULAIRE DYNAMIQUE
     * ========================= */

    generateDynamicForm() {
      const container = document.getElementById("dynamic-form");
      if (!container) return;

      const schema = window.metricsSchema;
      if (!schema) {
        console.warn("⚠️ metricsSchema non trouvé");
        return;
      }

      container.innerHTML = "";

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
          label.textContent = meta.label || key;
          label.setAttribute("for", key);

          let input;

          switch (meta.type) {
            case "number":
            case "range": {
              input = document.createElement("input");
              input.type = meta.type;
              input.id = key;
              input.name = key;
              if (meta.range) {
                input.min = meta.range[0];
                input.max = meta.range[1];
              }
              if (meta.type === "range") {
                input.value = meta.default ?? Math.round(
                  ((Number(input.min) || 0) + (Number(input.max) || 10)) / 2
                );
                const span = document.createElement("span");
                span.classList.add("range-value");
                span.textContent = input.value;
                input.addEventListener("input", () => {
                  span.textContent = input.value;
                });
                fieldDiv.appendChild(span);
              }
              break;
            }

            case "select": {
              input = document.createElement("select");
              input.id = key;
              input.name = key;
              (meta.options || []).forEach((opt) => {
                const option = document.createElement("option");
                option.value = opt;
                option.textContent = opt;
                input.appendChild(option);
              });
              break;
            }

            case "boolean": {
              input = document.createElement("input");
              input.type = "checkbox";
              input.id = key;
              input.name = key;
              break;
            }

            default: {
              input = document.createElement("input");
              input.type = "text";
              input.id = key;
              input.name = key;
            }
          }

          fieldDiv.appendChild(label);
          fieldDiv.appendChild(input);

          // Champs dépendants (ex: triDistance dépend de triathlon)
          if (meta.dependsOn) {
            fieldDiv.dataset.dependsOn = meta.dependsOn;
            fieldDiv.style.display = "none";
          }

          section.appendChild(fieldDiv);
        });

        container.appendChild(section);
      });

      // Dépendances (checkbox -> champs)
      const checkboxes = container.querySelectorAll("input[type='checkbox']");
      checkboxes.forEach((box) => {
        box.addEventListener("change", () => {
          const key = box.name;
          const dependents = container.querySelectorAll(
            `[data-depends-on="${key}"]`
          );
          dependents.forEach((div) => {
            div.style.display = box.checked ? "flex" : "none";
          });
        });
      });

      // Sections repliables (accordéon)
      const sectionHeaders = container.querySelectorAll(".form-section h3");
      sectionHeaders.forEach((header) => {
        const section = header.closest(".form-section");
        const arrow = document.createElement("span");
        arrow.textContent = "▼";
        arrow.classList.add("section-arrow");
        header.appendChild(arrow);

        header.addEventListener("click", () => {
          section.classList.toggle("collapsed");
        });
      });
    },

    /* =========================
     * TEXTE RÉSUMÉ USER-FRIENDLY
     * ========================= */

    generateSummaryText(profileMatch) {
      if (!profileMatch || !profileMatch.details) return "";

      const details = profileMatch.details.filter(
        (d) => d && typeof d === "object"
      );
      if (!details.length) return "";

      const matched = details.filter((d) => d.matched);
      const missed = details.filter((d) => !d.matched);

      const total = details.length;
      const countMatched = matched.length;
      const ratio = total > 0 ? countMatched / total : 0;

      const normLabel = (d) =>
        (d.label || d.baseKey || "critère").toLowerCase();

      const matchedLabels = matched.map(normLabel);
      const missedLabels = missed.map(normLabel);

      let sentence = "";

      if (ratio >= 0.9) {
        sentence = `Tu es un vrai ${profileMatch.name} dans l’âme`;
        if (matchedLabels.length) {
          sentence += ` — tout colle : ${matchedLabels
            .slice(0, 3)
            .join(", ")}${
            matchedLabels.length > 3 ? "..." : ""
          }. 💪`;
        } else {
          sentence += " — parfait équilibre ! 💪";
        }
      } else if (ratio >= 0.7) {
        sentence = `Tu t’approches du profil ${profileMatch.name}`;
        if (missedLabels.length) {
          sentence += ` — ${missedLabels
            .slice(0, 2)
            .join(
              " et "
            )} à travailler, et ce sera top. 🔧`;
        } else {
          sentence +=
            " — encore un petit effort et tu y es presque ! 🔥";
        }
      } else if (ratio >= 0.4) {
        sentence = `Tu as quelques traits du ${profileMatch.name}`;
        if (matchedLabels.length) {
          sentence += ` (${matchedLabels
            .slice(0, 2)
            .join(", ")}), mais ${
            missedLabels.length
              ? "il te manque " +
                missedLabels.slice(0, 2).join(" et ")
              : "certains aspects sont encore à développer"
          }. 🚴‍♂️`;
        }
      } else {
        sentence = `Pas encore un vrai ${profileMatch.name}, mais ${
          matchedLabels.length
            ? "tu montres des signes sur " +
              matchedLabels.slice(0, 1).join(", ")
            : "le potentiel est là"
        }. Continue à t’entraîner, chaque watt compte ! 💥`;
      }

      return sentence;
    },

    /* =========================
     * CARTE PROFIL + MATCHES
     * ========================= */

    renderProfileCard(result) {
      const container = document.getElementById("profile-card");
      if (!container) return;

      const { profile, metrics, matches } = result;
      if (!profile) {
        container.innerHTML =
          "<p>Aucun profil détecté. Vérifie tes données.</p>";
        return;
      }

      container.classList.remove("profile-card--empty");
      container.innerHTML = "";

      const isSecret = !!profile.hidden;

      // Séparer profils normaux / cachés
	const normalMatches = (matches || []).filter(m => !m.hidden);
	const hiddenMatches = (matches || []).filter(m => m.hidden);

	let matchBars = "";

	if (normalMatches.length) {
	  matchBars += normalMatches.map((m) => {
		const safePercent = isNaN(m.percent)
		  ? 0
		  : Math.max(2, Math.min(100, m.percent));
		const color =
		  getComputedStyle(document.documentElement).getPropertyValue("--accent-color") || "#2563eb";
		return `
		  <div class="match-bar">
			<div class="match-bar-label">${m.emoji || "🚴‍♂️"} ${m.name}</div>
			<div class="match-bar-track">
			  <div class="match-bar-fill" style="width:${safePercent}%;background:${color.trim()};"></div>
			</div>
			<div class="match-bar-percent">${safePercent}%</div>
		  </div>`;
	  }).join("");
	}

	if (hiddenMatches.length) {
	  matchBars += `
		<h5 style="margin-top:1rem;color:var(--accent-color);font-size:0.9rem;">
		  Profils spéciaux débloqués 🌟
		</h5>
	  `;

	  matchBars += hiddenMatches.map((m) => {
		const percent = isNaN(m.percent) ? 0 : Math.max(2, Math.min(100, m.percent));
		return `
		  <div class="match-bar secret">
			<div class="match-bar-label">${m.emoji || "🌟"} ${m.name}</div>
			<div class="match-bar-percent">${percent}%</div>
		  </div>
		  <p class="hidden-desc">${m.description || "Profil légendaire sans description."}</p>
		`;
	  }).join("");
	}


      const mainMatch =
        matches && matches.length ? matches[0] : null;

      let debugHtml = "";
      if (mainMatch && Array.isArray(mainMatch.details)) {
        debugHtml =
          `<ul class="debug-list">` +
          mainMatch.details
            .map((d) => {
              const icon = d.matched ? "✔️" : "❌";
              const label = d.label || d.baseKey || d.key;
              const actual =
                d.actual === null || d.actual === undefined
                  ? "—"
                  : d.actual;
              const weightInfo = d.weight
                ? ` (poids ${(d.weight * 100).toFixed(
                    1
                  )}%)`
                : "";
              return `
            <li>
              ${icon}
              <strong>${label}</strong> :
              attendu <code>${d.expected}</code>,
              obtenu <code>${actual}</code>${weightInfo}
            </li>`;
            })
            .join("") +
          `</ul>`;
      }

      const percentDisplay =
        (mainMatch && mainMatch.percent) || 0;

      const summaryText =
        this.generateSummaryText(mainMatch);

      const html = `
      <div class="profile-card-inner ${
        isSecret ? "secret-profile" : ""
      }">
        <div class="profile-card-header">
          <div class="profile-emoji">${profile.emoji ||
            "🚴‍"}</div>
          <div>
            <div class="profile-title">
              ${isSecret ? "🌟 " : ""}${profile.name}
            </div>
            <div class="profile-badge">
              Score global : ${metrics.globalScore || 0}/100
            </div>
          </div>
        </div>

        <div class="profile-metrics">
          <div><strong>FTP :</strong> ${
            metrics.physiologie?.ftp || "-"
          } W</div>
          <div><strong>Poids :</strong> ${
            metrics.physiologie?.weight || "-"
          } kg</div>
          <div><strong>W/kg :</strong> ${
            metrics.physiologie?.wkg || 0
          }</div>
          <div><strong>Volume :</strong> ${
            metrics.entrainement?.volume || 0
          } h/sem</div>
        </div>

        <p class="profile-description">
          ${profile.description || ""}
          <br>
          <span style="font-size:0.8rem;color:#6b7280;">
            Profil principal estimé à ${percentDisplay}%.
          </span>
        </p>

        ${
          summaryText
            ? `<p class="profile-summary">${summaryText}</p>`
            : ""
        }

        <h4>Profils compatibles</h4>
        <div class="match-list">
          ${
            matchBars ||
            "<p>Aucune correspondance trouvée.</p>"
          }
        </div>

        <div id="debug-info" style="display:none;margin-top:8px;">
          <h4>Détails matching (debug)</h4>
          ${
            debugHtml ||
            "<p>Aucun détail disponible.</p>"
          }
        </div>
      </div>
    `;

      container.innerHTML = html;

      if (isSecret) {
        const cardInner =
          container.querySelector(".profile-card-inner");
        cardInner.classList.add("reveal-animation");
        setTimeout(
          () =>
            cardInner.classList.remove("reveal-animation"),
          3000
        );
      }
    },

    /* =========================
     * RADAR (TOI + PRO)
     * ========================= */

    renderRadarChart(result, pro = null, similarity = null) {
      const canvas = document.getElementById(
        "adn-radar-chart"
      );
      if (!canvas || !window.Chart) return;

      const ctx = canvas.getContext("2d");
      const data = result.metrics.capacites || {};
      const labels = Object.keys(data);
      const userValues = Object.values(data);

      const accent =
        getComputedStyle(
          document.documentElement
        ).getPropertyValue("--accent-color") || "#2563eb";

      let proValues = null;
      let proLabel = "";

      if (pro && pro.stats) {
        proValues = labels.map(
          (k) => pro.stats[k] ?? 0
        );
        proLabel = `${pro.name} (${similarity || 0}%)`;
      }

      if (window.radarChartInstance) {
        window.radarChartInstance.destroy();
      }

      const datasets = [
        {
          label: "Toi",
          data: userValues,
          fill: true,
          borderWidth: 2,
          borderColor: accent.trim(),
          backgroundColor:
            "rgba(37, 99, 235, 0.28)",
          pointRadius: 3
        }
      ];

      if (proValues) {
        datasets.push({
          label: proLabel,
          data: proValues,
          fill: true,
          borderWidth: 2,
          borderColor: "gold",
          backgroundColor:
            "rgba(255, 215, 0, 0.18)",
          pointRadius: 3
        });
      }

      window.radarChartInstance = new Chart(
        ctx,
        {
          type: "radar",
          data: {
            labels,
            datasets
          },
          options: {
            responsive: true,
            scales: {
              r: {
                min: 0,
                max: 10,
                ticks: {
                  stepSize: 2
                }
              }
            },
            plugins: {
              legend: {
                position: "top"
              }
            }
          }
        }
      );
    },

    /* =========================
     * COMPARAISON PROS (TEXTE)
     * ========================= */

    renderProComparison(pro, similarity) {
      const container =
        document.getElementById("pro-results");
      if (!container) return;

      if (!pro) {
        container.innerHTML =
          "<p>Aucune correspondance trouvée pour l’instant.</p>";
        return;
      }

      const color =
        similarity >= 85
          ? "gold"
          : similarity >= 70
          ? "var(--accent-color)"
          : "#9ca3af";

      container.innerHTML = `
      <div class="pro-compare-card">
        <span class="pro-emoji">${pro.emoji ||
          "🚴‍"}</span>
        <strong>${pro.name}</strong>
        <span class="pro-similarity" style="color:${color};">
          ${similarity}% de similarité
        </span>
        <p class="pro-style">Profil : ${pro.style ||
          "—"}</p>
      </div>
    `;
    },
	
	/**
	 * Capture et export de la carte ADN (PNG / PDF)
	 */
	initExportButtons() {
	  const pngBtn = document.getElementById("export-png");
	  const pdfBtn = document.getElementById("export-pdf");
	  const captureArea = document.querySelector(".adn-result"); // ✅ capture tout le bloc

	  if (!pngBtn || !pdfBtn || !captureArea) return;

	  async function captureToCanvas() {
	  // ✅ Forcer un fond blanc le temps de la capture
	  document.body.classList.add("exporting");

	  const canvas = await html2canvas(captureArea, {
		backgroundColor: "#ffffff",
		scale: 2,
		useCORS: true,
		logging: false
	  });

	  document.body.classList.remove("exporting");
	  return canvas;
	}

	  pngBtn.addEventListener("click", async () => {
		pngBtn.disabled = true;
		const canvas = await captureToCanvas();
		const dataURL = canvas.toDataURL("image/png");
		const a = document.createElement("a");
		a.href = dataURL;
		a.download = "ADN-cycliste.png";
		a.click();
		pngBtn.disabled = false;
	  });

	  pdfBtn.addEventListener("click", async () => {
		pdfBtn.disabled = true;
		const canvas = await captureToCanvas();
		const dataURL = canvas.toDataURL("image/png");
		const { jsPDF } = window.jspdf;
		const pdf = new jsPDF({
		  orientation: "portrait",
		  unit: "pt",
		  format: "a4"
		});
		const imgProps = pdf.getImageProperties(dataURL);
		const pdfWidth = pdf.internal.pageSize.getWidth();
		const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
		pdf.addImage(dataURL, "PNG", 0, 0, pdfWidth, pdfHeight);
		pdf.save("ADN-cycliste.pdf");
		pdfBtn.disabled = false;
	  });
	},

    /* =========================
     * DEBUG
     * ========================= */

    toggleDebugInfo() {
      const debugDiv =
        document.getElementById("debug-info");
      const button =
        document.getElementById("debug-toggle");

      if (!debugDiv || !button) {
        console.warn("Debug area not found");
        return;
      }

      const isVisible =
        debugDiv.style.display === "block";
      debugDiv.style.display = isVisible
        ? "none"
        : "block";
      button.textContent = isVisible
        ? "Afficher debug"
        : "Masquer debug";
    },

    // Stubs compat
    updateRangeLabels() {},
    toggleTriathlonFields() {}
  };

  window.ADNUI = ADNUI;
})(window, document);
