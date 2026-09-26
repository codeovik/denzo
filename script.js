/**
 * Denzo Studio / Oakâme — GSAP Preloader to Hero Animation Engine
 * Slow, Smooth, Cinematic Awwwards-Caliber Timeline
 * Pure Vanilla JavaScript & GSAP with SplitText
 */

// Register SplitText, CustomEase & ScrollTrigger plugins if loaded via CDN
if (typeof SplitText !== 'undefined') {
  gsap.registerPlugin(SplitText);
}
if (typeof CustomEase !== 'undefined') {
  gsap.registerPlugin(CustomEase);
}
if (typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom easing for center video scale-up
const customVideoScaleEase =
  typeof CustomEase !== 'undefined'
    ? CustomEase.create('custom', 'M0,0 C0.322,-0.267 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1 ')
    : 'power3.out';

document.addEventListener('DOMContentLoaded', () => {
  // DOM Element References
  const wordEl = document.getElementById('word');
  const splitLeft = document.getElementById('split-left');
  const splitRight = document.getElementById('split-right');
  const preloaderLogo = document.getElementById('preloader-top-logo');
  const preloaderTagline = document.getElementById('preloader-tagline');
  const counterLeft = document.getElementById('counter-left');
  const counterRight = document.getElementById('counter-right');
  const videoWrapper = document.getElementById('video-wrapper');
  const heroVideo = document.getElementById('hero-video');
  const videoOverlay = document.getElementById('video-overlay');
  const hero3dWrapper = document.getElementById('hero-3d-wrapper');
  const heroEyebrow = document.getElementById('hero-eyebrow');
  const heroHeading = document.getElementById('hero-heading');
  const heroSubheading = document.getElementById('hero-subheading');
  const heroCtaPanel = document.getElementById('hero-cta-panel');
  const heroScrollIndicator = document.getElementById('hero-scroll-indicator');
  const navBrand = document.querySelector('.nav-brand');
  const navActionItems = document.querySelectorAll('.nav-action-item');
  const navBadge = document.querySelector('.nav-badge');

  // Video buffering state
  let isVideoBuffering = false;
  let masterTl = null;

  // Initialize Video attributes for smooth uninterrupted playback
  heroVideo.muted = true;
  heroVideo.defaultMuted = true;
  heroVideo.playsInline = true;
  heroVideo.setAttribute('playsinline', '');
  heroVideo.setAttribute('muted', '');
  heroVideo.preload = 'auto';

  heroVideo.play().catch(() => {
    // Autoplay handled gracefully
  });

  // ---- Tunable values, matched to the reference video ----
  const CFG = {
    blur: 14, // px, starting blur amount
    duration: 0.6, // seconds, per-character reveal duration
    stagger: 0.045, // seconds between each character's start
    ease: 'power2.out',
  };

  // Wait for web fonts (Poppins) to be fully ready before computing split character metrics
  document.fonts.ready.then(() => {
    initCinematicExperience();
  });

  function initCinematicExperience() {
    // Extract or generate character elements
    let splitChars = [];

    if (typeof SplitText !== 'undefined') {
      try {
        const split = new SplitText(wordEl, { type: 'chars', charsClass: 'char' });
        splitChars = split.chars;
      } catch (err) {
        console.warn('SplitText initialization fallback:', err);
      }
    }

    // High-fidelity fallback if SplitText CDN is blocked or unavailable
    if (!splitChars || splitChars.length === 0) {
      splitChars = [];
      [splitLeft, splitRight].forEach((container) => {
        if (!container) return;
        const rawText = container.textContent || '';
        container.innerHTML = '';
        for (const ch of rawText) {
          const span = document.createElement('span');
          span.className = 'char';
          span.textContent = ch;
          container.appendChild(span);
          splitChars.push(span);
        }
      });
    }

    // Initial character hidden state: blurred + zero opacity
    gsap.set(splitChars, { opacity: 0, filter: `blur(${CFG.blur}px)` });

    // Initial states for all other timeline elements
    resetAllInitialStates();

    // Build the master animation timeline
    buildTimeline(splitChars);
  }

  // Calculate mathematically symmetric split distances regardless of character count differences
  // Guarantees zero clipping or overflow on mobile, tablet, and desktop
  function calculateSymmetricPositions() {
    // Read clean un-translated positions
    const currentLeftX = gsap.getProperty(splitLeft, 'x') || 0;
    const currentLeftY = gsap.getProperty(splitLeft, 'y') || 0;
    const currentRightX = gsap.getProperty(splitRight, 'x') || 0;
    const currentRightY = gsap.getProperty(splitRight, 'y') || 0;

    const leftRect = splitLeft.getBoundingClientRect();
    const rightRect = splitRight.getBoundingClientRect();
    const screenCenter = window.innerWidth / 2;

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    // Desktop/tablet horizontal seam
    const seamX = leftRect.right - currentLeftX;
    const seamOffset = seamX - screenCenter;

    // Desktop / Tablet calculations
    const previewScale = isTablet ? 0.28 : 0.36;
    const videoHalfWidth = (window.innerWidth * previewScale) / 2;
    const margin = 40;
    const maxTargetDistanceLeft = Math.max(videoHalfWidth + 32, screenCenter - leftRect.width - margin);
    const maxTargetDistanceRight = Math.max(videoHalfWidth + 32, screenCenter - rightRect.width - margin);
    const maxSafeTargetDistance = Math.min(maxTargetDistanceLeft, maxTargetDistanceRight);
    const targetDistance = isTablet
      ? Math.min(maxSafeTargetDistance, window.innerWidth * 0.28)
      : window.innerWidth * 0.25;

    const targetXLeft = -targetDistance - seamOffset;
    const targetXRight = targetDistance - seamOffset;
    const counterOffset = (videoHalfWidth + targetDistance) / 2;

    // Mobile: vertical row-wise arrangement with 1:1 aspect ratio square video
    // Row 1: "DEN" (top)
    // Row 2: "00" (counter top)
    // Row 3: Video element (1:1 square preview — prominently enlarged)
    // Row 4: "00" (counter bottom)
    // Row 5: "ZO" (bottom)
    const mobileSquareSize = Math.round(
      Math.min(window.innerWidth * 0.62, window.innerHeight * 0.32, 260)
    );
    const mobileHalfSquare = mobileSquareSize / 2;
    const mobileCounterGap = Math.max(18, Math.round(window.innerHeight * 0.024));
    const mobileCounterYOffset = mobileHalfSquare + mobileCounterGap;
    const mobileWordGap = Math.max(38, Math.round(window.innerHeight * 0.048));
    const mobileWordYOffset = mobileCounterYOffset + mobileWordGap;

    // Horizontal centering translations for DEN and ZO on mobile
    const unadjustedLeftCenterX = leftRect.left - currentLeftX + leftRect.width / 2;
    const unadjustedRightCenterX = rightRect.left - currentRightX + rightRect.width / 2;
    const mobileCenterXLeft = screenCenter - unadjustedLeftCenterX;
    const mobileCenterXRight = screenCenter - unadjustedRightCenterX;

    return {
      isMobile,
      // Desktop / tablet
      targetXLeft,
      targetXRight,
      counterOffset,
      seamOffset,
      previewScale,
      // Mobile
      mobileSquareSize,
      mobileCounterYOffset,
      mobileWordYOffset,
      mobileCenterXLeft,
      mobileCenterXRight,
    };
  }

  function resetAllInitialStates() {
    const sym = calculateSymmetricPositions();

    gsap.set('.preloader-stage', {
      visibility: 'visible',
      opacity: 1,
    });

    gsap.set(preloaderLogo, {
      opacity: 0,
      y: 14,
      filter: 'grayscale(0%)',
    });

    gsap.set(preloaderTagline, {
      opacity: 0,
      y: 12,
    });

    gsap.set([splitLeft, splitRight], {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      color: '',
      textShadow: 'none',
      filter: 'none',
    });

    gsap.set([counterLeft, counterRight], {
      scale: 1,
      color: '',
      textShadow: 'none',
      filter: 'none',
    });

    if (sym.isMobile) {
      // Mobile: counters start centered at parting origin
      gsap.set(counterLeft, {
        opacity: 0,
        left: '50%',
        top: '50%',
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 0,
      });
      gsap.set(counterRight, {
        opacity: 0,
        left: '50%',
        top: '50%',
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 0,
      });

      // Mobile: 1:1 aspect ratio square preview size
      gsap.set(videoWrapper, {
        width: sym.mobileSquareSize,
        height: sym.mobileSquareSize,
        borderRadius: 8,
        opacity: 0,
        scale: 0.2,
        transformOrigin: 'center center',
      });
    } else {
      // Desktop: horizontal flanking
      gsap.set(counterLeft, {
        opacity: 0,
        left: '50%',
        top: '50%',
        xPercent: -50,
        yPercent: -50,
        x: -sym.seamOffset,
        y: 0,
      });
      gsap.set(counterRight, {
        opacity: 0,
        left: '50%',
        top: '50%',
        xPercent: -50,
        yPercent: -50,
        x: -sym.seamOffset,
        y: 0,
      });

      // Desktop: full viewport element scaled down to gap
      gsap.set(videoWrapper, {
        width: '100vw',
        height: '100vh',
        borderRadius: 0,
        opacity: 0,
        scale: 0.1,
        transformOrigin: 'center center',
      });
    }

    counterLeft.textContent = '00';
    counterRight.textContent = '00';

    gsap.set(videoOverlay, {
      opacity: 0,
    });

    if (hero3dWrapper) {
      gsap.set(hero3dWrapper, {
        opacity: 0,
        scale: 0.84,
      });
    }

    gsap.set(heroEyebrow, {
      opacity: 0,
      y: 16,
    });

    gsap.set(heroHeading, {
      opacity: 0,
      y: 20,
    });

    if (heroSubheading) {
      gsap.set(heroSubheading, {
        opacity: 0,
        y: 18,
      });
    }

    gsap.set(heroCtaPanel, {
      opacity: 0,
      y: 18,
    });

    if (heroScrollIndicator) {
      gsap.set(heroScrollIndicator, {
        opacity: 0,
        y: 18,
      });
    }

    gsap.set(navBrand, {
      opacity: 0,
    });

    gsap.set(navActionItems, {
      opacity: 0,
      y: -10,
    });

    gsap.set(navBadge, {
      scale: 0,
      transformOrigin: 'center center',
    });
  }

  function buildTimeline(splitChars) {
    if (masterTl) {
      masterTl.kill();
    }

    heroVideo.currentTime = 0;
    heroVideo.play().catch(() => {});

    masterTl = gsap.timeline({
      defaults: { ease: 'power3.out' },
    });

    /* ==========================================================================
       0.00s - 0.45s: Smooth ambient intro
       Preloader top logo and tagline gently fade & rise
       ========================================================================== */
    masterTl.to(
      preloaderLogo,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      },
      0.00
    );

    masterTl.to(
      preloaderTagline,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      },
      0.10
    );

    /* ==========================================================================
       0.20s - 0.85s: Firstly, on-screen wordmark reveals with exact requested animation
       opacity: 0 -> 1, filter: blur(14px) -> blur(0px), stagger from: "random"
       ========================================================================== */
    masterTl.to(
      splitChars,
      {
        opacity: 1,
        filter: 'blur(0px)',
        duration: CFG.duration,
        ease: CFG.ease,
        stagger: { each: CFG.stagger, from: 'random' },
      },
      0.20
    );

    /* ==========================================================================
       0.85s - 1.60s: Cinematic pause & hold
       ========================================================================== */

    /* ==========================================================================
       1.60s - 3.00s: Divided wordmark's transform easing MUST be ease-out
       Desktop/Tablet: Horizontal split ("DEN" left, "ZO" right, flanking counters)
       Mobile: Vertical row-wise arrangement:
               Row 1: "DEN" (moves UP, horizontally centered)
               Row 2: "00" (counter top, moves UP)
               Row 3: Center Video (1:1 square aspect ratio preview)
               Row 4: "00" (counter bottom, moves DOWN)
               Row 5: "ZO" (moves DOWN, horizontally centered)
       ========================================================================== */
    const sym = calculateSymmetricPositions();

    if (sym.isMobile) {
      // Mobile: vertical row-wise split with horizontal auto-centering
      masterTl.to(
        splitLeft,
        {
          x: sym.mobileCenterXLeft,
          y: -sym.mobileWordYOffset,
          duration: 1.4,
          ease: 'power3.out',
        },
        1.60
      );

      masterTl.to(
        splitRight,
        {
          x: sym.mobileCenterXRight,
          y: sym.mobileWordYOffset,
          duration: 1.4,
          ease: 'power3.out',
        },
        1.60
      );

      // Top counter moves UP between "DEN" and Video
      masterTl.to(
        counterLeft,
        {
          x: 0,
          y: -sym.mobileCounterYOffset,
          duration: 1.4,
          ease: 'power3.out',
        },
        1.60
      );

      // Bottom counter moves DOWN between Video and "ZO"
      masterTl.to(
        counterRight,
        {
          x: 0,
          y: sym.mobileCounterYOffset,
          duration: 1.4,
          ease: 'power3.out',
        },
        1.60
      );

      // Mobile center video: reveals in center with 1:1 aspect ratio square
      masterTl.to(
        videoWrapper,
        {
          opacity: 1,
          scale: 1,
          duration: 1.35,
          ease: 'power3.out',
        },
        1.68
      );
    } else {
      // Desktop / Tablet: horizontal split
      masterTl.to(
        splitLeft,
        {
          x: sym.targetXLeft,
          y: 0,
          duration: 1.4,
          ease: 'power3.out',
        },
        1.60
      );

      masterTl.to(
        splitRight,
        {
          x: sym.targetXRight,
          y: 0,
          duration: 1.4,
          ease: 'power3.out',
        },
        1.60
      );

      masterTl.to(
        counterLeft,
        {
          x: -sym.counterOffset,
          y: 0,
          duration: 1.4,
          ease: 'power3.out',
        },
        1.60
      );

      masterTl.to(
        counterRight,
        {
          x: sym.counterOffset,
          y: 0,
          duration: 1.4,
          ease: 'power3.out',
        },
        1.60
      );

      masterTl.to(
        videoWrapper,
        {
          opacity: 1,
          scale: sym.previewScale,
          duration: 1.35,
          ease: 'power3.out',
        },
        1.68
      );
    }

    // Flanking dual counters smoothly fade in as they start their movement outward from center
    masterTl.to(
      [counterLeft, counterRight],
      {
        opacity: 1,
        duration: 0.45,
        ease: 'power2.out',
      },
      1.60
    );

    /* ==========================================================================
       1.70s - 3.40s: Animate dual counters 00 -> 100 with linear tabular progression
       ========================================================================== */
    const counterTracker = { count: 0 };
    masterTl.to(
      counterTracker,
      {
        count: 100,
        duration: 1.70,
        ease: 'none',
        onUpdate: () => {
          const val = Math.floor(counterTracker.count);
          const formatted = val < 10 ? '0' + val : String(val);
          counterLeft.textContent = formatted;
          counterRight.textContent = formatted;
        },
      },
      1.70
    );

    /* ==========================================================================
       3.45s: Top logo desaturates and gently fades to 40%
       ========================================================================== */
    masterTl.to(
      preloaderLogo,
      {
        opacity: 0.4,
        filter: 'grayscale(100%)',
        duration: 0.60,
        ease: 'power2.out',
      },
      3.45
    );

    /* ==========================================================================
       Checkpoint: Video readyState >= 3 check before starting scale-up
       Buffers up to 150ms if necessary to eliminate frame stutter
       ========================================================================== */
    masterTl.call(
      () => {
        if (heroVideo.readyState < 3 && !isVideoBuffering) {
          isVideoBuffering = true;
          masterTl.pause();

          let resumed = false;
          const resumeTl = () => {
            if (resumed) return;
            resumed = true;
            isVideoBuffering = false;
            heroVideo.removeEventListener('canplay', resumeTl);
            clearTimeout(bufferTimeout);
            masterTl.resume();
          };

          const bufferTimeout = setTimeout(resumeTl, 150);
          heroVideo.addEventListener('canplay', resumeTl);
        }
      },
      null,
      4.10
    );

    /* ==========================================================================
       4.15s - 5.55s: Center video scales up to full hero viewport background
       Desktop: scale 0.36 -> 1.0 using CustomEase
       Mobile: 1:1 square preview expands to full viewport width & height using CustomEase
       Custom curve: M0,0 C0.322,-0.267 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1
       with anticipatory pullback and silk deceleration
       ========================================================================== */
    if (sym.isMobile) {
      masterTl.to(
        videoWrapper,
        {
          width: window.innerWidth,
          height: window.innerHeight,
          borderRadius: 0,
          duration: 1.40,
          ease: customVideoScaleEase,
          onComplete: () => {
            gsap.set(videoWrapper, { width: '100vw', height: '100vh' });
          },
        },
        4.15
      );
    } else {
      masterTl.to(
        videoWrapper,
        {
          scale: 1,
          duration: 1.40,
          ease: customVideoScaleEase,
        },
        4.15
      );
    }

    /* ==========================================================================
       4.15s - 5.10s: Cinematic Inward Convergence of DEN, ZO & Count-Up Texts
       At the exact time the video element scales up to fill the entire screen,
       the divided texts "DEN" & "ZO" along with the two count-up counters
       transform inward toward the center, creating a dramatic focal vortex.
       ========================================================================== */
    const convergeWordsRatio = 0.60;   // Transforms ~40% inward toward center
    const convergeCountersRatio = 0.50; // Transforms ~50% inward toward center

    if (sym.isMobile) {
      // Mobile: Row-wise inward convergence along Y-axis toward center
      masterTl.to(
        splitLeft,
        {
          y: -sym.mobileWordYOffset * convergeWordsRatio,
          scale: 0.94,
          color: '#FFFFFF',
          textShadow: '0 2px 20px rgba(0, 0, 0, 0.65)',
          duration: 0.85,
          ease: 'power2.inOut',
        },
        4.15
      );

      masterTl.to(
        splitRight,
        {
          y: sym.mobileWordYOffset * convergeWordsRatio,
          scale: 0.94,
          color: '#FFFFFF',
          textShadow: '0 2px 20px rgba(0, 0, 0, 0.65)',
          duration: 0.85,
          ease: 'power2.inOut',
        },
        4.15
      );

      masterTl.to(
        counterLeft,
        {
          y: -sym.mobileCounterYOffset * convergeCountersRatio,
          scale: 0.90,
          color: '#FFFFFF',
          duration: 0.85,
          ease: 'power2.inOut',
        },
        4.15
      );

      masterTl.to(
        counterRight,
        {
          y: sym.mobileCounterYOffset * convergeCountersRatio,
          scale: 0.90,
          color: '#FFFFFF',
          duration: 0.85,
          ease: 'power2.inOut',
        },
        4.15
      );
    } else {
      // Desktop / Tablet: Horizontal inward convergence toward center
      masterTl.to(
        splitLeft,
        {
          x: sym.targetXLeft * convergeWordsRatio,
          scale: 0.95,
          color: '#FFFFFF',
          textShadow: '0 4px 30px rgba(0, 0, 0, 0.7)',
          duration: 0.85,
          ease: 'power2.inOut',
        },
        4.15
      );

      masterTl.to(
        splitRight,
        {
          x: sym.targetXRight * convergeWordsRatio,
          scale: 0.95,
          color: '#FFFFFF',
          textShadow: '0 4px 30px rgba(0, 0, 0, 0.7)',
          duration: 0.85,
          ease: 'power2.inOut',
        },
        4.15
      );

      masterTl.to(
        counterLeft,
        {
          x: -sym.counterOffset * convergeCountersRatio,
          scale: 0.92,
          color: '#FFFFFF',
          textShadow: '0 2px 16px rgba(0, 0, 0, 0.6)',
          duration: 0.85,
          ease: 'power2.inOut',
        },
        4.15
      );

      masterTl.to(
        counterRight,
        {
          x: sym.counterOffset * convergeCountersRatio,
          scale: 0.92,
          color: '#FFFFFF',
          textShadow: '0 2px 16px rgba(0, 0, 0, 0.6)',
          duration: 0.85,
          ease: 'power2.inOut',
        },
        4.15
      );
    }

    // Top logo & tagline float upwards gently and dissolve
    masterTl.to(
      [preloaderLogo, preloaderTagline],
      {
        opacity: 0,
        y: -16,
        duration: 0.45,
        ease: 'power2.inOut',
      },
      4.15
    );

    // Smooth cinematic dissolve with subtle optical blur as elements converge
    masterTl.to(
      [splitLeft, splitRight, counterLeft, counterRight],
      {
        opacity: 0,
        filter: 'blur(6px)',
        duration: 0.50,
        ease: 'power2.in',
      },
      4.50
    );

    // Hide preloader stage completely once convergence dissolve is finalized
    masterTl.set('.preloader-stage', { visibility: 'hidden' }, 5.05);

    // Dark gradient overlay for typography contrast
    masterTl.to(
      videoOverlay,
      {
        opacity: 1,
        duration: 0.80,
        ease: 'power2.out',
      },
      4.35
    );

    // Reveal interactive 3D object in the center of the hero section
    if (hero3dWrapper) {
      masterTl.to(
        hero3dWrapper,
        {
          opacity: 1,
          scale: 1,
          duration: 1.15,
          ease: 'power3.out',
        },
        4.85
      );
    }

    /* ==========================================================================
       5.35s - 6.20s: Sequential Hero Content Reveal
       Capsule -> Headline -> Sub-headline -> Dual CTAs
       ========================================================================== */
    masterTl.to(
      heroEyebrow,
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: 'power3.out',
      },
      5.35
    );

    masterTl.to(
      heroHeading,
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power3.out',
      },
      5.48
    );

    if (heroSubheading) {
      masterTl.to(
        heroSubheading,
        {
          opacity: 1,
          y: 0,
          duration: 0.50,
          ease: 'power3.out',
        },
        5.60
      );
    }

    masterTl.to(
      heroCtaPanel,
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power3.out',
      },
      5.72
    );

    if (heroScrollIndicator) {
      masterTl.to(
        heroScrollIndicator,
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power3.out',
        },
        5.76
      );
    }

    /* ==========================================================================
       5.75s - 6.25s: Navbar sequential reveal
       Logo, center links, and right actions
       ========================================================================== */
    masterTl.to(
      navBrand,
      {
        opacity: 1,
        duration: 0.45,
        ease: 'power2.out',
      },
      5.75
    );

    masterTl.to(
      navActionItems,
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.35,
        ease: 'power3.out',
      },
      5.85
    );

    if (navBadge) {
      masterTl.to(
        navBadge,
        {
          scale: 1,
          duration: 0.30,
          ease: 'back.out(2)',
        },
        6.10
      );
    }

    return masterTl;
  }

  // ==========================================================================
  // Interactive Navigation Bar, Drawers & Contact Popup
  // ==========================================================================
  function initInteractiveNavigation() {
    const siteHeader = document.getElementById('nav');
    const soundToggle = document.getElementById('sound-toggle');
    const desktopToggle = document.querySelector('.main-toggle');
    const desktopMenuWrap = document.getElementById('desktopMenuWrap');
    const desktopMenuPanel = document.getElementById('desktopMenuRef');
    const desktopMenuCloseBtn = document.getElementById('desktopMenuCloseBtn');
    const desktopMenuBackdrop = document.getElementById('desktopMenuBackdrop');

    const contactPopupWrapper = document.getElementById('contactPopupWrapper');
    const contactPopupPanel = document.getElementById('contactPopupPanel');
    const contactCloseBtn = document.getElementById('contactCloseBtn');
    const contactBackdrop = document.getElementById('contactPopupBackdrop');

    let isDesktopMenuOpen = false;
    let isContactOpen = false;
    let isSoundMuted = true;

    // 1. Header scroll blur behavior
    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > 40) {
          siteHeader?.classList.add('scrolled');
        } else {
          siteHeader?.classList.remove('scrolled');
        }
      },
      { passive: true }
    );

    // 2. Sound Toggle with Web Audio API chime
    let audioCtx = null;
    function playAudioChime(freq, type = 'sine') {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!audioCtx && AudioContextClass) {
          audioCtx = new AudioContextClass();
        }
        if (audioCtx && audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        if (!audioCtx) return;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      } catch (e) {
        // Audio synthesis fallback
      }
    }

    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        isSoundMuted = !isSoundMuted;
        soundToggle.setAttribute('aria-pressed', isSoundMuted ? 'false' : 'true');
        soundToggle.setAttribute('title', isSoundMuted ? 'Enable sound' : 'Mute sound');
        if (isSoundMuted) {
          soundToggle.classList.remove('is-active');
          heroVideo.muted = true;
          playAudioChime(240, 'sine');
        } else {
          soundToggle.classList.add('is-active');
          heroVideo.muted = false;
          playAudioChime(640, 'triangle');
        }
      });
    }

    // 3. Unified Circular Menu Drawer (Used for all breakpoints)
    function openDesktopMenu() {
      if (!desktopMenuWrap || !desktopMenuPanel) return;
      if (isContactOpen) closeContactModal();
      isDesktopMenuOpen = true;
      desktopToggle?.setAttribute('aria-expanded', 'true');
      desktopMenuWrap.style.display = 'flex';
      desktopMenuWrap.classList.remove('invisible');
      desktopMenuWrap.classList.add('is-open');

      gsap.to(desktopMenuPanel, {
        clipPath: 'circle(150% at 95% 5%)',
        opacity: 1,
        visibility: 'visible',
        duration: 0.65,
        ease: 'power3.out',
      });

      const items = desktopMenuPanel.querySelectorAll(
        '.menu-item, .story-link-wrap, .footer-enquiry, .footer-social'
      );
      gsap.fromTo(
        items,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, stagger: 0.045, duration: 0.45, delay: 0.12, ease: 'power2.out' }
      );
    }

    function closeDesktopMenu() {
      if (!desktopMenuWrap || !desktopMenuPanel) return;
      isDesktopMenuOpen = false;
      desktopToggle?.setAttribute('aria-expanded', 'false');

      gsap.to(desktopMenuPanel, {
        clipPath: 'circle(0% at 95% 5%)',
        opacity: 0,
        duration: 0.45,
        ease: 'power3.in',
        onComplete: () => {
          desktopMenuPanel.style.visibility = 'hidden';
          desktopMenuWrap.style.display = 'none';
          desktopMenuWrap.classList.add('invisible');
          desktopMenuWrap.classList.remove('is-open');
        },
      });
    }

    if (desktopToggle) {
      desktopToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isDesktopMenuOpen) {
          closeDesktopMenu();
        } else {
          openDesktopMenu();
        }
      });
    }

    if (desktopMenuCloseBtn) {
      desktopMenuCloseBtn.addEventListener('click', closeDesktopMenu);
    }

    if (desktopMenuBackdrop) {
      desktopMenuBackdrop.addEventListener('click', closeDesktopMenu);
    }

    if (desktopMenuWrap) {
      desktopMenuWrap.addEventListener('click', (e) => {
        if (e.target === desktopMenuWrap) {
          closeDesktopMenu();
        }
      });
    }

    desktopMenuPanel?.querySelectorAll('.menu-link, .story-pill-link, .contact-val, .social-link').forEach((link) => {
      link.addEventListener('click', () => {
        closeDesktopMenu();
      });
    });

    // 4. Contact Popup Modal
    function openContactModal() {
      if (!contactPopupWrapper || !contactPopupPanel) return;
      if (isDesktopMenuOpen) closeDesktopMenu();

      isContactOpen = true;
      contactPopupWrapper.style.display = 'flex';
      contactPopupWrapper.classList.remove('invisible');
      contactPopupWrapper.classList.add('is-open');

      gsap.to(contactPopupPanel, {
        clipPath: 'circle(150% at 95% 5%)',
        opacity: 1,
        visibility: 'visible',
        duration: 0.65,
        ease: 'power3.out',
      });

      const staggerItems = contactPopupPanel.querySelectorAll('.stagger-item');
      gsap.fromTo(
        staggerItems,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, delay: 0.15, ease: 'power2.out' }
      );
    }

    function closeContactModal() {
      if (!contactPopupWrapper || !contactPopupPanel) return;
      isContactOpen = false;

      gsap.to(contactPopupPanel, {
        clipPath: 'circle(0% at 95% 5%)',
        opacity: 0,
        duration: 0.45,
        ease: 'power3.in',
        onComplete: () => {
          contactPopupPanel.style.visibility = 'hidden';
          contactPopupWrapper.style.display = 'none';
          contactPopupWrapper.classList.add('invisible');
          contactPopupWrapper.classList.remove('is-open');
        },
      });
    }

    document.querySelectorAll('[data-contact-trigger]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openContactModal();
      });
    });

    document.querySelectorAll('a[href="#contact"]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openContactModal();
      });
    });

    if (contactCloseBtn) {
      contactCloseBtn.addEventListener('click', closeContactModal);
    }

    if (contactBackdrop) {
      contactBackdrop.addEventListener('click', closeContactModal);
    }

    // 6. Custom Select Dropdowns in Contact Form
    const customSelects = document.querySelectorAll('.custom-select-box');
    customSelects.forEach((box) => {
      const trigger = box.querySelector('.select-trigger');
      const dropdown = box.querySelector('.select-dropdown');
      const valSpan = trigger?.querySelector('.select-val');
      const arrow = trigger?.querySelector('.select-arrow');

      if (!trigger || !dropdown) return;

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';

        // Close other dropdowns
        document.querySelectorAll('.custom-select-box .select-trigger').forEach((otherTrigger) => {
          if (otherTrigger !== trigger) {
            otherTrigger.setAttribute('aria-expanded', 'false');
            const otherDropdown = otherTrigger
              .closest('.custom-select-box')
              ?.querySelector('.select-dropdown');
            const otherArrow = otherTrigger.querySelector('.select-arrow');
            if (otherDropdown) {
              otherDropdown.classList.add(
                'invisible',
                'opacity-0',
                '-translate-y-2',
                'pointer-events-none'
              );
            }
            if (otherArrow) otherArrow.style.transform = 'rotate(0deg)';
          }
        });

        if (isOpen) {
          trigger.setAttribute('aria-expanded', 'false');
          dropdown.classList.remove('is-open');
          dropdown.classList.add('invisible', 'opacity-0', '-translate-y-2', 'pointer-events-none');
          if (arrow) arrow.style.transform = 'rotate(0deg)';
        } else {
          trigger.setAttribute('aria-expanded', 'true');
          dropdown.classList.add('is-open');
          dropdown.classList.remove(
            'invisible',
            'opacity-0',
            '-translate-y-2',
            'pointer-events-none'
          );
          if (arrow) arrow.style.transform = 'rotate(180deg)';
        }
      });

      dropdown.querySelectorAll('.select-option').forEach((option) => {
        option.addEventListener('click', (e) => {
          e.stopPropagation();
          if (valSpan) {
            valSpan.textContent = option.textContent.trim();
            valSpan.classList.remove('is-placeholder');
          }
          trigger.setAttribute('aria-expanded', 'false');
          dropdown.classList.remove('is-open');
          dropdown.classList.add('invisible', 'opacity-0', '-translate-y-2', 'pointer-events-none');
          if (arrow) arrow.style.transform = 'rotate(0deg)';
        });
      });
    });

    document.addEventListener('click', () => {
      document.querySelectorAll('.custom-select-box .select-trigger').forEach((trigger) => {
        trigger.setAttribute('aria-expanded', 'false');
        const dropdown = trigger.closest('.custom-select-box')?.querySelector('.select-dropdown');
        const arrow = trigger.querySelector('.select-arrow');
        if (dropdown) {
          dropdown.classList.remove('is-open');
          dropdown.classList.add(
            'invisible',
            'opacity-0',
            '-translate-y-2',
            'pointer-events-none'
          );
        }
        if (arrow) arrow.style.transform = 'rotate(0deg)';
      });
    });

    // 7. Form submission feedback
    const inquiryForm = document.getElementById('inquiry-form');
    if (inquiryForm) {
      inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = inquiryForm.querySelector('.form-submit-btn');
        const banner = inquiryForm.querySelector('.form-success-banner');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
        }
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.textContent = 'Inquiry Sent ✓';
            submitBtn.style.backgroundColor = '#1A6E32';
          }
          if (banner) {
            banner.style.display = 'block';
          }
          setTimeout(() => {
            closeContactModal();
            setTimeout(() => {
              inquiryForm.reset();
              if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Inquiry';
                submitBtn.style.backgroundColor = '';
              }
              if (banner) banner.style.display = 'none';
            }, 600);
          }, 1800);
        }, 700);
      });
    }

    // 8. Escape key dismisses modals and drawers
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (isContactOpen) closeContactModal();
        if (isDesktopMenuOpen) closeDesktopMenu();
      }
    });

    // 9. Clicking anywhere during the preloader instantly finishes it to enable full interactivity
    document.addEventListener('click', (e) => {
      if (isContactOpen || isDesktopMenuOpen) return;
      if (e.target.closest('#nav') || e.target.closest('#desktopMenuWrap') || e.target.closest('#contactPopupWrapper')) {
        return;
      }
      if (masterTl && masterTl.isActive() && masterTl.time() < 5.75) {
        masterTl.progress(1);
      }
    });

    // 10. GSAP Text Hover Animation (Exact similar to preloader wordmark reveal)
    // Applied to navbar CTA button, Menu button, and ALL menu buttons & links
    function initGsapTextHoverAnimations() {
      const targets = [
        { container: '.lets-talk-btn', text: '.lets-talk-text' },
        { container: '.main-toggle', text: '.main-toggle-label' },
        { container: '.menu-link', text: '.menu-link-text' },
        { container: '.story-pill-link', text: '.story-text' },
        { container: '.contact-val', text: '.val-text' },
        { container: '.social-link', text: '.social-text' },
        { container: '.hero-cta-btn', text: '.hero-cta-text' },
      ];

      targets.forEach(({ container, text }) => {
        document.querySelectorAll(container).forEach((btn) => {
          const textEl = btn.querySelector(text);
          if (!textEl || textEl.dataset.hoverReady === 'true') return;
          textEl.dataset.hoverReady = 'true';

          let rawText = textEl.textContent.trim();
          // If text is all uppercase, format to Title Case / Capitalized
          if (rawText === rawText.toUpperCase() && rawText !== rawText.toLowerCase()) {
            rawText = rawText.toLowerCase().replace(/(?:^|\s|-|\/)\S/g, (c) => c.toUpperCase());
          }

          textEl.innerHTML = '';
          textEl.style.textTransform = 'none';
          const charElements = [];

          for (let i = 0; i < rawText.length; i++) {
            const char = rawText[i];
            const span = document.createElement('span');
            span.className = 'btn-char';
            span.style.textTransform = 'none';
            if (char === ' ') {
              span.innerHTML = '&nbsp;';
            } else {
              span.textContent = char;
            }
            textEl.appendChild(span);
            charElements.push(span);
          }

          let hoverTween = null;

          btn.addEventListener('mouseenter', () => {
            if (hoverTween) hoverTween.kill();
            // Match preloader wordmark reveal: blur -> blur(0px), opacity -> 1, power2.out, stagger random
            gsap.set(charElements, {
              filter: 'blur(10px)',
              opacity: 0.15,
            });

            hoverTween = gsap.to(charElements, {
              filter: 'blur(0px)',
              opacity: 1,
              duration: 0.42,
              ease: 'power2.out',
              stagger: {
                each: 0.035,
                from: 'random',
              },
            });
          });

          btn.addEventListener('mouseleave', () => {
            if (hoverTween) hoverTween.kill();
            gsap.to(charElements, {
              filter: 'blur(0px)',
              opacity: 1,
              duration: 0.2,
              ease: 'power2.out',
            });
          });
        });
      });
    }

    initGsapTextHoverAnimations();
  }

  // Initialize interactive navigation
  initInteractiveNavigation();

  // ==========================================================================
  // Interactive 3D Hero Object (High-Performance Three.js + Web Worker GLB Engine)
  // ==========================================================================
  function initHero3DObject() {
    const canvas = document.getElementById('hero-3d-canvas');
    if (!canvas) return;

    const startThreeScene = () => {
      const THREE = window.THREE;
      const GLTFLoader = window.GLTFLoader;
      if (!THREE) return;

      // Scene setup
      const scene = new THREE.Scene();

      // Camera setup: 38-degree studio FOV centered on (0, 0, 0)
      const camera = new THREE.PerspectiveCamera(
        38,
        window.innerWidth / window.innerHeight,
        0.1,
        50
      );
      camera.position.set(0, 0, 5.2);
      camera.lookAt(0, 0, 0);

      // High-performance WebGLRenderer: cap DPR at 1.25 and disable expensive real-time shadow maps
      // (Soft blurred shadows are rendered via pre-computed radial gradient planes at near-zero GPU cost)
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = false;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.88;
      if ('outputColorSpace' in renderer && THREE.SRGBColorSpace) {
        renderer.outputColorSpace = THREE.SRGBColorSpace;
      }

      // ---- Multi-Point Cinematic Studio Lighting (Deep Midnight Dark-Blue Palette) ----
      // 1. Hemisphere ambient light (deep navy sky #122B7A, abyssal midnight ground #01030A)
      const hemiLight = new THREE.HemisphereLight(0x14308a, 0x01030a, 1.05);
      hemiLight.position.set(0, 6, 0);
      scene.add(hemiLight);

      // 2. Main Key Light with deep sapphire tint (no real-time shadow map pass needed)
      const keyLight = new THREE.DirectionalLight(0x2b5be0, 1.85);
      keyLight.position.set(3.6, 4.8, 4.6);
      scene.add(keyLight);

      // 3. Deep Midnight Navy Fill Light from left for rich dark-blue midtones
      const fillLight = new THREE.DirectionalLight(0x0a1c58, 1.45);
      fillLight.position.set(-4.5, 1.6, 3.2);
      scene.add(fillLight);

      // 4. Sculptural Dark-Blue Rim / Backlight for crisp edge separation
      const rimLight = new THREE.DirectionalLight(0x1f49c8, 2.1);
      rimLight.position.set(0.6, 3.6, -4.2);
      scene.add(rimLight);

      // 5. Dynamic Cursor-Tracking Deep Navy Point Light
      const cursorLight = new THREE.PointLight(0x1a40b8, 1.75, 10);
      cursorLight.position.set(0, 0, 3.0);
      scene.add(cursorLight);

      // ---- Ultra-Soft Blurred Drop Shadow & Floating Contact Shadow (4 triangles total) ----
      function createBlurredShadowTexture(innerAlpha = 0.58, midAlpha = 0.24) {
        const shadowCanvas = document.createElement('canvas');
        shadowCanvas.width = 256;
        shadowCanvas.height = 256;
        const ctx = shadowCanvas.getContext('2d');
        if (ctx) {
          const gradient = ctx.createRadialGradient(128, 128, 4, 128, 128, 124);
          gradient.addColorStop(0.0, `rgba(1, 3, 10, ${innerAlpha})`);
          gradient.addColorStop(0.25, `rgba(2, 5, 15, ${innerAlpha * 0.78})`);
          gradient.addColorStop(0.5, `rgba(3, 8, 22, ${midAlpha})`);
          gradient.addColorStop(0.75, `rgba(3, 8, 22, ${midAlpha * 0.32})`);
          gradient.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 256, 256);
        }
        return new THREE.CanvasTexture(shadowCanvas);
      }

      // Softly blurred atmospheric drop shadow behind the 3D object
      const ambientDropShadowMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(3.4, 3.4),
        new THREE.MeshBasicMaterial({
          map: createBlurredShadowTexture(0.66, 0.28),
          transparent: true,
          depthWrite: false,
          opacity: 0.92,
        })
      );
      ambientDropShadowMesh.position.set(-0.14, -0.16, -0.68);
      scene.add(ambientDropShadowMesh);

      // Softly blurred radial contact shadow beneath the floating 3D object
      const floorShadowMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(3.1, 1.35),
        new THREE.MeshBasicMaterial({
          map: createBlurredShadowTexture(0.58, 0.24),
          transparent: true,
          depthWrite: false,
          opacity: 0.85,
        })
      );
      floorShadowMesh.rotation.x = -Math.PI * 0.43;
      floorShadowMesh.position.set(0, -1.32, -0.22);
      scene.add(floorShadowMesh);

      // ---- Hierarchy Groups for Centering, Cursor Rotation & Idle Float ----
      const cursorPivotGroup = new THREE.Group();
      const floatGroup = new THREE.Group();
      cursorPivotGroup.add(floatGroup);
      scene.add(cursorPivotGroup);

      // High-efficiency single-pass MeshStandardMaterial in Ultra-Deep Midnight Dark-Blue
      const deepDarkBlueMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#040D2E'),
        emissive: new THREE.Color('#02071C'),
        emissiveIntensity: 0.28,
        metalness: 0.35,
        roughness: 0.28,
        side: THREE.FrontSide,
      });

      let loadedModel = null;
      let baseNormalizedScale = 1;
      let needsRender = true;

      function updateResponsiveScale() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        needsRender = true;

        if (!loadedModel) return;
        let targetVisualSize = 2.15;
        if (w < 480) {
          targetVisualSize = 1.45;
        } else if (w < 768) {
          targetVisualSize = 1.68;
        } else if (w < 1024) {
          targetVisualSize = 1.9;
        }
        const finalScale = baseNormalizedScale * targetVisualSize;
        loadedModel.scale.setScalar(finalScale);

        const ratio = targetVisualSize / 2.15;
        floorShadowMesh.position.y = -targetVisualSize * 0.6;
        floorShadowMesh.scale.setScalar(ratio);
        ambientDropShadowMesh.scale.setScalar(ratio);
      }

      // Lightweight immediate 3D "D" preview mesh (~1,800 triangles) while background worker processes GLB
      function createImmediateDLogoMesh() {
        const shape = new THREE.Shape();
        shape.moveTo(-0.42, -0.44);
        shape.lineTo(0.04, -0.44);
        shape.absarc(0.04, 0, 0.44, -Math.PI / 2, Math.PI / 2, false);
        shape.lineTo(-0.42, 0.44);
        shape.closePath();

        const hole = new THREE.Path();
        hole.moveTo(-0.18, -0.22);
        hole.lineTo(0.02, -0.22);
        hole.absarc(0.02, 0, 0.22, -Math.PI / 2, Math.PI / 2, false);
        hole.lineTo(-0.18, 0.22);
        hole.closePath();
        shape.holes.push(hole);

        const extrudeGeometry = new THREE.ExtrudeGeometry(shape, {
          depth: 0.18,
          bevelEnabled: true,
          bevelSegments: 4,
          steps: 1,
          bevelSize: 0.042,
          bevelThickness: 0.042,
          curveSegments: 24,
        });
        extrudeGeometry.center();
        extrudeGeometry.computeVertexNormals();

        const mesh = new THREE.Mesh(extrudeGeometry, deepDarkBlueMaterial);
        const group = new THREE.Group();
        group.add(mesh);
        return group;
      }

      const previewModel = createImmediateDLogoMesh();
      loadedModel = previewModel;
      baseNormalizedScale = 1;
      floatGroup.add(previewModel);
      updateResponsiveScale();

      // ---- Off-Main-Thread Web Worker for Zero-Lag GLB Download, Mesh Decimation & Smooth Normals ----
      const GLB_URLS = [
        'https://raw.githubusercontent.com/codeovik/Denzo-files/refs/heads/main/d-letter-logo-3d.glb',
        'https://raw.githubusercontent.com/codeovik/Denzo-files/main/d-letter-logo-3d.glb',
        'https://raw.githubusercontent.com/codeovik/Denzo-files/refs/heads/main/d-3d.glb',
      ];

      function loadAndOptimizeGlbInWorker() {
        const workerCode = `
          self.onmessage = async function(e) {
            const urls = e.data.urls;
            let arrayBuffer = null;
            for (let i = 0; i < urls.length; i++) {
              try {
                const res = await fetch(urls[i]);
                if (res.ok) {
                  arrayBuffer = await res.arrayBuffer();
                  break;
                }
              } catch (err) {}
            }
            if (!arrayBuffer) {
              self.postMessage({ error: true });
              return;
            }

            try {
              const view = new DataView(arrayBuffer);
              const magic = view.getUint32(0, true);
              if (magic !== 0x46546C67) throw new Error('Invalid GLB');
              const jsonLen = view.getUint32(12, true);
              const jsonBytes = new Uint8Array(arrayBuffer, 20, jsonLen);
              const gltf = JSON.parse(new TextDecoder().decode(jsonBytes));

              const binChunkOffset = 20 + jsonLen + 8;
              const prim = gltf.meshes[0].primitives[0];
              const idxAcc = gltf.accessors[prim.indices];
              const posAcc = gltf.accessors[prim.attributes.POSITION];
              const idxView = gltf.bufferViews[idxAcc.bufferView];
              const posView = gltf.bufferViews[posAcc.bufferView];

              const rawIndices = new Uint32Array(
                arrayBuffer,
                binChunkOffset + (idxView.byteOffset || 0) + (idxAcc.byteOffset || 0),
                idxAcc.count
              );
              const rawPositions = new Float32Array(
                arrayBuffer,
                binChunkOffset + (posView.byteOffset || 0) + (posAcc.byteOffset || 0),
                posAcc.count * 3
              );

              // Compute bounding box
              let minX = Infinity, minY = Infinity, minZ = Infinity;
              let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
              const vCount = posAcc.count;
              for (let i = 0; i < vCount; i++) {
                const x = rawPositions[i * 3];
                const y = rawPositions[i * 3 + 1];
                const z = rawPositions[i * 3 + 2];
                if (x < minX) minX = x;
                if (y < minY) minY = y;
                if (z < minZ) minZ = z;
                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;
                if (z > maxZ) maxZ = z;
              }

              const cx = (minX + maxX) * 0.5;
              const cy = (minY + maxY) * 0.5;
              const cz = (minZ + maxZ) * 0.5;
              const sizeX = (maxX - minX) || 1;
              const sizeY = (maxY - minY) || 1;
              const sizeZ = (maxZ - minZ) || 1;
              const maxDim = Math.max(sizeX, sizeY, sizeZ) || 1;

              // Spatial Vertex Clustering Decimation (reduces 740k triangles to ~32k smooth triangles)
              const GX = 148, GY = 148, GZ = 56;
              const invX = (GX - 1) / sizeX;
              const invY = (GY - 1) / sizeY;
              const invZ = (GZ - 1) / sizeZ;

              const cellToNewIdx = new Int32Array(GX * GY * GZ);
              cellToNewIdx.fill(-1);
              const oldToNew = new Uint32Array(vCount);

              const sumX = new Float64Array(vCount);
              const sumY = new Float64Array(vCount);
              const sumZ = new Float64Array(vCount);
              const counts = new Uint32Array(vCount);
              let uniqueCount = 0;

              for (let i = 0; i < vCount; i++) {
                const x = rawPositions[i * 3];
                const y = rawPositions[i * 3 + 1];
                const z = rawPositions[i * 3 + 2];
                const gx = Math.max(0, Math.min(GX - 1, ((x - minX) * invX) | 0));
                const gy = Math.max(0, Math.min(GY - 1, ((y - minY) * invY) | 0));
                const gz = Math.max(0, Math.min(GZ - 1, ((z - minZ) * invZ) | 0));
                const cellKey = gx + gy * GX + gz * GX * GY;

                let newIdx = cellToNewIdx[cellKey];
                if (newIdx === -1) {
                  newIdx = uniqueCount++;
                  cellToNewIdx[cellKey] = newIdx;
                }
                oldToNew[i] = newIdx;
                sumX[newIdx] += (x - cx) / maxDim;
                sumY[newIdx] += (y - cy) / maxDim;
                sumZ[newIdx] += (z - cz) / maxDim;
                counts[newIdx]++;
              }

              const outPositions = new Float32Array(uniqueCount * 3);
              for (let i = 0; i < uniqueCount; i++) {
                const invC = 1 / counts[i];
                outPositions[i * 3] = sumX[i] * invC;
                outPositions[i * 3 + 1] = sumY[i] * invC;
                outPositions[i * 3 + 2] = sumZ[i] * invC;
              }

              // Filter non-degenerate triangles
              const tempIndices = new Uint32Array(rawIndices.length);
              let outIdxCount = 0;
              for (let i = 0; i < rawIndices.length; i += 3) {
                const i0 = oldToNew[rawIndices[i]];
                const i1 = oldToNew[rawIndices[i + 1]];
                const i2 = oldToNew[rawIndices[i + 2]];
                if (i0 !== i1 && i1 !== i2 && i2 !== i0) {
                  tempIndices[outIdxCount++] = i0;
                  tempIndices[outIdxCount++] = i1;
                  tempIndices[outIdxCount++] = i2;
                }
              }

              const outIndices = tempIndices.slice(0, outIdxCount);

              // Compute smooth area-weighted vertex normals
              const outNormals = new Float32Array(uniqueCount * 3);
              for (let i = 0; i < outIdxCount; i += 3) {
                const i0 = outIndices[i] * 3;
                const i1 = outIndices[i + 1] * 3;
                const i2 = outIndices[i + 2] * 3;

                const ax = outPositions[i1] - outPositions[i0];
                const ay = outPositions[i1 + 1] - outPositions[i0 + 1];
                const az = outPositions[i1 + 2] - outPositions[i0 + 2];

                const bx = outPositions[i2] - outPositions[i0];
                const by = outPositions[i2 + 1] - outPositions[i0 + 1];
                const bz = outPositions[i2 + 2] - outPositions[i0 + 2];

                const nx = ay * bz - az * by;
                const ny = az * bx - ax * bz;
                const nz = ax * by - ay * bx;

                outNormals[i0] += nx;
                outNormals[i0 + 1] += ny;
                outNormals[i0 + 2] += nz;

                outNormals[i1] += nx;
                outNormals[i1 + 1] += ny;
                outNormals[i1 + 2] += nz;

                outNormals[i2] += nx;
                outNormals[i2 + 1] += ny;
                outNormals[i2 + 2] += nz;
              }

              for (let i = 0; i < uniqueCount; i++) {
                const ox = outNormals[i * 3];
                const oy = outNormals[i * 3 + 1];
                const oz = outNormals[i * 3 + 2];
                const len = Math.hypot(ox, oy, oz) || 1;
                outNormals[i * 3] = ox / len;
                outNormals[i * 3 + 1] = oy / len;
                outNormals[i * 3 + 2] = oz / len;
              }

              self.postMessage(
                {
                  positions: outPositions.buffer,
                  normals: outNormals.buffer,
                  indices: outIndices.buffer,
                },
                [outPositions.buffer, outNormals.buffer, outIndices.buffer]
              );
            } catch (err) {
              self.postMessage({ error: true });
            }
          };
        `;

        const blob = new Blob([workerCode], { type: 'application/javascript' });
        const workerUrl = URL.createObjectURL(blob);
        const worker = new Worker(workerUrl);

        worker.onmessage = (e) => {
          URL.revokeObjectURL(workerUrl);
          worker.terminate();

          if (e.data && !e.data.error && e.data.positions) {
            const positions = new Float32Array(e.data.positions);
            const normals = new Float32Array(e.data.normals);
            const indices = new Uint32Array(e.data.indices);

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
            geometry.setIndex(new THREE.BufferAttribute(indices, 1));

            const mesh = new THREE.Mesh(geometry, deepDarkBlueMaterial);
            const modelGroup = new THREE.Group();
            modelGroup.add(mesh);

            if (previewModel && previewModel.parent) {
              floatGroup.remove(previewModel);
              previewModel.traverse((c) => {
                if (c.geometry) c.geometry.dispose();
              });
            }

            baseNormalizedScale = 1;
            loadedModel = modelGroup;
            floatGroup.add(modelGroup);
            updateResponsiveScale();
            needsRender = true;
          } else if (GLTFLoader) {
            // Fallback to standard GLTFLoader if worker encounters non-standard GLB
            const loader = new GLTFLoader();
            loader.load(GLB_URLS[0], (gltf) => {
              const model = gltf.scene;
              model.traverse((child) => {
                if (child.isMesh) {
                  if (child.geometry) {
                    child.geometry.center();
                    child.geometry.computeVertexNormals();
                  }
                  child.material = deepDarkBlueMaterial;
                }
              });
              const box = new THREE.Box3().setFromObject(model);
              const size = new THREE.Vector3();
              box.getSize(size);
              baseNormalizedScale = 1 / (Math.max(size.x, size.y, size.z) || 1);
              if (previewModel && previewModel.parent) floatGroup.remove(previewModel);
              loadedModel = model;
              floatGroup.add(model);
              updateResponsiveScale();
              needsRender = true;
            });
          }
        };

        // Start worker download after initial preloader wordmark blur completes (1.0s) to prevent startup contention
        setTimeout(() => {
          worker.postMessage({ urls: GLB_URLS });
        }, 900);
      }

      loadAndOptimizeGlbInWorker();

      // ---- Cursor & Touch Movement Tracking ----
      let targetMouseX = 0;
      let targetMouseY = 0;
      let currentMouseX = 0;
      let currentMouseY = 0;
      let isHeroVisible = true;

      // Pause 3D rendering when hero section is scrolled out of view
      const stageEl = document.getElementById('stage');
      if (stageEl && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              isHeroVisible = entry.isIntersecting;
            });
          },
          { threshold: 0.05 }
        );
        observer.observe(stageEl);
      }

      const onPointerMove = (clientX, clientY) => {
        if (!isHeroVisible) return;
        targetMouseX = (clientX / window.innerWidth) * 2 - 1;
        targetMouseY = (clientY / window.innerHeight) * 2 - 1;
        needsRender = true;
      };

      window.addEventListener(
        'mousemove',
        (e) => {
          onPointerMove(e.clientX, e.clientY);
        },
        { passive: true }
      );

      window.addEventListener(
        'touchmove',
        (e) => {
          if (e.touches && e.touches.length > 0) {
            onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
          }
        },
        { passive: true }
      );

      document.addEventListener('mouseleave', () => {
        targetMouseX = 0;
        targetMouseY = 0;
      });

      window.addEventListener('resize', updateResponsiveScale);

      // ---- Render & Smooth Damped Rotation Loop (Visibility-Gated) ----
      const clock = new THREE.Clock();

      function animate3D() {
        requestAnimationFrame(animate3D);

        // Skip GPU rendering while hero section is scrolled out of view or hidden during early preloader
        if (!isHeroVisible || document.hidden) return;
        if (hero3dWrapper && parseFloat(gsap.getProperty(hero3dWrapper, 'opacity') || 0) < 0.01) {
          return;
        }

        const elapsed = clock.getElapsedTime();

        // Smoothly interpolate toward cursor position
        currentMouseX += (targetMouseX - currentMouseX) * 0.065;
        currentMouseY += (targetMouseY - currentMouseY) * 0.065;

        // Rotate 3D object in response to cursor movement
        cursorPivotGroup.rotation.y = currentMouseX * 0.68;
        cursorPivotGroup.rotation.x = currentMouseY * 0.42;
        cursorPivotGroup.rotation.z = -currentMouseX * 0.08;

        // Subtle spatial parallax while staying anchored in center of hero section
        cursorPivotGroup.position.x = currentMouseX * 0.12;
        cursorPivotGroup.position.y = -currentMouseY * 0.08;

        // Slow, subtle continuous floating motion (small range & slow cadence)
        const floatOffset = Math.sin(elapsed * 0.65) * 0.02;
        floatGroup.position.y = floatOffset;
        floatGroup.rotation.y = Math.sin(elapsed * 0.38) * 0.022;

        // Update dynamic light & soft blurred shadows with movement
        cursorLight.position.x = currentMouseX * 2.5;
        cursorLight.position.y = -currentMouseY * 2.0;

        ambientDropShadowMesh.position.x = -0.14 + currentMouseX * 0.22;
        ambientDropShadowMesh.position.y = -0.16 - currentMouseY * 0.16 + floatOffset * 0.6;

        floorShadowMesh.position.x = currentMouseX * 0.16;
        const shadowScaleFactor = 1 - floatOffset * 0.75;
        floorShadowMesh.material.opacity = 0.74 - floatOffset * 1.1;
        const baseRatio = loadedModel ? loadedModel.scale.x / (baseNormalizedScale * 2.15) : 1;
        floorShadowMesh.scale.x = baseRatio * shadowScaleFactor;

        renderer.render(scene, camera);
      }

      animate3D();
    };

    if (window.THREE) {
      startThreeScene();
    } else {
      window.addEventListener('three-ready', startThreeScene, { once: true });
    }
  }

  initHero3DObject();

  // ==========================================================================
  // GSAP Scroll Reveal Animation for AI Statement Section (Words + Inline Pill Images)
  // ==========================================================================
  function initAiStatementScrollReveal() {
    const section = document.getElementById('ai-statement-section');
    const capsule = document.getElementById('ai-start-capsule');
    const statementEl = document.getElementById('ai-statement-text');
    if (!section || !statementEl) return;

    // Smooth scroll from Hero "Scroll To See" indicator & Explore CTA to this section
    const scrollBtn = document.getElementById('hero-scroll-indicator');
    if (scrollBtn) {
      scrollBtn.addEventListener('click', () => {
        section.scrollIntoView({ behavior: 'smooth' });
      });
    }
    document.querySelectorAll('a[href="#work"], a[href="#about"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        section.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Split each .ai-word-chunk into individual .ai-reveal-word spans while preserving inline media pills
    const wordChunks = statementEl.querySelectorAll('.ai-word-chunk');
    wordChunks.forEach((chunk) => {
      if (chunk.dataset.splitDone === 'true') return;
      chunk.dataset.splitDone = 'true';
      const isBrandHighlight = chunk.classList.contains('ai-brand-highlight');
      const words = (chunk.textContent || '').trim().split(/\s+/);
      chunk.innerHTML = '';
      words.forEach((word, idx) => {
        const span = document.createElement('span');
        span.className = isBrandHighlight
          ? 'ai-reveal-word ai-brand-word ai-reveal-seq'
          : 'ai-reveal-word ai-reveal-seq';
        span.textContent = word;
        chunk.appendChild(span);
        if (idx < words.length - 1) {
          chunk.appendChild(document.createTextNode(' '));
        }
      });
    });

    // Mark inline media pills as part of the sequential reveal stream
    const mediaPills = statementEl.querySelectorAll('.inline-media-pill');
    mediaPills.forEach((pill) => {
      pill.classList.add('ai-reveal-seq');
    });

    // Collect all sequential items (words + inline rounded images in reading order)
    const seqItems = Array.from(statementEl.querySelectorAll('.ai-reveal-seq'));
    const innerImgs = Array.from(statementEl.querySelectorAll('.inline-media-img'));

    // Set initial hidden states: blurred, faded out, shifted downward (bottom-to-top reveal)
    if (capsule) {
      gsap.set(capsule, {
        opacity: 0,
        y: 26,
        filter: 'blur(10px)',
      });
    }

    seqItems.forEach((el) => {
      if (el.classList.contains('inline-media-pill')) {
        gsap.set(el, {
          opacity: 0,
          y: 34,
          scale: 0.76,
          filter: 'blur(14px)',
        });
      } else {
        gsap.set(el, {
          opacity: 0,
          y: 30,
          filter: 'blur(12px)',
        });
      }
    });

    if (innerImgs.length > 0) {
      gsap.set(innerImgs, {
        scale: 1.28,
      });
    }

    // Build GSAP ScrollTrigger Timeline (Slower, more deliberate reveal cadence)
    const revealTl = gsap.timeline({
      scrollTrigger:
        typeof ScrollTrigger !== 'undefined'
          ? {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            }
          : undefined,
    });

    // 1. Capsule reveal (blur -> 0, fade-in, bottom to top)
    if (capsule) {
      revealTl.to(
        capsule,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.15,
          ease: 'power3.out',
        },
        0
      );
    }

    // 2. Words & Inline Rounded Images staggered reveal (slower duration & stagger)
    revealTl.to(
      seqItems,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.25,
        stagger: 0.065,
        ease: 'power3.out',
      },
      0.25
    );

    // 3. Inner rounded images subtle cinematic lens zoom-out settle
    if (innerImgs.length > 0) {
      revealTl.to(
        innerImgs,
        {
          scale: 1.04,
          duration: 1.65,
          stagger: 0.24,
          ease: 'power3.out',
        },
        0.35
      );
    }
  }

  initAiStatementScrollReveal();

  // Debounced window resize handler to adapt positions on mobile orientation change
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Re-read current character spans
      const chars = wordEl.querySelectorAll('.char');
      if (chars.length > 0) {
        buildTimeline(chars);
      }
    }, 250);
  });
});
