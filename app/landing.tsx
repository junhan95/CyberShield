"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { BrandLockup } from "./brand";
import { CutawayMap } from "./cutaway-map";
import { StructuredData } from "./structured-data";
import { asset, languages, route } from "./site-config";
import type { Lang } from "./site-config";

export type { Lang };
type Inquiry = "consultation" | "quote";
type SendState = "idle" | "sending" | "sent" | "error";

const copy = {
  en: {
    nav: {
      threats: "Why CyberShield",
      solution: "Solution",
      ecosystem: "Ecosystem",
      verification: "Verification",
      applications: "Applications",
      process: "Process",
      company: "Frankonia",
      contact: "Contact",
    },
    langLabel: "Select language",
    menuOpenLabel: "Open menu",
    menuCloseLabel: "Close menu",
    alt: {
      facility: "Aerial view of a data-center facility campus",
      technician: "Technician verifying systems inside the data hall",
      engineer: "Engineer inspecting racks inside a protected server aisle",
    },
    sectorAlt: [
      "Rows of GPU racks inside a galvanized steel shielded hall with red frame accents",
      "Modular shielded vault with a double-leaf RF door standing in a colocation hall",
      "Dark shielded command room with wall displays and a heavy RF door",
      "Low RF-shielded field shelter on open terrain under an overcast sky with a drone overhead",
      "Residential safe room with a shielded steel door opening onto a bright hallway",
      "Shielded boardroom with acoustic wall panels and a glass-and-steel RF door",
    ],
    ecosystemAlt: [
      "Modular PAN shielding panels forming the wall of a shielded room, carried on a self-supporting steel structure",
      "Double-leaf RF shielded doors set into the facade of a shielded room",
      "Filter cabinets beside an opened power line filter bank at the shielding boundary",
      "Honeycomb ventilation waveguide panel mounted into a shielded wall",
      "Measurement instruments on a control desk used for shielding effectiveness testing",
      "A hall of installed shielded rooms with access platform and stairs",
    ],
    consultation: "Book a consultation",
    quote: "Request a quote",
    eyebrow: "NEXT-GENERATION ELECTROMAGNETIC SHIELDING · HIGH-SECURITY DATA CENTER ENCLOSURES · HOME PROTECTION SOLUTIONS",
    heroTitle: "Zero leakage. Zero interference.",
    heroAccent: "A measurable electromagnetic boundary.",
    heroBody:
      "Engineered, integrated and verified as one system. CyberShield wraps AI and data workloads, sovereign infrastructure and private safe rooms in the market’s most flexible high-attenuation shielding — installed around live operations and handed over with measured evidence.",
    explore: "Explore the system",
    metrics: [
      ["Verified on site", "Shielding performance is measured after installation—not assumed"],
      ["Weld-free assembly", "Bolted modules installed alongside live operations, no hot work"],
      ["Built to change", "Dismount, expand or relocate the room without damage"],
    ],
    proof: ["Engineering heritage since 1987", "5 global locations", "Presence in 80+ countries", "Turnkey delivery"],
    beliefEyebrow: "HOW WE THINK ABOUT SHIELDING",
    beliefTitle: "For decades, the building has had to serve the shield.",
    beliefLabels: ["The status quo", "What we believe"],
    beliefStatusQuo:
      "For as long as shielded rooms have existed, the facility has had to accommodate the shield. Conventional shielding is welded into place, fixed at design stage and permanent from the day it is finished. The building is planned around it. Construction stops for it. And when racks change, power density rises or the site outgrows itself, the room cannot follow. Protection ends up being the least flexible part of the fastest-moving infrastructure there is.",
    beliefBelief:
      "We believe it should be the other way around: the room adapts to the facility, not the facility to the room. So we build ours from prefabricated steel modules that pass through a standard building door, assemble from the inside, sit close to existing walls and bolt together—no welding, no glue, nothing irreversible. The room can be extended, reconfigured or relocated entirely, then measured again. Full protection, none of the permanence.",
    coverEyebrow: "WHAT THE BOUNDARY ENCLOSES",
    coverTitle: "Four things the boundary has to enclose.",
    cover: [
      ["High-performance compute infrastructure", "Core compute zones and high-density, accelerated server racks."],
      ["Cryptographic & administration assets", "Key management systems, cryptographic infrastructure and privileged access control facilities."],
      ["Network interconnection points", "Network entrance facilities, meet-me rooms and cross-connect nodes."],
      ["Critical power & auxiliary infrastructure", "Power distribution hubs, UPS corridors and all filtered service penetrations crossing the perimeter."],
    ],
    whyEyebrow: "APPLICATIONS THAT REQUIRE PERFORMANCE",
    whyTitle: "AI data center security no longer ends at the software layer.",
    whyBody:
      "Firewalls, encryption and zero trust stop what arrives over the network. As the value held inside an AI data center grows, the paths that never touch the network—through physical space and through electromagnetic coupling—have become a real part of the assessment. Software security and physical security now have to be designed together.",
    whyMetric: "−120 dB",
    whyMetricLabel: "The attenuation CyberShield provides against a signal that never enters the network — peak shielding effectiveness, measured on site to EN 50147-1.",
    whyValueLabel: "THE SHORT ANSWER",
    whyValueTitle: "One boundary — designed, built and measured under a single responsibility.",
    whyValueBody:
      "Shielding structure, doors, filters, ventilation waveguides and every penetration are engineered as one continuous boundary, assembled weld-free alongside live operations, then measured on site to EN 50147-1 / IEEE 299 and handed over as documented evidence. What you keep at the end is a measurement, not an assurance.",
    assetCards: [
      ["A national strategic asset", "AI compute is already treated as national capability. Model weights, training data and sovereign workloads are corporate property and a matter of state interest at once — which is exactly what makes them worth targeting."],
      ["EMC and EMP exposed by design", "Dense GPU racks take tens of kilowatts through switching electronics, and 400G/800G interconnects work to noise budgets measured in millivolts. As power density rises, emission goes up and immunity headroom comes down. Protection sized for a conventional server room does not cover this."],
      ["Protection from what is outside", "Data centers sit near industry, transmitters and transport infrastructure. The ambient RF environment is not yours to control and only gets busier. Intentional interference can be assembled from commercially available parts — which is why IEC 61000-4-36 exists as a test standard in its own right."],
    ],
    threatEyebrow: "HOW THE EXPOSURE ARRIVES",
    threatTitle: "Four routes to the same asset—none of them across a firewall.",
    threatBody:
      "Each one reaches processing hardware through physical space or through electromagnetic coupling. Each one is closed at the facility boundary.",
    threats: [
      ["Compromising emanations", "Processing activity radiates. In 2026 a neural network's architecture was reconstructed from GPU emissions 6 m away through a wall, and model parameters were read directly from NVIDIA Tensor Cores. Neither attack touched the network.", "Confidentiality exposed"],
      ["Intentional interference", "Localized high-power RF or electromagnetic energy can disrupt electronics, controls and communications.", "Service interruption"],
      ["EMP / HEMP exposure", "Radiated and conducted pulse effects can challenge critical systems and continuity architectures. The E1 pulse rises in 2.5 ns—before surge protection rated for lightning has reacted.", "Mission continuity risk"],
      ["Boundary vulnerabilities", "Doors, ventilation, power, data, cooling and utility penetrations can become the weakest path through the shield.", "Protection degraded"],
    ],
    impactLabel: "Potential impact",
    systemEyebrow: "PERFORMANCE SHIELDING",
    technologyTitle: "What you receive at handover",
    technology: [
      "On-site shielding effectiveness measurement across the specified frequency range",
      "Leak detection sweep of doors, filters, honeycombs and every feed-through",
      "Documented acceptance report issued with the room",
      "Periodic re-testing and security re-certification as a service",
    ],
    environmentEyebrow: "SHIELDED ENVIRONMENT",
    environmentTitle: "Modular and prefabricated PAN type shielding.",
    environmentBody: [
      "Frankonia shielded rooms and special security chambers are designed on a modular construction system. Prefabricated high-quality shielding panels guarantee maximum flexibility in the possible dimensions.",
      "All PAN type modules allow easy handling and entry through standard building doors. The standard modules are bolted from the inside every 75 mm, with a high-conductivity mesh gasket sealing the joints, which allows installation close to the walls of the parent building. The short screwing distance and the precise tightening of the screws with predefined torque guarantee long-life shielding attenuation.",
    ],
    environmentFeaturesTitle: "Features",
    environmentFeatures: [
      "PAN type shielding modules made of 2.0 mm thick galvanized steel",
      "Modular and prefabricated standard",
      "Self-supporting stability, or a static steel structure for any seismic condition",
      "Mounted from the inside",
      "Raised floor systems or welded floor systems",
      "Long-life shielding attenuation characteristics",
      "No glue, no welding",
      "Dismountable without any damage, easy modification and maintenance",
      "Complete transfer or future modification possible",
      "Turnkey solution",
    ],
    environmentStandardsTitle: "Shielding standards",
    environmentStandards: [
      "Frequency range acc. to EN 50147-1 or IEEE 299 (option) from 10 kHz up to 18 GHz or 40 GHz",
      "Equal performance for any kind of feed-through component, honeycombs, doors and gates, filters, etc.",
      "Any size of shielding is possible",
      "Acoustic panels with absorption per ISO 354, αw = 0.65 (MH)",
    ],
    environmentAlt: "Modular PAN type shielded rooms with red steel frames inside a Frankonia production hall",
    systemTitle: "A secure room engineered around the reality of your facility.",
    systemBody:
      "Prefabricated PAN modules pass through standard building doors, assemble from the inside and can be installed close to existing walls. No glue. No welding. No irreversible commitment.",
    features: [
      ["01", "Precision assembly", "Panels are bolted every 75 mm with predefined torque and conductive mesh gaskets."],
      ["02", "Architectural integration", "Reversible modules leave flat interior surfaces for finishing walls, ceilings and racks, designed around raised floors, fire systems, lighting, cooling and access control."],
      ["03", "Adaptable by design", "Dismountable without damage for expansion, modification or complete relocation."],
      ["04", "Complete boundary", "Shielding structure, doors, filters, honeycombs and waveguides are treated as one system."],
    ],
    cutawayEyebrow: "BEYOND SOFTWARE. TOTAL PHYSICAL IMMUNITY.",
    cutawayTitle: "See for yourself what CyberShield builds into a shielded room.",
    cutawayBody:
      "Twenty-one engineered solutions make up the shielding boundary — structure, penetrations, building services and power. Pick any one to see what it does and why it is there.",
    cutawayAlt: "Cutaway view of a CyberShield shielded data hall with its structure, doors, filters, ducts and power room",
    cutawayHint: "Choose a number on the render, or any part in the list.",
    ecosystemEyebrow: "SHIELDING COMPONENTS & ACCESSORIES",
    ecosystemTitle: "Six product lines. One zero-leak boundary.",
    ecosystemBody:
      "Since 1987, Frankonia has followed a prefabrication and modular standard at the highest quality and efficiency. Nothing is welded, nothing is glued, and every component is engineered as part of the same shielding envelope — so performance is not lost at the joints, the doors or the penetrations.",
    ecosystemCards: [
      [
        "CyberShield Structure",
        "Prefabricated 2.0 mm galvanized steel PAN module system for walls, ceilings and floors.",
        "Sheet steel to DIN 17162 / EN 10142 DX 52 D+Z, 275 g/m² galvanizing, bolted every 75 mm onto a self-supporting steel structure.",
      ],
      [
        "CyberShield Access",
        "Heavy-duty sliding and hinged RF doors, high-attenuation RF windows and integrated access monitoring.",
        "Circumferential triple contact system with conductive springs, 20,000 opening cycles MTBF, 150 mm standard threshold.",
      ],
      [
        "CyberShield Connectivity",
        "High-performance power line filters, fiber-optic waveguide penetrations and RF signal suppressors.",
        "Power, data and signal feed-throughs filtered to the same attenuation as the wall they cross — up to DN200 media penetrations.",
      ],
      [
        "CyberShield Air & Waveguides",
        "Honeycomb ventilation panels, acoustic panels (ISO 354) and shielded waveguides for liquid cooling and utilities.",
        "Below-cut-off honeycomb waveguides pass air without passing RF; acoustic inlay panels absorb to ISO 354, αw = 0.65 (MH).",
      ],
      [
        "CyberShield Validation",
        "EN 50147-1 / IEEE 299 shielding measurement, leak detection, SE testing and compliance documentation.",
        "Guaranteed shielding effectiveness of ≥ 90 dB at 10 kHz rising to ≥ 120 dB at 100–400 MHz and holding ≥ 100 dB to 40 GHz.",
      ],
      [
        "CyberShield Lifecycle",
        "Preventive maintenance, recalibration and periodic re-certification services.",
        "Nothing glued or welded, so the room can be dismounted without damage — modified, extended or relocated, then re-measured.",
      ],
    ],
    ecosystemNote: "The same shielding effectiveness applies across every product line — see the measured envelope",
    accessoriesTitle: "Standardized and customized, from one source.",
    accessoriesBody:
      "As a specialist in RF shielding, Frankonia offers a broad range of complementary products to remain a turnkey provider. Every room is custom designed with its own fully integrated electrical system, simple interfaces to the facility, and additional and individual accessories.",
    accessories: [
      ["Shielding and structure", [
        "Modular and prefabricated PAN type shielding system",
        "Highest shielding attenuation for every accessory: honeycombs, doors, feed-through elements, electrics and gates",
        "Acoustic panels (F.DJ-T), absorption per ISO 354",
        "Advanced facility-isolated construction methods",
      ]],
      ["Doors and gates", [
        "Broad range of doors and gates in various sizes",
        "Modular and prefabricated system",
        "Single-leaf door (SLD)",
        "Double-leaf door (DLD)",
        "Sliding door (SSD) or gates (SG)",
      ]],
      ["Ramps and platforms", [
        "Automatic ramps and platforms (flush entrance)",
        "Customized entrance solutions",
        "Staff and material sluice systems",
      ]],
      ["Electrical integration and compliance", [
        "Electrical distribution unit (outside accessible), cabling, safety functions per local standards",
        "LED lighting, explosion protection option, emergency lighting",
        "AC and DC filters, signal and data filters, optic converters",
        "Safety matrix and higher-level laboratory control unit (PLC system)",
        "CE conformity per Machinery Directive 2006/42/EG as standard, or for the complete facility as an option, paired with advanced safety measures",
      ]],
      ["Ventilation, fluid, feed-through, smoke and gas", [
        "Honeycombs, fluid feed-throughs, cooling and exhaust systems",
        "Air sampling network for gas and smoke detection systems",
        "Smoke and gas detection analyzer with alarm central; ATEX compliance",
        "Liquid detection system",
        "Extinguishing solutions (sprinklers, etc.)",
      ]],
      ["Video & audio systems", [
        "HD camera systems, fixed or mobile version",
        "Audio systems",
        "Recording systems",
      ]],
    ],
    verifyEyebrow: "NEXT-GEN SHIELDING STANDARD",
    verifyTitle: "Proven performance you don't have to take on faith.",
    verifyBody:
      "Every CyberShield project is engineered around your facility and ends with measured evidence. Shielding effectiveness is tested on site according to international standards, and documented acceptance with detailed performance results is handed over with the room.",
    verifyStats: [
      ["≥ 90 dB", "at 10 kHz", "magnetic field"],
      ["≥ 120 dB", "at 100 MHz", "plane wave"],
      ["≥ 100 dB", "at 40 GHz", "microwave"],
    ],
    standardsIntro: "Measured and validated against",
    standards: [
      ["EN 50147-1", "Shielding effectiveness measurement"],
      ["IEEE 299", "Available as a project option"],
      ["BSI TL-03305 / 03306", "Eavesdropping-protected rooms & IT enclosures"],
      ["NATO SDIP-27 Level A", "TEMPEST design & approval, aligned with NSA 94-106"],
      ["MIL-STD-188-125-1 / -2", "HEMP and IEMI protection, project-specific validation"],
      ["ISO/IEC 27001", "Supports the physical and environmental security controls"],
    ],
    regulatoryIntro: "Why it is being specified now",
    regulatory: [
      ["ICD 705, 2025 revision", "RF shielding must be integrated into walls, ceilings and doors — existing SCIFs become retrofit candidates"],
      ["CISA EMP Guidelines v2.2, Level 4", "MIL-STD-188-125-1 protection at 1–5 % of new-build cost"],
      ["SL5 Standard, Section 3.9 SA-4", "Shielded rack enclosures in the AI weight enclave — not law, but written by the frontier labs themselves"],
      ["EO 13865 / NDAA CIPA", "EMP resilience duties across 16 critical-infrastructure sectors"],
    ],
    evidenceTitle: "Evidence base",
    evidenceNote:
      "Figures, terminology and threat definitions on this page are read from the publications below. Each entry names the issuing body, the document and the clause the statement comes from.",
    evidenceUsedFor: [
      "Cited for: model architecture recovered from GPU emissions at 6 m, through a wall",
      "Cited for: model parameters extracted directly from GPU tensor cores",
      "Cited for: the E1 HEMP waveform and the 2.5 ns rise time quoted on this page",
      "Cited for: intentional electromagnetic interference treated as its own test discipline",
      "Cited for: the definition and scope of compromising emanations",
      "Cited for: shielded rack enclosures at NSA 94-106 levels inside the weight enclave",
      "Cited for: the SL1–SL5 framework these application profiles are anchored to",
      "Cited for: information leakage as a physical and environmental protection control",
      "Cited for: Level 4 protection defined as MIL-STD-188-125-1, at 1–5 % of new-build cost",
      "Cited for: data center facility and infrastructure terminology",
    ],
    attenuationEyebrow: "GUARANTEED ATTENUATION PERFORMANCE",
    attenuationTitle: "One shielding envelope, verified from 10 kHz to 40 GHz.",
    attenuationBody:
      "Standard-setting PAN type module engineering, measured in accordance with EN 50147-1 and IEEE 299. The same attenuation is engineered into every door, filter, honeycomb vent and feed-through in the boundary.",
    fieldTypes: { magnetic: "Magnetic field", plane: "Plane wave", microwave: "Microwave" },
    attenuationNote:
      "Values describe the guaranteed performance envelope of the standard PAN type system. The scope that applies to your project is confirmed in the specification and by on-site acceptance testing.",
    applicationsEyebrow: "WHO CYBERSHIELD IS BUILT FOR",
    applicationsTitle: "Six environments where the boundary has to hold.",
    applicationsBody:
      "From global compute clusters to secure meeting chambers and private safe rooms, the same sovereign-grade shielding delivers measurable, certified security wherever performance is mandatory.",
    deliverableLabel: "Core deliverable",
    applicationGroups: [
      {
        title: "Industrial applications",
        tagline: "Infrastructure, AI cloud and data centers",
        sectors: [
          ["Hyperscale cloud & AI centers", "Core AI compute clusters, quantum hardware and critical availability zones, shielded against RF tampering and high-power electromagnetic threats.", "RF-sealed airflow and cooling pass-throughs, zero-drift signal isolation for quantum states and high-power directed-energy (HPEM) mitigation."],
          ["Colocation & enterprise data centers", "A certified shielded vault offered as a premium, measurable security tier for enterprise customers under strict governance requirements.", "IEEE 299 certified modular vault systems and retrofittable shielded cages, satisfying the physical-security requirements of NIS2, HIPAA and SOC 2."],
          ["Defence, government & financial institutions", "Sovereign cloud deployments, command centres and high-frequency trading platforms where confidentiality cannot be left to assumption.", "NATO/NSA TEMPEST-grade signal containment, zero-emanation perimeters and transmission security against spoofing and jamming."],
          ["Drone defense & signature concealment", "Anti-drone shielding, aerial surveillance evasion and shelters where visual and electronic privacy cannot be left to assumption.", "Multispectral signature reduction, counter-UAS perimeter signal blocking and rapidly deployable RF-shielded field enclosures."],
        ],
        focusTitle: "Focus: infrastructure, AI cloud & data centers",
        focus: [
          ["Signal isolation for AI & quantum infrastructure", "Eliminates ambient electromagnetic noise that distorts sensitive quantum state measurements and high-density GPU matrix calculations."],
          ["Sovereign data & perimeter containment", "Guarantees absolute physical isolation of sovereign cloud servers so zero data emissions cross national or institutional boundaries."],
          ["High-power directed energy & EMP protection", "Shields critical availability zones against high-altitude electromagnetic interference (HEMP) and targeted weapons designed to destroy high-frequency processors."],
          ["Modular vault scale", "Scalable, retrofittable shielded cages and server rooms that adapt as enterprise tenants expand their physical footprint."],
        ],
      },
      {
        title: "Home security applications",
        tagline: "Preventive protection and private applications",
        sectors: [
          ["Home shielding & family protection", "Sovereign-grade disaster preparation, private family bunkers and residential safe rooms where personal security and total confidentiality cannot be left to assumption.", "MIL-STD-188-125 EMP-hardened power hubs, multi-layered structural Faraday shielding, CBRN air filtration and air-gapped safe-haven data vaults."],
          ["Eavesdropping prevention & secure chambers", "Acoustic isolation, counter-surveillance shielding and secure meeting chambers where sensitive conversations and private intelligence cannot be left to assumption.", "100 dB+ certified broadband RF attenuation, high-STC acoustic walls with perimeter sound masking and power-line filtering."],
        ],
        focusTitle: "Focus: preventive protection & private applications",
        focus: [
          ["Electromagnetic resiliency", "Protects off-grid energy storage, solar inverters, communication links and medical equipment against high-altitude electromagnetic pulses (HEMP), coronal mass ejections (CMEs) and directed energy bursts."],
          ["Perimeter signal containment", "Eliminates RF and Wi-Fi signal leakage from the residence to prevent external digital reconnaissance, drone surveillance and wireless perimeter breaches."],
          ["Physical & environmental autonomy", "Maintains life-support systems, clean air and critical communications during grid failures or civil disruptions without exposing external vulnerability signals."],
        ],
      },
    ],
    scenarioEyebrow: "HOW CYBERSHIELD IS USED",
    scenarioTitle: "Three situations we see again and again.",
    scenarioLabels: { challenge: "Challenge", approach: "Approach", outcome: "Outcome" },
    scenarios: [
      [
        "Government & sovereign cloud",
        "A classified zone inside a live facility.",
        "A government cloud program required a secure processing zone for classified workloads inside an existing data center.",
        "The shielded vault was engineered around live operations, installed without welding and verified on site.",
        "A high-security zone delivered and acceptance-tested without interrupting the surrounding facility.",
      ],
      [
        "AI labs & hyperscale operations",
        "A measurable boundary around the assets.",
        "An AI firm sought to safeguard its proprietary model weights and training clusters from side-channel emanations and external interference.",
        "A dedicated shielded room, integrated cooling, power and monitoring for high-density racks.",
        "A measured, documented security boundary around the company's most valuable IP.",
      ],
      [
        "Colocation providers, defense, finance & communications",
        "Premium security without rebuilding.",
        "A colocation operator wanted a premium tier for regulated customers without rebuilding the site.",
        "A modular vault was added inside existing white space and packaged as a verified product.",
        "A high-margin revenue stream driven by an exclusive, hard-to-replicate security tier.",
      ],
    ],
    scenarioNote: "Representative scenarios based on typical project profiles.",
    scenarioLink: "See Frankonia project references",
    processEyebrow: "END-TO-END FRANKONIA SOLUTIONS",
    processTitle: "From first contact to verified protection.",
    processSteps: [
      ["01", "Initial consultation", "A specialist reviews your goals, site and constraints. No documentation is required to start."],
      ["02", "Risk & site assessment", "Assets, threat scenarios, ambient RF conditions and facility constraints are assessed; protection requirements are defined together."],
      ["03", "Concept & 3D engineering", "You receive a concept design, CAD/BIM architectural integration and a transparent quotation."],
      ["04", "Precision manufacturing", "PAN modules, RF doors, power and data filters and honeycomb vents are produced in Frankonia's own facilities."],
      ["05", "Installation & verification", "Certified teams assemble the modules without welding; shielding effectiveness and leak detection are measured and documented at handover."],
      ["06", "Operation & support", "Preventive maintenance, periodic re-testing and security re-certification keep the boundary effective over time."],
    ],
    scopeEyebrow: "CLEAR SCOPE FROM DAY ONE",
    scopeTitle: "Frankonia, and where partners get involved.",
    scopeBody:
      "A transparent split of responsibility across the protected room, so nothing inside the boundary is left to assumption.",
    scopeHead: ["Category", "Importance", "Scope & expertise"],
    scopeRows: [
      ["RF shielding performance", "Core", "In-house manufacturing with guaranteed performance"],
      ["Doors & access solutions", "Core", "Precision RF hinged and sliding doors"],
      ["Electric filters", "Core", "Power, data and signal RF filters"],
      ["Ventilation & fluid", "Core", "Honeycombs, fluid media feed-throughs and ventilation systems"],
      ["EMC testing & certification", "Core", "On-site validation and leak detection"],
      ["Maintenance & service", "Service", "Annual audits and lifecycle support"],
      ["Building security systems", "Partner", "Interface integration with facility security"],
      ["Intrusion alarm systems", "Partner", "Interface integration with room alarm systems"],
      ["Organizational procedures", "Customer", "Best-practice advisory provided by Frankonia"],
    ],
    companyEyebrow: "ADVANTAGES & BENEFITS",
    companyValuesTitle: "Frankonia core values",
    companyValues: [
      ["Ingenuity", "We never stop pushing forward, look for advantage in everything, handle challenges with creativity and strive for simplicity."],
      ["Energy", "We bring energy to everything we do, stay hungry and believe in what we do, are open to challenges and share the passion for our work."],
      ["Community", "We act fair and respectful, roll up our sleeves to get the job done, shape the future together and win as a team."],
      ["Fairness", "We are open-minded and curious, admit failures, learn and improve, communicate with clarity and honesty and take responsibility for our actions."],
    ],
    companyLocationsTitle: "Frankonia worldwide",
    companyLocations: [
      ["Frankonia Germany EMC Solutions GmbH", "Heideck, Germany"],
      ["Frankonia EMC Test-Systems GmbH", "Forchheim, Germany"],
      ["Jiashan Frankonia EMC Co., Ltd.", "Jiashan, Zhejiang, China"],
      ["Frankonia India EMC Solutions Pvt. Ltd.", "Chennai, India"],
    ],
    companyTitle: "The shielding is not new. The application is.",
    companyBody:
      "The Frankonia Group was founded in 1987 as a solution provider for EMC and antenna test laboratories, and is today a specialized technology corporation for anechoic chambers and test systems in the automotive, military and industrial sectors. CyberShield applies that same shielding engineering to data infrastructure. In-house project management, engineering and production — with Frankonia's own installation and service teams — mean the boundary, the doors, the filters and the acceptance measurement all come from one source.",
    companyImageAlt: "Aerial view of the Frankonia Group headquarters and production site in Germany",
    companyLink: "Visit Frankonia",
    companyGlanceTitle: "Frankonia stands for",
    companyGlance: [
      ["Global presence", "A well-structured network of production, representation and service units, active worldwide."],
      ["Complete solution provider", "Fundamental knowledge across every discipline a shielded facility touches."],
      ["Innovation as method", "Technologies adopted to raise efficiency, outcome and quality alongside customer needs."],
      ["Preferred partner", "Customized, state-of-the-art solutions rather than catalog products."],
    ],
    companyColumns: [
      [
        "Product advantages",
        [
          ["Modular and self-supporting", "The shielding carries itself, so the parent building takes no additional structural load."],
          ["Identical performance throughout", "The same shielding effectiveness across panels, doors, filters and waveguides — no weak link at the joints."],
          ["Bolted, never glued or welded", "Every joint is a screwed connection with a conductive mesh gasket, so the room stays serviceable for decades."],
          ["Produced in-house", "Prefabricated standard components manufactured by Frankonia rather than sourced and assembled."],
        ],
      ],
      [
        "Customer benefits",
        [
          ["Proven for more than 35 years", "Technologies in service in EMC test laboratories worldwide since 1987."],
          ["Few demands on the building", "The design adapts to existing electricity, statics and building conditions rather than the other way round."],
          ["Relocate, modify, re-sell", "The modular setup can be dismounted and rebuilt elsewhere without damage."],
          ["Simple building interfaces", "Electricity, ventilation, exhaust, data and gas detection cross the boundary through defined, filtered interfaces."],
        ],
      ],
      [
        "Why customers select Frankonia",
        [
          ["One partner, start to finish", "Consultation, manufacturing, installation, acceptance testing and recertification under a single responsibility."],
          ["Building design support", "Frankonia works with architects and contractors early, while shielding decisions are still inexpensive to make."],
          ["No compromise on safety", "Non-combustible, recyclable materials — no carbon, no polyethylene, no glue."],
          ["Project management that finishes", "Experienced teams carry both the detail and the schedule through to handover."],
        ],
      ],
    ],
    faqEyebrow: "COMMON QUESTIONS",
    faqTitle: "The questions every project starts with.",
    faqs: [
      [
        "Can CyberShield be installed in an existing, operating facility?",
        "Yes. Modules pass through standard doors and are bolted together from the inside—no welding or hot work—so installation alongside live operations is a common project profile.",
      ],
      [
        "How long does a project take?",
        "It depends on size and integration scope. As a rough guide, room assembly itself takes weeks, and the full cycle from assessment to verified handover typically runs several months. A concrete schedule is part of the concept proposal.",
      ],
      [
        "What determines the cost?",
        "Size, performance requirements, the number of penetrations (doors, power, data, cooling) and integration complexity. Basic project parameters are enough for a first consultation and estimate.",
      ],
      [
        "Does the shield interfere with cooling, fire safety or daily operations?",
        "No. Airflow, raised floors, fire suppression, lighting and access control are engineered into the boundary from the start.",
      ],
      [
        "What if we need to expand or relocate later?",
        "The system is dismountable without damage. Rooms can be extended, reconfigured or reassembled at a new site—protecting the original investment.",
      ],
    ],
    contactEyebrow: "START WITH YOUR RISK PROFILE",
    contactTitle: "Let’s define the right protection boundary.",
    contactBody:
      "Tell us what you need to protect. A Frankonia specialist will review your project and respond by email.",
    contactEmail: "sales-cybershield@frankoniagroup.com",
    brochureLabel: "Download the CyberShield brochure",
    brochureMeta: "PDF · 10.3 MB · English",
    labels: {
      type: "Request type",
      name: "Name",
      company: "Company",
      email: "Business email",
      country: "Country / region",
      project: "Project type",
      stage: "Project stage",
      message: "Project requirements",
      consent: "I agree that Frankonia may use this information to respond to my request.",
      submitConsultation: "Send consultation request",
      submitQuote: "Send quote request",
    },
    options: {
      newBuild: "New build",
      retrofit: "Retrofit / expansion",
      confidential: "Confidential / to be discussed",
      concept: "Concept / feasibility",
      planning: "Design / specification",
      procurement: "Procurement / tender",
      urgent: "Active project / urgent",
    },
    emailNote:
      "Your details are sent to Frankonia over an encrypted connection and forwarded to the sales contact responsible for your region. They are used for nothing else.",
    formSending: "Sending…",
    formSent: "Thank you — your request has reached us. A Frankonia specialist will reply by email.",
    formError: "The request could not be sent. Please try again, or send it as an email instead.",
    formErrorAction: "Send as email",
    formHoneypot: "Leave this field empty",
    footer:
      "CyberShield is a high-assurance engineering solution. Performance, standards and certification scope depend on the agreed project configuration and final validation.",
  },
  de: {
    nav: {
      threats: "Warum CyberShield",
      solution: "Lösung",
      ecosystem: "Produktwelt",
      verification: "Nachweis",
      applications: "Anwendungen",
      process: "Ablauf",
      company: "Frankonia",
      contact: "Kontakt",
    },
    langLabel: "Sprache wählen",
    menuOpenLabel: "Menü öffnen",
    menuCloseLabel: "Menü schließen",
    alt: {
      facility: "Luftaufnahme eines Rechenzentrums-Campus",
      technician: "Prüfung der Systeme in der Datenhalle",
      engineer: "Inspektion der Racks in einem geschützten Servergang",
    },
    sectorAlt: [
      "GPU-Rackreihen in einer geschirmten Halle aus verzinktem Stahl mit roten Rahmenakzenten",
      "Modularer Schirmtresor mit zweiflügeliger HF-Tür in einer Colocation-Halle",
      "Dunkler geschirmter Führungsraum mit Wanddisplays und schwerer HF-Tür",
      "Niedriger HF-geschirmter Feldraum in offenem Gelände unter bedecktem Himmel mit einer Drohne darüber",
      "Privater Schutzraum mit geschirmter Stahltür, die in einen hellen Flur öffnet",
      "Geschirmter Sitzungsraum mit Akustikpaneelen und einer HF-Tür aus Glas und Stahl",
    ],
    ecosystemAlt: [
      "Modulare PAN-Schirmpaneele als Wand eines Schirmraums, getragen von einer selbsttragenden Stahlkonstruktion",
      "Zweiflügelige HF-Schirmtüren in der Fassade eines Schirmraums",
      "Filterschränke neben einer geöffneten Netzfilterbank an der Schirmgrenze",
      "In eine Schirmwand eingebauter Wabenkamin als Hohlleiter für die Lüftung",
      "Messgeräte auf einem Steuerpult für die Schirmdämpfungsmessung",
      "Halle mit installierten Schirmräumen, Zugangspodest und Treppe",
    ],
    consultation: "Beratung vereinbaren",
    quote: "Angebot anfordern",
    eyebrow: "ELEKTROMAGNETISCHE SCHIRMUNG DER NÄCHSTEN GENERATION · HOCHSICHERE RECHENZENTRUMS-ZELLEN · SCHUTZLÖSUNGEN FÜR DEN PRIVATEN BEREICH",
    heroTitle: "Null Leckage. Null Störung.",
    heroAccent: "Eine messbare elektromagnetische Grenze.",
    heroBody:
      "Geplant, integriert und nachgewiesen als ein System. CyberShield umschließt KI- und Datenlasten, souveräne Infrastruktur und private Schutzräume mit dem flexibelsten hochdämpfenden Schirmungssystem am Markt – montiert im laufenden Betrieb und mit dokumentiertem Messnachweis übergeben.",
    explore: "System kennenlernen",
    metrics: [
      ["Vor Ort nachgewiesen", "Die Schirmdämpfung wird nach der Montage gemessen – nicht angenommen"],
      ["Schweißfreie Montage", "Verschraubte Module, Montage im laufenden Betrieb ohne Heißarbeiten"],
      ["Auf Veränderung ausgelegt", "Rückbau, Erweiterung oder Umzug des Raums ohne Beschädigung"],
    ],
    proof: ["Engineering-Erfahrung seit 1987", "5 Standorte weltweit", "Präsenz in über 80 Ländern", "Schlüsselfertige Umsetzung"],
    beliefEyebrow: "UNSER VERSTÄNDNIS VON SCHIRMUNG",
    beliefTitle: "Jahrzehntelang musste sich das Gebäude nach der Schirmung richten.",
    beliefLabels: ["Der Status quo", "Wovon wir überzeugt sind"],
    beliefStatusQuo:
      "Solange es Schirmräume gibt, musste die Anlage der Schirmung entgegenkommen. Herkömmliche Schirmung wird eingeschweißt, in der Planungsphase festgelegt und ist ab Fertigstellung unveränderlich. Das Gebäude wird um sie herum geplant. Der Bau steht für sie still. Und wenn sich Racks ändern, die Leistungsdichte steigt oder der Standort an seine Grenzen kommt, kann der Raum nicht folgen. Der Schutz wird zum unbeweglichsten Teil der beweglichsten Infrastruktur überhaupt.",
    beliefBelief:
      "Wir sind überzeugt, dass es umgekehrt sein muss: Der Raum passt sich der Anlage an, nicht die Anlage dem Raum. Deshalb bauen wir aus vorgefertigten Stahlmodulen, die durch eine normale Gebäudetür passen, von innen montiert werden, nah an bestehenden Wänden stehen und verschraubt werden – ohne Schweißen, ohne Kleber, nichts Unumkehrbares. Der Raum lässt sich erweitern, umbauen oder vollständig verlagern und danach erneut messen. Voller Schutz, ohne die Endgültigkeit.",
    coverEyebrow: "WAS DIE SCHIRMGRENZE EINSCHLIESST",
    coverTitle: "Vier Bereiche, die die Schirmgrenze einschließen muss.",
    cover: [
      ["Hochleistungs-Recheninfrastruktur", "Kernrechenzonen und hochdichte Beschleuniger-Racks."],
      ["Kryptografie- und Administrationsbereiche", "Schlüsselverwaltung, kryptografische Infrastruktur und Räume für privilegierte Zutrittskontrolle."],
      ["Netzübergabepunkte", "Netzeintrittsräume, Meet-me-Räume und Cross-Connect-Knoten."],
      ["Kritische Strom- und Nebeninfrastruktur", "Stromverteilung, USV-Trassen und jede gefilterte Versorgungsdurchführung durch den Perimeter."],
    ],
    whyEyebrow: "ANWENDUNGEN, DIE LEISTUNG VERLANGEN",
    whyTitle: "Die Sicherheit eines KI-Rechenzentrums endet nicht mehr auf der Softwareebene.",
    whyBody:
      "Firewalls, Verschlüsselung und Zero Trust halten auf, was über das Netzwerk kommt. Je größer der Wert wird, der in einem KI-Rechenzentrum liegt, desto ernsthafter gehören auch die Wege in die Betrachtung, die das Netzwerk nie berühren – über den physischen Raum und über elektromagnetische Kopplung. Software- und physische Sicherheit müssen heute gemeinsam geplant werden.",
    whyMetric: "−120 dB",
    whyMetricLabel: "Die Dämpfung, die CyberShield einem Signal entgegensetzt, das nie ins Netzwerk gelangt – Spitzenwert der Schirmdämpfung, vor Ort nach EN 50147-1 gemessen.",
    whyValueLabel: "DIE KURZE ANTWORT",
    whyValueTitle: "Eine Grenze – geplant, gebaut und gemessen aus einer Hand.",
    whyValueBody:
      "Schirmkonstruktion, Türen, Filter, Lüftungs-Hohlleiter und jede Durchführung entstehen als eine durchgängige Grenze, werden schweißfrei im laufenden Betrieb montiert und anschließend vor Ort nach EN 50147-1 / IEEE 299 gemessen und dokumentiert übergeben. Am Ende steht ein Messwert, keine Zusicherung.",
    assetCards: [
      ["Nationales strategisches Gut", "KI-Rechenleistung gilt längst als nationale Fähigkeit. Modellgewichte, Trainingsdaten und souveräne Workloads sind Unternehmenseigentum und staatliches Interesse zugleich – und genau das macht sie zum lohnenden Ziel."],
      ["Bauartbedingt EMV- und NEMP-exponiert", "Dichte GPU-Racks beziehen Dutzende Kilowatt über Schaltelektronik, 400G- und 800G-Interconnects arbeiten mit Störabständen im Millivoltbereich. Mit der Leistungsdichte steigt die Abstrahlung und sinkt die Störfestigkeitsreserve. Schutz, der für einen klassischen Serverraum ausgelegt ist, deckt das nicht ab."],
      ["Schutz vor dem, was draußen ist", "Rechenzentren stehen nahe an Industrie, Sendeanlagen und Verkehrsinfrastruktur. Die HF-Umgebung lässt sich nicht kontrollieren und wird dichter. Vorsätzliche Störbeeinflussung lässt sich aus handelsüblichen Komponenten aufbauen – deshalb gibt es IEC 61000-4-36 als eigene Prüfnorm."],
    ],
    threatEyebrow: "WIE DIE EXPOSITION ENTSTEHT",
    threatTitle: "Vier Wege zum selben Asset – keiner davon über eine Firewall.",
    threatBody:
      "Jeder erreicht die Verarbeitungshardware über den physischen Raum oder über elektromagnetische Kopplung. Jeder wird an der Gebäudehülle geschlossen.",
    threats: [
      ["Kompromittierende Abstrahlung", "Verarbeitung strahlt ab. 2026 wurde die Architektur eines neuronalen Netzes aus GPU-Emissionen über 6 m durch eine Wand rekonstruiert, und Modellparameter wurden direkt aus NVIDIA-Tensor-Cores ausgelesen. Keiner der beiden Angriffe berührte das Netzwerk.", "Vertraulichkeit gefährdet"],
      ["Vorsätzliche Störbeeinflussung", "Lokale HF- oder elektromagnetische Energie hoher Leistung kann Elektronik, Steuerungen und Kommunikation stören.", "Betriebsunterbrechung"],
      ["EMP-/HEMP-Exposition", "Gestrahlte und geleitete Impulseinwirkungen können kritische Systeme und Kontinuitätsarchitekturen beeinträchtigen. Der E1-Impuls steigt in 2,5 ns an – bevor blitzschutzgerechte Ableiter reagiert haben.", "Risiko für die Betriebskontinuität"],
      ["Schwachstellen der Schirmgrenze", "Türen, Lüftung sowie Strom-, Daten-, Kühl- und Versorgungsdurchführungen können zum schwächsten Punkt der Abschirmung werden.", "Schutzwirkung reduziert"],
    ],
    impactLabel: "Mögliche Auswirkung",
    systemEyebrow: "PERFORMANCE SHIELDING",
    technologyTitle: "Was Sie bei der Übergabe erhalten",
    technology: [
      "Schirmdämpfungsmessung vor Ort über den spezifizierten Frequenzbereich",
      "Lecksuche an Türen, Filtern, Wabenkaminen und jeder Durchführung",
      "Dokumentierter Abnahmebericht, übergeben mit dem Raum",
      "Wiederkehrende Messung und Sicherheits-Rezertifizierung als Service",
    ],
    environmentEyebrow: "SHIELDED ENVIRONMENT",
    environmentTitle: "Modulare, vorgefertigte Schirmung vom Typ PAN.",
    environmentBody: [
      "Schirmräume und spezielle Sicherheitsräume von Frankonia basieren auf einem modularen Bausystem. Vorgefertigte Schirmpaneele in hoher Qualität garantieren maximale Flexibilität bei den möglichen Abmessungen.",
      "Alle PAN-Module lassen sich einfach handhaben und durch Standardtüren einbringen. Die Standardmodule werden von innen alle 75 mm verschraubt, eine hochleitfähige Geflechtdichtung dichtet die Fugen – so ist die Montage nah an den Wänden des Bestandsgebäudes möglich. Der kurze Schraubabstand und das präzise Anziehen mit definiertem Drehmoment sichern die Schirmdämpfung über die gesamte Lebensdauer.",
    ],
    environmentFeaturesTitle: "Merkmale",
    environmentFeatures: [
      "PAN-Schirmmodule aus 2,0 mm dickem verzinktem Stahl",
      "Modularer, vorgefertigter Standard",
      "Selbsttragend oder mit statischer Stahlkonstruktion für jede seismische Anforderung",
      "Montage von innen",
      "Doppelboden- oder geschweißte Bodensysteme",
      "Langlebige Schirmdämpfungseigenschaften",
      "Kein Kleber, kein Schweißen",
      "Beschädigungsfrei demontierbar, einfache Änderung und Wartung",
      "Vollständiger Umzug oder spätere Änderung möglich",
      "Schlüsselfertige Lösung",
    ],
    environmentStandardsTitle: "Schirmnormen",
    environmentStandards: [
      "Frequenzbereich nach EN 50147-1 oder IEEE 299 (Option) von 10 kHz bis 18 GHz bzw. 40 GHz",
      "Gleiche Leistung für jede Durchführungskomponente, Wabenkamine, Türen und Tore, Filter usw.",
      "Jede Schirmgröße ist möglich",
      "Akustikpaneele mit Absorption nach ISO 354, αw = 0,65 (MH)",
    ],
    environmentAlt: "Modulare PAN-Schirmräume mit roten Stahlrahmen in einer Frankonia-Fertigungshalle",
    systemTitle: "Ein Sicherheitsraum, geplant für die Gegebenheiten Ihres Gebäudes.",
    systemBody:
      "Vorgefertigte PAN-Module passen durch Standardtüren, werden von innen montiert und lassen sich nah an bestehende Wände setzen. Ohne Kleber. Ohne Schweißen. Ohne unumkehrbare Festlegung.",
    features: [
      ["01", "Präzise Montage", "Die Paneele werden alle 75 mm mit definiertem Drehmoment und hochleitfähiger Geflechtdichtung verschraubt."],
      ["02", "Bauliche Integration", "Wendbare Module ergeben glatte Innenflächen für Ausbauwände, Decken und Racks – abgestimmt auf Doppelboden, Brandschutz, Beleuchtung, Kühlung und Zutrittskontrolle."],
      ["03", "Anpassungsfähig ausgelegt", "Beschädigungsfrei demontierbar für Erweiterung, Umbau oder den vollständigen Umzug."],
      ["04", "Durchgängige Schirmgrenze", "Schirmkonstruktion, Türen, Filter, Wabenkamine und Hohlleiter werden als ein System ausgelegt."],
    ],
    verifyEyebrow: "NEXT-GEN SHIELDING STANDARD",
    verifyTitle: "Nachgewiesene Leistung, die Sie nicht glauben müssen.",
    verifyBody:
      "Jedes CyberShield-Projekt wird um Ihre Anlage herum geplant und endet mit einem Messnachweis. Die Schirmdämpfung wird vor Ort nach internationalen Normen geprüft, die dokumentierte Abnahme mit detaillierten Messergebnissen wird mit dem Raum übergeben.",
    verifyStats: [
      ["≥ 90 dB", "bei 10 kHz", "Magnetfeld"],
      ["≥ 120 dB", "bei 100 MHz", "ebene Welle"],
      ["≥ 100 dB", "bei 40 GHz", "Mikrowelle"],
    ],
    standardsIntro: "Gemessen und validiert nach",
    standards: [
      ["EN 50147-1", "Messung der Schirmdämpfung"],
      ["IEEE 299", "Als Projektoption verfügbar"],
      ["BSI TL-03305 / 03306", "Abhörsichere Räume und IT-Schirmkabinen"],
      ["NATO SDIP-27 Level A", "TEMPEST-Auslegung und -Zulassung, abgestimmt auf NSA 94-106"],
      ["MIL-STD-188-125-1 / -2", "HEMP- und IEMI-Schutz, projektspezifische Validierung"],
      ["ISO/IEC 27001", "Unterstützt die physischen und umgebungsbezogenen Sicherheitsmaßnahmen"],
    ],
    regulatoryIntro: "Warum jetzt spezifiziert wird",
    regulatory: [
      ["BSI TL-03305, Nationales Zonenmodell", "Der Schirmraum senkt die Zonenanforderung — und damit den Aufwand für zonengerechte Geräte"],
      ["NATO SDIP-27 / NIAPC", "Geschirmte Kabinen als anerkannte Gegenmaßnahme innerhalb von Liegenschaften"],
      ["KRITIS-Dachgesetz, seit 17.03.2026", "Physische Resilienz ist gesetzliche Pflicht — EMP und IEMI gehören in die Allgefahrenanalyse"],
      ["NIS2 / DORA, EN 50600-2-5", "EMV ist aus EN 50600 ausdrücklich ausgenommen — die Anforderung muss gesondert spezifiziert werden"],
    ],
    evidenceTitle: "Quellen und Nachweise",
    evidenceNote:
      "Kennwerte, Begriffe und Bedrohungsdefinitionen dieser Seite stammen aus den unten genannten Veröffentlichungen. Jeder Eintrag nennt die herausgebende Stelle, das Dokument und die Stelle, auf die sich die Aussage stützt.",
    evidenceUsedFor: [
      "Belegt: aus GPU-Abstrahlung über 6 m durch eine Wand rekonstruierte Modellarchitektur",
      "Belegt: direkt aus GPU-Tensor-Cores extrahierte Modellparameter",
      "Belegt: die E1-NEMP-Wellenform und die auf dieser Seite genannte Anstiegszeit von 2,5 ns",
      "Belegt: absichtliche elektromagnetische Störungen als eigene Prüfdisziplin",
      "Belegt: Definition und Umfang kompromittierender Abstrahlung",
      "Belegt: geschirmte Rack-Gehäuse nach NSA 94-106 im Weight Enclave",
      "Belegt: das SL1–SL5-Rahmenwerk, an dem sich diese Einsatzprofile orientieren",
      "Belegt: Informationsabfluss als Maßnahme des physischen und umgebungsbezogenen Schutzes",
      "Belegt: Schutzgrad Level 4 nach MIL-STD-188-125-1 bei 1–5 % der Neubaukosten",
      "Belegt: Begriffe zu Rechenzentrumsgebäuden und -infrastruktur",
    ],
    attenuationEyebrow: "GARANTIERTE SCHIRMDÄMPFUNG",
    attenuationTitle: "Eine Schirmhülle, nachgewiesen von 10 kHz bis 40 GHz.",
    attenuationBody:
      "PAN-Modultechnik, die den Maßstab setzt – gemessen nach EN 50147-1 und IEEE 299. Dieselbe Dämpfung ist in jede Tür, jeden Filter, jeden Wabenkamin und jede Durchführung der Schirmgrenze eingeplant.",
    fieldTypes: { magnetic: "Magnetfeld", plane: "Ebene Welle", microwave: "Mikrowelle" },
    attenuationNote:
      "Die Werte beschreiben den garantierten Leistungsbereich des Standard-PAN-Systems. Der für Ihr Projekt geltende Umfang wird in der Spezifikation und durch die Abnahmemessung vor Ort bestätigt.",
    cutawayEyebrow: "MEHR ALS SOFTWARE. VOLLSTÄNDIGE PHYSISCHE IMMUNITÄT.",
    cutawayTitle: "Sehen Sie selbst, was CyberShield in einen Schirmraum einbaut.",
    cutawayBody:
      "Einundzwanzig durchdachte Lösungen bilden die Schirmgrenze — Konstruktion, Durchführungen, Gebäudetechnik und Stromversorgung. Wählen Sie eine aus, um zu sehen, was sie leistet und warum sie dort sitzt.",
    cutawayAlt: "Schnittansicht einer geschirmten CyberShield-Datenhalle mit Konstruktion, Türen, Filtern, Kanälen und Stromversorgungsraum",
    cutawayHint: "Wählen Sie eine Nummer im Schnitt oder ein Bauteil aus der Liste.",
    ecosystemEyebrow: "SCHIRMKOMPONENTEN UND ZUBEHÖR",
    ecosystemTitle: "Sechs Produktlinien. Eine lückenlose Schirmhülle.",
    ecosystemBody:
      "Seit 1987 folgt Frankonia einem Vorfertigungs- und Modulstandard in höchster Qualität und Effizienz. Nichts wird geschweißt, nichts geklebt – und jede Komponente ist als Teil derselben Schirmhülle ausgelegt, sodass an Fugen, Türen und Durchführungen keine Leistung verloren geht.",
    ecosystemCards: [
      [
        "CyberShield Structure",
        "Vorgefertigtes PAN-Modulsystem aus 2,0 mm verzinktem Stahlblech für Wände, Decken und Böden.",
        "Stahlblech nach DIN 17162 / EN 10142 DX 52 D+Z, Verzinkung 275 g/m², alle 75 mm verschraubt auf selbsttragender Stahlkonstruktion.",
      ],
      [
        "CyberShield Access",
        "Schwerlast-Schiebe- und -Drehtüren in HF-Ausführung, hochdämpfende HF-Fenster und integrierte Zutrittsüberwachung.",
        "Umlaufendes Dreifach-Kontaktsystem mit leitfähigen Kontaktfedern, MTBF 20.000 Öffnungen, Schwelle 150 mm im Standard.",
      ],
      [
        "CyberShield Connectivity",
        "Leistungsstarke Netzfilter, Lichtwellenleiter-Durchführungen als Hohlleiter und HF-Signalsperren.",
        "Strom-, Daten- und Signaldurchführungen werden auf dieselbe Dämpfung gefiltert wie die Wand, die sie queren — Medien bis DN200.",
      ],
      [
        "CyberShield Air & Waveguides",
        "Wabenkamine, Akustikpaneele (ISO 354) und geschirmte Hohlleiter für Flüssigkühlung und Medienversorgung.",
        "Wabenkamine unterhalb der Grenzfrequenz lassen Luft durch, aber keine HF; Akustikeinlagen dämpfen nach ISO 354, αw = 0,65 (MH).",
      ],
      [
        "CyberShield Validation",
        "Schirmdämpfungsmessung nach EN 50147-1 / IEEE 299, Lecksuche, SE-Prüfung und Konformitätsdokumentation.",
        "Garantierte Schirmdämpfung von ≥ 90 dB bei 10 kHz über ≥ 120 dB bei 100–400 MHz bis ≥ 100 dB bei 40 GHz.",
      ],
      [
        "CyberShield Lifecycle",
        "Vorbeugende Wartung, Nachkalibrierung und periodische Rezertifizierung.",
        "Nichts ist geklebt oder geschweißt: Der Raum lässt sich beschädigungsfrei demontieren, ändern, erweitern oder versetzen — und neu vermessen.",
      ],
    ],
    ecosystemNote: "Dieselbe Schirmdämpfung gilt für jede Produktlinie — zur gemessenen Kurve",
    accessoriesTitle: "Standardisiert und maßgeschneidert, aus einer Hand.",
    accessoriesBody:
      "Als Spezialist für HF-Schirmung bietet Frankonia ein breites Spektrum ergänzender Produkte, um Komplettanbieter zu bleiben. Jeder Raum wird individuell geplant – mit eigener, voll integrierter Elektroanlage, einfachen Schnittstellen zum Gebäude sowie zusätzlichem und individuellem Zubehör.",
    accessories: [
      ["Schirmung und Konstruktion", [
        "Modulares, vorgefertigtes PAN-Schirmsystem",
        "Höchste Schirmdämpfung für jedes Zubehör: Wabenkamine, Türen, Durchführungen, Elektrik und Tore",
        "Akustikpaneele (F.DJ-T), Absorption nach ISO 354",
        "Fortschrittliche, vom Gebäude entkoppelte Bauweisen",
      ]],
      ["Türen und Tore", [
        "Breites Spektrum an Türen und Toren in verschiedenen Größen",
        "Modulares, vorgefertigtes System",
        "Einflügelige Tür (SLD)",
        "Zweiflügelige Tür (DLD)",
        "Schiebetür (SSD) oder Tore (SG)",
      ]],
      ["Rampen und Podeste", [
        "Automatische Rampen und Podeste (ebenerdiger Zugang)",
        "Individuelle Zugangslösungen",
        "Personen- und Materialschleusen",
      ]],
      ["Elektrische Integration und Konformität", [
        "Elektroverteilung (von außen zugänglich), Verkabelung, Sicherheitsfunktionen nach lokalen Normen",
        "LED-Beleuchtung, Option Explosionsschutz, Notbeleuchtung",
        "AC- und DC-Filter, Signal- und Datenfilter, optische Konverter",
        "Sicherheitsmatrix und übergeordnete Laborsteuerung (SPS)",
        "CE-Konformität nach Maschinenrichtlinie 2006/42/EG als Standard – optional für die gesamte Anlage, kombiniert mit erweiterten Sicherheitsmaßnahmen",
      ]],
      ["Lüftung, Medien, Durchführungen, Rauch und Gas", [
        "Wabenkamine, Mediendurchführungen, Kühl- und Abluftsysteme",
        "Luftprobenetz für Gas- und Rauchmeldesysteme",
        "Rauch- und Gasanalysator mit Alarmzentrale; ATEX-Konformität",
        "Flüssigkeitsdetektion",
        "Löschlösungen (Sprinkler usw.)",
      ]],
      ["Video- und Audiosysteme", [
        "HD-Kamerasysteme, fest oder mobil",
        "Audiosysteme",
        "Aufzeichnungssysteme",
      ]],
    ],
    applicationsEyebrow: "FÜR WEN CYBERSHIELD GEBAUT WIRD",
    applicationsTitle: "Sechs Umgebungen, in denen die Schirmgrenze halten muss.",
    applicationsBody:
      "Vom globalen Rechencluster bis zum abhörsicheren Besprechungsraum und zum privaten Schutzraum: Dieselbe Schirmtechnik auf Sovereign-Niveau liefert messbare, zertifizierte Sicherheit überall dort, wo Leistung Pflicht ist.",
    deliverableLabel: "Kernleistung",
    applicationGroups: [
      {
        title: "Industrielle Anwendungen",
        tagline: "Infrastruktur, KI-Cloud und Rechenzentren",
        sectors: [
          ["Hyperscale-Cloud- und KI-Rechenzentren", "KI-Rechencluster, Quantenhardware und kritische Availability Zones – geschirmt gegen HF-Manipulation und hochenergetische elektromagnetische Bedrohungen.", "HF-dichte Luft- und Kühldurchführungen, driftfreie Signalisolation für Quantenzustände und Schutz gegen gerichtete Hochleistungsenergie (HPEM)."],
          ["Colocation- und Enterprise-Rechenzentren", "Ein zertifizierter Schirmtresor als messbare Premium-Sicherheitsstufe für Enterprise-Kunden mit strengen Governance-Anforderungen.", "Nach IEEE 299 zertifizierte modulare Tresorsysteme und nachrüstbare Schirmkäfige, die die physischen Sicherheitsanforderungen von NIS2, HIPAA und SOC 2 erfüllen."],
          ["Verteidigung, Behörden und Finanzinstitute", "Souveräne Cloud-Umgebungen, Führungszentralen und Hochfrequenzhandelsplattformen, deren Vertraulichkeit nicht auf Annahmen beruhen darf.", "Signaleinschluss auf NATO/NSA-TEMPEST-Niveau, abstrahlungsfreie Perimeter und Übertragungssicherheit gegen Spoofing und Jamming."],
          ["Drohnenabwehr und Signaturverschleierung", "Anti-Drohnen-Schirmung, Schutz vor Luftaufklärung und Schutzbauten, in denen visuelle und elektronische Privatsphäre nicht dem Zufall überlassen bleibt.", "Multispektrale Signaturreduktion, Counter-UAS-Signalsperre am Perimeter und schnell verlegbare HF-geschirmte Feldräume."],
        ],
        focusTitle: "Fokus: Infrastruktur, KI-Cloud und Rechenzentren",
        focus: [
          ["Signalisolation für KI- und Quanteninfrastruktur", "Beseitigt elektromagnetisches Umgebungsrauschen, das empfindliche Quantenzustandsmessungen und hochdichte GPU-Matrixberechnungen verfälscht."],
          ["Souveräne Daten und Perimeter-Einschluss", "Garantiert die vollständige physische Isolation souveräner Cloud-Server, sodass keine Datenemission nationale oder institutionelle Grenzen überschreitet."],
          ["Schutz vor gerichteter Hochleistungsenergie und EMP", "Schirmt kritische Availability Zones gegen Höhen-EMP (HEMP) und gezielte Waffen, die Hochfrequenzprozessoren zerstören sollen."],
          ["Modulare Tresorgröße", "Skalierbare, nachrüstbare Schirmkäfige und Serverräume, die mitwachsen, wenn Enterprise-Mieter ihre Fläche erweitern."],
        ],
      },
      {
        title: "Home-Security-Anwendungen",
        tagline: "Präventiver Schutz und private Anwendungen",
        sectors: [
          ["Home Shielding und Familienschutz", "Katastrophenvorsorge auf Sovereign-Niveau, private Familienbunker und Schutzräume im Wohnbereich, in denen persönliche Sicherheit und vollständige Vertraulichkeit nicht dem Zufall überlassen bleiben.", "EMP-gehärtete Energiezentralen nach MIL-STD-188-125, mehrlagige bauliche Faraday-Schirmung, CBRN-Luftfilterung und air-gapped Datentresore."],
          ["Abhörschutz und Sicherheitsräume", "Akustische Entkopplung, Schirmung gegen Überwachung und abhörsichere Besprechungsräume, in denen vertrauliche Gespräche und private Informationen nicht dem Zufall überlassen bleiben.", "Zertifizierte breitbandige HF-Dämpfung von über 100 dB, hochschalldämmende Wände mit Sound Masking am Perimeter und Netzfilterung."],
        ],
        focusTitle: "Fokus: präventiver Schutz und private Anwendungen",
        focus: [
          ["Elektromagnetische Resilienz", "Schützt netzunabhängige Energiespeicher, Solarwechselrichter, Kommunikationsverbindungen und Medizintechnik vor Höhen-EMP (HEMP), koronalen Massenauswürfen (CME) und gerichteten Energieimpulsen."],
          ["Signal-Einschluss am Perimeter", "Unterbindet HF- und WLAN-Leckagen aus dem Wohnhaus und verhindert so digitale Aufklärung von außen, Drohnenüberwachung und drahtlose Perimeterverletzungen."],
          ["Physische und umgebungsbezogene Autonomie", "Hält Lebenserhaltung, saubere Luft und kritische Kommunikation bei Netzausfall oder zivilen Störungen aufrecht, ohne nach außen Schwachstellen zu signalisieren."],
        ],
      },
    ],
    scenarioEyebrow: "SO WIRD CYBERSHIELD EINGESETZT",
    scenarioTitle: "Drei Situationen, die uns immer wieder begegnen.",
    scenarioLabels: { challenge: "Ausgangslage", approach: "Vorgehen", outcome: "Ergebnis" },
    scenarios: [
      [
        "Behörden und souveräne Cloud",
        "Eine Verschlusssachenzone im laufenden Betrieb.",
        "Ein staatliches Cloud-Programm benötigte eine sichere Verarbeitungszone für eingestufte Workloads in einem bestehenden Rechenzentrum.",
        "Der Schirmraum wurde um den laufenden Betrieb herum geplant, schweißfrei montiert und vor Ort nachgewiesen.",
        "Eine Hochsicherheitszone, übergeben und abgenommen ohne Unterbrechung des umgebenden Betriebs.",
      ],
      [
        "KI-Labore und Hyperscale-Betreiber",
        "Eine messbare Grenze um die Assets.",
        "Ein KI-Unternehmen wollte seine Modellgewichte und Trainingscluster gegen Seitenkanal-Abstrahlung und äußere Störbeeinflussung absichern.",
        "Ein dedizierter Schirmraum mit integrierter Kühlung, Stromversorgung und Monitoring für hochdichte Racks.",
        "Eine gemessene, dokumentierte Sicherheitsgrenze um das wertvollste geistige Eigentum des Unternehmens.",
      ],
      [
        "Colocation, Verteidigung, Finanzwesen und Kommunikation",
        "Premium-Sicherheit ohne Neubau.",
        "Ein Colocation-Betreiber wollte eine Premiumstufe für regulierte Kunden, ohne den Standort umzubauen.",
        "Ein modularer Schirmraum wurde in bestehender Weißfläche ergänzt und als nachgewiesenes Produkt paketiert.",
        "Eine margenstarke Erlösquelle durch eine exklusive, schwer nachbildbare Sicherheitsstufe.",
      ],
    ],
    scenarioNote: "Repräsentative Szenarien auf Basis typischer Projektprofile.",
    scenarioLink: "Frankonia Projektreferenzen ansehen",
    processEyebrow: "END-TO-END-LÖSUNGEN VON FRANKONIA",
    processTitle: "Vom ersten Kontakt zum nachgewiesenen Schutz.",
    processSteps: [
      ["01", "Erstberatung", "Ein Spezialist prüft Ihre Ziele, den Standort und die Randbedingungen. Für den Start sind keine Unterlagen erforderlich."],
      ["02", "Risiko- und Standortanalyse", "Schutzgüter, Bedrohungsszenarien, die HF-Umgebung und die baulichen Randbedingungen werden bewertet; die Schutzanforderungen definieren wir gemeinsam."],
      ["03", "Konzept und 3D-Engineering", "Sie erhalten ein Konzeptdesign, die bauliche Integration in CAD/BIM und ein transparentes Angebot."],
      ["04", "Präzisionsfertigung", "PAN-Module, HF-Türen, Netz- und Datenfilter sowie Wabenkamine entstehen in den eigenen Fertigungsstätten von Frankonia."],
      ["05", "Montage und Nachweis", "Zertifizierte Teams montieren die Module schweißfrei; Schirmdämpfung und Lecksuche werden gemessen und zur Übergabe dokumentiert."],
      ["06", "Betrieb und Support", "Vorbeugende Wartung, wiederkehrende Messungen und Rezertifizierung erhalten die Schutzwirkung dauerhaft."],
    ],
    scopeEyebrow: "KLARER LEISTUNGSUMFANG VON ANFANG AN",
    scopeTitle: "Frankonia – und wo Partner einsteigen.",
    scopeBody:
      "Eine transparente Aufteilung der Verantwortung im gesamten Schutzraum, damit innerhalb der Schirmgrenze nichts dem Zufall überlassen bleibt.",
    scopeHead: ["Kategorie", "Bedeutung", "Umfang und Kompetenz"],
    scopeRows: [
      ["HF-Schirmdämpfung", "Kern", "Eigenfertigung mit garantierter Leistung"],
      ["Türen und Zutrittslösungen", "Kern", "Präzise HF-Dreh- und -Schiebetüren"],
      ["Elektrische Filter", "Kern", "HF-Filter für Strom, Daten und Signale"],
      ["Lüftung und Medien", "Kern", "Wabenkamine, Mediendurchführungen und Lüftungssysteme"],
      ["EMV-Prüfung und Zertifizierung", "Kern", "Nachweis vor Ort und Lecksuche"],
      ["Wartung und Service", "Service", "Jährliche Audits und Lifecycle-Support"],
      ["Gebäudesicherheitstechnik", "Partner", "Schnittstellenintegration zur Gebäudesicherheit"],
      ["Einbruchmeldeanlagen", "Partner", "Schnittstellenintegration zu Raummeldeanlagen"],
      ["Organisatorische Verfahren", "Kunde", "Beratung zu Best Practices durch Frankonia"],
    ],
    companyEyebrow: "VORTEILE UND NUTZEN",
    companyValuesTitle: "Frankonia Werte",
    companyValues: [
      ["Erfindergeist", "Wir hören nie auf, voranzugehen, suchen in allem den Vorteil, begegnen Herausforderungen mit Kreativität und streben nach Einfachheit."],
      ["Energie", "Wir bringen Energie in alles, was wir tun, bleiben hungrig und glauben an unsere Arbeit, sind offen für Herausforderungen und teilen die Leidenschaft dafür."],
      ["Gemeinschaft", "Wir handeln fair und respektvoll, packen an, gestalten die Zukunft gemeinsam und gewinnen als Team."],
      ["Fairness", "Wir sind offen und neugierig, gestehen Fehler ein, lernen und verbessern uns, kommunizieren klar und ehrlich und übernehmen Verantwortung für unser Handeln."],
    ],
    companyLocationsTitle: "Frankonia weltweit",
    companyLocations: [
      ["Frankonia Germany EMC Solutions GmbH", "Heideck, Deutschland"],
      ["Frankonia EMC Test-Systems GmbH", "Forchheim, Deutschland"],
      ["Jiashan Frankonia EMC Co., Ltd.", "Jiashan, Zhejiang, China"],
      ["Frankonia India EMC Solutions Pvt. Ltd.", "Chennai, Indien"],
    ],
    companyTitle: "Die Abschirmung ist nicht neu. Die Anwendung schon.",
    companyBody:
      "Die Frankonia Group wurde 1987 als Lösungsanbieter für EMV- und Antennenmesslabore gegründet und ist heute ein spezialisiertes Technologieunternehmen für Absorberhallen und Prüfsysteme in der Automobil-, Wehr- und Industrietechnik. CyberShield überträgt dieselbe Schirmtechnik auf Dateninfrastruktur. Projektmanagement, Engineering und Fertigung im eigenen Haus — dazu eigene Montage- und Serviceteams — sorgen dafür, dass Schirmgrenze, Türen, Filter und Abnahmemessung aus einer Hand kommen.",
    companyImageAlt: "Luftaufnahme des Stammsitzes und Produktionsstandorts der Frankonia Group in Deutschland",
    companyLink: "Frankonia besuchen",
    companyGlanceTitle: "Wofür Frankonia steht",
    companyGlance: [
      ["Weltweite Präsenz", "Ein gut strukturiertes Netz aus Produktions-, Vertriebs- und Serviceeinheiten, weltweit tätig."],
      ["Kompletter Lösungsanbieter", "Grundlagenwissen in jeder Disziplin, die eine geschirmte Anlage berührt."],
      ["Innovation als Methode", "Technologien, die Effizienz, Ergebnis und Qualität entlang der Kundenanforderungen steigern."],
      ["Bevorzugter Partner", "Maßgeschneiderte Lösungen auf dem Stand der Technik statt Katalogware."],
    ],
    companyColumns: [
      [
        "Produktvorteile",
        [
          ["Modular und selbsttragend", "Die Abschirmung trägt sich selbst, das Bestandsgebäude nimmt keine zusätzlichen Lasten auf."],
          ["Durchgängig gleiche Leistung", "Dieselbe Schirmdämpfung über Paneele, Türen, Filter und Hohlleiter hinweg — keine Schwachstelle an den Übergängen."],
          ["Geschraubt, nie geklebt oder geschweißt", "Jede Fuge ist eine Schraubverbindung mit leitfähiger Netzdichtung, der Raum bleibt jahrzehntelang wartbar."],
          ["Fertigung im eigenen Haus", "Vorgefertigte Standardkomponenten aus Frankonia-Produktion statt zugekaufter und montierter Teile."],
        ],
      ],
      [
        "Kundennutzen",
        [
          ["Seit mehr als 35 Jahren bewährt", "Technologien, die seit 1987 in EMV-Prüflaboren weltweit im Einsatz sind."],
          ["Geringe Anforderungen an das Gebäude", "Die Planung richtet sich nach vorhandener Elektrik, Statik und Bausituation — nicht umgekehrt."],
          ["Versetzen, ändern, weiterverkaufen", "Der modulare Aufbau lässt sich beschädigungsfrei demontieren und andernorts wieder aufbauen."],
          ["Einfache Gebäudeschnittstellen", "Strom, Lüftung, Abluft, Daten und Gaswarnung queren die Grenze über definierte, gefilterte Schnittstellen."],
        ],
      ],
      [
        "Warum Kunden Frankonia wählen",
        [
          ["Ein Partner von Anfang bis Ende", "Beratung, Fertigung, Montage, Abnahmemessung und Rezertifizierung in einer Verantwortung."],
          ["Unterstützung bei der Gebäudeplanung", "Frankonia arbeitet früh mit Architekten und Fachplanern, solange Schirmentscheidungen noch günstig sind."],
          ["Keine Kompromisse bei der Sicherheit", "Nicht brennbare, recycelbare Materialien — kein Kohlenstoff, kein Polyethylen, kein Kleber."],
          ["Projektmanagement, das zu Ende führt", "Erfahrene Teams tragen Detail und Termin bis zur Übergabe."],
        ],
      ],
    ],
    faqEyebrow: "HÄUFIGE FRAGEN",
    faqTitle: "Die Fragen, mit denen jedes Projekt beginnt.",
    faqs: [
      [
        "Lässt sich CyberShield in einem bestehenden, laufenden Rechenzentrum installieren?",
        "Ja. Die Module passen durch Standardtüren und werden von innen verschraubt – ohne Schweißen, ohne Heißarbeiten. Die Montage parallel zum laufenden Betrieb ist ein typisches Projektprofil.",
      ],
      [
        "Wie lange dauert ein Projekt?",
        "Das hängt von Größe und Integrationsumfang ab. Als Orientierung: Die Raummontage selbst dauert Wochen, der gesamte Ablauf von der Analyse bis zur nachgewiesenen Übergabe in der Regel mehrere Monate. Ein konkreter Terminplan ist Teil des Konzeptangebots.",
      ],
      [
        "Wovon hängen die Kosten ab?",
        "Von Größe, Leistungsanforderung, Anzahl der Durchführungen (Türen, Strom, Daten, Kühlung) und der Integrationskomplexität. Für ein erstes Gespräch und eine Ersteinschätzung genügen die grundlegenden Projektparameter.",
      ],
      [
        "Beeinträchtigt die Abschirmung Kühlung, Brandschutz oder den täglichen Betrieb?",
        "Nein. Luftführung, Doppelboden, Brandbekämpfung, Beleuchtung und Zutrittskontrolle werden von Beginn an in die Schirmgrenze eingeplant.",
      ],
      [
        "Was passiert, wenn wir später erweitern oder umziehen?",
        "Das System ist beschädigungsfrei demontierbar. Räume lassen sich erweitern, umkonfigurieren oder an einem neuen Standort wieder aufbauen – die ursprüngliche Investition bleibt geschützt.",
      ],
    ],
    contactEyebrow: "BEGINNEN SIE MIT IHREM RISIKOPROFIL",
    contactTitle: "Definieren wir die passende Schutzgrenze.",
    contactBody:
      "Sagen Sie uns, was Sie schützen müssen. Ein Frankonia-Spezialist prüft Ihr Projekt und antwortet per E-Mail.",
    contactEmail: "sales-cybershield@frankoniagroup.com",
    brochureLabel: "CyberShield Broschüre herunterladen",
    brochureMeta: "PDF · 10,3 MB · Englisch",
    labels: {
      type: "Art der Anfrage",
      name: "Name",
      company: "Unternehmen",
      email: "Geschäftliche E-Mail",
      country: "Land / Region",
      project: "Projektart",
      stage: "Projektphase",
      message: "Projektanforderungen",
      consent: "Ich bin damit einverstanden, dass Frankonia diese Angaben zur Beantwortung meiner Anfrage verwendet.",
      submitConsultation: "Beratungsanfrage senden",
      submitQuote: "Angebotsanfrage senden",
    },
    options: {
      newBuild: "Neubau",
      retrofit: "Nachrüstung / Erweiterung",
      confidential: "Vertraulich / noch zu besprechen",
      concept: "Konzept / Machbarkeit",
      planning: "Planung / Spezifikation",
      procurement: "Beschaffung / Ausschreibung",
      urgent: "Laufendes Projekt / dringend",
    },
    emailNote:
      "Ihre Angaben werden verschlüsselt an Frankonia übertragen und an den für Ihre Region zuständigen Vertriebskontakt weitergeleitet. Eine andere Verwendung findet nicht statt.",
    formSending: "Wird gesendet …",
    formSent: "Vielen Dank — Ihre Anfrage ist bei uns eingegangen. Ein Frankonia-Spezialist antwortet Ihnen per E-Mail.",
    formError: "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder senden Sie sie als E-Mail.",
    formErrorAction: "Als E-Mail senden",
    formHoneypot: "Dieses Feld bitte leer lassen",
    footer:
      "CyberShield ist eine Engineering-Lösung mit hohem Sicherheitsanspruch. Leistung, Normenbezug und Zertifizierungsumfang richten sich nach der vereinbarten Projektkonfiguration und der abschließenden Validierung.",
  },
  ko: {
    nav: {
      threats: "필요성",
      solution: "솔루션",
      ecosystem: "제품 구성",
      verification: "검증",
      applications: "적용 분야",
      process: "도입 절차",
      company: "회사 소개",
      contact: "문의",
    },
    langLabel: "언어 선택",
    menuOpenLabel: "메뉴 열기",
    menuCloseLabel: "메뉴 닫기",
    alt: {
      facility: "데이터센터 시설 단지의 항공 전경",
      technician: "데이터홀 내부에서 시스템을 검증하는 기술자",
      engineer: "보호 구역 서버 통로에서 랙을 점검하는 엔지니어",
    },
    sectorAlt: [
      "붉은 프레임 강조가 있는 아연도금 강판 차폐 홀 내부의 GPU 랙 열",
      "코로케이션 홀에 설치된 양문형 RF 도어의 모듈형 차폐 볼트",
      "벽면 디스플레이와 중량 RF 도어가 있는 어두운 차폐 지휘실",
      "흐린 하늘 아래 드론이 떠 있는 개활지의 낮은 RF 차폐 야전 대피소",
      "밝은 복도로 열린 차폐 강철 도어가 있는 주거용 안전실",
      "흡음 벽 패널과 유리·강철 RF 도어가 있는 차폐 회의실",
    ],
    ecosystemAlt: [
      "자립형 강구조에 지지된 차폐실 벽체의 모듈형 PAN 차폐 패널",
      "차폐실 외벽에 설치된 양문형 RF 차폐 도어",
      "차폐 경계에 설치된 필터 캐비닛과 개방된 전원 라인 필터 뱅크",
      "차폐 벽체에 설치된 허니콤 환기 도파관 패널",
      "차폐 성능 측정에 사용되는 제어 데스크의 계측 장비",
      "출입 플랫폼과 계단을 갖춘 차폐실 설치 현장 전경",
    ],
    consultation: "상담 예약",
    quote: "견적 요청",
    eyebrow: "차세대 전자기 차폐 · 고보안 데이터센터 엔클로저 · 홈 프로텍션 솔루션",
    heroTitle: "누설 제로. 간섭 제로.",
    heroAccent: "측정 가능한 전자기 경계.",
    heroBody:
      "하나의 시스템으로 설계하고, 통합하고, 검증합니다. CyberShield는 AI·데이터 워크로드와 소버린 인프라, 개인 안전 공간까지 시장에서 가장 유연한 고차폐 시스템으로 감싸며, 운영 중인 시설에 시공하고 측정된 증거와 함께 인도합니다.",
    explore: "시스템 살펴보기",
    metrics: [
      ["현장 측정 검증", "설치 후 차폐 성능을 현장에서 측정합니다 — 추정이 아닌 증거"],
      ["무용접 모듈 조립", "화기 작업 없는 볼트 체결 — 운영 중인 시설과 병행 시공"],
      ["확장·이전 가능", "손상 없이 해체해 확장·변경·이전에 재사용"],
    ],
    proof: ["1987년부터 축적한 엔지니어링", "글로벌 5개 거점", "80개국 이상 공급 네트워크", "턴키 제공"],
    beliefEyebrow: "차폐를 바라보는 우리의 관점",
    beliefTitle: "지금까지는 건물이 차폐실에 맞춰야 했습니다.",
    beliefLabels: ["기존의 방식", "우리의 관점"],
    beliefStatusQuo:
      "차폐실이 존재해온 내내, 시설이 차폐에 맞춰야 했습니다. 기존 차폐는 용접으로 고정되고, 설계 단계에서 확정되며, 완공된 날부터 바뀌지 않습니다. 건물은 그 방을 중심으로 계획되고, 공사는 그 방 때문에 멈춥니다. 그리고 랙 구성이 바뀌거나 전력 밀도가 올라가거나 시설이 한계에 이르렀을 때, 그 방은 따라가지 못합니다. 가장 빠르게 변하는 인프라 안에서 보호 설비만 가장 움직이지 않는 부분으로 남습니다.",
    beliefBelief:
      "우리는 반대여야 한다고 생각합니다. 시설이 방에 맞추는 것이 아니라, 방이 시설에 맞춰야 합니다. 그래서 CyberShield는 표준 출입문을 통과하는 사전 제작 강판 모듈로 만들어집니다. 내부에서 조립하고, 기존 벽에 가깝게 세우며, 볼트로 체결합니다. 용접도 접착도, 되돌릴 수 없는 작업도 없습니다. 확장하고, 다시 구성하고, 다른 현장으로 통째로 옮긴 뒤 다시 측정할 수 있습니다. 성능은 그대로 두고, 영구 고정만 걷어냈습니다.",
    coverEyebrow: "차폐 경계가 감싸는 범위",
    coverTitle: "차폐 경계가 감싸야 할 네 가지.",
    cover: [
      ["고성능 컴퓨팅 인프라", "핵심 연산 구역과 고밀도 가속 서버 랙."],
      ["암호 · 관리 자산", "키 관리 시스템, 암호 인프라, 특권 접근 통제 시설."],
      ["네트워크 상호연결 지점", "네트워크 진입 시설, 미트미 룸, 크로스커넥트 노드."],
      ["핵심 전력 · 보조 인프라", "전력 분배 허브, UPS 통로, 경계를 통과하는 모든 필터 관통부."],
    ],
    whyEyebrow: "성능이 필수인 적용 분야",
    whyTitle: "AI 데이터센터의 보안은 이제 소프트웨어에서 끝나지 않습니다.",
    whyBody:
      "방화벽과 암호화, 제로 트러스트는 네트워크를 통해 들어오는 위협을 막습니다. 그러나 AI 데이터센터가 품는 자산의 가치가 커지면서, 네트워크를 거치지 않고 물리 공간과 전자기 결합으로 접근하는 경로까지 검토 대상이 되었습니다. 이제 소프트웨어 보안과 물리적 보안은 함께 설계되어야 합니다.",
    whyMetric: "−120 dB",
    whyMetricLabel: "네트워크를 거치지 않는 신호에 대해 CyberShield가 제공하는 감쇠량 — 차폐 성능 최대치, EN 50147-1에 따라 현장에서 측정합니다.",
    whyValueLabel: "짧은 답",
    whyValueTitle: "설계부터 시공, 측정까지 하나의 책임으로 묶인 단일 경계.",
    whyValueBody:
      "차폐 구조와 도어, 필터, 환기 도파관, 모든 관통부를 하나의 연속된 경계로 설계하고, 운영을 멈추지 않는 무용접 방식으로 시공한 뒤, EN 50147-1 / IEEE 299에 따라 현장에서 측정해 문서로 인도합니다. 마지막에 남는 것은 약속이 아니라 측정값입니다.",
    assetCards: [
      ["국가적 전략자산", "AI 컴퓨팅 역량은 이미 국가 경쟁력의 기반으로 다뤄집니다. 모델 가중치와 학습 데이터, 소버린 워크로드는 기업 자산인 동시에 국가적 보호 대상이며, 바로 그 점이 표적이 되는 이유이기도 합니다."],
      ["EMC·EMP에 취약한 구조", "고밀도 GPU 랙은 수십 킬로와트를 스위칭 전자장비로 공급받고, 400G·800G 인터커넥트는 밀리볼트 단위의 잡음 여유로 동작합니다. 전력 밀도가 올라갈수록 방사는 강해지고 내성 여유는 줄어듭니다. 일반 전산실 기준으로 설계된 보호로는 이 조건을 감당하지 못합니다."],
      ["외부 전파 방호", "데이터센터는 대개 산업 지역과 송신 시설, 교통 인프라 인근에 세워집니다. 주변 전파 환경은 통제할 수 없고 갈수록 혼잡해집니다. 의도적 전자기 간섭 장비는 상용 부품으로도 구성할 수 있어, IEC 61000-4-36이 별도의 시험 규격으로 존재합니다."],
    ],
    threatEyebrow: "노출이 도달하는 경로",
    threatTitle: "같은 자산에 이르는 네 갈래 경로. 어느 것도 방화벽을 지나지 않습니다.",
    threatBody:
      "모두 물리 공간이나 전자기 결합을 통해 연산 하드웨어에 도달합니다. 그리고 모두 시설 경계에서 차단됩니다.",
    threats: [
      ["전자기 정보 방사", "연산은 방사됩니다. 2026년 벽 너머 6 m 거리의 GPU 방사만으로 신경망 아키텍처가 재구성되었고, NVIDIA Tensor Core에서 모델 파라미터가 직접 추출되었습니다. 두 공격 모두 네트워크에 접촉하지 않았습니다.", "기밀성 노출"],
      ["의도적 전자기 간섭", "국소 고출력 RF 또는 전자기 에너지는 전자장비, 제어 및 통신을 교란할 수 있습니다.", "서비스 중단"],
      ["EMP / HEMP 노출", "방사 및 전도성 펄스 영향은 중요 시스템과 업무 연속성 체계를 위협할 수 있습니다. E1 펄스는 2.5 ns 만에 상승합니다 — 낙뢰 기준 서지 보호기가 반응하기 전입니다.", "업무 연속성 위험"],
      ["경계 구성요소 취약점", "도어, 환기, 전원, 데이터, 냉각 및 설비 관통부가 차폐 경계의 가장 약한 경로가 될 수 있습니다.", "보호 성능 저하"],
    ],
    impactLabel: "잠재 영향",
    systemEyebrow: "퍼포먼스 차폐",
    technologyTitle: "인도 시 제공되는 것",
    technology: [
      "지정 주파수 대역 전체에 대한 현장 차폐 성능 측정",
      "도어, 필터, 허니콤, 모든 관통부의 누설 탐지 스윕",
      "공간과 함께 발행되는 문서화된 인수 보고서",
      "서비스로 제공되는 주기적 재시험과 보안 재인증",
    ],
    environmentEyebrow: "차폐 환경",
    environmentTitle: "모듈형 사전 제작 PAN 타입 차폐.",
    environmentBody: [
      "Frankonia 차폐실과 특수 보안실은 모듈형 구조 시스템을 기반으로 설계됩니다. 사전 제작된 고품질 차폐 패널이 가능한 치수에 대해 최대한의 유연성을 보장합니다.",
      "모든 PAN 타입 모듈은 표준 건물 출입문으로 쉽게 반입하고 취급할 수 있습니다. 표준 모듈은 내부에서 75 mm 간격으로 볼트 체결되며, 고전도성 메시 개스킷이 패널 접합부를 밀봉해 기존 건물 벽에 근접한 설치가 가능합니다. 짧은 체결 간격과 규정 토크에 따른 정밀한 조임이 장기간의 차폐 성능을 보장합니다.",
    ],
    environmentFeaturesTitle: "특징",
    environmentFeatures: [
      "2.0 mm 두께 아연도금 강판 PAN 타입 차폐 모듈",
      "모듈형 사전 제작 표준",
      "자립형 구조 또는 모든 내진 조건을 위한 정적 강구조",
      "내부에서 조립",
      "이중바닥 시스템 또는 용접 바닥 시스템",
      "장기간 유지되는 차폐 성능",
      "접착제 없음, 용접 없음",
      "손상 없는 해체, 간편한 변경과 유지보수",
      "전체 이전 또는 향후 변경 가능",
      "턴키 솔루션",
    ],
    environmentStandardsTitle: "차폐 표준",
    environmentStandards: [
      "EN 50147-1 또는 IEEE 299(옵션)에 따른 10 kHz ~ 18 GHz 또는 40 GHz 주파수 범위",
      "모든 종류의 관통 부품, 허니콤, 도어와 게이트, 필터 등에 동일한 성능",
      "모든 크기의 차폐 구현 가능",
      "ISO 354 기준 αw = 0.65 (MH) 흡음 패널",
    ],
    environmentAlt: "Frankonia 생산 공장에 설치된 붉은 강재 프레임의 모듈형 PAN 타입 차폐실",
    systemTitle: "시설의 실제 조건에 맞춰 설계하는 보안 공간.",
    systemBody:
      "사전 제작된 PAN 모듈은 표준 건물 출입문으로 반입할 수 있고 내부에서 조립되며 기존 벽에 근접 설치할 수 있습니다. 접착제와 용접 없이 확장과 이전이 가능합니다.",
    features: [
      ["01", "정밀 조립", "패널을 75 mm 간격으로 규정 토크로 체결하고, 전도성 메시 개스킷으로 접합부를 밀봉합니다."],
      ["02", "건축 통합", "양면 사용이 가능한 모듈로 평탄한 내부 마감면을 확보하고, 이중바닥·랙·소방·조명·냉각·출입통제를 함께 설계에 반영합니다."],
      ["03", "확장 가능한 구조", "손상 없이 해체해 확장, 변경 또는 전체 이전에 재사용할 수 있습니다."],
      ["04", "완전한 보호 경계", "차폐 구조, 도어, 필터, 허니콤 및 도파관을 하나의 시스템으로 구성합니다."],
    ],
    cutawayEyebrow: "소프트웨어를 넘어, 완전한 물리적 면역.",
    cutawayTitle: "CyberShield가 제공하는 다양한 솔루션을 직접 확인할 수 있습니다.",
    cutawayBody:
      "구조, 관통부, 건축설비, 전력까지 차폐 경계를 이루는 21가지 솔루션을 도면에서 바로 살펴보세요. 궁금한 항목을 선택하면 어떤 역할을 하고 왜 필요한지 설명해 드립니다.",
    cutawayAlt: "구조, 도어, 필터, 덕트, 전력실을 포함한 CyberShield 차폐 데이터홀 단면도",
    cutawayHint: "도면의 번호 또는 목록에서 궁금한 항목을 선택해 보세요.",
    ecosystemEyebrow: "차폐 구성품 · 액세서리",
    ecosystemTitle: "여섯 개의 제품군, 누설 없는 하나의 차폐 경계.",
    ecosystemBody:
      "Frankonia는 1987년부터 최고 품질과 효율의 사전 제작·모듈 표준을 따라왔습니다. 용접도 접착도 없으며, 모든 구성요소를 동일한 차폐 외피의 일부로 설계하므로 접합부, 도어, 관통부에서 성능이 손실되지 않습니다.",
    ecosystemCards: [
      [
        "CyberShield Structure",
        "벽체·천장·바닥을 구성하는 2.0 mm 아연도금 강판 PAN 모듈 시스템.",
        "DIN 17162 / EN 10142 DX 52 D+Z 강판에 275 g/m² 아연도금, 자립형 강구조에 75 mm 간격 볼팅 체결.",
      ],
      [
        "CyberShield Access",
        "고하중 슬라이딩·힌지 RF 도어, 고차폐 RF 윈도우 및 출입 모니터링 연동.",
        "전주형 3중 접점 구조에 전도성 스프링 적용, MTBF 20,000회 개폐, 표준 문턱 높이 150 mm.",
      ],
      [
        "CyberShield Connectivity",
        "고성능 전원 라인 필터, 광케이블 도파관 관통부 및 RF 신호 억제 장치.",
        "전원·데이터·신호 관통부를 통과하는 벽체와 동일한 차폐 수준으로 필터링하며, 매체 관통부는 DN200까지 지원합니다.",
      ],
      [
        "CyberShield Air & Waveguides",
        "허니콤 환기 패널, 흡음 패널(ISO 354), 액체냉각·설비용 차폐 도파관.",
        "차단 주파수 이하 허니콤 도파관이 공기는 통과시키고 RF는 차단하며, 흡음 인레이는 ISO 354 기준 αw = 0.65 (MH)입니다.",
      ],
      [
        "CyberShield Validation",
        "EN 50147-1 / IEEE 299 차폐 성능 측정, 누설 탐지, SE 시험 및 규격 문서화.",
        "10 kHz에서 90 dB 이상, 100–400 MHz에서 120 dB 이상, 40 GHz까지 100 dB 이상의 차폐 성능을 보장합니다.",
      ],
      [
        "CyberShield Lifecycle",
        "예방 정비, 재교정 및 주기적 재인증 서비스.",
        "접착도 용접도 없어 손상 없이 해체할 수 있습니다. 변경·확장·이전 후 다시 측정해 성능을 확인합니다.",
      ],
    ],
    ecosystemNote: "모든 제품군에 동일한 차폐 성능이 적용됩니다 — 측정된 성능 곡선 보기",
    accessoriesTitle: "표준품과 맞춤품을 한 곳에서.",
    accessoriesBody:
      "RF 차폐 전문 기업으로서 Frankonia는 턴키 공급사로 남기 위해 폭넓은 보완 제품군을 제공합니다. 모든 공간은 자체 완전 통합 전기 시스템, 시설과의 단순한 인터페이스, 추가·개별 액세서리와 함께 맞춤 설계됩니다.",
    accessories: [
      ["차폐 · 구조", [
        "모듈형 사전 제작 PAN 타입 차폐 시스템",
        "허니콤, 도어, 관통 부품, 전기, 게이트 등 모든 액세서리에 최고 수준의 차폐 성능",
        "ISO 354 기준 흡음 패널(F.DJ-T)",
        "시설과 분리된 고급 시공 공법",
      ]],
      ["도어 · 게이트", [
        "다양한 크기의 폭넓은 도어와 게이트",
        "모듈형 사전 제작 시스템",
        "단문형 도어(SLD)",
        "양문형 도어(DLD)",
        "슬라이딩 도어(SSD) 또는 게이트(SG)",
      ]],
      ["램프 · 플랫폼", [
        "자동 램프와 플랫폼(단차 없는 출입구)",
        "맞춤형 출입 솔루션",
        "인원 · 자재 슬루스 시스템",
      ]],
      ["전기 통합 · 규격 적합", [
        "외부 접근형 배전반, 배선, 현지 규격에 따른 안전 기능",
        "LED 조명, 방폭 옵션, 비상 조명",
        "AC·DC 필터, 신호·데이터 필터, 광 컨버터",
        "안전 매트릭스 및 상위 실험실 제어 장치(PLC 시스템)",
        "기계류 지침 2006/42/EG에 따른 CE 적합성을 기본 제공하며, 옵션으로 고급 안전 조치와 함께 시설 전체에 적용",
      ]],
      ["환기 · 유체 · 관통부 · 연기 · 가스", [
        "허니콤, 유체 관통부, 냉각 및 배기 시스템",
        "가스·연기 감지 시스템용 공기 샘플링 네트워크",
        "경보 중앙장치를 갖춘 연기·가스 감지 분석기, ATEX 적합",
        "누액 감지 시스템",
        "소화 솔루션(스프링클러 등)",
      ]],
      ["영상 · 음향 시스템", [
        "고정형 또는 이동형 HD 카메라 시스템",
        "음향 시스템",
        "녹화 시스템",
      ]],
    ],
    verifyEyebrow: "차세대 차폐 표준",
    verifyTitle: "약속이 아니라 측정으로 증명하는 성능.",
    verifyBody:
      "모든 CyberShield 프로젝트는 고객 시설을 중심으로 설계되고 측정된 증거로 완료됩니다. 차폐 성능은 국제 표준에 따라 현장에서 시험하고, 상세 성능 결과가 담긴 인수 문서를 공간과 함께 인도합니다.",
    verifyStats: [
      ["≥ 90 dB", "10 kHz", "자계"],
      ["≥ 120 dB", "100 MHz", "평면파"],
      ["≥ 100 dB", "40 GHz", "마이크로파"],
    ],
    standardsIntro: "적용 표준",
    standards: [
      ["EN 50147-1", "차폐효과 측정 표준"],
      ["IEEE 299", "프로젝트 옵션으로 제공"],
      ["BSI TL-03305 / 03306", "도청 방지실 및 IT 차폐실 규격"],
      ["NATO SDIP-27 Level A", "TEMPEST 설계·승인, NSA 94-106 정합"],
      ["MIL-STD-188-125-1 / -2", "HEMP·IEMI 방호, 프로젝트별 검증"],
      ["ISO/IEC 27001", "물리적·환경적 보안 통제 항목 지원"],
    ],
    regulatoryIntro: "지금 사양에 반영되는 이유",
    regulatory: [
      ["국가정보원 보안업무 기본지침 제95조", "공공기관·공공클라우드에 대한 고출력 전자기 보안 요구"],
      ["국방·군사시설 EMP 방호시설 설계기준", "차폐판, 차폐문, 허니컴 환기구, 관통부, 필터 — 국방 실무 기준 100 dB"],
      ["데이터센터 재난관리 의무, 2023.7 시행", "물리적 보호조치 요건이 강화되는 흐름 — EMP·IEMI는 아직 미포함"],
      ["IEEE 299 / MIL-STD-188-125 인수 SE 측정", "국내 인정(KOLAS) 성적서로 재입증되는 인수 검증 신뢰성"],
    ],
    evidenceTitle: "근거 자료",
    evidenceNote:
      "이 페이지의 수치, 용어, 위협 정의는 아래 자료에서 인용했습니다. 각 항목에 발행 기관, 문서, 해당 내용을 인용한 조항을 표기했습니다.",
    evidenceUsedFor: [
      "인용 근거: 벽 너머 6 m 거리의 GPU 방사에서 재구성된 신경망 아키텍처",
      "인용 근거: GPU 텐서 코어에서 직접 추출된 모델 파라미터",
      "인용 근거: 이 페이지에 표기된 E1 HEMP 파형과 2.5 ns 상승 시간",
      "인용 근거: 의도적 전자기 방해(IEMI)를 독립된 시험 분야로 규정",
      "인용 근거: 정보 누설 방사(compromising emanations)의 정의와 범위",
      "인용 근거: weight enclave 내부에 NSA 94-106 수준의 차폐 랙을 요구",
      "인용 근거: 본 적용 분야가 기준으로 삼는 SL1–SL5 체계",
      "인용 근거: 물리적·환경적 보호 통제 항목으로서의 정보 누설",
      "인용 근거: 신축 대비 1~5% 비용의 MIL-STD-188-125-1 기준 Level 4 방호",
      "인용 근거: 데이터센터 시설 및 인프라 관련 용어",
    ],
    attenuationEyebrow: "보증 차폐 성능",
    attenuationTitle: "하나의 차폐 외피, 10 kHz에서 40 GHz까지 검증합니다.",
    attenuationBody:
      "업계 기준을 선도하는 PAN 타입 모듈 시스템의 차폐 성능을 EN 50147-1 및 IEEE 299에 따라 측정합니다. 경계를 구성하는 모든 도어, 필터, 허니콤 환기구, 관통부에 동일한 차폐 성능을 설계 반영합니다.",
    fieldTypes: { magnetic: "자계", plane: "평면파", microwave: "마이크로파" },
    attenuationNote:
      "표준 PAN 타입 시스템의 보증 성능 범위입니다. 프로젝트에 적용되는 범위는 사양서와 현장 인수 시험을 통해 확정됩니다.",
    applicationsEyebrow: "CYBERSHIELD가 지키는 현장",
    applicationsTitle: "차폐 경계가 반드시 유지되어야 하는 여섯 가지 환경.",
    applicationsBody:
      "글로벌 연산 클러스터부터 보안 회의실과 개인 안전 공간까지, 동일한 소버린급 차폐 기술이 성능이 필수인 모든 곳에 측정 가능하고 인증된 보안을 제공합니다.",
    deliverableLabel: "핵심 제공 범위",
    applicationGroups: [
      {
        title: "산업 적용 분야",
        tagline: "인프라, AI 클라우드, 데이터센터",
        sectors: [
          ["하이퍼스케일 클라우드 · AI 데이터센터", "AI 연산 클러스터, 양자 하드웨어, 핵심 가용 영역을 RF 조작과 고출력 전자기 위협으로부터 차폐합니다.", "RF 밀폐 공조·냉각 관통부, 양자 상태를 위한 무드리프트 신호 격리, 고출력 지향성 에너지(HPEM) 방호."],
          ["코로케이션 · 엔터프라이즈 데이터센터", "엄격한 거버넌스 요건을 가진 기업 고객에게 인증된 차폐 볼트를 측정 가능한 프리미엄 보안 등급으로 제공합니다.", "IEEE 299 인증 모듈형 볼트 시스템과 개조 설치 가능한 차폐 케이지로 NIS2, HIPAA, SOC 2의 물리 보안 요건을 충족합니다."],
          ["국방 · 정부 · 금융기관", "소버린 클라우드, 지휘통제 센터, 고빈도 거래 플랫폼처럼 기밀성을 가정에 맡길 수 없는 환경을 지원합니다.", "NATO/NSA TEMPEST급 신호 봉쇄, 무방사 경계, 스푸핑·재밍에 대한 전송 보안."],
          ["드론 방어 · 시그니처 은폐", "안티드론 차폐, 공중 감시 회피, 시각·전자적 프라이버시를 가정에 맡길 수 없는 대피 시설을 보호합니다.", "다중 스펙트럼 시그니처 저감, 경계 구역 Counter-UAS 신호 차단, 신속 전개형 RF 차폐 야전 엔클로저."],
        ],
        focusTitle: "중점 영역: 인프라, AI 클라우드, 데이터센터",
        focus: [
          ["AI·양자 인프라의 신호 격리", "민감한 양자 상태 측정과 고밀도 GPU 행렬 연산을 왜곡하는 주변 전자기 잡음을 제거합니다."],
          ["소버린 데이터 · 경계 봉쇄", "소버린 클라우드 서버를 물리적으로 완전히 격리해 데이터 방사가 국가·기관 경계를 넘지 않도록 보장합니다."],
          ["고출력 지향성 에너지 · EMP 방호", "고고도 전자기 펄스(HEMP)와 고주파 프로세서를 파괴하도록 설계된 표적 무기로부터 핵심 가용 영역을 보호합니다."],
          ["모듈형 볼트 확장", "기업 입주사의 물리적 공간 확장에 맞춰 함께 늘어나는 확장형·개조형 차폐 케이지와 서버룸."],
        ],
      },
      {
        title: "홈 시큐리티 적용 분야",
        tagline: "예방적 보호와 개인 적용",
        sectors: [
          ["주거 차폐 · 가족 보호", "소버린급 재난 대비, 개인 가족 벙커, 개인 안전과 완전한 기밀성을 가정에 맡길 수 없는 주거용 안전실을 보호합니다.", "MIL-STD-188-125 EMP 강화 전력 허브, 다층 구조형 패러데이 차폐, CBRN 공기 여과, 에어갭 안전 데이터 볼트."],
          ["도청 방지 · 보안 회의실", "음향 격리, 대감시 차폐, 민감한 대화와 개인 정보를 가정에 맡길 수 없는 보안 회의실을 구현합니다.", "100 dB 이상 인증 광대역 RF 차폐, 경계 사운드 마스킹을 갖춘 고차음(STC) 벽체, 전원 라인 필터링."],
        ],
        focusTitle: "중점 영역: 예방적 보호와 개인 적용",
        focus: [
          ["전자기 복원력", "오프그리드 에너지 저장장치, 태양광 인버터, 통신 링크, 의료 장비를 고고도 전자기 펄스(HEMP), 코로나 질량 방출(CME), 지향성 에너지 버스트로부터 보호합니다."],
          ["경계 신호 봉쇄", "주거지에서 새어 나가는 RF·Wi-Fi 신호를 제거해 외부 디지털 정찰, 드론 감시, 무선 경계 침입을 차단합니다."],
          ["물리적 · 환경적 자립", "전력망 장애나 사회적 혼란 중에도 외부에 취약 신호를 노출하지 않고 생명 유지 시스템, 청정 공기, 핵심 통신을 유지합니다."],
        ],
      },
    ],
    scenarioEyebrow: "CyberShield 활용 방식",
    scenarioTitle: "반복해서 마주하는 세 가지 상황.",
    scenarioLabels: { challenge: "과제", approach: "접근", outcome: "결과" },
    scenarios: [
      [
        "정부·소버린 클라우드",
        "운영 중인 시설 안의 기밀 처리 구역.",
        "정부 클라우드 프로그램이 기존 데이터센터 내부에 기밀 워크로드용 보안 구역을 요구했습니다.",
        "운영을 유지한 채 무용접 방식으로 차폐 볼트를 설계·시공하고 현장에서 성능을 검증했습니다.",
        "주변 시설 중단 없이 고보안 구역을 구축하고 인수 시험까지 완료했습니다.",
      ],
      [
        "AI 연구소·하이퍼스케일 운영사",
        "자산을 둘러싼 측정 가능한 경계.",
        "AI 기업이 자사 모델 가중치와 학습 클러스터를 부채널 방사와 외부 간섭으로부터 보호하고자 했습니다.",
        "고밀도 랙을 위한 냉각·전원·모니터링을 통합한 전용 차폐실을 구축했습니다.",
        "기업의 가장 가치 있는 IP 주변에 측정되고 문서화된 보안 경계를 확보했습니다.",
      ],
      [
        "코로케이션·국방·금융·통신",
        "재건축 없는 프리미엄 보안.",
        "코로케이션 사업자가 시설 재구축 없이 규제 산업 고객용 프리미엄 등급을 원했습니다.",
        "기존 상면 내부에 모듈형 볼트를 증설하고 검증된 상품으로 패키지화했습니다.",
        "모방하기 어려운 독점적 보안 등급으로 고마진 매출원을 확보했습니다.",
      ],
    ],
    scenarioNote: "일반적인 프로젝트 유형을 바탕으로 구성한 예시입니다.",
    scenarioLink: "Frankonia 프로젝트 레퍼런스 보기",
    processEyebrow: "FRANKONIA 엔드투엔드 솔루션",
    processTitle: "첫 접촉부터 검증된 보호까지.",
    processSteps: [
      ["01", "초기 상담", "전문가가 목표, 현장 조건, 제약을 함께 검토합니다. 준비 서류 없이 시작할 수 있습니다."],
      ["02", "위험·현장 진단", "자산, 위협 시나리오, 주변 RF 환경, 시설 조건을 평가하고 보호 요구사항을 함께 정의합니다."],
      ["03", "개념 설계·3D 엔지니어링", "개념 설계안, CAD/BIM 기반 건축 통합 계획, 투명한 견적을 제공합니다."],
      ["04", "정밀 제작", "PAN 모듈, RF 도어, 전원·데이터 필터, 허니콤 환기구를 Frankonia 자체 생산 시설에서 제작합니다."],
      ["05", "시공·검증", "인증된 시공팀이 무용접 방식으로 조립하고, 인도 시점에 차폐 성능과 누설 여부를 측정해 문서화합니다."],
      ["06", "운영·유지보수", "예방 정비, 주기적 재시험, 보안 재인증으로 보호 성능을 지속 유지합니다."],
    ],
    scopeEyebrow: "처음부터 명확한 업무 범위",
    scopeTitle: "Frankonia의 범위, 그리고 파트너가 참여하는 지점.",
    scopeBody:
      "보호 구역 전반의 책임 범위를 투명하게 구분합니다. 차폐 경계 안에서 불확실하게 남겨두는 항목은 없습니다.",
    scopeHead: ["구분", "중요도", "수행 범위와 전문성"],
    scopeRows: [
      ["RF 차폐 성능", "핵심", "자체 생산 및 성능 보증"],
      ["도어·출입 솔루션", "핵심", "정밀 RF 힌지·슬라이딩 도어"],
      ["전기 필터", "핵심", "전원·데이터·신호 RF 필터"],
      ["환기 · 유체", "핵심", "허니콤, 유체 매체 관통부, 환기 시스템"],
      ["EMC 시험·인증", "핵심", "현장 검증 및 누설 탐지"],
      ["유지보수·서비스", "서비스", "연간 점검 및 라이프사이클 지원"],
      ["건물 보안 시스템", "파트너", "시설 보안 시스템과의 인터페이스 연동"],
      ["침입 경보 시스템", "파트너", "실내 경보 시스템과의 인터페이스 연동"],
      ["운영 절차·규정", "고객", "Frankonia가 모범 사례 자문 제공"],
    ],
    companyEyebrow: "강점과 혜택",
    companyValuesTitle: "Frankonia 핵심 가치",
    companyValues: [
      ["창의", "끊임없이 앞으로 나아가고, 모든 것에서 이점을 찾으며, 창의적으로 도전에 대응하고, 단순함을 추구합니다."],
      ["에너지", "하는 모든 일에 에너지를 쏟고, 늘 갈망하며 우리의 일을 믿고, 도전에 열려 있으며, 일에 대한 열정을 함께 나눕니다."],
      ["공동체", "공정하고 존중하는 태도로 행동하고, 소매를 걷어붙여 일을 끝내며, 미래를 함께 만들고, 팀으로 승리합니다."],
      ["공정", "열린 마음과 호기심을 갖고, 실패를 인정하고 배우며 개선하고, 명확하고 정직하게 소통하며, 행동에 책임을 집니다."],
    ],
    companyLocationsTitle: "Frankonia 글로벌 거점",
    companyLocations: [
      ["Frankonia Germany EMC Solutions GmbH", "독일 하이데크"],
      ["Frankonia EMC Test-Systems GmbH", "독일 포르히하임"],
      ["Jiashan Frankonia EMC Co., Ltd.", "중국 저장성 자산"],
      ["Frankonia India EMC Solutions Pvt. Ltd.", "인도 첸나이"],
    ],
    companyTitle: "차폐 기술은 새롭지 않습니다. 적용 대상이 새로울 뿐입니다.",
    companyBody:
      "Frankonia Group은 1987년 EMC·안테나 시험 실험실을 위한 솔루션 제공사로 설립되어, 현재는 자동차·방산·산업 분야의 무반사실과 시험 시스템을 다루는 전문 기술 기업입니다. CyberShield는 그 차폐 기술을 데이터 인프라에 적용한 것입니다. 프로젝트 관리, 엔지니어링, 생산을 자체 수행하고 설치·서비스 팀까지 직접 운영하기 때문에 차폐 경계와 도어, 필터, 인수 측정 성적서가 모두 한 곳에서 나옵니다.",
    companyImageAlt: "독일에 위치한 Frankonia Group 본사 및 생산 시설 항공 전경",
    companyLink: "Frankonia 방문하기",
    companyGlanceTitle: "Frankonia가 지향하는 것",
    companyGlance: [
      ["글로벌 네트워크", "생산·영업·서비스 거점이 체계적으로 연결되어 전 세계에서 활동합니다."],
      ["완결형 솔루션 제공사", "차폐 시설이 맞닿는 모든 분야에 대한 기본 역량을 보유합니다."],
      ["방법으로서의 혁신", "고객 요구에 맞춰 효율과 결과, 품질을 함께 끌어올리는 기술을 도입합니다."],
      ["우선 선택되는 파트너", "규격품이 아니라 최신 기술 기반의 맞춤 솔루션을 제공합니다."],
    ],
    companyColumns: [
      [
        "제품 강점",
        [
          ["모듈형 자립 구조", "차폐 구조가 하중을 스스로 지지하므로 기존 건물에 추가 구조 부담이 없습니다."],
          ["전 구간 동일한 성능", "패널, 도어, 필터, 도파관까지 동일한 차폐 성능을 유지해 접합부에 취약점이 생기지 않습니다."],
          ["접착·용접 없는 볼팅 체결", "모든 접합부를 전도성 메시 개스킷과 함께 체결해 수십 년간 유지보수가 가능합니다."],
          ["자체 생산", "외부에서 조달해 조립하는 방식이 아니라 Frankonia가 직접 제조한 사전 제작 표준 부품을 사용합니다."],
        ],
      ],
      [
        "고객 혜택",
        [
          ["35년 이상 검증", "1987년부터 전 세계 EMC 시험 실험실에서 운용되어 온 기술입니다."],
          ["건물 조건 부담 최소화", "기존 전기, 구조, 건축 조건에 설계를 맞춥니다. 그 반대가 아닙니다."],
          ["이전 · 변경 · 재매각 가능", "모듈 구조라 손상 없이 해체해 다른 장소에 다시 설치할 수 있습니다."],
          ["단순한 건물 인터페이스", "전원, 급배기, 데이터, 가스 감지가 정의된 필터 인터페이스를 통해 경계를 통과합니다."],
        ],
      ],
      [
        "Frankonia를 선택하는 이유",
        [
          ["처음부터 끝까지 한 파트너", "상담, 제조, 시공, 인수 측정, 재인증을 단일 책임으로 수행합니다."],
          ["건축 설계 단계 지원", "차폐 관련 의사결정 비용이 아직 낮은 초기 단계부터 건축사·시공사와 협업합니다."],
          ["안전에 대한 무타협", "불연·재활용 가능 소재만 사용하며 카본, 폴리에틸렌, 접착제를 쓰지 않습니다."],
          ["끝까지 책임지는 프로젝트 관리", "숙련된 팀이 세부 사항과 일정을 인계 시점까지 함께 관리합니다."],
        ],
      ],
    ],
    faqEyebrow: "자주 묻는 질문",
    faqTitle: "도입 검토가 시작되는 질문들.",
    faqs: [
      [
        "운영 중인 기존 시설에도 설치할 수 있나요?",
        "가능합니다. 모듈이 표준 출입문으로 반입되고 내부에서 볼트로 조립되므로 용접·화기 작업이 없습니다. 운영 중인 시설과 병행하는 시공은 일반적인 프로젝트 유형입니다.",
      ],
      [
        "프로젝트 기간은 얼마나 걸리나요?",
        "규모와 통합 범위에 따라 다릅니다. 차폐실 조립 자체는 주 단위, 진단부터 검증 인도까지 전체 주기는 통상 수개월입니다. 개념 설계 제안과 함께 구체적인 일정을 받아보실 수 있습니다.",
      ],
      [
        "비용은 무엇으로 결정되나요?",
        "크기, 요구 성능, 관통부 수량(도어·전원·데이터·냉각), 통합 복잡도가 주요 변수입니다. 기본적인 프로젝트 조건만으로도 초기 상담과 개략 견적이 가능합니다.",
      ],
      [
        "차폐 구조가 냉각·소방·일상 운영에 지장을 주지 않나요?",
        "지장 없습니다. 공조, 이중바닥, 소방, 조명, 출입통제를 처음부터 경계 설계에 통합합니다.",
      ],
      [
        "나중에 확장하거나 이전해야 하면 어떻게 되나요?",
        "손상 없이 해체할 수 있는 시스템입니다. 확장·재구성하거나 새로운 부지에 재조립할 수 있어 초기 투자가 보호됩니다.",
      ],
    ],
    contactEyebrow: "위험 프로파일에서 시작하십시오",
    contactTitle: "필요한 보호 경계를 함께 정의하겠습니다.",
    contactBody:
      "보호해야 할 자산과 프로젝트 정보를 알려주십시오. Frankonia 전문가가 검토한 후 이메일로 연락드립니다.",
    contactEmail: "sales-cybershield@frankoniagroup.com",
    brochureLabel: "CyberShield 브로슈어 내려받기",
    brochureMeta: "PDF · 10.3 MB · 영문",
    labels: {
      type: "문의 유형",
      name: "이름",
      company: "회사",
      email: "업무용 이메일",
      country: "국가 / 지역",
      project: "프로젝트 유형",
      stage: "프로젝트 단계",
      message: "프로젝트 요구사항",
      consent: "Frankonia가 문의 회신을 위해 이 정보를 사용하는 데 동의합니다.",
      submitConsultation: "상담 요청 보내기",
      submitQuote: "견적 요청 보내기",
    },
    options: {
      newBuild: "신규 시설",
      retrofit: "기존 시설 개조 / 확장",
      confidential: "기밀 프로젝트 / 추후 협의",
      concept: "개념 / 타당성 검토",
      planning: "설계 / 사양 작성",
      procurement: "조달 / 입찰",
      urgent: "진행 중 / 긴급",
    },
    emailNote:
      "입력하신 내용은 암호화되어 Frankonia로 전송되며, 해당 지역 담당 영업 연락처로 전달됩니다. 그 외의 용도로는 사용되지 않습니다.",
    formSending: "전송 중…",
    formSent: "감사합니다 — 문의가 접수되었습니다. Frankonia 전문가가 이메일로 회신드립니다.",
    formError: "요청을 보내지 못했습니다. 다시 시도하시거나 이메일로 보내주십시오.",
    formErrorAction: "이메일로 보내기",
    formHoneypot: "이 항목은 비워 두십시오",
    footer:
      "CyberShield는 높은 수준의 보증이 요구되는 엔지니어링 솔루션입니다. 성능, 적용 규격 및 인증 범위는 합의된 프로젝트 구성과 최종 검증 결과에 따라 결정됩니다.",
  },
} as const;

