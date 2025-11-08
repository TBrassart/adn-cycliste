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
		  id: "grimpeur",
		  name: "Grimpeur",
		  emoji: "🧗",
		  conditions: { minWkg: 4, minEndurance: 6, preference: "montagne" },
		  description: "Tu es léger et constant, les pentes te sourient."
		},
		{
		  id: "diesel",
		  name: "Rouleur diesel",
		  emoji: "🚂",
		  conditions: { minEndurance: 8, maxExplosivite: 6, minVolume: 8 },
		  description: "Tu carbures à la régularité et à la puissance longue."
		},
		{
		  id: "sprinteur",
		  name: "Sprinteur explosif",
		  emoji: "💥",
		  conditions: { minSprint: 8, minExplosivite: 8, maxEndurance: 6 },
		  description: "Tu brilles dans les 200 derniers mètres, puissance pure !"
		},
		{
		  id: "puncheur",
		  name: "Puncheur",
		  emoji: "⚡",
		  conditions: { minExplosivite: 7, minEndurance: 5, minWkg: 3.2 },
		  description: "Tu adores les côtes courtes où tu peux faire parler ton punch."
		},
		{
		  id: "chrono",
		  name: "Rider chrono",
		  emoji: "⏱️",
		  conditions: { minAero: 7, minEndurance: 6, preference: "plat" },
		  description: "Tu files droit, tête baissée, comme une lame dans le vent."
		},
		{
		  id: "grimpeur-puncheur",
		  name: "Grimpeur-puncheur",
		  emoji: "🧗‍♀️⚡",
		  conditions: { minWkg: 4, minExplosivite: 7, preference: "montagne" },
		  description: "Tu voles dans les cols mais attaques sur les rampes raides."
		},
		{
		  id: "endurant",
		  name: "Endurant infatigable",
		  emoji: "🕰️",
		  conditions: { minVolume: 10, minRecuperation: 7, minEndurance: 8 },
		  description: "Tu es une machine à rouler, tu ne t’arrêtes jamais."
		},

		// === TECHNIQUES / DISCIPLINES ===
		{
		  id: "triathlete",
		  name: "Triathlète endurant",
		  emoji: "🏊🚴🏃",
		  conditions: { triathlon: true, minAerobie: 7, minVolume: 6, minAero: 7 },
		  description: "Endurant, régulier et concentré : tu domines la durée."
		},
		{
		  id: "descendeur",
		  name: "Descendeur technique",
		  emoji: "🚵",
		  conditions: { minConfidence: 8, minTechnique: 7 },
		  description: "Tu es à l’aise dans les virages, la gravité est ton alliée."
		},
		{
		  id: "gravel",
		  name: "Aventurier gravel",
		  emoji: "🪨",
		  conditions: { minEndurance: 7, minConfidence: 6, minVolume: 5, minTechnique: 6 },
		  description: "Tu cherches les chemins perdus, le bitume te fatigue."
		},
		{
		  id: "cx",
		  name: "Cyclocross Wizard",
		  emoji: "🌀",
		  conditions: { minTechnique: 7, minExplosivite: 6, minConfidence: 6 },
		  description: "Tu passes partout, dans la boue comme sur l’asphalte."
		},
		{
		  id: "aero-freak",
		  name: "Aero Freak",
		  emoji: "💨",
		  conditions: { minAero: 9, minTechnique: 5 },
		  description: "Tu t’intéresses plus à ton CdA qu’à ton FTP."
		},
		{
		  id: "rouleur",
		  name: "Rouleur",
		  emoji: "🚴",
		  conditions: { minAero: 7, minEndurance: 7, preference: "plat" },
		  description: "Tu maîtrises les longues lignes droites et les relais à fond."
		},
		{
		  id: "grimpeur-diesel",
		  name: "Diesel des montagnes",
		  emoji: "🏔️🚂",
		  conditions: { minWkg: 4, minEndurance: 8, minVolume: 7 },
		  description: "Tu montes sans éclat, mais personne ne t’arrête."
		},

		// === MENTAUX / COMPORTEMENT ===
		{
		  id: "strategiste",
		  name: "Stratège du peloton",
		  emoji: "🧠",
		  conditions: { minEndurance: 6, minExplosivite: 5, minAerobie: 6 },
		  description: "Tu lis la course, tu attaques au bon moment. Rien n’est laissé au hasard."
		},
		{
		  id: "minimaliste",
		  name: "Minimaliste zen",
		  emoji: "🧘",
		  conditions: { maxVolume: 5, minEndurance: 6, preference: "plat" },
		  description: "Tu roules pour le plaisir, pas pour le FTP."
		},
		{
		  id: "mental-warrior",
		  name: "Guerrier mental",
		  emoji: "🔥",
		  conditions: { minEndurance: 6, minRecuperation: 7, minConfidence: 6 },
		  description: "Tu n’abandonnes jamais, même dans la souffrance."
		},
		{
		  id: "ultra",
		  name: "Ultra cycliste",
		  emoji: "🗺️",
		  conditions: { minVolume: 12, minEndurance: 9, minRecuperation: 8 },
		  description: "Tu roules pour traverser des pays, pas des segments Strava."
		},
		{
		  id: "urbain",
		  name: "Rider urbain",
		  emoji: "🚦",
		  conditions: { minExplosivite: 5, minConfidence: 5, minTechnique: 5 },
		  description: "Tu traces entre les voitures comme un ninja sur deux roues."
		},
		{
		  id: "nocturne",
		  name: "Rider nocturne",
		  emoji: "🌙",
		  conditions: { minConfidence: 5, minEndurance: 5 },
		  description: "Tu aimes la route calme et les sorties après le coucher du soleil."
		},

		// === FUN & EASTER EGGS ===
		{
		  id: "licorne-cols",
		  name: "Licorne des cols",
		  emoji: "🦄",
		  hidden: true,
		  conditions: { minWkg: 4.6, minExplosivite: 9, minEndurance: 8 },
		  description: "Tu brilles plus fort que ton capteur de puissance ✨."
		},
		{
		  id: "caffeine-rider",
		  name: "Caféinisé permanent",
		  emoji: "☕",
		  hidden: true,
		  conditions: { minVolume: 3, minExplosivite: 3, minEndurance: 3 },
		  description: "Tu ne pédales pas, tu vibres. Probablement trop de café."
		},
		{
		  id: "zwift-warrior",
		  name: "Zwift Warrior",
		  emoji: "🖥️🚴",
		  hidden: true,
		  conditions: { minAero: 6, minVolume: 30, preference: "home trainer" },
		  description: "Tu connais plus Watopia que ta propre région."
		},
		{
		  id: "gravel-poet",
		  name: "Poète du gravel",
		  emoji: "📜🚴",
		  hidden: true,
		  conditions: { minEndurance: 6, minVolume: 5, minConfidence: 7 },
		  description: "Tu postes des haïkus après chaque sortie poussiéreuse."
		},
		{
		  id: "chrono-nerd",
		  name: "Chrono Nerd",
		  emoji: "⌚",
		  hidden: true,
		  conditions: { minAero: 8, minTechnique: 5, minEndurance: 6 },
		  description: "Tu passes plus de temps sur TrainingPeaks que sur la selle."
		},
		{
		  id: "team-bidons",
		  name: "Membre de l'équipe bidons",
		  emoji: "🍼",
		  hidden: true,
		  conditions: { maxEndurance: 5, maxExplosivite: 4, minVolume: 2 },
		  description: "Tu es là pour l'ambiance. Et c’est déjà énorme ❤️."
		},
		{
		  id: "capteur-ko",
		  name: "Capteur KO",
		  emoji: "⚙️",
		  hidden: true,
		  conditions: { maxFtp: 0 },
		  description: "Ton capteur a explosé. Trop de watts sans contrôle."
		},
		{
		  id: "lanterne-rouge",
		  name: "Lanterne rouge",
		  emoji: "🚦",
		  hidden: true,
		  conditions: { maxEndurance: 3, maxExplosivite: 3 },
		  description: "Tu finis toujours, même si c’est dernier. Respect éternel."
		},
		{
		  id: "ftp-over9000",
		  name: "FTP Over 9000",
		  emoji: "🔥🤖",
		  hidden: true,
		  conditions: { minFtp: 9000 },
		  description: "Impossible. Tu es un dieu du watt. Les capteurs fondent à ton approche."
		},
		{
		  id: "ghost-rider",
		  name: "Coureur fantôme",
		  emoji: "👻",
		  hidden: true,
		  conditions: { minWkg: 4, volume: 0 },
		  description: "Tu ne t’entraînes jamais, mais tu voles. Mystère."
		},
		{
		  id: "velo-poilu",
		  name: "Vélo poilu",
		  emoji: "🦍",
		  hidden: true,
		  conditions: { minExplosivite: 7, minSprint: 7, minConfidence: 7 },
		  description: "T’es un monstre. Et probablement torse nu sous 5°C."
		},
		{
		  id: "noel-rider",
		  name: "Père Noël du peloton",
		  emoji: "🎅🚴",
		  hidden: true,
		  conditions: { minEndurance: 5, preference: "montagne" },
		  description: "Tu roules même sous la neige, costume rouge en prime."
		}
	  ];

	  console.log("Profils chargés :", profiles);
	  return Promise.resolve();
	}

	// === Base de données des pros (simplifiée) ===
	const proCyclists = [
	  {
		id: "pogacar",
		name: "Tadej Pogačar",
		emoji: "🧗‍",
		style: "grimpeur-puncheur",
		stats: {
		  wkg: 6.2,
		  endurance: 9,
		  explosivite: 8,
		  sprint: 6,
		  aero: 7,
		  technique: 7
		}
	  },
	  {
		id: "van-aert",
		name: "Wout Van Aert",
		emoji: "⚡",
		style: "polyvalent",
		stats: {
		  wkg: 5.8,
		  endurance: 9,
		  explosivite: 9,
		  sprint: 9,
		  aero: 8,
		  technique: 9
		}
	  },
	  {
		id: "vdp",
		name: "Mathieu van der Poel",
		emoji: "🔥",
		style: "puncheur-explosif",
		stats: {
		  wkg: 5.5,
		  endurance: 8,
		  explosivite: 10,
		  sprint: 8,
		  aero: 7,
		  technique: 9
		}
	  },
	  {
		id: "vingegaard",
		name: "Jonas Vingegaard",
		emoji: "🏔️",
		style: "grimpeur pur",
		stats: {
		  wkg: 6.4,
		  endurance: 9,
		  explosivite: 6,
		  sprint: 4,
		  aero: 7,
		  technique: 6
		}
	  },
	  {
		id: "evenepoel",
		name: "Remco Evenepoel",
		emoji: "⏱️",
		style: "chrono-grimpeur",
		stats: {
		  wkg: 6.0,
		  endurance: 8,
		  explosivite: 8,
		  sprint: 6,
		  aero: 9,
		  technique: 8
		}
	  },
	  {
		id: "cavendish",
		name: "Mark Cavendish",
		emoji: "💥",
		style: "sprinteur pur",
		stats: {
		  wkg: 4.5,
		  endurance: 6,
		  explosivite: 10,
		  sprint: 10,
		  aero: 8,
		  technique: 8
		}
	  }
	];

	/**
	 * Compare les métriques de l'utilisateur avec des pros et renvoie le plus proche
	 */
	function compareWithPros(userMetrics) {
	  const user = {
		wkg: userMetrics.physiologie?.wkg || 0,
		endurance: userMetrics.capacites?.endurance || 0,
		explosivite: userMetrics.capacites?.explosivite || 0,
		sprint: userMetrics.capacites?.sprint || 0,
		aero: userMetrics.technique?.aero || 0,
		technique: userMetrics.technique?.technique || 0
	  };

	  let best = null;
	  let bestScore = 0;

	  proCyclists.forEach((pro) => {
		const stats = pro.stats;
		let diff = 0;
		let count = 0;

		for (const key in stats) {
		  const userVal = user[key];
		  const proVal = stats[key];
		  if (userVal > 0) {
			diff += Math.abs(userVal - proVal);
			count++;
		  }
		}

		const avgDiff = diff / count;
		const similarity = Math.max(0, 100 - avgDiff * 10); // 10 pts de diff = -100%
		if (similarity > bestScore) {
		  bestScore = similarity;
		  best = pro;
		}
	  });

	  return { best, similarity: Math.round(bestScore) };
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

	// ✅ Comparaison avec les pros (à partir des métriques calculées)
	const { best, similarity } = compareWithPros(result.metrics);

	// ✅ Affichage : carte, radar comparatif (toi + pro), bloc résumé pro
	window.ADNUI.renderProfileCard(result);
	window.ADNUI.renderRadarChart(result, best, similarity);
	window.ADNUI.renderProComparison(best, similarity);

  }

	document.addEventListener("DOMContentLoaded", function () {
	  if (window.ADNUI) {
		window.ADNUI.initThemeSelector();
		window.ADNUI.updateRangeLabels();
		window.ADNUI.toggleTriathlonFields();
		window.ADNUI.generateDynamicForm();
		window.ADNUI.initExportButtons();
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
