  // --- Property URLs (grouped by slug) ---
  const CONFIGS = {
    ascot: {
      test: h => h.includes("ascot"),
      g: "https://www.myshowing.com/Midwest_Property_Management/Ascot_Arms_(Empire_Park)/scheduletourwidget/a0F0H00000d3i9sUAA/",
      s: "https://prop.peek.us/659c209ccdaa2af31fe90c5e/self-guided-tour/"
    },
    empirepark: {
      test: h => h.includes("empirepark"),
      g: "https://www.myshowing.com/Midwest_Property_Management/Empire_Park_(Empire_Park)/scheduletourwidget/a0F0H00000d3iA6UAI/",
      s: "https://prop.peek.us/659c20d06dc4272dc1c6fe18/self-guided-tour/"
    },
    village: {
      test: h => h.includes("village") || h.includes("southgate"),
      g: "https://www.myshowing.com/Midwest_Property_Management/The_Village_at_Southgate_(Southgate)/scheduletourwidget/a0F0H00000d3iAPUAY/",
      s: "https://prop.peek.us/66350d32f4dbddfd2b1863d7/self-guided-tour/"
    },
    rivervalley: {
      // catch all the common variants (this is your fix)
      test: h => h.includes("rivervalley"),
      g: "https://www.myshowing.com/Midwest_Property_Management/Rivervalley_Townhomes_(Gold_Bar)/scheduletourwidget/a0F0H00000d3iAKUAY/",
      s: "https://prop.peek.us/66350d825cb18b6935f276b2/self-guided-tour/"
    },
    sirjohnfranklin: {
      test: h => h.includes("sirjohn") || h.includes("franklin"),
      g: "https://www.myshowing.com/Midwest_Property_Management/Sir_John_Franklin_(Old_Strathcona)/scheduletourwidget/a0F0H00000d3iAMUAY/",
      s: "https://prop.peek.us/66350e28f4dbddfd2b19646a/self-guided-tour/"
    },
    pleasantview: {
      test: h => h.includes("pleasantview"),
      g: "https://www.myshowing.com/Midwest_Property_Management/Pleasantview_Townhomes_(Empire_Park)/scheduletourwidget/a0F0H00000d3iAIUAY/",
      s: "https://prop.peek.us/668c75b7bbe11732e731384f/self-guided-tour/"
    },
    elmwood: {
      test: h => h.includes("elmwood"),
      g: "https://www.myshowing.com/Midwest_Property_Management/Elmwood_Townhomes_(Elmwood)/scheduletourwidget/a0F0H00000d3iA5UAI/",
      s: "https://prop.peek.us/668c766ffa52e0189568d9a9/self-guided-tour/"
    },
    cricketcourt: {
      test: h => h.includes("cricket"),
      g: "https://www.myshowing.com/Midwest_Property_Management/Cricket_Court_Townhomes_(Aldergrove)/scheduletourwidget/a0F0H00000d3iA1UAI/",
      s: "https://prop.peek.us/668c76b1edee275669b4508d/self-guided-tour/"
    },
    cambrian: {
      test: h => h.includes("cambrian"),
      g: "https://www.myshowing.com/Midwest_Property_Management/Cambrian_Court_(Cambrian_Heights)/scheduletourwidget/a0F0H00000d3i9vUAA/",
      s: "https://prop.peek.us/66aaaa33f7d05462a7f4be8e/self-guided-tour/"
    },
    test: {
      test: h => h.includes("secondstreetfundcommercial"),
      g: "https://www.myshowing.com/Midwest_Property_Management/The_Village_at_Southgate_(Southgate)/scheduletourwidget/a0F0H00000d3iAPUAY/",
      s: "https://prop.peek.us/66350d32f4dbddfd2b1863d7/self-guided-tour/"
    }
  };

  // --- Host detection + optional override ---
  const host = (location.hostname || "").toLowerCase().replace(/^www\./, "");
  // Optional HTML override: <div id="mwm-tour-widget" data-guided="..." data-self="..."></div>
  const hook = document.getElementById("mwm-tour-widget");
  let urls = null;

  if (hook && (hook.dataset.guided || hook.dataset.self)) {
    urls = { g: hook.dataset.guided || "", s: hook.dataset.self || "" };
    console.log("[MWM] Using data-override", urls);
  } else {
    // Find first config whose test(host) returns true
    for (const key of Object.keys(CONFIGS)) {
      if (CONFIGS[key].test(host)) { urls = { g: CONFIGS[key].g, s: CONFIGS[key].s }; 
        console.log("[MWM] Matched:", key, "for host:", host); break; }
    }
  }

  // Last resort fallback (test site)
  if (!urls) {
    urls = { g: CONFIGS.test.g, s: CONFIGS.test.s };
    console.warn("[MWM] No host match for", host, "— falling back to test config.");
  }

  // --- Click handlers ---
  guidedBtn.addEventListener("click", () => window.open(urls.g, "_blank", "noopener"));
  selfBtn.addEventListener("click", () => window.open(urls.s, "_blank", "noopener"));
