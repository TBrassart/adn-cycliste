// js/analyzer.js
(function (window) {
  "use strict";

  const ADNAnalyzer = {
    /**
     * Calcule les métriques de base.
     */
    computeMetrics(inputs) {
	  const schema = window.metricsSchema;
	  const metrics = {
		physiologie: {},
		capacites: {},
		technique: {},
		entrainement: {}
	  };

	  // 1️⃣ Parsing automatique des champs selon le schéma
	  Object.keys(schema).forEach(category => {
		Object.entries(schema[category]).forEach(([key, meta]) => {
		  let raw = inputs[key];
		  if (raw === undefined) return;

		  switch (meta.type) {
			case "number":
			case "range":
			  metrics[category][key] = Number(raw);
			  break;
			case "boolean":
			  metrics[category][key] = Boolean(raw);
			  break;
			case "select":
			  metrics[category][key] = String(raw);
			  break;
			default:
			  metrics[category][key] = raw;
		  }
		});
	  });

	  // 2️⃣ Calculs dérivés principaux
	  const ftp = metrics.physiologie.ftp || 0;
	  const weight = metrics.physiologie.weight || 0;
	  metrics.physiologie.wkg = weight > 0 ? +(ftp / weight).toFixed(2) : 0;

	  // 3️⃣ Score global pondéré
	  const endurance = metrics.capacites.endurance || 0;
	  const explosivite = metrics.capacites.explosivite || 0;
	  const aerobie = metrics.capacites.aerobie || 0;
	  const sprint = metrics.capacites.sprint || 0;
	  const recuperation = metrics.capacites.recuperation || 0;
	  const volume = metrics.entrainement.volume || 0;

	  // pondérations globales
	  const weights = {
		wkg: 0.3,
		endurance: 0.2,
		explosivite: 0.15,
		aerobie: 0.1,
		sprint: 0.1,
		recuperation: 0.05,
		volume: 0.1
	  };

	  const wkgScore = Math.min(metrics.physiologie.wkg / 5.5, 1);
	  const globalScore =
		(wkgScore * weights.wkg) +
		(endurance / 10) * weights.endurance +
		(explosivite / 10) * weights.explosivite +
		(aerobie / 10) * weights.aerobie +
		(sprint / 10) * weights.sprint +
		(recuperation / 10) * weights.recuperation +
		(Math.min(volume / 20, 1) * weights.volume);

	  metrics.globalScore = +(globalScore * 100).toFixed(0);

	  // 4️⃣ Gestion du triathlon
	  const tri = metrics.entrainement.triathlon;
	  if (tri) {
		const distance = metrics.entrainement.triDistance || "M";
		const distanceFactor = { S: 0.7, M: 0.8, L: 0.9, XL: 1.0 }[distance] || 0.8;
		metrics.entrainement.triScore = +(distanceFactor * (endurance / 10)).toFixed(2);
	  }

	  // 5️⃣ Retour complet
	  return metrics;
	},

    /**
     * Trouve le meilleur profil à partir des règles JSON.
     * profiles: tableau chargé depuis profiles.json
     */
	findProfile(metrics, profiles) {
	  if (!profiles || !profiles.length || !window.matchingWeights) {
		return [];
	  }

	  const results = profiles.map((profile) => {
		const cond = profile.conditions || {};
		const { total, breakdown, details } =
		  window.matchingWeights.computeWeightedScore(metrics, cond);

		return {
		  id: profile.id,
		  name: profile.name,
		  emoji: profile.emoji,
		  description: profile.description,
		  hidden: !!profile.hidden,
		  total,          // 0 → 1
		  breakdown,
		  details
		};
	  });

	// Trier par score décroissant
	results.sort((a, b) => b.total - a.total);

	// Pourcentage absolu (0–100)
	results.forEach((r) => {
	  r.percent = +(r.total * 100).toFixed(1);
	});

	// Séparer les profils visibles et easter eggs
	const standardProfiles = results.filter((r) => !r.hidden);
	const hiddenProfiles = results.filter((r) => r.hidden && r.percent >= 95);

	// Limiter à top 5 standards
	const topProfiles = standardProfiles.slice(0, 5);

	// ✅ Fusion finale : d'abord les top 5, puis les secrets débloqués
	return [...topProfiles, ...hiddenProfiles];

	},

    /**
     * Analyse complète : metrics + profil + phrase personnalisée.
     */
	analyze(inputs, profiles) {
	  const metrics = this.computeMetrics(inputs);
	  const matches = this.findProfile(metrics, profiles) || [];

	  // Si aucun profil trouvé, on crée un fallback neutre
	  const main = matches.length > 0 ? matches[0] : {
		id: "polyvalent",
		name: "Polyvalent",
		emoji: "🚴‍",
		description: "Profil équilibré : continue à t’entraîner pour affiner ton ADN cycliste.",
		percent: 0
	  };

	  const profile = {
		id: main.id,
		name: main.name,
		emoji: main.emoji,
		description: main.description,
		percent: main.percent
	  };

	  return {
		metrics,
		profile,
		matches
	  };
	}
}

  window.ADNAnalyzer = ADNAnalyzer;
})(window);
