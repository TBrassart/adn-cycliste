(function (window) {
  "use strict";

  const matchingWeights = {
    weights: {
      wkg: 0.2,
      endurance: 0.15,
      explosivite: 0.1,
      aerobie: 0.1,
      sprint: 0.1,
      aero: 0.1,
      technique: 0.05,
      confidence: 0.05,
      volume: 0.05,
      age: 0.05,
      triathlon: 0.05
    },

    /**
     * Matching flou et pondéré
     */
    computeWeightedScore(metrics, conditions) {
      const flat = {
        ...metrics.physiologie,
        ...metrics.capacites,
        ...metrics.technique,
        ...metrics.entrainement
      };

      let total = 0;
      let breakdown = {};
      let details = [];

      const getWeight = (key) => this.weights[key] || 0.05;

      const fuzzyScore = (actual, target, type = "min") => {
        if (actual === undefined || target === undefined) return 0;
        const diff = actual - target;
        if (type === "min") {
          return diff <= 0 ? Math.max(0, 1 + diff / target) : 1;
        } else {
          return diff >= 0 ? Math.max(0, 1 - diff / target) : 1;
        }
      };

      for (const [condKey, expected] of Object.entries(conditions)) {
        let baseKey = condKey.replace(/^(min|max)/, "").toLowerCase();
        const weight = getWeight(baseKey);
        const actual = flat[baseKey];
        let matched = false;
        let partialScore = 0;

        if (condKey.startsWith("min")) {
          partialScore = fuzzyScore(actual, expected, "min");
          matched = actual >= expected;
        } else if (condKey.startsWith("max")) {
          partialScore = fuzzyScore(actual, expected, "max");
          matched = actual <= expected;
        } else if (typeof expected === "boolean") {
          partialScore = actual === expected ? 1 : 0;
          matched = actual === expected;
        } else if (typeof expected === "string") {
          partialScore = actual === expected ? 1 : 0;
          matched = actual === expected;
        }

        const weighted = partialScore * weight;
        total += weighted;
        breakdown[baseKey] = (breakdown[baseKey] || 0) + weighted;

        details.push({
          key: condKey,
          baseKey,
          expected,
          actual,
          matched,
          partial: +(partialScore * 100).toFixed(0),
          weight
        });
      }

      // ⚙️ normalisation : sur total des poids définis
      const totalWeights = Object.values(this.weights).reduce((a, b) => a + b, 0);
      const normalized = +(total / totalWeights).toFixed(3);

      return { total: normalized, breakdown, details };
    }
  };

  window.matchingWeights = matchingWeights;
})(window);
