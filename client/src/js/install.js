const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Event handler for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Store the event
    window.deferredPrompt = event;

    // Remove the 'hidden' class from the btn
    butInstall.classList.toggle('hidden', false);
});

// Implementing a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }

    // Propmt
    promptEvent.prompt();

    butInstall.classList.toggle('hidden', true);
});

// A handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Clear the prompt
    window.deferredPrompt = null;
});
