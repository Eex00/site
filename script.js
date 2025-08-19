const terminalText = document.getElementById("terminal-text");
const siteContent = document.getElementById("site-content");
const intro = document.getElementById("intro-terminal");

const lines = [
    "[INFO] ITS ONLY AN INTRO SCREEN",
    "[BOOT] System initialization...",
    "[OK] Hardware check...",
    "[INFO] Loading network modules...",
    "[OK] Secure connection to remote server...",
    "[INFO] Scanning running processes...",
    "[WARN] Unknown processes detected...",
    "[OK] Quarantine completed.",
    "[INFO] File synchronization...",
    "[OK] Permissions verified...",
    "[INFO] Launching monitoring services...",
    "[OK] All services active.",
    "[INFO] Accessing user interface...",
    "[OK] Launch completed."
];

let lineIndex = 0;
let charIndex = 0;

function getColorClass(text) {
    if (text.startsWith("[OK]")) return "ok";
    if (text.startsWith("[INFO]")) return "info";
    if (text.startsWith("[WARN]")) return "warn";
    return "boot";
}

function typeLine() {
    if (lineIndex < lines.length) {
        const line = lines[lineIndex];
        const colorClass = getColorClass(line);

        if (charIndex < line.length) {
            const currentChar = line.charAt(charIndex).replace(/ /g, '&nbsp;');

            if (charIndex <= line.indexOf("]")) {
                terminalText.innerHTML += `<span class="${colorClass}">${currentChar}</span>`;
            } else {
                terminalText.innerHTML += currentChar;
            }

            charIndex++;
            setTimeout(typeLine, 8);
        } else {
            terminalText.innerHTML += "<br>";
            charIndex = 0;
            lineIndex++;
            setTimeout(typeLine, 100);
        }
    } else {
        setTimeout(() => {
            intro.style.opacity = 0;
            setTimeout(() => {
                intro.style.display = "none";
                siteContent.style.display = "block";
                
                // Start YouTube music after intro
                initializeMusicAfterIntro();
            }, 500);
        }, 800);
    }
}

typeLine();

// --- Background console ---
const consoleMessages = [
    "[CMD] /info",
    "[INFO] guns.lol: https://guns.lol/4am",
    "[INFO] discord: https://discord.com/users/552935813978259477",
    "[INFO] github: https://github.com/Eex00"
];

let consoleIndex = 0;
let consoleCharIndex = 0;
let isConsoleRunning = false;

function startBackgroundConsole() {
    if (isConsoleRunning) return;
    isConsoleRunning = true;
    
    const consoleOutput = document.getElementById('console-output');
    
    function typeConsoleMessage() {
        if (consoleIndex < consoleMessages.length) {
            const message = consoleMessages[consoleIndex];
            const colorClass = message.startsWith('[INFO]') ? 'console-info' : 
                             message.startsWith('[OK]') ? 'console-ok' : 
                             message.startsWith('[WARN]') ? 'console-warn' : 
                             message.startsWith('[CMD]') ? 'console-cmd' : 'console-error';
            
            if (consoleCharIndex < message.length) {
                
                let currentLine = document.getElementById('console-current-line');
                if (!currentLine) {
                    currentLine = document.createElement('div');
                    currentLine.id = 'console-current-line';
                    consoleOutput.appendChild(currentLine);
                }
                
                const currentChar = message.charAt(consoleCharIndex);
                const coloredChar = `<span class="${colorClass}">${currentChar}</span>`;
                
                if (consoleCharIndex <= message.indexOf("]")) {
                    currentLine.innerHTML += coloredChar;
                } else {
                    currentLine.innerHTML += currentChar;
                }
                
                consoleCharIndex++;
                consoleOutput.scrollTop = consoleOutput.scrollHeight;
                
                setTimeout(typeConsoleMessage, 30);
            } else {
                consoleCharIndex = 0;
                consoleIndex++;
                
                const currentLine = document.getElementById('console-current-line');
                if (currentLine) {
                    currentLine.removeAttribute('id');
                }
                
                setTimeout(typeConsoleMessage, 500);
            }
        } else {
            const clearLine = document.createElement('div');
            clearLine.id = 'console-current-line';
            consoleOutput.appendChild(clearLine);
            
            const clearMessage = "[CMD] /clear";
            let clearCharIndex = 0;
            
            function typeClear() {
                if (clearCharIndex < clearMessage.length) {
                    const currentChar = clearMessage.charAt(clearCharIndex);
                    const coloredChar = `<span class="console-cmd">${currentChar}</span>`;
                    
                    if (clearCharIndex <= clearMessage.indexOf("]")) {
                        clearLine.innerHTML += coloredChar;
                    } else {
                        clearLine.innerHTML += currentChar;
                    }
                    
                    clearCharIndex++;
                    setTimeout(typeClear, 30);
                } else {
                    setTimeout(() => {
                        consoleOutput.innerHTML = '';
                        consoleIndex = 0;
                        consoleCharIndex = 0;
                        setTimeout(typeConsoleMessage, 1000);
                    }, 1000);
                }
            }
            
            typeClear();
        }
    }
    
    typeConsoleMessage();
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && 
            mutation.attributeName === 'style' && 
            siteContent.style.display === 'block') {
            setTimeout(startBackgroundConsole, 1000);
            observer.disconnect();
        }
    });
});

observer.observe(siteContent, { attributes: true, attributeFilter: ['style'] });
