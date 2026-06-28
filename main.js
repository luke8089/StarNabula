gsap.registerPlugin(ScrollTrigger);

/* ── THEME TOGGLE ── */
(function() {
  const btn = document.getElementById('theme-btn');
  const html = document.documentElement;
  btn.addEventListener('click', () => {
    const isLight = html.getAttribute('data-theme') === 'light';
    if (isLight) {
      html.removeAttribute('data-theme');
      localStorage.setItem('snb-theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
      localStorage.setItem('snb-theme', 'light');
    }
  });
})();

/* ── LOADER ── */
const ldFill = document.getElementById('ld-fill');
const ldNum  = document.getElementById('ld-num');
const ldEl   = document.getElementById('loader');

function dismissLoader() {
  gsap.to(ldEl, { opacity:0, duration:.45, ease:'power2.inOut', onComplete(){ ldEl.style.display='none'; }});
  boot();
}

if (sessionStorage.getItem('snb-v')) {
  ldEl.style.display = 'none';
  boot();
} else {
  sessionStorage.setItem('snb-v', '1');
  ldFill.style.transition = 'width 0.14s linear';
  ldFill.style.width = '100%';
  ldNum.textContent = '100';
  setTimeout(dismissLoader, 180);
}

/* ── FEATURED WORK ROTATION ── */
(function() {
  var projects = [
    {
      img: 'images/projects/covercloud.jpeg',
      alt: 'Cover Cloud Limited',
      href: 'https://www.covercloudlimited.com/',
      heroLabel: 'Cover Cloud Limited',
      smallLabel: 'Cover Cloud'
    },
    {
      img: 'images/projects/click-and-go.jpeg',
      alt: 'Click and Go',
      href: 'https://clickandgoauto.com/',
      heroLabel: 'Click and Go',
      smallLabel: 'Click and Go'
    },
    {
      img: 'images/projects/qibla%20homes.png',
      alt: 'Qibla Homes',
      href: 'https://qiblahomesltd.com/',
      heroLabel: 'Qibla Homes',
      smallLabel: 'Qibla Homes'
    }
  ];

  var key = 'snb-work-lead';
  var last = parseInt(localStorage.getItem(key) || '2', 10);
  var leadIdx = (last + 1) % 3;
  localStorage.setItem(key, String(leadIdx));

  var hero   = projects[leadIdx];
  var small1 = projects[(leadIdx + 1) % 3];
  var small2 = projects[(leadIdx + 2) % 3];

  var heroImg   = document.getElementById('work-hero-img');
  var heroWrap  = document.getElementById('work-hero-wrap');
  var heroLabel = document.getElementById('work-hero-label');
  var heroLink  = document.getElementById('work-hero-link');
  if (heroImg)   { heroImg.src = hero.img; heroImg.alt = hero.alt; }
  if (heroWrap)  heroWrap.dataset.href = hero.href;
  if (heroLabel) heroLabel.textContent = hero.heroLabel;
  if (heroLink)  heroLink.href = hero.href;

  var smallImg   = document.getElementById('work-small-img');
  var smallWrap  = document.getElementById('work-small-wrap');
  var smallLabel = document.getElementById('work-small-label');
  var smallLink  = document.getElementById('work-small-link');
  if (smallImg)   { smallImg.src = small1.img; smallImg.alt = small1.alt; }
  if (smallWrap)  smallWrap.dataset.href = small1.href;
  if (smallLabel) smallLabel.textContent = small1.smallLabel;
  if (smallLink)  smallLink.href = small1.href;

  var small2Img   = document.getElementById('work-small2-img');
  var small2Wrap  = document.getElementById('work-small2-wrap');
  var small2Label = document.getElementById('work-small2-label');
  var small2Link  = document.getElementById('work-small2-link');
  if (small2Img)   { small2Img.src = small2.img; small2Img.alt = small2.alt; }
  if (small2Wrap)  small2Wrap.dataset.href = small2.href;
  if (small2Label) small2Label.textContent = small2.smallLabel;
  if (small2Link)  small2Link.href = small2.href;
})();

/* ── CURSOR (desktop only) ── */
if (window.matchMedia('(pointer:fine)').matches) {
  const cur  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
  (function t(){ rx+=(mx-rx)*.13; ry+=(my-ry)*.13; cur.style.cssText+=`;left:${mx}px;top:${my}px`; ring.style.cssText+=`;left:${rx}px;top:${ry}px`; requestAnimationFrame(t); })();
  document.querySelectorAll('a,button').forEach(el => {
    el.addEventListener('mouseenter', ()=>{ ring.style.width='52px'; ring.style.height='52px'; ring.style.borderColor='rgba(26,143,227,.5)'; });
    el.addEventListener('mouseleave', ()=>{ ring.style.width=''; ring.style.height=''; ring.style.borderColor=''; });
  });
}

/* ── FOOTER YEAR ── */
document.getElementById('footer-year').textContent = new Date().getFullYear();

/* ── PROGRESS BAR ── */
gsap.to('#progress',{ scaleX:1, ease:'none', scrollTrigger:{ scrub:.3, start:'top top', end:'bottom bottom' }});

function boot() {
  setTimeout(startCreativeRoll, 1500);

  /* Click on CREATIVE triggers the roll immediately */
  document.getElementById('creative-h2').addEventListener('click', () => {
    startCreativeRoll();
  });

  /* nav flow */
  const navLogo    = document.querySelector('#main-nav > a');
  const navLinks   = document.querySelectorAll('#main-nav .hidden.md\\:flex > *');
  const navActions = document.querySelector('#main-nav > div');
  gsap.timeline({ defaults:{ ease:'power3.out' }})
    .to('#main-nav',   { opacity:1, duration:.01 })
    .fromTo(navLogo,   { opacity:0, x:-18 }, { opacity:1, x:0, duration:.65 }, 0)
    .fromTo(navLinks,  { opacity:0, y:-14 }, { opacity:1, y:0, duration:.55, stagger:.07 }, .1)
    .fromTo(navActions,{ opacity:0, x:18  }, { opacity:1, x:0, duration:.65 }, .1);

  /* hero lines */
  gsap.set('#bridge-e', { rotation: 0 });
  gsap.timeline({ defaults:{ ease:'power4.out' }})
    .fromTo('#hl1',
      { y:'110%' },
      { y:'0%', duration:1.1, ease:'power3.out' })
    .fromTo('#hl2',
      { clipPath:'inset(0 0 0 88%)', x:24 },
      { clipPath:'inset(0 0 0 0%)',  x:0, duration:1.15, ease:'power3.out' },
    '-=.7')
    .add('bridgeRevealed')
    .from('#hero-content .idx',{ opacity:0, y:24, stagger:.1, duration:.8 },'-=.4')
    .fromTo('#hero-tagline',
      { clipPath:'inset(0 100% 0 0)', opacity:1 },
      { clipPath:'inset(0 0% 0 0)',   duration:1.1, ease:'power2.inOut' },
    '-=.5')
    .add(() => {
      gsap.timeline({ defaults:{ ease:'sine.inOut' } })
        .to('#bridge-e', { rotation:  24, duration: 0.42, ease:'power2.out' })
        .to('#bridge-e', { rotation: -17, duration: 1.05 })
        .to('#bridge-e', { rotation:  13, duration: 1.05 })
        .to('#bridge-e', { rotation:  -9, duration: 1.1  })
        .to('#bridge-e', { rotation:   6, duration: 1.15 })
        .to('#bridge-e', { rotation:  -4, duration: 1.2  })
        .to('#bridge-e', { rotation:   2, duration: 1.3  })
        .to('#bridge-e', { rotation:  -1, duration: 1.5  })
        .to('#bridge-e', { rotation:   0, duration: 1.8, ease:'power1.out', onComplete: startEIdle });
    }, 'bridgeRevealed+=0.05');

  /* hero visual panel entry */
  gsap.fromTo('#hero-visual',
    { opacity:0, x:28 },
    { opacity:1, x:0, duration:1.1, ease:'power3.out', delay:0.25 });
  gsap.fromTo('.hv-text',
    { opacity:0, y:22 },
    { opacity:1, y:0, duration:0.9, ease:'power3.out', delay:0.72, clearProps:'transform' });

  /* hero bg parallax on scroll */
  gsap.to('#hero-bg',{ y:100, ease:'none', scrollTrigger:{ trigger:'#hero', scrub:1.2, start:'top top', end:'bottom top' }});

  /* ── scroll stacking: hero dims as manifesto card slides over ── */
  gsap.to('#hero-content', {
    scale: 0.88, opacity: 0, y: -30,
    ease: 'none',
    scrollTrigger: { trigger:'#manifesto-card', start:'top bottom', end:'top top', scrub:1.4 }
  });
  gsap.to('#hero-bg', {
    scale: 1.12, opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger:'#manifesto-card', start:'top bottom', end:'top top', scrub:1 },
    overwrite: false
  });
  gsap.fromTo('#hero-visual',
    { opacity:1, x:0 },
    { opacity:0, x:18,
      ease:'none',
      scrollTrigger:{ trigger:'#manifesto-card', start:'top bottom', end:'top top', scrub:1.1 }
    });
  /* manifesto card lifts in with a subtle scale */
  gsap.fromTo('#manifesto-card',
    { scale: 0.96 },
    { scale: 1, ease:'none',
      scrollTrigger: { trigger:'#manifesto-card', start:'top bottom', end:'top top', scrub:1.2 }
    });

  /* hero bg mouse drift */
  document.addEventListener('mousemove', e => {
    const dx=(e.clientX/innerWidth-.5)*18, dy=(e.clientY/innerHeight-.5)*14;
    gsap.to('#hero-bg',{ x:dx, y:dy, duration:1.1, ease:'power1.out', overwrite:'auto' });
  });

  /* scroll hint fade */
  gsap.to('#scroll-hint',{ opacity:0, scrollTrigger:{ trigger:'#hero', start:'50% top', end:'bottom top', scrub:true }});

  /* generic scroll reveals */
  gsap.utils.toArray('.r-up').forEach(el => gsap.fromTo(el,
    { opacity:0, y:44 },
    { opacity:1, y:0, duration:.85, ease:'power3.out', scrollTrigger:{ trigger:el, start:'top 90%', toggleActions:'play none none none' }}));

  /* about image — split curtain reveal (left half top→bottom, right half bottom→top) */
  gsap.timeline({
    scrollTrigger:{ trigger:'#about-img', start:'top 82%', toggleActions:'play none none none' }
  })
  .to('#about-img .img-curtain-l', { yPercent:  100, duration: 1.35, ease:'power3.inOut' }, 0)
  .to('#about-img .img-curtain-r', { yPercent: -100, duration: 1.35, ease:'power3.inOut' }, 0);

  /* universal split-curtain reveal — work, portfolio, gallery */
  const curtainSelectors = [
    ...document.querySelectorAll('#work .zoom-wrap'),
    ...document.querySelectorAll('#portfolio .zoom-wrap'),
    ...document.querySelectorAll('#gallery .gallery-item')
  ];
  curtainSelectors.forEach(container => {
    container.style.position = 'relative';
    const sectionBg = container.closest('#work, #gallery') ? '#060608' : '#080809';
    const cl = document.createElement('div');
    cl.style.cssText = `position:absolute;top:0;left:0;width:50%;height:100%;background:${sectionBg};z-index:4;pointer-events:none;`;
    const cr = document.createElement('div');
    cr.style.cssText = `position:absolute;top:0;left:50%;width:50%;height:100%;background:${sectionBg};z-index:4;pointer-events:none;`;
    container.appendChild(cl);
    container.appendChild(cr);
    gsap.timeline({
      scrollTrigger:{ trigger:container, start:'top 88%', toggleActions:'play none none none' }
    })
    .to(cl, { yPercent:  100, duration: 1.35, ease:'power3.inOut' }, 0)
    .to(cr, { yPercent: -100, duration: 1.35, ease:'power3.inOut' }, 0);
  });

  /* about heading — same left-to-right unfold as hero tagline */
  gsap.fromTo('#about-heading',
    { clipPath:'inset(0 100% 0 0)' },
    { clipPath:'inset(0 0% 0 0)', duration:2.2, ease:'power2.inOut',
      scrollTrigger:{ trigger:'#about-heading', start:'top 85%', toggleActions:'play none none none' }});

  /* contact "NG" — breaks off, swings right→left, settles broken at 90° */
  gsap.set('#contact-ng', { rotation: 145 });
  ScrollTrigger.create({
    trigger: '#contact-ng', start: 'top 88%', once: true,
    onEnter() {
      gsap.timeline({ defaults:{ ease:'sine.inOut' } })
        .to('#contact-ng', { rotation:  35, duration: 1.0,  ease:'power2.out' })
        .to('#contact-ng', { rotation: 125, duration: 1.0  })
        .to('#contact-ng', { rotation:  62, duration: 1.05 })
        .to('#contact-ng', { rotation: 108, duration: 1.1  })
        .to('#contact-ng', { rotation:  76, duration: 1.1  })
        .to('#contact-ng', { rotation:  98, duration: 1.15 })
        .to('#contact-ng', { rotation:  84, duration: 1.2  })
        .to('#contact-ng', { rotation:  93, duration: 1.3  })
        .to('#contact-ng', { rotation:  90, duration: 1.6,  ease:'power1.out',
          onComplete: startNgIdle });
    }
  });

  /* process "wo" — breaks off left, pivot bottom-right, settles broken at -90° */
  gsap.set('#process-wo', { rotation: -145 });
  ScrollTrigger.create({
    trigger: '#process-wo', start: 'top 88%', once: true,
    onEnter() {
      gsap.timeline({ defaults:{ ease:'sine.inOut' } })
        .to('#process-wo', { rotation:  -35, duration: 1.0,  ease:'power2.out' })
        .to('#process-wo', { rotation: -125, duration: 1.0  })
        .to('#process-wo', { rotation:  -62, duration: 1.05 })
        .to('#process-wo', { rotation: -108, duration: 1.1  })
        .to('#process-wo', { rotation:  -76, duration: 1.1  })
        .to('#process-wo', { rotation:  -98, duration: 1.15 })
        .to('#process-wo', { rotation:  -84, duration: 1.2  })
        .to('#process-wo', { rotation:  -93, duration: 1.3  })
        .to('#process-wo', { rotation:  -90, duration: 1.6,  ease:'power1.out',
          onComplete: startWoIdle });
    }
  });

  gsap.utils.toArray('.r-left').forEach(el => gsap.fromTo(el,
    { opacity:0, x:-36 },
    { opacity:1, x:0, duration:.75, ease:'power3.out', scrollTrigger:{ trigger:el, start:'top 90%', toggleActions:'play none none none' }}));

  gsap.utils.toArray('.r-right').forEach(el => gsap.fromTo(el,
    { opacity:0, x:36 },
    { opacity:1, x:0, duration:.75, ease:'power3.out', scrollTrigger:{ trigger:el, start:'top 90%', toggleActions:'play none none none' }}));

  /* service rows stagger */
  gsap.utils.toArray('.svc-row').forEach((r,i) => gsap.fromTo(r,
    { opacity:0, x:-24 },
    { opacity:1, x:0, duration:.65, ease:'power3.out', delay:i*.07, scrollTrigger:{ trigger:r, start:'top 92%' }}));

  /* stat count-up */
  document.querySelectorAll('[data-count]').forEach(el => {
    const t = +el.dataset.count;
    ScrollTrigger.create({ trigger:el, start:'top 80%', once:true, onEnter(){
      let n=0; const iv=setInterval(()=>{ n+=Math.ceil(t/38); if(n>=t){n=t;clearInterval(iv);} el.textContent=n; },32);
    }});
  });

  /* cta parallax */
  gsap.to('.cta-title',{ y:-36, ease:'none', scrollTrigger:{ trigger:'#contact', scrub:1.4, start:'top bottom', end:'bottom top' }});

  /* magnetic buttons */
  document.querySelectorAll('.mag').forEach(b => {
    b.addEventListener('mousemove', e => {
      const r=b.getBoundingClientRect();
      b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.22}px,${(e.clientY-r.top-r.height/2)*.22}px)`;
    });
    b.addEventListener('mouseleave', ()=> b.style.transform='');
  });
}

/* ── BRIDGE-E IDLE SWAY ── */
function startEIdle() {
  const e = document.getElementById('bridge-e');
  gsap.killTweensOf(e);
  gsap.timeline()
    .to(e, { rotation: -1.5, duration: 1.8, ease:'sine.inOut' })
    .to(e, { rotation:  1.5, duration: 2.4, ease:'sine.inOut', repeat:-1, yoyo:true });
}

/* ── CREATIVE LETTERS ROLL OFF ANIMATION ── */
let isRolling = false;

function startCreativeRoll() {
  if (isRolling) return;
  isRolling = true;
  const letters  = [...document.querySelectorAll('.cr-letter')];
  const statsEl  = document.getElementById('hv-stats');
  const studioEl = document.getElementById('studio-word');
  if (!letters.length || !statsEl) return;

  const statsRect  = statsEl.getBoundingClientRect();
  const studioRect = studioEl ? studioEl.getBoundingClientRect() : null;

  const hvText = document.querySelector('.hv-text');
  if (hvText) gsap.set(hvText, { zIndex: 20 });

  let nextStopRight = studioRect ? studioRect.left : statsRect.left + statsRect.width * 0.6;
  const settled     = [];
  const rollData    = [];

  letters.forEach((letter, i) => {
    const lRect    = letter.getBoundingClientRect();
    const radius   = lRect.height * 0.36;
    const tumble   = -(78 + i * 13);
    const floorY   = (statsRect.top + statsRect.height * 0.28) - lRect.top - lRect.height;
    const myStopRight = nextStopRight;
    nextStopRight     = myStopRight - lRect.width - 3;

    const tl = gsap.timeline({ delay: i * 0.28 });

    tl
      .to(letter, { y: floorY, rotation: tumble, duration: 0.52, ease: 'power2.in' })
      .to(letter, { y: '-=26', duration: 0.13, ease: 'power2.out' })
      .to(letter, { y: '+=17', duration: 0.10, ease: 'power2.in'  })
      .to(letter, { y: '-=8',  duration: 0.07, ease: 'power2.out' })
      .to(letter, { y: '+=8',  duration: 0.06, ease: 'power2.in'  })
      .to(letter, { y: '-=3',  duration: 0.05, ease: 'power2.out' })
      .to(letter, { y: '+=3',  duration: 0.04, ease: 'power2.in'  })
      .add(() => {
        const rollDx  = (myStopRight - lRect.width / 2) - (lRect.left + lRect.width / 2);
        const rollDeg = (Math.abs(rollDx) / (2 * Math.PI * radius)) * 360;
        rollData[i]   = { rollDx, rollDeg, radius, tumble };

        settled.forEach((s, si) => {
          const distFromImpact = settled.length - 1 - si;
          const force = Math.max(0, 13 - distFromImpact * 4);
          const knockDelay = distFromImpact * 0.07;
          gsap.to(s, { x: `-=${force}`, duration: 0.22, ease: 'power2.out', delay: knockDelay });
        });

        gsap.to(letter, {
          x: rollDx, rotation: tumble - rollDeg,
          duration: 0.82, ease: 'power1.inOut',
          onComplete() {
            const isLast = settled.length === letters.length - 1;
            gsap.timeline({
              onComplete: isLast ? () => setTimeout(() => rollBack(letters, rollData), 1400) : null
            })
              .to(letter, { x: '-=5', rotation: '-=16', duration: 0.25, ease: 'power3.out' })
              .to(letter, { rotation: '+=9',   duration: 0.17, ease: 'sine.inOut' })
              .to(letter, { rotation: '-=5',   duration: 0.13, ease: 'sine.inOut' })
              .to(letter, { rotation: '+=2',   duration: 0.10, ease: 'sine.inOut' })
              .to(letter, { rotation: '-=0.8', duration: 0.08, ease: 'sine.inOut' });
            settled.push(letter);
          }
        });
      });
  });
}

/* ── ROLL BACK TO REFORM "CREATIVE" ── */
function rollBack(letters, rollData) {
  const order = [...letters].reverse();

  order.forEach((letter, i) => {
    const originalIndex = letters.indexOf(letter);
    const data = rollData[originalIndex];
    if (!data) return;

    gsap.to(letter, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 1.8,
      ease: 'sine.inOut',
      delay: i * 0.16,
      onComplete: i === order.length - 1 ? () => {
        isRolling = false;
        setTimeout(() => startCreativeRoll(), 10000);
      } : null,
    });
  });
}

/* ── PROCESS-WO IDLE SWAY ── */
function startWoIdle() {
  const el = document.getElementById('process-wo');
  gsap.killTweensOf(el);
  gsap.timeline()
    .to(el, { rotation: -88.5, duration: 1.8, ease:'sine.inOut' })
    .to(el, { rotation: -91.5, duration: 2.4, ease:'sine.inOut', repeat:-1, yoyo:true });
}

/* ── CONTACT-NG IDLE SWAY ── */
function startNgIdle() {
  const el = document.getElementById('contact-ng');
  gsap.killTweensOf(el);
  gsap.timeline()
    .to(el, { rotation: 88.5, duration: 1.8, ease:'sine.inOut' })
    .to(el, { rotation: 91.5, duration: 2.4, ease:'sine.inOut', repeat:-1, yoyo:true });
}

/* ── PROCESS-WO INTERACTIVE PENDULUM ── */
(function () {
  const el = document.getElementById('process-wo');
  if (!el) return;
  el.addEventListener('pointerdown', function swingWo() {
    gsap.killTweensOf(el);
    gsap.timeline({ defaults:{ ease:'sine.inOut' }, onComplete: startWoIdle })
      .to(el, { rotation: -118, duration: 0.38, ease:'power2.out' })
      .to(el, { rotation:  -66, duration: 1.0  })
      .to(el, { rotation: -108, duration: 1.05 })
      .to(el, { rotation:  -76, duration: 1.1  })
      .to(el, { rotation: -100, duration: 1.15 })
      .to(el, { rotation:  -83, duration: 1.2  })
      .to(el, { rotation:  -94, duration: 1.3  })
      .to(el, { rotation:  -90, duration: 1.6,  ease:'power1.out' });
  });
})();

/* ── CONTACT-NG INTERACTIVE PENDULUM ── */
(function () {
  const el = document.getElementById('contact-ng');
  if (!el) return;
  el.addEventListener('pointerdown', function swingNg() {
    gsap.killTweensOf(el);
    gsap.timeline({ defaults:{ ease:'sine.inOut' }, onComplete: startNgIdle })
      .to(el, { rotation: 118, duration: 0.38, ease:'power2.out' })
      .to(el, { rotation:  66, duration: 1.0  })
      .to(el, { rotation: 108, duration: 1.05 })
      .to(el, { rotation:  76, duration: 1.1  })
      .to(el, { rotation: 100, duration: 1.15 })
      .to(el, { rotation:  83, duration: 1.2  })
      .to(el, { rotation:  94, duration: 1.3  })
      .to(el, { rotation:  90, duration: 1.6,  ease:'power1.out' });
  });
})();

/* ── BRIDGE-E INTERACTIVE PENDULUM ── */
(function () {
  const el = document.getElementById('bridge-e');
  let swinging = false;

  function swingE() {
    gsap.killTweensOf(el);
    swinging = true;
    gsap.timeline({ defaults:{ ease:'sine.inOut' },
      onComplete(){ swinging = false; startEIdle(); } })
      .to(el, { rotation:  22, duration: 0.38, ease:'power2.out' })
      .to(el, { rotation: -15, duration: 1.0  })
      .to(el, { rotation:  11, duration: 1.05 })
      .to(el, { rotation:  -7, duration: 1.1  })
      .to(el, { rotation:   5, duration: 1.15 })
      .to(el, { rotation:  -3, duration: 1.25 })
      .to(el, { rotation:   1, duration: 1.4  })
      .to(el, { rotation:   0, duration: 1.6, ease:'power1.out' });
  }

  el.addEventListener('pointerdown', swingE);
})();

/* ── MOBILE MENU ── */
document.getElementById('hb-btn').addEventListener('click', toggleMob);
document.querySelectorAll('.js-close-mob').forEach(function(el){
  el.addEventListener('click', closeMob);
});

/* ── PORTFOLIO CARD CLICKS ── */
document.querySelectorAll('.zoom-wrap[data-href]').forEach(function(wrap){
  wrap.addEventListener('click', function(){ location.href = wrap.dataset.href; });
});

let mobOpen = false;
function toggleMob() {
  mobOpen = !mobOpen;
  document.getElementById('mob-menu').classList.toggle('open', mobOpen);
  const h1=document.getElementById('hb1'), h2=document.getElementById('hb2'), h3=document.getElementById('hb3');
  if (mobOpen) {
    h1.style.transform='translateY(6.5px) rotate(45deg)'; h2.style.opacity='0'; h3.style.transform='translateY(-6.5px) rotate(-45deg)';
  } else {
    h1.style.transform=''; h2.style.opacity=''; h3.style.transform='';
  }
}
function closeMob() {
  mobOpen=false; document.getElementById('mob-menu').classList.remove('open');
  ['hb1','hb2','hb3'].forEach(id=>{ const el=document.getElementById(id); if(el){el.style.transform='';el.style.opacity='';} });
}

/* ── CONTACT FORM — WEB3FORMS ── */
(function () {
  var form    = document.getElementById('contact-form');
  var btn     = document.getElementById('form-btn');
  var label   = document.getElementById('form-btn-label');
  var arrow   = document.getElementById('form-btn-arrow');
  var spin    = document.getElementById('form-btn-spin');
  var success = document.getElementById('form-success');
  var errBox  = document.getElementById('form-error');

  function showFieldErr(id, msg) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
    el.style.display = 'block';
  }
  function clearFieldErr(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = '';
    el.style.display = 'none';
  }
  function highlightField(el, bad) {
    if (!el) return;
    el.style.borderColor = bad ? 'rgba(248,113,113,.8)' : 'rgba(255,255,255,.13)';
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    var nameEl    = document.getElementById('cf-name');
    var emailEl   = document.getElementById('cf-email');
    var msgEl     = document.getElementById('cf-message');
    var consentEl = document.getElementById('cf-consent');

    var name    = nameEl ? nameEl.value.trim() : '';
    var email   = emailEl ? emailEl.value.trim() : '';
    var msg     = msgEl ? msgEl.value.trim() : '';
    var consent = consentEl ? consentEl.checked : false;

    /* clear previous feedback */
    ['cf-err-name','cf-err-email','cf-err-msg','cf-err-consent'].forEach(clearFieldErr);
    [nameEl, emailEl, msgEl].forEach(function (el) { highlightField(el, false); });
    success.style.display = 'none';
    errBox.style.display  = 'none';
    errBox.textContent    = '';

    var valid = true;

    /* name */
    if (name.length < 2) {
      showFieldErr('cf-err-name', 'Please enter your full name (at least 2 characters).');
      highlightField(nameEl, true);
      valid = false;
    } else if (name.length > 100) {
      showFieldErr('cf-err-name', 'Name must be under 100 characters.');
      highlightField(nameEl, true);
      valid = false;
    } else if (/^\d+$/.test(name)) {
      showFieldErr('cf-err-name', 'Please enter a real name.');
      highlightField(nameEl, true);
      valid = false;
    }

    /* email */
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || !emailRe.test(email)) {
      showFieldErr('cf-err-email', 'Please enter a valid email address.');
      highlightField(emailEl, true);
      valid = false;
    }

    /* message */
    if (msg.length < 10) {
      showFieldErr('cf-err-msg', 'Please describe your project — at least 10 characters.');
      highlightField(msgEl, true);
      valid = false;
    } else if (msg.length > 3000) {
      showFieldErr('cf-err-msg', 'Message must be under 3,000 characters.');
      highlightField(msgEl, true);
      valid = false;
    }

    /* privacy consent */
    if (!consent) {
      showFieldErr('cf-err-consent', 'Please agree to the Privacy Policy to continue.');
      valid = false;
    }

    if (!valid) return;

    /* rate limit — 60 s between submissions */
    var lastSent = parseInt(localStorage.getItem('snb-last-submit') || '0', 10);
    var remaining = 60000 - (Date.now() - lastSent);
    if (remaining > 0) {
      errBox.textContent = 'Please wait ' + Math.ceil(remaining / 1000) + ' seconds before sending another message.';
      errBox.style.display = 'block';
      return;
    }

    /* send */
    label.textContent   = 'Sending…';
    arrow.style.display = 'none';
    spin.style.display  = 'block';
    btn.disabled        = true;

    try {
      var data = new FormData(form);
      var res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      var json = await res.json();

      if (json.success) {
        localStorage.setItem('snb-last-submit', String(Date.now()));
        success.style.display = 'block';
        form.reset();
        [nameEl, emailEl, msgEl].forEach(function (el) { highlightField(el, false); });
      } else {
        errBox.textContent = 'Something went wrong. Please try again or email us at starnabula18@gmail.com.';
        errBox.style.display = 'block';
      }
    } catch (_) {
      errBox.textContent = 'Connection error. Check your internet and try again.';
      errBox.style.display = 'block';
    } finally {
      label.textContent   = 'Send Message';
      arrow.style.display = 'block';
      spin.style.display  = 'none';
      btn.disabled        = false;
    }
  });
})();

/* ── PORTFOLIO SHUFFLE + LOAD MORE ── */
(function(){
  const VISIBLE = 6;
  const grid = document.getElementById('port-grid');
  const btn  = document.getElementById('port-more-btn');
  const wrap = document.getElementById('port-more-wrap');
  if(!grid) return;

  const items = [...grid.querySelectorAll('.pi')];
  for(let i = items.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  items.forEach(item => grid.appendChild(item));
  window._portItems = [...items];

  function applyLimit(){
    const all = [...grid.querySelectorAll('.pi')];
    all.forEach((item, i) => {
      item.style.display = i >= VISIBLE ? 'none' : '';
      item.style.pointerEvents = i >= VISIBLE ? 'none' : 'all';
    });
    if(wrap) wrap.style.display = all.length > VISIBLE ? '' : 'none';
  }
  applyLimit();

  if(btn){
    btn.addEventListener('click', () => {
      const hidden = [...grid.querySelectorAll('.pi')].filter(el => el.style.display === 'none');
      hidden.forEach(el => { el.style.display = ''; el.style.pointerEvents = 'all'; });
      gsap.fromTo(hidden,
        { opacity: 0, y: 28, scale: 0.93 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out', stagger: 0.055 }
      );
      if(wrap) wrap.style.display = 'none';
    });
  }

  window._portApplyLimit = applyLimit;
})();

/* ── PORTFOLIO FILTER ── */
document.querySelectorAll('.ftab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.ftab').forEach(t => t.classList.remove('on'));
    tab.classList.add('on');
    const f = tab.dataset.f;
    const grid = document.getElementById('port-grid');
    const items = [...grid.querySelectorAll('.pi')];
    const wrap  = document.getElementById('port-more-wrap');

    document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth', block: 'start' });

    gsap.killTweensOf(items);
    gsap.to(items, {
      opacity: 0, scale: 0.92, duration: 0.18, ease: 'power2.in',
      onComplete() {
        if(f === 'all'){
          if(window._portItems) window._portItems.forEach(el => grid.appendChild(el));
          items.forEach(el => { el.style.display = ''; el.style.pointerEvents = 'all'; });
          if(window._portApplyLimit) window._portApplyLimit();
          const visible = [...grid.querySelectorAll('.pi')].filter(el => el.style.display !== 'none');
          gsap.fromTo(visible,
            { opacity: 0, y: 30, scale: 0.93 },
            { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out', stagger: 0.055 }
          );
        } else {
          const matching    = items.filter(el => el.dataset.cat === f);
          const nonMatching = items.filter(el => el.dataset.cat !== f);
          nonMatching.forEach(el => { el.style.display = 'none'; el.style.pointerEvents = 'none'; grid.appendChild(el); });
          matching.forEach(el => { el.style.display = ''; el.style.pointerEvents = 'all'; grid.appendChild(el); });
          if(wrap) wrap.style.display = 'none';
          gsap.fromTo(matching,
            { opacity: 0, y: 30, scale: 0.93 },
            { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out', stagger: 0.055 }
          );
        }
      }
    });
  });
});

/* ── LIVE SITE PREVIEWS — lazy load + scale iframes ── */
(function(){
  function scaleFrame(frame){
    var wrap = frame.closest('.zoom-wrap');
    if(!wrap) return;
    var w = wrap.offsetWidth, h = wrap.offsetHeight;
    if(!w || !h) return;
    var scale = w / 1440;
    frame.style.transform = 'scale(' + scale + ')';
    frame.style.height = Math.ceil(h / scale) + 'px';
  }
  function scaleAll(){
    document.querySelectorAll('.site-frame').forEach(scaleFrame);
  }

  /* Only load each iframe when its card scrolls into view */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting) return;
      var frame = entry.target.querySelector('.site-frame[data-src]');
      if(frame){
        frame.src = frame.dataset.src;
        delete frame.dataset.src;
        scaleFrame(frame);
      }
      io.unobserve(entry.target);
    });
  }, { rootMargin: '200px' });

  document.querySelectorAll('.zoom-wrap').forEach(function(wrap){
    if(wrap.querySelector('.site-frame')) io.observe(wrap);
  });

  if(window.ResizeObserver){
    var ro = new ResizeObserver(function(entries){
      entries.forEach(function(e){
        var f = e.target.querySelector('.site-frame');
        if(f) scaleFrame(f);
      });
    });
    document.querySelectorAll('.zoom-wrap').forEach(function(wrap){
      if(wrap.querySelector('.site-frame')) ro.observe(wrap);
    });
  } else {
    window.addEventListener('resize', scaleAll);
  }
  scaleAll();
})();