const threatIcons = [
  <svg key="emanation" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
    <rect x="8" y="36" width="12" height="12" fill="currentColor" stroke="none" />
    <path d="M14 28 A14 14 0 0 1 28 42" />
    <path d="M14 20 A22 22 0 0 1 36 42" />
    <path d="M14 12 A30 30 0 0 1 44 42" />
  </svg>,
  <svg key="interference" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
    <path d="M8 44 V32" />
    <path d="M16 44 V24" />
    <path d="M24 44 V16" />
    <path d="M44 6 L32 26 H39 L28 50 L42 30 H35 Z" fill="currentColor" stroke="none" />
  </svg>,
  <svg key="emp" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
    <circle cx="28" cy="28" r="4" fill="currentColor" stroke="none" />
    <circle cx="28" cy="28" r="11" />
    <path d="M28 4 v8 M28 44 v8 M4 28 h8 M44 28 h8 M11 11 l6 6 M39 39 l6 6 M45 11 l-6 6 M11 45 l6 -6" />
  </svg>,
  <svg key="boundary" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
    <path d="M28 8 H8 V48 H48 V8 H44" />
    <path d="M36 2 V24" />
    <path d="M30 18 l6 6 6 -6" />
  </svg>,
];

// Anchor standards per mission profile, index-aligned with `applications`.
// Standard designations are proper nouns and stay in their original form; only
// the label above them is translated.
// Guaranteed attenuation per EN 50147-1 / IEEE 299. Frequency labels and the
// decibel figures are language-independent; only the field type is translated.
// The bar maps 80–125 dB onto the column height so the curve stays readable.
const attenuationRows = [
  ["10 kHz", 90, "magnetic"],
  ["100 kHz", 100, "magnetic"],
  ["1 MHz", 110, "magnetic"],
  ["100 MHz", 120, "plane"],
  ["400 MHz", 120, "plane"],
  ["1 GHz", 110, "plane"],
  ["18 GHz", 100, "microwave"],
  ["40 GHz", 100, "microwave"],
] as const;

