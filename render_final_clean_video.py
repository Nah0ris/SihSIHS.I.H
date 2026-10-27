import os
import subprocess
import time
import math
import cv2
import numpy as np
from selenium import webdriver
from selenium.webdriver.edge.options import Options

OUTPUT_VIDEO = r"C:\Users\Rohan\Downloads\SIH-\AICTE_RegTech_Demo_Clean_2m01s.mp4"
TOTAL_SECONDS = 121  # Exactly 02:01.00
FPS = 30
TOTAL_FRAMES = TOTAL_SECONDS * FPS  # Exactly 3630 frames
WIDTH = 1920
HEIGHT = 1080

print(f"Generating Clean Video for AICTE APAAR Student Verification Platform (SIH 2026 - PS 3)...")
print(f"Total Duration: {TOTAL_SECONDS}s ({TOTAL_FRAMES} frames) at {WIDTH}x{HEIGHT} @ {FPS}fps")

options = Options()
options.add_argument('--headless')
options.add_argument('--window-size=1936,1150')
options.add_argument('--disable-gpu')
options.add_argument('--hide-scrollbars')

driver = webdriver.Edge(options=options)

def load_and_resize(path):
    img = cv2.imread(path)
    if img is None:
        raise ValueError(f"Could not load image: {path}")
    return cv2.resize(img, (WIDTH, HEIGHT), interpolation=cv2.INTER_LANCZOS4)

shots = {}

try:
    print("Capturing updated Landing Page...")
    driver.get("http://localhost:3000")
    time.sleep(1.0)
    
    # 1. Landing Top Header & Hero
    driver.execute_script("window.scrollTo(0, 0)")
    time.sleep(0.3)
    driver.save_screenshot("kratos_l1_header.png")
    shots["l1_header"] = load_and_resize("kratos_l1_header.png")
    
    # 2. Landing Search Widget with Apex Institute & UVP cards (Detect, Validate, Monitor, Explain)
    driver.execute_script("""
        const input = document.querySelector('input[placeholder*="Search Institution"]');
        if (input) {
            input.value = "Apex Institute of Tech (SYN-MH-0001)";
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }
    """)
    time.sleep(0.3)
    driver.save_screenshot("kratos_l2_search.png")
    shots["l2_search"] = load_and_resize("kratos_l2_search.png")
    
    # 3. 6-Phase Lifecycle & Core Modules (APAAR Validation, Quotas, Timeline Overlap, Actionable Reports)
    driver.execute_script("window.scrollTo(0, 750)")
    time.sleep(0.4)
    driver.save_screenshot("kratos_l3_modules.png")
    shots["l3_modules"] = load_and_resize("kratos_l3_modules.png")
    
    # 4. Scrutiny Banner: Central Repository & Verification Engine
    driver.execute_script("window.scrollTo(0, 1420)")
    time.sleep(0.4)
    driver.save_screenshot("kratos_l4_engine.png")
    shots["l4_engine"] = load_and_resize("kratos_l4_engine.png")

    # 5. Institution Workspace: Apex Institute (#SYN-MH-0001)
    print("Capturing Institution Workspace...")
    driver.get("http://localhost:3000/institution/submit")
    time.sleep(0.8)
    driver.execute_script("window.scrollTo(0, 0)")
    time.sleep(0.3)
    driver.save_screenshot("kratos_inst_top.png")
    shots["inst_top"] = load_and_resize("kratos_inst_top.png")

    # 6. Institution Workspace Batches table
    driver.execute_script("window.scrollTo(0, 380)")
    time.sleep(0.3)
    driver.save_screenshot("kratos_inst_batches.png")
    shots["inst_batches"] = load_and_resize("kratos_inst_batches.png")

    # 7. AICTE Central Regulatory Directorate
    print("Capturing Central Regulatory Overview...")
    driver.get("http://localhost:3000/admin/overview")
    time.sleep(0.8)
    driver.execute_script("window.scrollTo(0, 0)")
    time.sleep(0.3)
    driver.save_screenshot("kratos_admin_top.png")
    shots["admin_top"] = load_and_resize("kratos_admin_top.png")

    # 8. Dispute Ledger Queue (Rule DUP-002, CAP-001)
    driver.execute_script("window.scrollTo(0, 420)")
    time.sleep(0.3)
    driver.save_screenshot("kratos_admin_ledger.png")
    shots["admin_ledger"] = load_and_resize("kratos_admin_ledger.png")

    # 9. Synthetic Benchmark Suite
    print("Capturing Benchmark Suite...")
    driver.get("http://localhost:3000/admin/benchmark")
    time.sleep(0.8)
    driver.execute_script("window.scrollTo(0, 0)")
    time.sleep(0.3)
    driver.save_screenshot("kratos_benchmark.png")
    shots["benchmark"] = load_and_resize("kratos_benchmark.png")

    # 10. Privacy-Preserving Verification Gateway
    print("Capturing Verification Gateway...")
    driver.get("http://localhost:3000/verify/chk_demo8723")
    time.sleep(0.8)
    driver.execute_script("window.scrollTo(0, 0)")
    time.sleep(0.3)
    driver.save_screenshot("kratos_verify.png")
    shots["verify"] = load_and_resize("kratos_verify.png")

finally:
    driver.quit()

print("All screenshots successfully captured!")

def ease_in_out(t):
    t_clamped = max(0.0, min(1.0, t))
    return 0.5 * (1.0 - math.cos(math.pi * t_clamped))

def cross_fade(frame_a, frame_b, progress):
    p = max(0.0, min(1.0, progress))
    return cv2.addWeighted(frame_a, 1.0 - p, frame_b, p, 0)

