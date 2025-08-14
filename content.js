chrome.storage.sync.get(["color", "unlock"], (result) => {
  const color = result.color || "#3390FF";

  // 插入選取樣式
  const insertStyle = () => {
    const head = document.head || document.getElementsByTagName("head")[0];
    if (!head) return;

    if (document.getElementById("custom-selection-style")) return;

    const style = document.createElement("style");
    style.id = "custom-selection-style";
    style.innerHTML = `
      ::selection {
        background: ${color} !important;
        color: white;
      }
    `;
    head.appendChild(style);
  };

  // 解鎖防護（右鍵、選取等）
  const unlockProtection = () => {
    const unblockEvents = [
      "contextmenu",
      "selectstart",
      "copy",
      "cut",
      "mousedown",
    ];

    // 移除 HTML 上內建的事件屬性
    const elements = [document, document.documentElement, document.body];
    elements.forEach((el) => {
      if (!el) return;
      unblockEvents.forEach((evt) => {
        el[`on${evt}`] = null;
      });
    });

    // 停用事件的 capture 捕捉
    unblockEvents.forEach((evt) => {
      document.addEventListener(
        evt,
        (e) => {
          e.stopImmediatePropagation();
          e.stopPropagation();
          // 特別對 contextmenu 取消預設（右鍵選單）
          if (evt === "contextmenu") {
            e.preventDefault();
          }
        },
        true
      ); // useCapture: true
    });

    // 嘗試解除 user-select 限制
    document.body.style.setProperty("user-select", "auto", "important");
    document.documentElement.style.setProperty(
      "user-select",
      "auto",
      "important"
    );
  };

  // 等待 head 出現再插入樣式
  if (document.head) {
    insertStyle();
  } else {
    const headObserver = new MutationObserver(() => {
      if (document.head) {
        insertStyle();
        headObserver.disconnect();
      }
    });
    headObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  // 等待 body 出現再解鎖
  if (result.unlock) {
    const checkAndUnlock = () => {
      if (document.body) {
        unlockProtection();
      } else {
        requestAnimationFrame(checkAndUnlock); // Check again on the next animation frame
      }
    };
    checkAndUnlock();
  }

  // 強制解除 pointer-events 禁用（部分網站用遮罩防右鍵）
  document.querySelectorAll("*").forEach(el => {
    const style = window.getComputedStyle(el);
    if (style.pointerEvents === "none") {
      el.style.setProperty("pointer-events", "auto", "important");
    }
  });
});
