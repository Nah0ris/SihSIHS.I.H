import os
import subprocess
import time
import math
import cv2
import numpy as np
from selenium import webdriver
from selenium.webdriver.edge.options import Options

OUTPUT_VIDEO = r"C:\Users\Rohan\Downloads\SIH-\AICTE_RegTech_Demo_Clean_2m01s.mp4"
TOTAL_SECONDS = 121  # 02:01.00
FPS = 30
TOTAL_FRAMES = TOTAL_SECONDS * FPS  # 3630 frames
WIDTH = 1920
HEIGHT = 1080

print(f"Generating clean walkthrough video: {TOTAL_SECONDS}s ({TOTAL_FRAMES} frames) at {WIDTH}x{HEIGHT} @ {FPS}fps...")

# Step 1: Capture all needed web states with Selenium
options = Options()
options.add_argument('--headless')
options.add_argument(f'--window-size=1936,1150')
options.add_argument('--disable-gpu')
options.add_argument('--hide-scrollbars')

driver = webdriver.Edge(options=options)

def load_and_resize(path):
    img = cv2.imread(path)
    if img is None:
        raise ValueError(f"Could not load {path}")
    return cv2.resize(img, (WIDTH, HEIGHT), interpolation=cv2.INTER_LANCZOS4)

shots = {}

try:
    print("Capturing Landing Page viewports...")
    driver.get("http://localhost:3000")
    time.sleep(2.0)
    
    # 1. Landing top: Header, Tricolor strip, MoE + AICTE logos, LIVE ticker
    driver.execute_script("window.scrollTo(0, 0)")
    time.sleep(0.5)
    driver.save_screenshot("clean_l1_header.png")
    shots["l1_header"] = load_and_resize("clean_l1_header.png")
    
    # 2. Landing search: Search widget with institution name entered & 4 stats
    driver.execute_script("""
        const input = document.querySelector('input[placeholder*="Institution name"]');
        if (input) {
            input.value = "Apex Institute of Tech (SYN-MH-0001)";
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }
    """)
    time.sleep(0.4)
    driver.save_screenshot("clean_l2_search.png")
    shots["l2_search"] = load_and_resize("clean_l2_search.png")
    
    # 3. Landing capabilities: PDF OCR, APH Clause Rules, ELA Tamper Detection, Notice Generator
    driver.execute_script("window.scrollTo(0, 720)")
    time.sleep(0.6)
    driver.save_screenshot("clean_l3_caps.png")
    shots["l3_caps"] = load_and_resize("clean_l3_caps.png")
    
    # 4. Landing Scrutiny Engine: Dark carbon card with amber SpecularButton
    driver.execute_script("window.scrollTo(0, 1420)")
    time.sleep(0.6)
    driver.save_screenshot("clean_l4_engine.png")
    shots["l4_engine"] = load_and_resize("clean_l4_engine.png")

    # 5. Institution Workspace top: Sanctioned Capacity (120 seats), Pre-check rules
    print("Capturing Institution Workspace...")
    driver.get("http://localhost:3000/institution/submit")
    time.sleep(1.5)
    driver.execute_script("window.scrollTo(0, 0)")
    time.sleep(0.5)
    driver.save_screenshot("clean_inst_top.png")
    shots["inst_top"] = load_and_resize("clean_inst_top.png")

    # 6. Institution Workspace batches: Batch dropzone, intake quota evaluation
    driver.execute_script("window.scrollTo(0, 380)")
    time.sleep(0.5)
    driver.save_screenshot("clean_inst_batches.png")
    shots["inst_batches"] = load_and_resize("clean_inst_batches.png")

    # 7. Admin Overview: National overview, capacity monitoring, CAP-001
    print("Capturing Admin Overview...")
    driver.get("http://localhost:3000/admin/overview")
    time.sleep(1.5)
    driver.execute_script("window.scrollTo(0, 0)")
    time.sleep(0.5)
    driver.save_screenshot("clean_admin_top.png")
    shots["admin_top"] = load_and_resize("clean_admin_top.png")

    # 8. Admin Overview ledger: Dispute ledger, Rule DUP-002, mediation drawer
    driver.execute_script("window.scrollTo(0, 420)")
    time.sleep(0.5)
    driver.save_screenshot("clean_admin_ledger.png")
    shots["admin_ledger"] = load_and_resize("clean_admin_ledger.png")

    # 9. Benchmark Suite: Synthetic scenarios, 135-row over-intake, 100% precision metrics
    print("Capturing Benchmark Suite...")
    driver.get("http://localhost:3000/admin/benchmark")
    time.sleep(1.5)
    driver.execute_script("window.scrollTo(0, 0)")
    time.sleep(0.5)
    driver.save_screenshot("clean_benchmark.png")
    shots["benchmark"] = load_and_resize("clean_benchmark.png")

    # 10. Verification Gateway: Student record verification, time-limited token
    print("Capturing Verification Gateway...")
    driver.get("http://localhost:3000/verify/chk_demo8723")
    time.sleep(1.5)
    driver.execute_script("window.scrollTo(0, 0)")
    time.sleep(0.5)
    driver.save_screenshot("clean_verify.png")
    shots["verify"] = load_and_resize("clean_verify.png")

