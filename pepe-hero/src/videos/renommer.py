from pathlib import Path

# Dossier contenant les vidéos
dossier = Path(__file__).parent

# Récupérer toutes les vidéos MP4
videos = sorted(
    [f for f in dossier.iterdir()
     if f.is_file() and f.suffix.lower() == ".mp4"]
)

# Renommer temporairement les fichiers pour éviter les conflits
temporaires = []

for i, video in enumerate(videos):
    temp = dossier / f"__temp_rename_{i}__.mp4"
    video.rename(temp)
    temporaires.append(temp)

# Renommer de 0.mp4 jusqu'au nombre total de vidéos - 1
for i, temp in enumerate(temporaires):
    nouveau_nom = dossier / f"{i}.mp4"
    temp.rename(nouveau_nom)
    print(f"{temp.name} -> {nouveau_nom.name}")

print(f"\nTerminé ! {len(videos)} vidéos renommées.")
