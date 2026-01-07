(function () {
  "use strict";

  // ===== Prevent duplicates =====
  if (window.__MPM_TOUR_DOCK__) return;
  window.__MPM_TOUR_DOCK__ = true;

  // ===== Property map =====
  var CONFIG = {
    "ascotarms.prospectportal.com": {
      selfUrl: "https://prop.peek.us/659c209ccdaa2af31fe90c5e/self-guided-tour/",
      agentUrl: "https://www.myshowing.com/Midwest_Property_Management/Ascot_Arms_(Empire_Park)/scheduletourwidget/a0F0H00000d3i9sUAA"
    },
    "cambriancourt.prospectportal.com": {
      selfUrl: "https://prop.peek.us/66aaaa33f7d05462a7f4be8e/self-guided-tour/",
      agentUrl: "https://www.myshowing.com/Midwest_Property_Management/Cambrian_Court_(Cambrian_Heights)/scheduletourwidget/a0F0H00000d3i9vUAA/"
    },
    "cricketcourt.prospectportal.com": {
      selfUrl: "https://prop.peek.us/668c76b1edee275669b4508d/self-guided-tour/",
      agentUrl: "https://www.myshowing.com/Midwest_Property_Management/Cricket_Court_Townhomes_(Aldergrove)/scheduletourwidget/a0F0H00000d3iA1UAI/"
    },
    "elmwoodtownhomes.prospectportal.com": {
      selfUrl: "https://prop.peek.us/668c766ffa52e0189568d9a9/self-guided-tour/",
      agentUrl: "https://www.myshowing.com/Midwest_Property_Management/Elmwood_Townhomes_(Elmwood)/scheduletourwidget/a0F0H00000d3iA5UAI/"
    },
    "empirepark.prospectportal.com": {
      selfUrl: "https://prop.peek.us/659c20d06dc4272dc1c6fe18/self-guided-tour/",
      agentUrl: "https://www.myshowing.com/Midwest_Property_Management/Empire_Park_(Empire_Park)/scheduletourwidget/a0F0H00000d3iA6UAI/"
    },
    "pleasantviewtownhomes.prospectportal.com": {
      selfUrl: "https://prop.peek.us/668c75b7bbe11732e731384f/self-guided-tour/",
      agentUrl: "https://www.myshowing.com/Midwest_Property_Management/Pleasantview_Townhomes_(Empire_Park)/scheduletourwidget/a0F0H00000d3iAIUAY"
    },
    "rivervalleytownhomes.prospectportal.com": {
      selfUrl: "https://prop.peek.us/66350d825cb18b6935f276b2/self-guided-tour/",
      agentUrl: "https://www.myshowing.com/Midwest_Property_Management/Rivervalley_Townhomes_(Gold_Bar)/scheduletourwidget/a0F0H00000d3iAKUAY/"
    },
    "sirjohnfranklin.prospectportal.com": {
      selfUrl: "https://prop.peek.us/66350e28f4dbddfd2b19646a/self-guided-tour/",
      agentUrl: "https://www.myshowing.com/Midwest_Property_Management/Sir_John_Franklin_(Old_Strathcona)/scheduletourwidget/a0F0H00000d3iAMUAY"
    },
    "thevillageatsouthgate.prospectportal.com": {
      selfUrl: "https://prop.peek.us/66350d32f4dbddfd2b1863d7/self-guided-tour/",
      agentUrl: "https://www.myshowing.com/Midwest_Property_Management/The_Village_at_Southgate_(Southgate)/scheduletourwidget/a0F0H00000d3iAPUAY/"
    }
  };

  var host = (window.location.hostname || "").replace(/^www\./, "");
  var cfg = CONFIG[host];
  if (!cfg) return;

  function onReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") fn();
    else document.addEventListener("DOMContentLoaded", fn, { once: true });
  }

  // ===== Styles =====
  function injectStyles() {
    if (document.getElementById("mpm-tour-dock-styles")) return;
    var style = document.createElement("style");
    style.id = "mpm-tour-dock-styles";
    style.textContent = `
      :root{
        --mpm-btn: 48px;
        --mpm-bottom: 25px;     /* GLOBAL bottom */
        --mpm-right: 85px;      /* GLOBAL right */
        --mpm-chat-gap: 10px;

        --mpm-blue: #093457;
        --mpm-pill-bg: rgba(255,255,255,.96);
        --mpm-pill-shadow: 0 16px 38px rgba(0,0,0,.14);
        --mpm-tip-bg: rgba(9,52,87,.96);
        --mpm-tip-text: #fff;
      }

      #mpm-tour-dock{
        position: fixed;
        right: var(--mpm-right);
        bottom: var(--mpm-bottom);
        z-index: 99990;
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
      }

      .mpm-btn{
        width: var(--mpm-btn);
        height: var(--mpm-btn);
        border-radius: 999px;
        background: var(--mpm-blue);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        text-decoration: none;
        cursor: pointer;
        box-shadow: 0 10px 22px rgba(0,0,0,.18);
      }

      .mpm-btn svg{ width: 60%; height: 60%; fill: #fff; }

      .mpm-btn--agent{ animation: mpmPulse 1.9s ease-in-out infinite; }
      @keyframes mpmPulse{ 0%{transform:scale(1)} 50%{transform:scale(1.07)} 100%{transform:scale(1)} }

      .mpm-btn::after{
        content: attr(data-label);
        position: absolute;
        right: calc(100% + 14px);
        top: 50%;
        transform: translateY(-50%);
        opacity: 0;
        pointer-events: none;
        background: var(--mpm-tip-bg);
        color: var(--mpm-tip-text);
        padding: 8px 10px;
        border-radius: 999px;
        font: 600 12px/1 system-ui;
        white-space: nowrap;
        box-shadow: 0 12px 28px rgba(0,0,0,.18);
        transition: opacity .14s ease;
      }

      .mpm-btn:hover::after{ opacity:1; }

      .mpm-lock{ position: relative; width:60%; height:60%; }
      .mpm-lock svg{
        position:absolute; inset:0; width:100%; height:100%;
        fill:#fff; transition: opacity .18s ease, transform .18s ease;
      }
      .mpm-lock--open{ opacity:0; transform: translateY(2px) scale(.96); }
      .mpm-lock--closed{ opacity:1; }
      .mpm-btn--self:hover .mpm-lock--closed{ opacity:0; transform: translateY(-2px) scale(.96); }
      .mpm-btn--self:hover .mpm-lock--open{ opacity:1; transform: translateY(0) scale(1); }
    `;
    document.head.appendChild(style);
  }

  // ===== Detect chat and move dock left if needed =====
  function computeRightOffset() {
    var candidates = document.querySelectorAll("iframe, [id*='chat'], [class*='chat'], [class*='widget']");
    var best = null;

    candidates.forEach(function (el) {
      try {
        var r = el.getBoundingClientRect();
        var cs = getComputedStyle(el);
        if (cs.position === "fixed" && r.width > 40 && r.height > 40 &&
            r.right > window.innerWidth - 200 && r.bottom > window.innerHeight - 200) {
          best = r;
        }
      } catch(e){}
    });

    if (!best) return null;

    return Math.round((window.innerWidth - best.right) + best.width + 10);
  }

  function applyRightOffset() {
    var detected = computeRightOffset();
    document.documentElement.style.setProperty("--mpm-right", (detected != null ? detected : 85) + "px");
  }

  function renderDock() {
    if (document.getElementById("mpm-tour-dock")) return;

    var dock = document.createElement("div");
    dock.id = "mpm-tour-dock";
    dock.innerHTML = `
      <div class="mpm-pill">
        <a class="mpm-btn mpm-btn--agent" data-label="Agent Tour" href="${cfg.agentUrl}" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24"><path d="M7 2h1v1h8V3h2v1h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3h1z"/><path d="M8 13h2v2H8zm3 0h2v2h-2zm3 0h2v2h-2z"/></svg>
        </a>
        <a class="mpm-btn mpm-btn--self" data-label="Self Tour" href="${cfg.selfUrl}" target="_blank" rel="noopener">
          <span class="mpm-lock">
            <svg class="mpm-lock--closed" viewBox="0 0 24 24"><path d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2Z"/></svg>
            <svg class="mpm-lock--open" viewBox="0 0 24 24"><path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8V6a2 2 0 1 1 4 0h2a4 4 0 0 0-4-4z"/></svg>
          </span>
        </a>
      </div>
    `;
    document.body.appendChild(dock);
  }

  onReady(function () {
    injectStyles();
    renderDock();
    applyRightOffset();
    setTimeout(applyRightOffset, 800);
    setTimeout(applyRightOffset, 2000);
    window.addEventListener("resize", applyRightOffset);
    window.__MPM_TOUR_DOCK_VERSION__ = "tour-dock-universal-v1";
  });
})();
