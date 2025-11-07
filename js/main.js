// js/main.js
(function (window, document) {
  "use strict";

  let profiles = [];

	function loadProfiles() {
	  // 🔹 Inline fallback (pas de fetch)
	  profiles = [
		{
		  "id": "grimpeur",
		  "name": "Grimpeur",
		  "conditions": { "minWkg": 4, "preference": "montagne" },
		  "description": "Tu es léger et constant, les pentes te sourient.",
		  "emoji": "🧗‍♂️"
		},
		{
		  "id": "diesel",
		  "name": "Rouleur diesel",
		  "conditions": { "minEndurance": 8, "maxExplosivity": 6 },
		  "description": "Tu carbures à la régularité et à la puissance longue.",
		  "emoji": "🚂"
		},
		{
		  "id": "fun-unicorn",
		  "name": "Licorne des cols",
		  "conditions": { "explosivity": 10 },
		  "description": "Tu brilles plus fort que ton capteur de puissance ✨",
		  "emoji": "🦄"
		},
		{
		  "id": "triathlete",
		  "name": "Triathlète endurant",
		  "conditions": { "triathlete": true, "minEndurance": 7 },
		  "description": "Tu combines natation, vélo et course avec une endurance hors norme.",
		  "emoji": "🏊‍♂️🚴‍♂️🏃‍♂️"
		}
	  ];

	  return Promise.resolve();
	}



  function onFormSubmit(event) {
    event.preventDefault();
    if (!window.ADNAnalyzer || !window.ADNUI) {
      console.error("Modules non chargés correctement.");
      return;
    }

    const ftp = document.getElementById("ftp").value;
    const weight = document.getElementById("weight").value;
    const endurance = document.getElementById("endurance").value;
    const explosivity = document.getElementById("explosivity").value;
    const preference = document.getElementById("preference").value;

    if (!ftp || !weight) {
      return;
    }

    const inputs = {
      ftp,
      weight,
      endurance,
      explosivity,
      preference
    };

    const result = window.ADNAnalyzer.analyze(inputs, profiles);
    window.ADNUI.renderProfileCard(result);
    window.ADNUI.renderRadarChart(result);
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Initialisation UI
    if (window.ADNUI) {
      window.ADNUI.initThemeSelector();
      window.ADNUI.updateRangeLabels();
	  window.ADNUI.toggleTriathlonFields();

    }

    // Chargement des profils puis binding du form
    loadProfiles().then(() => {
      const form = document.getElementById("cyclist-form");
      if (form) {
        form.addEventListener("submit", onFormSubmit);
      }
    });
  });
})(window, document);
