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

// Added: the model kept re-tinting window/door frames (kusen) and other
// already-visible materials to match whatever color the selected style's
// text happened to imply (e.g. "black powder-coated frames"), which is why
// the same building came out with a different kusen color on every angle.
// This statement makes explicit that any material already visible/colored
// in the reference image is fixed ground truth, same as the geometry —
// the style below only fills in gaps, it never overrides what's already there.
const MATERIAL_FIDELITY_LOCK =
  "Critical material fidelity rule: any material, finish, or color already visible in the reference image — " +
  "window frames, door frames, roof covering, wall cladding, trim, and structural elements (kusen included) — " +
  "must be reproduced exactly as shown, same hue and same finish. The design style described below only " +
  "governs surfaces and elements that are not already defined in the source model (general ambience, staging, " +
  "furnishing, and landscaping); it must never repaint, retint, or reinterpret a material that already has a " +
  "color in the reference image.";

const GEOMETRY_LOCK_REMINDER = 
  "Non-negotiable final constraint: the building's form, proportions and camera framing must match the " +
  "source model exactly — this is a lighting, material and atmosphere upgrade only, never a structural " +
  "or architectural redesign. Original material colors already present in the reference image (window/door " +
  "frames included) must remain untouched.";

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

// Added: clauses in the lighting/output preset libraries were written for
// exterior scenes (sky, HDRI, landscape, foliage, pool, etc). When those
// clauses leaked into an interior prompt unchanged, Gemini would sometimes
// "open up" a wall or door to justify the sky/landscape language — this is
// the other half of the sofa/living-room-opens-to-outside bug (the other
// half was furniture always being injected, fixed below).
const EXTERIOR_ONLY_PATTERN = new RegExp(
  [
    "\\bsky\\b", "\\bhdri\\b", "\\blandscap\\w*\\b", "\\bfacade\\b", "\\bfaçade\\b",
    "\\bvegetation\\b", "\\bfoliage\\b", "\\blawn\\b", "\\bgarden\\b", "\\bgrass\\b",
    "\\bcanopy\\b", "\\bpavement\\b", "\\basphalt\\b", "\\bpool\\b", "\\bocean\\b",
    "\\bsea\\b", "\\bcoastal\\b", "\\bmarine\\b", "\\bmountain\\b", "\\bhills?\\b",
    "\\bcloud(s|y)?\\b", "\\bstorm\\b", "\\bmist\\b", "\\bfog\\b", "\\brain\\b",
    "\\brainy\\b", "\\bwildflower\\b", "\\bmoss\\b", "\\bbirch\\b", "\\bpalms?\\b",
    "\\bhedges?\\b", "\\btrees?\\b", "\\bfrangipani\\b", "\\bexterior\\b",
    "\\boutdoor\\b", "\\bsite elements?\\b", "\\benvironment\\b"
  ].join("|"),
  "i"
);

function sanitizeForInterior(phrase) {
  if (!phrase) return phrase;
  const clauses = phrase.split(",").map(c => c.trim()).filter(Boolean);
  const kept = clauses.filter(c => !EXTERIOR_ONLY_PATTERN.test(c));

  if (kept.length === 0 || kept.length < clauses.length * 0.4) {
    return "Soft, evenly diffused daylight quality appropriate for an enclosed interior space, physically accurate global illumination, natural shadow gradients, no visible sky or outdoor scenery implied";
  }
  return kept.join(", ");
}

export function buildPrompt({ type, style, track, lightingKey, outputKey, contextItems = [] }) {
  const isExterior = type.toLowerCase() === "exterior";
  const currentTrack = track === "photography" ? "photography" : "rendering";
  const styleData = STYLE_DATA[style] || STYLE_DATA["Modern Minimalist"];

  // Select Library
  const lightingLib = currentTrack === "photography" ? PHOTOGRAPHY_LIGHTING : RENDERING_LIGHTING;
  const outputLib = currentTrack === "photography" ? PHOTOGRAPHY_OUTPUT : RENDERING_OUTPUT;

  const lighting = lightingLib[lightingKey] || Object.values(lightingLib)[0];
  const output = outputLib[outputKey] || null;

  // Strip exterior-only clauses (sky/landscape/etc) out of interior prompts
  // so they can't be used to justify opening up a wall or door.
  const lightingPhrase = isExterior ? lighting.phrase : sanitizeForInterior(lighting.phrase);
  const outputPhrase = output ? (isExterior ? output.phrase : sanitizeForInterior(output.phrase)) : null;

  const parts = [];

  // 1. Geometry Lock, Material Fidelity Lock & Camera
  parts.push(GEOMETRY_LOCK_STATEMENT);
  parts.push(MATERIAL_FIDELITY_LOCK);
  parts.push("Camera angle and framing are locked exactly as set in the provided reference image view, held at eye level with zero distortion.");
  parts.push(CAMERA_STYLE[currentTrack]);

  // 2. Lighting Setup
  parts.push(`Lighting setup — ${lighting.name}: ${lightingPhrase}`);

  // 3. Subject Focus
  const baseSubject = isExterior ? "architectural exterior facade" : "architectural interior";
  parts.push(`This is a ${baseSubject} render of the full scene, preserving every wall, opening, and spatial volume shown in the screenshot.`);

  // 3b. Interior-specific opening lock — this only exists because renders
  // kept turning solid interior doors/walls into openings onto the exterior.
  if (!isExterior) {
    parts.push(
      "This interior space is enclosed exactly as modeled: do not add, enlarge, or reinterpret any door, wall, " +
      "or opening as a view to the outside. Every door stays a solid, closed door and every wall stays a solid " +
      "wall unless a window is already explicitly present in the reference image — no new sky, landscape, or " +
      "exterior scenery may be introduced anywhere in the frame."
    );
  }

  // 4. Style & Materials — furniture only makes sense (and is only safe to
  // request) when the render is an interior; injecting living-room furniture
  // language into an exterior prompt was the main cause of sofas/interiors
  // appearing to "open up" through the facade.
  if (isExterior) {
    parts.push(`Rendered in ${style}, the exterior carries a ${styleData.vibe} atmosphere, built around ${styleData.palette}, finished in ${styleData.materials}.`);
  } else {
    parts.push(`Rendered in ${style}, the space carries a ${styleData.vibe} atmosphere, built around ${styleData.palette}, finished in ${styleData.materials}, and furnished with ${styleData.furniture}.`);
  }

  // 5. Vegetation
  if (isExterior) {
    parts.push(`Outside, the landscaping stays consistent: ${styleData.vegetation_outdoor}.`);
    parts.push(`Underfoot and along the approach, ${styleData.ground_materials} ground the whole composition.`);
  } else {
    parts.push(
      `Indoors, ${styleData.vegetation_indoor} soften the room. If — and only if — a window to the outside is ` +
      `already visible in the reference image, whatever lies beyond it should read as ${styleData.vegetation_outdoor}; ` +
      `otherwise no exterior view should appear at all.`
    );
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
    parts.push(`Output direction — ${output.name}: ${outputPhrase} Render ${label} ${output.name}.`);
  }

  // 10. Final Reminder
  parts.push(GEOMETRY_LOCK_REMINDER);

  return parts.join(" ");
}