const barHeight = (db: number) => `${Math.round(((db - 80) / 45) * 100)}%`;

// Citations, never links — the page does not send visitors to external sites.
// Each entry carries the issuing body, the document reference and the clause it
// was read from, so a reader can find the source without being handed a URL.
// Document titles are proper nouns and stay in English; what each one supports
// on this page is translated per locale as `evidenceUsedFor`.
const evidenceSources = [
  ["NDSS 2026", "Peering Inside the Black Box — long-range model architecture snooping via GPU electromagnetic side channels"],
  ["arXiv 2603.02891", "Kraken — parameter extraction from NVIDIA Tensor Cores"],
  ["IEC 61000-2-9", "Electromagnetic compatibility — Part 2-9: Description of HEMP environment, radiated disturbance"],
  ["IEC 61000-4-36", "Electromagnetic compatibility — Part 4-36: IEMI immunity test methods for equipment and systems"],
  ["NCSC", "TEMPEST and electromagnetic security guidance"],
  ["SL5 Standard v0.1", "Security Level 5 Standard for AI security — Section 3.9 SA-4, shielded rack enclosures in the weight enclave"],
  ["RAND RRA2849-1", "Securing AI Model Weights — the SL1–SL5 security level framework"],
  ["NIST SP 800-53", "Security and Privacy Controls for Information Systems and Organizations — control PE-19, Information Leakage"],
  ["CISA", "EMP Protection and Resilience Guidelines for Critical Infrastructure, v2.2 — Level 4 protection"],
  ["EN 50600", "Information technology — Data centre facilities and infrastructures"],
] as const;

