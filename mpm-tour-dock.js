(function () {
  "use strict";

  // ===== VERSION (change this each update) =====
  const VERSION = "mpm-tour-dock-v4.0.0";

  // ===== Property map (9 sites) =====
  const CONFIG = {
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

  // ===== Host match =====
  const host = String(window.location.hostname || "").replace(/^www\./, "");
  const cfg = CONFIG[host];
  if (!cfg) return;

  // ===== Single-run guard =====
  if (window.__MPM_TOUR_DOCK_V4__) return;
  window.__MPM_TOUR_DOCK_V4__ = true;

  function onReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") fn();
    else document.addEventListener("DOMContentLoaded", fn, { once: true });
  }

  function injectStyles() {
    if (document.getElementById("mpm-tour-dock-styles-v4")) return;

    const style = document.createElement("style");
    style.id = "mpm-tour-dock-styles-v4";
    style.textContent = `
      :root{
        --mpm-btn: 48px;
        --mpm-right: 24px;
        --mpm-bottom: 35px;
        --mpm-gap: 14px;
        --mpm-blue: #093457;

        --mpm-tip-bg: rgba(9,52,87,.96);
        --mpm-tip-text: #fff;
      }

      #mpm-tour-dock-v4{
        position: fixed;
        right: var(--mpm-right);
        bottom: var(--mpm-bottom);
        display: flex;
        gap: var(--mpm-gap);
        align-items: center;
        z-index: 999999;
      }

      .mpm-btn{
        width: var(--mpm-btn);
        height: var(--mpm-btn);
        border-radius: 999px;
        background: var(--mpm-blue);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        position: relative;
        box-shadow: 0 12px 28px rgba(0,0,0,.18);
        transform: translateZ(0);
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;
        user-select: none;
      }

      .mpm-btn svg{ width: 60%; height: 60%; fill: #fff; display:block; }

      /* Strong pulse (obvious) */
      .mpm-btn--agent{ animation: mpmPulseV4 1.9s ease-in-out infinite; }
      @keyframes mpmPulseV4{
        0%   { transform: scale(1);    box-shadow: 0 12px 28px rgba(0,0,0,.18); }
        50%  { transform: scale(1.06); box-shadow: 0 18px 38px rgba(0,0,0,.28); }
        100% { transform: scale(1);    box-shadow: 0 12px 28px rgba(0,0,0,.18); }
      }

      @media (hover:hover){
        .mpm-btn{ transition: transform .16s ease, filter .16s ease; }
        .mpm-btn:hover{ transform: translateY(-2px) scale(1.02); filter: brightness(1.06); }
      }

      /* Tooltip label */
      .mpm-btn::after{
        content: attr(data-label);
        position: absolute;
        right: calc(100% + 10px);
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
        right: calc(100% + 2px);
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
        .mpm-btn:hover::after{ opacity: 1; transform: translateY(-50%) translateX(0); }
        .mpm-btn:hover::before{ opacity: 1; }
      }

      /* Touch: show tooltip when toggled */
      .mpm-show-tip::after{ opacity:1 !important; transform: translateY(-50%) translateX(0) !important; }
      .mpm-show-tip::before{ opacity:1 !important; }

      /* Self button lock swap */
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
        :root{ --mpm-right: 18px; --mpm-bottom: 38px; --mpm-gap: 12px; }
      }

      @media (prefers-reduced-motion: reduce){
        .mpm-btn--agent{ animation: none !important; }
        .mpm-btn, .mpm-lock svg, .mpm-btn::after{ transition: none !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function renderDock() {
    if (document.getElementById("mpm-tour-dock-v4")) return;
    if (!document.body) return setTimeout(renderDock, 60);

    const dock = document.createElement("div");
    dock.id = "mpm-tour-dock-v4";
    dock.setAttribute("aria-label", "Tour options");

    dock.innerHTML = `
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
         aria-label="Self-
