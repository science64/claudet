# webpack.config.js

```js
import path from 'path';
import { fileURLToPath } from 'url';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        background: './src/background.js',
        popup: './src/popup.js',
        content: './src/content.js',
        options: './src/options.js', // New entry point for options page
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/popup.html',
            filename: 'popup.html',
            chunks: ['popup'],
        }),
        new HtmlWebpackPlugin({
            template: './src/options.html',
            filename: 'options.html',
            chunks: ['options'],
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "public",
                    to: "." // Copies to build folder
                },
                {
                    from: "src/popup.css",
                    to: "popup.css"
                },
                {
                    from: "src/options.css",
                    to: "options.css"
                }
            ],
        })
    ],
};

export default config;
```

# README.md

```md
# 🎙️ Claude AI Speech-to-Text Chrome Extension 🤖

![Demo](https://raw.githubusercontent.com/unclecode/claudet/main/howto.gif)

## Why This Extension? 🤔
Hey there!

I don't know if you've felt this way, but I love using AI assistants like Claude. Recently, I found myself wishing I could talk to Claude instead of typing all the time. I enjoyed the speech-to-text feature when communicating with ChatGPT, and I wanted the same experience with Claude.

That's when I had an idea: why not create a Chrome extension to bring this functionality to Claude? I like Groq's super-fast Whisper model. So, I decided to create an extension.

This Chrome extension has been a great tool for me personally, making my interactions with Claude more natural and efficient. I hope it can do the same for you!

## Features 🚀

- 🎤 Adds a microphone button to Claude AI's text input area
- 🔄 Speech-to-text using Whisper model offered by Groq API or OpenAI
- 🔀 Switch between speech-to-text providers easily
- 🔒 Privacy-focused design with local processing

## Groq API and OpenAI - Speed and Accuracy ⚡
If you're looking for lightning-fast transcription, both the Groq API and OpenAI are excellent options. They use the Whisper model, which is known for its speed and accuracy. These options are perfect when you need quick, reliable transcriptions.

## Installation 📥

### From Chrome Web Store

Great news! The extension is available on the Chrome Web Store. Install it from here https://tinyurl.com/claudetvoice

### From GitHub (Available Now! 🎉)

1. Clone this repository or download it as a ZIP file
2. Unzip the file (if downloaded as ZIP)
3. Open Chrome and go to `chrome://extensions/`
4. Enable "Developer mode" in the top right corner
5. Click "Load unpacked" and select the extension directory

## Usage 🔧

