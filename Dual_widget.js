(function () {
  // ===== Property map (9 sites) =====
  const CONFIG = {
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

  const host = (window.location.hostname || "").replace(/^www\./, "");
  const cfg = CONFIG[host];
  if (!cfg) return;

  if (window.__MPM_TOURS_LOADED__) return;
  window.__MPM_TOURS_LOADED__ = true;

  function onReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") fn();
    else document.addEventListener("DOMContentLoaded", fn, { once: true });
  }

  function injectStyles() {
    if (document.getElementById("mpm-tour-styles")) return;
    const style = document.createElement("style");
    style.id = "mpm-tour-styles";
    style.textContent = `
      :root{
        --chat-size: 48px;
        --chat-right: 24px;
        --chat-bottom: 35px;
        --gap-chat: 20px;
        --gap-bubble: 14px;
        --brand-blue: #093457;
      }

      #mpm-tour-dock{
        position: fixed;
        right: calc(var(--chat-right) + var(--chat-size) + var(--gap-chat));
        bottom: var(--chat-bottom);
        display: flex;
        align-items: center;
        gap: var(--gap-bubble);
        z-index: 99997;
      }

      .mpm-tour-btn{
        width: var(--chat-size);
        height: var(--chat-size);
        border-radius: 50%;
        background: var(--brand-blue);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;
        position: relative;
      }

      .mpm-tour-btn svg{
        width: 60%;
        height: 60%;
        fill: #fff;
        display: block;
      }

      .mpm-lock-wrap{ position: relative; width:60%; height:60%; }
      .mpm-lock-wrap svg{
        position:absolute; inset:0; width:100%; height:100%;
        fill:#fff; transition: opacity .18s ease, transform .18s ease;
      }
      .mpm-lock-open{ opacity:0; transform: translateY(2px) scale(0.96); }
      .mpm-lock-closed{ opacity:1; transform: translateY(0) scale(1); }

      @media (hover:hover){
        .mpm-self:hover .mpm-lock-closed{ opacity:0; transform: translateY(-2px) scale(0.96); }
        .mpm-self:hover .mpm-lock-open{ opacity:1; transform: translateY(0) scale(1); }
      }

      @media (max-width: 768px){
        :root{
          --chat-right: 20px;
          --chat-bottom: 38px;
          --gap-chat: 18px;
          --gap-bubble: 12px;
        }
      }

      @media (prefers-reduced-motion: reduce){
        .mpm-lock-wrap svg{ transition:none !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function renderDock() {
    if (document.getElementById("mpm-tour-dock")) return;
    if (!document.body) return setTimeout(renderDock, 100);

    const dock = document.createElement("div");
    dock.id = "mpm-tour-dock";
    dock.innerHTML = `
      <a class="mpm-tour-btn mpm-agent" href="${cfg.agentUrl}" target="_blank" rel="noopener"
         aria-label="Agent-Guided Tour" title="Agent-Guided Tour">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1Zm13 8H4v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9ZM5 6a1 1 0 0 0-1 1v1h16V7a1 1 0 0 0-1-1H5Z"/>
          <path d="M8 13h2v2H8v-2Zm3 0h2v2h-2v-2Zm3 0h2v2h-2v-2Z"/>
        </svg>
      </a>

      <a class="mpm-tour-btn mpm-self" href="${cfg.selfUrl}" target="_blank" rel="noopener"
         aria-label="Self-Guided Tour" title="Self-Guided Tour">
        <span class="mpm-lock-wrap" aria-hidden="true">
          <svg class="mpm-lock-closed" viewBox="0 0 24 24">
            <path d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2Zm-7-2a2 2 0 1 1 4 0v2h-4V7Zm3 9.73V18a1 1 0 0 1-2 0v-1.27a2 2 0 1 1 2 0Z"/>
          </svg>
          <svg class="mpm-lock-open" viewBox="0 0 24 24">
            <path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8V6a2 2 0 1 1 4 0h2a4 4 0 0 0-4-4z"/>
          </svg>
        </span>
      </a>
    `;
    document.body.appendChild(dock);
  }

  onReady(function () {
    injectStyles();
    renderDock();
  });
})();
