export type ClimateProfile = {
  key: string;
  label: string;
  headline: string;
  /** 2 short paragraphs, tokens: {city} {county} {state} */
  paragraphs: string[];
  problems: { title: string; text: string }[];
  seasonal: string;
  doorAdvice: string;
};

export const CLIMATES: Record<string, ClimateProfile> = {
  cold_salt: {
    key: "cold_salt",
    label: "Cold winters with road salt",
    headline: "Road salt, freeze-thaw and long winters are hard on garage door hardware",
    paragraphs: [
      "Winters around {city} bring repeated freeze-thaw cycles, and road salt travels into garages on tires and boots. Salt is the main reason hinges, rollers, cables and bottom brackets corrode faster here than in mild climates, and it is why a door that worked in October can grind, squeal or stick by January.",
      "When water gets into a track or behind a weather seal and refreezes overnight, the door can freeze to the slab. Forcing an opener through a frozen door is one of the most common causes of stripped gears and snapped lift cables we see in {county} County.",
    ],
    problems: [
      { title: "Cables and springs failing in cold snaps", text: "Steel contracts in low temperatures and torsion springs that are near the end of their cycle life often break on the first hard freeze of the season." },
      { title: "Doors frozen to the floor", text: "Meltwater under the bottom seal refreezes overnight, bonding the door to the concrete. The opener pulls against it and the trolley, gear or cable gives first." },
      { title: "Salt corrosion on hinges and rollers", text: "Rusty hinges and dry nylon rollers create the grinding and shuddering that homeowners notice most in winter." },
      { title: "Track misalignment from frost heave", text: "Ground movement and ice at the door opening can push a track out of plumb, which then drags on the panels." },
      { title: "Weather seal cracking", text: "Cold makes old vinyl brittle. A cracked bottom seal lets snowmelt and cold air in, which makes the whole cycle worse." },
    ],
    seasonal: "Book a pre-winter tune-up in early autumn: lubrication, balance check, spring cycle inspection and a bottom-seal test before the first freeze.",
    doorAdvice: "Insulated steel or composite doors hold up best here; whatever the material, specify sealed bearings and corrosion-resistant hinges for a salt-exposed garage.",
  },
  cold_coastal: {
    key: "cold_coastal",
    label: "Cold coastal winters",
    headline: "Salt air plus freezing nights is a tough combination for door hardware",
    paragraphs: [
      "Around {city}, winter alternates between wet coastal weather and hard overnight freezes. Salt carried in the air settles on tracks, hinges and cables, and the moisture that comes with it keeps corrosion moving even on days when the door is not used.",
      "That combination is why coastal {county} County garages see more seized rollers, frayed cables and sticking doors than inland towns at the same latitude. A door that is not lubricated and adjusted before winter usually announces itself loudly in January.",
    ],
    problems: [
      { title: "Salt-air corrosion", text: "Airborne salt attacks bare steel on tracks, hinges and springs; parts that would last years inland can seize within a season." },
      { title: "Freezing and thawing seals", text: "Wet weather followed by a hard freeze can bond the bottom seal to the apron." },
      { title: "Cable fraying", text: "Moisture works into cable strands and accelerates wear, especially where cables run close to the bottom brackets." },
      { title: "Opener strain in cold weather", text: "Cold grease thickens and the opener works harder, which shortens the life of gears and capacitors." },
      { title: "Wind-driven rain intrusion", text: "Gaps at the perimeter let water in, and repeated wet-dry cycles warp wooden door sections." },
    ],
    seasonal: "Schedule service in late autumn and again in spring: coastal garages benefit from two lubrication and adjustment visits a year rather than one.",
    doorAdvice: "Fiberglass, aluminum or steel with a factory finish and stainless hardware resist coastal corrosion better than wood.",
  },
  cold_snow: {
    key: "cold_snow",
    label: "Heavy snow and deep cold",
    headline: "Deep cold and snow load put extra stress on doors and openers",
    paragraphs: [
      "{city} sees long stretches below freezing and heavy snowfall. Snow and ice pile up against the door, and the opener is asked to move a door that is heavier than usual because of snow load, stiff grease and a frozen seal.",
      "Ice dams and packed snow at the apron also block the door from closing properly, which leaves a gap and lets cold air and meltwater into the garage. In {county} County, the repairs we see most are snapped springs, burned-out opener gears and bent bottom sections.",
    ],
    problems: [
      { title: "Snow load on panels", text: "Heavy snow pressed against the door can bow a steel panel or crack a wood section." },
      { title: "Frozen bottom seal", text: "Ice at the apron holds the door up and the opener keeps running against a closed limit." },
      { title: "Spring breakage in deep cold", text: "The coldest weeks are when torsion and extension springs fail most often." },
      { title: "Opener overload", text: "Cold-thickened lubricant and heavier door travel strain the motor, gears and belt." },
      { title: "Roof and carport snow load", text: "Doors under carports or low roofs can be blocked by snow sliding off the structure." },
    ],
    seasonal: "Clear snow and ice from the apron before operating the door, and have the spring and balance checked every autumn before the snow arrives.",
    doorAdvice: "A well-insulated steel door with heavy-duty hardware and a modern DC opener handles snow-belt winters far better than a lightweight uninsulated door.",
  },
  humid_coastal: {
    key: "humid_coastal",
    label: "Humid coastal summers",
    headline: "Humidity, storms and salt air wear out doors faster than heat alone",
    paragraphs: [
      "{city} sits in a humid coastal climate where summer moisture, storm winds and salt air all reach the garage. Steel parts rust from the inside out, wooden sections swell, and seals that look fine in spring can let water in by the end of summer.",
      "Because {county} County also sees tropical storms and heavy rain events, we treat wind-rated hardware and a properly sealed perimeter as part of the job, not an upgrade.",
    ],
    problems: [
      { title: "Rust and corrosion", text: "High humidity keeps bare steel damp; hinges, rollers and bottom brackets corrode quickly without regular lubrication." },
      { title: "Swollen or warped wood doors", text: "Moisture absorption changes the shape of wooden panels and can jam them in the opening." },
      { title: "Seal and weatherstrip failure", text: "UV exposure and heat make vinyl seals brittle, and the first storm pushes water straight in." },
      { title: "Storm wind pressure", text: "Loose tracks, hinges and anchors are the first thing to fail in a high-wind event." },
      { title: "Opener electronics and moisture", text: "Humidity and power surges after storms are both hard on circuit boards and safety sensors." },
    ],
    seasonal: "Inspect and lubricate before hurricane season, and re-check the perimeter seals afterwards; storm-driven rain finds every gap.",
    doorAdvice: "Choose a wind-rated door with factory-applied finish and stainless or galvanized hardware, and skip unfinished wood in exposed openings.",
  },
  humid_heat: {
    key: "humid_heat",
    label: "Hot, humid summers",
    headline: "Heat and humidity are the main reasons doors bind and openers fail",
    paragraphs: [
      "Summers in {city} are hot and humid, and that combination changes how a garage door behaves. Steel expands, wooden panels swell, lubricant thins out and drips away, and the opener works in temperatures that push its motor and electronics harder than in cooler parts of the country.",
      "In {county} County the most common service calls in July and August are doors that close unevenly, openers that stop halfway, and safety sensors that trip because of heat, insects or low voltage.",
    ],
    problems: [
      { title: "Expansion and binding", text: "Heat expands metal panels and tracks, which can make the door drag at the jambs." },
      { title: "Opener overheating", text: "Motors and control boards run hotter in an unventilated garage and can shut down mid-cycle." },
      { title: "Safety sensor faults", text: "Sunlight, dirt, spider webs and heat-related voltage dips all interrupt the safety beam." },
      { title: "Wood swelling and rot", text: "Humidity swells wooden sections; untreated or poorly sealed wood develops rot around the bottom rail." },
      { title: "Dry or melted lubrication", text: "Thin or dried-out grease on rollers, hinges and springs accelerates wear." },
    ],
    seasonal: "Late spring is the best time for a tune-up here: adjust travel limits, clean and align the safety sensors and re-lubricate before the heat sets in.",
    doorAdvice: "Insulated steel or aluminum with a factory finish copes with heat and humidity better than wood and keeps the garage noticeably cooler.",
  },
  humid: {
    key: "humid",
    label: "Humid continental climate",
    headline: "Wet summers and cold snaps both take a turn on the door",
    paragraphs: [
      "{city} gets humid summers, wet springs and cold winter snaps, which means the door has to cope with moisture as well as freeze-thaw movement. Wood swells in spring, steel rusts where paint has chipped, and springs and cables work harder in the cold months.",
      "For {county} County homeowners, the practical answer is twice-a-year attention: lubrication and a balance check in spring, and a hardware and seal inspection before winter.",
    ],
    problems: [
      { title: "Rust on hardware", text: "Humidity and temperature swings rust hinges, brackets and cables if they are not lubricated." },
      { title: "Warped wood sections", text: "Seasonal moisture changes warp wooden panels so they drag or fail to seal." },
      { title: "Springs failing after cold snaps", text: "Repeated expansion and contraction shortens the life of torsion and extension springs." },
      { title: "Seal damage", text: "Wet winters and hot summers crack vinyl seals and let water under the door." },
      { title: "Track movement", text: "Ground movement and temperature swings knock tracks out of alignment, causing binding." },
    ],
    seasonal: "Two visits a year — spring tune-up and pre-winter hardware check — prevent most of the failures we see in this climate.",
    doorAdvice: "Insulated steel is the most cost-effective choice here; wood looks great but needs annual sealing to survive the humidity.",
  },
  swing_hail: {
    key: "swing_hail",
    label: "Temperature swings and hail",
    headline: "Fast temperature swings and hail season dent panels and wear hardware",
    paragraphs: [
      "{city} sits where warm Gulf air meets cold northern fronts, so spring and early summer bring hail, strong storms and rapid temperature swings. Hail is the obvious risk to north-facing door panels, but the bigger long-term cost is the constant expansion and contraction that loosens hardware and shortens spring life.",
      "In {county} County we see a lot of hail-dented steel doors, misaligned tracks after wind events, and safety sensors knocked out by storm debris.",
    ],
    problems: [
      { title: "Hail dents and panel damage", text: "Hail can total a door skin; on some models one damaged section is replaced without touching the rest." },
      { title: "Wind-bent tracks", text: "Straight-line winds push doors and bend tracks out of alignment." },
      { title: "Loose hardware", text: "Constant heating and cooling loosens bolts, hinges and brackets." },
      { title: "Spring fatigue", text: "Frequent temperature swings cycle springs harder and shorten their service life." },
      { title: "Debris and sensor damage", text: "Storm debris jams tracks and knocks safety sensors out of alignment." },
    ],
    seasonal: "Book an inspection after any major hail or wind event, and check the door's balance at the start of storm season.",
    doorAdvice: "A reinforced steel door with impact-resistant glazing handles hail better; ask the installer about the door's wind-load and impact ratings.",
  },
  heat_hail: {
    key: "heat_hail",
    label: "Hot summers, hail and dust",
    headline: "Extreme heat, hail and dust are the three issues this climate creates",
    paragraphs: [
      "{city} sees long hot summers, hail-prone storms and a lot of airborne dust. Heat stresses opener motors and electronics, hail damages door skins, and dust works its way into tracks and rollers until the door starts to grind.",
      "In {county} County, late summer is when we get the most calls about openers stopping mid-cycle and doors that close unevenly after the track has been packed with grit.",
    ],
    problems: [
      { title: "Opener overheating and thermal shutdown", text: "Attic-hot garages push motors and boards past their rated temperature." },
      { title: "Hail-dented panels", text: "One storm can turn a smooth steel door into a costly replacement." },
      { title: "Dust and grit in tracks", text: "Dust mixed with lubricant turns into an abrasive paste that wears rollers fast." },
      { title: "Sun-baked seals", text: "UV exposure cracks bottom seals and weatherstrip and lets dust and pests in." },
      { title: "Dry heat warping wood doors", text: "Wood dries and cracks in summer, then swells in the rare wet spell." },
    ],
    seasonal: "Clean the tracks monthly in dusty months and have the opener serviced before the hottest stretch of summer.",
    doorAdvice: "An insulated steel door with a factory finish and sealed bearings is the most practical choice for heat and dust.",
  },
  wind_hail: {
    key: "wind_hail",
    label: "Wind and hail corridor",
    headline: "Straight-line winds and hail are the main threats to doors here",
    paragraphs: [
      "{city} sits in a region where spring storms bring straight-line winds, hail and quick temperature changes. Doors take the brunt on the exposed side of a house, and tracks and panels are the parts that fail first.",
      "In {county} County, we recommend a wind-rated door and reinforced hardware for exposed openings, plus an inspection after any significant storm.",
    ],
    problems: [
      { title: "Bent tracks", text: "Wind pressure pushes doors inward and bends tracks at the brackets." },
      { title: "Hail damage", text: "Dents are cosmetic on some doors and structural on others; the section type decides the repair." },
      { title: "Loose anchors", text: "Storm movement loosens jamb brackets and anchoring, which changes the whole door's alignment." },
      { title: "Broken glass and glazing", text: "Decorative windows are the first thing to crack in hail." },
      { title: "Opener strain after storms", text: "A door that is off-balance after a storm overworks the opener until it fails." },
    ],
    seasonal: "Schedule a post-storm inspection and have tracks and anchors checked at least once a year.",
    doorAdvice: "Ask for a door with a rated wind-load and impact-rated glazing if your opening faces the prevailing storm direction.",
  },
  hail_dry: {
    key: "hail_dry",
    label: "Hail and dry air",
    headline: "Hail season and dry air create a specific set of door problems",
    paragraphs: [
      "{city} deals with a dry climate and a hail season that can damage a door in minutes. Low humidity also dries out wooden doors and weather seals, while spring winds drive grit into the tracks.",
      "In {county} County the typical calls are hail-dented steel panels, cracked glazing and doors that start binding because the track is full of fine dust.",
    ],
    problems: [
      { title: "Hail damage to panels and glass", text: "Dents and cracked glazing are the most common storm repairs." },
      { title: "Dried-out seals", text: "Low humidity and UV crack vinyl seals, causing drafts and water intrusion when it finally rains." },
      { title: "Dust in tracks and hinges", text: "Grit accelerates roller wear and makes the door noisy and hard to operate." },
      { title: "Wood cracking", text: "Wooden doors dry out and split at the bottom rail and joints." },
      { title: "Spring tension drift", text: "Large day-night temperature swings cause springs to lose balance over time." },
    ],
    seasonal: "Have the door balanced and the tracks cleaned each spring, and inspect panels and glazing after hail.",
    doorAdvice: "Insulated steel with sealed bearings and impact-rated glazing suits this climate best.",
  },
  desert: {
    key: "desert",
    label: "Desert heat and dust",
    headline: "Extreme heat, dust and monsoon storms all hit the same door",
    paragraphs: [
      "{city} has some of the harshest conditions for a garage door: summer temperatures that turn an uninsulated garage into an oven, dust that works into every moving part, and monsoon storms that arrive fast.",
      "In {county} County the most common failures are overheated openers, UV-destroyed seals and rollers worn out by grit. Shade and ventilation matter as much as the door itself.",
    ],
    problems: [
      { title: "Overheating openers", text: "Motors and circuit boards fail early in garages that regularly exceed 110°F." },
      { title: "UV damage", text: "Sun exposure cracks seals, weatherstrip and paint on south- and west-facing doors." },
      { title: "Dust and sand in tracks", text: "Grit grinds rollers and hinges and makes the door bind." },
      { title: "Monsoon water intrusion", text: "Sudden heavy rain finds failed seals and floods garages that were dry all year." },
      { title: "Metal expansion", text: "Extreme heat expands panels and tracks, changing the door's alignment." },
    ],
    seasonal: "Service the opener before summer, clean tracks in dusty months and replace UV-damaged seals before monsoon season.",
    doorAdvice: "Insulated steel or aluminum with a UV-stable finish and a high-temperature-rated opener is the right pairing here.",
  },
  wet_mild: {
    key: "wet_mild",
    label: "Wet, mild winters",
    headline: "Constant rain and moss are harder on doors than cold weather",
    paragraphs: [
      "{city} gets long wet seasons rather than hard freezes. Rain drives into every gap, keeps steel damp and encourages moss and algae on the door and apron. Wooden doors are especially vulnerable because they never get a chance to dry out fully.",
      "In {county} County, the recurring repairs are rotten bottom rails, failed seals, rusty tracks and doors that swell and stick in the wettest months.",
    ],
    problems: [
      { title: "Rot in wooden doors", text: "Persistent moisture attacks the bottom rail and joints first." },
      { title: "Rust on tracks and cables", text: "Constant damp shortens the life of bare steel parts." },
      { title: "Failed bottom seals", text: "Standing water at the apron destroys seals and lets rain into the garage." },
      { title: "Moss and algae", text: "Growth on the door and apron traps moisture against the surface." },
      { title: "Swelling and binding", text: "Wooden sections swell in wet months and drag in the opening." },
    ],
    seasonal: "Inspect the bottom rail and seals before the rainy season, and keep the apron clear so water drains away from the door.",
    doorAdvice: "Fiberglass, aluminum or steel with a factory finish avoids the rot problem entirely in a wet climate.",
  },
  coastal_mild: {
    key: "coastal_mild",
    label: "Mild coastal climate",
    headline: "Salt fog and mild weather hide slow corrosion until something fails",
    paragraphs: [
      "{city} has mild temperatures but salty, damp air. That combination does not freeze doors or bake them, but it corrodes hinges, cables and track hardware steadily and quietly. By the time a door starts to stick or squeal, the damage is usually well advanced.",
      "In {county} County, regular lubrication and a hardware inspection twice a year is the cheapest maintenance you can do — it is far cheaper than replacing cables and tracks.",
    ],
    problems: [
      { title: "Salt-fog corrosion", text: "Bare steel hardware rusts steadily in coastal air." },
      { title: "Seized rollers and hinges", text: "Corrosion removes the smooth movement that keeps the door balanced." },
      { title: "Cable wear", text: "Moisture and salt shorten cable life and increase the risk of a sudden snap." },
      { title: "Seal degradation", text: "UV and damp combine to crack seals and weatherstrip." },
      { title: "Quiet misalignment", text: "Small track shifts go unnoticed until the door starts binding." },
    ],
    seasonal: "Book a spring and autumn service visit; coastal doors need lubrication and hardware checks more often than inland doors.",
    doorAdvice: "Aluminum, fiberglass or steel with stainless hardware holds up best in salt air; avoid untreated wood.",
  },
};

export function climateFor(key: string): ClimateProfile {
  return CLIMATES[key] || CLIMATES.humid;
}