1. After installation, click on the extension icon in your Chrome toolbar
2. Choose your preferred speech-to-text provider (Groq or OpenAI)
3. Enter your API token for the chosen provider
   - To get a Groq API token, visit [Groq's website](https://www.groq.com) and create an account
   - For OpenAI, visit [OpenAI's website](https://www.openai.com) to create an account and generate a token
4. Go to the Claude AI website (claude.ai)
5. Look for the new microphone icon at the bottom of the text input area
6. Click the microphone icon and start talking
7. Click again to stop recording and watch as your words appear in the input box

Remember, all processing happens locally on your device, ensuring your privacy and security.

## Privacy and Security 🛡️

- Your API tokens are stored safely in your browser's local storage
- All speech-to-text conversion happens on your device
- No data is sent to any external servers other than the API you choose (Groq or OpenAI)

## Contributing 🤝

Got ideas to make this even better? Feel free to submit a Pull Request!

## License 📄

MIT License

## Disclaimer ⚠️

This is an unofficial extension and is not affiliated with Anthropic (creators of Claude AI), Groq, or OpenAI.

## Let's Make AI Conversations More Natural! 💬

I hope this extension enhances your Claude AI experience as much as it has mine. Whether you choose Groq or OpenAI for speech recognition, this tool aims to make your interactions with Claude more natural and efficient. Enjoy talking to Claude!

```

# package.json

```json
{
    "name": "Claudet",
    "version": "0.1.1",
    "description": "Claudet: Claude.ai Voice Input",
    "scripts": {
        "build": "webpack",
        "dev": "webpack --watch"
    },
    "type": "module",
    "author": "Xenova",
    "license": "MIT",
    "devDependencies": {
        "copy-webpack-plugin": "^11.0.0",
        "html-webpack-plugin": "^5.5.1",
        "webpack": "^5.79.0",
        "webpack-cli": "^5.1.4"
    },
    "dependencies": {
        "@xenova/transformers": "^2.0.0",
        "wavefile": "^11.0.0"
    }
}

```

# .gitignore

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
.pnpm-debug.log*

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage
*.lcov

# nyc test coverage
.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Snowpack dependency directory (https://snowpack.dev/)
web_modules/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional stylelint cache
.stylelintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variable files
.env
.env.development.local
.env.test.local
.env.production.local
.env.local

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next
out

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
# Comment in the public line in if your project uses Gatsby and not Next.js
# https://nextjs.org/blog/next-9-1#public-directory-support
# public

# vuepress build output
.vuepress/dist

# vuepress v2.x temp and cache directory
.temp
.cache

# Docusaurus cache and generated files
.docusaurus

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# yarn v2
.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*

tmp/
vanilajs/

*.zip
```

# .aidigestignore

```
*.gif
LICENSE
package-lock.json

```

# src\popup.js

```js
document.addEventListener('DOMContentLoaded', function() {
    const modelSelect = document.getElementById('modelSelect');
    const groqApiKeyContainer = document.getElementById('groqApiKeyContainer');
    const openaiApiKeyContainer = document.getElementById('openaiApiKeyContainer');
    const groqApiKeyInput = document.getElementById('groqApiKey');
    const openaiApiKeyInput = document.getElementById('openaiApiKey');
    const saveButton = document.getElementById('saveButton');

    // Load saved settings
    chrome.storage.sync.get(['model', 'groqApiKey', 'openaiApiKey'], function(result) {
        if (result.model) {
            modelSelect.value = result.model;
        }
        if (result.groqApiKey) {
            groqApiKeyInput.value = result.groqApiKey;
        }
        if (result.openaiApiKey) {
            openaiApiKeyInput.value = result.openaiApiKey;
        }
        toggleApiKeyVisibility();
    });

    // Check if WebGPU model failed to load
    chrome.storage.local.get(['modelLoadError'], function(result) {
        if (result.modelLoadError) {
            const webgpuOption = modelSelect.querySelector('option[value="webgpu"]');
            if (webgpuOption) {
                webgpuOption.disabled = true;
                webgpuOption.text += " (unavailable)";
            }
            if (modelSelect.value === 'webgpu') {
                modelSelect.value = 'groq';
                toggleApiKeyVisibility();
            }
        }
    });

    modelSelect.addEventListener('change', toggleApiKeyVisibility);

    saveButton.addEventListener('click', function() {
        const model = modelSelect.value;
        const groqApiKey = groqApiKeyInput.value;
        const openaiApiKey = openaiApiKeyInput.value;

        chrome.storage.sync.set({
            model: model,
            groqApiKey: groqApiKey,
            openaiApiKey: openaiApiKey
        }, function() {
            console.log('Settings saved');
            document.getElementById('saveResponse').textContent = 'Settings saved.';
            setTimeout(() => window.close(), 1000);
        });
    });

    function toggleApiKeyVisibility() {
        groqApiKeyContainer.style.display = modelSelect.value === 'groq' ? 'block' : 'none';
        openaiApiKeyContainer.style.display = modelSelect.value === 'openai' ? 'block' : 'none';
    }
});
```

# src\popup.html

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ClaudeTalk Settings</title>
        <style>
            body {
                width: 300px;
                padding: 15px;
                font-family: Arial, sans-serif;
                background-color: #2e2e2b;
                display: flex;
                flex-direction: column;
                align-items: center;
                color: #d7d7d2;
            }
            h1 {
                color: #e17c5b;
                font-size: 20px;
                margin-bottom: 15px;
            }
            .logo {
                width: 64px;
                height: 64px;
                margin-bottom: 10px;
            }
            label {
                display: flex;
                margin-bottom: 5px;
                width: fit-content;
                color: #aeaaa0;
            }
            select,
            input {
                width: 100%;
                padding: 5px;
                margin-bottom: 10px;
                background-color: transparent;
                border-radius: 10px;
                border-color: #494845;
                color: #aeaaa0;
                outline: none;
                border: 1px solid #494845;
            }
            .api-key-container {
                display: none;
                width: 100%;
            }
            button {
                background-color: #e17c5b;
                color: white;
                border: none;
                padding: 10px;
                cursor: pointer;
                width: 100%;
                border-radius: 2em;
            }
            button:hover {
                background-color: #d16c4b;
            }
            #saveResponse {
                margin-top: 10px;
                color: #e17c5b;
            }
        </style>
    </head>
    <body>
        <img src="icon128.png" alt="ClaudeTalk Logo" class="logo" />
        <h1>ClaudeTalk Settings</h1>
        <label for="modelSelect">Select Model:</label>
        <select id="modelSelect">
            <!-- <option value="webgpu">WebGPU Whisper (Default)</option> -->
            <option value="groq" selected >Groq</option>
            <option value="openai">OpenAI</option>
        </select>
        <div id="groqApiKeyContainer" class="api-key-container">
            <label for="groqApiKey">Groq API Key:</label>
            <input type="password" id="groqApiKey" placeholder="Enter your Groq API key" />
        </div>
        <div id="openaiApiKeyContainer" class="api-key-container">
            <label for="openaiApiKey">OpenAI API Key:</label>
            <input type="password" id="openaiApiKey" placeholder="Enter your OpenAI API key" />
        </div>
        <button id="saveButton">Save Settings</button>
        <div id="saveResponse"></div>

        <script src="popup.js"></script>
    </body>
</html>
```

# src\popup.css

```css

```

# src\options.js

```js
document.addEventListener('DOMContentLoaded', function() {
    const modelSelect = document.getElementById('modelSelect');
    const apiKeyContainer = document.getElementById('api_section');
    const groqApiKeyInput = document.getElementById('groqApiKey');
    const openaiApiKeyInput = document.getElementById('openaiApiKey');
    const saveSettingsButton = document.getElementById('saveSettings');
    const messageList = document.getElementById('messageList');
    const groqApiKeyContainer = document.getElementById('groqApiKeyContainer');
    const openaiApiKeyContainer = document.getElementById('openaiApiKeyContainer');

    // Load and display settings
    chrome.storage.sync.get(['model', 'groqApiKey', 'openaiApiKey'], function(result) {
        if (result.model) {
            modelSelect.value = result.model;
        }
        if (result.groqApiKey) {
            groqApiKeyInput.value = result.groqApiKey;
        }
        if (result.openaiApiKey) {
            openaiApiKeyInput.value = result.openaiApiKey;
        }
        toggleApiKeyVisibility();
    });

    // Toggle API key input visibility based on selected model
    function toggleApiKeyVisibility() {
        const selectedModel = modelSelect.value;
        if (selectedModel !== 'groq' && selectedModel !== 'openai') {
            apiKeyContainer.style.display = 'none';
            return;
        }
        apiKeyContainer.style.display = 'block';
        groqApiKeyContainer.style.display = selectedModel === 'groq' ? 'block' : 'none';
        openaiApiKeyContainer.style.display = selectedModel === 'openai' ? 'block' : 'none';
    }

    modelSelect.addEventListener('change', toggleApiKeyVisibility);

    // Save settings
    saveSettingsButton.addEventListener('click', function() {
        const model = modelSelect.value;
        const groqApiKey = groqApiKeyInput.value;
        const openaiApiKey = openaiApiKeyInput.value;

        chrome.storage.sync.set({
            model: model,
            groqApiKey: groqApiKey,
            openaiApiKey: openaiApiKey
        }, function() {
            alert('Settings saved successfully!');
        });
    });

    // Load and display messages
    function loadMessages() {
        chrome.storage.local.get(['messages'], function(result) {
            if (result.messages && result.messages.length > 0) {
                messageList.innerHTML = '';
                result.messages.forEach(function(msg) {
                    const li = document.createElement('li');
                    li.textContent = `${new Date(msg.timestamp).toLocaleString()}: ${msg.text}`;
                    messageList.appendChild(li);
                });
            } else {
                messageList.innerHTML = '<li>No messages yet.</li>';
            }
        });
    }

    loadMessages();

    // Refresh messages every 5 seconds
    setInterval(loadMessages, 5000);
});
```

# src\options.html

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ClaudeTalk Options</title>
        <link rel="stylesheet" href="options.css" />
    </head>
    <body>
        <div class="container">
            <h1>ClaudeTalk Options</h1>
            <div class="section">
                <h2>Model Selection</h2>
                <select id="modelSelect">
                    <option value="webgpu">WebGPU Whisper (Default)</option>
                    <option value="groq">Groq</option>
                    <option value="openai">OpenAI</option>
                </select>
            </div>
            <div id="api_section" class="section">
                <h2>API Keys</h2>
                <div id="groqApiKeyContainer">
                    <h3>Groq API Key</h3>
                    <input type="password" id="groqApiKey" placeholder="Enter your Groq API key" />
                </div>
                <div id="openaiApiKeyContainer">
                    <h3>OpenAI API Key</h3>
                    <input type="password" id="openaiApiKey" placeholder="Enter your OpenAI API key" />
                </div>
                <button id="saveSettings">Save Settings</button>
            </div>
            <div class="section">
                <h2>Recent Messages</h2>
                <ul id="messageList"></ul>
            </div>
            <div class="footer">
                <p>
                    Created by <a href="https://github.com/unclecode/claudet" target="_blank">unclecode</a> | 
                    Follow on <a href="https://twitter.com/unclecode" target="_blank">Twitter</a>
                </p>
            </div>
        </div>
        <script src="options.js"></script>
    </body>
</html>
```

# src\options.css

```css
:root {
    --bg-color: #222220;
    --text-color: #a4a49f;
    --primary-color: #e27c5b;
    --secondary-color: #3a3a38;
    --hover-color: #4a4a48;
}

* {
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: var(--bg-color);
    color: var(--text-color);
    margin: 0;
    padding: 20px;
    line-height: 1.6;
}

.container {
    max-width: 800px;
    margin: 0 auto;
}

h1,
h2 {
    color: var(--text-color);
}

.section {
    background-color: var(--secondary-color);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
}

input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    background-color: var(--bg-color);
    border: 1px solid var(--text-color);
    color: var(--text-color);
    border-radius: 4px;
}

button {
    background-color: var(--primary-color);
    color: var(--bg-color);
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: var(--hover-color);
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    background-color: var(--hover-color);
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 4px;
}

li:nth-child(even) {
    background-color: var(--secondary-color);
}
.footer {
    margin-top: 20px;
    text-align: center;
    font-size: 0.9em;
    color: var(--text-color);
}

.footer a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer a:hover {
    color: var(--hover-color);
    text-decoration: underline;
}

select {
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
    background-color: transparent;
    border-radius: 10px;
    border-color: #494845;
    color: #aeaaa0;
    outline: none;
    border: 1px solid #494845;
}

```

# src\content.js

```js
let isRecording = false;
let isTranscribing = false;
let audioContext;
let mediaRecorder;
let audioChunks = [];
let clickedMicId = "";

const MAX_RETRIES = 3;
const RETRY_DELAY = 100; // 1 second
const WHISPER_SAMPLING_RATE = 16000;

const bgColor = "#222220";
const iconColor = "#a4a49f";

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

function insertMicrophoneButton(targetDiv, inline) {
    const count = document.querySelectorAll(".claudet-mic-button-inline").length;
    const inlineClassSuffix = `-inline-${count}`;
    // const targetDiv = document.querySelector(".flex.min-h-4.flex-1.items-center");
    if (targetDiv) {
        // remove claudet container if it already exists
        const existingContainer = document.querySelector(".claudet-mic-container" + (inline ? inlineClassSuffix : ""));
        if (existingContainer) {
            existingContainer.remove();
        }
        // remove error message if it already exists
        const existingError = document.getElementById("error-message" + (inline ? inlineClassSuffix : ""));
        if (existingError) {
            existingError.remove();
        }
        const containerDiv = document.createElement("div");
        containerDiv.classList.add("claudet-mic-container" + (inline ? inlineClassSuffix : ""));
        containerDiv.style.cssText =
            "display: flex; flex-direction: column; align-items: flex-start; margin-right: 10px;";

        const micButton = document.createElement("button");
        micButton.innerHTML = recordIcon;
        micButton.classList.add("claudet-mic-button");
        micButton.id = "mic-button";
        if (inline) {
            micButton.classList.add("claudet-mic-button-inline");
            // count hpow many ".claudet-mic-button-inline" are there            
            micButton.id += inlineClassSuffix;
        }
        micButton.style.cssText = "background: none; border: none; cursor: pointer;";
        micButton.onclick = checkSettingsAndToggleRecording;;

        const infoSpeechDiv = document.createElement("div");
        infoSpeechDiv.classList.add("flex");
        infoSpeechDiv.id = "error-message" + (inline ? inlineClassSuffix : "");
        infoSpeechDiv.style.cssText =
            "color: #e27c5b; font-size: 12px; margin-top: 5px; align-items: center; background-color: #2b2b267a; border: 1px solid #e27c5b; border-radius: 5px; padding: 0.25em 0.5em; display: none;";

        containerDiv.appendChild(micButton);
        targetDiv.parentNode.insertBefore(containerDiv, targetDiv);
        targetDiv.parentElement.parentElement.appendChild(infoSpeechDiv);
    } else {
        console.log("Target div for microphone button not found");
    }
}

function checkSettingsAndToggleRecording(evt) {
    const button  = evt.currentTarget;
    chrome.storage.sync.get(['model', 'groqApiKey', 'openaiApiKey'], function(result) {
        if ((result.model === 'groq' && !result.groqApiKey) || (result.model === 'openai' && !result.openaiApiKey)) {
            showError("API key not set. Please set it in the extension options from the Chrome extension menu.");
            return;
        }

        if (result.model === 'webgpu') {
            chrome.storage.local.get(['modelLoadError'], function(localResult) {
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
    const infoSpeechDiv = document.getElementById("error-message");
    if (infoSpeechDiv) {
        // create a div and set text to it
        const div = document.createElement("div");
        div.textContent = message;
        // set flex to 1
        div.style.flex = "1";

        const closeButton = document.createElement("button");
        closeButton.innerHTML = closeIcon;
        closeButton.style.cssText = "background: none; border: none; cursor: pointer; margin-left: 5px;";
        closeButton.onclick = closeError;

        // Disable the mic button
        const micButton = document.getElementById(clickedMicId);
        if (micButton) {
            micButton.disabled = true;
            micButton.style.opacity = "0.5";
        }

        infoSpeechDiv.appendChild(div);
        infoSpeechDiv.appendChild(closeButton);

        // rset display to flex
        infoSpeechDiv.style.display = "flex";
    }
}

function closeError() {
    const infoSpeechDiv = document.getElementById("error-message");
    if (infoSpeechDiv) {
        infoSpeechDiv.style.display = "none";
        infoSpeechDiv.textContent = "";
    }
    // Re-enable the mic button
    const micButton = document.getElementById(clickedMicId);
    if (micButton) {
        micButton.disabled = false;
        micButton.style.opacity = "1";
    }
}

function toggleRecording(evt, button) {
    clickedMicId = button; // obj.currentTarget //.id;
    closeError(); // Close any existing error message
    const micButton = clickedMicId // document.getElementById(clickedMicId);
    if (!isRecording && !isTranscribing) {
        startRecording();
        micButton.innerHTML = stopIcon;
        micButton.style.animation = "spin 2s linear infinite";
    } else if (isRecording) {
        stopRecording();
        micButton.innerHTML = waitIcon;
        micButton.style.animation = "";
        micButton.disabled = true;
        isTranscribing = true;
    }

    // cancel the event
    evt.preventDefault();
    // avoid the event to propagate
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
                console.log("Data available");
                audioChunksRef.current.push(event.data);
            });

            mediaRecorder.start();
            isRecording = true;

            const micButton = clickedMicId //document.getElementById(clickedMicId);
            micButton.innerHTML = stopIcon;
            micButton.style.animation = "spin 2s linear infinite";
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

        const micButton = clickedMicId //document.getElementById(clickedMicId);
        micButton.innerHTML = waitIcon;
        micButton.style.animation = "";
        micButton.disabled = true;
    }
}


    // audioBlob
    //     .arrayBuffer()
    //     .then((buffer) => {
    //         // Send the audio buffer to the background script for transcription
    //         chrome.runtime.sendMessage(
    //             {
    //                 action: "transcribe",
    //                 audioBuffer: Array.from(new Uint8Array(buffer)), // Convert ArrayBuffer to array
    //                 micId: clickedMicId.id,
    //             },
    //             handleTranscription
    //         );
    //     })
    //     .catch((error) => {
    //         console.error("Error converting blob to array buffer:", error);
    //         showError("Error processing audio. Please try again.");
    //         resetRecordingState();
    //     });

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
                micId: clickedMicId.id,
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
        console.log("Error: Error processing audio:", error);
        retryTranscription(retryCount);
    }
}

function retryTranscription(retryCount) {
    console.log(`Retrying transcription (attempt ${retryCount + 1} of ${MAX_RETRIES})...`);
    setTimeout(() => transcribeAudio(retryCount + 1), RETRY_DELAY);
}

function showRetryMessage(retryCount) {
    showError(`Error processing audio. Retrying... (${retryCount + 1}/${MAX_RETRIES})`);
}

function handleTranscription(response) {
    clickedMicId = response.micId;
    
    const micButton = document.getElementById(clickedMicId);
    isTranscribing = false;
    micButton.disabled = false;
    micButton.style.animation = "";
    micButton.innerHTML = recordIcon;

    if (response.success && response.text) {
        insertTranscribedText(response.text, clickedMicId);
        initializeExtension();
    } else {
        showError(response.error || "Transcription failed. Please try again.");
    }
}

function insertTranscribedText(text, micId) {
    let inputDiv;
    const isInline = micId.includes("inline");
    if (isInline) {
        // Extract the container class suffix from the micId
        const containerClassSuffix = micId.split("-").slice(-1)[0];
        // Select .claudet-mic-container-inline then take the two above prent then search for text area that is in the same div
        const inlineTarget = document
            .querySelector(".claudet-mic-container-inline-" + containerClassSuffix)
            .parentElement.parentElement.querySelector("textarea");
        if (inlineTarget) {
            inputDiv = inlineTarget;
            inputDiv.focus();
            inputDiv.value += text;
        } else {
            console.error("Textarea not found");
            showError("Error inserting transcribed text. Please try again.");
            return;
        }
    } else {
        inputDiv = document.querySelector('[contenteditable="true"]');
        if (inputDiv) {
            inputDiv.focus();
            document.execCommand("insertText", false, text);
        } else {
            console.error("Contenteditable div not found");
            showError("Error inserting transcribed text. Please try again.");
        }
    }
}

function resetRecordingState() {
    const allMics = document.querySelectorAll(".claudet-mic-button");
    for (const mic of allMics) {
        mic.disabled = false;
        mic.style.animation = "";
        mic.innerHTML = recordIcon;
    }
    isRecording = false;
    isTranscribing = false;
    micButton.disabled = false;
    // micButton.style.animation = "";
    // micButton.innerHTML = recordIcon;
    // const inlineMicButton = document.getElementById("mic-button-inline");
    // if (inlineMicButton) {
    //     inlineMicButton.disabled = false;
    //     inlineMicButton.style.animation = "";
    //     inlineMicButton.innerHTML = recordIcon;
    // }
}

function sendMessageToBackground(message) {
    if (chrome.runtime && chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage(message, handleTranscription);
    } else {
        // If chrome.runtime is not available, retry after a short delay
        setTimeout(() => checkRuntimeAndSendMessage(message), 1000);
    }
}

function checkRuntimeAndSendMessage(message, retries = 5) {
    if (chrome.runtime && chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage(message, handleTranscription);
    } else if (retries > 0) {
        // If chrome.runtime is still not available, retry with a decremented retry count
        setTimeout(() => checkRuntimeAndSendMessage(message, retries - 1), 1000);
    } else {
        console.error("Chrome runtime not available after multiple retries");
        showError("Error communicating with the extension. Please refresh the page and try again.");
        resetRecordingState();
    }
}

// CSS for the animations
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

// if (document.readyState === "loading") {
//     document.addEventListener("DOMContentLoaded", initializeExtension);
// } else {
//     initializeExtension();
// }

function initializeExtension() {
    // insertMicrophoneButton();
    // console.log("Microphone button inserted");
    // // Add any other initialization code here
}

// Every 100 ms check if mic button is present if not insert it
setInterval(() => {
    const micButton = document.getElementById("mic-button");
    if (!micButton) {
        const targetDiv = document.querySelector(".flex.min-h-4.flex-1.items-center");
        if (targetDiv && !targetDiv.previousSibling && !targetDiv.previousSibling?.matches("button")) {
            insertMicrophoneButton(targetDiv);
        }
    }
    // Check for all inlines
    const inlineTargets = document.querySelectorAll(".text-text-300.flex.flex-row.items-center.gap-2.text-xs");
    for (const inlineTarget of inlineTargets) {
        // check if inlineTarget has a button with class claudet-mic-button-inline
        const inlineMicButton = inlineTarget.parentNode.querySelector(".claudet-mic-button-inline");
        if (!inlineMicButton) {
            insertMicrophoneButton(inlineTarget, true);
        }
    }
    // if (inlineTarget) {
    //     const inlineMicButton = document.getElementById("mic-button-inline");
    //     if (!inlineMicButton) {
    //         // const inlineTarget = document.querySelector(".flex.items-center.justify-between.gap-2");
    //         insertMicrophoneButton(inlineTarget, true);
    //     }
    // }
}, 200);

// Additional event listener for dynamically loaded content
const observeDOM = () => {
    console.log("Observing DOM for changes");
    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    const callback = function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === "childList") {
                const targetDiv = document.querySelector(".flex.min-h-4.flex-1.items-center");
                if (targetDiv && !targetDiv.previousSibling && !targetDiv.previousSibling?.matches("button")) {
                    insertMicrophoneButton();
                    console.log("Microphone button inserted after dynamic load");
                    observer.disconnect(); // Stop observing once button is inserted
                    break;
                }
                const inlineTarget = document.querySelector(".flex.items-center.justify-between.gap-2");
                // if (inlineTarget && !inlineTarget.previousSibling && !inlineTarget.previousSibling?.matches("button")) {
                if (inlineTarget) {
                    // insertMicrophoneButton();
                    console.log("Microphone button for inline mode");
                    observer.disconnect(); // Stop observing once button is inserted
                    break;
                }
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
};

// Start observing the DOM for changes
// setTimeout(observeDOM, 5000);

```

# src\background.js

```js
// env.backends.onnx.wasm.numThreads = 1;
// env.allowRemoteModels = false;
// env.localModelPath = "models/";
// background.js
import { pipeline, env } from "@xenova/transformers";
import { WaveFile } from 'wavefile';

// Skip initial check for local models
env.allowLocalModels = false;

// Disable multithreading due to a bug in onnxruntime-web
env.backends.onnx.wasm.numThreads = 1;

let currentModel = "groq";
let groqApiKey = "";
let openaiApiKey = "";
let messages = [];
let modelLoadError = false;

chrome.storage.local.get(["messages", "modelLoadError"], function (result) {
    if (result.messages) {
        messages = result.messages;
    }
    if (result.modelLoadError !== undefined) {
        modelLoadError = result.modelLoadError;
    }
});

// Add OpenAI to the storage retrieval
chrome.storage.sync.get(["model", "groqApiKey", "openaiApiKey"], function (result) {
    if (result.model) {
        currentModel = result.model;
    }
    if (result.groqApiKey) {
        groqApiKey = result.groqApiKey;
    }
    if (result.openaiApiKey) {
        openaiApiKey = result.openaiApiKey;
    }
});

// Update the storage change listener
chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let key in changes) {
        if (key === "model") {
            currentModel = changes[key].newValue;
        } else if (key === "groqApiKey") {
            groqApiKey = changes[key].newValue;
        } else if (key === "openaiApiKey") {
            openaiApiKey = changes[key].newValue;
        } else if (key === "messages" && namespace === "local") {
            messages = changes[key].newValue;
        }
    }
});

class PipelineFactory {
    static task = "automatic-speech-recognition";
    static model = "Xenova/whisper-base";
    static model = 'Xenova/whisper-tiny.en';
    static model = "Xenova/whisper-tiny";
    static quantized = false;
    static instance = null;
    static isLoading = false;

    static async getInstance(progress_callback = null) {
        if (this.instance === null && !this.isLoading) {
            this.isLoading = true;
            try {
                this.instance = await pipeline(this.task, this.model, {
                    quantized: this.quantized,
                    progress_callback,
                    revision: this.model.includes("/whisper-medium") ? "no_attentions" : "main",
                });
            } catch (error) {
                console.log("Error: Error initializing pipeline:", error);
                throw error;
            } finally {
                this.isLoading = false;
            }
        }
        return this.instance;
    }
}

async function transcribeWithAPI(audioArray) {
    try {
        // Reconstruct ArrayBuffer from the array
        const audioBuffer = new Uint8Array(audioArray).buffer;
        const audioBlob = new Blob([audioBuffer], { type: "audio/webm" });

        const formData = new FormData();
        formData.append("file", audioBlob, "recording.webm");
        const modelName = currentModel === "groq" ? "whisper-large-v3" : "whisper-1";
        formData.append("model", modelName);
        formData.append("response_format", "text");

        const urlBase = currentModel === "groq" ? "https://api.groq.com/openai" : "https://api.openai.com";
        const apiKey = currentModel === "groq" ? groqApiKey : openaiApiKey;

        const transcriptionResponse = await fetch(`${urlBase}/v1/audio/transcriptions`, {
        method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
            body: formData,
        });

        if (transcriptionResponse.ok) {
            const data = await transcriptionResponse.text();
            return { success: true, text: data.trim() };
        } else {
            const errorData = await transcriptionResponse.json();
            return { success: false, error: errorData.error.message };
        }
    } catch (error) {
        console.log("Error: Error transcribing audio:", error);
        return { success: false, error: "Unable to transcribe audio. Please try again." };
    }
}


const transcribe = async (audioArrayBuffer, language = "en") => {
    try {
        // let transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny.en');
        let transcriber = await PipelineFactory.getInstance();
        const uint8Array = new Uint8Array(audioArrayBuffer);
        const recoveredBuffer = uint8Array.buffer;
        // Convert audio to required format
        let audioData = await convertAudioToRequiredFormat(recoveredBuffer);

        let output = await transcriber(audioData, {
            top_k: 0,
            do_sample: false,
            chunk_length_s: 15,
            stride_length_s: 3,
            language: language,
            task: "transcribe",
            return_timestamps: false,
        });

        return { success: true, text: output.text };
    } catch (error) {
        console.log("Error: Transcription error:", error);
        return { success: false, error: error.message || "Unknown transcription error" };
    }
};

const convertAudioToRequiredFormat = async (audioArray) => {
    try {

        const wav = new WaveFile();
        
        // Assuming the input is 16-bit PCM audio at 44.1kHz
        wav.fromScratch(1, 16000, '16', audioArray);
        
        // Get WAV file as a Buffer
        const wavBuffer = wav.toBuffer();

        const audioBlob = new Blob([wavBuffer], { type: "audio/wav" });

        // Convert to 32-bit float
        wav.toBitDepth('32f');
        
        // Convert to 16kHz sample rate
        wav.toSampleRate(16000);
        
        let samples = wav.getSamples();
        
        if (Array.isArray(samples)) {
            if (samples.length > 1) {
                // Merge channels
                const SCALING_FACTOR = Math.sqrt(2);
                for (let i = 0; i < samples[0].length; ++i) {
                    samples[0][i] = SCALING_FACTOR * (samples[0][i] + samples[1][i]) / 2;
                }
            }
            samples = samples[0];
        }
        
        return samples;
    } catch (error) {
        console.error("Error converting audio:", error);
        throw new Error("Failed to process audio file. Unsupported format or corrupted file.");
    }
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "transcribe") {
        (async function () {
            try {
                if ((currentModel === "groq" && !groqApiKey) || (currentModel === "openai" && !openaiApiKey)) {
                    sendResponse({ success: false, error: "API key not set. Please set it in the extension options." , micId: message.micId || "mic-button"});
                    return;
                }
                // refresh currentModel
                chrome.storage.sync.get(["model"], async function (result) {
                    if (result.model) {
                        currentModel = result.model;
                    }

                    if (currentModel === "webgpu") {
                        result = await transcribe(message.audioBuffer, message.language);
                    } else if (currentModel === "groq" || currentModel === "openai") {
                        result = await transcribeWithAPI(message.audioBuffer);
                    }
                    
                    if (result.success) {
                        // Store the message
                        messages.push({
                            text: result.text,
                            timestamp: new Date().toISOString()
                        });
                        
                        // Keep only the last 50 messages
                        if (messages.length > 50) {
                            messages = messages.slice(-50);
                        }
                        
                        // Save to local storage
                        chrome.storage.local.set({ messages: messages });
                    }
                    result.micId = message.micId || "mic-button";
                    sendResponse(result);
                });
                
            } catch (error) {
                sendResponse({ success: false, error: error.message || "Unknown error", micId: message.micId || "mic-button" });
            }
        })();
        return true; // Indicates we will send a response asynchronously
    }
});

// Optional: Preload the model
PipelineFactory.getInstance((data) => {
    console.log("Preloading model, progress:", data);
}).catch((error) => {
    console.log("Failed to preload model:", error);
    chrome.storage.local.set({ modelLoadError: true });
});
```

# public\manifest.json

```json
{
    "manifest_version": 3,
    "name": "Claudet: Claude.ai Voice Input",
    "description": "Add voice input capability to Claude.ai using Transformers.js and Groq API",
    "version": "0.1.1",
    "permissions": [ "storage"],
    "host_permissions": ["https://api.groq.com/*"],
    "background": {
      "service_worker": "background.js",
      "type": "module"
    },
    "content_scripts": [
      {
        "matches": ["https://claude.ai/*"],
        "js": ["content.js"]
      }
    ],
    "action": {
      "default_popup": "popup.html",
      "default_icon": {
        "16": "icon16.png",
        "48": "icon48.png",
        "128": "icon128.png"
      },
      "default_title": "Claudet: Claude.ai Voice Input"
    },
    "options_page": "options.html",
    "content_security_policy": {
      "extension_pages": "script-src 'self' 'wasm-unsafe-eval'; object-src 'self'"
    },
    "web_accessible_resources": [
      {
        "resources": ["icon16.png", "icon48.png", "icon128.png"],
        "matches": ["https://claude.ai/*"]
      }
    ],
    "icons": {
      "16": "icon16.png",
      "48": "icon48.png",
      "128": "icon128.png"
    },
    "minimum_chrome_version": "92"
  }
```

# public\icon48.png

This is a binary file of the type: Image

# public\icon16.png

This is a binary file of the type: Image

# public\icon128.png

This is a binary file of the type: Image

# public\icon.svg

This is a file of the type: SVG Image

# public\background.html

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="background.js"></script>
</head>
</html>
```

