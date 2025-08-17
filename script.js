const terminalText = document.getElementById("terminal-text");
const siteContent = document.getElementById("site-content");
const intro = document.getElementById("intro-terminal");

const lines = [
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
            const currentChar = line.charAt(charIndex)
                .replace(/ /g, '&nbsp;');

            // color only the brackets []
            if (charIndex <= line.indexOf("]")) {
                terminalText.innerHTML += `<span class="${colorClass}">${currentChar}</span>`;
            } else {
                terminalText.innerHTML += currentChar;
            }

            charIndex++;
            setTimeout(typeLine, 10); // typing speed
        } else {
            terminalText.innerHTML += "<br>";
            charIndex = 0;
            lineIndex++;
            setTimeout(typeLine, 600); // pause between lines
        }
    } else {
        setTimeout(() => {
            intro.style.opacity = 0;
            setTimeout(() => {
                intro.style.display = "none";
                siteContent.style.display = "block";
            }, 500);
        }, 800);
    }
}

typeLine();
