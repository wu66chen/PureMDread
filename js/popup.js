document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const openFileBtn = document.getElementById('openFile');

  // 加载保存的设置
  chrome.storage.local.get(['darkMode'], function(result) {
    darkModeToggle.checked = result.darkMode || false;
  });

  // 暗色模式切换
  darkModeToggle.addEventListener('change', function() {
    chrome.storage.local.set({ darkMode: this.checked }, function() {
      // 通知所有标签页更新主题
      chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab) {
          if (tab.url && (tab.url.endsWith('.md') || tab.url.endsWith('.markdown') || 
              tab.url.endsWith('.mdown') || tab.url.endsWith('.mkd'))) {
            chrome.tabs.sendMessage(tab.id, { action: 'toggleTheme' });
          }
        });
      });
    });
  });

  // 打开文件
  openFileBtn.addEventListener('click', function() {
    chrome.tabs.create({ url: 'chrome://file-manager/' });
  });
});