ffmpeg_cmd = [
    "C:\\ffmpeg\\bin\\ffmpeg.exe",
    "-y",
    "-f", "rawvideo",
    "-vcodec", "rawvideo",
    "-s", f"{WIDTH}x{HEIGHT}",
    "-pix_fmt", "bgr24",
    "-r", str(FPS),
    "-i", "-",
    "-f", "lavfi",
    "-i", f"anullsrc=channel_layout=stereo:sample_rate=44100",
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-preset", "veryfast",
    "-b:v", "3500k",
    "-maxrate", "5000k",
    "-bufsize", "7000k",
    "-c:a", "aac",
    "-b:a", "128k",
    "-t", str(TOTAL_SECONDS),
    OUTPUT_VIDEO
]

proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)

print("Encoding frames...")

# Timeline:
# Part 1: [00:00 - 00:23.5] -> Frames 0 to 705 (23.5s)
# Part 2: [00:23.5 - 00:48] -> Frames 705 to 1440 (24.5s)
# Part 3: [00:48 - 01:09.5] -> Frames 1440 to 2085 (21.5s)
# Part 4: [01:09.5 - 01:33] -> Frames 2085 to 2790 (23.5s)
# Part 5: [01:33 - 01:46] -> Frames 2790 to 3180 (13s)
# Part 6: [01:46 - 02:01] -> Frames 3180 to 3630 (15s)

for frame_idx in range(TOTAL_FRAMES):
    # PART 1: [00:00 - 00:23.5] - Central Dashboard & Dual Branding
    if frame_idx < 705:
        if frame_idx < 270:
            frame_out = shots["l1_header"]
        elif frame_idx < 390:
            t = ease_in_out((frame_idx - 270) / 120.0)
            frame_out = cross_fade(shots["l1_header"], shots["l2_search"], t)
        else:
            frame_out = shots["l2_search"]

    # PART 2: [00:23.5 - 00:48] - 6-Phase Pipeline & Core Modules
    elif frame_idx < 1440:
        rel = frame_idx - 705
        if rel < 105:
            t = ease_in_out(rel / 105.0)
            frame_out = cross_fade(shots["l2_search"], shots["l3_modules"], t)
        elif rel < 450:
            frame_out = shots["l3_modules"]
        elif rel < 570:
            t = ease_in_out((rel - 450) / 120.0)
            frame_out = cross_fade(shots["l3_modules"], shots["l4_engine"], t)
        elif rel < 690:
            frame_out = shots["l4_engine"]
        else:
            t = ease_in_out((rel - 690) / 45.0)
            frame_out = cross_fade(shots["l4_engine"], shots["inst_top"], t)

    # PART 3: [00:48 - 01:09.5] - Institution Workspace (Apex Institute)
    elif frame_idx < 2085:
        rel = frame_idx - 1440
        if rel < 300:
            frame_out = shots["inst_top"]
        elif rel < 420:
            t = ease_in_out((rel - 300) / 120.0)
            frame_out = cross_fade(shots["inst_top"], shots["inst_batches"], t)
        else:
            frame_out = shots["inst_batches"]

    # PART 4: [01:09.5 - 01:33] - AICTE Central Regulatory Directorate (CAP-001, DUP-002)
    elif frame_idx < 2790:
        rel = frame_idx - 2085
        if rel < 75:
            t = ease_in_out(rel / 75.0)
            frame_out = cross_fade(shots["inst_batches"], shots["admin_top"], t)
        elif rel < 360:
            frame_out = shots["admin_top"]
        elif rel < 480:
            t = ease_in_out((rel - 360) / 120.0)
            frame_out = cross_fade(shots["admin_top"], shots["admin_ledger"], t)
        else:
            frame_out = shots["admin_ledger"]

    # PART 5: [01:33 - 01:46] - Synthetic Benchmark Suite (100% precision & recall)
    elif frame_idx < 3180:
        rel = frame_idx - 2790
        if rel < 75:
            t = ease_in_out(rel / 75.0)
            frame_out = cross_fade(shots["admin_ledger"], shots["benchmark"], t)
        else:
            frame_out = shots["benchmark"]

    # PART 6: [01:46 - 02:01] - Privacy-Preserving Student Verification Gateway & Outro
    else:
        rel = frame_idx - 3180
        if rel < 75:
            t = ease_in_out(rel / 75.0)
            frame_out = cross_fade(shots["benchmark"], shots["verify"], t)
        elif rel < 360:
            frame_out = shots["verify"]
        else:
            fade_prog = (rel - 360) / 90.0
            frame_out = (shots["verify"].astype(np.float32) * (1.0 - ease_in_out(fade_prog))).astype(np.uint8)

    if frame_out.shape != (HEIGHT, WIDTH, 3):
        frame_out = cv2.resize(frame_out, (WIDTH, HEIGHT))

    proc.stdin.write(frame_out.tobytes())

    if frame_idx % 600 == 0:
        print(f"Rendered {frame_idx}/{TOTAL_FRAMES} frames ({int(frame_idx/FPS)}s / {TOTAL_SECONDS}s)...")

proc.stdin.close()
proc.wait()

# Clean up raw captured files
for fname in ["kratos_l1_header.png", "kratos_l2_search.png", "kratos_l3_modules.png", "kratos_l4_engine.png",
              "kratos_inst_top.png", "kratos_inst_batches.png", "kratos_admin_top.png", "kratos_admin_ledger.png",
              "kratos_benchmark.png", "kratos_verify.png"]:
    if os.path.exists(fname):
        try:
            os.remove(fname)
        except Exception:
            pass

print(f"SUCCESS: Video rendered to {OUTPUT_VIDEO} ({os.path.getsize(OUTPUT_VIDEO)} bytes)")
