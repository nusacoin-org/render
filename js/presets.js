// js/presets.js

export const STYLE_DATA = {
  "Modern Minimalist": {
    palette: "a restrained palette of white, light grey and black",
    materials: "matte painted walls, a polished concrete or microcement floor, black powder-coated window frames and frosted glass partitions",
    furniture: "a low-profile modular sofa in bouclé, sleek engineered-wood cabinetry, and nothing else fighting for attention",
    lighting_fixtures: "recessed LED downlights, a hidden cove of light tracing the ceiling edge, one sculptural pendant lamp and a slim linear floor lamp",
    vegetation_indoor: "a single, architectural indoor plant — a fiddle-leaf fig or snake plant — standing in a concrete planter",
    vegetation_outdoor: "a manicured lawn, crisply trimmed hedges, a few frangipani or slender palms placed with real intention, and a minimalist gravel bed",
    ground_materials: "large-format grey paving and a smooth, broom-finished concrete surface",
    vibe: "clean, refined and quietly confident"
  },
  "Scandinavian Warm": {
    palette: "a warm, gentle palette of cream, light oak and soft beige",
    materials: "light oak flooring, whitewashed timber panelling and soft linen upholstery against matte white walls",
    furniture: "a rounded solid-wood dining table, a chunky wool rug underfoot, and a woven rattan accent chair in the corner",
    lighting_fixtures: "a warm-white pendant with a paper or rattan shade, a fabric table lamp, and candles gathered on the windowsill",
    vegetation_indoor: "potted pothos, a loose eucalyptus arrangement in a ceramic vase, and a small fern catching the window light",
    vegetation_outdoor: "silver birch trees, a relaxed wildflower bed, and a mossy stone path winding through it",
    ground_materials: "a pale timber deck and a loose gravel path bordered by low planting",
    vibe: "cozy, unhurried and deeply inviting"
  },
  "Industrial Loft": {
    palette: "a moody palette of charcoal, rust and raw concrete grey",
    materials: "an exposed red-brick wall, a raw sealed concrete floor, blackened steel beams overhead and aged reclaimed wood underfoot",
    furniture: "a worn leather Chesterfield sofa, black metal-frame shelving, and a few vintage factory stools",
    lighting_fixtures: "bare Edison filament bulbs, black wire-cage pendants, and wall-mounted industrial sconces",
    vegetation_indoor: "one oversized fiddle-leaf fig or trailing ivy in a raw steel planter, a soft green counterpoint to all that hard material",
    vegetation_outdoor: "sparse urban planting, ornamental grasses, weathered concrete planters and ivy climbing the brick facade",
    ground_materials: "dark exposed-aggregate concrete or worn asphalt",
    vibe: "moody, raw and full of character"
  },
  "Tropical Luxury": {
    palette: "a rich palette of deep green, natural wood and warm gold",
    materials: "teak wood panelling, natural stone flagstone, woven rattan and bamboo accents, and brushed brass fittings",
    furniture: "woven rattan lounge chairs, a teak daybed dressed in linen cushions, and carved wooden side tables",
    lighting_fixtures: "warm rattan pendant lanterns, soft uplighters at the base of the palms, and string lights tracing the edge of the terrace",
    vegetation_indoor: "tall potted palms, broad monstera leaves and a cluster of orchids near the window",
    vegetation_outdoor: "coconut palms, banana trees, dense tropical hedging, blooming frangipani and an infinity pool mirroring all of that greenery",
    ground_materials: "natural stone tile and warm timber decking",
    vibe: "opulent, breezy and unmistakably resort-like"
  },
  "Japandi Style": {
    palette: "a muted, earthy palette of warm beige, soft clay and black accents",
    materials: "natural oak joinery, matte black steel details, a textured washi-paper-like wall finish and tatami-inspired flooring",
    furniture: "a low wooden platform seating area, handcrafted ceramic vases and nothing more than it needs",
    lighting_fixtures: "a paper-lantern pendant, warm recessed lighting, and a small andon-style tabletop lamp",
    vegetation_indoor: "a single bonsai or ikebana arrangement beside a potted bamboo stalk",
    vegetation_outdoor: "a raked zen gravel garden, a clipped Japanese maple, patches of soft moss and natural stepping stones",
    ground_materials: "fine raked gravel and a natural-stone stepping path",
    vibe: "serene, tranquil and deliberately understated"
  }
};

