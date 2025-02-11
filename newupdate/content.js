let isRecording = false;
let isTranscribing = false;
let audioContext;
let mediaRecorder;
let audioChunks = [];
let clickedMicId = "";

// Constants
const MAX_RETRIES = 3;
const RETRY_DELAY = 100;
const WHISPER_SAMPLING_RATE = 16000;

// Colors and styles
const bgColor = "#222220";
const iconColor = "#a4a49f";

// Icons
const recordIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="12" fill="${bgColor}"/>
  <circle cx="12" cy="12" r="11" stroke="${iconColor}" stroke-width="2"/>
  <circle cx="12" cy="12" r="4" fill="${iconColor}"/>
</svg>`;

const stopIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="12" fill="${bgColor}"/>
  <circle cx="12" cy="12" r="11" stroke="${iconColor}" stroke-width="2"/>
  <rect x="7" y="7" width="10" height="10" fill="${iconColor}"/>
</svg>`;

const waitIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="12" fill="${bgColor}"/>
  <circle cx="12" cy="12" r="11" stroke="${iconColor}" stroke-width="2"/>
  <circle cx="12" cy="12" r="6" fill="${iconColor}" class="pulse-circle"/>
</svg>`;

const closeIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// Helper function to determine which platform we're on
function getPlatform() {
    const url = window.location.href;
    if (url.includes("claude.ai")) return "claude";
    if (url.includes("aistudio.google.com")) return "gemini";
    if (url.includes("perplexity.ai")) return "perplexity";
    return "unknown";
}

function getTargetElement() {
    const platform = getPlatform();
    if (platform === "claude") {
        return document.querySelector(".flex.min-h-4.flex-1.items-center");
    } else if (platform === "gemini") {
        const geminiTarget = document.querySelector("ms-add-chunk-menu");
        console.log("Gemini target:", geminiTarget);
        return geminiTarget;
    } else if (platform === "perplexity") {
        // Target a parent element of the textarea
        const perplexityTextarea = document.querySelector("textarea.overflow-auto");
        const perplexityTarget = perplexityTextarea?.parentElement?.parentElement;
        console.log("Perplexity target:", perplexityTarget);
        return perplexityTarget;
    }
    return null;
}

function getInputElement() {
    const platform = getPlatform();
    if (platform === "claude") {
        return document.querySelector('[contenteditable="true"]');
    } else if (platform === "gemini") {
        return document.querySelector("textarea.textarea");
    } else if (platform === "perplexity") {
        return document.querySelector("textarea.overflow-auto");
    }
    return null;
}

function insertText(inputElement, text) {
    if (!inputElement) return false;

    if (inputElement.tagName.toLowerCase() === "textarea") {
        inputElement.focus();
        const start = inputElement.selectionStart;
        const end = inputElement.selectionEnd;
        inputElement.value = inputElement.value.substring(0, start) + text + inputElement.value.substring(end);
        inputElement.selectionStart = inputElement.selectionEnd = start + text.length;

        // Trigger Angular input event
        const event = new Event('input', { bubbles: true });
        inputElement.dispatchEvent(event);
    } else {
        inputElement.focus();
        document.execCommand("insertText", false, text);
    }
    return true;
}

function insertMicrophoneButton(targetDiv, inline) {
    const count = document.querySelectorAll(".talktoai-mic-button-inline").length;
    const inlineClassSuffix = `-inline-${count}`;

    if (targetDiv) {
        const existingContainer = document.querySelector(".talktoai-mic-container" + (inline ? inlineClassSuffix : ""));
        if (existingContainer) {
            //  existingContainer.remove(); // Don't remove, just update
        }

        const existingError = document.getElementById("error-message" + (inline ? inlineClassSuffix : ""));
        if (existingError) {
            existingError.remove();
        }

        let containerDiv = existingContainer;
        if (!containerDiv) {
            containerDiv = document.createElement("div");
            containerDiv.classList.add("talktoai-mic-container" + (inline ? inlineClassSuffix : ""));
            containerDiv.style.cssText =
                "display: inline-flex; align-items: center; margin: 0 8px; order: -1;";
        }

        let micButton = containerDiv.querySelector(".talktoai-mic-button");
        if (!micButton) {
            micButton = document.createElement("button");
            micButton.innerHTML = recordIcon;
            micButton.classList.add("talktoai-mic-button");
            micButton.id = "mic-button";
            if (inline) {
                micButton.classList.add("talktoai-mic-button-inline");
                micButton.id += inlineClassSuffix;
            }
            micButton.style.cssText =
                "background: none; border: none; cursor: pointer; border-radius: 9999px; height: 32px; width: 32px; display: flex; align-items: center; justify-content: center;";
            micButton.onclick = checkSettingsAndToggleRecording;
            containerDiv.appendChild(micButton);
        }

        let infoSpeechDiv = document.getElementById("error-message" + (inline ? inlineClassSuffix : ""));
        if (!infoSpeechDiv) {
            infoSpeechDiv = document.createElement("div");
            infoSpeechDiv.classList.add("flex");
            infoSpeechDiv.id = "error-message" + (inline ? inlineClassSuffix : "");
            infoSpeechDiv.style.cssText = "color: #e27c5b; font-size: 12px; margin-top: 5px; align-items: center; background-color: #2b2b267a; border: 1px solid #e27c5b; border-radius: 5px; padding: 0.25em 0.5em; display: none;";
            // Add error message div

            const parent = getPlatform() === "gemini" ?
                document.querySelector(".input-wrapper") : // For Gemini
                targetDiv.parentElement; // For Claude and Perplexity

            if (parent) {
                parent.appendChild(infoSpeechDiv);
            } else {
                console.error("Could not find parent element to append error message div");
            }
        }

        // Insert the mic button in the appropriate location based on platform
        const platform = getPlatform();
        if (platform === "gemini") {
            const plusButton = document.querySelector(
                "ms-add-chunk-menu button.mat-mdc-menu-trigger"
            );

            if (plusButton && plusButton.parentNode) {
                if (!plusButton.parentNode.contains(containerDiv)) {
                    plusButton.parentNode.insertBefore(containerDiv, plusButton);
                }
            }
        } else if (platform === "perplexity") {
            // Insert into the button group div
            const perplexityTextarea = document.querySelector("textarea.overflow-auto");
            const buttonGroup = perplexityTextarea?.parentElement?.parentElement?.querySelector(".gap-sm.flex");

            if (buttonGroup && !buttonGroup.contains(containerDiv)) {
                buttonGroup.appendChild(containerDiv);
            }
        } else {
            // Claude
            if (
                targetDiv &&
                targetDiv.parentNode &&
                !targetDiv.parentNode.contains(containerDiv)
            ) {
                targetDiv.parentNode.insertBefore(containerDiv, targetDiv);
            }
        }

    } else {
        console.log("Target div for microphone button not found");
    }
}

function checkSettingsAndToggleRecording(evt) {
    const button = evt.currentTarget;
    chrome.storage.sync.get(["model", "groqApiKey", "openaiApiKey"], function (result) {
        if ((result.model === "groq" && !result.groqApiKey) || (result.model === "openai" && !result.openaiApiKey)) {
            showError("API key not set. Please set it in the extension options from the Chrome extension menu.");
            return;
        }

        if (result.model === "webgpu") {
            chrome.storage.local.get(["modelLoadError"], function (localResult) {
                if (localResult.modelLoadError) {
                    showError("WebGPU model failed to load. Please try again or switch to Groq in the extension options.");
                } else {
                    toggleRecording(evt, button);
                }
            });
        } else {
            toggleRecording(evt, button);
        }
    });

    evt.preventDefault();
    evt.stopPropagation();
    return false;
}

function showError(message) {
    const platform = getPlatform();
    const errorId = "error-message"; // + (platform === 'gemini' ? '-gemini' : '');
    const infoSpeechDiv = document.getElementById(errorId);

    if (infoSpeechDiv) {
        const div = document.createElement("div");
        div.textContent = message;
        div.style.flex = "1";

        const closeButton = document.createElement("button");
        closeButton.innerHTML = closeIcon;
        closeButton.style.cssText = "background: none; border: none; cursor: pointer; margin-left: 5px;";
        closeButton.onclick = closeError;

        const micButton = document.getElementById(clickedMicId);
        if (micButton) {
            micButton.disabled = true;
            micButton.style.opacity = "0.5";
        }

        infoSpeechDiv.appendChild(div);
        infoSpeechDiv.appendChild(closeButton);
        infoSpeechDiv.style.display = "flex";
    } else {
        console.error("Could not find error message div with ID:", errorId);
    }
}

function closeError() {
    const platform = getPlatform();
    const errorId = "error-message"; // + (platform === 'gemini' ? '-gemini' : '');
    const infoSpeechDiv = document.getElementById(errorId);

    if (infoSpeechDiv) {
        infoSpeechDiv.style.display = "none";
        infoSpeechDiv.textContent = "";

        const micButton = document.getElementById(clickedMicId);
        if (micButton) {
            micButton.disabled = false;
            micButton.style.opacity = "1";
        }
    } else {
        console.error("Could not find error message div with ID:", errorId);
    }
}

function toggleRecording(evt, button) {
    clickedMicId = button.id; // Store the ID, not the element
    closeError();
    if (!isRecording && !isTranscribing) {
        startRecording();
        button.innerHTML = stopIcon;
        button.style.animation = "spin 2s linear infinite";
    } else if (isRecording) {
        stopRecording();
        button.innerHTML = waitIcon;
        button.style.animation = "";
        button.disabled = true;
        isTranscribing = true;
    }

    evt.preventDefault();
    evt.stopPropagation();
    return false;
}

let mediaRecorderRef = { current: null };
let audioChunksRef = { current: [] };

function startRecording() {
    navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.addEventListener("dataavailable", (event) => {
                audioChunksRef.current.push(event.data);
            });

            mediaRecorder.start();
            isRecording = true;

            const micButton = document.getElementById(clickedMicId); // Retrieve by ID
            if (micButton) {
                micButton.innerHTML = stopIcon;
                micButton.style.animation = "spin 2s linear infinite";
            }
        })
        .catch((error) => {
            console.error("Error accessing microphone:", error);
            showError("Error accessing microphone. Please check your permissions.");
            resetRecordingState();
        });
}

function stopRecording() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.addEventListener("stop", transcribeAudio);
        mediaRecorderRef.current.stop();
        isRecording = false;
        isTranscribing = true;

        const micButton = document.getElementById(clickedMicId); // Retrieve by ID
        if (micButton) {
            micButton.innerHTML = waitIcon;
            micButton.style.animation = "";
            micButton.disabled = true;
        }

    }
}

async function transcribeAudio(retryCount = 0) {
    if (retryCount >= MAX_RETRIES) {
        showError("Maximum retry attempts reached. Please try again later.");
        resetRecordingState();
        return;
    }

    if (!audioChunksRef.current || audioChunksRef.current.length === 0) {
        console.error("No audio data available");
        showError("No audio data recorded. Please try again.");
        resetRecordingState();
        return;
    }

    try {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        if (audioBlob.size === 0) {
            throw new Error("Audio blob is empty");
        }

        const buffer = await audioBlob.arrayBuffer();
        if (buffer.byteLength === 0) {
            throw new Error("Array buffer is empty");
        }

        const uint8Array = new Uint8Array(buffer);
        if (uint8Array.length === 0) {
            throw new Error("Uint8Array is empty");
        }

        chrome.runtime.sendMessage(
            {
                action: "transcribe",
                audioBuffer: Array.from(uint8Array),
                micId: clickedMicId,
            },
            (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Runtime error:", chrome.runtime.lastError);
                    retryTranscription(retryCount);
                } else {
                    handleTranscription(response);
                }
            }
        );
    } catch (error) {
        console.log("Error processing audio:", error);
        retryTranscription(retryCount);
    }
}

function retryTranscription(retryCount) {
    console.log(`Retrying transcription (attempt ${retryCount + 1} of ${MAX_RETRIES})...`);
    setTimeout(() => transcribeAudio(retryCount + 1), RETRY_DELAY);
}

function handleTranscription(response) {
    const micButton = document.getElementById(response.micId); // Use the micId from the response
    isTranscribing = false;
    if (micButton) {
        micButton.disabled = false;
        micButton.style.animation = "";
        micButton.innerHTML = recordIcon;
    }

    if (response.success && response.text) {
        const inputElement = getInputElement();
        if (insertText(inputElement, response.text)) {
            // Text inserted successfully
        } else {
            showError("Failed to insert transcribed text.");
        }
    } else {
        showError(response.error || "Transcription failed. Please try again.");
    }
    resetRecordingState();
}

function resetRecordingState() {
    const allMics = document.querySelectorAll(".talktoai-mic-button");
    for (const mic of allMics) {
        mic.disabled = false;
        mic.style.animation = "";
        mic.innerHTML = recordIcon;
    }
    isRecording = false;
    isTranscribing = false;
}

function sendMessageToBackground(message) {
    if (chrome.runtime && chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage(message, handleTranscription);
    } else {
        setTimeout(() => checkRuntimeAndSendMessage(message), 1000);
    }
}

function checkRuntimeAndSendMessage(message, retries = 5) {
    if (chrome.runtime && chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage(message, handleTranscription);
    } else if (retries > 0) {
        setTimeout(() => checkRuntimeAndSendMessage(message, retries - 1), 1000);
    } else {
        console.error("Chrome runtime not available after multiple retries");
        showError(
            "Error communicating with the extension. Please refresh the page and try again."
        );
        resetRecordingState();
    }
}

const style = document.createElement("style");
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.7; }
    100% { transform: scale(1); opacity: 1; }
  }
  
  .pulse-circle {
    transform-origin: center;
    transform-box: fill-box;
    animation: pulse 1s ease-in-out infinite;
  }
`;
document.head.appendChild(style);

// Interval check for Claude
setInterval(() => {
    if (getPlatform() !== "claude") return;
    const micButton = document.getElementById("mic-button");
    if (!micButton) {
        const targetDiv = document.querySelector(".flex.min-h-4.flex-1.items-center");
        if (targetDiv && !targetDiv.previousSibling && !targetDiv.previousSibling?.matches("button")) {
            insertMicrophoneButton(targetDiv);
        }
    }
    const inlineTargets = document.querySelectorAll(".text-text-300.flex.flex-row.items-center.gap-2.text-xs");
    for (const inlineTarget of inlineTargets) {
        const inlineMicButton = inlineTarget.parentNode.querySelector(".talktoai-mic-button-inline");
        if (!inlineMicButton) {
            insertMicrophoneButton(inlineTarget, true);
        }
    }
}, 500);

// Interval check for Gemini and Perplexity
setInterval(() => {
    const platform = getPlatform();
    if (platform !== "gemini" && platform !== "perplexity") return;

    const micButton = document.getElementById("mic-button");
    if (!micButton) {
        const targetDiv = getTargetElement();
        if (targetDiv) {
            insertMicrophoneButton(targetDiv);
        }
    }
}, 500);
