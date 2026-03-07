# JS81 - Web-Based Sinclair ZX81 Emulator

**JS81** is a lightweight, high-performance emulator for the Sinclair ZX81 home computer, written entirely in modern HTML5 and JavaScript. It provides an authentic experience with a polished, retro-styled user interface, accurate timing, and advanced tape management.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Platform: Web](https://img.shields.io/badge/Platform-Web-blue.svg)

## 🌟 Features

*   **Accurate Timing:** Calibrated CPU speed (~865kHz effective) to match the real hardware's "Slow Mode" execution speed (e.g., 13-second benchmark loops).
*   **High-Level Video Emulation (HLE):** Patches the ROM display routine to render the D_FILE directly to an HTML Canvas. This ensures a stable, flicker-free image without the heavy processing overhead of emulating the ULA video signal generation.
*   **Automatic ROM / Smart Tape Support:**
    *   **Auto-Load ROM:** JS81 tries to start with `ROM/zx81.rom` automatically. If the browser blocks local file access, use the **LOAD ROM** button to select that ROM manually.
    *   **Load .P Files:** Intelligent memory injection that reconstructs missing system variables (`ERR_SP`, `RAMTOP`) and stack pointers to prevent crashes or "Hard Resets" common in other web emulators.
    *   **Save .P Files:** Uses the modern **File System Access API** to allow "Save As..." functionality with folder selection (falls back to standard download on older browsers).
*   **Keyboard Mapping:**
    *   Full PC keyboard mapping to the ZX81 matrix.
    *   Prevention of browser shortcuts (like Firefox's Quick Find) when typing.

## 🚀 Getting Started

### 1. The ROM File
**How does JS81 find the ROM?**
JS81 looks for `ROM/zx81.rom` automatically on startup. If the browser blocks local access, use **LOAD ROM** to select that file manually.

1.  You must legally obtain a copy of the **8K ZX81 ROM**.
2.  Commonly named `zx81.rom` (MD5: `7b9a528005e1979d4692a5d24c084a9e`).
3.  Place it in the `ROM` subfolder so the expected path is `ROM/zx81.rom`.
4.  Open `js81.html`. JS81 will try to load it automatically.

### 2. Running the Emulator
JS81 can still be opened directly by double-clicking `js81.html`, without needing a local web server (Python/Node/etc). It tries to auto-load `ROM/zx81.rom`; if that fails, click **LOAD ROM**. Then use **LOAD TAPE** for `.p` files stored in `TAPEs/`.

**If using a web server (Optional):**
If you prefer to run it via Python (`python3 -m http.server`), you must navigate to `http://localhost:8000/js81.html` (since `index.html` no longer exists).

## ⌨️ Controls

| PC Key | ZX81 Function | Notes |
| :--- | :--- | :--- |
| **F1** | **Key Map** | Toggles the keyboard layout helper image. |
| **F2** | **About** | Displays credits and dedication. |
| **F3** | **Screen Size** | Rotates between `x2`, `x4`, and fullscreen screen-only mode. |
| **Escape** | **Close / Exit Fullscreen** | Closes open overlays and returns fullscreen mode to `x2`. |
| **Arrow Keys** | **Cursor** | Maps to 5, 6, 7, 8 (Works in games and BASIC). |
| **Backspace** | **Delete** | Triggers `Shift` + `0` (Rubout). |
| **Shift** | **Shift** | Access red symbols/functions. |
| **Enter** | **Newline** | Execute command. |

## ⚙️ Technical Details

**The "White Screen" Fix:**
The ZX81 generates video signals using the CPU. In a standard Z80 emulator, this results in an infinite loop of NOPs. JS81 patches the ROM at address `0x02B5` with a `RET` (`0xC9`) instruction. This bypasses the analog video generation loop, allowing the JavaScript engine to render the display file (`D_FILE`) directly from RAM to the Canvas.

**Tape Loading Logic:**
Standard `.p` files are memory snapshots starting at `0x4009`. Loading them blindly leaves the CPU registers and critical system variables (like the Stack Pointer and `ERR_SP`) in an undefined state, causing resets. JS81 reconstructs the missing system variables (`0x4000`-`0x4008`), sets up a valid stack at the top of RAM, and performs a "Warm Start" by injecting specific values into the Z80 registers (PC, SP, IX, IY).

## 🕯️ Dedication

This emulator is dedicated **In Memoriam** to **Dr. Carlo Delhez**.

Dr. Delhez was the creator of **Xtender**, the very first ZX81 emulator I ever encountered. His contributions to the ZX81 and Timex Sinclair 1000/1500 communities lasted well into the late eighties, producing technical marvels like **Coral BASIC**, a language so advanced it made the Sinclair QL's SuperBASIC seem lacking.

I fondly remember the days of the demo version, when acquiring the full software meant converting Portuguese Escudos into Dutch Guilders, sealing them in an envelope, and waiting for the return post containing two floppy disks: one with Xtender, and the other with a library of ZX81 treasures.

Rest in peace, Dr. Delhez. Thank you for everything.

## 📝 License & Credits

**JS81** is created by **Luís Simões da Cunha**, 2026.
Licensed under the **MIT License**.

*   **Z80 CPU Core:** Provided under MIT license by **Molly Howell** (DrGoldfire).
*   **Original Hardware:** Sinclair Research Ltd.
