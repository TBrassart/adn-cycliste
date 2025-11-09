// js/main.js
"use strict";

import { loadProfiles, loadPros } from "./dataLoader.js";

let profiles = [];
let proCyclists = [];

document.addEventListener("DOMContentLoaded", async () => {
  if (window.ADNUI) {
	window.ADNUI.initThemeSelector();
	window.ADNUI.generateDynamicForm();
	window.ADNUI.initCustomProfiles && window.ADNUI.initCustomProfiles();
	window.ADNUI.initADNWave();
  }

  // Charger les données
  profiles = await loadProfiles();
  proCyclists = await loadPros();

  console.log("✅ Profils chargés :", profiles.length);
  console.log("✅ Pros chargés :", proCyclists.length);

  // Activer l'analyse une fois les données disponibles
  const form = document.getElementById("cyclist-form");
  if (form) form.addEventListener("submit", onFormSubmit);
});														

/**
 * Compare les métriques de l'utilisateur avec des pros et renvoie le plus proche
 */
function compareWithPros(userMetrics) {
  // ✅ Récupère les pros depuis le module ou le global
  const pros =
	(typeof proCyclists !== "undefined" && Array.isArray(proCyclists))
	  ? proCyclists
	  : (window.proCyclists && Array.isArray(window.proCyclists))
		? window.proCyclists
		: [];

  if (!pros.length) {
	console.warn("⚠️ Aucune donnée pro disponible.");
	return { best: null, similarity: 0, comparisons: [] };
  }

  // === Profil utilisateur synthétisé ===
  const user = {
	wkg: userMetrics?.physiologie?.wkg || 0,
	endurance: userMetrics?.capacites?.endurance || 0,
	explosivite: userMetrics?.capacites?.explosivite || 0,
	sprint: userMetrics?.capacites?.sprint || 0,
	aero: userMetrics?.technique?.aero || 0,
	technique: userMetrics?.technique?.technique || 0,
	volume: userMetrics?.entrainement?.volume || 0
  };

  // === Comparaison avec chaque pro ===
  const comparisons = pros.map((pro) => {
	const stats = pro.stats || {};
	const details = [];
	let totalScore = 0;
	let count = 0;

	for (const key in stats) {
	  const userVal = user[key] ?? 0;
	  const proVal = stats[key] ?? 0;
	  const diff = Math.abs(userVal - proVal);
	  const similarity = Math.max(0, 1 - diff / 10); // échelle 0 → 1
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

	const globalSimilarity = count ? +(totalScore / count * 100).toFixed(1) : 0;

	return {
	  ...pro,
	  similarity: globalSimilarity,
	  details
	};
  });

  // === Tri décroissant ===
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


