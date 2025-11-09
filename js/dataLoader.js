async function loadJSON(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Erreur ${response.status}`);
    let text = await response.text();

    // ✅ Supprime les commentaires avant JSON.parse
    text = text
      .replace(/\/\/.*$/gm, "") // lignes commençant par //
      .replace(/\/\*[\s\S]*?\*\//g, ""); // blocs /* ... */

    return JSON.parse(text);
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
