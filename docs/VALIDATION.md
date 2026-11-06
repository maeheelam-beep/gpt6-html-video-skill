# Validation

Verified on Windows with Node.js 24.16.0, FFmpeg/FFprobe 8.1.1, Chrome 156, and Playwright Core 1.63.0.

- Skill format and local documentation references validated.
- Four unit tests cover valid geometry, failures, missing assertions, and invalid numeric values.
- Existing nonempty project directories are not overwritten.
- A starter project cannot be rendered as a finished deliverable without an explicit testing override.
- The bundled runtime was tested without any installed sibling skills: 640×360, 12 fps, 2 seconds, 24 frames, silent H.264 MP4.
- Metadata, frame count, audio absence, and full decoding passed. Review output generated successfully.
- Project-defined content assertions are reported as unverified when absent; geometry success is not presented as content correctness.

The bundled QA does not measure loudness, detect black/flash frames, or judge visual quality. Such checks require appropriate additional tools or actual review. This validation does not claim that all 3D engines, external services, or every possible animation style have been tested.

Run unit tests:

```bash
npm --prefix skills/video-director ci
npm --prefix skills/video-director test
```
# Published example suite

Five original examples (product, data, science, typography, interface) were rendered using the bundled backend at 960×540, 24 fps, 8 seconds, 192 frames each, without audio. All five passed metadata, frame count, audio-presence and full-decode checks. Encoded frames were visually sampled at multiple times for layout, clipping and content. GIF previews are reduced to 480×270 at 10 fps. System fonts may vary; these examples do not validate arbitrary future content, environments or advanced rendering features.
