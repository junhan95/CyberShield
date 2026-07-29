"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

export type Lang = "en" | "ko";
type Inquiry = "consultation" | "quote";

const copy = {
  en: {
    nav: {
      threats: "Why CyberShield",
      solution: "Solution",
      verification: "Verification",
      applications: "Applications",
      process: "Process",
      contact: "Contact",
    },
    langLabel: "이 페이지를 한국어로 보기",
    menuOpenLabel: "Open menu",
    menuCloseLabel: "Close menu",
    consultation: "Book a consultation",
    quote: "Request a quote",
    eyebrow: "PHYSICAL & ELECTROMAGNETIC SECURITY FOR CRITICAL COMPUTE",
    heroTitle: "Protect the compute.",
    heroAccent: "Contain the signal.",
    heroBody:
      "CyberShield creates a measurable electromagnetic security boundary around mission-critical data infrastructure—engineered, integrated and verified as one complete system.",
    explore: "Explore the system",
    metrics: [
      ["Verified on site", "Shielding performance is measured after installation—not assumed"],
      ["Weld-free assembly", "Bolted modules installed alongside live operations, no hot work"],
      ["Built to change", "Dismount, expand or relocate the room without damage"],
    ],
    proof: ["Engineering heritage since 1987", "5 global locations", "Presence in 80+ countries", "Turnkey delivery"],
    whyEyebrow: "WHY THE RISK IS GROWING",
    whyTitle: "More value is being concentrated behind the same physical walls.",
    whyBody:
      "AI and sovereign workloads concentrate exceptional compute, data and operational dependency in a small number of facilities. The IEA expects electricity use from AI-focused data centres to triple between 2025 and 2030—a clear signal of how quickly critical digital capacity is scaling.",
    whyMetric: "3×",
    whyMetricLabel: "Projected growth in AI-focused data-centre electricity use, 2025–2030",
    assetCards: [
      ["Confidentiality", "Models, cryptographic material, classified information and customer data remain sensitive even when the network is segmented."],
      ["Availability", "A localized electromagnetic event can upset electronics, controls or communications without a conventional cyber intrusion."],
      ["Capital & continuity", "High-density compute, cooling and power infrastructure turn one protected room into a concentrated operational dependency."],
    ],
    source: "Source",
    threatEyebrow: "THE SECURITY LAYER SOFTWARE CANNOT PROVIDE",
    threatTitle: "Not every threat enters through the network.",
    threatBody:
      "Encryption and zero-trust protect the digital domain. CyberShield addresses physical and electromagnetic exposure at the facility boundary.",
    threats: [
      ["Compromising emanations", "Sensitive processing activity can be exposed through unintended electromagnetic signals—without touching the network.", "Confidentiality exposed"],
      ["Intentional interference", "Localized high-power RF or electromagnetic energy can disrupt electronics, controls and communications.", "Service interruption"],
      ["EMP / HEMP exposure", "Radiated and conducted pulse effects can challenge critical systems and continuity architectures.", "Mission continuity risk"],
      ["Boundary vulnerabilities", "Doors, ventilation, power, data, cooling and utility penetrations can become the weakest path through the shield.", "Protection degraded"],
    ],
    impactLabel: "Potential impact",
    systemEyebrow: "MODULAR PAN SHIELDING SYSTEM",
    systemTitle: "A secure room engineered around the reality of your facility.",
    systemBody:
      "Prefabricated PAN modules pass through standard building doors, assemble from the inside and can be installed close to existing walls. No glue. No welding. No irreversible commitment.",
    features: [
      ["01", "Precision assembly", "Panels are bolted every 75 mm with predefined torque and conductive mesh gaskets."],
      ["02", "Architectural integration", "Designed around raised floors, racks, fire systems, lighting, cooling and access control."],
      ["03", "Adaptable by design", "Dismountable without damage for expansion, modification or complete relocation."],
      ["04", "Complete boundary", "Shielding structure, doors, filters, honeycombs and waveguides are treated as one system."],
    ],
    verifyEyebrow: "VERIFIED, NOT ASSUMED",
    verifyTitle: "Performance you don't have to take on faith.",
    verifyBody:
      "Every CyberShield project ends with measured evidence. Shielding effectiveness is tested on site according to international standards, and documented acceptance results are handed over with the room. Detailed performance data is available for your engineering team.",
    standardsIntro: "Measured and validated against",
    standards: [
      ["EN 50147-1", "Shielding effectiveness measurement"],
      ["IEEE 299", "Available as a project option"],
      ["TEMPEST", "Project-specific design & approval"],
      ["HEMP", "Project-specific validation"],
    ],
    brochure: "Download performance sheet",
    evidenceTitle: "Evidence base",
    applicationsEyebrow: "BUILT FOR HIGH-VALUE ENVIRONMENTS",
    applicationsTitle: "One platform. Four mission profiles.",
    applications: [
      ["Sovereign Compute Vault", "Government & sovereign cloud", "Create a controlled processing zone for classified or nationally sensitive workloads."],
      ["AI & HPC Shielded Zone", "AI labs & hyperscale operators", "Protect high-value models, training data and accelerated compute infrastructure."],
      ["Colocation Shielded Vault", "Colocation providers", "Offer a measurable premium security tier for regulated enterprise customers."],
      ["Mission Continuity Suite", "Defense, finance & communications", "Support continuity architectures exposed to electromagnetic disruption risks."],
    ],
    scenarioEyebrow: "HOW CYBERSHIELD IS USED",
    scenarioTitle: "Three situations we see again and again.",
    scenarioLabels: { challenge: "Challenge", approach: "Approach", outcome: "Outcome" },
    scenarios: [
      [
        "Government & sovereign cloud",
        "A classified zone inside a live facility",
        "A government cloud programme required a secure processing zone for classified workloads inside an existing data centre.",
        "The shielded vault was engineered around live operations, installed without welding and verified on site.",
        "A high-security zone delivered and acceptance-tested without interrupting the surrounding facility.",
      ],
      [
        "AI lab",
        "A measurable boundary around model assets",
        "An AI company needed to protect model weights and training clusters against emanation and interference risks.",
        "A dedicated shielded hall integrated cooling, power and monitoring for high-density racks.",
        "A measured, documented security boundary around the company's most valuable IP.",
      ],
      [
        "Colocation",
        "A premium security tier without rebuilding",
        "A colocation operator wanted a premium tier for regulated customers—without rebuilding the site.",
        "A modular vault was added inside existing white space and packaged as a verified product.",
        "A new revenue stream from a security tier competitors cannot easily match.",
      ],
    ],
    scenarioNote: "Representative scenarios based on typical project profiles.",
    processEyebrow: "WHAT HAPPENS WHEN YOU REACH OUT",
    processTitle: "From first conversation to verified protection.",
    processSteps: [
      ["01", "Initial consultation", "A specialist reviews your goals, site and constraints. No documentation is required to start."],
      ["02", "Risk & site assessment", "Assets, threat scenarios and facility conditions are assessed; protection requirements are defined together."],
      ["03", "Concept & proposal", "You receive a concept design, an integration plan and a transparent quotation."],
      ["04", "Installation & verification", "Modules are assembled on site without welding; performance is measured and documented at handover."],
      ["05", "Operation & support", "Preventive maintenance, inspections and revalidation keep the boundary effective over time."],
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
    heroVideoLabel: "3D render of a CyberShield modular shielded data hall being assembled",
    contactEyebrow: "START WITH YOUR RISK PROFILE",
    contactTitle: "Let’s define the right protection boundary.",
    contactBody:
      "Tell us what you need to protect. A Frankonia specialist will review your project and respond by email.",
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
      submitConsultation: "Prepare consultation email",
      submitQuote: "Prepare quote request email",
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
      "Submitting opens your email application with the project details pre-filled. No form data is stored on this website.",
    footer:
      "CyberShield is a high-assurance engineering solution. Performance, standards and certification scope depend on the agreed project configuration and final validation.",
  },
  ko: {
    nav: {
      threats: "필요성",
      solution: "솔루션",
      verification: "검증",
      applications: "적용 분야",
      process: "도입 절차",
      contact: "문의",
    },
    langLabel: "View this page in English",
    menuOpenLabel: "메뉴 열기",
    menuCloseLabel: "메뉴 닫기",
    consultation: "상담 예약",
    quote: "견적 요청",
    eyebrow: "핵심 컴퓨팅을 위한 물리·전자기 보안",
    heroTitle: "컴퓨팅 자산을 보호하고,",
    heroAccent: "신호를 경계 안에 가두십시오.",
    heroBody:
      "CyberShield는 미션 크리티컬 데이터 인프라 주변에 측정 가능한 전자기 보안 경계를 구축합니다. 설계부터 통합, 현장 검증까지 하나의 완전한 시스템으로 제공합니다.",
    explore: "시스템 살펴보기",
    metrics: [
      ["현장 측정 검증", "설치 후 차폐 성능을 현장에서 측정합니다 — 추정이 아닌 증거"],
      ["무용접 모듈 조립", "화기 작업 없는 볼트 체결 — 운영 중인 시설과 병행 시공"],
      ["확장·이전 가능", "손상 없이 해체해 확장·변경·이전에 재사용"],
    ],
    proof: ["1987년부터 축적한 엔지니어링", "글로벌 5개 거점", "80개국 이상 공급 네트워크", "턴키 제공"],
    whyEyebrow: "증가하는 위험",
    whyTitle: "같은 물리적 공간에 더 많은 가치와 운영 의존성이 집중되고 있습니다.",
    whyBody:
      "AI와 소버린 워크로드는 막대한 컴퓨팅 자원, 데이터 및 업무 연속성을 소수 시설에 집중시킵니다. IEA는 2025~2030년 AI 중심 데이터센터의 전력 사용량이 약 3배 증가할 것으로 전망합니다. 이는 보호해야 할 핵심 디지털 역량이 얼마나 빠르게 확대되는지를 보여줍니다.",
    whyMetric: "3배",
    whyMetricLabel: "2025~2030년 AI 중심 데이터센터 전력 사용량 전망",
    assetCards: [
      ["기밀성", "모델, 암호 키, 기밀 정보와 고객 데이터는 네트워크가 분리되어 있어도 여전히 보호해야 할 민감 자산입니다."],
      ["가용성", "국소적인 전자기 사건은 일반적인 사이버 침입 없이도 전자장비, 제어 및 통신에 장애를 일으킬 수 있습니다."],
      ["자본과 업무 연속성", "고밀도 컴퓨팅, 냉각 및 전력 인프라는 하나의 보호 공간을 핵심 운영 의존점으로 만듭니다."],
    ],
    source: "출처",
    threatEyebrow: "소프트웨어만으로 제공할 수 없는 보안 계층",
    threatTitle: "모든 위협이 네트워크를 통해 들어오지는 않습니다.",
    threatBody:
      "암호화와 제로 트러스트는 디지털 영역을 보호합니다. CyberShield는 시설 경계에서 발생하는 물리적·전자기적 노출을 통제합니다.",
    threats: [
      ["전자기 정보 방사", "네트워크에 접촉하지 않고도 비의도적 전자기 신호를 통해 민감한 처리 활동이 노출될 수 있습니다.", "기밀성 노출"],
      ["의도적 전자기 간섭", "국소 고출력 RF 또는 전자기 에너지는 전자장비, 제어 및 통신을 교란할 수 있습니다.", "서비스 중단"],
      ["EMP / HEMP 노출", "방사 및 전도성 펄스 영향은 중요 시스템과 업무 연속성 아키텍처를 위협할 수 있습니다.", "업무 연속성 위험"],
      ["경계 구성요소 취약점", "도어, 환기, 전원, 데이터, 냉각 및 설비 관통부가 차폐 경계의 가장 약한 경로가 될 수 있습니다.", "보호 성능 저하"],
    ],
    impactLabel: "잠재 영향",
    systemEyebrow: "모듈형 PAN 차폐 시스템",
    systemTitle: "시설의 현실을 반영해 설계하는 보안 공간.",
    systemBody:
      "사전 제작된 PAN 모듈은 표준 건물 출입문으로 반입할 수 있고 내부에서 조립되며 기존 벽에 근접 설치할 수 있습니다. 접착제와 용접 없이 확장과 이전이 가능합니다.",
    features: [
      ["01", "정밀 조립", "75 mm 간격의 체결, 사전 정의된 토크 및 전도성 메시 개스킷을 적용합니다."],
      ["02", "건축 통합", "이중바닥, 랙, 소방, 조명, 냉각 및 출입통제 시스템을 통합 설계합니다."],
      ["03", "확장 가능한 구조", "손상 없이 해체해 확장, 변경 또는 전체 이전에 재사용할 수 있습니다."],
      ["04", "완전한 보호 경계", "차폐 구조, 도어, 필터, 허니콤 및 도파관을 하나의 시스템으로 구성합니다."],
    ],
    verifyEyebrow: "추정이 아닌 검증",
    verifyTitle: "약속이 아니라 측정으로 증명합니다.",
    verifyBody:
      "모든 CyberShield 프로젝트는 측정된 증거로 완료됩니다. 차폐 성능은 국제 표준에 따라 설치 후 현장에서 시험하고, 문서화된 인수 결과를 공간과 함께 인도합니다. 상세 성능 데이터는 엔지니어링 팀을 위해 제공됩니다.",
    standardsIntro: "적용 표준",
    standards: [
      ["EN 50147-1", "차폐효과 측정 표준"],
      ["IEEE 299", "프로젝트 옵션으로 제공"],
      ["TEMPEST", "프로젝트별 설계·승인"],
      ["HEMP", "프로젝트별 검증"],
    ],
    brochure: "성능 자료 다운로드",
    evidenceTitle: "근거 자료",
    applicationsEyebrow: "고가치 환경을 위한 솔루션",
    applicationsTitle: "하나의 플랫폼, 네 가지 미션 프로파일.",
    applications: [
      ["Sovereign Compute Vault", "정부·소버린 클라우드", "기밀 또는 국가 중요 워크로드를 위한 통제된 처리 구역을 구축합니다."],
      ["AI & HPC Shielded Zone", "AI 연구소·하이퍼스케일", "고가치 모델, 학습 데이터 및 가속 컴퓨팅 인프라를 보호합니다."],
      ["Colocation Shielded Vault", "코로케이션 사업자", "규제 산업 고객을 위한 측정 가능한 프리미엄 보안 등급을 제공합니다."],
      ["Mission Continuity Suite", "국방·금융·통신", "전자기 교란 위험에 노출된 중요 업무의 연속성 아키텍처를 지원합니다."],
    ],
    scenarioEyebrow: "CyberShield 활용 방식",
    scenarioTitle: "반복해서 마주하는 세 가지 상황.",
    scenarioLabels: { challenge: "과제", approach: "접근", outcome: "결과" },
    scenarios: [
      [
        "정부·소버린 클라우드",
        "운영 중인 시설 안의 기밀 처리 구역",
        "정부 클라우드 프로그램이 기존 데이터센터 내부에 기밀 워크로드용 보안 구역을 요구했습니다.",
        "운영을 유지한 채 무용접 방식으로 차폐 볼트를 설계·시공하고 현장에서 성능을 검증했습니다.",
        "주변 시설 중단 없이 고보안 구역을 구축하고 인수 시험까지 완료했습니다.",
      ],
      [
        "AI 연구소",
        "모델 자산을 둘러싼 측정 가능한 경계",
        "AI 기업이 모델 가중치와 학습 클러스터를 정보 방사와 간섭 위험으로부터 보호해야 했습니다.",
        "고밀도 랙을 위한 냉각·전원·모니터링을 통합한 전용 차폐 홀을 구축했습니다.",
        "기업의 가장 가치 있는 IP 주변에 측정되고 문서화된 보안 경계를 확보했습니다.",
      ],
      [
        "코로케이션",
        "재건축 없이 만든 프리미엄 보안 등급",
        "코로케이션 사업자가 시설 재구축 없이 규제 산업 고객용 프리미엄 등급을 원했습니다.",
        "기존 상면 내부에 모듈형 볼트를 증설하고 검증된 상품으로 패키지화했습니다.",
        "경쟁사가 따라오기 어려운 보안 등급으로 신규 매출원을 확보했습니다.",
      ],
    ],
    scenarioNote: "일반적인 프로젝트 유형을 바탕으로 구성한 예시입니다.",
    processEyebrow: "문의하시면 이렇게 진행됩니다",
    processTitle: "첫 상담부터 검증된 보호까지.",
    processSteps: [
      ["01", "초기 상담", "전문가가 목표, 현장 조건, 제약을 함께 검토합니다. 준비 서류 없이 시작할 수 있습니다."],
      ["02", "위험·현장 진단", "자산, 위협 시나리오, 시설 조건을 평가하고 보호 요구사항을 함께 정의합니다."],
      ["03", "개념 설계·견적", "개념 설계안, 통합 계획, 투명한 견적을 제공합니다."],
      ["04", "시공·검증", "무용접 방식으로 현장 조립하고, 인도 시점에 성능을 측정해 문서화합니다."],
      ["05", "운영·유지보수", "예방 정비, 점검, 재검증으로 보호 성능을 지속 유지합니다."],
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
    heroVideoLabel: "CyberShield 모듈형 차폐 데이터홀이 조립되는 3D 렌더링",
    contactEyebrow: "위험 프로파일에서 시작하십시오",
    contactTitle: "필요한 보호 경계를 함께 정의하겠습니다.",
    contactBody:
      "보호해야 할 자산과 프로젝트 정보를 알려주십시오. Frankonia 전문가가 검토한 후 이메일로 연락드립니다.",
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
      submitConsultation: "상담 이메일 작성",
      submitQuote: "견적요청 이메일 작성",
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
      "제출하면 입력한 프로젝트 정보가 포함된 이메일 작성 화면이 열립니다. 이 웹사이트에는 양식 데이터가 저장되지 않습니다.",
    footer:
      "CyberShield는 고보증 엔지니어링 솔루션입니다. 성능, 적용 규격 및 인증 범위는 합의된 프로젝트 구성과 최종 검증 결과에 따라 결정됩니다.",
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

const revealSelector = [
  ".asset-grid article",
  ".threat-grid article",
  ".feature-list article",
  ".step-list article",
  ".application-grid article",
  ".scenario-grid article",
  ".standards-row div",
  ".faq-list details",
  ".why-metric",
  ".system-image",
  ".verify-visual",
  ".lifecycle-visual",
].join(",");

const navSectionIds = ["why", "solution", "verification", "applications", "process"];

export function Landing({ lang }: { lang: Lang }) {
  const [inquiry, setInquiry] = useState<Inquiry>("consultation");
  const [menuOpen, setMenuOpen] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const metricRef = useRef<HTMLElement>(null);
  const t = copy[lang];
  const otherLangHref = lang === "en" ? "/ko" : "/";

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.play().catch(() => {});
  }, []);

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
    const target = parseFloat(t.whyMetric);
    if (Number.isNaN(target) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const suffix = t.whyMetric.replace(/^[\d.]+/, "");

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const started = performance.now();
        const step = (now: number) => {
          const progress = Math.min(1, (now - started) / 1000);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = `${Math.round(target * eased)}${suffix}`;
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

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
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
    window.location.href = `mailto:sales@frankoniagroup.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const navLinks = (
    <>
      <a href="#why" onClick={() => setMenuOpen(false)}>{t.nav.threats}</a>
      <a href="#solution" onClick={() => setMenuOpen(false)}>{t.nav.solution}</a>
      <a href="#verification" onClick={() => setMenuOpen(false)}>{t.nav.verification}</a>
      <a href="#applications" onClick={() => setMenuOpen(false)}>{t.nav.applications}</a>
      <a href="#process" onClick={() => setMenuOpen(false)}>{t.nav.process}</a>
    </>
  );

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="CyberShield home">
          <img className="brand-logo" src="/frankonia-mark.svg" width={1116} height={746} alt="" aria-hidden="true" />
          <span><b>FRANKONIA</b><small>CYBERSHIELD</small></span>
        </a>
        <nav className="nav-desktop" aria-label="Primary navigation">
          {navLinks}
        </nav>
        <div className="header-actions">
          <a className="language" href={otherLangHref} aria-label={t.langLabel}>
            {lang === "en" ? "KO" : "EN"}
          </a>
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
          <div className="hero-visual">
            <div className="visual-ring" />
            <video
              ref={heroVideoRef}
              src="/hero-render.mp4"
              poster="/images/hero-render-poster.jpg"
              width={1920}
              height={1080}
              muted
              playsInline
              preload="auto"
              aria-label={t.heroVideoLabel}
            />
          </div>
        </div>
        <div className="metrics">
          {t.metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
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
            <a href="https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary" target="_blank" rel="noreferrer">
              {t.source}: IEA, 2026 ↗
            </a>
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

      <section className="system-section" id="solution">
        <div className="system-image">
          <img
            src="/images/facility-aerial.jpg"
            width={1024}
            height={1024}
            loading="lazy"
            decoding="async"
            alt={lang === "en" ? "Aerial view of a data-centre facility campus" : "데이터센터 시설 단지의 항공 전경"}
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
          <a className="download-link" href="/CyberShield-Performance-2026.pdf" download>
            <span>PDF</span>{t.brochure}<b>↓</b>
          </a>
          <div className="evidence-row">
            <strong>{t.evidenceTitle}</strong>
            <a href="https://www.ncsc.gov.uk/information/tempest-and-electromagnetic-security" target="_blank" rel="noreferrer">NCSC · TEMPEST &amp; Electromagnetic Security ↗</a>
            <a href="https://csrc.nist.gov/CSRC/media/Projects/risk-management/800-53%20Downloads/800-53r5/SP_800-53_v5_1-derived-OSCAL.pdf" target="_blank" rel="noreferrer">NIST · SP 800-53 PE-19 ↗</a>
            <a href="https://www.cisa.gov/sites/default/files/publications/CISA%20Resilient%20Power%20Best%20Practices%20for%20Critical%20Facilities%20and%20Sites.pdf" target="_blank" rel="noreferrer">CISA · Resilient Power ↗</a>
            <a href="https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary" target="_blank" rel="noreferrer">IEA · Energy &amp; AI ↗</a>
          </div>
        </div>
        <div className="verify-visual">
          <img
            src="/images/technician-verification.jpg"
            width={768}
            height={1376}
            loading="lazy"
            decoding="async"
            alt={lang === "en" ? "Technician verifying systems inside the data hall" : "데이터홀 내부에서 시스템을 검증하는 기술자"}
          />
        </div>
      </section>

      <section className="applications-section" id="applications">
        <div className="section-heading light">
          <p className="eyebrow">{t.applicationsEyebrow}</p>
          <h2>{t.applicationsTitle}</h2>
        </div>
        <div className="application-grid">
          {t.applications.map(([title, audience, body], index) => (
            <article key={title}>
              <div className="application-top"><span>0{index + 1}</span><b>↗</b></div>
              <p className="audience">{audience}</p>
              <h3>{title}</h3>
              <p>{body}</p>
              <button onClick={() => goContact("consultation")}>{t.consultation}</button>
            </article>
          ))}
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
        <p className="scenario-note">{t.scenarioNote}</p>
      </section>

      <section className="lifecycle-section" id="process">
        <div className="lifecycle-visual">
          <img
            src="/images/engineer-inspection.jpg"
            width={800}
            height={800}
            loading="lazy"
            decoding="async"
            alt={lang === "en" ? "Engineer inspecting racks inside a protected server aisle" : "보호 구역 서버 통로에서 랙을 점검하는 엔지니어"}
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
          <a href="mailto:sales@frankoniagroup.com">sales@frankoniagroup.com</a>
        </div>
        <form onSubmit={submit}>
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
          <label className="consent"><input type="checkbox" required /> <span>{t.labels.consent}</span></label>
          <button className="button submit" type="submit">
            {inquiry === "quote" ? t.labels.submitQuote : t.labels.submitConsultation}<span>↗</span>
          </button>
          <p className="email-note">{t.emailNote}</p>
        </form>
      </section>

      <footer>
        <div className="footer-brand"><img className="brand-logo" src="/frankonia-mark.svg" width={1116} height={746} alt="Frankonia logo" /><span><b>FRANKONIA</b><small>CYBERSHIELD</small></span></div>
        <p>{t.footer}</p>
        <div><a href="https://frankonia-solutions.com/privacy/" target="_blank" rel="noreferrer">Privacy</a><a href="https://frankonia-solutions.com/imprint/" target="_blank" rel="noreferrer">Imprint</a><span>© 2026 Frankonia Group</span></div>
      </footer>
    </main>
  );
}
