/* Portfolio Hicham HADDI — interactions légères */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Année du pied de page ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Terminal animé ---------- */
  var TERM_LINES = [
    { p: 'hicham@dc01:~$', cmd: 'Get-ADUser -Filter *', out: '128 utilisateurs dans le domaine' },
    { p: 'hicham@dc01:~$', cmd: 'nslookup srv-dc01', out: 'Adresse : 192.168.10.10' },
    { p: 'hicham@dc01:~$', cmd: 'ipconfig /renew', out: 'Bail DHCP : 192.168.10.42' },
    { p: 'hicham@dc01:~$', cmd: 'tcpdump -i eth0 port 53', out: 'DNS query A? www.perdu.com' },
    { p: 'hicham@dc01:~$', cmd: 'echo "Infrastructure: OK"', out: '', ok: 'Infrastructure: OK' }
  ];

  var termBody = document.getElementById('terminal-body');
  var typedEl = document.getElementById('typed');
  var caret = document.getElementById('term-caret');

  function runTerminal() {
    if (!termBody || !typedEl) return;
    var lineIndex = 0;

    function typeCommand(text, i) {
      if (i <= text.length) {
        typedEl.textContent = text.slice(0, i);
        setTimeout(function () { typeCommand(text, i + 1); }, 24 + Math.random() * 26);
      } else {
        setTimeout(showOutput, 350);
      }
    }

    function showOutput() {
      var data = TERM_LINES[lineIndex];
      if (data.out || data.ok) {
        var outLine = document.createElement('span');
        outLine.className = 'terminal__line';
        outLine.innerHTML = '<span class="' + (data.ok ? 'ok' : 'out') + '">' + data.out + '</span>';
        termBody.appendChild(outLine);
        requestAnimationFrame(function () { outLine.classList.add('visible'); });
      }
      lineIndex++;
      if (lineIndex < TERM_LINES.length) {
        var next = TERM_LINES[lineIndex];
        var promptLine = document.createElement('span');
        promptLine.className = 'terminal__line visible';
        promptLine.innerHTML =
          '<span class="p">' + next.p + '</span> <span class="cmd"></span>';
        termBody.appendChild(promptLine);
        typedEl = promptLine.querySelector('.cmd');
        // déplacer le curseur sur la nouvelle ligne
        if (caret) caret.remove();
        var newCaret = document.createElement('span');
        newCaret.className = 'caret';
        newCaret.id = 'term-caret';
        promptLine.appendChild(newCaret);
        caret = newCaret;
        setTimeout(function () { typeCommand(next.cmd, 0); }, 500);
      } else {
        if (caret) caret.style.display = 'inline-block';
      }
    }

    typeCommand(TERM_LINES[0].cmd, 0);
  }

  if (prefersReduced) {
    // Version statique : afficher tout le contenu immédiatement
    if (termBody) {
      termBody.innerHTML = TERM_LINES.map(function (l) {
        return (
          '<span class="terminal__line visible"><span class="p">' + l.p +
          '</span> <span class="cmd">' + l.cmd + '</span></span>' +
          (l.ok
            ? '<span class="terminal__line visible"><span class="ok">' + l.ok + '</span></span>'
            : l.out
              ? '<span class="terminal__line visible"><span class="out">' + l.out + '</span></span>'
              : '')
        );
      }).join('');
    }
  } else {
    runTerminal();
  }

  /* ---------- Apparition au défilement ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- En-tête : ombre au défilement ---------- */
  var header = document.getElementById('header');
  function onScroll() {
    if (header) header.classList.toggle('header--scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Navigation active ---------- */
  var navLinks = document.querySelectorAll('.nav a[data-nav]');
  var sections = Array.prototype.map.call(navLinks, function (a) {
    return document.getElementById(a.getAttribute('data-nav'));
  });

  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var id = e.target.id;
            navLinks.forEach(function (a) {
              var on = a.getAttribute('data-nav') === id;
              if (on) a.setAttribute('aria-current', 'true');
              else a.removeAttribute('aria-current');
            });
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    sections.forEach(function (s) { if (s) sectionObserver.observe(s); });
  }
})();
