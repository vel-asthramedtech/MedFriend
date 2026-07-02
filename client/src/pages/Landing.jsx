import React, { useEffect, useRef } from "react";

const FEATURES = [
  {
    icon: "🔬",
    title: "AI Report Analysis",
    desc: "Upload any medical report — blood test, X-ray, ECG. AI extracts every value, flags abnormals, and explains in plain language.",
    tag: "Powered by Groq AI",
    color: "#e6f8f7",
    tagColor: "#028191",
  },
  {
    icon: "💬",
    title: "MedBot — Your AI Doctor",
    desc: "Ask anything about your health in Tamil or English. MedBot understands your reports and gives personalised answers 24/7.",
    tag: "Tamil + English",
    color: "#e9fcf7",
    tagColor: "#01C29A",
  },
  {
    icon: "💊",
    title: "Medicine Reminders",
    desc: "Set reminders for any medicine. Get email alerts at the right time. Track daily, alternate, or weekly schedules effortlessly.",
    tag: "Email alerts",
    color: "#fff8eb",
    tagColor: "#d97706",
  },
  {
    icon: "📸",
    title: "Scan & Understand",
    desc: "Point your camera at a medicine strip, insurance document, or hospital bill. Get instant AI explanation in seconds.",
    tag: "Any document",
    color: "#e6f8f7",
    tagColor: "#028191",
  },
  {
    icon: "☁️",
    title: "Secure Health Vault",
    desc: "All your reports stored securely in the cloud. Access anytime, share with your doctor, never lose a report again.",
    tag: "Encrypted storage",
    color: "#fff8eb",
    tagColor: "#d97706",
  },
];

const STEPS = [
  {
    icon: "📝",
    title: "Register Free",
    desc: "Create your account in 2 minutes. Get your unique MedFriend health ID instantly.",
  },
  {
    icon: "📤",
    title: "Upload Report",
    desc: "Upload any PDF or image of your medical report. Our OCR reads every detail.",
  },
  {
    icon: "🤖",
    title: "AI Analyses",
    desc: "AI extracts values, flags abnormals, identifies medicines and gives a full summary.",
  },
  {
    icon: "💬",
    title: "Ask Questions",
    desc: "Chat with MedBot about your results in Tamil or English. Get answers instantly.",
  },
];

const MARQUEE_ITEMS = [
  "AI Report Analysis",
  "Tamil & English",
  "Medicine Reminders",
  "OCR Technology",
  "Scan & Understand",
  "Health Score",
  "Secure Cloud",
  "MedBot AI",
];

