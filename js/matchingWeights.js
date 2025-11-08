// js/matchingWeights.js
(function (window) {
  "use strict";

  const weights = {
    // physiologie / core
    wkg: 0.20,
    ftp: 0.05,
    weight: 0.02,
    age: 0.03,
    // capacités
    endurance: 0.15,
    explosivite: 0.10,
    aerobie: 0.08,
    sprint: 0.08,
    // technique / confiance
    aero: 0.06,
    technique: 0.05,
    confidence: 0.05,
    // entrainement
    volume: 0.06,
    recuperation: 0.04,
    // spécifiques
    triathlon: 0.03,
    preference: 0.02,
    triDistance: 0.02,
    triTime: 0.02
  };

  function getWeight(baseKey) {
    return weights[baseKey] || 0.03;
  }

  function fuzzyMin(actual, target) {
	  if (actual == null || target == null) return 0;

	  // Si on est au-dessus ou égal → parfait
	  if (actual >= target) return 1;

	  // Tolérance : entre 90% et 100% de la cible → score progressif
	  const soft = target * 0.9;
	  if (actual >= soft) {
		return actual / target; // ex: 3.7 vs 4.0 → 0.925
	  }

	  // En dessous de 90% → on considère que ça ne matche pas
	  return 0;
	}

	function fuzzyMax(actual, target) {
	  if (actual == null || target == null) return 0;

	  // Si on est en-dessous ou égal → parfait
	  if (actual <= target) return 1;

	  // Tolérance : jusqu'à +10% de la limite → score progressif
	  const soft = target * 1.1;
	  if (actual <= soft) {
		return target / actual; // ex: max 80, actual 84 → ok-ish
	  }

	  // Au-dessus de +10% → trop loin
	  return 0;
	}

  const matchingWeights = {
    computeWeightedScore(metrics, conditions) {
      const flat = {
        // physiologie
        ftp: metrics.physiologie?.ftp,
        weight: metrics.physiologie?.weight,
        wkg: metrics.physiologie?.wkg,
        age: metrics.physiologie?.age,
        sexe: metrics.physiologie?.sexe,
        preference: metrics.physiologie?.preference,
        // capacités
        endurance: metrics.capacites?.endurance,
        explosivite: metrics.capacites?.explosivite,
        aerobie: metrics.capacites?.aerobie,
        sprint: metrics.capacites?.sprint,
        // technique
        aero: metrics.technique?.aero,
        technique: metrics.technique?.technique,
        confidence: metrics.technique?.confidence,
        // entrainement
        volume: metrics.entrainement?.volume,
        recuperation: metrics.entrainement?.recuperation,
        // triathlon (adapte si ta structure diffère)
        triathlon: metrics.triathlon?.isTriathlete ?? metrics.triathlon ?? false,
        triDistance: metrics.triathlon?.distance,
        triTime: metrics.triathlon?.time
      };

      let totalWeighted = 0;
      let totalWeightsUsed = 0;
      const breakdown = {};
      const details = [];

      for (const [condKey, expected] of Object.entries(conditions || {})) {
        let baseKey = condKey.replace(/^(min|max)/, "");
        baseKey = baseKey.charAt(0).toLowerCase() + baseKey.slice(1);

        const actual = flat[baseKey];
        const w = getWeight(baseKey);
        if (!w) continue;

        let partial = 0;
        let matched = false;

        if (condKey.startsWith("min")) {
          partial = fuzzyMin(actual, expected);
          matched = actual != null && actual >= expected;
        } else if (condKey.startsWith("max")) {
          partial = fuzzyMax(actual, expected);
          matched = actual != null && actual <= expected;
        } else if (typeof expected === "boolean") {
          partial = actual === expected ? 1 : 0;
          matched = actual === expected;
        } else if (typeof expected === "string") {
          partial = actual === expected ? 1 : 0;
          matched = actual === expected;
        } else {
          // fallback exact / proximité
          if (actual != null) {
            partial = actual === expected ? 1 : Math.max(0, 1 - Math.abs(actual - expected) / expected);
            matched = actual === expected;
          }
        }

        const weighted = partial * w;
        totalWeighted += weighted;
        totalWeightsUsed += w;

        breakdown[baseKey] = (breakdown[baseKey] || 0) + weighted;

        details.push({
          key: condKey,
          baseKey,
          expected,
          actual,
          matched,
          partial: Math.round(partial * 100),
          weight: w
        });
      }

      if (totalWeightsUsed === 0) {
        return { total: 0, breakdown, details };
      }

      // Score entre 0 et 1, normalisé par les poids réellement utilisés pour CE profil
      const total = +(totalWeighted / totalWeightsUsed).toFixed(4);

      return { total, breakdown, details };
    }
  };

  window.matchingWeights = matchingWeights;
})(window);
