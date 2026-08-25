/* ==========================================================================
   MATRIX RETRO CRT TERMINAL ENGINE - JORGE CONTRERAS
   ========================================================================== */

(function () {
  'use strict';

  const terminalScreen = document.getElementById('terminalScreen');
  const terminalOutput = document.getElementById('terminalOutput');
  const cliInput = document.getElementById('cliInput');

  const history = [];
  let historyIndex = -1;

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
      id: "kalshi-bot",
      name: "Kalshi Prediction Market Bot",
      cat: "INVESTMENTS",
      tech: "Python, Kalshi API, WebSockets, Gemini AI",
      desc: "Autonomous AI agent trading prediction market contracts on Kalshi, executing probabilistic orderbook positions.",
      github: "https://github.com/JorgeJoseContreras/kalshi-bot",
      demo: "https://kalshi-trading-bot-70rb.onrender.com"
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
      desc: "Self-healing autonomous developer agent capable of live code refactoring, automated testing, and Render deploys.",
      github: "https://github.com/JorgeJoseContreras/jorges-coder-bot",
      demo: "https://bot-log-streamer.onrender.com/"
    }
  ];

  const availableCommands = ['help', 'projects', 'about', 'skills', 'contact', 'invest', 'clear', 'whoami', 'ls', 'cls'];

  function appendLine(text, className = '') {
    const div = document.createElement('div');
    div.className = 'term-line ' + className;
    div.textContent = text;
    terminalOutput.appendChild(div);
    scrollToBottom();
    return div;
  }

  function appendHTML(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    terminalOutput.appendChild(div);
    scrollToBottom();
    return div;
  }

  function scrollToBottom() {
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
  }

  function renderProjectCard(p, idx) {
    let links = [];
    if (p.demo) {
      links.push(`<a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="term-link">[LIVE: ${p.demo.replace('https://', '').replace('/', '')}]</a>`);
    }
    if (p.github) {
      links.push(`<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="term-link">[GITHUB REPO]</a>`);
    }
    const linksHtml = links.join('   ');

    return `
      <div class="project-entry">
        <div class="project-title">[${String(idx + 1).padStart(2, '0')}] ${p.name.toUpperCase()} <span class="project-tag">// ${p.cat}</span></div>
        <div class="project-desc">${p.desc}</div>
        <div style="font-size:0.8rem;color:#008833;">STACK: ${p.tech}</div>
        <div class="project-links">${linksHtml}</div>
      </div>
    `;
  }

  // Rapid Matrix Stream on Initial Load
  const streamSteps = [
    () => appendLine("JORGE CONTRERAS // AUTONOMOUS SYSTEMS & QUANTITATIVE ENGINES", "accent"),
    () => appendLine("KERNEL: v4.2.0-RELEASE (x86_64) | STATUS: 100% OPERATIONAL", "white"),
    () => appendLine("--------------------------------------------------------------------------------", "dim"),
    () => appendLine("[INIT] QUANTUM AGENTIC EXECUTION LOOP ...................... [OK]", "dim"),
    () => appendLine("[FEED] ALPACA MARKETS WEBSOCKET STREAM ..................... [ACTIVE]", "dim"),
    () => appendLine("[FEED] KALSHI PREDICTION ORDERBOOK ......................... [STREAMING]", "dim"),
    () => appendLine("[HOST] HEADLESS LINUX NODES (LATENCY < 18ms) ............... [ONLINE]", "dim"),
    () => appendLine("--------------------------------------------------------------------------------", "dim"),
    () => appendLine("// ARCHITECTURAL PROFILE", "accent"),
    () => appendLine("Full-stack systems engineer architecting sub-second orderbook arbitrage, multi-modal AI developer agents, and zero-downtime microservices on global edge networks.", "white"),
    () => appendLine("--------------------------------------------------------------------------------", "dim"),
    () => appendLine("// PRODUCTION DEPLOYMENTS & LIVE SYSTEMS (10 ACTIVE)", "accent")
  ];

  // Add project steps
  projects.forEach((p, idx) => {
    streamSteps.push(() => appendHTML(renderProjectCard(p, idx)));
  });

  // Add contact & prompt steps
  streamSteps.push(
    () => appendLine("--------------------------------------------------------------------------------", "dim"),
    () => appendLine("// CONTACT & TRANSMISSION", "accent"),
    () => appendHTML(`Email:    <a href="mailto:jorge@jorgejosecontreras.com" class="term-link">jorge@jorgejosecontreras.com</a>`),
    () => appendHTML(`GitHub:   <a href="https://github.com/JorgeJoseContreras" target="_blank" rel="noopener noreferrer" class="term-link">https://github.com/JorgeJoseContreras</a>`),
    () => appendHTML(`LinkedIn: <a href="https://linkedin.com/in/jorge-contreras" target="_blank" rel="noopener noreferrer" class="term-link">https://linkedin.com/in/jorge-contreras</a>`),
    () => appendLine("--------------------------------------------------------------------------------", "dim"),
    () => appendLine("Type 'help' to inspect commands (projects, about, skills, contact, invest, clear).", "dim"),
    () => appendLine("", "dim")
  );

  let stepIdx = 0;
  function streamMatrixSequence() {
    if (stepIdx < streamSteps.length) {
      streamSteps[stepIdx]();
      stepIdx++;
      setTimeout(streamMatrixSequence, 15);
    } else {
      cliInput.focus();
    }
  }

  // Command Handlers
  const commands = {
    help: () => {
      appendLine("Available commands:", "accent");
      appendLine("  projects, ls   List all 10 production trading robots, AI agents, and software", "white");
      appendLine("  about, whoami  About Jorge Contreras", "white");
      appendLine("  skills         Technical infrastructure, models, and stack matrix", "white");
      appendLine("  contact        Direct transmission links (Email, GitHub, LinkedIn)", "white");
      appendLine("  invest         Open live trading dashboard (invest.jorgejosecontreras.com)", "white");
      appendLine("  clear, cls     Clear the terminal screen", "white");
    },

    whoami: () => commands.about(),

    about: () => {
      appendLine("Jorge Contreras - Systems Architect & Quantitative Engineer", "accent");
      appendLine("Specializing in high-frequency algorithmic orderbook execution, autonomous multi-modal AI agents, and zero-downtime edge microservices.", "white");
      appendLine("Philosophy: Zero hype, pure execution. Autonomous systems running 24/7/365.", "dim");
    },

    skills: () => {
      appendLine("// CORE TECHNICAL MATRIX", "accent");
      appendLine("  Languages:      Python 3.12, Rust, TypeScript, AsyncIO, FastAPI, Bash", "white");
      appendLine("  Trading APIs:   Alpaca Markets WSS, Kalshi Prediction API, Robinhood MCP, Polygon.io", "white");
      appendLine("  AI & Agents:    Google Gemini, Claude 3.5 Sonnet, MCP Protocol, Multi-Modal Vision", "white");
      appendLine("  Infrastructure: Docker Containers, Render Cloud, Headless Linux Mini-PCs, WebSockets", "white");
    },

    ls: () => commands.projects(),

    projects: () => {
      appendLine("// PRODUCTION DEPLOYMENTS & LIVE SYSTEMS (10 ACTIVE)", "accent");
      projects.forEach((p, idx) => {
        appendHTML(renderProjectCard(p, idx));
      });
    },

    invest: () => {
      appendLine("Opening https://invest.jorgejosecontreras.com ...", "cyan");
      window.open("https://invest.jorgejosecontreras.com", "_blank");
    },

    contact: () => {
      appendLine("// CONTACT & TRANSMISSION", "accent");
      appendHTML(`Email:    <a href="mailto:jorge@jorgejosecontreras.com" class="term-link">jorge@jorgejosecontreras.com</a>`);
      appendHTML(`GitHub:   <a href="https://github.com/JorgeJoseContreras" target="_blank" rel="noopener noreferrer" class="term-link">https://github.com/JorgeJoseContreras</a>`);
      appendHTML(`LinkedIn: <a href="https://linkedin.com/in/jorge-contreras" target="_blank" rel="noopener noreferrer" class="term-link">https://linkedin.com/in/jorge-contreras</a>`);
    },

    clear: () => {
      terminalOutput.innerHTML = '';
    },
    cls: () => commands.clear()
  };

  function execute(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    appendHTML(`<div class="term-line"><span class="prompt-user">jorge@terminal</span><span class="prompt-symbol">:~$</span> <span class="term-white">${trimmed}</span></div>`);

    history.push(trimmed);
    historyIndex = history.length;

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();

    if (commands[cmd]) {
      commands[cmd]();
    } else {
      appendLine(`command not found: ${cmd}. Type 'help' for available commands.`, 'alert');
    }

    scrollToBottom();
  }

  cliInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = cliInput.value;
      cliInput.value = '';
      execute(val);
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

  terminalScreen.addEventListener('click', (e) => {
    if (!window.getSelection().toString() && !e.target.closest('a')) {
      cliInput.focus();
    }
  });

  // Start fast matrix stream
  streamMatrixSequence();

})();