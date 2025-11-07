// js/main.js
(function (window, document) {
  "use strict";

  // ✅ profiles déclaré en dehors de loadProfiles pour être global
  let profiles = [];

  function loadProfiles() {
    // 🔹 inline fallback (pas de fetch)
    profiles = [
	  {
		"id": "grimpeur",
		"name": "Grimpeur",
		"conditions": {
		  "minWkg": 4,
		  "minEndurance": 6,
		  "preference": "montagne"
		},
		"description": "Tu es léger et constant, les pentes te sourient.",
		"emoji": "🧗‍♂️"
	  },
	  {
		"id": "diesel",
		"name": "Rouleur diesel",
		"conditions": {
		  "minEndurance": 8,
		  "maxExplosivite": 6,
		  "minVolume": 8
		},
		"description": "Tu carbures à la régularité et à la puissance longue.",
		"emoji": "🚂"
	  },
	  {
		"id": "sprinteur",
		"name": "Sprinteur explosif",
		"conditions": {
		  "minSprint": 8,
		  "minExplosivite": 8,
		  "maxEndurance": 6
		},
		"description": "Tu brilles dans les 200 derniers mètres, puissance pure !",
		"emoji": "💥"
	  },
	  {
		"id": "triathlete",
		"name": "Triathlète endurant",
		"conditions": {
		  "triathlon": true,
		  "minAerobie": 7,
		  "minVolume": 6,
		  "minAero": 7
		},
		"description": "Endurant, régulier et concentré : tu domines la durée.",
		"emoji": "🏊‍♂️🚴‍♂️🏃‍♂️"
	  },
	  {
		"id": "descendeur",
		"name": "Descendeur technique",
		"conditions": {
		  "minConfidence": 8,
		  "minTechnique": 7
		},
		"description": "Tu es à l’aise dans les virages, la gravité est ton alliée.",
		"emoji": "🚵‍♂️"
	  }
	];

    console.log("Profils chargés :", profiles);
    return Promise.resolve();
  }

  function onFormSubmit(event) {
    event.preventDefault();
    if (!window.ADNAnalyzer || !window.ADNUI) {
      console.error("Modules non chargés correctement.");
      return;
    }

	// ✅ Collecte automatique des valeurs du formulaire dynamique
	const formData = {};
	const allInputs = document.querySelectorAll("#dynamic-form input, #dynamic-form select");

	allInputs.forEach(input => {
	  const key = input.name;
	  if (!key) return;

	  if (input.type === "checkbox") {
		formData[key] = input.checked;
	  } else if (input.type === "number" || input.type === "range") {
		formData[key] = Number(input.value);
	  } else {
		formData[key] = input.value;
	  }
	});

	// Vérifie la présence des données essentielles
	if (!formData.ftp || !formData.weight) {
	  alert("Merci de renseigner au moins FTP et Poids !");
	  return;
	}

	const inputs = formData;

    console.log("DEBUG inputs", inputs);
    const result = window.ADNAnalyzer.analyze(inputs, profiles);
    console.log("DEBUG analyze result", result);

    window.ADNUI.renderProfileCard(result);
    window.ADNUI.renderRadarChart(result);
  }

	document.addEventListener("DOMContentLoaded", function () {
	  if (window.ADNUI) {
		window.ADNUI.initThemeSelector();
		window.ADNUI.updateRangeLabels();
		window.ADNUI.toggleTriathlonFields();
		window.ADNUI.generateDynamicForm();
	  }

	  // ✅ Activation du bouton debug
	  const debugBtn = document.getElementById("debug-toggle");
	  if (debugBtn) {
		debugBtn.addEventListener("click", () => window.ADNUI.toggleDebugInfo());
	  }

	  loadProfiles().then(() => {
		const form = document.getElementById("cyclist-form");
		if (form) form.addEventListener("submit", onFormSubmit);
	  });
	});

})(window, document);
