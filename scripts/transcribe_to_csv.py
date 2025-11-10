"""
🎬 Bita Digital Hub – Video Transcriber Tool (yt-dlp version)
Author: Bita Ashoori
Description:
Takes a YouTube or direct video URL, extracts the audio,
transcribes it with Whisper, translates it into Persian,
and saves everything to transcript.csv.
"""

import os
import pandas as pd
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI
import subprocess

# ===== Load ENV =====
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# ===== Audio Download (yt-dlp) =====
def download_audio(video_url, output_dir="downloads"):
    """Download only the audio track from YouTube using yt-dlp"""
    Path(output_dir).mkdir(exist_ok=True)
    output_path = Path(output_dir) / "audio.mp3"

    print("⬇️  Downloading audio with yt-dlp...")
    cmd = [
        "yt-dlp",
        "-x", "--audio-format", "mp3",
        "-o", str(output_path),
        video_url
    ]
    subprocess.run(cmd, check=True)
    print(f"✅ Downloaded: {output_path}")
    return output_path

# ===== Transcription =====
def transcribe_audio(audio_path):
    """Transcribe audio using Whisper"""
    print("🎧 Transcribing with Whisper...")
    with open(audio_path, "rb") as audio_file:
        transcript = client.audio.transcriptions.create(
            model="whisper-1",
            file=audio_file,
            response_format="verbose_json"
        )
    return transcript.segments

# ===== Translation =====
def translate_to_farsi(text):
    """Translate English → Persian using ChatGPT"""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Translate English to natural Persian."},
            {"role": "user", "content": text}
        ]
    )
    return response.choices[0].message.content.strip()

# ===== CSV Save =====
def save_to_csv(segments, output_csv="transcript.csv"):
    """Save transcript with translations"""
    rows = []
    for seg in segments:
        fa_text = translate_to_farsi(seg["text"])
        rows.append({
            "start_time": seg["start"],
            "end_time": seg["end"],
            "text_en": seg["text"],
            "text_fa": fa_text
        })
        print(f"🗒️ {seg['text']} → {fa_text[:40]}...")

    df = pd.DataFrame(rows)
    df.to_csv(output_csv, index=False, encoding="utf-8-sig")
    print(f"📁 Saved CSV: {output_csv}")

# ===== Main =====
def main():
    video_url = input("🎥 Enter video URL: ").strip()
    audio_path = download_audio(video_url)
    segments = transcribe_audio(audio_path)
    save_to_csv(segments)

if __name__ == "__main__":
    main()
