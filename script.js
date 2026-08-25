/* ==========================================================================
   RETRO UNIX COMMAND TERMINAL ENGINE - JORGE CONTRERAS OS
   ========================================================================== */

(function () {
  'use strict';

  // DOM Elements
  const terminalScreen = document.getElementById('terminalScreen');
  const terminalOutput = document.getElementById('terminalOutput');
  const cliInput = document.getElementById('cliInput');
  const clockDisplay = document.getElementById('clockDisplay');
  const cmdChips = document.querySelectorAll('.cmd-chip');
  const contactModal = document.getElementById('contactModal');
  const closeContactBtn = document.getElementById('closeContactBtn');
  const contactForm = document.getElementById('contactForm');
  const contactStatus = document.getElementById('contactStatus');

  // Command History
  const history = [];
  let historyIndex = -1;

  // Project Database
  const projects = [
    {
      id: "stock-bot",
      name: "Autonomous Trading Engine",
      cat: "INVESTMENTS",
      tech: "Python 3.12, Alpaca WSS, AsyncIO, Pandas",
      desc: "Sub-second orderbook arbitrage, market making, and automated trade execution bot running 24/7 on cloud instances.",
      github: "https://github.com/JorgeJoseContreras/stock-bot-v2",
      demo: "https://invest.jorgejosecontreras.com"
    },
    {
      id: "imessage-ai",
      name: "iMessage AI Assistant",
      cat: "ASSISTANTS",
      tech: "Python, Gemini AI, AppleScript, Docker",
      desc: "Intelligent messaging co-pilot scanning, digesting, and reacting to incoming iMessage notifications in real-time.",
      github: "https://github.com/JorgeJoseContreras/imessage-auto-responder",
      demo: "https://jorgius.com"
    },
    {
      id: "telegram-bot",
      name: "Telegram Developer Bot",
      cat: "ASSISTANTS",
      tech: "Python, Telegram API, Render CI/CD",
      desc: "Interactive Telegram bot executing remote health checks, system commands, and deployment notifications.",
      github: "https://github.com/JorgeJoseContreras/telegram-bot",
      demo: null
    },
    {
      id: "kalshi-bot",
      name: "Kalshi Prediction Bot",
      cat: "INVESTMENTS",
      tech: "Python, Kalshi API, WebSockets, Gemini AI",
      desc: "Autonomous AI agent trading prediction market contracts on Kalshi, executing probabilistic orderbook positions.",
      github: "https://github.com/JorgeJoseContreras/kalshi-bot",
      demo: "https://kalshi-trading-bot-70rb.onrender.com"
    },
    {
      id: "robinhood-mcp",
      name: "Robinhood MCP Server",
      cat: "INVESTMENTS",
      tech: "TypeScript, MCP Protocol, Robinhood API",
      desc: "Model Context Protocol integration providing Claude and Gemini direct tooling to monitor positions and stream market stats.",
      github: "https://github.com/JorgeJoseContreras/robinhood-mcp",
      demo: "https://robinhood-bot-v2.onrender.com"
    },
    {
      id: "kraken-bot",
      name: "Agentic Crypto Trading Bot",
      cat: "INVESTMENTS",
      tech: "Python, Kraken API, Gemini AI",
      desc: "Autonomous cryptocurrency trading bot utilizing AI sentiment analysis and programmatic execution.",
      github: "https://github.com/JorgeJoseContreras/kraken-trading-bot",
      demo: "https://kraken-trading-bot-lafb.onrender.com"
    },
    {
      id: "zengine-sync",
      name: "Zengine Integration Pipeline",
      cat: "ENTERPRISE",
      tech: "Python, REST API, OAuth2, Webhooks",
      desc: "High-throughput data extraction and bi-directional synchronization tool connecting enterprise databases to Zengine.",
      github: "https://github.com/JorgeJoseContreras/zengine-integration",
      demo: null
    },
    {
      id: "disbursement-tracker",
      name: "Disbursement Ledger Pipeline",
      cat: "ENTERPRISE",
      tech: "Python, Pandas, Financial Auditing",
      desc: "Batch payment processor verifying check registers, ACH disbursements, and accounting reconciliations.",
      github: "https://github.com/JorgeJoseContreras/scholarship-disbursement",
      demo: null
    },
    {
      id: "clean-sheet",
      name: "Clean Sheet AI",
      cat: "ENTERPRISE",
      tech: "TypeScript, Gemini API, Excel Engine",
      desc: "Spreadsheet normalization platform utilizing LLMs to sanitize messy CSV records and fix missing values.",
      github: "https://github.com/JorgeJoseContreras/clean-sheet",
      demo: null
    },
    {
      id: "coder-bot",
      name: "Admin Coding Bot",
      cat: "ASSISTANTS",
      tech: "Python, Headless Mini-PC, Render API",
      desc: "Self-healing autonomous developer agent capable of editing source files, testing, and triggering Render edge deploys.",
      github: "https://github.com/JorgeJoseContreras/jorges-coder-bot",
      demo: "https://bot-log-streamer.onrender.com/"
    }
  ];

  // Available CLI commands for autocompletion
  const availableCommands = [
    'help', 'projects', 'about', 'skills', 'contact', 'theme', 'clear', 'invest', 'whoami', 'cls', 'cat', 'time', 'status'
  ];

  // ASCII Banner Art
  const asciiBanner = `
   ___  ____  ____   ____ _____   _____ _____ ____  __  __ 
  |_  |/ __ \|  _ \ / ___| ____| |_   _| ____|  _ \|  \/  |
    | | |  | | |_) | |  _|  _|     | | |  _| | |_) | |\/| |
/\__/ | |__| |  _ <| |_| | |___    | | | |___|  _ <| |  | |
\____/ \____/|_| \_\\____|_____|   |_| |_____|_| \_\_|  |_|
  `;

  // Boot lines to type out fast
  const bootLines = [
    { text: asciiBanner, type: 'ascii' },
    { text: "[SYSTEM BOOT] JORGE CONTRERAS UNIX KERNEL v4.2.0-release (x86_64)", type: 'info' },
    { text: "[INITIALIZING] QUANTUM AGENTIC EXECUTION LOOP .............. [OK]", type: 'dim' },
    { text: "[BROKERS] ALPACA MARKETS WEBSOCKET FEED .................... [CONNECTED]", type: 'dim' },
    { text: "[BROKERS] KALSHI PREDICTION ORDERBOOK ...................... [STREAMING]", type: 'dim' },
    { text: "[BROKERS] ROBINHOOD MCP PROTOCOL SERVER .................... [ONLINE]", type: 'dim' },
    { text: "[AGENTS] 10 AUTONOMOUS WORKFLOW DEPLOYMENTS ................ [ACTIVE]", type: 'dim' },
    { text: "[SECURITY] EDGE PROXY LATENCY < 18ms ....................... [VERIFIED]", type: 'dim' },
    { text: "----------------------------------------------------------------------", type: 'dim' },
    { text: "Welcome. Type 'help' or click shortcut buttons above to inspect systems.", type: 'accent' },
    { text: "", type: 'normal' }
  ];

  // Helper: Append line to terminal output
  function appendLine(content, className = '') {
    const div = document.createElement('div');
    div.className = 'term-line ' + className;
    if (typeof content === 'string') {
      div.textContent = content;
    } else {
      div.appendChild(content);
    }
    terminalOutput.appendChild(div);
    scrollToBottom();
    return div;
  }

  function appendHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString;
    terminalOutput.appendChild(div);
    scrollToBottom();
    return div;
  }

  function scrollToBottom() {
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
  }

  // Fast typewriter for initial boot
  let bootIndex = 0;
  function runBootSequence() {
    if (bootIndex < bootLines.length) {
      const line = bootLines[bootIndex];
      if (line.type === 'ascii') {
        const pre = document.createElement('pre');
        pre.className = 'term-ascii';
        pre.textContent = line.text;
        terminalOutput.appendChild(pre);
      } else {
        appendLine(line.text, line.type);
      }
      bootIndex++;
      setTimeout(runBootSequence, 20);
    } else {
      cliInput.focus();
    }
  }

  // Live Clock
  function updateClock() {
    const now = new Date();
    const estTime = now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: false });
    clockDisplay.textContent = estTime + ' EST';
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Command Implementations
  const commands = {
    help: () => {
      appendLine("AVAILABLE SYSTEM COMMANDS:", "accent");
      appendLine("  projects, ls         List all production robots, agents & enterprise tools", "white");
      appendLine("  cat <project_id>     Inspect architectural details of a specific project", "white");
      appendLine("  about, whoami        Display systems engineer profile & background", "white");
      appendLine("  skills, specs        Display technical matrix & infrastructure topology", "white");
      appendLine("  invest               Live dashboard link for Algorithmic Trading Hub", "white");
      appendLine("  contact              Initiate transmission / get direct contact details", "white");
      appendLine("  theme [g|amber|cyan] Toggle CRT phosphor color (green, amber, cyan)", "white");
      appendLine("  time                 Print current system time and uptime", "white");
      appendLine("  status               Print system telemetry health status", "white");
      appendLine("  clear, cls           Clear terminal screen", "white");
    },

    whoami: () => commands.about(),

    about: () => {
      appendLine("// JORGE CONTRERAS - SYSTEMS ARCHITECT & QUANTITATIVE ENGINEER", "accent");
      appendLine("----------------------------------------------------------------------", "dim");
      appendLine("Full-stack systems engineer focused on high-frequency algorithmic orderbook execution,", "white");
      appendLine("autonomous multi-modal developer agents, and zero-downtime microservices on global edge networks.", "white");
      appendLine("");
      appendLine("PHILOSOPHY: Zero hype, pure execution. Autonomous systems should self-heal,", "info");
      appendLine("trade with sub-second precision, and run silently on headless infrastructure 24/7/365.", "info");
      appendLine("----------------------------------------------------------------------", "dim");
    },

    skills: () => {
      appendLine("// CORE ENGINEERING MATRIX", "accent");
      appendLine("----------------------------------------------------------------------", "dim");
      appendLine("LANGUAGES & RUNTIMES: Python 3.12, Rust, TypeScript, AsyncIO, FastAPI, Bash", "white");
      appendLine("TRADING PROTOCOLS:   Alpaca Markets WSS, Kalshi Prediction API, Robinhood MCP, Polygon.io", "white");
      appendLine("AI & AGENT CORES:    Google Gemini API, Claude 3.5 Sonnet, MCP Protocol, Multi-Modal Vision", "white");
      appendLine("EDGE INFRASTRUCTURE: Docker Containers, Render Cloud, Headless Linux Mini-PCs, Telegram Bot API", "white");
      appendLine("----------------------------------------------------------------------", "dim");
    },

    ls: () => commands.projects(),

    projects: () => {
      appendLine("// PRODUCTION DEPLOYMENTS & REPOSITORIES (10 ACTIVE)", "accent");
      appendLine("----------------------------------------------------------------------", "dim");
      
      projects.forEach((p, idx) => {
        let linksHtml = '';
        if (p.github) {
          linksHtml += `<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="term-link">[GITHUB]</a> `;
        }
        if (p.demo) {
          linksHtml += `<a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="term-link">[LIVE DEMO]</a>`;
        }

        const cardHtml = `
          <div class="term-card">
            <div class="term-card-title">[${idx + 1}] ${p.name} <span style="font-size:0.75rem;color:var(--term-cyan)">// ${p.cat}</span></div>
            <div class="term-card-desc">${p.desc}</div>
            <div style="font-size:0.78rem;color:var(--term-muted)">STACK: ${p.tech}</div>
            <div class="term-links">${linksHtml}</div>
          </div>
        `;
        appendHTML(cardHtml);
      });
      appendLine("Type 'cat <id>' (e.g. 'cat stock-bot') to inspect full technical telemetry.", "dim");
    },

    cat: (args) => {
      if (!args || args.length === 0) {
        appendLine("Usage: cat <project_id> (e.g. 'cat stock-bot', 'cat kalshi-bot')", "alert");
        return;
      }
      const query = args[0].toLowerCase();
      const proj = projects.find(p => p.id.includes(query) || p.name.toLowerCase().includes(query));
      if (!proj) {
        appendLine(`cat: ${args[0]}: No such project file. Type 'projects' to list valid IDs.`, "alert");
        return;
      }
      appendLine(`// INSPECTING: ${proj.name.toUpperCase()}`, "accent");
      appendLine(`CATEGORY:    ${proj.cat}`, "white");
      appendLine(`STACK:       ${proj.tech}`, "white");
      appendLine(`DESCRIPTION: ${proj.desc}`, "white");
      if (proj.github) appendLine(`SOURCE:      ${proj.github}`, "info");
      if (proj.demo) appendLine(`LIVE PORTAL: ${proj.demo}`, "info");
    },

    invest: () => {
      appendLine("// ALGORITHMIC TRADING ENGINE DASHBOARD", "accent");
      appendLine("Live portal: https://invest.jorgejosecontreras.com", "info");
      window.open("https://invest.jorgejosecontreras.com", "_blank");
    },

    time: () => {
      const now = new Date();
      appendLine(`CURRENT SYSTEM TIME: ${now.toUTCString()} (EST: ${clockDisplay.textContent})`, "white");
      appendLine("SYSTEM UPTIME:       99.98% Across Render Edge Nodes", "white");
    },

    status: () => {
      appendLine("// SYSTEM TELEMETRY HEALTH STATUS", "accent");
      appendLine("KERNEL:       Linux x86_64 [STABLE]", "white");
      appendLine("CPU USAGE:    14.2% [NOMINAL]", "white");
      appendLine("MEMORY:       4.1 GB / 16.0 GB", "white");
      appendLine("EDGE NODES:   ACTIVE (Oregon, Frankfurt, Virginia)", "white");
    },

    theme: (args) => {
      const body = document.body;
      const current = body.getAttribute('data-theme') || 'green';
      let next = 'green';
      if (args && args.length > 0) {
        const choice = args[0].toLowerCase();
        if (choice === 'amber' || choice === 'a') next = 'amber';
        else if (choice === 'cyan' || choice === 'c' || choice === 'blue') next = 'cyan';
        else next = 'green';
      } else {
        if (current === 'green') next = 'amber';
        else if (current === 'amber') next = 'cyan';
        else next = 'green';
      }
      body.setAttribute('data-theme', next);
      appendLine(`[THEME SWITCHED] Active phosphor mode: ${next.toUpperCase()}`, "accent");
    },

    contact: () => {
      appendLine("// INITIATING CONTACT PROTOCOL", "accent");
      appendLine("Direct Email:    jorge@jorgejosecontreras.com", "white");
      appendLine("GitHub Profile:  https://github.com/JorgeJoseContreras", "info");
      appendLine("LinkedIn:        https://linkedin.com/in/jorge-contreras", "info");
      appendLine("Opening transmission modal...", "dim");
      contactModal.classList.add('active');
    },

    clear: () => {
      terminalOutput.innerHTML = '';
    },
    cls: () => commands.clear(),

    sudo: () => {
      appendLine("Permission denied: Jorge has locked root access to agentic trading loop.", "alert");
    }
  };

  // Process user input string
  function executeCommand(inputStr) {
    const raw = inputStr.trim();
    if (!raw) return;

    // Echo input line
    const echoLine = document.createElement('div');
    echoLine.className = 'term-line';
    echoLine.innerHTML = `<span class="prompt-user">guest@jorgecontreras</span><span class="prompt-separator">:</span><span class="prompt-path">~</span><span class="prompt-dollar">$</span> <span class="term-white">${raw}</span>`;
    terminalOutput.appendChild(echoLine);

    history.push(raw);
    historyIndex = history.length;

    const parts = raw.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (commands[cmd]) {
      commands[cmd](args);
    } else {
      appendLine(`sh: command not found: ${cmd}. Type 'help' to see available commands.`, 'alert');
    }

    scrollToBottom();
  }

  // Keyboard events on Input
  cliInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = cliInput.value;
      cliInput.value = '';
      executeCommand(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex > 0) {
        historyIndex--;
        cliInput.value = history[historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        cliInput.value = history[historyIndex] || '';
      } else {
        historyIndex = history.length;
        cliInput.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = cliInput.value.trim().toLowerCase();
      if (current) {
        const match = availableCommands.find(c => c.startsWith(current));
        if (match) {
          cliInput.value = match;
        }
      }
    }
  });

  // Quick Command buttons
  cmdChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
        cliInput.focus();
      }
    });
  });

  // Keep focus on input when clicking terminal
  terminalScreen.addEventListener('click', (e) => {
    if (!window.getSelection().toString() && !e.target.closest('a') && !e.target.closest('button')) {
      cliInput.focus();
    }
  });

  // Contact Modal Handlers
  closeContactBtn.addEventListener('click', () => {
    contactModal.classList.remove('active');
    cliInput.focus();
  });

  contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
      contactModal.classList.remove('active');
      cliInput.focus();
    }
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactStatus.textContent = 'TRANSMITTING VIA ENCRYPTED PACKET...';
    contactStatus.style.color = 'var(--term-cyan)';

    setTimeout(() => {
      contactStatus.textContent = 'TRANSMISSION RECEIVED [OK]. Thank you!';
      contactStatus.style.color = 'var(--term-green)';
      setTimeout(() => {
        contactModal.classList.remove('active');
        contactForm.reset();
        contactStatus.textContent = '';
        appendLine("[SYSTEM NOTICE] Message transmitted successfully to Jorge.", "accent");
        cliInput.focus();
      }, 1500);
    }, 800);
  });

  // Start fast boot sequence on load
  runBootSequence();

})();