export const CAMERA_STYLE = {
  rendering: "Simulated professional architectural photography equipment: a 35mm-equivalent lens at f/8 aperture, an architectural tilt-shift lens effect keeping every vertical line perfectly straight, precise two-point perspective, deep depth of field with sharp focus across the entire image, and zero lens distortion.",
  photography: "Captured as if with a professional medium-format camera paired with a high-quality tilt-shift lens equivalent to roughly 24–35mm full-frame focal length, aperture between f/8 and f/11 for maximum edge-to-edge sharpness and deep depth of field, perfectly corrected verticals with precise two-point perspective, natural RAW photographic rendering with subtle optical imperfections, minimal chromatic aberration and restrained film grain, and absolutely no CGI distortion or artificial HDR processing. Frame it like an editorial architectural photograph: balanced negative space, a natural foreground element framing the subject, and a carefully considered eye-level or elevated vantage point."
};

export const MATERIAL_QUALITY = {
  rendering: "Materials must exhibit physically believable properties: accurate surface roughness, realistic PBR (physically based rendering) textures, realistic reflections, subtle imperfections, proper scale, and natural aging — clean and contemporary, never flat or plastic-looking.",
  photography: "Materials must exhibit hyper-realistic physical properties and real-world weathering: subtle dirt near the ground, faint water stains on exterior walls, micro-scratches, uneven reflections and natural aging, so every surface looks tactile and lived-in, reacting to light exactly as it does in the real world — never pristine or artificially clean."
};

export const RENDERING_LIGHTING = {
  classic_daylight: { name: "Classic Daylight", phrase: "Bright clear midday sunlight, crisp and sharp directional shadows, high-quality clear sky HDRI environment, physically accurate path-traced light bounces, realistic global illumination (GI), subtle ambient occlusion (AO), high contrast, vibrant yet natural architectural lighting." },
  tropical_morning: { name: "Tropical Morning", phrase: "Fresh tropical morning sunlight, soft warm directional light, bright blue sky HDRI environment with subtle scattered clouds, physically accurate path-traced light bounces, realistic global illumination (GI), gentle ambient occlusion (AO), balanced exposure, crisp natural shadows, vibrant tropical atmosphere, highly photorealistic architectural lighting." },
  golden_hour: { name: "Golden Hour", phrase: "Cinematic golden hour lighting, low sun angle, warm orange and soft magenta sky, long soft directional shadows, high-quality sunset HDRI lighting, physically accurate path-traced light bounces, realistic global illumination (GI), glowing atmosphere, natural atmospheric depth." },
  blue_hour_twilight: { name: "Blue Hour / Twilight", low_light: true, phrase: "Deep blue hour evening sky, twilight atmosphere, cool ambient exterior light contrasting with warm glowing interior lights, high-quality twilight HDRI environment, physically accurate path-traced light bounces, realistic global illumination (GI), illuminated landscape features, rich cinematic architectural mood." }
};

export const PHOTOGRAPHY_LIGHTING = {
  golden_hour: { name: "Golden Hour", phrase: "Soft golden hour sunlight piercing through adjacent trees, long dynamic shadows across the facade, warm amber hues beautifully contrasting with cool ambient shadow light, un-staged natural lighting, realistic exposure falloff." },
  overcast: { name: "Overcast", phrase: "Overcast sky with soft diffused natural lighting, flat but moody contrast, subtle environmental bounce light from the ground, zero harsh shadows, slight atmospheric haze emphasizing physical textures." },
  blue_hour: { name: "Blue Hour", low_light: true, phrase: "Blue hour dusk natural lighting, deep indigo sky, perfectly balanced with warm artificial interior lights glowing softly through the architectural glass, subtle exterior landscape lighting, realistic high dynamic range." }
};

export const RENDERING_OUTPUT = {
  archdaily_standard: { name: "ArchDaily Standard", phrase: "Highly detailed photorealistic architectural visualization, V-Ray or Corona render engine style, physically believable materials, crisp details, balanced color grading, natural reflections, architectural photography, hyper-detailed, 8k resolution, style of ArchDaily and Dezeen." },
  architectural_digest: { name: "Architectural Digest", phrase: "High-end luxury architectural visualization, FStorm render style, rich and warm color palette, sophisticated polished finish, highly realistic material reflections, inviting lifestyle atmosphere, editorial architectural photography, style of Architectural Digest." }
};

export const PHOTOGRAPHY_OUTPUT = {
  iwan_baan: { name: "Iwan Baan", phrase: "Authentic editorial architectural photography, documentary style of Iwan Baan, showing the architecture integrating with its real-world messy context, raw, un-staged, lived-in atmosphere, featured on the front page of ArchDaily, completely eliminating CGI aesthetic." },
  rory_gardiner: { name: "Rory Gardiner", phrase: "Architectural photography inspired by Rory Gardiner, characterized by calm compositions, refined natural lighting, subtle environmental atmosphere, muted yet accurate color palette, exceptional attention to proportion, material texture, and spatial silence, elegant editorial photography with timeless architectural presence." }
};