export default function Landing({ onLogin, onRegister }) {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            entry.target.style.cssText += "opacity:1;transform:translateY(0)";
        });
      },
      { threshold: 0.1 },
    );
    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  const revealStyle = {
    opacity: 0,
    transform: "translateY(28px)",
    transition: "opacity 0.7s ease, transform 0.7s ease",
  };

  return (
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        background: "#f4fbfa",
        color: "#12343b",
        overflowX: "hidden",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=JetBrains+Mono:wght@500&display=swap');
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes float0 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes float1 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-14px); } }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(0.8); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .lp-nav-link { font-size:14px; color:#426268; text-decoration:none; font-weight:500; transition:color .2s; }
        .lp-nav-link:hover { color:#12343b; }
        .lp-feature-card { background:white; padding:32px; transition:background .2s, transform .2s; cursor:default; position:relative; overflow:hidden; }
        .lp-feature-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,#028191,#01C29A); transform:scaleX(0); transition:transform .3s; transform-origin:left; }
        .lp-feature-card:hover::before { transform:scaleX(1); }
        .lp-feature-card:hover { background:#f8fdfc; transform:translateY(-2px); }
        .lp-step:hover .lp-step-icon { background:#028191 !important; transform:scale(1.08); }
        .lp-tcard { background:white; border:1px solid #d9ece8; border-radius:16px; padding:28px; transition:all .3s; }
        .lp-tcard:hover { box-shadow:0 16px 48px rgba(2,129,145,.12); transform:translateY(-4px); }
        .lp-btn-primary { background:linear-gradient(135deg,#028191,#01C29A); color:white; border:2px solid transparent; padding:13px 28px; border-radius:10px; font-family:'Plus Jakarta Sans',sans-serif; font-size:15px; font-weight:600; cursor:pointer; transition:all .2s; display:inline-flex; align-items:center; gap:8px; }
        .lp-btn-primary:hover { background:linear-gradient(135deg,#016b79,#00ae89); transform:translateY(-2px); box-shadow:0 12px 32px rgba(2,129,145,.3); }
        .lp-btn-secondary { background:transparent; color:#12343b; border:2px solid #12343b; padding:13px 28px; border-radius:10px; font-family:'Plus Jakarta Sans',sans-serif; font-size:15px; font-weight:600; cursor:pointer; transition:all .2s; }
        .lp-btn-secondary:hover { background:#12343b; color:white; transform:translateY(-2px); }
        .lp-cta-input { flex:1; padding:13px 18px; border:1px solid rgba(255,255,255,.15); border-radius:10px; background:rgba(255,255,255,.08); color:white; font-family:'Plus Jakarta Sans',sans-serif; font-size:14px; outline:none; transition:border .2s; }
        .lp-cta-input::placeholder { color:rgba(255,255,255,.4); }
        .lp-cta-input:focus { border-color:rgba(255,255,255,.4); }
        .lp-cta-btn { padding:13px 24px; background:#028191; color:white; border:none; border-radius:10px; font-family:'Plus Jakarta Sans',sans-serif; font-size:14px; font-weight:700; cursor:pointer; transition:all .2s; white-space:nowrap; }
        .lp-cta-btn:hover { background:#016b79; }
      `}</style>

      {/* ── NAV ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "16px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(244,251,250,.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(2,129,145,.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: "#028191",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="20"
              height="20"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "-.5px",
            }}
          >
            Med
            <span style={{ color: "#028191" }}>Friend</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <a href="#lp-features" className="lp-nav-link">
            Features
          </a>
          <a href="#lp-how" className="lp-nav-link">
            How it works
          </a>
          <a href="#lp-testimonials" className="lp-nav-link">
            Stories
          </a>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onLogin}
            style={{
              padding: "8px 20px",
              border: "1.5px solid #12343b",
              borderRadius: 8,
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: 13.5,
              fontWeight: 600,
              color: "#12343b",
              background: "transparent",
              cursor: "pointer",
              transition: "all .2s",
            }}
          >
            Sign in
          </button>
          <button
            onClick={onRegister}
            style={{
              padding: "8px 20px",
              border: "1.5px solid #028191",
              borderRadius: 8,
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: 13.5,
              fontWeight: 600,
              color: "white",
              background: "linear-gradient(135deg,#028191,#01C29A)",
              cursor: "pointer",
              transition: "all .2s",
            }}
          >
            Get started free
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 48px 80px",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* bg elements */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(2,129,145,.08) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -150,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(1,194,154,.08) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle,rgba(2,129,145,.06) 1px,transparent 1px)",
            backgroundSize: "32px 32px",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 860 }}>
          {/* badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              background: "#e6f8f7",
              border: "1px solid #b9ebe5",
              borderRadius: 20,
              fontSize: 12.5,
              fontWeight: 600,
              color: "#028191",
              marginBottom: 28,
              animation: "fadeUp .8s ease forwards",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#028191",
                display: "inline-block",
                animation: "pulse 2s infinite",
              }}
            />
            India's first multilingual AI health companion
          </div>

          <div
            style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 600,
              fontSize: "clamp(48px,6.5vw,84px)",
              lineHeight: 1.05,
              letterSpacing: "-2px",
              animation: "fadeUp .8s .1s ease both",
            }}
          >
            Your health,
          </div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 600,
              fontSize: "clamp(48px,6.5vw,84px)",
              lineHeight: 1.05,
              letterSpacing: "-2px",
              fontStyle: "italic",
              color: "#028191",
              marginBottom: 24,
              animation: "fadeUp .8s .15s ease both",
            }}
          >
            finally understood.
          </div>

          <p
            style={{
              fontSize: 18,
              color: "#426268",
              lineHeight: 1.7,
              maxWidth: 540,
              margin: "0 auto 40px",
              animation: "fadeUp .8s .2s ease both",
            }}
          >
            Upload reports. Chat in{" "}
            <strong style={{ color: "#12343b" }}>Tamil or English</strong>. Get
            medicine reminders. All in one place — for every Indian.
          </p>

          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
              animation: "fadeUp .8s .3s ease both",
            }}
          >
            <button className="lp-btn-primary" onClick={onRegister}>
              Start for free
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </button>
            <button
              className="lp-btn-secondary"
              onClick={() =>
                document
                  .getElementById("lp-how")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              See how it works
            </button>
          </div>

          {/* trust stats */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
              justifyContent: "center",
              marginTop: 56,
              flexWrap: "wrap",
              animation: "fadeUp .8s .4s ease both",
            }}
          ></div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div
        style={{ padding: "22px 0", background: "#062b2f", overflow: "hidden" }}
      >
        <div
          style={{
            display: "flex",
            gap: 48,
            animation: "marquee 22s linear infinite",
            whiteSpace: "nowrap",
            width: "max-content",
          }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                fontSize: 14,
                fontWeight: 600,
                color: "rgba(255,255,255,.65)",
                flexShrink: 0,
              }}
            >
              {item} <span style={{ color: "rgba(255,255,255,.25)" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section
        id="lp-features"
        style={{ padding: "120px 48px", maxWidth: 1200, margin: "0 auto" }}
      >
        <div ref={addRef} style={revealStyle}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "#028191",
              marginBottom: 14,
            }}
          >
            Everything you need
          </div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 600,
              fontSize: "clamp(34px,3.8vw,52px)",
              lineHeight: 1.1,
              letterSpacing: "-1px",
              marginBottom: 16,
            }}
          >
            Healthcare in your pocket,{" "}
            <em style={{ color: "#028191" }}>your language.</em>
          </div>
          <p
            style={{
              fontSize: 17,
              color: "#426268",
              lineHeight: 1.7,
              maxWidth: 500,
            }}
          >
            Built for India's 500 million smartphone users who deserve to
            understand their own health.
          </p>
        </div>

        <div
          ref={addRef}
          style={{
            ...revealStyle,
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 2,
            marginTop: 64,
            background: "#d9ece8",
            border: "2px solid #d9ece8",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          {FEATURES.map((f) => (
            <div key={f.title} className="lp-feature-card">
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: f.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  marginBottom: 20,
                }}
              >
                {f.icon}
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>
                {f.title}
              </div>
              <div style={{ fontSize: 14, color: "#426268", lineHeight: 1.7 }}>
                {f.desc}
              </div>
              <span
                style={{
                  display: "inline-block",
                  marginTop: 14,
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "3px 10px",
                  borderRadius: 20,
                  background: f.color,
                  color: f.tagColor,
                }}
              >
                {f.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="lp-how"
        style={{
          padding: "120px 48px",
          background: "#062b2f",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle,rgba(255,255,255,.025) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div ref={addRef} style={revealStyle}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,.4)",
                marginBottom: 14,
              }}
            >
              Simple as 1, 2, 3, 4
            </div>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontWeight: 600,
                fontSize: "clamp(34px,3.8vw,52px)",
                color: "white",
                lineHeight: 1.1,
                letterSpacing: "-1px",
              }}
            >
              From report to{" "}
              <em style={{ color: "#4fd6c7" }}>understanding in minutes.</em>
            </div>
          </div>

          <div
            ref={addRef}
            style={{
              ...revealStyle,
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 0,
              marginTop: 72,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 40,
                left: "12%",
                right: "12%",
                height: 1,
                background:
                  "linear-gradient(90deg,transparent,rgba(255,255,255,.12),rgba(255,255,255,.12),rgba(255,255,255,.12),transparent)",
                pointerEvents: "none",
              }}
            />
            {STEPS.map((s) => (
              <div
                key={s.title}
                className="lp-step"
                style={{ textAlign: "center", padding: "0 20px" }}
              >
                <div
                  className="lp-step-icon"
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,.1)",
                    background: "rgba(255,255,255,.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                    fontSize: 28,
                    position: "relative",
                    zIndex: 1,
                    transition: "all .3s",
                  }}
                >
                  {s.icon}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "white",
                    marginBottom: 10,
                  }}
                >
                  {s.title}
                </div>
                <div
                  style={{
                    fontSize: 13.5,
                    color: "rgba(255,255,255,.5)",
                    lineHeight: 1.7,
                  }}
                >
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LANGUAGE SECTION ── */}
      <section style={{ padding: "120px 48px" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          <div ref={addRef} style={revealStyle}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "#028191",
                marginBottom: 14,
              }}
            >
              Multilingual AI
            </div>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontWeight: 600,
                fontSize: "clamp(34px,3.8vw,52px)",
                lineHeight: 1.1,
                letterSpacing: "-1px",
                marginBottom: 16,
              }}
            >
              Ask in <em style={{ color: "#028191" }}>Tamil.</em>
              <br />
              Understand in Tamil.
            </div>
            <p
              style={{
                fontSize: 16,
                color: "#426268",
                lineHeight: 1.7,
                marginBottom: 28,
              }}
            >
              Most health apps only speak English. MedBot speaks your language
              — because health information should never have a language barrier.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                ["हिंदी", "#e6f8f7", "#028191"],
                ["English", "#e9fcf7", "#01C29A"],
                ["தமிழ்", "#fff8eb", "#d97706"],
                ["বাংলা", "#fff2f8", "#db2777"],
                ["తెలుగు", "#f5f3ff", "#7c3aed"],
              ].map(([lang, bg, color]) => (
                <span
                  key={lang}
                  style={{
                    padding: "6px 14px",
                    background: bg,
                    color,
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div ref={addRef} style={revealStyle}>
            <div
              style={{
                background: "white",
                border: "1px solid #d9ece8",
                borderRadius: 20,
                padding: 24,
                boxShadow: "0 20px 60px rgba(2,129,145,.1)",
                marginBottom: 14,
                animation: "float0 4s ease-in-out infinite",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#e6f8f7",
                    color: "#028191",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  RK
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>
                    Rajesh Kumar
                  </div>
                  <div style={{ fontSize: 11, color: "#7a9398" }}>
                    Patient · Chennai
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 15, color: "#12343b", lineHeight: 1.6 }}>
                Enaku blood sugar 198 irukku — idhu serious ah?
              </div>
              <span
                style={{
                  display: "inline-block",
                  marginTop: 8,
                  fontSize: 10.5,
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: 10,
                  background: "#f4fbfa",
                  color: "#7a9398",
                  letterSpacing: ".04em",
                }}
              >
                Tanglish
              </span>
            </div>
            <div
              style={{
                background: "white",
                border: "1px solid #d9ece8",
                borderRadius: 20,
                padding: 24,
                boxShadow: "0 20px 60px rgba(2,129,145,.1)",
                marginLeft: 24,
                animation: "float1 4s ease-in-out infinite",
                animationDelay: ".5s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#028191",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  MB
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>MedBot</div>
                  <div style={{ fontSize: 11, color: "#7a9398" }}>
                    AI Health Assistant
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 14, color: "#12343b", lineHeight: 1.6 }}>
                Aama Rajesh, 198 mg/dL fasting sugar konjam adhigama irukku (normal: 70–100). Idhu pre-diabetes sign-a irukkalam. Ungal Metformin sariya irukku. Sweet konjam kammi pannunga, daily 30 nimisham walk pannunga. 🙏
              </div>
              <span
                style={{
                  display: "inline-block",
                  marginTop: 8,
                  fontSize: 10.5,
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: 10,
                  background: "#f4fbfa",
                  color: "#7a9398",
                  letterSpacing: ".04em",
                }}
              >
                Tamil + English
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          padding: "120px 48px",
          background: "#062b2f",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -200,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(2,129,145,.22) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -150,
            right: -150,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(1,194,154,.18) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          ref={addRef}
          style={{
            ...revealStyle,
            position: "relative",
            zIndex: 1,
            maxWidth: 680,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 600,
              fontSize: "clamp(38px,4.8vw,64px)",
              color: "white",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              marginBottom: 18,
            }}
          >
            Start understanding
            <br />
            your health <em style={{ color: "#4fd6c7" }}>today.</em>
          </div>
          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,.6)",
              lineHeight: 1.7,
              marginBottom: 40,
            }}
          >
            Free forever for basic features. No credit card needed. Start in 2
            minutes.
          </p>
          <div
            style={{
              display: "flex",
              gap: 10,
              maxWidth: 440,
              margin: "0 auto 16px",
            }}
          >
            <input
              className="lp-cta-input"
              type="email"
              placeholder="Enter your email address"
            />
            <button className="lp-cta-btn" onClick={onRegister}>
              Get started →
            </button>
          </div>
          <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.3)" }}>
            No spam. No credit card. Just your health, understood.
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: "#062b2f",
          borderTop: "1px solid rgba(255,255,255,.06)",
          padding: "36px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif",
            fontSize: 20,
            fontWeight: 600,
            color: "rgba(255,255,255,.6)",
          }}
        >
          Med
          <span style={{ color: "#4fd6c7" }}>Friend</span>
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,.3)" }}>
          © 2026 MedFriend. Made with ❤️ for India.
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,.3)",
                textDecoration: "none",
                transition: "color .2s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.color = "rgba(255,255,255,.7)")
              }
              onMouseLeave={(e) =>
                (e.target.style.color = "rgba(255,255,255,.3)")
              }
            >
              {link}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}