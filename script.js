/* ==========================================================================
   FAST LETTER-BY-LETTER TYPEWRITER TERMINAL - JORGE CONTRERAS
   ========================================================================== */

(function () {
  'use strict';

  const terminalScreen = document.getElementById('terminalScreen');
  const terminalOutput = document.getElementById('terminalOutput');
  const promptLine = document.getElementById('promptLine');
  const cliInput = document.getElementById('cliInput');

  const history = [];
  let historyIndex = -1;

  // Single-line project definitions with clean links
  const projects = [
    {
      text: "01. Autonomous Trading Engine [Python/Alpaca WSS]",
      links: [
        { label: "[Live: invest.jorgejosecontreras.com]", url: "https://invest.jorgejosecontreras.com" },
        { label: "[GitHub]", url: "https://github.com/JorgeJoseContreras/stock-bot-v2" }
      ]
    },
    {
      text: "02. iMessage AI Assistant [Python/Gemini/Docker]",
      links: [
        { label: "[Live: jorgius.com]", url: "https://jorgius.com" },
        { label: "[GitHub]", url: "https://github.com/JorgeJoseContreras/imessage-auto-responder" }
      ]
    },
    {
      text: "03. Kalshi Prediction Market Bot [Python/WebSockets]",
      links: [
        { label: "[Live Demo]", url: "https://kalshi-trading-bot-70rb.onrender.com" },
        { label: "[GitHub]", url: "https://github.com/JorgeJoseContreras/kalshi-bot" }
      ]
    },
    {
      text: "04. Telegram Developer Bot [Python/Telegram API]",
      links: [
        { label: "[GitHub]", url: "https://github.com/JorgeJoseContreras/telegram-bot" }
      ]
    },
    {
      text: "05. Robinhood MCP Server [TypeScript/Claude MCP]",
      links: [
        { label: "[Live Demo]", url: "https://robinhood-bot-v2.onrender.com" },
        { label: "[GitHub]", url: "https://github.com/JorgeJoseContreras/robinhood-mcp" }
      ]
    },
    {
      text: "06. Agentic Crypto Trading Bot [Python/Kraken/Gemini]",
      links: [
        { label: "[Live Demo]", url: "https://kraken-trading-bot-lafb.onrender.com" },
        { label: "[GitHub]", url: "https://github.com/JorgeJoseContreras/kraken-trading-bot" }
      ]
    },
    {
      text: "07. Zengine Integration Pipeline [Python/REST/OAuth2]",
      links: [
        { label: "[GitHub]", url: "https://github.com/JorgeJoseContreras/zengine-integration" }
      ]
    },
    {
      text: "08. Disbursement Ledger Pipeline [Python/Pandas/ACH]",
      links: [
        { label: "[GitHub]", url: "https://github.com/JorgeJoseContreras/scholarship-disbursement" }
      ]
    },
    {
      text: "09. Clean Sheet AI [TypeScript/Gemini API/Excel]",
      links: [
        { label: "[GitHub]", url: "https://github.com/JorgeJoseContreras/clean-sheet" }
      ]
    },
    {
      text: "10. Admin Coding Bot [Python/Render Cloud/Mini-PC]",
      links: [
        { label: "[Live Streamer]", url: "https://bot-log-streamer.onrender.com/" },
        { label: "[GitHub]", url: "https://github.com/JorgeJoseContreras/jorges-coder-bot" }
      ]
    }
  ];

  // Helper: Fast Letter-By-Letter typewriter
  function typeLine(text, className = '', links = [], charSpeed = 6) {
    return new Promise((resolve) => {
      const lineDiv = document.createElement('div');
      lineDiv.className = 'term-line ' + className;
      terminalOutput.appendChild(lineDiv);

      let i = 0;
      function tick() {
        if (i < text.length) {
          lineDiv.textContent += text[i];
          i++;
          terminalScreen.scrollTop = terminalScreen.scrollHeight;
          setTimeout(tick, charSpeed);
        } else {
          // Append interactive links once text finishes typing
          if (links && links.length > 0) {
            links.forEach(l => {
              const a = document.createElement('a');
              a.href = l.url;
              a.target = '_blank';
              a.rel = 'noopener noreferrer';
              a.className = 'term-link';
              a.textContent = l.label;
              lineDiv.appendChild(document.createTextNode('  '));
              lineDiv.appendChild(a);
            });
          }
          terminalScreen.scrollTop = terminalScreen.scrollHeight;
          resolve();
        }
      }
      tick();
    });
  }

  function addSpacer() {
    const div = document.createElement('div');
    div.className = 'term-line spacer';
    terminalOutput.appendChild(div);
  }

  // Fast typewriter boot sequence
  async function runSequence() {
    await typeLine("Jorge Contreras — Systems Engineer & Quantitative Architect", "title", [], 6);
    await typeLine("High-frequency algorithmic execution, autonomous AI agents, and edge cloud architecture.", "dim", [], 4);
    addSpacer();

    await typeLine("// PRODUCTION SYSTEMS (10 ACTIVE):", "header", [], 5);
    
    for (const proj of projects) {
      await typeLine(proj.text, "", proj.links, 4);
    }

    addSpacer();
    await typeLine("// CONTACT:", "header", [], 5);
    await typeLine("Email:    jorge@jorgejosecontreras.com", "", [{ label: "[Send Email]", url: "mailto:jorge@jorgejosecontreras.com" }], 4);
    await typeLine("GitHub:   https://github.com/JorgeJoseContreras", "", [{ label: "[View GitHub]", url: "https://github.com/JorgeJoseContreras" }], 4);
    await typeLine("LinkedIn: https://linkedin.com/in/jorge-contreras", "", [{ label: "[View LinkedIn]", url: "https://linkedin.com/in/jorge-contreras" }], 4);

    addSpacer();
    await typeLine("Type 'help' for commands (projects, about, skills, contact, invest, clear).", "dim", [], 4);

    // Show interactive command line prompt
    promptLine.style.display = 'flex';
    cliInput.focus();
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
  }

  // Interactive Commands
  const commands = {
    help: () => {
      typeLine("Available commands: projects, about, skills, contact, invest, clear", "header", [], 4);
    },
    about: () => {
      typeLine("Jorge Contreras: Systems Architect & Quantitative Engineer. Zero hype, pure execution.", "", [], 4);
    },
    skills: () => {
      typeLine("Stack: Python 3.12, Rust, TypeScript, AsyncIO, Alpaca WSS, Kalshi, Gemini AI, Docker, Render", "", [], 4);
    },
    projects: async () => {
      typeLine("// PRODUCTION SYSTEMS:", "header", [], 4);
      for (const proj of projects) {
        await typeLine(proj.text, "", proj.links, 3);
      }
    },
    ls: () => commands.projects(),
    invest: () => {
      typeLine("Opening https://invest.jorgejosecontreras.com ...", "dim", [], 4);
      window.open("https://invest.jorgejosecontreras.com", "_blank");
    },
    contact: () => {
      typeLine("Email: jorge@jorgejosecontreras.com | GitHub: JorgeJoseContreras | LinkedIn: jorge-contreras", "", [], 4);
    },
    clear: () => {
      terminalOutput.innerHTML = '';
    },
    cls: () => commands.clear()
  };

  function execute(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const div = document.createElement('div');
    div.className = 'term-line';
    div.innerHTML = `<span class="prompt-user">jorge@terminal</span><span class="prompt-symbol">:~$</span> <span style="color:#fff">${trimmed}</span>`;
    terminalOutput.appendChild(div);

    history.push(trimmed);
    historyIndex = history.length;

    const cmd = trimmed.split(/\s+/)[0].toLowerCase();
    if (commands[cmd]) {
      commands[cmd]();
    } else {
      typeLine(`command not found: ${cmd}. Type 'help' for available commands.`, "dim", [], 4);
    }
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
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
      const avail = ['help', 'projects', 'about', 'skills', 'contact', 'invest', 'clear', 'ls'];
      const match = avail.find(c => c.startsWith(current));
      if (match) cliInput.value = match;
    }
  });

  terminalScreen.addEventListener('click', (e) => {
    if (!window.getSelection().toString() && !e.target.closest('a')) {
      cliInput.focus();
    }
  });

  // Run fast typewriter sequence
  runSequence();

})();