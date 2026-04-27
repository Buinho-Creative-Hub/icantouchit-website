/* tactile.js — hero headline behaviour for Fingers Read Space
   Splits each [data-tactile] line into per-letter spans and animates a small
   "tactile press" displacement on hover/focus/touch. Respects
   prefers-reduced-motion. */
(function(){
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  var lines = document.querySelectorAll('.h1 [data-tactile]');
  lines.forEach(function(line){
    var text = line.textContent;
    line.textContent = '';
    for (var i=0; i<text.length; i++){
      var c = text.charAt(i);
      if (c === ' '){
        line.appendChild(document.createTextNode(' '));
        continue;
      }
      var s = document.createElement('span');
      s.className = 'ch';
      s.textContent = c;
      line.appendChild(s);
    }
  });

  function press(line, opts){
    if (reduceMotion.matches) return;
    var soft = !!(opts && opts.soft);
    var amp = soft ? 0.5 : 1;
    var chs = line.querySelectorAll('.ch');
    chs.forEach(function(ch, idx){
      var seed = (idx * 9301 + Math.floor(Math.random()*233280)) % 233280;
      var r1 = (seed / 233280);
      var r2 = ((seed * 1.37) % 233280) / 233280;
      var r3 = ((seed * 2.11) % 233280) / 233280;
      var dx = ((r1 - 0.5) * 5 * amp).toFixed(2)  + 'px';
      var dy = ((r2 - 0.5) * 4 * amp).toFixed(2)  + 'px';
      var rz = ((r3 - 0.5) * 3 * amp).toFixed(2) + 'deg';
      var delay = idx * 30;
      setTimeout(function(){
        ch.style.setProperty('--dx', dx);
        ch.style.setProperty('--dy', dy);
        ch.style.setProperty('--rz', rz);
      }, delay);
    });
    line.classList.add('is-touched');
  }

  function release(line){
    line.classList.remove('is-touched');
    var chs = line.querySelectorAll('.ch');
    setTimeout(function(){
      chs.forEach(function(ch){
        ch.style.removeProperty('--dx');
        ch.style.removeProperty('--dy');
        ch.style.removeProperty('--rz');
      });
    }, 520);
  }

  lines.forEach(function(line){
    line.addEventListener('mouseenter', function(){ press(line); });
    line.addEventListener('mouseleave', function(){ release(line); });
    line.addEventListener('focus',      function(){ press(line); });
    line.addEventListener('blur',       function(){ release(line); });
    var touchTimer = null;
    line.addEventListener('touchstart', function(){
      if (touchTimer) clearTimeout(touchTimer);
      press(line, { soft:true });
      touchTimer = setTimeout(function(){ release(line); }, 900);
    }, { passive:true });
  });

  reduceMotion.addEventListener && reduceMotion.addEventListener('change', function(){
    if (reduceMotion.matches){ lines.forEach(release); }
  });
})();
