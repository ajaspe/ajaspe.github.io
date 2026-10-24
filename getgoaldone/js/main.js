// Boot: set up the platform, load the save and drop the player straight into a match.

async function boot() {
  await Platform.init();
  Platform.loadingStart();
  loadSave();
  applyStaticTexts();
  updateFullscreenButton();

  // Wait (briefly) for the bundled font so the first frames use it
  if (document.fonts && document.fonts.load) {
    const timeout = new Promise(resolve => setTimeout(resolve, 1500));
    await Promise.race([document.fonts.load("600 20px Fredoka").catch(() => {}), timeout]);
  }

  Platform.loadingStop();
  startMatch("quick");

  // Opened from an invite link: go straight into the friend's room
  const invitedRoom = Platform.invitedRoom();
  if (invitedRoom) {
    pauseGame();
    showMenu("online");
    Net.join(invitedRoom);
  }
  requestAnimationFrame(frame);
}

boot();
