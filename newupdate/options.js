/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/options.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3Qyx5Q0FBeUMsSUFBSSxTQUFTO0FBQzlGO0FBQ0EsaUJBQWlCO0FBQ2pCLGNBQWM7QUFDZDtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9DbGF1ZGV0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0NsYXVkZXQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9DbGF1ZGV0Ly4vc3JjL29wdGlvbnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBtb2RlbFNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RlbFNlbGVjdCcpO1xuICAgIGNvbnN0IGFwaUtleUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcGlfc2VjdGlvbicpO1xuICAgIGNvbnN0IGdyb3FBcGlLZXlJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncm9xQXBpS2V5Jyk7XG4gICAgY29uc3Qgb3BlbmFpQXBpS2V5SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3BlbmFpQXBpS2V5Jyk7XG4gICAgY29uc3Qgc2F2ZVNldHRpbmdzQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmVTZXR0aW5ncycpO1xuICAgIGNvbnN0IG1lc3NhZ2VMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2VMaXN0Jyk7XG4gICAgY29uc3QgZ3JvcUFwaUtleUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncm9xQXBpS2V5Q29udGFpbmVyJyk7XG4gICAgY29uc3Qgb3BlbmFpQXBpS2V5Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW5haUFwaUtleUNvbnRhaW5lcicpO1xuXG4gICAgLy8gTG9hZCBhbmQgZGlzcGxheSBzZXR0aW5nc1xuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFsnbW9kZWwnLCAnZ3JvcUFwaUtleScsICdvcGVuYWlBcGlLZXknXSwgZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHQubW9kZWwpIHtcbiAgICAgICAgICAgIG1vZGVsU2VsZWN0LnZhbHVlID0gcmVzdWx0Lm1vZGVsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHQuZ3JvcUFwaUtleSkge1xuICAgICAgICAgICAgZ3JvcUFwaUtleUlucHV0LnZhbHVlID0gcmVzdWx0Lmdyb3FBcGlLZXk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdC5vcGVuYWlBcGlLZXkpIHtcbiAgICAgICAgICAgIG9wZW5haUFwaUtleUlucHV0LnZhbHVlID0gcmVzdWx0Lm9wZW5haUFwaUtleTtcbiAgICAgICAgfVxuICAgICAgICB0b2dnbGVBcGlLZXlWaXNpYmlsaXR5KCk7XG4gICAgfSk7XG5cbiAgICAvLyBUb2dnbGUgQVBJIGtleSBpbnB1dCB2aXNpYmlsaXR5IGJhc2VkIG9uIHNlbGVjdGVkIG1vZGVsXG4gICAgZnVuY3Rpb24gdG9nZ2xlQXBpS2V5VmlzaWJpbGl0eSgpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRNb2RlbCA9IG1vZGVsU2VsZWN0LnZhbHVlO1xuICAgICAgICBpZiAoc2VsZWN0ZWRNb2RlbCAhPT0gJ2dyb3EnICYmIHNlbGVjdGVkTW9kZWwgIT09ICdvcGVuYWknKSB7XG4gICAgICAgICAgICBhcGlLZXlDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhcGlLZXlDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIGdyb3FBcGlLZXlDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IHNlbGVjdGVkTW9kZWwgPT09ICdncm9xJyA/ICdibG9jaycgOiAnbm9uZSc7XG4gICAgICAgIG9wZW5haUFwaUtleUNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gc2VsZWN0ZWRNb2RlbCA9PT0gJ29wZW5haScgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgIH1cblxuICAgIG1vZGVsU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRvZ2dsZUFwaUtleVZpc2liaWxpdHkpO1xuXG4gICAgLy8gU2F2ZSBzZXR0aW5nc1xuICAgIHNhdmVTZXR0aW5nc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBtb2RlbCA9IG1vZGVsU2VsZWN0LnZhbHVlO1xuICAgICAgICBjb25zdCBncm9xQXBpS2V5ID0gZ3JvcUFwaUtleUlucHV0LnZhbHVlO1xuICAgICAgICBjb25zdCBvcGVuYWlBcGlLZXkgPSBvcGVuYWlBcGlLZXlJbnB1dC52YWx1ZTtcblxuICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7XG4gICAgICAgICAgICBtb2RlbDogbW9kZWwsXG4gICAgICAgICAgICBncm9xQXBpS2V5OiBncm9xQXBpS2V5LFxuICAgICAgICAgICAgb3BlbmFpQXBpS2V5OiBvcGVuYWlBcGlLZXlcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhbGVydCgnU2V0dGluZ3Mgc2F2ZWQgc3VjY2Vzc2Z1bGx5IScpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIExvYWQgYW5kIGRpc3BsYXkgbWVzc2FnZXNcbiAgICBmdW5jdGlvbiBsb2FkTWVzc2FnZXMoKSB7XG4gICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbJ21lc3NhZ2VzJ10sIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5tZXNzYWdlcyAmJiByZXN1bHQubWVzc2FnZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VMaXN0LmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5tZXNzYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKG1zZykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICAgICAgICAgIGxpLnRleHRDb250ZW50ID0gYCR7bmV3IERhdGUobXNnLnRpbWVzdGFtcCkudG9Mb2NhbGVTdHJpbmcoKX06ICR7bXNnLnRleHR9YDtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZUxpc3QuYXBwZW5kQ2hpbGQobGkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlTGlzdC5pbm5lckhUTUwgPSAnPGxpPk5vIG1lc3NhZ2VzIHlldC48L2xpPic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvYWRNZXNzYWdlcygpO1xuXG4gICAgLy8gUmVmcmVzaCBtZXNzYWdlcyBldmVyeSA1IHNlY29uZHNcbiAgICBzZXRJbnRlcnZhbChsb2FkTWVzc2FnZXMsIDUwMDApO1xufSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9