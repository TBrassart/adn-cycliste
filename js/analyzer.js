// js/analyzer.js
(function (window) {
  "use strict";

  const ADNAnalyzer = {
    /**
     * Calcule les métriques de base.
     */
    computeMetrics(inputs) {
	  const ftp = Number(inputs.ftp);
	  const weight = Number(inputs.weight);
	  const endurance = Number(inputs.endurance);
	  const explosivity = Number(inputs.explosivity);
	  const isTriathlete = !!inputs.isTriathlete;
	  const triDistance = inputs.triDistance || null;
	  const triTime = inputs.triTime || null;

	  const wkg = weight > 0 ? +(ftp / weight).toFixed(2) : 0;
	  const wkgScore = Math.min(wkg / 5.5, 1);
	  const skillsScore = ((endurance + explosivity) / 20);
	  const globalScore = +((wkgScore * 0.6 + skillsScore * 0.4) * 100).toFixed(0);

	  // Triathlon scoring optionnel
	  let triScore = 0;
	  if (isTriathlete && triDistance) {
		// pondération basique selon distance + performance relative
		const distanceFactor = { sprint: 0.7, M: 0.8, L: 0.9, XL: 1.0 }[triDistance] || 0.8;
		let timeValue = 0;
		if (triTime) {
		  const minutes = triTime.includes(":")
			? parseInt(triTime.split(":")[0]) * 60 + parseInt(triTime.split(":")[1])
			: Number(triTime);
		  // score inverse : moins de temps = meilleur score
		  timeValue = Math.max(0, Math.min(1, 300 / minutes)); // 300 min = référence Ironman ~5h
		}
		triScore = +(distanceFactor * timeValue).toFixed(2);
	  }

	  return {
		ftp,
		weight,
		endurance,
		explosivity,
		preference: inputs.preference,
		wkg,
		globalScore,
		isTriathlete,
		triDistance,
		triTime,
		triScore
	  };
	},


    /**
     * Trouve le meilleur profil à partir des règles JSON.
     * profiles: tableau chargé depuis profiles.json
     */
    findProfile(metrics, profiles) {
	  if (!profiles || !profiles.length) return null;

	  const weights = {
		wkg: 0.35,
		endurance: 0.25,
		explosivity: 0.20,
		preference: 0.10,
		triathlon: 0.10
	  };

	  let best = null;
	  let bestScore = -1;

	  profiles.forEach(profile => {
		const c = profile.conditions || {};
		let score = 0;

		if (c.minWkg && metrics.wkg >= c.minWkg) score += weights.wkg;
		if (c.maxWkg && metrics.wkg <= c.maxWkg) score += weights.wkg * 0.5;
		if (c.minEndurance && metrics.endurance >= c.minEndurance) score += weights.endurance;
		if (c.minExplosivity && metrics.explosivity >= c.minExplosivity) score += weights.explosivity;
		if (c.preference && metrics.preference === c.preference) score += weights.preference;
		if (metrics.isTriathlete && c.triathlete) score += weights.triathlon;

		if (score > bestScore) {
		  bestScore = score;
		  best = profile;
		}
	  }); 

	  return best;
	},

    /**
     * Analyse complète : metrics + profil + phrase personnalisée.
     */
    analyze(inputs, profiles) {
      const metrics = this.computeMetrics(inputs);
      const matchedProfile = this.findProfile(metrics, profiles);

      const baseDesc = matchedProfile
        ? matchedProfile.description
        : "Tu as un profil polyvalent : tu peux encore spécialiser ton entraînement.";
      const emoji = matchedProfile && matchedProfile.emoji ? matchedProfile.emoji : "🚴‍♂️";
      const label = matchedProfile ? matchedProfile.name : "Polyvalent";

      const extra =
        metrics.wkg >= 4.2
          ? " Ton rapport W/kg est solide, tu as un vrai potentiel en montagne."
          : metrics.wkg < 3
          ? " En travaillant la puissance et l’endurance, tu peux débloquer un gros marge de progression."
          : " Tu disposes d’une base intéressante, à affiner selon tes objectifs.";

      return {
        metrics,
        profile: {
          id: matchedProfile ? matchedProfile.id : "polyvalent",
          name: label,
          emoji,
          description: baseDesc + extra
        }
      };
    }
  };

  window.ADNAnalyzer = ADNAnalyzer;
})(window);
