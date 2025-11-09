async function loadJSON(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Erreur ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error(`❌ Impossible de charger ${path}:`, err);
    return [];
  }
}

export async function loadProfiles() {
  return await loadJSON("data/profiles.jsonc");
}

export async function loadPros() {
  return await loadJSON("data/pros.jsonc");
}

