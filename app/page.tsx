"use client";

import { FormEvent, useState } from "react";

type Lang = "en" | "ko";
type Inquiry = "consultation" | "quote";

const copy = {
  en: {
    nav: {
      solution: "Solution",
      performance: "Performance",
      applications: "Applications",
      engineering: "Engineering",
      contact: "Contact",
    },
    consultation: "Book a consultation",
    quote: "Request a quote",
    eyebrow: "PHYSICAL & ELECTROMAGNETIC SECURITY FOR CRITICAL COMPUTE",
    heroTitle: "Protect the compute.",
    heroAccent: "Contain the signal.",
    heroBody:
      "CyberShield creates a measurable electromagnetic security boundary around mission-critical data infrastructure—engineered, integrated and verified as one complete system.",
    explore: "Explore the system",
    metrics: [
      ["10 kHz–40 GHz", "Broadband protection range"],
      ["Up to ≥120 dB", "Guaranteed attenuation*"],
      ["2.0 mm PAN", "Modular galvanized steel"],
    ],
    proof: ["Engineering heritage since 1987", "5 global locations", "Presence in 80+ countries", "Turnkey delivery"],
    threatEyebrow: "THE SECURITY LAYER SOFTWARE CANNOT PROVIDE",
    threatTitle: "Not every threat enters through the network.",
    threatBody:
      "Encryption and zero-trust protect the digital domain. CyberShield addresses physical and electromagnetic exposure at the facility boundary.",
    threats: [
      ["Compromising emanations", "Reduce exposure to unintended electromagnetic signals that can disclose sensitive processing activity."],
      ["Intentional interference", "Create a hardened boundary against localized high-power RF and electromagnetic disruption."],
      ["EMP / HEMP exposure", "Support project-specific protection architectures for critical continuity requirements."],
      ["Boundary vulnerabilities", "Control doors, ventilation, power, data, cooling and utility penetrations as one system."],
    ],
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
    performanceEyebrow: "2026 GUARANTEED PERFORMANCE",
    performanceTitle: "Protection you can specify—and verify.",
    performanceBody:
      "Guaranteed attenuation values for the 2026 high-performance configuration. Final acceptance criteria are agreed per project and verified after installation.",
    frequency: "Frequency",
    attenuation: "Attenuation",
    field: "Field",
    fields: { magnetic: "Magnetic field", plane: "Plane wave", microwave: "Microwave" },
    standardNote:
      "Measurement according to EN 50147-1. IEEE 299 available as a project option. TEMPEST and HEMP requirements are subject to project-specific design, authority approval and validation.",
    brochure: "Download performance sheet",
    applicationsEyebrow: "BUILT FOR HIGH-VALUE ENVIRONMENTS",
    applicationsTitle: "One platform. Four mission profiles.",
    applications: [
      ["Sovereign Compute Vault", "Government & sovereign cloud", "Create a controlled processing zone for classified or nationally sensitive workloads."],
      ["AI & HPC Shielded Zone", "AI labs & hyperscale operators", "Protect high-value models, training data and accelerated compute infrastructure."],
      ["Colocation Shielded Vault", "Colocation providers", "Offer a measurable premium security tier for regulated enterprise customers."],
      ["Mission Continuity Suite", "Defense, finance & communications", "Support continuity architectures exposed to electromagnetic disruption risks."],
    ],
    lifecycleEyebrow: "ASSURANCE ACROSS THE LIFECYCLE",
    lifecycleTitle: "Identify. Engineer. Verify. Maintain.",
    steps: [
      ["01", "Identify", "Site review, ambient RF assessment and definition of assets, threats and acceptance criteria."],
      ["02", "Engineer", "3D/CAD/BIM integration of the shield, access, cooling, power, data and utilities."],
      ["03", "Verify", "On-site shielding effectiveness measurement and documented acceptance testing."],
      ["04", "Maintain", "Preventive service, leak detection, modifications and periodic revalidation."],
    ],
    insideEyebrow: "ENGINEERED FOR OPERATIONS",
    insideTitle: "High assurance without compromising the data hall.",
    insideBody:
      "CyberShield integrates the systems a modern data hall needs—from airflow and raised floors to emergency access and monitored RF doors.",
    renderNote: "Conceptual 3D visualization",
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
      solution: "솔루션",
      performance: "성능",
      applications: "적용 분야",
      engineering: "엔지니어링",
      contact: "문의",
    },
    consultation: "상담 예약",
    quote: "견적 요청",
    eyebrow: "핵심 컴퓨팅을 위한 물리·전자기 보안",
    heroTitle: "컴퓨팅 자산을 보호하고,",
    heroAccent: "신호를 경계 안에 가두십시오.",
    heroBody:
      "CyberShield는 미션 크리티컬 데이터 인프라 주변에 측정 가능한 전자기 보안 경계를 구축합니다. 설계부터 통합, 현장 검증까지 하나의 완전한 시스템으로 제공합니다.",
    explore: "시스템 살펴보기",
    metrics: [
      ["10 kHz–40 GHz", "광대역 보호 범위"],
      ["최대 ≥120 dB", "보증 감쇠 성능*"],
      ["2.0 mm PAN", "모듈형 아연도금 강판"],
    ],
    proof: ["1987년부터 축적한 엔지니어링", "글로벌 5개 거점", "80개국 이상 공급 네트워크", "턴키 제공"],
    threatEyebrow: "소프트웨어만으로 제공할 수 없는 보안 계층",
    threatTitle: "모든 위협이 네트워크를 통해 들어오지는 않습니다.",
    threatBody:
      "암호화와 제로 트러스트는 디지털 영역을 보호합니다. CyberShield는 시설 경계에서 발생하는 물리적·전자기적 노출을 통제합니다.",
    threats: [
      ["전자기 정보 방사", "민감한 처리 활동을 노출할 수 있는 비의도적 전자기 신호의 외부 노출을 줄입니다."],
      ["의도적 전자기 간섭", "국소 고출력 RF 및 전자기 교란에 대응하는 강화된 경계를 구축합니다."],
      ["EMP / HEMP 노출", "중요 업무 연속성 요구를 위한 프로젝트별 보호 아키텍처를 지원합니다."],
      ["경계 구성요소 취약점", "도어, 환기, 전원, 데이터, 냉각 및 설비 관통부를 하나의 시스템으로 통제합니다."],
    ],
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
    performanceEyebrow: "2026 보증 성능",
    performanceTitle: "명확하게 규정하고 현장에서 검증하는 보호 성능.",
    performanceBody:
      "2026 고성능 구성의 보증 감쇠 수치입니다. 최종 인수 기준은 프로젝트별로 합의하고 설치 완료 후 현장에서 검증합니다.",
    frequency: "주파수",
    attenuation: "감쇠 성능",
    field: "필드 유형",
    fields: { magnetic: "자기장", plane: "평면파", microwave: "마이크로파" },
    standardNote:
      "EN 50147-1에 따른 측정. IEEE 299는 프로젝트 옵션으로 제공됩니다. TEMPEST 및 HEMP 요구사항은 프로젝트별 설계, 승인기관 검토 및 검증을 전제로 합니다.",
    brochure: "성능 자료 다운로드",
    applicationsEyebrow: "고가치 환경을 위한 솔루션",
    applicationsTitle: "하나의 플랫폼, 네 가지 미션 프로파일.",
    applications: [
      ["Sovereign Compute Vault", "정부·소버린 클라우드", "기밀 또는 국가 중요 워크로드를 위한 통제된 처리 구역을 구축합니다."],
      ["AI & HPC Shielded Zone", "AI 연구소·하이퍼스케일", "고가치 모델, 학습 데이터 및 가속 컴퓨팅 인프라를 보호합니다."],
      ["Colocation Shielded Vault", "코로케이션 사업자", "규제 산업 고객을 위한 측정 가능한 프리미엄 보안 등급을 제공합니다."],
      ["Mission Continuity Suite", "국방·금융·통신", "전자기 교란 위험에 노출된 중요 업무의 연속성 아키텍처를 지원합니다."],
    ],
    lifecycleEyebrow: "전 생애주기 보증",
    lifecycleTitle: "진단하고, 설계하고, 검증하고, 유지합니다.",
    steps: [
      ["01", "진단", "현장 조사와 주변 RF 평가를 통해 자산, 위협 및 인수 기준을 정의합니다."],
      ["02", "설계", "차폐, 출입, 냉각, 전원, 데이터 및 설비를 3D/CAD/BIM으로 통합합니다."],
      ["03", "검증", "현장 차폐효과 측정과 문서화된 인수시험을 수행합니다."],
      ["04", "유지", "예방정비, 누설 탐지, 시설 변경 및 주기적 재검증을 제공합니다."],
    ],
    insideEyebrow: "운영 환경을 고려한 엔지니어링",
    insideTitle: "데이터홀 운영을 방해하지 않는 고보증 보안.",
    insideBody:
      "CyberShield는 공기 흐름과 이중바닥부터 비상 동선 및 모니터링 RF 도어까지 현대적인 데이터홀에 필요한 시스템을 통합합니다.",
    renderNote: "3D 콘셉트 렌더링",
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

const performance = [
  ["10 kHz", "≥ 90 dB", "magnetic"],
  ["100 kHz", "≥ 100 dB", "magnetic"],
  ["1 MHz", "≥ 110 dB", "magnetic"],
  ["100 MHz", "≥ 120 dB", "plane"],
  ["400 MHz", "≥ 120 dB", "plane"],
  ["1 GHz", "≥ 110 dB", "plane"],
  ["18 GHz", "≥ 100 dB", "microwave"],
  ["40 GHz", "≥ 100 dB", "microwave"],
] as const;

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [inquiry, setInquiry] = useState<Inquiry>("consultation");
  const t = copy[lang];

  const goContact = (type: Inquiry) => {
    setInquiry(type);
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

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="CyberShield home">
          <span className="brand-mark">F</span>
          <span><b>FRANKONIA</b><small>CYBERSHIELD</small></span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#solution">{t.nav.solution}</a>
          <a href="#performance">{t.nav.performance}</a>
          <a href="#applications">{t.nav.applications}</a>
          <a href="#engineering">{t.nav.engineering}</a>
        </nav>
        <div className="header-actions">
          <button className="language" onClick={() => setLang(lang === "en" ? "ko" : "en")} aria-label="Change language">
            {lang === "en" ? "KO" : "EN"}
          </button>
          <button className="button button-small" onClick={() => goContact("quote")}>{t.quote}</button>
        </div>
      </header>

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
            <img src="/images/hero-cybershield.webp" alt={lang === "en" ? "Cutaway rendering of a CyberShield protected data hall" : "CyberShield로 보호되는 데이터홀의 단면 3D 렌더링"} />
            <p>{t.renderNote}</p>
          </div>
        </div>
        <div className="metrics">
          {t.metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
      </section>

      <div className="proof-strip">
        {t.proof.map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}
      </div>

      <section className="threat-section section-dark">
        <div className="section-heading">
          <p className="eyebrow">{t.threatEyebrow}</p>
          <h2>{t.threatTitle}</h2>
          <p>{t.threatBody}</p>
        </div>
        <div className="threat-grid">
          {t.threats.map(([title, body], index) => (
            <article key={title}>
              <span className="threat-number">0{index + 1}</span>
              <div className="signal-icon"><i /><i /><i /></div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="system-section" id="solution">
        <div className="system-image">
          <img src="/images/system-integration.webp" alt={lang === "en" ? "CyberShield modular room integrated into an existing facility" : "기존 시설에 통합된 CyberShield 모듈형 차폐실"} />
          <span className="image-label">{t.renderNote}</span>
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

      <section className="performance-section" id="performance">
        <div className="performance-intro">
          <p className="eyebrow">{t.performanceEyebrow}</p>
          <h2>{t.performanceTitle}</h2>
          <p>{t.performanceBody}</p>
          <a className="download-link" href="/CyberShield-Performance-2026.pdf" download>
            <span>PDF</span>{t.brochure}<b>↓</b>
          </a>
        </div>
        <div className="performance-card">
          <div className="table-head"><span>{t.frequency}</span><span>{t.attenuation}</span><span>{t.field}</span></div>
          {performance.map(([frequency, attenuation, field]) => (
            <div className="table-row" key={frequency}>
              <span>{frequency}</span><strong>{attenuation}</strong><span>{t.fields[field]}</span>
            </div>
          ))}
          <p className="performance-note">{t.standardNote}</p>
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

      <section className="lifecycle-section" id="engineering">
        <div className="lifecycle-visual">
          <img src="/images/layout-top.webp" alt={lang === "en" ? "Top view of the CyberShield data hall layout" : "CyberShield 데이터홀 레이아웃의 상부 3D 렌더링"} />
          <span>{t.renderNote}</span>
        </div>
        <div className="lifecycle-content">
          <p className="eyebrow">{t.lifecycleEyebrow}</p>
          <h2>{t.lifecycleTitle}</h2>
          <div className="step-list">
            {t.steps.map(([num, title, body]) => (
              <article key={num}><span>{num}</span><div><h3>{title}</h3><p>{body}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="inside-section">
        <div className="inside-copy">
          <p className="eyebrow">{t.insideEyebrow}</p>
          <h2>{t.insideTitle}</h2>
          <p>{t.insideBody}</p>
        </div>
        <div className="inside-images">
          <figure><img src="/images/interior-aisle.webp" alt={lang === "en" ? "Interior server aisle inside a CyberShield room" : "CyberShield 차폐실 내부 서버 통로"} /><figcaption>{t.renderNote}</figcaption></figure>
          <figure><img src="/images/access-door.webp" alt={lang === "en" ? "Monitored RF shielded access door" : "모니터링 기능이 적용된 RF 차폐 도어"} /><figcaption>{t.renderNote}</figcaption></figure>
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
        <div className="footer-brand"><span className="brand-mark">F</span><span><b>FRANKONIA</b><small>CYBERSHIELD</small></span></div>
        <p>{t.footer}</p>
        <div><a href="https://frankonia-solutions.com/privacy/" target="_blank" rel="noreferrer">Privacy</a><a href="https://frankonia-solutions.com/imprint/" target="_blank" rel="noreferrer">Imprint</a><span>© 2026 Frankonia Group</span></div>
      </footer>
    </main>
  );
}
