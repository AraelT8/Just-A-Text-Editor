const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('hit')
    console.log("event" + event)
    event.preventDefault();
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;

    // Update UI notify the user they can install the PWA
    butInstall.classList.toggle('hidden', false);
});

// install button logic 
butInstall.addEventListener('click', async () => {
    // Hide the app provided install promotion
    const promptEvent = window.deferredPrompt;
    // Hide the install button
    if(!promptEvent){
        return;
    }
// Show the install prompt
    promptEvent.prompt();

    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden',true);

});

// app installed logic
window.addEventListener('appinstalled', (event) => {
    console.log('install hit');
    window.deferredPrompt = null;
});
