// js/engine.js

import { 
  STYLE_DATA, 
  CAMERA_STYLE, 
  MATERIAL_QUALITY, 
  RENDERING_LIGHTING, 
  PHOTOGRAPHY_LIGHTING, 
  RENDERING_OUTPUT, 
  PHOTOGRAPHY_OUTPUT 
} from './presets.js';

const GEOMETRY_LOCK_STATEMENT = 
  "This is a photographic visualization of the exact 3D model shown in the reference image — not a redesign. " +
  "Preserve the building's massing, floor plan, roof form, wall placement, structural grid, and every window " +
  "and door opening exactly as modeled: same size, same position, same proportions, same number of storeys. " +
  "Do not invent, remove, resize, reshape, or reposition any architectural element, and do not change the " +
  "camera's viewpoint, framing, or perspective. Every change below applies only to materials, textures, " +
  "lighting, atmosphere and photographic finish — the architecture itself is fixed ground truth.";

const GEOMETRY_LOCK_REMINDER = 
  "Non-negotiable final constraint: the building's form, proportions and camera framing must match the " +
  "source model exactly — this is a lighting, material and atmosphere upgrade only, never a structural " +
  "or architectural redesign.";

const REALISM_BOOSTER = 
  "Treat this as an award-winning architectural photograph, not a 3D render — shot by a professional " +
  "architectural photographer on a full-frame camera with a tilt-shift lens so every vertical line stays " +
  "perfectly true and parallel, tripod-stable with a level horizon: correct human-scale proportions, " +
  "physically-based global illumination pooling naturally into corners, soft ambient occlusion in every " +
  "crevice and joint, physically accurate ray-traced reflections and refractions with soft, grounded shadow " +
  "falloff, subtle micro-imperfections and a faint trace of dust catching the light, crisp material " +
  "micro-detail down to individual grain and texture, and a natural depth of field with gentle bokeh " +
  "falloff — rendered at 8K resolution, physically-based, magazine-quality, and utterly indistinguishable " +
  "from a real photograph.";

export function buildPrompt({ type, style, track, lightingKey, outputKey, contextItems = [] }) {
  const isExterior = type.toLowerCase() === "exterior";
  const currentTrack = track === "photography" ? "photography" : "rendering";
  const styleData = STYLE_DATA[style] || STYLE_DATA["Modern Minimalist"];

  // Select Library
  const lightingLib = currentTrack === "photography" ? PHOTOGRAPHY_LIGHTING : RENDERING_LIGHTING;
  const outputLib = currentTrack === "photography" ? PHOTOGRAPHY_OUTPUT : RENDERING_OUTPUT;

  const lighting = lightingLib[lightingKey] || Object.values(lightingLib)[0];
  const output = outputLib[outputKey] || null;

  const parts = [];

  // 1. Geometry Lock & Camera
  parts.push(GEOMETRY_LOCK_STATEMENT);
  parts.push("Camera angle and framing are locked exactly as set in the provided reference image view, held at eye level with zero distortion.");
  parts.push(CAMERA_STYLE[currentTrack]);

  // 2. Lighting Setup
  parts.push(`Lighting setup — ${lighting.name}: ${lighting.phrase}`);

  // 3. Subject Focus
  const baseSubject = isExterior ? "architectural exterior facade" : "architectural interior";
  parts.push(`This is a ${baseSubject} render of the full scene, preserving every wall, opening, and spatial volume shown in the screenshot.`);

  // 4. Style, Materials, and Furniture
  parts.push(`Rendered in ${style}, the space carries a ${styleData.vibe} atmosphere, built around ${styleData.palette}, finished in ${styleData.materials}, and furnished with ${styleData.furniture}.`);

  // 5. Vegetation
  if (isExterior) {
    parts.push(`Outside, the landscaping stays consistent: ${styleData.vegetation_outdoor}.`);
    parts.push(`Underfoot and along the approach, ${styleData.ground_materials} ground the whole composition.`);
  } else {
    parts.push(`Indoors, ${styleData.vegetation_indoor} soften the room, while glimpses through the openings reveal ${styleData.vegetation_outdoor} just beyond.`);
  }

  // 6. Lighting Fixtures
  if (lighting.low_light) {
    parts.push(`As daylight fades, artificial fixtures take over — ${styleData.lighting_fixtures} — casting a warm, layered glow.`);
  } else {
    parts.push(`By day, ${styleData.lighting_fixtures} sit as quiet accents without competing with natural sunlight.`);
  }

  // 7. Context Items (Optional tags/site elements parsed from user input)
  if (contextItems.length > 0) {
    parts.push(`Key site elements present in the reference view include: ${contextItems.join(', ')}.`);
  }

  // 8. Physical Quality & Realism Booster
  parts.push(MATERIAL_QUALITY[currentTrack]);
  parts.push(REALISM_BOOSTER);

  // 9. Output Direction
  if (output) {
    const label = currentTrack === "photography" ? "in the documentary/editorial style of" : "in the visual language of";
    parts.push(`Output direction — ${output.name}: ${output.phrase} Render ${label} ${output.name}.`);
  }

  // 10. Final Reminder
  parts.push(GEOMETRY_LOCK_REMINDER);

  return parts.join(" ");
}