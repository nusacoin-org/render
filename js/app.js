// js/app.js - Full Standalone Prompter Engine & UI Controller

// ================================================================
// 1. DATABASE PRESETS & CONFIGURATION
// ================================================================

const STYLE_DATA = {
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

const CAMERA_STYLE = {
  rendering: "Simulated professional architectural photography equipment: a 35mm-equivalent lens at f/8 aperture, an architectural tilt-shift lens effect keeping every vertical line perfectly straight, precise two-point perspective, deep depth of field with sharp focus across the entire image, and zero lens distortion.",
  photography: "Captured as if with a professional medium-format camera paired with a high-quality tilt-shift lens equivalent to roughly 24–35mm full-frame focal length, aperture between f/8 and f/11 for maximum edge-to-edge sharpness and deep depth of field, perfectly corrected verticals with precise two-point perspective, natural RAW photographic rendering with subtle optical imperfections, minimal chromatic aberration and restrained film grain, and absolutely no CGI distortion or artificial HDR processing. Frame it like an editorial architectural photograph: balanced negative space, a natural foreground element framing the subject, and a carefully considered eye-level or elevated vantage point."
};

const MATERIAL_QUALITY = {
  rendering: "Materials must exhibit physically believable properties: accurate surface roughness, realistic PBR (physically based rendering) textures, realistic reflections, subtle imperfections, proper scale, and natural aging — clean and contemporary, never flat or plastic-looking.",
  photography: "Materials must exhibit hyper-realistic physical properties and real-world weathering: subtle dirt near the ground, faint water stains on exterior walls, micro-scratches, uneven reflections and natural aging, so every surface looks tactile and lived-in, reacting to light exactly as it does in the real world — never pristine or artificially clean."
};

// ================================================================
// 2. LIGHTING & OUTPUT LIBRARIES (FULL 100% PORT)
// ================================================================

const RENDERING_LIGHTING = {
  auto: { name: "Auto (Default Daylight)", low_light: false, phrase: "Bright clear midday sunlight, crisp directional shadows, clear sky HDRI, physically accurate path-traced light bounces, realistic global illumination (GI)." },
  classic_daylight: { name: "Classic Daylight", low_light: false, phrase: "Bright clear midday sunlight, crisp and sharp directional shadows, high-quality clear sky HDRI environment, physically accurate path-traced light bounces, realistic global illumination (GI), subtle ambient occlusion (AO), high contrast, vibrant yet natural architectural lighting." },
  tropical_morning: { name: "Tropical Morning", low_light: false, phrase: "Fresh tropical morning sunlight, soft warm directional light, bright blue sky HDRI environment with subtle scattered clouds, physically accurate path-traced light bounces, realistic global illumination (GI), gentle ambient occlusion (AO), balanced exposure, crisp natural shadows, vibrant tropical atmosphere, highly photorealistic architectural lighting." },
  fresh_morning: { name: "Fresh Morning", low_light: false, phrase: "Soft early morning daylight, delicate cool-white sunlight, lightly diffused atmospheric clarity, pale blue HDRI sky, physically accurate path-traced light bounces, realistic global illumination (GI), soft ambient occlusion (AO), subtle morning freshness, gentle shadow transitions, calm and inviting architectural atmosphere." },
  bright_midday: { name: "Bright Midday", low_light: false, phrase: "Intense midday sunlight, clear zenith sky HDRI environment, high-energy natural illumination, physically accurate path-traced light transport, realistic global illumination (GI), sharp directional shadows, strong material definition, crisp architectural edges, vibrant realistic colors, maximum visual clarity." },
  warm_afternoon: { name: "Warm Afternoon", low_light: false, phrase: "Warm late afternoon sunlight, rich golden-white illumination, medium sun angle, naturally softened shadows, high-quality HDRI daylight environment, physically accurate path-traced light bounces, realistic global illumination (GI), warm architectural reflections, inviting atmosphere, premium residential lighting." },
  soft_afternoon: { name: "Soft Afternoon", low_light: false, phrase: "Gentle afternoon daylight, balanced warm-neutral sunlight, soft directional illumination, lightly diffused HDRI environment, physically accurate path-traced light bounces, realistic global illumination (GI), moderate shadow contrast, natural material response, elegant architectural atmosphere, refined editorial lighting." },
  golden_hour: { name: "Golden Hour", low_light: false, phrase: "Cinematic golden hour lighting, low sun angle, warm orange and soft magenta sky, long soft directional shadows, high-quality sunset HDRI lighting, physically accurate path-traced light bounces, realistic global illumination (GI), glowing atmosphere, natural atmospheric depth." },
  early_golden_hour: { name: "Early Golden Hour", low_light: false, phrase: "Early golden hour sunlight, warm golden illumination with subtle neutral highlights, low-angle sun position, elongated soft shadows, high-quality HDRI sunset environment, physically accurate path-traced light bounces, realistic global illumination (GI), balanced atmospheric warmth, premium architectural photography style." },
  sunset_glow: { name: "Sunset Glow", low_light: false, phrase: "Rich sunset illumination, glowing amber sunlight, soft orange and pink atmospheric gradients, long cinematic shadows, realistic HDRI sunset environment, physically accurate path-traced light bounces, realistic global illumination (GI), warm reflective surfaces, emotional architectural atmosphere." },
  tropical_sunset: { name: "Tropical Sunset", low_light: false, phrase: "Tropical sunset lighting, warm orange sunlight blended with soft magenta sky tones, humid atmospheric depth, realistic HDRI tropical sunset environment, physically accurate path-traced light bounces, realistic global illumination (GI), lush vegetation highlights, cinematic architectural ambiance." },
  soft_overcast: { name: "Soft Overcast", low_light: false, phrase: "Soft overcast daylight, diffused white lighting, cloudy sky HDRI environment, zero harsh shadows, incredibly soft ambient light, physically accurate path-traced light bounces, realistic global illumination (GI), pronounced ambient occlusion (AO) in crevices, moody and highly photorealistic architectural atmosphere." },
  bright_overcast: { name: "Bright Overcast", low_light: false, phrase: "Bright overcast daylight, luminous cloud-covered sky HDRI environment, soft diffused natural illumination, physically accurate path-traced light bounces, realistic global illumination (GI), minimal harsh shadows, enhanced material visibility, balanced ambient occlusion (AO), crisp architectural definition, premium editorial lighting." },
  moody_overcast: { name: "Moody Overcast", low_light: false, phrase: "Heavy overcast sky, cool diffused daylight, dramatic cloud HDRI environment, physically accurate path-traced light transport, realistic global illumination (GI), soft low-contrast shadows, subtle atmospheric depth, muted color palette, cinematic architectural mood, highly photorealistic lighting." },
  blue_hour_twilight: { name: "Blue Hour / Twilight", low_light: true, phrase: "Deep blue hour evening sky, twilight atmosphere, cool ambient exterior light contrasting with warm glowing interior lights, high-quality twilight HDRI environment, physically accurate path-traced light bounces, realistic global illumination (GI), illuminated landscape features, rich cinematic architectural mood." },
  luxury_blue_hour: { name: "Luxury Blue Hour", low_light: true, phrase: "Premium blue hour architectural lighting, deep cobalt twilight sky, warm glowing interior illumination, physically accurate path-traced light bounces, realistic global illumination (GI), luxurious artificial lighting balance, elegant landscape lighting, refined material reflections, magazine-quality architectural photography." },
  tropical_twilight: { name: "Tropical Twilight", low_light: true, phrase: "Tropical twilight atmosphere, vibrant deep-blue evening sky, soft warm architectural lighting, humid tropical air, realistic HDRI tropical environment, physically accurate path-traced light bounces, realistic global illumination (GI), illuminated vegetation, cinematic resort ambiance, highly photorealistic." },
  luxury_night: { name: "Luxury Night", low_light: true, phrase: "Premium nighttime architectural lighting, sophisticated warm artificial illumination, dark clear night sky HDRI environment, physically accurate path-traced light transport, realistic global illumination (GI), elegant landscape lighting, subtle reflective surfaces, luxury hospitality ambiance, ultra-photorealistic architectural visualization." },
  resort_night: { name: "Resort Night", low_light: true, phrase: "Warm tropical resort night lighting, soft landscape illumination, inviting architectural lighting composition, realistic HDRI night environment, physically accurate path-traced light bounces, realistic global illumination (GI), illuminated vegetation, subtle water reflections, relaxing hospitality atmosphere." },
  rainy_night: { name: "Rainy Night", low_light: true, phrase: "Wet nighttime environment, reflective rain-soaked surfaces, cool ambient night lighting contrasted by warm architectural lights, realistic rainy HDRI environment, physically accurate path-traced light bounces, realistic global illumination (GI), glossy pavement reflections, cinematic architectural atmosphere." },
  after_rain: { name: "After Rain", low_light: false, phrase: "Fresh post-rain daylight, clean atmospheric conditions, subtle cloud openings, realistic wet material reflections, physically accurate path-traced light transport, realistic global illumination (GI), enhanced vegetation saturation, balanced ambient lighting, premium photorealistic architectural atmosphere." },
  storm_approaching: { name: "Storm Approaching", low_light: false, phrase: "Dramatic pre-storm daylight, dark layered cloud formations, strong atmospheric tension, physically accurate path-traced light transport, realistic global illumination (GI), directional sunlight breaking through clouds, cinematic architectural lighting, highly realistic environmental mood." },
  humid_tropical_air: { name: "Humid Tropical Air", low_light: false, phrase: "Warm humid tropical daylight, soft atmospheric diffusion, gentle haze caused by humidity, realistic HDRI tropical environment, physically accurate path-traced light bounces, realistic global illumination (GI), vibrant vegetation, natural environmental softness, authentic equatorial atmosphere." },
  misty_morning: { name: "Misty Morning", low_light: false, phrase: "Soft morning mist, diffused cold morning sunlight piercing through fog, subtle volumetric lighting rays, high-quality foggy landscape HDRI environment, physically accurate path-traced light bounces, realistic global illumination (GI), deep atmospheric perspective, cinematic and moody architectural tone." },
  crystal_clear_air: { name: "Crystal Clear Air", low_light: false, phrase: "Crystal-clear daylight atmosphere, exceptionally high atmospheric visibility, pristine blue sky HDRI environment, physically accurate path-traced light bounces, realistic global illumination (GI), crisp natural shadows, maximum material clarity, vivid architectural definition, ultra-clean editorial architectural photography." },
  mountain_sunrise: { name: "Mountain Sunrise", low_light: false, phrase: "Fresh mountain sunrise, cool golden morning sunlight, soft atmospheric haze between distant hills, realistic HDRI mountain environment, physically accurate path-traced light bounces, realistic global illumination (GI), gentle volumetric light, calm natural ambiance, premium landscape-integrated architectural lighting." },
  coastal_breeze: { name: "Coastal Breeze", low_light: false, phrase: "Bright coastal daylight, clean marine atmosphere, soft ocean-reflected illumination, realistic HDRI seaside environment, physically accurate path-traced light bounces, realistic global illumination (GI), vibrant natural colors, crisp sunlight, refreshing architectural atmosphere." },
  volumetric_sun_rays: { name: "Volumetric Sun Rays", low_light: false, phrase: "Soft sunlight penetrating through trees or architectural openings, subtle volumetric light beams, realistic atmospheric scattering, physically accurate path-traced light transport, realistic global illumination (GI), delicate ambient occlusion (AO), cinematic architectural atmosphere, highly realistic environmental lighting." },
  soft_interior_daylight: { name: "Soft Interior Daylight", low_light: false, phrase: "Balanced natural daylight entering through large architectural openings, soft indirect illumination, realistic interior light diffusion, physically accurate path-traced light transport, realistic global illumination (GI), subtle ambient occlusion (AO), natural shadow gradients, premium architectural interior photography." },
  courtyard_light: { name: "Courtyard Light", low_light: false, phrase: "Soft enclosed courtyard daylight, reflected natural illumination from surrounding architectural surfaces, realistic ambient sky lighting, physically accurate path-traced light transport, realistic global illumination (GI), soft directional shadows, refined architectural atmosphere, premium editorial lighting." },
  museum_diffused_light: { name: "Museum Diffused Light", low_light: false, phrase: "Museum-quality diffused daylight, perfectly balanced soft illumination, neutral white color temperature, realistic HDRI skylight environment, physically accurate path-traced light transport, realistic global illumination (GI), flawless material rendering, shadow-controlled architectural presentation." },
  editorial_soft_light: { name: "Editorial Soft Light", low_light: false, phrase: "Premium editorial architectural lighting, soft balanced daylight, refined natural contrast, realistic HDRI daylight environment, physically accurate path-traced light bounces, realistic global illumination (GI), elegant material response, subtle ambient occlusion (AO), magazine-quality architectural photography." },
  breathing_facade: { name: "Breathing Facade", low_light: false, phrase: "Balanced natural daylight with integrated warm artificial lighting accents, clear sky HDRI with subtle scattered clouds, physically accurate path-traced light transport, realistic global illumination (GI), gentle shadow transitions from vegetation on the facade, natural material definition for wood, glass, and concrete, a sense of open circulation and freshness, premium architectural composition." },
  tropical_modernism_estate: { name: "Tropical Modernism Estate", low_light: false, phrase: "Intense, clear-sky daylight, equivalent to Bright Midday, highly defined dappled shadows (pattern shadows) from large mature canopy trees cast onto the pavement and lower facade, physically accurate path-traced light transport, realistic global illumination (GI), strong definition of material textures (travertine roughness, timber screen depth, concrete variations), refined exterior architectural lighting (low-key accents), deep shadow areas within deep recesses, premium luxury atmosphere." },
  sunlit_tropical_pavilion: { name: "Sunlit Tropical Pavilion", low_light: false, phrase: "Bright tropical midday sunlight, vivid blue sky HDRI environment with scattered cumulus clouds, physically accurate path-traced light bounces, realistic global illumination (GI), crisp directional shadows, deep architectural shading under wide eaves, highly saturated lush vegetation and bright green lawn, clear glass reflections seamlessly blending interior and exterior spaces, fresh and inviting atmospheric depth." },
  serene_family_oasis: { name: "Serene Family Oasis", low_light: false, phrase: "Soft late afternoon daylight, gently diffused atmospheric sky HDRI, physically accurate path-traced light bounces, realistic global illumination (GI), seamless blending of cool natural exterior light with warm interior ambient lighting, rich volumetric depth in lush foliage, soft and realistic water reflections on landscape ponds, gentle shadow transitions, incredibly cozy and inviting architectural atmosphere." },
  tropical_heritage_daylight: { name: "Tropical Heritage Daylight", low_light: false, phrase: "High-contrast directional sunlight, bright midday to early afternoon transition, clear blue sky HDRI environment with scattered cumulus clouds, physically accurate path-traced light transport, realistic global illumination (GI), deep architectural shading under prominent pitched roofs, crisp patterned shadows from fine foliage (bamboo/trees), rich material definition for dark timber and exposed concrete, authentic tropical warmth." }
};

const PHOTOGRAPHY_LIGHTING = {
  auto: { name: "Auto (Default Natural Daylight)", low_light: false, phrase: "Natural daylight, balanced exposure, subtle environmental bounce light." },
  golden_hour: { name: "Golden Hour", low_light: false, phrase: "Soft golden hour sunlight piercing through adjacent trees, long dynamic shadows across the facade, warm amber hues beautifully contrasting with cool ambient shadow light, un-staged natural lighting, realistic exposure falloff." },
  overcast: { name: "Overcast", low_light: false, phrase: "Overcast sky with soft diffused natural lighting, flat but moody contrast, subtle environmental bounce light from the ground, zero harsh shadows, slight atmospheric haze emphasizing physical textures." },
  blue_hour: { name: "Blue Hour", low_light: true, phrase: "Blue hour dusk natural lighting, deep indigo sky, perfectly balanced with warm artificial interior lights glowing softly through the architectural glass, subtle exterior landscape lighting, realistic high dynamic range." },
  bright_midday: { name: "Bright Midday", low_light: false, phrase: "Bright high-noon harsh natural sunlight, crisp and sharp distinct shadows tracing the building's geometry, high contrast, slightly overexposed sunlit highlights, deep natural shadow crevices." },
  soft_morning: { name: "Soft Morning", low_light: false, phrase: "Soft early morning sunlight approximately one hour after sunrise, gentle warm-neutral color temperature around 4800–5200K, low-angle sunlight creating long soft shadows, fresh atmosphere with crystal-clear visibility, balanced natural exposure preserving highlight and shadow details, subtle ambient skylight softly illuminating shaded surfaces, highly realistic architectural photography." },
  clear_morning: { name: "Clear Morning", low_light: false, phrase: "Bright clear morning under a cloudless blue sky, neutral daylight around 5500K, clean high-contrast sunlight with crisp architectural shadows, exceptionally transparent atmosphere, excellent visibility, balanced exposure with rich tonal separation, vivid yet physically realistic colors, premium editorial architectural photography." },
  misty_morning: { name: "Misty Morning", low_light: false, phrase: "Early morning with light natural mist softly diffusing sunlight, subtle volumetric atmosphere without obscuring architectural details, cool ambient light balanced with gentle warm sunrise highlights, reduced contrast producing smooth tonal transitions, realistic moisture in the air, soft cinematic exposure emphasizing depth and serenity." },
  warm_afternoon: { name: "Warm Afternoon", low_light: false, phrase: "Late afternoon natural sunlight approximately two to three hours before sunset, warm golden-neutral color temperature around 4800K, moderate sunlight angle creating elegant elongated architectural shadows, rich natural contrast with balanced dynamic range, realistic warm reflections on facade materials, subtle ambient skylight maintaining shadow detail, inviting residential architectural photography." },
  tropical_afternoon: { name: "Tropical Afternoon", low_light: false, phrase: "Bright tropical afternoon under a vibrant blue sky with scattered white clouds, strong yet physically realistic sunlight around 5600K, high atmospheric clarity with moderate humidity, crisp architectural shadows softened by natural environmental bounce light, vivid foliage rendering, balanced exposure preserving material realism, authentic tropical architectural photography." },
  late_afternoon: { name: "Late Afternoon", low_light: false, phrase: "Late afternoon natural daylight with gently lowering sun angle, warm-neutral sunlight producing long refined architectural shadows, soft environmental bounce light enriching facade textures, balanced highlight retention with deep yet readable shadow areas, subtle golden reflections enhancing material depth, premium editorial architectural photography." },
  sunset_glow: { name: "Sunset Glow", low_light: false, phrase: "Natural sunset illumination during the final golden minutes before sunset, warm amber-orange sunlight softly grazing architectural surfaces, long dramatic shadows emphasizing building geometry, naturally glowing facade reflections, realistic high dynamic range preserving sky gradients, emotionally rich editorial architectural photography." },
  after_sunset: { name: "After Sunset", low_light: true, phrase: "Soft ambient twilight immediately after sunset with no direct sunlight, cool blue ambient skylight naturally balanced by warm interior architectural lighting, smooth tonal transitions, excellent highlight control, subtle landscape illumination, premium residential architectural photography with realistic evening exposure." },
  twilight: { name: "Twilight", low_light: true, phrase: "Natural twilight under a deep blue-purple sky, perfectly balanced ambient illumination with softly glowing architectural lighting, rich tonal depth, realistic dynamic range between sky and illuminated interiors, minimal harsh contrast, refined cinematic architectural photography emphasizing atmosphere and spatial depth." },
  after_rain: { name: "After Rain", low_light: false, phrase: "Fresh atmosphere immediately after rainfall, naturally saturated materials with realistic moisture, wet pavement producing subtle physical reflections without mirror-like exaggeration, soft diffused daylight through clearing clouds, excellent atmospheric transparency, balanced exposure revealing rich material textures, authentic post-rain architectural photography." },
  before_rain: { name: "Before Rain", low_light: false, phrase: "Dense cloud cover preceding rainfall, subdued daylight with cool neutral tones, reduced contrast creating soft shadow transitions, subtle atmospheric pressure conveyed through darker skies, highly detailed facade textures, realistic environmental lighting with natural dynamic range, dramatic editorial architectural photography." },
  light_rain: { name: "Light Rain", low_light: false, phrase: "Gentle ongoing rainfall with soft overcast illumination, fine visible rain streaks captured naturally without overwhelming the architecture, wet surfaces enhancing physical material characteristics, muted reflections, low-contrast lighting preserving architectural detail, realistic documentary architectural photography." },
  stormy_sky: { name: "Stormy Sky", low_light: false, phrase: "Powerful storm clouds creating dramatic natural lighting, intermittent sunlight breaking through dense cloud formations, high local contrast with realistic shadow movement, deep atmospheric depth, balanced exposure preventing highlight clipping, bold architectural photography emphasizing massing and structural presence." },
  foggy_morning: { name: "Foggy Morning", low_light: false, phrase: "Dense natural morning fog partially enveloping the surrounding landscape while maintaining architectural visibility, soft diffused daylight with extremely gentle contrast, layered atmospheric depth, subtle moisture softening distant objects, refined tonal compression emphasizing composition and spatial hierarchy, poetic architectural photography." },
  soft_north_light: { name: "Soft North Light", low_light: false, phrase: "Uniform north-facing daylight providing soft shadowless illumination, perfectly even exposure across all architectural surfaces, neutral daylight color temperature around 5500K, exceptional material color accuracy, extremely high tonal consistency, museum-quality architectural documentation photography." },
  museum_lighting: { name: "Museum Lighting", low_light: false, phrase: "Carefully balanced diffuse natural daylight with controlled soft directional illumination, minimal shadow distraction, highly accurate color reproduction, smooth highlight roll-off, maximum material readability, physically realistic exposure emphasizing architectural craftsmanship and construction quality." },
  scandinavian_diffused: { name: "Scandinavian Diffused", low_light: false, phrase: "Soft northern European diffused daylight under bright cloud cover, cool-neutral color balance around 6000K, delicate contrast with exceptionally smooth tonal transitions, subtle environmental bounce illumination, understated yet elegant atmosphere, minimalist editorial architectural photography." },
  hdr_editorial: { name: "High Dynamic Range Editorial", low_light: false, phrase: "Professionally balanced natural exposure maximizing real-world dynamic range, perfectly preserved sky highlights, fully readable interior and shaded architectural details, smooth highlight roll-off, natural contrast without artificial HDR appearance, premium editorial architectural photography suitable for publication." },
  minimal_shadow_lighting: { name: "Minimal Shadow Lighting", low_light: false, phrase: "Soft ambient daylight minimizing harsh directional shadows while preserving subtle three-dimensional form, neutral exposure, gentle material reflections, clean architectural lines, distraction-free lighting emphasizing composition, proportion, and facade geometry, refined contemporary editorial photography." },
  cinematic_natural_light: { name: "Cinematic Natural Light", low_light: false, phrase: "Natural directional daylight with carefully balanced exposure producing subtle cinematic depth while remaining physically believable, elegant interplay of light and shadow enhancing architectural form, rich tonal separation, restrained color grading, authentic editorial atmosphere with zero artificial render appearance." },
  balanced_tropical_daylight: { name: "Balanced Tropical Daylight", low_light: false, phrase: "Bright, high-angle tropical daylight with a warm-neutral color temperature around 5200K. Clean, sharp-yet-measured shadows define the architectural forms and pergola structure, while soft environmental bounce light fills deep shadows without loss of texture. Excellent atmospheric clarity reveals the rich details of all facade materials — wood, brick, and smooth stucco — under realistic exposure, preventing highlight blowout. Interior lights add a subtle warm counterpoint without overpowering the exterior daylight." },
  clear_dappled_morning: { name: "Clear Dappled Morning", low_light: false, phrase: "Soft, clear low-angle morning sunlight (5800K) casting long, intricate dappled tree shadows across the entire foreground. Crisp highlight detail on warm wood and textured concrete facade elements. High transparency. Clear-textured, balanced exposure for foliage and water. Calm, exclusive mood." },
  clear_afternoon: { name: "Clear Afternoon", low_light: false, phrase: "Clear afternoon natural light from a low angle, around 3:00–5:00 PM, creating long, crisp, high-contrast shadows across the lawn and facade. A brilliant blue sky with soft, detailed cumulus clouds provides an overall bright illumination. Transparent atmosphere offering crystal-clear visibility, emphasizing the deep architectural layering and the seamless integration of interior and exterior spaces. Vivid foliage colors in shades of emerald and deep green, with warm wooden undertones on the building contrasting beautifully." },
  tropical_clear_daylight: { name: "Tropical Clear Daylight", low_light: false, phrase: "Clear and balanced natural midday sunlight under a bright sky, evenly distributing light across the modern tropical architecture and lush landscape. No harsh shadows; instead, soft yet directional light deeply accentuates the textures of wood and stone materials. Balanced brightness preserves detail in both shaded interiors and sunlit foliage, offering crystal-clear visibility. Natural colors (greens, woods) appear pure and accurate, creating an inviting, peaceful, and lively premium residential atmosphere." }
};

const RENDERING_OUTPUT = {
  none: { name: "— Default / None —", phrase: "" },
  archdaily_standard: { name: "ArchDaily Standard", phrase: "Highly detailed photorealistic architectural visualization, V-Ray or Corona render engine style, physically believable materials, crisp details, balanced color grading, natural reflections, architectural photography, hyper-detailed, 8k resolution, style of ArchDaily and Dezeen." },
  dezeen_editorial: { name: "The Dezeen Editorial", phrase: "Contemporary editorial architectural visualization, ultra-clean photorealistic rendering, balanced neutral color grading, refined natural materials, crisp geometric definition, soft realistic reflections, sophisticated architectural photography, premium editorial composition, highly detailed, publication-ready, style of Dezeen." },
  designboom_contemporary: { name: "Designboom Contemporary", phrase: "Contemporary design-focused architectural visualization, elegant editorial rendering, vibrant yet natural color grading, refined material authenticity, expressive architectural composition, premium photography aesthetics, sophisticated lighting response, highly detailed photorealistic visualization, publication quality." },
  world_architecture_review: { name: "World Architecture Review", phrase: "International architectural competition visualization, refined photorealistic rendering, physically accurate materials, balanced editorial lighting, exceptional architectural clarity, clean composition, sophisticated visual storytelling, premium publication quality, highly detailed." },
  architectural_digest: { name: "Architectural Digest", phrase: "High-end luxury architectural visualization, FStorm render style, rich and warm color palette, sophisticated polished finish, highly realistic material reflections, inviting lifestyle atmosphere, editorial architectural photography, style of Architectural Digest." },
  luxury_residential: { name: "Luxury Residential", phrase: "High-end luxury residential visualization, ultra-photorealistic rendering, sophisticated warm color grading, premium natural materials, elegant reflections, refined ambient lighting, luxurious lifestyle atmosphere, magazine-quality architectural photography, highly detailed." },
  luxury_resort: { name: "Luxury Resort", phrase: "Premium tropical resort visualization, ultra-realistic architectural rendering, refined hospitality atmosphere, luxurious natural materials, balanced warm lighting, sophisticated landscape integration, premium editorial photography, elegant color grading, highly detailed." },
  boutique_hotel: { name: "Boutique Hotel", phrase: "Boutique hospitality visualization, intimate luxury atmosphere, refined interior and exterior material rendering, elegant warm-neutral color grading, premium editorial photography, sophisticated lighting balance, highly detailed photorealistic architectural visualization." },
  kinfolk_japandi_minimalist: { name: "Kinfolk / Japandi Minimalist", phrase: "Soft minimalist architectural visualization, Corona render style, subtle matte finish, low contrast color grading, muted earthy tones, wabi-sabi aesthetic, gentle natural light interactions, editorial photography, style of Kinfolk magazine, photorealistic." },
  scandinavian_editorial: { name: "Scandinavian Editorial", phrase: "Scandinavian-inspired architectural visualization, soft neutral daylight, muted color palette, subtle matte material finish, clean architectural composition, refined editorial photography, minimalist luxury aesthetic, highly realistic rendering." },
  muji_living: { name: "MUJI Living", phrase: "Japanese minimalist architectural rendering, calm neutral atmosphere, soft natural lighting, refined wood textures, muted earthy color grading, elegant simplicity, premium editorial architectural photography, highly detailed." },
  japandi_editorial: { name: "Japandi Editorial", phrase: "Japandi architectural visualization, harmonious Scandinavian and Japanese aesthetics, refined matte material response, balanced daylight illumination, natural earthy palette, elegant editorial composition, premium architectural photography, highly photorealistic." },
  cinematic_moody: { name: "Cinematic & Moody", phrase: "Cinematic architectural rendering, Unreal Engine 5 style, moody and dramatic atmosphere, rich color grading, subtle film grain, anamorphic lens flare, high contrast, immersive composition, masterpiece, highly detailed." },
  fine_art_architecture: { name: "Fine Art Architecture", phrase: "Fine art architectural visualization, cinematic composition, dramatic lighting balance, rich atmospheric depth, premium color grading, subtle artistic contrast, elegant visual storytelling, museum-quality architectural photography, ultra-photorealistic." },
  competition_board: { name: "Competition Board", phrase: "International architectural competition rendering, crisp geometry, refined material realism, balanced contrast, clean presentation, dramatic yet realistic atmosphere, premium architectural visualization, publication-quality composition, highly detailed." },
  unreal_visual_experience: { name: "Unreal Visual Experience", phrase: "Next-generation architectural visualization, Unreal Engine-inspired realism, dynamic global illumination, cinematic atmosphere, premium material fidelity, immersive environmental storytelling, ultra-high-detail rendering, realistic reflections, cutting-edge architectural presentation." },
  high_end_physical_model: { name: "High-End Physical Model", phrase: "Clean white architectural clay render, physical plaster scale model style, smooth ambient occlusion, studio lighting setup, monochromatic pristine geometry, minimalist presentation, high-end museum model, perfectly clean edges." },
  concrete_clay_model: { name: "Concrete Clay Model", phrase: "Architectural concrete clay visualization, monochromatic cement material study, subtle surface texture, refined ambient occlusion, studio-quality soft lighting, physically accurate shading, clean presentation, premium conceptual rendering, museum-quality architectural model." },
  white_museum_model: { name: "White Museum Model", phrase: "Premium white architectural scale model, pristine matte white surfaces, soft studio illumination, refined ambient occlusion, clean shadow gradients, museum exhibition quality, minimalist presentation, ultra-clean geometry, conceptual architectural photography." },
  sketch_presentation: { name: "Sketch Presentation", phrase: "Hybrid architectural presentation, subtle monochrome material palette, soft conceptual rendering, delicate edge definition, architectural visualization with presentation-board aesthetics, premium design review style, clean minimal composition." },
  property_marketing: { name: "Property Marketing", phrase: "Commercial real estate architectural visualization, bright inviting atmosphere, vibrant natural colors, premium material realism, polished reflections, balanced exposure, lifestyle-oriented architectural photography, high-impact marketing presentation, ultra-photorealistic." },
  luxury_brochure: { name: "Luxury Brochure", phrase: "Premium brochure-quality architectural rendering, refined luxury color grading, elegant material response, soft cinematic lighting, polished presentation, sophisticated architectural photography, premium hospitality atmosphere, magazine-ready visualization." },
  developer_presentation: { name: "Developer Presentation", phrase: "Professional developer visualization, highly detailed photorealistic rendering, clean composition, balanced editorial color grading, accurate material representation, refined lighting, presentation-ready architectural photography, commercial publication quality." },
  real_estate_premium: { name: "Real Estate Premium", phrase: "Premium real estate visualization, ultra-clean architectural photography style, luxurious material realism, inviting lifestyle atmosphere, sophisticated warm color grading, balanced natural lighting, commercial marketing quality, highly detailed photorealistic rendering." },
  corona_renderer_aesthetic: { name: "Corona Renderer Aesthetic", phrase: "Corona Renderer-inspired architectural visualization, soft natural light behavior, realistic diffuse reflections, refined matte materials, subtle photographic color grading, balanced contrast, calm editorial atmosphere, highly photorealistic rendering." },
  vray_precision: { name: "V-Ray Precision", phrase: "V-Ray-inspired architectural rendering, crisp material definition, accurate global illumination, sharp geometric clarity, realistic reflections, balanced natural contrast, highly detailed architectural visualization, professional presentation quality." },
  fstorm_luxury: { name: "FStorm Luxury", phrase: "FStorm-inspired architectural visualization, premium cinematic realism, sophisticated warm color palette, luxurious reflections, refined lighting balance, elegant editorial photography, high-end residential atmosphere, ultra-photorealistic rendering." },
  unreal_engine_experience: { name: "Unreal Engine Experience", phrase: "Unreal Engine-inspired next-generation architectural visualization, immersive lighting, dynamic environmental realism, premium global illumination, cinematic storytelling, cutting-edge material response, highly detailed architectural presentation." },
  d5_render_style: { name: "D5 Render Style", phrase: "D5 Render-inspired architectural visualization, bright contemporary atmosphere, physically believable materials, realistic daylight response, vibrant landscaping, premium reflections, clean editorial presentation, ultra-realistic rendering quality." }
};

const PHOTOGRAPHY_OUTPUT = {
  none: { name: "— Default / None —", phrase: "" },
  iwan_baan: { name: "Iwan Baan", phrase: "Authentic editorial architectural photography, documentary style of Iwan Baan, showing the architecture integrating with its real-world messy context, raw, un-staged, lived-in atmosphere, featured on the front page of ArchDaily, completely eliminating CGI aesthetic." },
  julius_shulman: { name: "Julius Shulman", phrase: "Classic editorial architectural photography, capturing the iconic style of Julius Shulman, highly stylized yet physically authentic, subtle glamorous lifestyle feel, perfect geometric composition, sharp clarity, Architectural Digest aesthetic." },
  fernando_guerra: { name: "Fernando Guerra", phrase: "Dynamic architectural photography style of Fernando Guerra, vibrant but natural color grading, emphasizing architectural scale and natural environment interaction, bright, optimistic, and highly photorealistic, Dezeen feature style." },
  helene_binet: { name: "Hélène Binet", phrase: "Fine-art architectural photography, inspired by Hélène Binet, strong emphasis on shadow play, geometric abstraction, and tactile material textures, moody and poetic atmosphere, raw film photography aesthetic, zero 3D render look." },
  cristobal_palma: { name: "Cristobal Palma", phrase: "Contemporary architectural photography inspired by Cristobal Palma, emphasizing the relationship between architecture and its urban surroundings, balanced geometric composition, natural human activity integrated within the scene, restrained color grading, authentic documentary atmosphere, premium editorial quality with physically realistic lighting and materials." },
  rory_gardiner: { name: "Rory Gardiner", phrase: "Architectural photography inspired by Rory Gardiner, characterized by calm compositions, refined natural lighting, subtle environmental atmosphere, muted yet accurate color palette, exceptional attention to proportion, material texture, and spatial silence, elegant editorial photography with timeless architectural presence." },
  simon_menges: { name: "Simon Menges", phrase: "Architectural photography inspired by Simon Menges, highlighting construction quality, precise architectural geometry, refined material authenticity, balanced natural lighting, crisp visual clarity, neutral color rendering, premium editorial documentation with exceptional technical precision." },
  edmund_sumner: { name: "Edmund Sumner", phrase: "Architectural photography inspired by Edmund Sumner, combining expressive viewpoints with authentic environmental storytelling, rich natural light, subtle cultural context, balanced composition, vibrant yet physically accurate color rendering, contemporary editorial architectural photography." },
  boysplaynice: { name: "BoysPlayNice", phrase: "Architectural photography inspired by BoysPlayNice, featuring clean contemporary compositions, bright natural daylight, vibrant yet realistic colors, strong interaction between architecture and landscape, welcoming atmosphere, premium publication quality suitable for ArchDaily and Dezeen." },
  doublespace_photography: { name: "Doublespace Photography", phrase: "Architectural photography inspired by Doublespace Photography, emphasizing refined hospitality spaces, inviting natural light, sophisticated interior-exterior balance, luxurious material presentation, subtle lifestyle atmosphere, premium editorial photography with exceptional realism." },
  scott_frances: { name: "Scott Frances", phrase: "Architectural photography inspired by Scott Frances, showcasing luxurious residential architecture through sophisticated composition, perfectly controlled natural lighting, rich material textures, elegant tonal balance, understated luxury, and timeless editorial aesthetics." },
  trevor_tondro: { name: "Trevor Tondro", phrase: "Architectural photography inspired by Trevor Tondro, focusing on comfortable residential living, inviting natural light, authentic lifestyle storytelling, soft warm color palette, harmonious integration between architecture, furniture, and landscape, premium residential editorial photography." },
  adrian_gaut: { name: "Adrian Gaut", phrase: "Architectural photography inspired by Adrian Gaut, characterized by clean geometric framing, restrained color grading, crisp natural light, refined material rendering, minimal visual distractions, and polished editorial presentation suitable for contemporary architecture publications." },
  laurian_ghinitoiu: { name: "Laurian Ghinitoiu", phrase: "Architectural photography inspired by Laurian Ghinitoiu, emphasizing construction details, craftsmanship, structural expression, tactile material textures, carefully balanced lighting, exceptional close-to-medium architectural compositions, premium editorial documentation." },
  roland_halbe: { name: "Roland Halbe", phrase: "Architectural photography inspired by Roland Halbe, focusing on architectural precision, structural clarity, faithful material representation, neutral daylight, technically accurate exposure, and clean documentary aesthetics suitable for professional architectural publications." },
  duccio_malagamba: { name: "Duccio Malagamba", phrase: "Architectural photography inspired by Duccio Malagamba, utilizing warm Mediterranean natural light, soft shadows, elegant proportions, realistic material warmth, refined environmental integration, timeless editorial architectural photography with rich spatial atmosphere." },
  stefano_graziani: { name: "Stefano Graziani", phrase: "Architectural photography inspired by Stefano Graziani, featuring minimalist compositions, restrained visual language, subtle tonal transitions, contemplative atmosphere, exceptional spatial balance, and poetic architectural interpretation through physically realistic photography." },
  bas_princen: { name: "Bas Princen", phrase: "Architectural photography inspired by Bas Princen, exploring the relationship between architecture and landscape through expansive compositions, atmospheric distance, natural environmental layering, muted color palette, and monumental spatial storytelling." },
  george_apostolidis: { name: "George Apostolidis", phrase: "Architectural photography inspired by George Apostolidis, showcasing hospitality and commercial architecture through refined lighting, elegant composition, premium material presentation, inviting ambiance, balanced interior-exterior integration, and luxury editorial quality." },
  tom_blachford: { name: "Tom Blachford", phrase: "Architectural photography inspired by Tom Blachford, featuring dramatic evening and night architectural scenes, carefully balanced artificial and ambient lighting, cinematic atmosphere, refined tonal depth, minimal visual noise, and premium editorial night photography." }
};

// ================================================================
// 3. PROMPT ENGINE BUILDER (EXACT PORT FROM RUBY MAIN.RB)
// ================================================================

// Klausa-klausa berikut hanya masuk akal untuk pemandangan LUAR (langit,
// lanskap, fasad, dsb). Untuk render Interior, klausa semacam ini dibuang
// dari teks preset lighting/output agar tidak "membocorkan" instruksi
// membuat bukaan/pemandangan ke luar pada ruangan tertutup.
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

// Memecah sebuah frasa preset menjadi klausa (dipisah koma), membuang
// klausa yang secara eksplisit mendeskripsikan elemen luar ruangan, lalu
// menyusunnya kembali. Kalau hasil filternya jadi terlalu sedikit/gundul,
// fallback ke frasa aman generik supaya deskripsi lighting tidak kosong.
function sanitizeForInterior(phrase) {
  if (!phrase) return phrase;
  const clauses = phrase.split(",").map(c => c.trim()).filter(Boolean);
  const kept = clauses.filter(c => !EXTERIOR_ONLY_PATTERN.test(c));

  // Kalau lebih dari separuh klausa terbuang, frasa itu memang preset yang
  // dirancang untuk exterior — pakai deskripsi netral saja daripada
  // menyisakan potongan kalimat yang janggal.
  if (kept.length === 0 || kept.length < clauses.length * 0.4) {
    return "Soft, evenly diffused daylight quality appropriate for an enclosed interior space, physically accurate global illumination, natural shadow gradients, no visible sky or outdoor scenery implied";
  }
  return kept.join(", ");
}

function buildPrompt({ type, style, track, lightingKey, outputKey }) {
  const isExterior = type.toLowerCase() === "exterior";
  const currentTrack = track === "photography" ? "photography" : "rendering";
  const styleData = STYLE_DATA[style] || STYLE_DATA["Modern Minimalist"];

  const lightingLib = currentTrack === "photography" ? PHOTOGRAPHY_LIGHTING : RENDERING_LIGHTING;
  const outputLib = currentTrack === "photography" ? PHOTOGRAPHY_OUTPUT : RENDERING_OUTPUT;

  const lighting = lightingLib[lightingKey] || Object.values(lightingLib)[0];
  const output = (outputKey && outputKey !== "none" && outputLib[outputKey]) ? outputLib[outputKey] : null;

  // Untuk Interior, saring dulu klausa-klausa yang menyiratkan pemandangan
  // luar (langit terbuka, HDRI environment, lanskap, dst) dari teks preset
  // sebelum dipakai di dalam prompt.
  const lightingPhrase = isExterior ? lighting.phrase : sanitizeForInterior(lighting.phrase);
  const outputPhrase = output ? (isExterior ? output.phrase : sanitizeForInterior(output.phrase)) : null;

  const parts = [];

  // 1. Geometry Lock Statement
  parts.push(GEOMETRY_LOCK_STATEMENT);

  // 2. Camera View & Framing
  parts.push("Camera angle and framing are locked exactly as set in the reference view: a natural perspective held at eye level with corrected verticals.");
  parts.push(CAMERA_STYLE[currentTrack]);

  // 3. Lighting Setup
  parts.push(`Lighting setup — ${lighting.name}: ${lightingPhrase}`);

  // 4. Subject Focus
  const baseSubject = isExterior ? "architectural exterior facade" : "architectural interior";
  parts.push(`This is a ${baseSubject} render of the full scene, preserving every wall, opening, and volume exactly as modeled.`);

  // 4b. Interior-specific opening lock — this only exists because renders
  // kept turning solid interior doors/walls into openings onto the exterior.
  if (!isExterior) {
    parts.push(
      "This interior space is enclosed exactly as modeled: do not add, enlarge, or reinterpret any door, wall, " +
      "or opening as a view to the outside. Every door stays a solid, closed door and every wall stays a solid " +
      "wall unless a window is already explicitly present in the reference image — no new sky, landscape, or " +
      "exterior scenery may be introduced anywhere in the frame."
    );
  }

  // 5. Design Style & Material Details
  parts.push(`Rendered in ${style}, the space carries a ${styleData.vibe} atmosphere, built around ${styleData.palette}, finished in ${styleData.materials}, and furnished with ${styleData.furniture}.`);

  // 6. Vegetation & Landscape
  if (isExterior) {
    parts.push(`Outside, the landscaping stays consistent: ${styleData.vegetation_outdoor}.`);
    parts.push(`Underfoot and along the approach, ${styleData.ground_materials} ground the whole composition.`);
  } else {
    // Tidak lagi memaksa asumsi "ada jendela yang menampakkan taman di
    // luar" — website ini tidak tahu apakah ruangan tersebut punya jendela
    // ke luar sama sekali, jadi glimpse ke luar dibuat kondisional, bukan
    // wajib.
    parts.push(
      `Indoors, ${styleData.vegetation_indoor} soften the room. If — and only if — a window to the outside is ` +
      `already visible in the reference image, whatever lies beyond it should read as ${styleData.vegetation_outdoor}; ` +
      `otherwise no exterior view should appear at all.`
    );
  }

  // 7. Artificial Lighting Fixtures
  if (lighting.low_light) {
    parts.push(`As daylight fades, artificial fixtures take over — ${styleData.lighting_fixtures} — casting a warm, layered glow.`);
  } else {
    parts.push(`By day, ${styleData.lighting_fixtures} sit as quiet accents without competing with natural sunlight.`);
  }

  // 8. Material Quality & Realism Booster
  parts.push(MATERIAL_QUALITY[currentTrack]);
  parts.push(REALISM_BOOSTER);

  // 9. Output Direction (Render Engine or Photographer Style)
  if (output) {
    const label = currentTrack === "photography" ? "in the documentary/editorial style of" : "in the visual language of";
    parts.push(`Output direction — ${output.name}: ${outputPhrase} Render ${label} ${output.name}.`);
  }

  // 10. Geometry Lock Reminder
  parts.push(GEOMETRY_LOCK_REMINDER);

  return parts.join(" ");
}

// ================================================================
// 4. UI INTERFACE CONTROLLER
// ================================================================

let currentTrack = 'rendering';

document.addEventListener('DOMContentLoaded', () => {
  const btnRendering = document.getElementById('btnRendering');
  const btnPhotography = document.getElementById('btnPhotography');
  const lightingSelect = document.getElementById('lightingPreset');
  const outputSelect = document.getElementById('outputPreset');
  const generateBtn = document.getElementById('generateBtn');
  const resultPrompt = document.getElementById('resultPrompt');
  const copyBtn = document.getElementById('copyBtn');

  const dropZone = document.getElementById('dropZone');
  const imageInput = document.getElementById('imageInput');
  const imagePreview = document.getElementById('imagePreview');
  const uploadPlaceholder = document.getElementById('uploadPlaceholder');
  const previewContainer = document.getElementById('previewContainer');
  const changeImgBtn = document.getElementById('changeImgBtn');

  function populateSelect(selectEl, library) {
    if (!selectEl) return;
    selectEl.innerHTML = '';
    Object.keys(library).forEach(key => {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = library[key].name;
      selectEl.appendChild(option);
    });
  }

  function updateTrackUI() {
    if (currentTrack === 'rendering') {
      if (btnRendering) btnRendering.classList.add('active');
      if (btnPhotography) btnPhotography.classList.remove('active');
      populateSelect(lightingSelect, RENDERING_LIGHTING);
      populateSelect(outputSelect, RENDERING_OUTPUT);
    } else {
      if (btnPhotography) btnPhotography.classList.add('active');
      if (btnRendering) btnRendering.classList.remove('active');
      populateSelect(lightingSelect, PHOTOGRAPHY_LIGHTING);
      populateSelect(outputSelect, PHOTOGRAPHY_OUTPUT);
    }
  }

  if (btnRendering) {
    btnRendering.addEventListener('click', () => { currentTrack = 'rendering'; updateTrackUI(); });
  }
  if (btnPhotography) {
    btnPhotography.addEventListener('click', () => { currentTrack = 'photography'; updateTrackUI(); });
  }

  if (dropZone && imageInput) {
    dropZone.addEventListener('click', (e) => {
      if (e.target !== changeImgBtn) imageInput.click();
    });

    if (changeImgBtn) {
      changeImgBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        imageInput.click();
      });
    }

    imageInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

    dropZone.addEventListener('dragover', (e) => { 
      e.preventDefault(); 
      dropZone.classList.add('dragover'); 
    });

    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
    });
  }

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (imagePreview) {
        imagePreview.src = e.target.result;
        imagePreview.classList.remove('hidden');
      }
      if (previewContainer) previewContainer.classList.remove('hidden');
      if (uploadPlaceholder) uploadPlaceholder.classList.add('hidden');
    };
    reader.readAsDataURL(file);
  }

  if (generateBtn) {
    generateBtn.addEventListener('click', () => {
      const type = document.getElementById('renderType')?.value || 'exterior';
      const style = document.getElementById('designStyle')?.value || 'Modern Minimalist';
      const lightingKey = lightingSelect?.value || 'auto';
      const outputKey = outputSelect?.value || 'none';

      const prompt = buildPrompt({
        type,
        style,
        track: currentTrack,
        lightingKey,
        outputKey
      });

      if (resultPrompt) resultPrompt.value = prompt;
    });
  }

  if (copyBtn && resultPrompt) {
    copyBtn.addEventListener('click', () => {
      if (!resultPrompt.value) return;
      navigator.clipboard.writeText(resultPrompt.value);
      alert('Prompt berhasil disalin ke clipboard!');
    });
  }

  // Load awal menu pilihan
  updateTrackUI();
});
