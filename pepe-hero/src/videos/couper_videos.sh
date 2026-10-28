#!/bin/bash

set -e

command -v ffmpeg >/dev/null 2>&1 || {
    echo "Installe FFmpeg avec : brew install ffmpeg"
    exit 1
}

for fichier in [0-9]*.mp4; do
    [[ -f "$fichier" && "$fichier" =~ ^[0-9]+\.mp4$ ]] || continue

    duree=$(ffprobe -v error \
        -show_entries format=duration \
        -of default=noprint_wrappers=1:nokey=1 "$fichier")

    if awk -v d="$duree" 'BEGIN {exit !(d > 30)}'; then
        temporaire="${fichier%.mp4}_temp.mp4"

        echo "✂️ Découpage de $fichier..."

        if ffmpeg -hide_banner -loglevel error -y \
            -i "$fichier" -t 30 \
            -c:v libx264 -c:a aac "$temporaire"; then
            mv "$temporaire" "$fichier"
            echo "✅ $fichier : coupée à 30 secondes"
        else
            rm -f "$temporaire"
            echo "❌ Erreur sur $fichier"
        fi
    else
        echo "⏭️ $fichier : déjà à 30 secondes ou moins"
    fi
done

echo "🎉 Toutes les vidéos ont été vérifiées !"
