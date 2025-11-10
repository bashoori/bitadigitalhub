"""
🎙️ Bita Digital Hub – Voice Extractor & Transcriber
Goal:
- Extract only voice (not video) from a web page.
- Convert speech to text (English + Persian translation).
- Save results to transcript.csv.
"""

import os
import re
import pandas as pd
from pathlib import Path
from openai import OpenAI
from dotenv import load_dotenv
from playwright.sync_api import sync_playwright

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def extract_audio_from_page(url, output_audio="temp_audio.webm"):
    """Render page & record only audio stream (not video)."""
    print(f"🎧 Opening page: {url}")
    Path("downloads").mkdir(exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(record_har_path="downloads/session.har")
        page = context.new_page()
        page.goto(url, timeout=60000)
        page.wait_for_timeout(10000)  # wait 10s for JS/video to load
        har_content = Path("downloads/session.har").read_text(encoding="utf-8")

        # Find any audio stream (m4a, webm, mp3)
        audio_links = re.findall(r'https?://[^\s"\']+\.(?:m4a|mp3|webm)', har_content)
        if not audio_links:
            raise ValueError("❌ No audio file found on page.")
        audio_url = audio_links[0]
        print(f"✅ Found audio stream: {audio_url}")

        # Download only the audio
        import requests
        r = requests.get(audio_url)
        with open(output_audio, "wb") as f:
            f.write(r.content)

        browser.close()
    return output_audio

def transcribe_audio(audio_path):
    """Transcribe with Whisper."""
    print("🔊 Transcribing voice...")
    with open(audio_path, "rb") as f:
        transcript = client.audio.transcriptions.create(
            model="whisper-1",
            file=f,
            response_format="verbose_json"
        )
    return transcript.segments

def translate_to_fa(text):
    """Translate English → Persian."""
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Translate English to Persian fluently."},
            {"role": "user", "content": text}
        ]
    )
    return resp.choices[0].message.content.strip()

def save_to_csv(segments, output_csv="transcript.csv"):
    rows = []
    for seg in segments:
        fa = translate_to_fa(seg["text"])
        rows.append({
            "start": seg["start"],
            "end": seg["end"],
            "text_en": seg["text"],
            "text_fa": fa
        })
        print(f"🗒️ {seg['text']} → {fa[:40]}...")
    pd.DataFrame(rows).to_csv(output_csv, index=False, encoding="utf-8-sig")
    print(f"📁 Transcript saved to {output_csv}")

def main():
    url = input("🌐 Enter webpage URL: ").strip()
    try:
        audio_file = extract_audio_from_page(url)
        segments = transcribe_audio(audio_file)
        save_to_csv(segments)
        os.remove(audio_file)  # clean up
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()