finally:
    driver.quit()

print("All screenshots successfully captured!")

# Helper for smooth ease-in-out interpolation
def ease_in_out(t):
    return 0.5 * (1.0 - math.cos(math.pi * max(0.0, min(1.0, t))))

# Helper for cross-fade blending between two frames
def cross_fade(frame_a, frame_b, progress):
    progress = max(0.0, min(1.0, progress))
    return cv2.addWeighted(frame_a, 1.0 - progress, frame_b, progress, 0)

# Setup ffmpeg process
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

print("Rendering clean walkthrough video (No cursor, No bottom timestamp)...")

# Timeline definition:
# Part 1: [00:00 - 00:23] -> Frames 0 to 720 (24s)
# Part 2: [00:24 - 00:48] -> Frames 720 to 1440 (24s)
# Part 3: [00:48 - 01:09] -> Frames 1440 to 2070 (21s)
# Part 4: [01:10 - 01:33] -> Frames 2070 to 2790 (24s)
# Part 5: [01:33 - 01:46] -> Frames 2790 to 3180 (13s)
# Part 6: [01:46 - 02:01] -> Frames 3180 to 3630 (15s)

for frame_idx in range(TOTAL_FRAMES):
    # PART 1: [00:00 - 00:23] - CENTRAL DASHBOARD & REAL-TIME INTELLIGENCE
    # "Now, let us walk through the AICTE RegTech platform in action..."
    if frame_idx < 720:
        # 0s - 9s: Focus on top header, dual branding, live scrutiny ticker, and specular button
        if frame_idx < 270:
            frame_out = shots["l1_header"].copy()
        # 9s - 13s: Smooth pan into the search widget & stats
        elif frame_idx < 390:
            t = ease_in_out((frame_idx - 270) / 120.0)
            frame_out = cross_fade(shots["l1_header"], shots["l2_search"], t)
        # 13s - 24s: Search bar active, institutions lookup, deterministic rules & stats
        else:
            frame_out = shots["l2_search"].copy()

    # PART 2: [00:24 - 00:48] - DUAL FORENSIC PIPELINE & REAL-TIME SCRUTINY ENGINE
    # "Scrolling down, the platform features an automated dual forensic pipeline..."
    elif frame_idx < 1440:
        rel = frame_idx - 720
        # 24s - 27s: Transition scroll down into capabilities section
        if rel < 90:
            t = ease_in_out(rel / 90.0)
            frame_out = cross_fade(shots["l2_search"], shots["l3_caps"], t)
        # 27s - 38s: Highlight on 4 capabilities (OCR, APH clauses, ELA tamper, Notice generator)
        elif rel < 420:
            frame_out = shots["l3_caps"].copy()
        # 38s - 42s: Smooth glide down into Scrutiny Engine banner
        elif rel < 540:
            t = ease_in_out((rel - 420) / 120.0)
            frame_out = cross_fade(shots["l3_caps"], shots["l4_engine"], t)
        # 42s - 47s: View the Real-Time Scrutiny Engine banner & specular button
        elif rel < 690:
            frame_out = shots["l4_engine"].copy()
        # 47s - 48s: Clean click transition into Institution Workspace
        else:
            t = ease_in_out((rel - 690) / 30.0)
            frame_out = cross_fade(shots["l4_engine"], shots["inst_top"], t)

    # PART 3: [00:48 - 01:09] - INSTITUTION WORKSPACE (APEX INSTITUTE)
    # "Here in the Institution Workspace for Apex Institute of Technology..."
    elif frame_idx < 2070:
        rel = frame_idx - 1440
        # 48s - 58s: Approved intake capacity (120 seats), pre-flight validation rules
        if rel < 300:
            frame_out = shots["inst_top"].copy()
        # 58s - 62s: Pan down to batch submission & over-intake validation table
        elif rel < 420:
            t = ease_in_out((rel - 300) / 120.0)
            frame_out = cross_fade(shots["inst_top"], shots["inst_batches"], t)
        # 62s - 69s: Review batches table, over-intake prevention beyond 120-seat threshold
        else:
            frame_out = shots["inst_batches"].copy()

    # PART 4: [01:10 - 01:33] - AICTE CENTRAL REGULATORY DIRECTORATE
    # "Switching over to the AICTE Central Regulatory Directorate..."
    elif frame_idx < 2790:
        rel = frame_idx - 2070
        # 69s - 72s: Transition into Central Regulatory Directorate
        if rel < 90:
            t = ease_in_out(rel / 90.0)
            frame_out = cross_fade(shots["inst_batches"], shots["admin_top"], t)
        # 72s - 81s: National compliance overview, state-level and programme breakdown
        elif rel < 360:
            frame_out = shots["admin_top"].copy()
        # 81s - 85s: Pan down to interactive dispute ledger (CAP-001, DUP-002)
        elif rel < 480:
            t = ease_in_out((rel - 360) / 120.0)
            frame_out = cross_fade(shots["admin_top"], shots["admin_ledger"], t)
        # 85s - 93s: Dispute queue, unapproved programmes, remediation hints and deficiency notices
        else:
            frame_out = shots["admin_ledger"].copy()

    # PART 5: [01:33 - 01:46] - SYNTHETIC BENCHMARK SUITE
    # "Our synthetic benchmark engine stress-tests regulatory edge cases..."
    elif frame_idx < 3180:
        rel = frame_idx - 2790
        # 93s - 96s: Transition into Benchmark Suite
        if rel < 90:
            t = ease_in_out(rel / 90.0)
            frame_out = cross_fade(shots["admin_ledger"], shots["benchmark"], t)
        # 96s - 106s: Benchmark scenarios, 100% precision & recall, zero false positives, sub-second latency
        else:
            frame_out = shots["benchmark"].copy()

    # PART 6: [01:46 - 02:01] - PRIVACY-PRESERVING STUDENT VERIFICATION GATEWAY & OUTRO
    # "Finally, our public verification gateway enables third-party evaluators..."
    else:
        rel = frame_idx - 3180
        # 106s - 109s: Transition into Student Verification Gateway
        if rel < 90:
            t = ease_in_out(rel / 90.0)
            frame_out = cross_fade(shots["benchmark"], shots["verify"], t)
        # 109s - 118s: Purpose-bound token verification, zero exposure of credentials/biometrics
        elif rel < 360:
            frame_out = shots["verify"].copy()
        # 118s - 121s: Concluding gentle fade to black at 02:01
        else:
            fade_prog = (rel - 360) / 90.0
            frame_out = (shots["verify"].astype(np.float32) * (1.0 - ease_in_out(fade_prog))).astype(np.uint8)

    # Ensure exact dimensions
    if frame_out.shape != (HEIGHT, WIDTH, 3):
        frame_out = cv2.resize(frame_out, (WIDTH, HEIGHT))

    proc.stdin.write(frame_out.tobytes())

    if frame_idx % 450 == 0:
        print(f"Rendered {frame_idx}/{TOTAL_FRAMES} frames ({int(frame_idx/FPS)}s / {TOTAL_SECONDS}s)...")

proc.stdin.close()
proc.wait()

# Clean up raw captured files
for fname in ["clean_l1_header.png", "clean_l2_search.png", "clean_l3_caps.png", "clean_l4_engine.png",
              "clean_inst_top.png", "clean_inst_batches.png", "clean_admin_top.png", "clean_admin_ledger.png",
              "clean_benchmark.png", "clean_verify.png"]:
    if os.path.exists(fname):
        try:
            os.remove(fname)
        except Exception:
            pass

print(f"CLEAN VIDEO COMPLETE: {OUTPUT_VIDEO} ({os.path.getsize(OUTPUT_VIDEO)} bytes)")
