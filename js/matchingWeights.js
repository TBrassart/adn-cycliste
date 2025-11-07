// js/matchingWeights.js
(function (window) {
  "use strict";

  const matchingWeights = {
    // Pondérations globales par dimension
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

    labels: {
      wkg: "W/kg",
      endurance: "Endurance",
      explosivite: "Explosivité",
      aerobie: "Aérobie",
      sprint: "Sprint",
      aero: "Aérodynamisme",
      technique: "Technique",
      confidence: "Confiance sur le vélo",
      volume: "Volume (h/sem)",
      age: "Âge",
      triathlon: "Triathlon"
    },

    computeWeightedScore(metrics, conditions) {
      let total = 0;
      const breakdown = {};
      const details = [];

      const flat = {
        ...metrics.physiologie,
        ...metrics.capacites,
        ...metrics.technique,
        ...metrics.entrainement
      };

      const getWeight = (key) => this.weights[key] || 0.05;
      const getLabel = (baseKey) => this.labels[baseKey] || baseKey;

      Object.entries(conditions).forEach(([condKey, expected]) => {
        let matched = false;
        let weightAdd = 0;
        let baseKey = condKey;
        let actual = undefined;

        // minXxx
        if (condKey.startsWith("min")) {
          baseKey = condKey.slice(3); // Endurance -> endurance
          baseKey = baseKey.charAt(0).toLowerCase() + baseKey.slice(1);
          actual = flat[baseKey];
          if (actual !== undefined && actual >= expected) {
            matched = true;
            weightAdd = getWeight(baseKey);
          }
        }
        // maxXxx
        else if (condKey.startsWith("max")) {
          baseKey = condKey.slice(3);
          baseKey = baseKey.charAt(0).toLowerCase() + baseKey.slice(1);
          actual = flat[baseKey];
          if (actual !== undefined && actual <= expected) {
            matched = true;
            weightAdd = getWeight(baseKey) * 0.5;
          }
        }
        // âge min / max explicites
        else if (condKey === "ageMin") {
          baseKey = "age";
          actual = flat.age;
          if (actual !== undefined && actual >= expected) {
            matched = true;
            weightAdd = getWeight("age");
          }
        } else if (condKey === "ageMax") {
          baseKey = "age";
          actual = flat.age;
          if (actual !== undefined && actual <= expected) {
            matched = true;
            weightAdd = getWeight("age");
          }
        }
        // booléen exact (ex: triathlon)
        else if (typeof expected === "boolean") {
          baseKey = condKey;
          actual = flat[baseKey];
          if (actual === expected) {
            matched = true;
            weightAdd = getWeight(baseKey);
          }
        }
        // string exact (ex: sexe, etc.)
        else if (typeof expected === "string") {
          baseKey = condKey;
          actual = flat[baseKey];
          if (actual !== undefined && String(actual) === expected) {
            matched = true;
            weightAdd = getWeight(baseKey);
          }
        }

        // Appliquer si match
        if (matched && weightAdd > 0) {
          total += weightAdd;
          breakdown[baseKey] = (breakdown[baseKey] || 0) + weightAdd;
        }

        // Enregistrer le détail (même si non matché)
        details.push({
          key: condKey,
          baseKey,
          label: getLabel(baseKey),
          expected,
          actual: actual !== undefined ? actual : null,
          matched,
          weight: +weightAdd.toFixed(3)
        });
      });

      return { total, breakdown, details };
    }
  };

  window.matchingWeights = matchingWeights;
})(window);
