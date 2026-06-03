chrome.storage.local.get(
    ["enabled"],
    (data) => {

        if (data.enabled === false)
            return;

        startPlugin();

    }
);

function startPlugin() {
    (function () {
        'use strict';

        let API_URL = localStorage.getItem("OPENRP_API_URL") || "";

        let rightPanel, leftPanel;
        let leftwidth = 320;
        let rightWidth = 360;
        let rightCollapsed = false;
        let leftCollapsed = false;
        let messageBuffer = [];

        let leftBtn;
        let rightBtn;

        let imageContainer, sendButton;
        const sceneInputs = {};

        // =========================
        // CHAT EXTRACTION
        // =========================
        function normalizeText(str) {
            return str
                .replace(/\s+/g, " ")
                .replace(/\u00A0/g, " ")
                .trim()
                .toLowerCase();
        }

        function makeSignature(msg) {
            return normalizeText(
                msg.role + "::" + msg.content
            );
        }

        // =========================
        // LIGHTBOX
        // =========================

        function createLightbox(base64) {
            const overlay = document.createElement("div");

            Object.assign(overlay.style, {
                position: "fixed",
                top: "0",
                left: "0",
                width: "100vw",
                height: "100vh",
                background: "rgba(0,0,0,0.85)",
                zIndex: "1000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
            });

            const img = document.createElement("img");
            img.src = `data:image/png;base64,${base64}`;

            Object.assign(img.style, {
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "10px"
            });

            overlay.appendChild(img);
            overlay.onclick = () => overlay.remove();
            document.body.appendChild(overlay);
        }

        // =========================
        // SCENE SYNC (FIX)
        // =========================

        function applyScene(scene) {
            if (!scene) return;

            const fields = ["subject", "location", "action", "mood", "time"];

            fields.forEach(f => {
                if (sceneInputs[f]) {
                    sceneInputs[f].value = scene[f] || "";
                }
            });

            if (sceneInputs.outfit) {
                if (Array.isArray(scene.outfit)) {
                    sceneInputs.outfit.value = scene.outfit.join(", ");
                } else {
                    sceneInputs.outfit.value = scene.outfit || "";
                }
            }

            if (sceneInputs.objects) {
                if (Array.isArray(scene.objects)) {
                    sceneInputs.objects.value = scene.objects.join(", ");
                } else {
                    sceneInputs.objects.value = scene.objects || "";
                }
            }
        }

        // =========================
        // RIGHT PANEL
        // =========================
        function getCurrentScene() {

            return {
                subject: sceneInputs.subject?.value || "",
                location: sceneInputs.location?.value || "",
                action: sceneInputs.action?.value || "",
                mood: sceneInputs.mood?.value || "",
                time: sceneInputs.time?.value || "",
                outfit: sceneInputs.outfit?.value || "",
                objects: sceneInputs.objects?.value || ""
            };
        }

        function createRightPanel() {
            rightPanel = document.createElement("div");

            Object.assign(rightPanel.style, {
                position: "fixed",
                right: "0",
                top: "0",
                width: rightWidth + "px",
                height: "100vh",
                zIndex: "999999",
                background: "#0f0f0f",
                borderLeft: "1px solid #333",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
            });

            const header = document.createElement("div");
            Object.assign(header.style, {
                display: "flex",
                alignItems: "center",
                padding: "10px",
                color: "white",
                fontFamily: "sans-serif",
                borderBottom: "1px solid #333"
            });


            const title = document.createElement("div");
            title.innerText = "Images";
            title.style.flex = "1";

            header.appendChild(title);

            imageContainer = document.createElement("div");
            Object.assign(imageContainer.style, {
                flex: "1",
                overflowY: "auto",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            });

            sendButton = document.createElement("button");
            Object.assign(sendButton.style, {
                margin: "10px",
                padding: "10px",
                background: "#222",
                color: "white",
                border: "1px solid white",
                cursor: "pointer"
            });

            sendButton.innerText = "Send Chat";

            sendButton.onclick = async () => {
                if (!API_URL) {
                    alert("Set a valid URL");
                    return;
                }
                const chat = messageBuffer.slice();
                sendButton.innerText = "Sending...";

                try {
                    const res = await fetch(API_URL + "/generate", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ chat, scene : getCurrentScene() })
                    });

                    const data = await res.json();

                    // 🔥 APPLY SCENE UPDATE FROM BACKEND
                    if (data.scene) {
                        applyScene(data.scene);
                    }

                    if (data.image) {
                        const wrapper = document.createElement("div");
                        wrapper.style.position = "relative";

                        const img = document.createElement("img");
                        img.src = `data:image/png;base64,${data.image}`;
                        img.style.width = "100%";
                        img.style.cursor = "pointer";

                        img.onclick = () => createLightbox(data.image);

                        const del = document.createElement("button");
                        del.innerText = "✕";

                        Object.assign(del.style, {
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            background: "rgba(0,0,0,0.6)",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            padding: "2px 6px",
                            fontSize: "12px",

                            opacity: "0",
                            transition: "0.15s ease"
                        });

                        del.onclick = (e) => {
                            e.stopPropagation();
                            wrapper.remove();
                        };

                        wrapper.appendChild(img);
                        wrapper.appendChild(del);
                        imageContainer.prepend(wrapper);

                        // 🔥 hover logic
                        wrapper.addEventListener("mouseenter", () => {
                            del.style.opacity = "1";
                        });

                        wrapper.addEventListener("mouseleave", () => {
                            del.style.opacity = "0";
                        });
                    }

                } catch (err) {
                    console.error(err);
                }

                sendButton.innerText = "Send Chat";
            };

            rightPanel.appendChild(header);
            rightPanel.appendChild(imageContainer);
            rightPanel.appendChild(sendButton);
            const resizer = document.createElement("div");

            Object.assign(resizer.style, {
                position: "absolute",
                top: "0",
                left: "0",
                width: "6px",
                height: "100%",
                cursor: "ew-resize",
                background: "transparent"
            });

            let resizingRight = false;
            let startX = 0;
            let startWidth = 0;

            resizer.addEventListener("mousedown", (e) => {
                resizingRight = true;
                startX = e.clientX;
                startWidth = rightWidth;
                e.preventDefault();
            });

            document.addEventListener("mousemove", (e) => {
                if (!resizingRight || rightCollapsed) return;

                const delta = startX - e.clientX;
                rightWidth = Math.max(220, Math.min(700, startWidth + delta));

                rightPanel.style.width = rightWidth + "px";
                rightBtn.style.right = rightWidth + "px";
            });

            document.addEventListener("mouseup", () => {
                resizingRight = false;
            });
            rightPanel.appendChild(resizer);
            document.body.appendChild(rightPanel);
        }

        // =========================
        // LEFT PANEL (UPDATED)
        // =========================

        function createLeftPanel() {
            leftPanel = document.createElement("div");

            Object.assign(leftPanel.style, {
                position: "fixed",
                left: "0",
                top: "0",
                width: leftwidth + "px",
                height: "100vh",
                zIndex: "999999",
                background: "#0f0f0f",
                borderRight: "1px solid #333",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                color: "white",
                fontFamily: "sans-serif"
            });

            const header = document.createElement("div");
            Object.assign(header.style, {
                display: "flex",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #333"
            });


            const title = document.createElement("div");
            title.innerText = "Scene Editor";
            title.style.flex = "1";

            
            const apiInput = document.createElement("input");
            apiInput.placeholder = "Backend URL (ngrok)";
            apiInput.value = localStorage.getItem("OPENRP_API_URL") || API_URL;
            apiInput.type = "password";

            Object.assign(apiInput.style, {
                width: "100%",
                marginBottom: "10px",
                padding: "6px",
                background: "#111",
                color: "white",
                border: "1px solid #444"
            });

            
            apiInput.addEventListener("change", () => {
                API_URL = apiInput.value.trim();
                localStorage.setItem("OPENRP_API_URL", API_URL);
            });
            
            const testBtn = document.createElement("button");
            testBtn.innerText = "Test Server";

            Object.assign(testBtn.style, {
                width: "100%",
                marginBottom: "10px",
                padding: "6px",
                background: "#222",
                color: "white",
                border: "1px solid #444",
                cursor: "pointer"
            });

            testBtn.onclick = async () => {
                if (!API_URL) {
                    alert("Set a valid URL");
                    return;
                }
                testBtn.innerText = "Testing...";

                try {
                    const res = await fetch(API_URL + "/character/select", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            character: "Kasumi",
                            style: "DEFAULT",
                            chat: []
                        })
                    });

                    if (res.ok) {
                        alert("✅ Server is reachable");
                    } else {
                        alert("⚠️ Server responded but not OK: " + res.status);
                    }

                } catch (e) {
                    alert("❌ Server unreachable");
                }

                testBtn.innerText = "Test Server";
            };

            

            const content = document.createElement("div");
            Object.assign(content.style, {
                flex: "1",
                overflowY: "auto",
                padding: "10px"
            });

            // =========================
            // CHARACTER SELECTOR (NEW)
            // =========================

            const characterSelect = document.createElement("select");
            characterSelect.style.width = "100%";
            characterSelect.style.marginBottom = "10px";
            characterSelect.style.padding = "5px";
            characterSelect.style.background = "#222";
            characterSelect.style.color = "white";
            characterSelect.style.border = "1px solid #444";

            const characters = ["Kasumi", "Natsu", "Kei"];

            characterSelect.innerHTML = "";

            characters.forEach(name => {
                const opt = document.createElement("option");
                opt.value = name;
                opt.innerText = name;
                characterSelect.appendChild(opt);
            });

            const styles = [
                "DEFAULT",
                "CLEAR",
                "PASTEL",
                "CHIBI",
                "BISHOUJO",
                "FLAT COLOR",
                "RL"
            ];

            const styleSelect = document.createElement("select");

            styleSelect.style.width = "100%";
            styleSelect.style.marginBottom = "10px";
            styleSelect.style.padding = "5px";
            styleSelect.style.background = "#222";
            styleSelect.style.color = "white";
            styleSelect.style.border = "1px solid #444";

            styles.forEach(name => {
                const opt = document.createElement("option");
                opt.value = name;
                opt.innerText = name;
                styleSelect.appendChild(opt);
            });
            header.appendChild(title);
            content.appendChild(apiInput);
            content.appendChild(testBtn);

            content.appendChild(characterSelect);
            content.appendChild(styleSelect);

            function clearHistory() {
                messageBuffer = [];
                imageContainer.innerHTML = "";
            }

            const changeCharacterButton = document.createElement("button");

            changeCharacterButton.innerText = "Change Character";

            Object.assign(changeCharacterButton.style, {
                width: "100%",
                marginBottom: "15px",
                padding: "8px",
                background: "#222",
                color: "white",
                border: "1px solid #444",
                cursor: "pointer"
            });

            changeCharacterButton.onclick = async () => {
                if (!API_URL) {
                    alert("Set a valid URL");
                    return;
                }

                changeCharacterButton.innerText = "Loading...";

                try {

                    const res = await fetch(
                        API_URL + "/character/select",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                character: characterSelect.value,
                                style: styleSelect.value,
                                chat: messageBuffer.slice()
                            })
                        }
                    );

                    const data = await res.json();

                    if (data.scene) {
                        applyScene(data.scene);
                    }

                    clearHistory();

                } catch (err) {
                    console.error(err);
                }

                changeCharacterButton.innerText = "Change Character";
            };

            content.appendChild(changeCharacterButton);

            const fields = ["subject", "location", "action", "mood", "time", "outfit", "objects"];

            fields.forEach(f => {
                const label = document.createElement("div");
                label.innerText = f;

                const input = document.createElement("input");
                input.style.width = "100%";

                sceneInputs[f] = input;

                content.appendChild(label);
                content.appendChild(input);
            });

            leftPanel.appendChild(header);
            leftPanel.appendChild(content);

            const resizer = document.createElement("div");

            Object.assign(resizer.style, {
                position: "absolute",
                top: "0",
                right: "0",
                width: "6px",
                height: "100%",
                cursor: "ew-resize",
                background: "transparent"
            });

            let resizing = false;

            resizer.addEventListener("mousedown", () => {
                resizing = true;
            });

            document.addEventListener("mousemove", (e) => {

                if (!resizing || leftCollapsed) return;

                leftwidth = Math.max(220, Math.min(700, e.clientX));

                leftPanel.style.width = leftwidth + "px";
                leftBtn.style.left = leftwidth + "px";
            });

            document.addEventListener("mouseup", () => {
                resizing = false;
            });

            leftPanel.appendChild(resizer);
            document.body.appendChild(leftPanel);
        }
        function extractMessage(wrapper) {
            const isUser = wrapper.querySelector('.bg-chat-outgoing') !== null;

            let parts = [];

            // =========================
            // 1. TOP-LEVEL NARRATION BLOCKS
            // =========================
            const narrationBlocks = wrapper.querySelectorAll('article.prose em');

            narrationBlocks.forEach(n => {
                const text = n.innerText.trim();
                if (text) parts.push(`*${text}*`);
            });

            // =========================
            // 2. DIALOGUE + SHRINKWRAP BLOCKS
            // =========================
            const dialogueBlocks = wrapper.querySelectorAll('.shrinkwrap-source');

            dialogueBlocks.forEach(node => {
                let text = node.innerText.trim();
                if (text) parts.push(text);
            });

            if (parts.length === 0) return null;

            return {
                index: parseInt(wrapper.getAttribute('data-index')) || 0,
                role: isUser ? "user" : "assistant",
                content: parts.join("\n\n")
            };
        }

        function captureMessagesToBuffer() {

            const messages = Array.from(
                document.querySelectorAll('[data-testid="chat-message-item-dialog"]')
            );

            const mapped = messages
                .map(msg => extractMessage(msg.closest('[data-index]')))
                .filter(Boolean);

            const unique = [];

            const localSeen = new Set();

            for (const msg of mapped) {

                const sig = makeSignature(msg);

                // prevents duplicates in same scan
                if (localSeen.has(sig)) continue;

                localSeen.add(sig);

                unique.push(msg);
            }

            const grouped = [];

            for (const msg of unique) {

                const last = grouped[grouped.length - 1];

                if (last && last.role === msg.role) {

                    // prevent duplicate append
                    if (!last.content.includes(msg.content)) {
                        last.content += "\n\n" + msg.content;
                    }

                } else {

                    grouped.push({ ...msg });
                }
            }

            messageBuffer = grouped.reverse();
        }

        function createDockButtons() {

        // ================= RIGHT DOCK =================
        rightBtn = document.createElement("button");
        rightBtn.innerText = "⮞";

        Object.assign(rightBtn.style, {
            position: "fixed",
            right: rightWidth + "px",
            top: "0px",
            transform: "none",
            zIndex: "1000000",
            background: "#222",
            color: "white",
            border: "1px solid #555",
            padding: "6px",
            cursor: "pointer"
        });

        rightBtn.onclick = () => {
            rightCollapsed = !rightCollapsed;

            if (rightCollapsed) {
                rightPanel.style.display = "none";
                rightBtn.innerText = "⮜ Images";
                rightBtn.style.right = "0px";
            } else {
                rightPanel.style.display = "flex";
                rightBtn.innerText = "⮞";
                rightBtn.style.right = rightWidth + "px";
            }
        };

        document.body.appendChild(rightBtn);


        // ================= LEFT DOCK =================
        leftBtn = document.createElement("button");
        leftBtn.innerText = "Scene ⮜";

        Object.assign(leftBtn.style, {
            position: "fixed",
            left: leftwidth + "px",
            top: "0px",
            transform: "none",
            zIndex: "1000000",
            background: "#222",
            color: "white",
            border: "1px solid #555",
            padding: "6px",
            cursor: "pointer"
        });

        leftBtn.onclick = () => {
            leftCollapsed = !leftCollapsed;

            if (leftCollapsed) {
                leftPanel.style.display = "none";
                leftBtn.innerText = "Scene ⮞";
                leftBtn.style.left = "0px";
            } else {
                leftPanel.style.display = "flex";
                leftBtn.innerText = "Scene ⮜";
                leftBtn.style.left = leftwidth + "px";
            }
        };

        document.body.appendChild(leftBtn);
    }

        // =========================
        // INIT
        // =========================

        function init() {
            createLeftPanel();
            createRightPanel();
            createDockButtons();
            setInterval(captureMessagesToBuffer, 1000);
        }

        function wait() {
            if (document.body) init();
            else setTimeout(wait, 50);
        }

        wait();

    })();
}