// Importance rating and responsibility tone, aligned with the scope rows above.
const scopeMeta = [
  [5, "core"], [5, "core"], [5, "core"], [5, "core"], [5, "core"],
  [4, "service"], [2, "partner"], [2, "partner"], [2, "customer"],
] as const;

const revealSelector = [
  ".asset-grid article",
  ".sector-grid article",
  ".focus-block li",
  ".belief-grid article",
  ".answer-section .why-value",
  ".company-glance li",
  ".company-column",
  ".threat-grid article",
  ".feature-list article",
  ".step-list article",
  ".scenario-grid article",
  ".compare-row",
  ".ecosystem-grid article",
  ".scope-list tbody tr",
  ".standards-row div",
  ".verify-stats div",
  ".cover-list li",
  ".technology-block li",
  ".environment-lists section",
  ".accessory-grid section",
  ".faq-list details",
  ".why-metric",
  ".system-image",
  ".environment-visual",
  ".verify-visual",
  ".lifecycle-visual",
].join(",");

// Photography for the six product lines, in the order the cards are listed.
const ecosystemImages = ["structure", "access", "connectivity", "air", "validation", "lifecycle"];
// Photography for the six application sectors, in group order: four
// industrial, then two home security. Index-aligned with `sectorAlt`.
const sectorImages = ["hyperscale", "colocation", "government", "drone", "home", "chamber"];

