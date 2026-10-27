import os
import subprocess
import time
import math
import cv2
import numpy as np
from selenium import webdriver
from selenium.webdriver.edge.options import Options

OUTPUT_VIDEO = r"C:\Users\Rohan\Downloads\SIH-\AICTE_RegTech_Demo_1m30s.mp4"
TOTAL_SECONDS = 90
FPS = 30
TOTAL_FRAMES = TOTAL_SECONDS * FPS # Exactly 2700 frames (01:30.00)
WIDTH = 1920
HEIGHT = 1080

print(f"Generating {TOTAL_SECONDS}s ({TOTAL_FRAMES} frames) demo video at {WIDTH}x{HEIGHT} @ {FPS}fps...")

# Step 1: Capture all needed web states with Selenium
options = Options()
options.add_argument('--headless')
options.add_argument(f'--window-size=1936,1150')
options.add_argument('--disable-gpu')
options.add_argument('--hide-scrollbars')

driver = webdriver.Edge(options=options)

screenshots = {}

def load_and_resize(path):
    img = cv2.imread(path)
    if img is None:
        raise ValueError(f"Could not load {path}")
    return cv2.resize(img, (WIDTH, HEIGHT), interpolation=cv2.INTER_LANCZOS4)

try:
    print("Capturing Landing Page states...")
    driver.get("http://localhost:3000")
    time.sleep(1.5)
    
    # 1. Landing top hero
    driver.execute_script("window.scrollTo(0, 0)")
    time.sleep(0.5)
    driver.save_screenshot("raw_landing_top.png")
    screenshots["landing_top"] = load_and_resize("raw_landing_top.png")
    
    # 2. Landing search with text filled
    driver.execute_script("""
        const input = document.querySelector('input[placeholder*="Institution name"]');
        if (input) {
            input.value = "Apex Institute of Tech (SYN-MH-0001)";
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }
    """)
    time.sleep(0.4)
    driver.save_screenshot("raw_landing_search.png")
    screenshots["landing_search"] = load_and_resize("raw_landing_search.png")
    
    # 3. Landing capabilities section
    driver.execute_script("window.scrollTo(0, 680)")
    time.sleep(0.5)
    driver.save_screenshot("raw_landing_caps.png")
    screenshots["landing_caps"] = load_and_resize("raw_landing_caps.png")
    
    # 4. Landing Scrutiny Engine dark card & portal launchpad
    driver.execute_script("window.scrollTo(0, 1380)")
    time.sleep(0.5)
    driver.save_screenshot("raw_landing_engine.png")
    screenshots["landing_engine"] = load_and_resize("raw_landing_engine.png")

    # 5. Landing lower crux access
    driver.execute_script("window.scrollTo(0, 1950)")
    time.sleep(0.5)
    driver.save_screenshot("raw_landing_launchpad.png")
    screenshots["landing_launchpad"] = load_and_resize("raw_landing_launchpad.png")

    # 6. Institution workspace
    print("Capturing Institution workspace...")
    driver.get("http://localhost:3000/institution/submit")
    time.sleep(1.2)
    driver.save_screenshot("raw_submit.png")
    screenshots["submit"] = load_and_resize("raw_submit.png")
    
    # 7. Admin Overview
    print("Capturing Admin Overview...")
    driver.get("http://localhost:3000/admin/overview")
    time.sleep(1.2)
    driver.save_screenshot("raw_admin.png")
    screenshots["admin"] = load_and_resize("raw_admin.png")

    # 8. Benchmark Suite
    print("Capturing Benchmark Suite...")
    driver.get("http://localhost:3000/admin/benchmark")
    time.sleep(1.2)
    driver.save_screenshot("raw_benchmark.png")
    screenshots["benchmark"] = load_and_resize("raw_benchmark.png")

    # 9. Verification Gateway
    print("Capturing Verification Gateway...")
    driver.get("http://localhost:3000/verify/chk_demo8723")
    time.sleep(1.2)
    driver.save_screenshot("raw_verify.png")
    screenshots["verify"] = load_and_resize("raw_verify.png")

finally:
    driver.quit()

print("All screenshots successfully captured and scaled to 1920x1080!")

