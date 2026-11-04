# Implementation Plan: Gemini Voice Conversations & Three.js 3D Hero Scene

Integrate a real-time Voice Conversation experience with Gemini for starwebs.ks and a lightweight, high-performance Three.js 3D obsidian crystal monolith scene in the Hero section.

## User Preferences & Selected Directives
- **Voice Conversations UI**: Floating voice pill in the bottom-right corner that expands into a luxury obsidian audio orb modal with live frequency visualizations and spoken audio playback.
- **Three.js 3D Hero Scene**: Obsidian crystal monolith with rotating amber core, orbital metallic shards, and subtle floating ember particles. Automatically disabled on mobile screens (<768px) and low-power devices for sub-second page performance.

---

## Proposed Changes

### 1. Dependencies & Infrastructure
- Install `three` and `@types/three` via `install_applet_package`.
- Ensure `@google/genai` on server side is configured for voice/chat processing with the Starwebs system prompt.

### 2. Three.js 3D Hero Scene (`src/components/Hero3DScene.tsx`)
- Build a modular 3D scene conforming to the `threejs` skill:
  - **Procedural Composite Model**: 5-part hierarchical `THREE.Group` consisting of:
    1. Outer beveled obsidian prism monolith with faceted geometry and reflective dark PBR material (`roughness: 0.15`, `metalness: 0.85`).
    2. Floating glowing amber core (`MeshStandardMaterial` with emissive `#dd6b4d` radiance).
    3. Orbital counter-rotating brushed bronze ring (`TorusGeometry`).
    4. Orbiting obsidian satellite crystal shards.
    5. Ambient ember particle constellation (`Points` with custom procedural soft particle texture).
  - **Studio Lighting**: Warm key directional light paired with cool subtle ambient light for dramatic edge illumination.
  - **Performance & Mobile Optimization**:
    - Automatic detection of mobile viewports (`window.innerWidth < 768` or touch devices) to bypass WebGL canvas rendering, preserving 100/100 Core Web Vitals and battery life.
    - Damped mouse/cursor parallax tracking (`1 - Math.exp(-5 * dt)`).
    - Full resource lifecycle cleanup on unmount (`geometry.dispose()`, `material.dispose()`, `renderer.dispose()`, `cancelAnimationFrame`).
- Embed inside `src/components/HeroSection.tsx` in a non-blocking background layer (`pointer-events-none`), maintaining high contrast with the hero headline and CTA buttons.

### 3. Voice Conversations Component (`src/components/VoiceAssistantModal.tsx`)
- Build a floating voice pill in the bottom-right corner:
  - Sleek Obsidian Dark button with sound-wave icon, subtle amber pulse ring, and tooltip "Live Voice Assistant".
- Interactive Audio Orb Modal:
  - Canvas-based glowing audio visualizer with dynamic sine/frequency waves reflecting microphone input and audio output.
  - Microphone access with permission handling, live speech detection, and volume meter.
  - Real-time conversation loop:
    - User speaks -> audio recorded / transcribed -> sent to backend `/api/voice-chat` or `/api/chat` powered by Gemini -> response spoken back with synthesized natural voice playback (`SpeechSynthesis` / audio playback).
    - Real-time transcript display with turn-by-turn history.
    - Quick action chips: "Çfarë shërbimesh ofroni?", "Sa kushton një uebfaqe?", "Sa zgjat zhvillimi?", "Dua një demo falas".
    - Controls: Mute/Unmute microphone, Pause, End Call, and Direct WhatsApp transfer button.

### 4. Server API Enhancements (`server.ts`)
- Add `/api/voice-chat` endpoint configured with `gemini-3.8-flash` or `gemini-3.8-live` handling voice conversation turns with Starwebs domain knowledge, formatted for natural speech responses (concise, conversational, in Albanian and English).

### 5. Verification & Testing
- Compile and lint checks: `lint_applet` and `compile_applet`.
- Verify mobile responsiveness: ensure 3D scene sleeps/hides gracefully on mobile screens without lagging.
- Test voice assistant pill launch, microphone toggle, audio orb animations, speech synthesis playback, and modal controls.