/** The hero backdrop, in the order it plays.
 *
 *  Built plant, not a render: the band used to hold a 3D turntable of a hall
 *  being assembled, and a rotating model of a thing is a weaker claim than a
 *  photograph of the same thing standing in a building. All four are Frankonia
 *  reference installations.
 *
 *  The four were picked so each is a different room at a different exposure —
 *  a modular volume inside a plant hall, a working bay under a red service
 *  gantry, the shielded envelope seen from outside, the filtered power entry —
 *  so the cut between them reads as a change of scene, not a change of crop.
 *
 *  Subject placement decided the shortlist as much as subject did: the scrim
 *  is opaque ink to 44% of the band and only clears past 78%, so a frame only
 *  earns a place if what it shows sits right of center. The first frame is the
 *  LCP image — it loads at high priority and is what a visitor sees at t=0. */
const heroSlides = [
  { src: "/images/hero/hero-shielded-hall.webp" },
  { src: "/images/hero/hero-shielded-bay.webp" },
  { src: "/images/hero/hero-modular-volume.webp" },
  { src: "/images/hero/hero-power-filters.webp" },
];

const navSectionIds = ["why", "applications", "verification", "solution", "ecosystem", "process", "company"];

export function Landing({ lang }: { lang: Lang }) {
  const [inquiry, setInquiry] = useState<Inquiry>("consultation");
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const metricRef = useRef<HTMLElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Close the language dropdown on an outside click or Escape.
  useEffect(() => {
    if (!langOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!langRef.current?.contains(event.target as Node)) setLangOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLangOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [langOpen]);

  // Reveal cards as they scroll into view; anything already on screen stays visible.
  // Cards start hidden, so every path here must end with them shown.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const targets = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));
    if (!targets.length) return;

    const pending = new Set(targets);
    const reveal = (el: Element) => {
      el.classList.add("is-in");
      pending.delete(el as HTMLElement);
    };

    targets.forEach((el) => {
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
      el.style.setProperty("--reveal-delay", `${Math.min(siblings.indexOf(el), 5) * 70}ms`);
      el.classList.add("reveal");
      if (el.getBoundingClientRect().top < window.innerHeight) reveal(el);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    pending.forEach((el) => observer.observe(el));

    // Fallback: if the observer never delivers, scrolling still uncovers the cards.
    const onScroll = () => {
      if (!pending.size) {
        window.removeEventListener("scroll", onScroll);
        return;
      }
      pending.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          observer.unobserve(el);
          reveal(el);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [lang]);

  // Count the headline statistic up once it is on screen.
  useEffect(() => {
    const el = metricRef.current;
    if (!el) return;
    // The figure may be decimal, and German writes it with a comma, so the
    // number is pulled out of the string rather than assumed to lead it.
    const found = t.whyMetric.match(/[\d.,]+/);
    if (!found) return;
    const numeric = found[0];
    const comma = numeric.includes(",");
    const target = parseFloat(comma ? numeric.replace(",", ".") : numeric);
    if (Number.isNaN(target) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const decimals = (numeric.split(/[.,]/)[1] ?? "").length;
    const prefix = t.whyMetric.slice(0, found.index);
    const suffix = t.whyMetric.slice((found.index ?? 0) + numeric.length);
    const render = (value: number) => {
      const shown = value.toFixed(decimals);
      return prefix + (comma ? shown.replace(".", ",") : shown) + suffix;
    };

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const started = performance.now();
        const step = (now: number) => {
          const progress = Math.min(1, (now - started) / 1000);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = render(target * eased);
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [t.whyMetric]);

  // Scroll progress bar + active navigation link.
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>(".scroll-progress i");
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? window.scrollY / max : 0;
        bar?.style.setProperty("transform", `scaleX(${Math.min(1, ratio)})`);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = navSectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          document.querySelectorAll<HTMLAnchorElement>(".nav-desktop a").forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [lang]);

  const goContact = (type: Inquiry) => {
    setInquiry(type);
    setMenuOpen(false);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const [sendState, setSendState] = useState<SendState>("idle");
  const [fallbackHref, setFallbackHref] = useState("");
  // Bots submit instantly; the endpoint drops anything filled in faster than a
  // person could plausibly type it.
  const formOpenedAt = useRef(Date.now());

  /** The mailto this form used to be. Kept as the escape hatch for when the
   *  endpoint is unreachable, so a visitor is never left holding an inquiry
   *  with nowhere to put it. */
  const mailtoHref = (data: FormData) => {
    const subject =
      inquiry === "quote"
        ? "[CyberShield] Quote request"
        : "[CyberShield] Consultation request";
    const body = [
      `Request: ${inquiry}`,
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company")}`,
      `Email: ${data.get("email")}`,
      `Country / region: ${data.get("country")}`,
      `Project type: ${data.get("project")}`,
      `Project stage: ${data.get("stage")}`,
      "",
      "Requirements:",
      String(data.get("message") || ""),
    ].join("\n");
    return `mailto:${t.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sendState === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setFallbackHref(mailtoHref(data));
    setSendState("sending");
    try {
      const response = await fetch(asset("/api/inquiry.php"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          request: inquiry,
          lang,
          name: data.get("name"),
          company: data.get("company"),
          email: data.get("email"),
          country: data.get("country"),
          project: data.get("project"),
          stage: data.get("stage"),
          message: data.get("message"),
          consent: data.get("consent") === "on",
          website: data.get("website"),
          elapsed: (Date.now() - formOpenedAt.current) / 1000,
        }),
      });
      const result = response.ok ? await response.json().catch(() => null) : null;
      if (!result?.ok) throw new Error("rejected");
      form.reset();
      setInquiry("consultation");
      setSendState("sent");
    } catch {
      setSendState("error");
    }
  };

  const navLinks = (
    <>
      {/* Listed in the order the sections now appear, so the scroll-spy
          highlight only ever moves forward as the reader goes down. */}
      <a href="#why" onClick={() => setMenuOpen(false)}>{t.nav.threats}</a>
      <a href="#applications" onClick={() => setMenuOpen(false)}>{t.nav.applications}</a>
      <a href="#verification" onClick={() => setMenuOpen(false)}>{t.nav.verification}</a>
      <a href="#solution" onClick={() => setMenuOpen(false)}>{t.nav.solution}</a>
      <a href="#ecosystem" onClick={() => setMenuOpen(false)}>{t.nav.ecosystem}</a>
      <a href="#process" onClick={() => setMenuOpen(false)}>{t.nav.process}</a>
      <a href="#company" onClick={() => setMenuOpen(false)}>{t.nav.company}</a>
    </>
  );

  return (
    <main>
      <StructuredData
        lang={lang}
        faqs={t.faqs}
        productLines={t.ecosystemCards}
        description={t.heroBody}
      />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Frankonia CyberShield home">
          <BrandLockup decorative onLight />
        </a>
        <nav className="nav-desktop" aria-label="Primary navigation">
          {navLinks}
        </nav>
        <div className="header-actions">
          <div className={langOpen ? "language-select open" : "language-select"} ref={langRef}>
            <button
              className="language"
              aria-label={t.langLabel}
              aria-haspopup="true"
              aria-expanded={langOpen}
              onClick={() => setLangOpen(!langOpen)}
            >
              {languages.find(([code]) => code === lang)?.[1]}
              <svg viewBox="0 0 12 8" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M1 2 L6 6.5 L11 2" />
              </svg>
            </button>
            {langOpen && (
              <ul className="language-menu" aria-label={t.langLabel}>
                {languages.map(([code, short, label, path]) => (
                  <li key={code}>
                    <a
                      href={route(path)}
                      hrefLang={code}
                      lang={code}
                      className={code === lang ? "current" : ""}
                      aria-current={code === lang ? "true" : undefined}
                    >
                      <b>{short}</b>
                      <span>{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="button button-small" onClick={() => goContact("quote")}>{t.quote}</button>
          <button
            className={menuOpen ? "menu-toggle open" : "menu-toggle"}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.menuCloseLabel : t.menuOpenLabel}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i /><i /><i />
          </button>
        </div>
        <div className="scroll-progress" aria-hidden="true"><i /></div>
      </header>

      {menuOpen && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          {navLinks}
          <button className="button" onClick={() => goContact("quote")}>{t.quote}</button>
        </nav>
      )}

      <section className="hero" id="top">
        {/* The plant behind the headline. Decorative: the h1 states what
            CyberShield does and these state what it looks like built — naming
            them in alt would put a caption in front of the sentence they
            illustrate. Plain <img> rather than a CSS background so the first
            frame is in the HTML the parser reaches first; it is the largest
            thing on the page and should start downloading before the
            stylesheet resolves. The other three are `low` so they queue behind
            it instead of competing for the same connection.

            The wrapper is what keeps the scrim on top: the slides carry
            z-index to order the cross-dissolve, and without a stacking context
            of their own they would climb over `.hero::after` and take the
            headline's contrast with them. */}
        <div className="hero-media" aria-hidden="true">
          {heroSlides.map((slide, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={slide.src}
              className="hero-shot"
              src={asset(slide.src)}
              alt=""
              width={2000}
              height={1333}
              fetchPriority={i === 0 ? "high" : "low"}
              decoding="async"
            />
          ))}
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.heroTitle}<br /><span>{t.heroAccent}</span></h1>
            <p className="hero-body">{t.heroBody}</p>
            <div className="hero-actions">
              <button className="button" onClick={() => goContact("consultation")}>{t.consultation}<span>↗</span></button>
              <a className="text-link" href="#solution">{t.explore}<span>↓</span></a>
            </div>
          </div>
        </div>
        <div className="metrics">
          {t.metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
      </section>

      {/* The answer, stated once and compactly. The system and verification
          sections below are the elaboration, not the reveal. */}
      <section className="answer-section">
        <div className="why-value">
          <div>
            <p className="eyebrow">{t.whyValueLabel}</p>
            <h3>{t.whyValueTitle}</h3>
          </div>
          <p>{t.whyValueBody}</p>
        </div>
      </section>

      <div className="proof-strip">
        {t.proof.map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}
      </div>

      <section className="why-section" id="why">
        <div className="why-intro">
          <div>
            <p className="eyebrow">{t.whyEyebrow}</p>
            <h2>{t.whyTitle}</h2>
            <p className="lead">{t.whyBody}</p>
          </div>
          <aside className="why-metric" aria-label={t.whyMetricLabel}>
            <strong ref={metricRef}>{t.whyMetric}</strong>
            <span>{t.whyMetricLabel}</span>
          </aside>
        </div>
        <div className="asset-grid">
          {t.assetCards.map(([title, body], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="threat-section section-dark" aria-labelledby="threat-title">
        <div className="section-heading">
          <p className="eyebrow">{t.threatEyebrow}</p>
          <h2 id="threat-title">{t.threatTitle}</h2>
          <p>{t.threatBody}</p>
        </div>
        <div className="threat-grid">
          {t.threats.map(([title, body, impact], index) => (
            <article key={title}>
              <span className="threat-number">0{index + 1}</span>
              <div className="threat-icon" aria-hidden="true">{threatIcons[index]}</div>
              <h3>{title}</h3>
              <p>{body}</p>
              <div className="impact-tag"><span>{t.impactLabel}</span><strong>{impact}</strong></div>
            </article>
          ))}
        </div>
      </section>

      {/* Who the room is for: the six sectors of the brochure, in its two
          groups — industrial on one side, home security on the other. Each
          card carries the brochure line and the executive summary's core
          deliverable; each group closes with its focus list. */}
      <section className="applications-section" id="applications">
        <div className="section-heading light">
          <p className="eyebrow">{t.applicationsEyebrow}</p>
          <h2>{t.applicationsTitle}</h2>
          <p>{t.applicationsBody}</p>
        </div>
        {t.applicationGroups.map((group, g, groups) => {
          // Sector images and alts are one flat list across both groups.
          const offset = groups.slice(0, g).reduce((n, previous) => n + previous.sectors.length, 0);
          return (
          <div className="application-group" key={group.title}>
            <div className="application-group-label">
              <span>0{g + 1}</span>
              <h3>{group.title}</h3>
              <p>{group.tagline}</p>
            </div>
            <div className="application-group-body">
              <div className="sector-grid">
                {group.sectors.map(([title, body, deliverable], i) => (
                  <article key={title}>
                    <img
                      src={asset(`/images/sectors/${sectorImages[offset + i]}.webp`)}
                      width={1000}
                      height={667}
                      loading="lazy"
                      decoding="async"
                      alt={t.sectorAlt[offset + i]}
                    />
                    <div className="sector-body">
                      <span>0{g + 1}.{i + 1}</span>
                      <h4>{title}</h4>
                      <p>{body}</p>
                      <p className="sector-deliverable"><span>{t.deliverableLabel}</span>{deliverable}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="focus-block">
                <h4>{group.focusTitle}</h4>
                <ul>
                  {group.focus.map(([label, note]) => (
                    <li key={label}><strong>{label}</strong><span>{note}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          );
        })}
        {/* One call to action for the section, not one per sector. */}
        <div className="applications-cta">
          <button className="button" onClick={() => goContact("consultation")}>
            {t.consultation}<span>↗</span>
          </button>
        </div>
      </section>

      <section className="scenario-section">
        <div className="section-heading light">
          <p className="eyebrow">{t.scenarioEyebrow}</p>
          <h2>{t.scenarioTitle}</h2>
        </div>
        <div className="scenario-grid">
          {t.scenarios.map(([tag, title, challenge, approach, outcome]) => (
            <article key={title}>
              <p className="scenario-tag">{tag}</p>
              <h3>{title}</h3>
              <div><span>{t.scenarioLabels.challenge}</span><p>{challenge}</p></div>
              <div><span>{t.scenarioLabels.approach}</span><p>{approach}</p></div>
              <div className="scenario-outcome"><span>{t.scenarioLabels.outcome}</span><p>{outcome}</p></div>
            </article>
          ))}
        </div>
        <p className="scenario-note">
          {t.scenarioNote}
          <a
            className="outbound"
            href="https://frankonia-solutions.com/anechoic-chambers/references_anechoic-chambers/"
            target="_blank"
            rel="noreferrer"
          >
            {t.scenarioLink}<span aria-hidden="true">↗</span>
          </a>
        </p>
      </section>

      {/* The reversal, stated before any threat: the practice is the problem, not the reader. */}
      <section className="belief-section" id="belief" aria-labelledby="belief-title">
        <div className="section-heading light">
          <p className="eyebrow">{t.beliefEyebrow}</p>
          <h2 id="belief-title">{t.beliefTitle}</h2>
        </div>
        <div className="belief-grid">
          <article className="belief-now">
            <p className="belief-label">{t.beliefLabels[0]}</p>
            <p>{t.beliefStatusQuo}</p>
          </article>
          <article className="belief-next">
            <p className="belief-label">{t.beliefLabels[1]}</p>
            <p>{t.beliefBelief}</p>
          </article>
        </div>
      </section>

      <section className="verify-section" id="verification">
        <div className="verify-content">
          <p className="eyebrow">{t.verifyEyebrow}</p>
          <h2>{t.verifyTitle}</h2>
          <p className="lead">{t.verifyBody}</p>
          <p className="standards-intro">{t.standardsIntro}</p>
          <div className="standards-row">
            {t.standards.map(([name, note]) => (
              <div key={name}><strong>{name}</strong><span>{note}</span></div>
            ))}
          </div>
          <p className="standards-intro">{t.regulatoryIntro}</p>
          <div className="standards-row">
            {t.regulatory.map(([name, note]) => (
              <div key={name}><strong>{name}</strong><span>{note}</span></div>
            ))}
          </div>
          <div className="evidence-row">
            <strong>{t.evidenceTitle}</strong>
            <p className="evidence-note">{t.evidenceNote}</p>
            <ul className="evidence-list">
              {evidenceSources.map(([reference, title], index) => (
                <li key={reference}>
                  <strong>{reference}</strong>
                  <span>{title}</span>
                  <em>{t.evidenceUsedFor[index]}</em>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="verify-aside">
          <div className="verify-visual">
            <img
              src={asset("/images/technician-verification.webp")}
              width={768}
              height={1376}
              loading="lazy"
              decoding="async"
              alt={t.alt.technician}
            />
          </div>
          {/* The three headline figures from the brochure's standard page. The
              full curve is in the attenuation band below; these are the values
              a reader carries away. */}
          <div className="verify-stats" aria-label={t.attenuationEyebrow}>
            {t.verifyStats.map(([value, at, field]) => (
              <div key={at}><strong>{value}</strong><span>{at}<br />{field}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* What the boundary encloses — the four asset classes from the
          brochure's standard page, listed as a plain enumeration between the
          measured standard and the module system that meets it. */}
      <section className="cover-section" aria-labelledby="cover-title">
        <div className="section-heading">
          <p className="eyebrow">{t.coverEyebrow}</p>
          <h2 id="cover-title">{t.coverTitle}</h2>
        </div>
        <ul className="cover-list">
          {t.cover.map(([title, detail]) => (
            <li key={title}><strong>{title}</strong><span>{detail}</span></li>
          ))}
        </ul>
      </section>

      <section className="system-section" id="solution">
        <div className="system-image">
          <img
            src={asset("/images/facility-aerial.webp")}
            width={1024}
            height={1024}
            loading="lazy"
            decoding="async"
            alt={t.alt.facility}
          />
        </div>
        <div className="system-content">
          <p className="eyebrow">{t.systemEyebrow}</p>
          <h2>{t.systemTitle}</h2>
          <p className="lead">{t.systemBody}</p>
          <div className="feature-list">
            {t.features.map(([num, title, body]) => (
              <article key={num}>
                <span>{num}</span>
                <div><h3>{title}</h3><p>{body}</p></div>
              </article>
            ))}
          </div>
          <div className="technology-block">
            <h3>{t.technologyTitle}</h3>
            <ul>
              {t.technology.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* The module system itself — the brochure's "Shielded Environment"
          page: what a PAN room is made of, before the measured curve. */}
      <section className="environment-section" aria-labelledby="environment-title">
        <div className="environment-grid">
          <div className="environment-content">
            <p className="eyebrow">{t.environmentEyebrow}</p>
            <h2 id="environment-title">{t.environmentTitle}</h2>
            {t.environmentBody.map((paragraph) => <p className="lead" key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="environment-visual">
            <img
              src={asset("/images/hero/hero-modular-volume.webp")}
              width={2000}
              height={1333}
              loading="lazy"
              decoding="async"
              alt={t.environmentAlt}
            />
          </div>
        </div>
        <div className="environment-lists">
          <section aria-label={t.environmentFeaturesTitle}>
            <h3>{t.environmentFeaturesTitle}</h3>
            <ul>{t.environmentFeatures.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section aria-label={t.environmentStandardsTitle}>
            <h3>{t.environmentStandardsTitle}</h3>
            <ul>{t.environmentStandards.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </div>
      </section>

      <section className="attenuation-section section-dark" id="attenuation" aria-labelledby="attenuation-title">
        <div className="section-heading">
          <p className="eyebrow">{t.attenuationEyebrow}</p>
          <h2 id="attenuation-title">{t.attenuationTitle}</h2>
          <p>{t.attenuationBody}</p>
        </div>
        <div className="table-scroll" role="region" tabIndex={0} aria-label={t.attenuationTitle}>
          <table className="attenuation-chart">
            <caption className="visually-hidden">{t.attenuationTitle}</caption>
            <thead>
              <tr>
                {attenuationRows.map(([frequency]) => <th key={frequency} scope="col">{frequency}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr className="attenuation-bars" aria-hidden="true">
                {attenuationRows.map(([frequency, db]) => (
                  <td key={frequency}>
                    <span className="attenuation-bar"><i style={{ height: barHeight(db) }} /></span>
                  </td>
                ))}
              </tr>
              <tr className="attenuation-values">
                {attenuationRows.map(([frequency, db]) => <td key={frequency}>&ge; {db} dB</td>)}
              </tr>
              <tr className="attenuation-fields">
                {attenuationRows.map(([frequency, , field]) => <td key={frequency}>{t.fieldTypes[field]}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="attenuation-note">{t.attenuationNote}</p>
      </section>

      <section className="ecosystem-section" id="ecosystem">
        <div className="section-heading light">
          <p className="eyebrow">{t.ecosystemEyebrow}</p>
          <h2>{t.ecosystemTitle}</h2>
          <p>{t.ecosystemBody}</p>
        </div>
        <div className="ecosystem-grid">
          {t.ecosystemCards.map(([title, body, spec], index) => (
            <article key={title}>
              <img
                src={asset(`/images/ecosystem/${ecosystemImages[index]}.webp`)}
                width={1000}
                height={667}
                loading="lazy"
                decoding="async"
                alt={t.ecosystemAlt[index]}
              />
              <div className="ecosystem-body">
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
                <p className="ecosystem-spec">{spec}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="ecosystem-note">
          <a href="#attenuation">{t.ecosystemNote}<b>↑</b></a>
        </p>
        {/* The accessory catalogue from the brochure's components page: six
            lists, one per discipline, under the six product lines. */}
        <div className="accessory-intro">
          <h3>{t.accessoriesTitle}</h3>
          <p>{t.accessoriesBody}</p>
        </div>
        <div className="accessory-grid">
          {t.accessories.map(([title, items]) => (
            <section key={title} aria-label={title}>
              <h4>{title}</h4>
              <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          ))}
        </div>
      </section>

      <section className="cutaway-section" aria-labelledby="cutaway-title">
        <div className="section-heading">
          <p className="eyebrow">{t.cutawayEyebrow}</p>
          <h2 id="cutaway-title">{t.cutawayTitle}</h2>
          <p>{t.cutawayBody}</p>
        </div>
        <CutawayMap lang={lang} alt={t.cutawayAlt} hint={t.cutawayHint} />
      </section>

      <section className="lifecycle-section" id="process">
        <div className="lifecycle-visual">
          <img
            src={asset("/images/engineer-inspection.webp")}
            width={800}
            height={800}
            loading="lazy"
            decoding="async"
            alt={t.alt.engineer}
          />
        </div>
        <div className="lifecycle-content">
          <p className="eyebrow">{t.processEyebrow}</p>
          <h2>{t.processTitle}</h2>
          <div className="step-list">
            {t.processSteps.map(([num, title, body]) => (
              <article key={num}><span>{num}</span><div><h3>{title}</h3><p>{body}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="scope-section" aria-labelledby="scope-title">
        <div className="section-heading light">
          <p className="eyebrow">{t.scopeEyebrow}</p>
          <h2 id="scope-title">{t.scopeTitle}</h2>
          <p>{t.scopeBody}</p>
        </div>
        <div className="table-scroll" role="region" tabIndex={0} aria-label={t.scopeTitle}>
          <table className="scope-list">
            <caption className="visually-hidden">{t.scopeBody}</caption>
            <thead>
              <tr>{t.scopeHead.map((label) => <th key={label} scope="col">{label}</th>)}</tr>
            </thead>
            <tbody>
              {t.scopeRows.map(([category, tag, detail], index) => {
                const [rating, tone] = scopeMeta[index];
                return (
                  <tr key={category}>
                    <th scope="row">{category}</th>
                    <td>
                      <span className="scope-rating" aria-label={`${rating} / 5`}>
                        {[1, 2, 3, 4, 5].map((dot) => <i key={dot} className={dot <= rating ? "on" : ""} />)}
                      </span>
                    </td>
                    <td><span className={`scope-tag ${tone}`}>{tag}</span>{detail}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Who is behind the room, placed where the reader is deciding whether to
          trust the supplier rather than the specification. */}
      <section className="company-section" id="company" aria-labelledby="company-title">
        <div className="company-intro">
          <div className="section-heading light">
            <p className="eyebrow">{t.companyEyebrow}</p>
            <h2 id="company-title">{t.companyTitle}</h2>
            <p>{t.companyBody}</p>
            {/* The group site is the proof behind the paragraph above: the
                reader who wants to check who Frankonia is leaves from here,
                in a new tab so the page they are reading survives it. */}
            <a
              className="text-link company-link"
              href="https://www.frankonia-korea.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.companyLink}<span>↗</span>
            </a>
          </div>
          <img
            className="company-banner"
            src={asset("/images/frankonia-campus.webp")}
            width={983}
            height={553}
            loading="lazy"
            decoding="async"
            alt={t.companyImageAlt}
          />
        </div>
        <div className="company-glance">
          <h3>{t.companyGlanceTitle}</h3>
          <ul>
            {t.companyGlance.map(([label, note]) => (
              <li key={label}><strong>{label}</strong><span>{note}</span></li>
            ))}
          </ul>
        </div>
        <div className="company-grid">
          {t.companyColumns.map(([heading, items]) => (
            <section key={heading} className="company-column">
              <h3>{heading}</h3>
              <ul>
                {items.map(([label, note]) => (
                  <li key={label}><strong>{label}</strong><span>{note}</span></li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <div className="company-glance company-values">
          <h3>{t.companyValuesTitle}</h3>
          <ul>
            {t.companyValues.map(([label, note]) => (
              <li key={label}><strong>{label}</strong><span>{note}</span></li>
            ))}
          </ul>
        </div>
        {/* Entities and cities only. Addresses, numbers and mailboxes stay on
            the imprint, so the form remains the one route in. */}
        <div className="company-glance company-locations">
          <h3>{t.companyLocationsTitle}</h3>
          <ul>
            {t.companyLocations.map(([name, place]) => (
              <li key={name}><strong>{name}</strong><span>{place}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="faq-inner">
          <p className="eyebrow">{t.faqEyebrow}</p>
          <h2>{t.faqTitle}</h2>
          <div className="faq-list">
            {t.faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-intro">
          <p className="eyebrow">{t.contactEyebrow}</p>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactBody}</p>
          {/* No e-mail address and no phone number here by request: the form is
              the only route in, so every enquiry arrives already qualified.
              `contactEmail` still backs the mailto fallback shown if the form
              endpoint is unreachable — it is never rendered as an address. */}
          {/* Wrapped rather than left as a bare child: `.contact-intro > a`
              owns the underlined e-mail treatment, which this must not take. */}
          <div className="brochure">
            <a
              className="brochure-link"
              href={asset("/downloads/frankonia-cybershield-2026.pdf")}
              download
            >
              <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2.5v10" />
                <path d="M6 9l4 4 4-4" />
                <path d="M3.5 16.5h13" />
              </svg>
              {t.brochureLabel}
            </a>
            <p className="brochure-meta">{t.brochureMeta}</p>
          </div>
        </div>
        <form onSubmit={submit} action={asset("/api/inquiry.php")} method="post">
          <fieldset className="request-toggle">
            <legend>{t.labels.type}</legend>
            <label className={inquiry === "consultation" ? "selected" : ""}>
              <input type="radio" name="request" value="consultation" checked={inquiry === "consultation"} onChange={() => setInquiry("consultation")} />
              {t.consultation}
            </label>
            <label className={inquiry === "quote" ? "selected" : ""}>
              <input type="radio" name="request" value="quote" checked={inquiry === "quote"} onChange={() => setInquiry("quote")} />
              {t.quote}
            </label>
          </fieldset>
          <div className="form-grid">
            <label>{t.labels.name}<input required name="name" autoComplete="name" /></label>
            <label>{t.labels.company}<input required name="company" autoComplete="organization" /></label>
            <label>{t.labels.email}<input required type="email" name="email" autoComplete="email" /></label>
            <label>{t.labels.country}<input required name="country" autoComplete="country-name" /></label>
            <label>{t.labels.project}
              <select name="project" required defaultValue="">
                <option value="" disabled>—</option>
                <option>{t.options.newBuild}</option><option>{t.options.retrofit}</option><option>{t.options.confidential}</option>
              </select>
            </label>
            <label>{t.labels.stage}
              <select name="stage" required defaultValue="">
                <option value="" disabled>—</option>
                <option>{t.options.concept}</option><option>{t.options.planning}</option><option>{t.options.procurement}</option><option>{t.options.urgent}</option>
              </select>
            </label>
            <label className="full">{t.labels.message}<textarea required name="message" rows={5} /></label>
          </div>
          <label className="consent"><input type="checkbox" name="consent" required /> <span>{t.labels.consent}</span></label>
          {/* Honeypot. Moved off-screen rather than display:none, because
              headless browsers routinely skip fields they cannot see. */}
          <div className="honeypot" aria-hidden="true">
            <label>{t.formHoneypot}<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
          </div>
          <button className="button submit" type="submit" disabled={sendState === "sending" || sendState === "sent"}>
            {sendState === "sending"
              ? t.formSending
              : inquiry === "quote" ? t.labels.submitQuote : t.labels.submitConsultation}
            <span>↗</span>
          </button>
          <p className="form-status" role="status" aria-live="polite">
            {sendState === "sent" && <span className="form-status-ok">{t.formSent}</span>}
            {sendState === "error" && (
              <span className="form-status-error">
                {t.formError} <a href={fallbackHref}>{t.formErrorAction}</a>
              </span>
            )}
          </p>
          <p className="email-note">{t.emailNote}</p>
        </form>
      </section>

      <footer>
        <div className="footer-brand"><BrandLockup /></div>
        <p>{t.footer}</p>
        <div>
          {/* The header switcher only renders its links once opened, so these
              are the crawlable path to the other locales. */}
          <nav className="footer-langs" aria-label={t.langLabel}>
            {languages.map(([code, , label, path]) => (
              <a key={code} href={route(path)} hrefLang={code} lang={code} aria-current={code === lang ? "true" : undefined}>
                {label}
              </a>
            ))}
          </nav>
          <a href={route("/privacy")}>Privacy</a>
          <a href={route("/imprint")}>Imprint</a>
          <a href="https://frankonia-solutions.com/" target="_blank" rel="noreferrer">© 1987 Frankonia Group</a>
        </div>
      </footer>
    </main>
  );
}
