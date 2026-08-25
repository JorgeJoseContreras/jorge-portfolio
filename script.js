/* ==========================================================================
   MINIMAL FULLSCREEN TERMINAL ENGINE - JORGE CONTRERAS
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
      name: "Autonomous Trading Engine",
      tech: "Python 3.12, Alpaca WSS, AsyncIO",
      desc: "Sub-second orderbook arbitrage, market making, and automated trade execution bot.",
      github: "https://github.com/JorgeJoseContreras/stock-bot-v2",
      demo: "https://invest.jorgejosecontreras.com"
    },
    {
      name: "iMessage AI Assistant",
      tech: "Python, Gemini AI, Docker",
      desc: "Intelligent messaging co-pilot reacting to notifications in real-time.",
      github: "https://github.com/JorgeJoseContreras/imessage-auto-responder",
      demo: "https://jorgius.com"
    },
    {
      name: "Kalshi Prediction Market Bot",
      tech: "Python, Kalshi API, WebSockets",
      desc: "Autonomous AI agent executing probabilistic positions on prediction markets.",
      github: "https://github.com/JorgeJoseContreras/kalshi-bot",
      demo: "https://kalshi-trading-bot-70rb.onrender.com"
    },
    {
      name: "Telegram Developer Bot",
      tech: "Python, Telegram API, Render CI/CD",
      desc: "Remote health checks, system commands, and deployment notifications.",
      github: "https://github.com/JorgeJoseContreras/telegram-bot",
      demo: null
    },
    {
      name: "Robinhood MCP Server",
      tech: "TypeScript, Model Context Protocol",
      desc: "Provides Claude and Gemini direct tooling to monitor positions and stream market stats.",
      github: "https://github.com/JorgeJoseContreras/robinhood-mcp",
      demo: "https://robinhood-bot-v2.onrender.com"
    },
    {
      name: "Agentic Crypto Trading Bot",
      tech: "Python, Kraken API, Gemini AI",
      desc: "Autonomous cryptocurrency trading bot utilizing AI sentiment evaluation.",
      github: "https://github.com/JorgeJoseContreras/kraken-trading-bot",
      demo: "https://kraken-trading-bot-lafb.onrender.com"
    },
    {
      name: "Zengine Integration Pipeline",
      tech: "Python, REST API, OAuth2",
      desc: "High-throughput data extraction and bi-directional synchronization tool.",
      github: "https://github.com/JorgeJoseContreras/zengine-integration",
      demo: null
    },
    {
      name: "Disbursement Ledger Pipeline",
      tech: "Python, Pandas, Automation",
      desc: "Batch payment processor verifying check registers and ACH disbursements.",
      github: "https://github.com/JorgeJoseContreras/scholarship-disbursement",
      demo: null
    },
    {
      name: "Clean Sheet AI",
      tech: "TypeScript, Gemini API",
      desc: "Spreadsheet normalization tool utilizing LLMs to sanitize CSV records.",
      github: "https://github.com/JorgeJoseContreras/clean-sheet",
      demo: null
    },
    {
      name: "Admin Coding Bot",
      tech: "Python, Headless Mini-PC, Render API",
      desc: "Self-healing autonomous developer agent capable of live code refactoring and deployment.",
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
    div.className = 'term-line';
    div.innerHTML = html;
    terminalOutput.appendChild(div);
    scrollToBottom();
    return div;
  }

  function scrollToBottom() {
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
  }

  // Fast minimal boot sequence
  const bootLogs = [
    { text: "Jorge Contreras OS (x86_64) - Systems Engineer & Quantitative Architect", type: "accent" },
    { text: "Type 'help' to view available commands.", type: "dim" },
    { text: "", type: "normal" }
  ];

  let bootIndex = 0;
  function runBoot() {
    if (bootIndex < bootLogs.length) {
      appendLine(bootLogs[bootIndex].text, bootLogs[bootIndex].type);
      bootIndex++;
      setTimeout(runBoot, 30);
    } else {
      cliInput.focus();
    }
  }

  const commands = {
    help: () => {
      appendLine("Available commands:", "accent");
      appendLine("  projects, ls   List production trading bots, agents, and software", "white");
      appendLine("  about, whoami  About Jorge Contreras", "white");
      appendLine("  skills         Technical infrastructure and stack matrix", "white");
      appendLine("  contact        Direct contact links (Email, GitHub, LinkedIn)", "white");
      appendLine("  invest         Open live trading dashboard (invest.jorgejosecontreras.com)", "white");
      appendLine("  clear, cls     Clear the terminal screen", "white");
    },

    whoami: () => commands.about(),

    about: () => {
      appendLine("Jorge Contreras - Systems Architect & Quantitative Engineer", "accent");
      appendLine("Specializing in high-frequency algorithmic orderbook execution, autonomous multi-modal AI agents, and zero-downtime edge microservices.", "white");
    },

    skills: () => {
      appendLine("Technical Stack:", "accent");
      appendLine("  Languages:      Python 3.12, Rust, TypeScript, AsyncIO, FastAPI, Bash", "white");
      appendLine("  Trading APIs:   Alpaca Markets WSS, Kalshi Prediction API, Robinhood MCP, Polygon.io", "white");
      appendLine("  AI & Agents:    Google Gemini, Claude 3.5 Sonnet, MCP Protocol, Vision Loops", "white");
      appendLine("  Infrastructure: Docker Containers, Render Cloud, Headless Linux Mini-PCs", "white");
    },

    ls: () => commands.projects(),

    projects: () => {
      appendLine("Production Projects & Systems (10):", "accent");
      projects.forEach((p, idx) => {
        let links = [];
        if (p.demo) {
          links.push(`<a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="term-link">[Live: ${p.demo.replace('https://', '')}]</a>`);
        }
        if (p.github) {
          links.push(`<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="term-link">[GitHub]</a>`);
        }
        const linksStr = links.length > 0 ? '  ' + links.join('  ') : '';
        
        appendHTML(`
          <div style="margin: 6px 0;">
            <span style="color:#ffb000;font-weight:700;">${idx + 1}. ${p.name}</span> <span style="color:#008833;">[${p.tech}]</span><br>
            <span style="color:#ffffff;">   ${p.desc}</span><br>
            <span>   ${linksStr}</span>
          </div>
        `);
      });
    },

    invest: () => {
      appendLine("Opening https://invest.jorgejosecontreras.com ...", "cyan");
      window.open("https://invest.jorgejosecontreras.com", "_blank");
    },

    contact: () => {
      appendLine("Contact:", "accent");
      appendHTML(`  Email:    <a href="mailto:jorge@jorgejosecontreras.com" class="term-link">jorge@jorgejosecontreras.com</a>`);
      appendHTML(`  GitHub:   <a href="https://github.com/JorgeJoseContreras" target="_blank" rel="noopener noreferrer" class="term-link">https://github.com/JorgeJoseContreras</a>`);
      appendHTML(`  LinkedIn: <a href="https://linkedin.com/in/jorge-contreras" target="_blank" rel="noopener noreferrer" class="term-link">https://linkedin.com/in/jorge-contreras</a>`);
    },

    clear: () => {
      terminalOutput.innerHTML = '';
    },
    cls: () => commands.clear()
  };

  function execute(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    appendHTML(`<span class="prompt-user">jorge@terminal</span><span class="prompt-symbol">:~$</span> <span class="term-white">${trimmed}</span>`);

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

  runBoot();

})();