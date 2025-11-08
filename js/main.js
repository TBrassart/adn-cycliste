// js/main.js
(function (window, document) {
  "use strict";

  // ✅ profiles déclaré en dehors de loadProfiles pour être global
  let profiles = [];

  function loadProfiles() {
  // 🔹 Inline fallback complet — 30 profils dont 10 easter eggs
	profiles = [
		// === PHYSIOLOGIQUES ===
	{
		"id": "grimpeur",
		"name": "Grimpeur",
		"emoji": "🧗",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 200,
		  //"maxFtp": 400,
		  //"minWeight": 55,
		  "maxWeight": 70,
		  //"minWkg": 3.5,
		  //"maxWkg": 6.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  "sexe": "M",
		  "preference": "montagne",

		  // 🧬 --- CAPACITÉS ---
		  //"minEndurance": 6,
		  //"maxEndurance": 10,
		  //"minExplosivite": 5,
		  //"maxExplosivite": 10,
		  "minAerobie": 7,
		  //"maxAerobie": 10,
		  //"minSprint": 6,
		  //"maxSprint": 10,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  //"minAero": 6,
		  //"maxAero": 10,
		  "minTechnique": 8,
		  //"maxTechnique": 10,
		  "minConfidence": 6,
		  //"maxConfidence": 10,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 6,
		  //"maxVolume": 12,
		  //"minRecuperation": 6,
		  //"maxRecuperation": 10,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Texte libre qui décrit le profil de manière humaine et stylée.",

		"hidden": false
	  },
	  {
		"id": "diesel",
		"name": "Rouleur diesel",
		"emoji": "🚂",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 200,
		  //"maxFtp": 400,
		  //"minWeight": 55,
		  //"maxWeight": 85,
		  //"minWkg": 3.5,
		  "maxWkg": 4.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  "preference": "plat",

		  // 🧬 --- CAPACITÉS ---
		  "minEndurance": 6,
		  //"maxEndurance": 10,
		  //"minExplosivite": 5,
		  "maxExplosivite": 5,
		  "minAerobie": 7,
		  //"maxAerobie": 10,
		  //"minSprint": 6,
		  "maxSprint": 6,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  "minAero": 6,
		  "maxAero": 10,
		  "minTechnique": 6,
		  "maxTechnique": 8,
		  //"minConfidence": 6,
		  "maxConfidence": 7,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 6,
		  //"maxVolume": 12,
		  //"minRecuperation": 6,
		  "maxRecuperation": 7,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  "triathlon": true,
		  "triDistance": "M",
		  "minTriTime": 90,
		  "maxTriTime": 360
		},

		"description": "Tu carbures à la régularité et à la puissance longue.",

		"hidden": false
	  },
	  {
		"id": "sprinteur",
		"name": "Sprinteur explosif",
		"emoji": "💥",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 200,
		  //"maxFtp": 400,
		  "minWeight": 70,
		  //"maxWeight": 85,
		  //"minWkg": 3.5,
		  //"maxWkg": 4.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  "preference": "plat",

		  // 🧬 --- CAPACITÉS ---
		  "minEndurance": 6,
		  //"maxEndurance": 10,
		  "minExplosivite": 8,
		  //"maxExplosivite": 5,
		  //"minAerobie": 7,
		  "maxAerobie": 5,
		  "minSprint": 8,
		  //"maxSprint": 6,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  "minAero": 6,
		  //"maxAero": 10,
		  "minTechnique": 7,
		  //"maxTechnique": 8,
		  "minConfidence": 6,
		  //"maxConfidence": 7,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 6,
		  //"maxVolume": 12,
		  //"minRecuperation": 6,
		  "maxRecuperation": 7,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Tu brilles dans les 200 derniers mètres, puissance pure !",

		"hidden": false
	  },
	  {
		"id": "puncheur",
		"name": "Puncheur",
		"emoji": "⚡",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 200,
		  //"maxFtp": 400,
		  //"minWeight": 70,
		  //"maxWeight": 85,
		  //"minWkg": 3.5,
		  //"maxWkg": 4.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  "preference": "vallonné",

		  // 🧬 --- CAPACITÉS ---
		  //"minEndurance": 6,
		  "maxEndurance": 5,
		  "minExplosivite": 8,
		  //"maxExplosivite": 5,
		  //"minAerobie": 7,
		  "maxAerobie": 5,
		  "minSprint": 8,
		  //"maxSprint": 6,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  "minAero": 4,
		  "maxAero": 7,
		  "minTechnique": 7,
		  //"maxTechnique": 8,
		  "minConfidence": 7,
		  //"maxConfidence": 7,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 6,
		  //"maxVolume": 12,
		  //"minRecuperation": 6,
		  "maxRecuperation": 7,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Tu adores les côtes courtes où tu peux faire parler ton punch.",

		"hidden": false
	  },
	  {
		"id": "chrono",
		"name": "Rider chrono",
		"emoji": "⏱️",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  "minFtp": 300,
		  //"maxFtp": 400,
		  //"minWeight": 70,
		  //"maxWeight": 85,
		  //"minWkg": 3.5,
		  //"maxWkg": 4.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  "preference": "vallonné",

		  // 🧬 --- CAPACITÉS ---
		  //"minEndurance": 6,
		  "maxEndurance": 5,
		  "minExplosivite": 8,
		  //"maxExplosivite": 5,
		  "minAerobie": 7,
		  //"maxAerobie": 5,
		  "minSprint": 3,
		  //"maxSprint": 6,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  "minAero": 7,
		  //"maxAero": 7,
		  "minTechnique": 4,
		  //"maxTechnique": 8,
		  "minConfidence": 4,
		  //"maxConfidence": 7,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 6,
		  //"maxVolume": 12,
		  //"minRecuperation": 6,
		  "maxRecuperation": 7,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Tu files droit, tête baissée, comme une lame dans le vent.",

		"hidden": false
	  },
	  {
		"id": "grimpeur-puncheur",
		"name": "Grimpeur-puncheur",
		"emoji": "🧗‍⚡",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 300,
		  //"maxFtp": 400,
		  //"minWeight": 70,
		  "maxWeight": 80,
		  "minWkg": 3.5,
		  //"maxWkg": 4.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  "preference": "montagne",

		  // 🧬 --- CAPACITÉS ---
		  //"minEndurance": 6,
		  "maxEndurance": 5,
		  "minExplosivite": 4,
		  //"maxExplosivite": 5,
		  "minAerobie": 4,
		  //"maxAerobie": 5,
		  "minSprint": 3,
		  //"maxSprint": 6,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  //"minAero": 7,
		  //"maxAero": 7,
		  //"minTechnique": 4,
		  //"maxTechnique": 8,
		  "minConfidence": 4,
		  //"maxConfidence": 7,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 6,
		  //"maxVolume": 12,
		  "minRecuperation": 3,
		  //"maxRecuperation": 7,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Tu voles dans les cols mais attaques sur les rampes raides.",

		"hidden": false
	  },
	  {
		"id": "endurant",
		"name": "Endurant infatigable",
		"emoji": "🧗‍⚡",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 300,
		  //"maxFtp": 400,
		  //"minWeight": 70,
		  //"maxWeight": 80,
		  //"minWkg": 3.5,
		  //"maxWkg": 4.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  //"preference": "montagne",

		  // 🧬 --- CAPACITÉS ---
		  "minEndurance": 9,
		  //"maxEndurance": 5,
		  //"minExplosivite": 4,
		  //"maxExplosivite": 5,
		  //"minAerobie": 4,
		  //"maxAerobie": 5,
		  //"minSprint": 3,
		  //"maxSprint": 6,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  "minAero": 7,
		  //"maxAero": 7,
		  "minTechnique": 4,
		  //"maxTechnique": 8,
		  //"minConfidence": 4,
		  //"maxConfidence": 7,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 6,
		  //"maxVolume": 12,
		  "minRecuperation": 6,
		  //"maxRecuperation": 7,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Tu es une machine à rouler, tu ne t’arrêtes jamais.",

		"hidden": false
	  },
	// === TECHNIQUES / DISCIPLINES ===
	  {
		"id": "triathlete",
		"name": "Triathlète endurant",
		"emoji": "🏊🚴🏃",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  "minFtp": 200,
		  //"maxFtp": 400,
		  //"minWeight": 70,
		  //"maxWeight": 80,
		  //"minWkg": 3.5,
		  //"maxWkg": 4.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  "preference": "vallonné",

		  // 🧬 --- CAPACITÉS ---
		  "minEndurance": 7,
		  //"maxEndurance": 5,
		  //"minExplosivite": 4,
		  //"maxExplosivite": 5,
		  "minAerobie": 4,
		  //"maxAerobie": 5,
		  //"minSprint": 3,
		  //"maxSprint": 6,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  "minAero": 7,
		  //"maxAero": 7,
		  "minTechnique": 4,
		  //"maxTechnique": 8,
		  //"minConfidence": 4,
		  //"maxConfidence": 7,

		  // 🕒 --- ENTRAÎNEMENT ---
		  "minVolume": 10,
		  //"maxVolume": 12,
		  "minRecuperation": 4,
		  //"maxRecuperation": 7,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  "triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Endurant, régulier et concentré : tu domines la durée.",

		"hidden": false
	  },
	  {
		"id": "descendeur",
		"name": "Descendeur technique",
		"emoji": "🚵",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 200,
		  //"maxFtp": 400,
		  //"minWeight": 70,
		  //"maxWeight": 80,
		  //"minWkg": 3.5,
		  "maxWkg": 5.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  "preference": "montagne",

		  // 🧬 --- CAPACITÉS ---
		  //"minEndurance": 7,
		  //"maxEndurance": 5,
		  //"minExplosivite": 4,
		  //"maxExplosivite": 5,
		  "minAerobie": 4,
		  "maxAerobie": 8,
		  //"minSprint": 3,
		  //"maxSprint": 6,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  "minAero": 7,
		  //"maxAero": 7,
		  "minTechnique": 8,
		  //"maxTechnique": 8,
		  "minConfidence": 8,
		  //"maxConfidence": 7,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 10,
		  //"maxVolume": 12,
		  "minRecuperation": 4,
		  //"maxRecuperation": 7,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Tu es à l’aise dans les virages, la gravité est ton alliée.",

		"hidden": false
	  },
	  {
		"id": "gravel",
		"name": "Aventurier gravel",
		"emoji": "🌍",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 200,
		  //"maxFtp": 400,
		  //"minWeight": 70,
		  //"maxWeight": 80,
		  //"minWkg": 3.5,
		  //"maxWkg": 5.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  "preference": "vallonné",

		  // 🧬 --- CAPACITÉS ---
		  "minEndurance": 4,
		  //"maxEndurance": 5,
		  //"minExplosivite": 4,
		  //"maxExplosivite": 5,
		  "minAerobie": 4,
		  //"maxAerobie": 8,
		  //"minSprint": 3,
		  //"maxSprint": 6,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  //"minAero": 7,
		  //"maxAero": 7,
		  "minTechnique": 6,
		  //"maxTechnique": 8,
		  "minConfidence": 6,
		  //"maxConfidence": 7,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 10,
		  //"maxVolume": 12,
		  //"minRecuperation": 4,
		  //"maxRecuperation": 7,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Tu cherches les chemins perdus, le bitume te fatigue.",

		"hidden": false
	  },
	  {
		"id": "cx",
		"name": "Cyclocross Wizard",
		"emoji": "🌀",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 200,
		  //"maxFtp": 400,
		  //"minWeight": 70,
		  //"maxWeight": 80,
		  "minWkg": 4.0,
		  //"maxWkg": 5.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  "preference": "vallonné",

		  // 🧬 --- CAPACITÉS ---
		  "minEndurance": 4,
		  //"maxEndurance": 5,
		  "minExplosivite": 6,
		  //"maxExplosivite": 5,
		  "minAerobie": 5,
		  //"maxAerobie": 8,
		  "minSprint": 5,
		  //"maxSprint": 6,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  //"minAero": 7,
		  //"maxAero": 7,
		  "minTechnique": 6,
		  //"maxTechnique": 8,
		  "minConfidence": 6,
		  //"maxConfidence": 7,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 10,
		  //"maxVolume": 12,
		  //"minRecuperation": 4,
		  //"maxRecuperation": 7,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Tu passes partout, dans la boue comme sur l’asphalte.",

		"hidden": false
	  },
	  {
		"id": "aero-freak",
		"name": "Aero Freak",
		"emoji": "💨",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 200,
		  //"maxFtp": 400,
		  //"minWeight": 70,
		  //"maxWeight": 80,
		  //"minWkg": 4.0,
		  //"maxWkg": 5.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  //"preference": "plat",

		  // 🧬 --- CAPACITÉS ---
		  //"minEndurance": 4,
		  //"maxEndurance": 5,
		  //"minExplosivite": 6,
		  "maxExplosivite": 5,
		  "minAerobie": 5,
		  //"maxAerobie": 8,
		  //"minSprint": 5,
		  //"maxSprint": 6,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  "minAero": 8,
		  //"maxAero": 7,
		  "minTechnique": 6,
		  //"maxTechnique": 8,
		  "minConfidence": 6,
		  //"maxConfidence": 7,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 10,
		  //"maxVolume": 12,
		  "minRecuperation": 4,
		  //"maxRecuperation": 7,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Tu t’intéresses plus à ton CdA qu’à ton FTP.",

		"hidden": false
	  },
	  {
		"id": "rouleur",
		"name": "Rouleur",
		"emoji": "🚴",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 200,
		  //"maxFtp": 400,
		  //"minWeight": 70,
		  //"maxWeight": 80,
		  "minWkg": 3.0,
		  //"maxWkg": 5.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  //"preference": "plat",

		  // 🧬 --- CAPACITÉS ---
		  //"minEndurance": 4,
		  //"maxEndurance": 5,
		  //"minExplosivite": 6,
		  //"maxExplosivite": 5,
		  "minAerobie": 6,
		  //"maxAerobie": 8,
		  //"minSprint": 5,
		  //"maxSprint": 6,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  "minAero": 2,
		  //"maxAero": 7,
		  //"minTechnique": 6,
		  //"maxTechnique": 8,
		  "minConfidence": 3,
		  //"maxConfidence": 7,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 10,
		  //"maxVolume": 12,
		  "minRecuperation": 3,
		  //"maxRecuperation": 7,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Puissant et constant, le rouleur est le métronome du peloton. Il maintient un haut niveau de puissance sur le plat et sert de moteur dans les longues échappées.",

		"hidden": false
	  },
	  {
		"id": "grimpeur-diesel",
		"name": "Diesel des montagnes",
		"emoji": "🏔️🚂",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 200,
		  //"maxFtp": 400,
		  //"minWeight": 70,
		  //"maxWeight": 80,
		  "minWkg": 4.0,
		  //"maxWkg": 5.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  //"preference": "plat",

		  // 🧬 --- CAPACITÉS ---
		  //"minEndurance": 4,
		  //"maxEndurance": 5,
		  //"minExplosivite": 6,
		  "maxExplosivite": 5,
		  "minAerobie": 6,
		  //"maxAerobie": 8,
		  //"minSprint": 5,
		  //"maxSprint": 6,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  //"minAero": 2,
		  //"maxAero": 7,
		  "minTechnique": 4,
		  //"maxTechnique": 8,
		  //"minConfidence": 3,
		  //"maxConfidence": 7,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 10,
		  //"maxVolume": 12,
		  "minRecuperation": 6,
		  //"maxRecuperation": 7,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Puissant et constant, le rouleur est le métronome du peloton. Il maintient un haut niveau de puissance sur le plat et sert de moteur dans les longues échappées.",

		"hidden": false
	  },
	  {
		"id": "strategiste",
		"name": "Stratège du peloton",
		"emoji": "🧠",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 200,
		  //"maxFtp": 400,
		  //"minWeight": 70,
		  //"maxWeight": 80,
		  //"minWkg": 4.0,
		  //"maxWkg": 5.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  //"preference": "plat",

		  // 🧬 --- CAPACITÉS ---
		  "minEndurance": 6,
		  //"maxEndurance": 5,
		  //"minExplosivite": 6,
		  "maxExplosivite": 6,
		  "minAerobie": 3,
		  //"maxAerobie": 8,
		  //"minSprint": 5,
		  //"maxSprint": 6,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  //"minAero": 2,
		  //"maxAero": 7,
		  "minTechnique": 8,
		  //"maxTechnique": 8,
		  "minConfidence": 6,
		  //"maxConfidence": 7,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 10,
		  //"maxVolume": 12,
		  "minRecuperation": 7,
		  //"maxRecuperation": 7,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Tu lis la course, tu attaques au bon moment. Rien n’est laissé au hasard.",

		"hidden": false
	  },
	  {
		"id": "minimaliste",
		"name": "Minimaliste zen",
		"emoji": "🧘",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 200,
		  "maxFtp": 300,
		  //"minWeight": 70,
		  //"maxWeight": 80,
		  //"minWkg": 4.0,
		  "maxWkg": 3.5,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  //"preference": "plat",

		  // 🧬 --- CAPACITÉS ---
		  //"minEndurance": 6,
		  "maxEndurance": 6,
		  //"minExplosivite": 6,
		  "maxExplosivite": 6,
		  //"minAerobie": 3,
		  //"maxAerobie": 8,
		  //"minSprint": 5,
		  "maxSprint": 6,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  //"minAero": 2,
		  //"maxAero": 7,
		  //"minTechnique": 8,
		  "maxTechnique": 5,
		  //"minConfidence": 6,
		  //"maxConfidence": 7,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 10,
		  //"maxVolume": 12,
		  "minRecuperation": 7,
		  //"maxRecuperation": 7,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Tu roules pour le plaisir, pas pour le FTP.",

		"hidden": false
	  },
	  {
		"id": "ultra",
		"name": "Ultra cycliste",
		"emoji": "🗺",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 200,
		  //"maxFtp": 300,
		  //"minWeight": 70,
		  //"maxWeight": 80,
		  //"minWkg": 2.5,
		  //"maxWkg": 4.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  //"preference": "plat",

		  // 🧬 --- CAPACITÉS ---
		  "minEndurance": 8,
		  //"maxEndurance": 6,
		  //"minExplosivite": 6,
		  //"maxExplosivite": 6,
		  //"minAerobie": 3,
		  //"maxAerobie": 8,
		  //"minSprint": 5,
		  //"maxSprint": 6,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  "minAero": 4,
		  //"maxAero": 10,
		  "minTechnique": 4,
		  "maxTechnique": 8,
		  "minConfidence": 6,
		  "maxConfidence": 9,

		  // 🕒 --- ENTRAÎNEMENT ---
		  "minVolume": 10,
		  //"maxVolume": 12,
		  "minRecuperation": 7,
		  //"maxRecuperation": 7,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Tu roules pour traverser des pays, pas des segments Strava.",

		"hidden": false
	  },
	  {
		"id": "mental-warrior",
		"name": "Guerrier mental",
		"emoji": "🔥",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 200,
		  //"maxFtp": 300,
		  //"minWeight": 70,
		  //"maxWeight": 80,
		  "minWkg": 2.5,
		  "maxWkg": 4.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  //"preference": "plat",

		  // 🧬 --- CAPACITÉS ---
		  "minEndurance": 8,
		  //"maxEndurance": 6,
		  //"minExplosivite": 6,
		  //"maxExplosivite": 6,
		  "minAerobie": 3,
		  "maxAerobie": 8,
		  "minSprint": 4,
		  "maxSprint": 8,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  "minAero": 4,
		  //"maxAero": 10,
		  "minTechnique": 4,
		  "maxTechnique": 8,
		  "minConfidence": 6,
		  "maxConfidence": 9,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 10,
		  "maxVolume": 12,
		  "minRecuperation": 1,
		  "maxRecuperation": 7,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Tu roules pour traverser des pays, pas des segments Strava.",

		"hidden": false
	  },
	  {
		"id": "urbain",
		"name": "Rider urbain",
		"emoji": "🚦",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 200,
		  //"maxFtp": 300,
		  //"minWeight": 70,
		  //"maxWeight": 80,
		  "minWkg": 2.5,
		  "maxWkg": 4.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  //"preference": "plat",

		  // 🧬 --- CAPACITÉS ---
		  //"minEndurance": 8,
		  //"maxEndurance": 6,
		  "minExplosivite": 6,
		  //"maxExplosivite": 6,
		  "minAerobie": 3,
		  "maxAerobie": 6,
		  "minSprint": 5,
		  "maxSprint": 9,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  //"minAero": 4,
		  //"maxAero": 10,
		  "minTechnique": 5,
		  "maxTechnique": 10,
		  "minConfidence": 7,
		  "maxConfidence": 10,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 10,
		  //"maxVolume": 12,
		  "minRecuperation": 7,
		  //"maxRecuperation": 7,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Agile, réactif et intuitif, le rider urbain navigue dans la circulation comme un poisson dans l’eau. Il mise sur le flow, le contrôle et la créativité plus que sur la puissance brute.",

		"hidden": false
	  },
	  {
		"id": "nocturne",
		"name": "Rider nocturne",
		"emoji": "🌙",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 200,
		  //"maxFtp": 300,
		  //"minWeight": 70,
		  //"maxWeight": 80,
		  "minWkg": 2.5,
		  "maxWkg": 4.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  //"preference": "plat",

		  // 🧬 --- CAPACITÉS ---
		  //"minEndurance": 8,
		  //"maxEndurance": 6,
		  "minExplosivite": 1,
		  "maxExplosivite": 5,
		  "minAerobie": 6,
		  "maxAerobie": 10,
		  "minSprint": 1,
		  "maxSprint": 5,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  //"minAero": 4,
		  //"maxAero": 10,
		  "minTechnique": 3,
		  "maxTechnique": 6,
		  "minConfidence": 7,
		  "maxConfidence": 10,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 10,
		  //"maxVolume": 12,
		  "minRecuperation": 5,
		  "maxRecuperation": 8,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Tu aimes la route calme et les sorties après le coucher du soleil.",

		"hidden": false
	  },
	  {
		"id": "baroudeur",
		"name": "Baroudeur",
		"emoji": "️🚀",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 9000,
		  //"maxFtp": 0,
		  //"minWeight": 150,
		  //"maxWeight": 80,
		  "minWkg": 3.5,
		  "maxWkg": 5.0,
		  //"minAge": 60,
		  //"maxAge": 65,
		  //"sexe": "M",
		  "preference": "vallonné",

		  // 🧬 --- CAPACITÉS ---
		  "minEndurance": 6,
		  "maxEndurance": 9,
		  "minExplosivite": 6,
		  "maxExplosivite": 9,
		  "minAerobie": 6,
		  "maxAerobie": 9,
		  "minSprint": 4,
		  "maxSprint": 8,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  "minAero": 4,
		  "maxAero": 7,
		  "minTechnique": 5,
		  "maxTechnique": 8,
		  "minConfidence": 7,
		  "maxConfidence": 10,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 20,
		  //"maxVolume": 1,
		  "minRecuperation": 3,
		  "maxRecuperation": 8,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Instinctif, courageux et imprévisible, tu attaques de loin et crois toujours en ton coup. Le baroudeur vit pour le panache, pas pour le calcul.",

		"hidden": false
	  },
	  {
		"id": "leader",
		"name": "Capitaine de route",
		"emoji": "️👨‍✈️",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 9000,
		  //"maxFtp": 0,
		  //"minWeight": 150,
		  //"maxWeight": 80,
		  //"minWkg": 3.5,
		  "maxWkg": 5.0,
		  //"minAge": 60,
		  //"maxAge": 65,
		  //"sexe": "M",
		  //"preference": "vallonné",

		  // 🧬 --- CAPACITÉS ---
		  "minEndurance": 6,
		  "maxEndurance": 9,
		  "minExplosivite": 3,
		  "maxExplosivite": 6,
		  "minAerobie": 6,
		  "maxAerobie": 9,
		  "minSprint": 3,
		  "maxSprint": 7,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  "minAero": 4,
		  "maxAero": 8,
		  "minTechnique": 8,
		  "maxTechnique": 10,
		  "minConfidence": 8,
		  "maxConfidence": 10,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 20,
		  //"maxVolume": 1,
		  "minRecuperation": 5,
		  "maxRecuperation": 9,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Calme et inspirant, tu guides les autres par l’exemple. Stratège, pédagogue et solide, tu es le capitaine de route qui fait grandir son équipe.",

		"hidden": false
	  },
	// === FUN & EASTER EGGS ===
	  {
		"id": "licorne-cols",
		"name": "Licorne des cols",
		"emoji": "🦄",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 200,
		  //"maxFtp": 300,
		  //"minWeight": 70,
		  //"maxWeight": 80,
		  "minWkg": 5.0,
		  //"maxWkg": 4.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  //"preference": "plat",

		  // 🧬 --- CAPACITÉS ---
		  "minEndurance": 4,
		  "maxEndurance": 8,
		  "minExplosivite": 8,
		  "maxExplosivite": 10,
		  "minAerobie": 8,
		  "maxAerobie": 10,
		  "minSprint": 5,
		  "maxSprint": 9,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  //"minAero": 4,
		  //"maxAero": 10,
		  "minTechnique": 6,
		  "maxTechnique": 10,
		  "minConfidence": 7,
		  "maxConfidence": 10,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 10,
		  //"maxVolume": 12,
		  "minRecuperation": 5,
		  "maxRecuperation": 8,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Tu brilles plus fort que ton capteur de puissance ✨.",

		"hidden": true
	  },
	  {
		"id": "caffeine-rider",
		"name": "Caféinisé permanent",
		"emoji": "☕",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 200,
		  //"maxFtp": 300,
		  //"minWeight": 70,
		  //"maxWeight": 80,
		  //"minWkg": 5.0,
		 "maxWkg": 3.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  //"preference": "plat",

		  // 🧬 --- CAPACITÉS ---
		  "minEndurance": 1,
		  "maxEndurance": 5,
		  "minExplosivite": 8,
		  "maxExplosivite": 10,
		  "minAerobie": 8,
		  "maxAerobie": 10,
		  "minSprint": 6,
		  "maxSprint": 10,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  //"minAero": 4,
		  //"maxAero": 10,
		  "minTechnique": 1,
		  "maxTechnique": 5,
		  "minConfidence": 7,
		  "maxConfidence": 10,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 10,
		  "maxVolume": 3,
		  "minRecuperation": 1,
		  "maxRecuperation": 4,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Tu ne pédales pas, tu vibres. Probablement trop de café mais tu préfère te dire que ce n'est pas ça.",

		"hidden": true
	  },
	  {
		"id": "zwift-warrior",
		"name": "Zwift Warrior",
		"emoji": "️🖥️🚴",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 200,
		  //"maxFtp": 300,
		  //"minWeight": 70,
		  //"maxWeight": 80,
		  //"minWkg": 5.0,
		  //"maxWkg": 3.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  "preference": "home trainer",

		  // 🧬 --- CAPACITÉS ---
		  "minEndurance": 4,
		  "maxEndurance": 8,
		  "minExplosivite": 5,
		  "maxExplosivite": 8,
		  "minAerobie": 3,
		  "maxAerobie": 6,
		  "minSprint": 5,
		  "maxSprint": 8,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  //"minAero": 4,
		  //"maxAero": 10,
		  "minTechnique": 1,
		  "maxTechnique": 5,
		  "minConfidence": 1,
		  "maxConfidence": 7,

		  // 🕒 --- ENTRAÎNEMENT ---
		  "minVolume": 10,
		  //"maxVolume": 3,
		  //"minRecuperation": 1,
		  //"maxRecuperation": 4,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Tu connais plus Watopia que ta propre région.",

		"hidden": true
	  },
	  {
		"id": "gravel-poet",
		"name": "Poète du gravel",
		"emoji": "️📜🚴",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 200,
		  //"maxFtp": 300,
		  //"minWeight": 70,
		  //"maxWeight": 80,
		  //"minWkg": 5.0,
		  //"maxWkg": 3.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  "preference": "vallonné",

		  // 🧬 --- CAPACITÉS ---
		  "minEndurance": 6,
		  "maxEndurance": 8,
		  "minExplosivite": 1,
		  "maxExplosivite": 5,
		  "minAerobie": 7,
		  "maxAerobie": 10,
		  "minSprint": 3,
		  "maxSprint": 5,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  //"minAero": 4,
		  //"maxAero": 10,
		  "minTechnique": 1,
		  "maxTechnique": 5,
		  "minConfidence": 1,
		  "maxConfidence": 5,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 10,
		  //"maxVolume": 3,
		  //"minRecuperation": 1,
		  //"maxRecuperation": 4,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Tu postes des haïkus après chaque sortie poussiéreuse.",

		"hidden": true
	  },
	  {
		"id": "chrono-nerd",
		"name": "Chrono Nerd",
		"emoji": "️⌚",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 200,
		  //"maxFtp": 400,
		  //"minWeight": 70,
		  //"maxWeight": 80,
		  //"minWkg": 4.0,
		  //"maxWkg": 5.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  //"preference": "plat",

		  // 🧬 --- CAPACITÉS ---
		  //"minEndurance": 4,
		  //"maxEndurance": 5,
		  //"minExplosivite": 6,
		  "maxExplosivite": 6,
		  "minAerobie": 8,
		  //"maxAerobie": 8,
		  //"minSprint": 5,
		  //"maxSprint": 6,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  "minAero": 10,
		  //"maxAero": 7,
		  "minTechnique": 8,
		  //"maxTechnique": 8,
		  "minConfidence": 8,
		  //"maxConfidence": 7,

		  // 🕒 --- ENTRAÎNEMENT ---
		  "minVolume": 20,
		  //"maxVolume": 12,
		  "minRecuperation": 6,
		  //"maxRecuperation": 7,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Tu passes plus de temps sur TrainingPeaks que sur la selle.",

		"hidden": true
	  },
	  {
		"id": "capteur-ko",
		"name": "Capteur KO",
		"emoji": "️⚙️",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 200,
		  "maxFtp": 0,
		  //"minWeight": 70,
		  //"maxWeight": 80,
		  //"minWkg": 4.0,
		  //"maxWkg": 5.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  //"preference": "plat",

		  // 🧬 --- CAPACITÉS ---
		  //"minEndurance": 4,
		  //"maxEndurance": 5,
		  //"minExplosivite": 6,
		  //"maxExplosivite": 6,
		  //"minAerobie": 8,
		  //"maxAerobie": 8,
		  //"minSprint": 5,
		  //"maxSprint": 6,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  //"minAero": 10,
		  //"maxAero": 7,
		  //"minTechnique": 8,
		  //"maxTechnique": 8,
		  //"minConfidence": 8,
		  //"maxConfidence": 7,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 20,
		  //"maxVolume": 12,
		  //"minRecuperation": 6,
		  //"maxRecuperation": 7,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Engine start, no problem. 5 minut. Tidim tidim tidim tidim. Engine kaput.",

		"hidden": true
	  },
	  {
		"id": "lanterne-rouge",
		"name": "Lanterne rouge",
		"emoji": "️🏮",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 200,
		  "maxFtp": 100,
		  //"minWeight": 70,
		  //"maxWeight": 80,
		  //"minWkg": 4.0,
		  //"maxWkg": 5.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  //"preference": "plat",

		  // 🧬 --- CAPACITÉS ---
		  //"minEndurance": 4,
		  "maxEndurance": 10,
		  //"minExplosivite": 6,
		  "maxExplosivite": 3,
		  //"minAerobie": 8,
		  "maxAerobie": 3,
		  //"minSprint": 5,
		  "maxSprint": 3,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  //"minAero": 10,
		  "maxAero": 3,
		  //"minTechnique": 8,
		  "maxTechnique": 3,
		  //"minConfidence": 8,
		  "maxConfidence": 3,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 20,
		  //"maxVolume": 12,
		  //"minRecuperation": 6,
		  //"maxRecuperation": 7,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Tu finis toujours, même si c’est dernier. Respect éternel.",

		"hidden": true
	  },
	  {
		"id": "ftp-over9000",
		"name": "FTP Over 9000",
		"emoji": "️🔥🤖️",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  "minFtp": 9000,
		  //"maxFtp": 0,
		  //"minWeight": 70,
		  //"maxWeight": 80,
		  //"minWkg": 4.0,
		  //"maxWkg": 5.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  //"preference": "plat",

		  // 🧬 --- CAPACITÉS ---
		  //"minEndurance": 4,
		  //"maxEndurance": 5,
		  //"minExplosivite": 6,
		  //"maxExplosivite": 6,
		  //"minAerobie": 8,
		  //"maxAerobie": 8,
		  //"minSprint": 5,
		  //"maxSprint": 6,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  //"minAero": 10,
		  //"maxAero": 7,
		  //"minTechnique": 8,
		  //"maxTechnique": 8,
		  //"minConfidence": 8,
		  //"maxConfidence": 7,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 20,
		  //"maxVolume": 12,
		  //"minRecuperation": 6,
		  //"maxRecuperation": 7,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Impossible. Tu es un dieu du watt. Les capteurs fondent à ton approche.",

		"hidden": true
	  },
	  {
		"id": "ghost-rider",
		"name": "Coureur fantôme",
		"emoji": "️👻",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 9000,
		  //"maxFtp": 0,
		  //"minWeight": 70,
		  //"maxWeight": 80,
		  "minWkg": 4.0,
		  //"maxWkg": 5.0,
		  //"minAge": 18,
		  //"maxAge": 65,
		  //"sexe": "M",
		  //"preference": "plat",

		  // 🧬 --- CAPACITÉS ---
		  "minEndurance": 6,
		  //"maxEndurance": 5,
		  "minExplosivite": 6,
		  //"maxExplosivite": 6,
		  "minAerobie": 6,
		  //"maxAerobie": 8,
		  "minSprint": 6,
		  //"maxSprint": 6,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  "minAero": 6,
		  //"maxAero": 7,
		  "minTechnique": 6,
		  //"maxTechnique": 8,
		  "minConfidence": 6,
		  //"maxConfidence": 7,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 20,
		  "maxVolume": 0,
		  //"minRecuperation": 6,
		  //"maxRecuperation": 7,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "On ne t'a pas vu de la saison à l'entrainement, mais tu dépasses la plupart des cyclistes dans les cols. Tu restes un mystère pour tout le monde...",

		"hidden": true
	  },
	  {
		"id": "noel-rider",
		"name": "Père Noël du peloton",
		"emoji": "️👻",   

		"conditions": {
		  // 💪 --- PHYSIOLOGIE ---
		  //"minFtp": 9000,
		  //"maxFtp": 0,
		  "minWeight": 150,
		  //"maxWeight": 80,
		  //"minWkg": 4.0,
		  //"maxWkg": 5.0,
		  "minAge": 60,
		  //"maxAge": 65,
		  "sexe": "M",
		  "preference": "montagne",

		  // 🧬 --- CAPACITÉS ---
		  //"minEndurance": 6,
		  //"maxEndurance": 5,
		  //"minExplosivite": 6,
		  //"maxExplosivite": 6,
		  //"minAerobie": 6,
		  //"maxAerobie": 8,
		  //"minSprint": 6,
		  //"maxSprint": 6,

		  // ⚙️ --- TECHNIQUE / CONFIANCE ---
		  //"minAero": 6,
		  //"maxAero": 7,
		  //"minTechnique": 6,
		  //"maxTechnique": 8,
		  //"minConfidence": 6,
		  //"maxConfidence": 7,

		  // 🕒 --- ENTRAÎNEMENT ---
		  //"minVolume": 20,
		  "maxVolume": 1,
		  //"minRecuperation": 6,
		  "maxRecuperation": 1,

		  // 🏊 --- TRIATHLON (optionnel) ---
		  //"triathlon": true,
		  //"triDistance": "M",
		  //"minTriTime": 90,
		  //"maxTriTime": 360
		},

		"description": "Besoin de 364j de récupération pour faire une sortie annuelle en tenue rouge sous la neige, ta préparation annuelle est ... étonnante",

		"hidden": true
	  }
	  ];

	  return Promise.resolve();
	}

	// === Données Pros ===
	window.proCyclists = [
	  {
		id: "pogacar",
		name: "Tadej Pogačar",
		emoji: "🧗‍",
		style: "grimpeur-puncheur",
		stats: { wkg: 6.2, endurance: 9, explosivite: 8, sprint: 6, aero: 7, technique: 7 }
	  },
	  {
		id: "van-aert",
		name: "Wout Van Aert",
		emoji: "⚡",
		style: "polyvalent",
		stats: { wkg: 5.8, endurance: 9, explosivite: 9, sprint: 9, aero: 8, technique: 9 }
	  },
	  {
		id: "vdp",
		name: "Mathieu van der Poel",
		emoji: "🔥",
		style: "puncheur-explosif",
		stats: { wkg: 5.5, endurance: 8, explosivite: 10, sprint: 8, aero: 7, technique: 9 }
	  },
	  {
		id: "vingegaard",
		name: "Jonas Vingegaard",
		emoji: "🏔️",
		style: "grimpeur pur",
		stats: { wkg: 6.4, endurance: 9, explosivite: 6, sprint: 4, aero: 7, technique: 6 }
	  },
	  {
		id: "evenepoel",
		name: "Remco Evenepoel",
		emoji: "⏱️",
		style: "chrono-grimpeur",
		stats: { wkg: 6.0, endurance: 8, explosivite: 8, sprint: 6, aero: 10, technique: 8 }
	  },
	  {
		id: "cavendish",
		name: "Mark Cavendish",
		emoji: "💥",
		style: "sprinteur pur",
		stats: { wkg: 4.5, endurance: 6, explosivite: 10, sprint: 10, aero: 8, technique: 8 }
	  }
	];

	/**
	 * Compare les métriques de l'utilisateur avec des pros et renvoie le plus proche
	 */
	function compareWithPros(userMetrics) {
	  if (!window.proCyclists || !Array.isArray(window.proCyclists)) {
		console.warn("⚠️ Aucune donnée pro disponible.");
		return { best: null, similarity: 0, comparisons: [] };
	  }

	  const proCyclists = window.proCyclists;

	  const user = {
		wkg: (userMetrics.physiologie && userMetrics.physiologie.wkg) || 0,
		endurance: (userMetrics.capacites && userMetrics.capacites.endurance) || 0,
		explosivite: (userMetrics.capacites && userMetrics.capacites.explosivite) || 0,
		sprint: (userMetrics.capacites && userMetrics.capacites.sprint) || 0,
		aero: (userMetrics.technique && userMetrics.technique.aero) || 0,
		technique: (userMetrics.technique && userMetrics.technique.technique) || 0,
		volume: (userMetrics.entrainement && userMetrics.entrainement.volume) || 0
	  };

	  const comparisons = proCyclists.map((pro) => {
		const stats = pro.stats;
		const details = [];
		let totalScore = 0;
		let count = 0;

		for (const key in stats) {
		  const userVal = user[key] ?? 0;
		  const proVal = stats[key] ?? 0;
		  const diff = Math.abs(userVal - proVal);
		  const similarity = Math.max(0, 1 - diff / 10); // 0 → 1 (tolérance 10 pts)
		  totalScore += similarity;
		  count++;

		  details.push({
			key,
			userVal,
			proVal,
			delta: +(userVal - proVal).toFixed(2),
			diff,
			similarity: +(similarity * 100).toFixed(1)
		  });
		}

		const globalSimilarity = +(totalScore / count * 100).toFixed(1);

		return {
		  ...pro,
		  similarity: globalSimilarity,
		  details
		};
	  });

	  // Tri décroissant par similarité
	  comparisons.sort((a, b) => b.similarity - a.similarity);

	  const best = comparisons[0] || null;
	  const similarity = best ? Math.round(best.similarity) : 0;

	  return { best, similarity, comparisons };
	}

  function onFormSubmit(event) {
	  event.preventDefault();

	  const overlay = document.getElementById("loading-overlay");
	  if (overlay) overlay.style.display = "flex"; // ✅ affiche le loader

	  try {
		if (!window.ADNAnalyzer || !window.ADNUI) {
		  console.error("Modules non chargés correctement.");
		  if (overlay) overlay.style.display = "none";
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
		  if (overlay) overlay.style.display = "none";
		  return;
		}

		const inputs = formData;
		const result = window.ADNAnalyzer.analyze(inputs, profiles);

		// ✅ Comparaison avec les pros (à partir des métriques calculées)
		const { best, similarity, comparisons } = compareWithPros(result.metrics);

		// ✅ Affichage : carte, radar comparatif (toi + pro), bloc résumé pro
		window.ADNUI.renderProfileCard(result);
		window.ADNUI.renderProComparison(best, similarity, comparisons);
		window.ADNUI.renderRadarChart(result, best, similarity);
	  } catch (err) {
		console.error("Erreur analyse :", err);
		alert("Une erreur est survenue pendant l'analyse.");
	  } finally {
		if (overlay) overlay.style.display = "none"; // ✅ cache le loader
	  }
	}

	document.addEventListener("DOMContentLoaded", function () {
	  if (window.ADNUI) {
		window.ADNUI.initThemeSelector();
		window.ADNUI.updateRangeLabels();
		window.ADNUI.toggleTriathlonFields();
		window.ADNUI.generateDynamicForm();
		window.ADNUI.initExportButtons();
		window.ADNUI.initADNWave();
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
