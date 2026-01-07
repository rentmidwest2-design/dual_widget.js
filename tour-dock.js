(function () {
  "use strict";

  // ===== Prevent duplicates =====
  if (window.__MPM_TOUR_DOCK__) return;
  window.__MPM_TOUR_DOCK__ = true;

  // ===== Property map (9 sites) =====
  var CONFIG = {
    "ascotarms.prospectportal.com": {
      selfUrl: "https://prop.peek.us/659c209ccdaa2af31fe90c5e/self-guided-tour/",
      agentUrl:
        "https://www.myshowing.com/Midwest_Property_Management/Ascot_Arms_(Empire_Park)/scheduletourwidget/a0F0H00000d3i9sUAA",
    },
    "cambriancourt.prospectportal.com": {
      selfUrl: "https://prop.peek.us/66aaaa33f7d05462a7f4be8e/self-guided-tour/",
      agentUrl:
        "https://www.myshowing.com/Midwest_Property_Management/Cambrian_Court_(Cambrian_Heights)/scheduletourwidget/a0F0H00000d3i9vUAA/",
    },
    "cricketcourt.prospectportal.com": {
      selfUrl: "https://prop.peek.us/668c76b1edee275669b4508d/self-guided-tour/",
      agentUrl:
        "https://www.myshowing.com/Midwest_Property_Management/Cricket_Court_Townhomes_(Aldergrove)/scheduletourwidget/a0F0H00000d3iA1UAI/",
    },
    "elmwoodtownhomes.prospectportal.com": {
      selfUrl: "https://prop.peek.us/668c766ffa52e0189568d9a9/self-guided-tour/",
      agentUrl:
        "https://www.myshowing.com/Midwest_Property_Management/Elmwood_Townhomes_(Elmwood)/scheduletourwidget/a0F0H00000d3iA5UAI/",
    },
    "empirepark.prospectportal.com": {
      selfUrl: "https://prop.peek.us/659c20d06dc4272dc1c6fe18/self-guided-tour/",
      agentUrl:
        "https://www.myshowing.com/Midwest_Property_Management/Empire_Park_(Empire_Park)/scheduletourwidget/a0F0H00000d3iA6UAI/",
    },
    "pleasantviewtownhomes.prospectportal.com": {
      selfUrl: "https://prop.peek.us/668c75b7bbe11732e731384f/self-guided-tour/",
      agentUrl:
        "https://www.myshowing.com/Midwest_Property_Management/Pleasantview_Townhomes_(Empire_Park)/scheduletourwidget/a0F0H00000d3iAIUAY",
    },
    "rivervalleytownhomes.prospectportal.com": {
      selfUrl: "https://prop.peek.us/66350d825cb18b6935f276b2/self-guided-tour/",
      agentUrl:
        "https://www.myshowing.com/Midwest_Property_Management/Rivervalley_Townhomes_(Gold_Bar)/scheduletourwidget/a0F0H00000d3iAKUAY/",
    },
    "sirjohnfranklin.prospectportal.com": {
      selfUrl: "https://prop.peek.us/66350e28f4dbddfd2b19646a/self-guided-tour/",
      agentUrl:
        "https://www.myshowing.com/Midwest_Property_Management/Sir_John_Franklin_(Old_Strathcona)/scheduletourwidget/a0F0H00000d3iAMUAY",
    },
    "thevillageatsouthgate.prospectportal.com": {
      selfUrl: "https://prop.peek.us/66350d32f4dbddfd2b1863d7/self-guided-tour/",
      agentUrl:
        "https://www.myshowing.com/Midwest_Property_Management/The_Village_at_Southgate_(Southgate)/scheduletourwidget/a0F0H00000d3iAPUAY/",
    },
  };

  var host = String(window.location.hostname || "").replace(/^www\./, "");
  var cfg = CONFIG[host];
  if (!cfg) return;

  function onReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") fn();
    else document.addEventListener("DOMContentLoaded", fn, { once: true });
  }

  function injectStyles() {
    if (document.getElementById("mpm-tour-dock-styles")) return;
    var style = document.createElement("style");
    style.id = "mpm-tour-dock-styles";
    style.textContent = `
      :root{
        --mpm-btn: 48px;

        /* Your tuned defaults */
        --mpm-right: 85px;
        --mpm-bottom: 25px;

        /* If chat is detected, we move further left */
        --mpm-chat-gap: 12px;

        --mpm-blue: #093457;

        --mpm-pill-bg: rgba(255,255,255,.96);
        --mpm-pill-shadow: 0 16px 38px rgba(0,0,0,.14);

        --mpm-tip-bg: rgba(9,52,87,.96);
        --mpm-tip-text: #fff;
      }

      /* ✅ Key universal fix: wrapper never blocks chat clicks */
      #mpm-tour-dock{
        position: fixed;
        right: var(--mpm-right);
        bottom: var(--mpm-bottom);

        /* keep below most chat widgets */
        z-index: 9999;

        /* click-through by default */
        pointer-events: none;
      }

      .mpm-pill{
        background: var(--mpm-pill-bg);
        border-radius: 999px;
        padding: 10px;
        display: inline-flex;
        align-items: center;
        gap: 12px;
        box-shadow: var(--mpm-pill-shadow);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
      }

      /* ✅ Buttons are still clickable */
      .mpm-btn{
        pointer-events: auto;
        width: var(--mpm-btn);
        height: var(--mpm-btn);
        border-radius: 999px;
        background: var(--mpm-blue);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        position: relative;
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;
        user-select: none;
        box-shadow: 0 10px 22px rgba(0,0,0,.18);
        transform: translateZ(0);
      }

      .mpm-btn svg{ width: 60%; height: 60%; fill: #fff; display:block; }

      /* Pulse on calendar */
      .mpm-btn--agent{ animation: mpmPulse 1.9s ease-in-out infinite; }
      @keyframes mpmPulse{
        0%{ transform: scale(1); }
        50%{ transform: scale(1.07); }
        100%{ transform: scale(1); }
      }

      @media (hover:hover){
        .mpm-btn{ transition: transform .16s ease, filter .16s ease; }
        .mpm-btn:hover{ transform: translateY(-2px) scale(1.03); filter: brightness(1.06); }
      }

      /* Tooltip label */
      .mpm-btn::after{
        content: attr(data-label);
        position: absolute;
        right: calc(100% + 14px);
        top: 50%;
        transform: translateY(-50%) translateX(6px);
        opacity: 0;
        pointer-events: none;
        background: var(--mpm-tip-bg);
        color: var(--mpm-tip-text);
        font: 600 12px/1.1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        padding: 8px 10px;
        border-radius: 999px;
        white-space: nowrap;
        letter-spacing: .2px;
        box-shadow: 0 12px 28px rgba(0,0,0,.18);
        transition: opacity .14s ease, transform .14s ease;
      }
      .mpm-btn::before{
        content: "";
        position: absolute;
        right: calc(100% + 6px);
        top: 50%;
        transform: translateY(-50%);
        opacity: 0;
        pointer-events: none;
        width: 0; height: 0;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 8px solid var(--mpm-tip-bg);
        transition: opacity .14s ease;
      }

      @media (hover:hover){
        .mpm-btn:hover::after{ opacity:1; transform: translateY(-50%) translateX(0); }
        .mpm-btn:hover::before{ opacity:1; }
      }
      .mpm-show-tip::after{ opacity:1 !important; transform: translateY(-50%) translateX(0) !important; }
      .mpm-show-tip::before{ opacity:1 !important; }

      /* Lock swap */
      .mpm-lock{ position: relative; width:60%; height:60%; }
      .mpm-lock svg{
        position:absolute; inset:0; width:100%; height:100%;
        fill:#fff; transition: opacity .18s ease, transform .18s ease;
      }
      .mpm-lock--open{ opacity:0; transform: translateY(2px) scale(.96); }
      .mpm-lock--closed{ opacity:1; transform: translateY(0) scale(1); }
      @media (hover:hover){
        .mpm-btn--self:hover .mpm-lock--closed{ opacity:0; transform: translateY(-2px) scale(.96); }
        .mpm-btn--self:hover .mpm-lock--open{ opacity:1; transform: translateY(0) scale(1); }
      }

      @media (max-width: 768px){
        :root{ --mpm-bottom: 25px; }
      }

      @media (prefers-reduced-motion: reduce){
        .mpm-btn--agent{ animation: none !important; }
        .mpm-btn, .mpm-lock svg, .mpm-btn::after{ transition: none !important; }
      }
    `;
    document.head.appendChild(style);
  }

  // Try to detect a fixed chat widget near bottom-right and move left of it.
  // If detection fails, we still use your safe defaults (85/25).
  function computeRightOffset() {
    var candidates = document.querySelectorAll("iframe, [id*='chat'], [class*='chat'], [id*='widget'], [class*='widget']");
    var best = null;
    var bestScore = -Infinity;

    candidates.forEach(function (el) {
      try {
        var cs = getComputedStyle(el);
        var r = el.getBoundingClientRect();
        if (cs.position !== "fixed") return;
        if (r.width < 40 || r.height < 40) return;
        if (r.right < window.innerWidth - 260) return;
        if (r.bottom < window.innerHeight - 260) return;

        // Bigger and closer to corner wins
        var score = (r.width * r.height) - (window.innerWidth - r.right) * 10 - (window.innerHeight - r.bottom) * 10;
        if (score > bestScore) {
          bestScore = score;
          best = r;
        }
      } catch (e) {}
    });

    if (!best) return null;

    var gapFromRightEdge = Math.max(0, window.innerWidth - best.right);
    var extra = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--mpm-chat-gap")) || 12;
    return Math.round(gapFromRightEdge + best.width + extra);
  }

  function applyRightOffset() {
    var detected = computeRightOffset();
    // Use detected if it’s sensible; otherwise stick to your tuned default
    var right = (detected != null && detected >= 70 && detected <= 260) ? detected : 85;
    document.documentElement.style.setProperty("--mpm-right", right + "px");
  }

  function renderDock() {
    if (document.getElementById("mpm-tour-dock")) return;
    if (!document.body) return setTimeout(renderDock, 60);

    var wrap = document.createElement("div");
    wrap.id = "mpm-tour-dock";

    wrap.innerHTML = `
      <div class="mpm-pill" aria-label="Tour options">
        <a class="mpm-btn mpm-btn--agent"
          data-label="Agent-Guided Tour"
          href="${cfg.agentUrl}"
          target="_blank"
          rel="noopener"
          aria-label="Agent-Guided Tour"
          title="Agent-Guided Tour">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1Zm13 8H4v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9ZM5 6a1 1 0 0 0-1 1v1h16V7a1 1 0 0 0-1-1H5Z"/>
            <path d="M8 13h2v2H8v-2Zm3 0h2v2h-2v-2Zm3 0h2v2h-2v-2Z"/>
          </svg>
        </a>

        <a class="mpm-btn mpm-btn--self"
          data-label="Self-Guided Tour"
          href="${cfg.selfUrl}"
          target="_blank"
          rel="noopener"
          aria-label="Self-Guided Tour"
          title="Self-Guided Tour">
          <span class="mpm-lock" aria-hidden="true">
            <svg class="mpm-lock--closed" viewBox="0 0 24 24">
              <path d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2Zm-7-2a2 2 0 1 1 4 0v2h-4V7Zm3 9.73V18a1 1 0 0 1-2 0v-1.27a2 2 0 1 1 2 0Z"/>
            </svg>
            <svg class="mpm-lock--open" viewBox="0 0 24 24">
              <path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8V6a2 2 0 1 1 4 0h2a4 4 0 0 0-4-4z"/>
            </svg>
          </span>
        </a>
      </div>
    `;

    document.body.appendChild(wrap);

    // Touch: tap toggles tooltip
    var buttons = wrap.querySelectorAll(".mpm-btn");
    buttons.forEach(function (btn) {
      btn.addEventListener(
        "touchstart",
        function () {
          buttons.forEach(function (b) { if (b !== btn) b.classList.remove("mpm-show-tip"); });
          btn.classList.toggle("mpm-show-tip");
          window.clearTimeout(btn.__mpmTipT);
          btn.__mpmTipT = window.setTimeout(function () { btn.classList.remove("mpm-show-tip"); }, 1800);
        },
        { passive: true }
      );
    });
  }

  onReady(function () {
    injectStyles();
    renderDock();

    // Apply offset now + re-check after chat loads (widgets often load late)
    applyRightOffset();
    setTimeout(applyRightOffset, 800);
    setTimeout(applyRightOffset, 2000);
    setTimeout(applyRightOffset, 3500);

    window.addEventListener("resize", applyRightOffset);

    window.__MPM_TOUR_DOCK_VERSION__ = "tour-dock-universal-clickthrough-v1";
  });
})();
