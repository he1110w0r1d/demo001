---
name: Emotion Buffer Card
colors:
  surface: '#13131b'
  surface-dim: '#13131b'
  surface-bright: '#393841'
  surface-container-lowest: '#0d0d15'
  surface-container-low: '#1b1b23'
  surface-container: '#1f1f27'
  surface-container-high: '#292932'
  surface-container-highest: '#34343d'
  on-surface: '#e4e1ed'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e4e1ed'
  inverse-on-surface: '#303038'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#ddb7ff'
  on-secondary: '#490080'
  secondary-container: '#6f00be'
  on-secondary-container: '#d6a9ff'
  tertiary: '#ffb783'
  on-tertiary: '#4f2500'
  tertiary-container: '#d97721'
  on-tertiary-container: '#452000'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb7ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6900b3'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#703700'
  background: '#13131b'
  on-background: '#e4e1ed'
  surface-variant: '#34343d'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-margin: 20px
  gutter: 12px
---

## Brand & Style
The design system is centered on the concept of a "Digital Sanctuary"—a high-tech yet deeply human space designed to intercept and soften the impact of emotional triggers in fast-paced media environments. It targets a Gen-Z and Millennial demographic who are digitally native but seeking emotional equilibrium.

The style is a fusion of **Glassmorphism** and **Futuristic Minimalism**. It utilizes the physics of light, transparency, and soft refraction to create a sense of depth and ethereal beauty. Unlike clinical health apps, this design system feels like a "companion" or a "soft interface" for the soul, using organic, undulating shapes and vibrant light-leaks to evoke a sense of living, breathing technology that cares.

## Colors
The palette is rooted in a deep, nocturnal background to allow gradients and glass effects to glow with maximum luminance.

- **Primary & Secondary:** A continuous Blue-to-Purple gradient represents the flow of thoughts and the AI's processing power.
- **Accent Pink:** Used sparingly for "emotional highlights"—moments of breakthrough, self-care prompts, or "heart" interactions.
- **Emotional States:** 
    - **Red-Orange (#FB923C):** Represents "Heat" or "Friction" (Stress/Anger), used to alert the user to a high-trigger moment.
    - **Pale Purple & Light Blue:** Represent "Cooling" or "Stillness."
- **Glass System:** Backgrounds use a semi-transparent white or indigo tint with heavy backdrop-blur (20px+) to maintain legibility while feeling lightweight.

## Typography
The typography system prioritizes warmth and clarity. **Plus Jakarta Sans** is used for headings to provide a friendly, optimistic, and geometric look that feels modern and approachable. For body text and labels, **Be Vietnam Pro** offers a contemporary, clean aesthetic that ensures high legibility, especially for bilingual interfaces where Chinese characters need to sit harmoniously with Latin numerals and text.

For Chinese character rendering, utilize a system-fallback to a clean, modern sans-serif (e.g., PingFang SC or Noto Sans SC) with generous line-height to prevent visual fatigue during "healing" sessions. Large headings should use slightly tighter letter-spacing for a more impactful, "editorial" feel.

## Layout & Spacing
This design system utilizes a **Fluid Grid** model optimized for mobile-first consumption, mirroring the aspect ratio of short-video platforms.

- **Rhythm:** A 4px baseline grid ensures consistent vertical rhythm.
- **Safe Areas:** Elements must maintain a 20px "Safe Margin" from the screen edges to avoid overlap with native OS or video platform UI elements.
- **Flow:** Layouts should be center-weighted. Primary interactions (the "Buffer Cards") occupy the center 90% of the viewport width.
- **Reflow:** On tablet or desktop, the layout transitions to a multi-column "Board" view where cards are arranged in a masonry style, maintaining their 9:16 or 4:5 aspect ratios.

## Elevation & Depth
Elevation is achieved through **Luminous Layers** rather than traditional shadows. 

1.  **Level 0 (Base):** The deep indigo background (#0F172A).
2.  **Level 1 (Surface):** Standard cards with a 40% opacity blur and a 1px soft white stroke.
3.  **Level 2 (Active):** High-interaction elements that use a "Glow" shadow. The shadow should match the color of the element (e.g., a purple button has a soft purple glow) with a 20px blur and 15% opacity.
4.  **Level 3 (Overlay):** Full-screen "Buffer" states that use a heavy backdrop blur (40px) to completely isolate the user from the background content, creating a temporary private room.

Avoid black shadows; use tinted shadows to maintain the "healing" and "light-based" aesthetic.

## Shapes
The shape language is dominated by **Organic Fluidity**. Sharp corners are strictly avoided to minimize visual "aggression."

- **Cards & Buttons:** Use high-radius corners (Pill-shaped) to evoke a sense of friendliness and safety.
- **Organic Orbs:** Behind the glass layers, use "Floating Bubbles" (circles with radial gradients) that move slowly. These represent the AI's "breath" or the user's current emotional energy.
- **Dividers:** Use soft, tapered lines or simply whitespace rather than hard lines.

## Components
- **The Buffer Card:** The signature component. A glassmorphic pane that slides over the video. It features a top "Glow Bar" that changes color based on detected emotion (e.g., Orange for stress).
- **Glass Buttons:** Primary buttons use the Blue-to-Purple gradient. Secondary buttons use a transparent glass style with a vibrant border.
- **Emotional Sliders:** Rounded, thick tracks with a glowing "thumb" indicator for users to input their mood.
- **Chips (Pulse Tags):** Small, pill-shaped tags used for emotional labels (e.g., "Anxious," "Calm"). These should have a slight "pulse" animation when selected.
- **Input Fields:** Minimalist containers with a 1px border that glows when focused.
- **The Breath Indicator:** A large, central organic shape that expands and contracts, guiding the user through breathing exercises. It should have a soft, blurred outer glow.
- **Healing Lists:** List items are separated by generous spacing and housed in individual glass containers rather than a single contiguous list.