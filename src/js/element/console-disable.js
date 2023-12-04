window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });
  // Disable F12 key and Ctrl+Shift+I
  window.addEventListener('keydown', function (e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
      e.preventDefault();
    }
  });

  console.log(
        '%cPlease connect with a valid API key...! 🔑',
        'color: #f709bb; font-family: sans-serif; text-decoration: underline; font-size: 4rem; -webkit-text-stroke: 1px black; font-weight: bold'
      );