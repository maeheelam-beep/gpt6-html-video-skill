<p align="center"><img src="docs/hero.svg" alt="Your brief. Your style. HTML to video." width="100%"></p>

# GPT6 HTML Video Skill

### Your brief. Your style. Editable HTML, rendered as video.

A demand-driven animation skill for GPT-6 / Codex. Bring an idea, a script, a reference, or an existing project. Build with HTML/CSS, SVG, Canvas, or WebGL, keep the source, and render the result to video.

[中文](README.md) · [English](README.en.md) · [日本語](README.ja.md)

## What makes it useful

- **The brief leads.** No prescribed visual style, duration, shot count, palette, or soundtrack.
- **The source stays editable.** Change the copy, layout, motion, timing, and assets.
- **A practical export path.** Seek browser animation to a known time, capture frames, encode with FFmpeg.
- **Optional review tools.** Inspect frame sheets and project-defined checks; automated success is not a substitute for watching the result.
- **Start independently.** A basic runtime is included. An installed, adapted `motion-showreel` can provide additional rendering and QA capabilities.

## Try a brief

```text
Use $video-director to turn this product brief into an HTML animation video.
Follow the attached brand guidelines. Emphasize the interaction experience.
Deliver the video and editable source.
```

Provide as much or as little direction as you want. Discussion, preview approvals, captions, narration, music, and output formats follow the current request.

## Install

Ask the Codex skill installer to install:

```text
https://github.com/maeheelam-beep/gpt6-html-video-skill/tree/main/skills/video-director
```

Or copy `skills/video-director` into your user skills directory. For the native helper commands, run `npm ci` in the **installed skill directory**. Prerequisites: Node.js 20+, FFmpeg/FFprobe, and Chrome, Chromium, or Edge. Set `CHROME_PATH` if browser discovery fails.

To use the repository directly:

```bash
git clone https://github.com/maeheelam-beep/gpt6-html-video-skill.git
cd gpt6-html-video-skill
npm --prefix skills/video-director ci
node skills/video-director/scripts/studio.mjs doctor
```

Optional commands:

```bash
node skills/video-director/scripts/studio.mjs init my-film --duration 20 --size 1920x1080 --fps 24 --audio none
# Implement your content, then set starter=false in project.json.
node skills/video-director/scripts/studio.mjs render my-film --out film.mp4
node skills/video-director/scripts/studio.mjs qa my-film/film.mp4 --project my-film
node skills/video-director/scripts/studio.mjs review my-film
```

These are helpers, not a prescribed creative sequence. Existing projects may keep their own build pipeline.

## Scope

The bundled renderer supports one worker/sample, H.264 MP4, and mixing an existing audio file. Basic QA covers metadata, frame count, audio presence, and full decoding. Advanced motion blur, black-frame detection, and audio metering require suitable additional tools. Video-generation models, TTS, character assets, and complex 3D depend on the actual environment and authorization.

See [validation](docs/VALIDATION.md), [skill instructions](skills/video-director/SKILL.md), and [announcement copy](docs/ANNOUNCEMENTS.md).

Inspired by and integrating optional capabilities from [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar), [Garden Skills](https://github.com/ConardLi/garden-skills), and [AI Animation](https://github.com/Unclecheng-li/AI_Animation). No historical user projects or upstream media collections are bundled.

[MIT](LICENSE). Third-party assets and dependencies retain their own licenses. Community project; not affiliated with or endorsed by OpenAI.