# Create a clean cursor graphic
def draw_cursor(img, x, y, click_anim=0.0):
    x = max(0, min(WIDTH - 25, x))
    y = max(0, min(HEIGHT - 35, y))
    
    pts = np.array([
        [x, y],
        [x, y + 24],
        [x + 6, y + 19],
        [x + 12, y + 29],
        [x + 16, y + 27],
        [x + 10, y + 17],
        [x + 18, y + 17]
    ], np.int32)
    
    # Shadow
    cv2.polylines(img, [pts + 2], True, (20, 20, 20), 3, cv2.LINE_AA)
    # White fill
    cv2.fillPoly(img, [pts], (255, 255, 255), cv2.LINE_AA)
    # Dark border
    cv2.polylines(img, [pts], True, (30, 30, 30), 1, cv2.LINE_AA)
    
    if click_anim > 0:
        radius = int(8 + 22 * (1.0 - click_anim))
        alpha = click_anim * 0.75
        overlay = img.copy()
        cv2.circle(overlay, (int(x), int(y)), radius, (11, 158, 245), 2, cv2.LINE_AA)
        cv2.addWeighted(overlay, alpha, img, 1.0 - alpha, 0, img)

# Helper to draw professional lower third banner
def draw_lower_third(frame, frame_idx, section_num, section_title, highlight_text, detail_text):
    banner_h = 110
    overlay = frame.copy()
    
    # Background rectangle
    cv2.rectangle(overlay, (0, HEIGHT - banner_h), (WIDTH, HEIGHT), (15, 23, 42), -1)
    # Amber top accent line
    cv2.line(overlay, (0, HEIGHT - banner_h), (WIDTH, HEIGHT - banner_h), (11, 158, 245), 3)
    
    cv2.addWeighted(overlay, 0.92, frame, 0.08, 0, frame)
    
    # Progress bar at very bottom
    prog = frame_idx / float(TOTAL_FRAMES)
    prog_w = int(WIDTH * prog)
    cv2.rectangle(frame, (0, HEIGHT - 6), (WIDTH, HEIGHT), (30, 41, 59), -1)
    cv2.rectangle(frame, (0, HEIGHT - 6), (prog_w, HEIGHT), (11, 158, 245), -1)
    
    # Time formatting
    cur_sec = int(frame_idx / FPS)
    m = cur_sec // 60
    s = cur_sec % 60
    time_str = f"{m:02d}:{s:02d} / 01:30"
    
    # Section Badge
    badge_text = f"SECTION {section_num}: {section_title}"
    cv2.putText(frame, badge_text, (45, HEIGHT - banner_h + 32), cv2.FONT_HERSHEY_DUPLEX, 0.65, (11, 158, 245), 1, cv2.LINE_AA)
    
    # Time stamp on right
    cv2.putText(frame, time_str, (WIDTH - 190, HEIGHT - banner_h + 32), cv2.FONT_HERSHEY_DUPLEX, 0.55, (148, 163, 184), 1, cv2.LINE_AA)
    
    # Main Highlight Text
    cv2.putText(frame, highlight_text, (45, HEIGHT - banner_h + 66), cv2.FONT_HERSHEY_DUPLEX, 0.85, (255, 255, 255), 2, cv2.LINE_AA)
    
    # Detail Text
    cv2.putText(frame, detail_text, (45, HEIGHT - banner_h + 93), cv2.FONT_HERSHEY_SIMPLEX, 0.50, (203, 213, 225), 1, cv2.LINE_AA)

# Start ffmpeg process for clean video encoding
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
    "-t", "90",
    OUTPUT_VIDEO
]

proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)

print("Encoding exactly 2700 frames into video stream...")

