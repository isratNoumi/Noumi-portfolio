/* Prevent flash of wrong theme by applying the theme class before hydration */
(function () {
  try {
    var stored = localStorage.getItem("noumi-theme");
    var prefersLight =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    var theme = stored || (prefersLight ? "light" : "dark");
    var root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.add("dark");
    }
    root.style.colorScheme = theme;
  } catch (e) {}
})();
