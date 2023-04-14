export let currentFocusedElement = null;

export function focusTrappedInsideModal(container) {
    currentFocusedElement = document.activeElement;
    const focusableElements = "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";
    const getModal = document.querySelector(container);

    const firstFocusableElement = getModal.querySelectorAll(focusableElements)[0]; 
    const focusableContent = getModal.querySelectorAll(focusableElements);
    // const middleFocusableElement = getModal.querySelectorAll(focusableElements)[1]; 
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; 

    document.addEventListener("keydown", function(e) {
        let isTabPressed = e.key === "Tab";

        if (!isTabPressed) {
            return;
        }

        if (e.shiftKey) { 
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus(); 
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableElement) { 
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    });

    firstFocusableElement.focus();
}
