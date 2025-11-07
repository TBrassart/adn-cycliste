// js/metricsSchema.js
(function (window) {
  "use strict";

  const metricsSchema = {
    physiologie: {
      ftp: { type: "number", range: [100, 450], label: "FTP (Watts)" },
      weight: { type: "number", range: [40, 120], label: "Poids (kg)" },
      age: { type: "number", range: [15, 80], label: "Âge" },
      sexe: { type: "select", options: ["M", "F"], label: "Sexe" }
    },

    capacites: {
      endurance: { type: "range", range: [1, 10], label: "Endurance" },
      aerobie: { type: "range", range: [1, 10], label: "Aérobie" },
      recuperation: { type: "range", range: [1, 10], label: "Récupération" },
      explosivite: { type: "range", range: [1, 10], label: "Explosivité" },
      sprint: { type: "range", range: [1, 10], label: "Sprint" }
    },

    technique: {
      aero: { type: "range", range: [1, 10], label: "Aérodynamisme" },
      technique: { type: "range", range: [1, 10], label: "Technique de pilotage" },
      confidence: { type: "range", range: [1, 10], label: "Confiance sur le vélo" }
    },

    entrainement: {
      volume: { type: "number", range: [0, 30], label: "Volume d'entraînement (h/semaine)" },
      triathlon: { type: "boolean", label: "Je pratique le triathlon" },
      triDistance: {
        type: "select",
        options: ["S", "M", "L", "XL"],
        label: "Distance triathlon",
        dependsOn: "triathlon"
      }
    }
  };

  window.metricsSchema = metricsSchema;
})(window);
