# Custom Text Selection Color

**Custom Text Selection Color** — 一款可自訂網頁文字反白顏色，並可選擇解除右鍵與文字選取限制的 Chrome 擴充套件。

---

## 📖 功能說明
這個擴充套件可以讓使用者自訂網頁文字反白（選取）的背景顏色，並可選擇解除部分網站的右鍵與文字選取限制。  

### 主要功能
1. **自訂文字選取顏色**  
   - 在任何網站中選取文字時，將背景色改成使用者在設定中選擇的顏色（預設為 `#3390FF` 藍色）。
2. **解除網頁防護限制（可選）**  
   - 移除阻止右鍵、禁止選取、禁止複製的事件監聽。
   - 將 `user-select` 樣式改為 `auto`，允許文字被選取。
   - 移除 `pointer-events: none` 遮罩，避免透明層阻擋右鍵操作。

---

## 🛠 使用方式
1. 安裝並啟用此擴充套件。
2. 點擊擴充套件圖示，打開設定視窗。
3. 選擇想要的文字反白顏色。
4. 勾選「解除右鍵鎖定」以啟用解除限制功能（可選）。
5. 設定會自動儲存在 Chrome Sync Storage 中。

---

## 🔑 權限
- **`storage`**：儲存使用者的設定值。
- **`activeTab` / `scripting`**：在目前開啟的頁面中注入修改樣式與解鎖的程式碼。

---

## 📂 專案結構
manifest.json # 擴充套件設定檔
popup.html # 設定視窗 HTML
popup.js # 處理顏色選擇與選項儲存
content.js # 修改選取顏色與解除網頁防護
background.js # Service Worker（可擴充）
icon.png # 擴充套件圖示

## 說明整理
ChatGPT 5