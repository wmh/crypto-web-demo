# 🚀 部署說明

## ✅ 已完成部署

專案已成功部署到 GitHub！

### 📍 連結

- **GitHub Repository**: https://github.com/wmh/crypto-web-demo
- **GitHub Pages**: https://wmh.github.io/crypto-web-demo/
- **Main Branch**: https://github.com/wmh/crypto-web-demo/tree/main
- **gh-pages Branch**: https://github.com/wmh/crypto-web-demo/tree/gh-pages

## 🔧 GitHub Pages 設定

### 自動啟用 (推薦)

GitHub 應該會自動偵測到 `gh-pages` 分支並啟用 Pages。如果沒有，請手動設定：

1. 前往 https://github.com/wmh/crypto-web-demo/settings/pages
2. 在 **Source** 下選擇：
   - Branch: `gh-pages`
   - Folder: `/ (root)`
3. 點擊 **Save**
4. 等待 1-2 分鐘，網站將部署到：
   ```
   https://wmh.github.io/crypto-web-demo/
   ```

### 檢查部署狀態

```bash
# 查看 Actions 執行狀態
https://github.com/wmh/crypto-web-demo/actions
```

## 📝 專案描述

為了更好的展示，建議在 GitHub 設定以下內容：

### Repository Description

```
🔐 互動式加密演算法與區塊鏈簽名範例 - 支援 Ethereum、Bitcoin、Solana、Cosmos、Tron、Polkadot，配備 VS Code 語法高亮
```

### Website URL

```
https://wmh.github.io/crypto-web-demo/
```

### Topics

在 Repository 頁面點擊 ⚙️ 設定 Topics：

```
cryptography, blockchain, ethereum, bitcoin, solana, 
polkadot, cosmos, tron, web3, cryptocurrency, wallet, 
signature, demo, tutorial, javascript, frontend, 
prismjs, education, interactive
```

## 🎯 更新部署

當您修改代碼後，執行以下步驟更新網站：

```bash
# 1. 提交更改
git add .
git commit -m "Update: description of changes"

# 2. 推送到 main 分支
git push origin main

# 3. 更新 gh-pages 分支
git checkout gh-pages
git merge main
git push origin gh-pages

# 4. 切回 main 分支
git checkout main
```

### 自動化腳本

創建 `deploy.sh` 腳本自動部署：

```bash
#!/bin/bash
echo "🚀 開始部署..."

# 提交更改
git add .
echo "📝 請輸入 commit 訊息："
read commit_msg
git commit -m "$commit_msg"

# 推送到 main
git push origin main
echo "✅ main 分支已更新"

# 更新 gh-pages
git checkout gh-pages
git merge main
git push origin gh-pages
echo "✅ gh-pages 分支已更新"

# 切回 main
git checkout main
echo "🎉 部署完成！"
echo "🌐 網站將在 1-2 分鐘後更新："
echo "   https://wmh.github.io/crypto-web-demo/"
```

使用方法：
```bash
chmod +x deploy.sh
./deploy.sh
```

## 🔍 故障排除

### 網站顯示 404

1. 確認 GitHub Pages 已啟用
2. 檢查分支名稱是否為 `gh-pages`
3. 確認 `index.html` 在根目錄
4. 等待 2-5 分鐘讓 GitHub 處理

### 樣式或腳本載入失敗

如果路徑有問題，可能需要調整：

```html
<!-- 如果使用自訂域名，保持相對路徑 -->
<link rel="stylesheet" href="styles/common.css">

<!-- 如果在子目錄，可能需要添加基礎路徑 -->
<link rel="stylesheet" href="/crypto-web-demo/styles/common.css">
```

目前專案使用相對路徑，應該可以正常運作。

### 檢查部署日誌

```bash
# 查看最近的 commit
git log --oneline -5

# 查看遠程分支
git branch -r

# 強制重新部署
git checkout gh-pages
git commit --allow-empty -m "Trigger rebuild"
git push origin gh-pages
git checkout main
```

## 📊 部署統計

- **總檔案數**: 28 個
- **程式碼行數**: 5,197+ 行
- **支援區塊鏈**: 6 個
- **程式碼範例**: 29+ 個
- **部署方式**: GitHub Pages
- **建置時間**: ~1-2 分鐘

## 🎉 完成！

您的專案現在可以透過以下方式訪問：

1. **直接訪問**: https://wmh.github.io/crypto-web-demo/
2. **GitHub 查看**: https://github.com/wmh/crypto-web-demo
3. **分享連結**: 複製上述任一連結分享給他人

享受您的互動式加密演算法與區塊鏈簽名展示專案！🚀✨
