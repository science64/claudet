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
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9DbGF1ZGV0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0NsYXVkZXQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9DbGF1ZGV0Ly4vc3JjL3BvcHVwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgbW9kZWxTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kZWxTZWxlY3QnKTtcbiAgICBjb25zdCBncm9xQXBpS2V5Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dyb3FBcGlLZXlDb250YWluZXInKTtcbiAgICBjb25zdCBvcGVuYWlBcGlLZXlDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3BlbmFpQXBpS2V5Q29udGFpbmVyJyk7XG4gICAgY29uc3QgZ3JvcUFwaUtleUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dyb3FBcGlLZXknKTtcbiAgICBjb25zdCBvcGVuYWlBcGlLZXlJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuYWlBcGlLZXknKTtcbiAgICBjb25zdCBzYXZlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmVCdXR0b24nKTtcblxuICAgIC8vIExvYWQgc2F2ZWQgc2V0dGluZ3NcbiAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChbJ21vZGVsJywgJ2dyb3FBcGlLZXknLCAnb3BlbmFpQXBpS2V5J10sIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICBpZiAocmVzdWx0Lm1vZGVsKSB7XG4gICAgICAgICAgICBtb2RlbFNlbGVjdC52YWx1ZSA9IHJlc3VsdC5tb2RlbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzdWx0Lmdyb3FBcGlLZXkpIHtcbiAgICAgICAgICAgIGdyb3FBcGlLZXlJbnB1dC52YWx1ZSA9IHJlc3VsdC5ncm9xQXBpS2V5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHQub3BlbmFpQXBpS2V5KSB7XG4gICAgICAgICAgICBvcGVuYWlBcGlLZXlJbnB1dC52YWx1ZSA9IHJlc3VsdC5vcGVuYWlBcGlLZXk7XG4gICAgICAgIH1cbiAgICAgICAgdG9nZ2xlQXBpS2V5VmlzaWJpbGl0eSgpO1xuICAgIH0pO1xuXG4gICAgLy8gQ2hlY2sgaWYgV2ViR1BVIG1vZGVsIGZhaWxlZCB0byBsb2FkXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFsnbW9kZWxMb2FkRXJyb3InXSwgZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHQubW9kZWxMb2FkRXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHdlYmdwdU9wdGlvbiA9IG1vZGVsU2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJ29wdGlvblt2YWx1ZT1cIndlYmdwdVwiXScpO1xuICAgICAgICAgICAgaWYgKHdlYmdwdU9wdGlvbikge1xuICAgICAgICAgICAgICAgIHdlYmdwdU9wdGlvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgd2ViZ3B1T3B0aW9uLnRleHQgKz0gXCIgKHVuYXZhaWxhYmxlKVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1vZGVsU2VsZWN0LnZhbHVlID09PSAnd2ViZ3B1Jykge1xuICAgICAgICAgICAgICAgIG1vZGVsU2VsZWN0LnZhbHVlID0gJ2dyb3EnO1xuICAgICAgICAgICAgICAgIHRvZ2dsZUFwaUtleVZpc2liaWxpdHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgbW9kZWxTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdG9nZ2xlQXBpS2V5VmlzaWJpbGl0eSk7XG5cbiAgICBzYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gbW9kZWxTZWxlY3QudmFsdWU7XG4gICAgICAgIGNvbnN0IGdyb3FBcGlLZXkgPSBncm9xQXBpS2V5SW5wdXQudmFsdWU7XG4gICAgICAgIGNvbnN0IG9wZW5haUFwaUtleSA9IG9wZW5haUFwaUtleUlucHV0LnZhbHVlO1xuXG4gICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtcbiAgICAgICAgICAgIG1vZGVsOiBtb2RlbCxcbiAgICAgICAgICAgIGdyb3FBcGlLZXk6IGdyb3FBcGlLZXksXG4gICAgICAgICAgICBvcGVuYWlBcGlLZXk6IG9wZW5haUFwaUtleVxuICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTZXR0aW5ncyBzYXZlZCcpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmVSZXNwb25zZScpLnRleHRDb250ZW50ID0gJ1NldHRpbmdzIHNhdmVkLic7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHdpbmRvdy5jbG9zZSgpLCAxMDAwKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVBcGlLZXlWaXNpYmlsaXR5KCkge1xuICAgICAgICBncm9xQXBpS2V5Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBtb2RlbFNlbGVjdC52YWx1ZSA9PT0gJ2dyb3EnID8gJ2Jsb2NrJyA6ICdub25lJztcbiAgICAgICAgb3BlbmFpQXBpS2V5Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBtb2RlbFNlbGVjdC52YWx1ZSA9PT0gJ29wZW5haScgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgIH1cbn0pOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==