for frame_idx in range(TOTAL_FRAMES):
    click_val = 0.0
    
    # SCENE 1 (0:00 - 0:18) [Frames 0 - 540]: LANDING PAGE HERO & SEARCH
    if frame_idx < 540:
        sec_num = "01"
        sec_title = "AICTE REGULATORY INTELLIGENCE PORTAL"
        hl = "Official AICTE & Ministry of Education Governance Architecture"
        det = "LIVE Scrutiny Cycle Operational · Real-Time Institutional Approval & Intake Verification"
        
        if frame_idx < 180: # 0 - 6s: Top header & Explore Portal button
            base_frame = screenshots["landing_top"].copy()
            t = frame_idx / 180.0
            cur_x = int(500 + (1380 - 500) * t)
            cur_y = int(300 + (65 - 300) * t)
            if frame_idx > 150:
                click_val = (180 - frame_idx) / 30.0
        elif frame_idx < 360: # 6 - 12s: Search input
            base_frame = screenshots["landing_search"].copy()
            t = (frame_idx - 180) / 180.0
            cur_x = int(1380 + (800 - 1380) * t)
            cur_y = int(65 + (380 - 65) * t)
        else: # 12 - 18s: Explore button click & 4 stats review
            base_frame = screenshots["landing_search"].copy()
            t = (frame_idx - 360) / 180.0
            cur_x = int(800 + (1240 - 800) * min(1.0, t * 1.5))
            cur_y = int(380 + (380 - 380) * min(1.0, t * 1.5))
            if 420 <= frame_idx <= 450:
                click_val = (450 - frame_idx) / 30.0
                
        draw_cursor(base_frame, cur_x, cur_y, click_val)
        draw_lower_third(base_frame, frame_idx, sec_num, sec_title, hl, det)
        frame_to_write = base_frame

    # SCENE 2 (0:18 - 0:34) [Frames 540 - 1020]: CAPABILITIES & REAL-TIME SCRUTINY ENGINE
    elif frame_idx < 1020:
        sec_num = "02"
        sec_title = "STATUTORY CAPABILITIES & VERIFICATION ENGINE"
        hl = "Dual Forensic Pipeline (OCR + ELA) & APH Clause Evaluation"
        det = "Automates Statutory Land Area, Intake Parity (420 seats), and Faculty Cadre Ratios"
        
        if frame_idx < 760: # 18 - 25s: 4 Capability Cards
            base_frame = screenshots["landing_caps"].copy()
            t = (frame_idx - 540) / 220.0
            cur_x = int(450 + (1450 - 450) * t)
            cur_y = int(350 + (280 - 350) * math.sin(t * math.pi))
        else: # 25 - 34s: Scrutiny Operations Banner & SpecularButton click
            base_frame = screenshots["landing_engine"].copy()
            t = (frame_idx - 760) / 260.0
            cur_x = int(600 + (420 - 600) * t)
            cur_y = int(400 + (280 - 400) * t)
            if 940 <= frame_idx <= 980:
                click_val = (980 - frame_idx) / 40.0
                
        draw_cursor(base_frame, cur_x, cur_y, click_val)
        draw_lower_third(base_frame, frame_idx, sec_num, sec_title, hl, det)
        frame_to_write = base_frame

    # SCENE 3 (0:34 - 0:52) [Frames 1020 - 1560]: INSTITUTION WORKSPACE
    elif frame_idx < 1560:
        sec_num = "03"
        sec_title = "INSTITUTION WORKSPACE (APEX INSTITUTE)"
        hl = "Enrolment Batch Submission & Sanctioned Capacity Enforcement"
        det = "Deterministic Intake Checks · 120 Cap Tracking · Rejects Over-Capacity Rows"
        
        base_frame = screenshots["submit"].copy()
        t = (frame_idx - 1020) / 540.0
        
        if t < 0.4:
            cur_x = int(350 + (800 - 350) * (t / 0.4))
            cur_y = int(180 + (240 - 180) * (t / 0.4))
        elif t < 0.7:
            cur_x = int(800 + (1200 - 800) * ((t - 0.4) / 0.3))
            cur_y = int(240 + (350 - 240) * ((t - 0.4) / 0.3))
            if 1320 <= frame_idx <= 1350:
                click_val = (1350 - frame_idx) / 30.0
        else:
            cur_x = int(1200 + (650 - 1200) * ((t - 0.7) / 0.3))
            cur_y = int(350 + (500 - 350) * ((t - 0.7) / 0.3))
            
        draw_cursor(base_frame, cur_x, cur_y, click_val)
        draw_lower_third(base_frame, frame_idx, sec_num, sec_title, hl, det)
        frame_to_write = base_frame

    # SCENE 4 (0:52 - 1:10) [Frames 1560 - 2100]: CENTRAL REGULATORY COMPLIANCE OVERVIEW
    elif frame_idx < 2100:
        sec_num = "04"
        sec_title = "CENTRAL REGULATORY COMPLIANCE OVERVIEW"
        hl = "National Regulatory Directorate & Exception Dispute Ledger"
        det = "Monitors Multi-Enrolment Anomalies, Capacity Consumption & Statutory Disputes"
        
        base_frame = screenshots["admin"].copy()
        t = (frame_idx - 1560) / 540.0
        
        if t < 0.5:
            cur_x = int(450 + (1100 - 450) * (t / 0.5))
            cur_y = int(220 + (250 - 220) * (t / 0.5))
        else:
            cur_x = int(1100 + (700 - 1100) * ((t - 0.5) / 0.5))
            cur_y = int(250 + (480 - 250) * ((t - 0.5) / 0.5))
            if 1900 <= frame_idx <= 1930:
                click_val = (1930 - frame_idx) / 30.0
                
        draw_cursor(base_frame, cur_x, cur_y, click_val)
        draw_lower_third(base_frame, frame_idx, sec_num, sec_title, hl, det)
        frame_to_write = base_frame

    # SCENE 5 (1:10 - 1:22) [Frames 2100 - 2460]: SYNTHETIC BENCHMARK SUITE
    elif frame_idx < 2460:
        sec_num = "05"
        sec_title = "SYNTHETIC VALIDATION BENCHMARK ENGINE"
        hl = "Deterministic Stress-Testing & High-Concurrency Validation"
        det = "Executes 135-Row Scenarios, Multi-Enrolment Clashes & Latency Audits"
        
        base_frame = screenshots["benchmark"].copy()
        t = (frame_idx - 2100) / 360.0
        
        cur_x = int(500 + (1150 - 500) * t)
        cur_y = int(280 + (420 - 280) * t)
        if 2240 <= frame_idx <= 2270:
            click_val = (2270 - frame_idx) / 30.0
            
        draw_cursor(base_frame, cur_x, cur_y, click_val)
        draw_lower_third(base_frame, frame_idx, sec_num, sec_title, hl, det)
        frame_to_write = base_frame

    # SCENE 6 (1:22 - 1:30) [Frames 2460 - 2700]: VERIFICATION GATEWAY & OUTRO
    else:
        sec_num = "06"
        sec_title = "PRIVACY-PRESERVING STUDENT VERIFICATION"
        hl = "Zero-Knowledge Token Gateway · Time-Limited Student Status Check"
        det = "Zero Aadhaar & Biometric Storage · AICTE APAAR RegTech Prototype SIH 2026"
        
        base_frame = screenshots["verify"].copy()
        t = (frame_idx - 2460) / 240.0
        
        cur_x = int(650 + (960 - 650) * min(1.0, t * 2.0))
        cur_y = int(320 + (450 - 320) * min(1.0, t * 2.0))
        
        if frame_idx >= 2670:
            fade = (2700 - frame_idx) / 30.0
            base_frame = (base_frame.astype(np.float32) * fade).astype(np.uint8)
        else:
            draw_cursor(base_frame, cur_x, cur_y)
            draw_lower_third(base_frame, frame_idx, sec_num, sec_title, hl, det)
            
        frame_to_write = base_frame

    # Double check exact frame shape
    if frame_to_write.shape != (HEIGHT, WIDTH, 3):
        frame_to_write = cv2.resize(frame_to_write, (WIDTH, HEIGHT))

    proc.stdin.write(frame_to_write.tobytes())
    
    if frame_idx % 300 == 0:
        print(f"Rendered {frame_idx}/{TOTAL_FRAMES} frames ({int(frame_idx/FPS)}s / {TOTAL_SECONDS}s)...")

proc.stdin.close()
proc.wait()

print(f"SUCCESS: Video exported to {OUTPUT_VIDEO} ({os.path.getsize(OUTPUT_VIDEO)} bytes)")
