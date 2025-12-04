# 🎨 語法高亮功能說明

## ✨ 新增功能

專案現已使用 **Prism.js** 提供專業的語法高亮顯示，採用 VS Code Dark+ 主題風格。

## 🎯 功能特色

### 1. 專業主題
- **配色方案**: VS Code Dark+ / Tomorrow Night
- **背景色**: 深色 (#282c34)
- **字體**: Fira Code, Monaco, Courier New
- **行高**: 1.6 (更易閱讀)

### 2. 語法高亮顏色

| 元素 | 顏色 | 範例 |
|------|------|------|
| 註解 | 灰色 (#5c6370) | `// 註解` |
| 字串 | 綠色 (#98c379) | `"Hello"` |
| 關鍵字 | 紫色 (#c678dd) | `const`, `function` |
| 函數 | 藍色 (#61afef) | `SHA256()` |
| 數字 | 橘色 (#d19a66) | `256`, `0x41` |
| 變數 | 紅色 (#e06c75) | `input`, `hash` |
| 運算符 | 青色 (#56b6c2) | `=>`, `+` |

### 3. UI 改進

#### 程式碼區塊
```
┌─────────────────────────────────────┐
│ { } JavaScript 範例     [複製]      │  ← 深色標題列
├─────────────────────────────────────┤
│ const hash = SHA256(input);         │
│ console.log(hash);                  │  ← 語法高亮
└─────────────────────────────────────┘
```

#### 複製按鈕
- **預設狀態**: 灰色按鈕 (#3e4451)
- **懸停效果**: 藍色邊框 (#61afef)
- **已複製**: 綠色背景 (#98c379)

### 4. 視覺效果

**程式碼區塊特點**:
- ✅ 深色背景，保護眼睛
- ✅ 清晰的語法顏色
- ✅ 代碼圖標 `{ }` 前綴
- ✅ 陰影效果，增強層次
- ✅ 圓角設計，現代感

## 📋 技術實現

### 使用的技術

1. **Prism.js v1.29.0**
   - 輕量級語法高亮庫
   - 支援多種語言
   - 可擴展主題

2. **自訂 CSS**
   - VS Code Dark+ 配色
   - Tomorrow Night 主題變體
   - 優化的字體和間距

### 引入方式

每個頁面自動包含：

```html
<!-- CSS -->
<link rel="stylesheet" href="../styles/common.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">

<!-- JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js"></script>
```

### 代碼標記

```html
<pre><code class="language-javascript">
const wallet = ethers.Wallet.createRandom();
console.log(wallet.address);
</code></pre>
```

## 🎨 顏色參考

### VS Code Dark+ 配色

```css
背景色:    #282c34  /* 主背景 */
標題欄:    #21252b  /* 深色標題 */
文字色:    #abb2bf  /* 主要文字 */
邊框色:    #3e4451  /* 分隔線 */

語法高亮:
- 註解:    #5c6370  /* 灰色 */
- 字串:    #98c379  /* 綠色 */
- 關鍵字:  #c678dd  /* 紫色 */
- 函數:    #61afef  /* 藍色 */
- 數字:    #d19a66  /* 橘色 */
- 變數:    #e06c75  /* 紅色 */
- 運算符:  #56b6c2  /* 青色 */
```

## 📝 範例展示

### 之前 (無語法高亮)
```
const input = "Hello";
const hash = CryptoJS.SHA256(input).toString();
console.log(hash);
```
- ❌ 單色文字
- ❌ 無法區分元素
- ❌ 閱讀困難

### 之後 (有語法高亮)
- ✅ `const` 顯示為紫色
- ✅ `"Hello"` 顯示為綠色
- ✅ `SHA256` 顯示為藍色
- ✅ 註解顯示為灰色
- ✅ 清晰易讀

## 🚀 使用方式

### 查看效果

1. 開啟任一範例頁面
2. 找到程式碼區塊
3. 觀察語法高亮效果

### 複製程式碼

1. 點擊右上角「複製」按鈕
2. 按鈕變為綠色「已複製！」
3. 程式碼已複製到剪貼簿

## 💡 優點

### 1. 提升可讀性
- 顏色區分不同語法元素
- 一眼識別變數、函數、字串
- 減少閱讀錯誤

### 2. 專業外觀
- 類似 VS Code 的體驗
- 現代化的深色主題
- 專業開發者風格

### 3. 學習友善
- 新手容易理解程式結構
- 顏色提示語法錯誤
- 更好的學習體驗

### 4. 眼睛友善
- 深色背景減少疲勞
- 適合長時間閱讀
- 夜間使用更舒適

## 🔧 自訂選項

### 更換主題

如需更換主題，修改 CSS 引入：

```html
<!-- Prism 官方主題 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-dark.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-twilight.min.css">
```

### 支援更多語言

```html
<!-- 添加其他語言支援 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-rust.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-go.min.js"></script>
```

## 📊 效能影響

- **Prism.js 核心**: ~2KB (gzipped)
- **JavaScript 語言**: ~1KB (gzipped)
- **CSS 主題**: ~1KB (gzipped)
- **總計**: ~4KB

✅ 極小的體積，幾乎不影響載入速度

## 🎯 覆蓋範圍

✅ **所有 9 個範例頁面**:
- hash.html
- symmetric.html
- asymmetric.html
- ethereum.html
- bitcoin.html
- solana.html
- cosmos.html
- tron.html
- polkadot.html

✅ **總計 29+ 個程式碼區塊**

## 🔗 相關資源

- [Prism.js 官網](https://prismjs.com/)
- [Prism 主題展示](https://prismjs.com/index.html#themes)
- [支援語言列表](https://prismjs.com/index.html#supported-languages)

## 📸 截圖對比

### 之前
- 純白背景
- 單色文字
- 基礎樣式

### 之後
- 深色專業背景
- 多彩語法高亮
- VS Code 風格
- 現代化設計

---

**享受更專業的程式碼閱讀體驗！** 🎨✨
