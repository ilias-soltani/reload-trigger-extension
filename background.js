browser.commands.onCommand.addListener(async (command) => {
  if (command !== "trigger-reload") return;

  const [tab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!tab?.id) return;

  try {
    const results = await browser.scripting.executeScript({
      target: { tabId: tab.id },
      func: reloadLesson,
    });

    console.log("Reload result:", results[0]?.result);
  } catch (error) {
    console.error("Injection failed:", error);
  }
});

function reloadLesson() {
  const reloadButton = document.querySelector(
    'div[aria-label="Restart the lesson"]',
  );
  if (reloadButton) {
    reloadButton.click();
    return { ok: true, message: "Lesson reloaded successfully" };
  }
  return { ok: false, message: "Reload button not found" };
}
