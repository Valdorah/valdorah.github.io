document.addEventListener('DOMContentLoaded', function () {
  let sidenav = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenav, undefined);

  let parallaxItems = document.querySelectorAll('.parallax');
  M.Parallax.init(parallaxItems, undefined);
});