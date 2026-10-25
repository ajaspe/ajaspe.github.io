// Boot: set up the platform, load the save and open the main menu.

async function boot() {
  await Platform.init();
  Platform.loadingStart();
  loadSave();
  applyStaticTexts();
  updateFullscreenButton();
  preloadVoiceClips();

  // Wait (briefly) for the bundled font so the first frames use it
  if (document.fonts && document.fonts.load) {
    const timeout = new Promise(resolve => setTimeout(resolve, 1500));
    await Promise.race([document.fonts.load("600 20px Fredoka").catch(() => {}), timeout]);
  }

  Platform.loadingStop();
  showTitleField();

  // Opened from an invite link: go straight into the friend's room
  const invitedRoom = Platform.invitedRoom();
  if (invitedRoom) {
    showMenu("online");
    Net.join(invitedRoom);
  } else {
    showMenu("main");
  }
  requestAnimationFrame(frame);
}

boot();
