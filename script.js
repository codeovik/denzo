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

// Force scroll to top hero section on page load / refresh
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

window.addEventListener('pageshow', () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
});

document.addEventListener('DOMContentLoaded', () => {
  // Ensure viewport starts at the very top hero section on every refresh
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  document.getElementById('nav')?.classList.remove('scrolled');

  let hasPreloaderCompleted = false;
  let lenis = null;

  // Initialize Lenis Smooth Scroll & synchronize with GSAP ScrollTrigger
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.18,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      autoRaf: false,
    });
    window.lenis = lenis;

    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
    }

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }

  function smoothScrollToElement(targetEl) {
    if (!targetEl) return;
    if (lenis) {
      lenis.scrollTo(targetEl, { duration: 1.35 });
    } else {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function lockScrollForPreloader() {
    document.documentElement.classList.add('preloader-active');
    document.body.classList.add('preloader-active');
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
      lenis.stop();
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    document.getElementById('nav')?.classList.remove('scrolled');
  }

  function unlockScrollAfterPreloader() {
    if (hasPreloaderCompleted) return;
    hasPreloaderCompleted = true;
    document.documentElement.classList.remove('preloader-active');
    document.body.classList.remove('preloader-active');
    document.documentElement.style.overflowY = '';
    document.body.style.overflowY = '';
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    document.getElementById('nav')?.classList.remove('scrolled');
    if (lenis) {
      lenis.resize();
      lenis.scrollTo(0, { immediate: true, force: true });
      lenis.start();
    }
    if (typeof ScrollTrigger !== 'undefined') {
      requestAnimationFrame(() => {
        if (lenis) lenis.resize();
        ScrollTrigger.refresh();
      });
    }
  }

  lockScrollForPreloader();

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
      onComplete: () => {
        unlockScrollAfterPreloader();
      },
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

    // Unlock vertical scroll once hero section is revealed
    masterTl.call(unlockScrollAfterPreloader, null, 5.55);

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
    const ctaWrap = document.getElementById('ai-statement-cta');
    if (!section || !statementEl) return;

    // Smooth scroll from Hero "Scroll To See" indicator & Explore CTA to this section
    const scrollBtn = document.getElementById('hero-scroll-indicator');
    if (scrollBtn) {
      scrollBtn.addEventListener('click', () => {
        smoothScrollToElement(section);
      });
    }
    document.querySelectorAll('a[href="#work"], a[href="#about"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollToElement(section);
      });
    });

    // Split each .ai-word-chunk into individual .ai-reveal-word spans with explicit spacing & line-break opportunities
    const wordChunks = statementEl.querySelectorAll('.ai-word-chunk');
    wordChunks.forEach((chunk) => {
      if (chunk.dataset.splitDone === 'true') return;
      chunk.dataset.splitDone = 'true';
      const isBrandHighlight = chunk.classList.contains('ai-brand-highlight');
      const words = (chunk.textContent || '').trim().split(/\s+/).filter(Boolean);
      chunk.innerHTML = '';
      words.forEach((word) => {
        const span = document.createElement('span');
        span.className = isBrandHighlight
          ? 'ai-reveal-word ai-brand-word ai-reveal-seq'
          : 'ai-reveal-word ai-reveal-seq';
        span.textContent = word;
        chunk.appendChild(span);
        chunk.appendChild(document.createElement('wbr'));
      });
    });

    // Mark inline media pills as part of the sequential reveal stream
    const mediaPills = statementEl.querySelectorAll('.inline-media-pill');
    mediaPills.forEach((pill) => {
      pill.classList.add('ai-reveal-seq');
    });

    // Collect all sequential items (words + inline rounded images in reading order)
    const seqItems = Array.from(statementEl.querySelectorAll('.ai-reveal-seq'));
    let lineTriggers = [];

    function setupLineByLineReveal() {
      // Clear previous line ScrollTriggers if rebuilt on resize
      lineTriggers.forEach((st) => st.kill());
      lineTriggers = [];

      // Reset transforms temporarily so offsetTop reflects true visual lines
      gsap.set(seqItems, {
        clearProps: 'transform,opacity,filter',
      });

      // Group sequential items (words + inline media pills) into visual lines
      const lines = [];
      let currentLine = [];
      let currentLineCenterY = null;

      seqItems.forEach((el) => {
        const itemCenterY = el.offsetTop + el.offsetHeight / 2;
        if (
          currentLineCenterY === null ||
          Math.abs(itemCenterY - currentLineCenterY) <= 28
        ) {
          currentLine.push(el);
          if (currentLineCenterY === null) {
            currentLineCenterY = itemCenterY;
          }
        } else {
          lines.push(currentLine);
          currentLine = [el];
          currentLineCenterY = itemCenterY;
        }
      });
      if (currentLine.length > 0) {
        lines.push(currentLine);
      }

      // 1. Capsule reveal when capsule enters viewport
      if (capsule) {
        gsap.set(capsule, {
          opacity: 0,
          y: 26,
          filter: 'blur(10px)',
        });

        const capTl = gsap.timeline({
          scrollTrigger:
            typeof ScrollTrigger !== 'undefined'
              ? {
                  trigger: capsule,
                  start: 'top 88%',
                  toggleActions: 'play none none reverse',
                }
              : undefined,
        });

        capTl.to(capsule, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.95,
          ease: 'power3.out',
        });

        if (capTl.scrollTrigger) {
          lineTriggers.push(capTl.scrollTrigger);
        }
      }

      // 2. Line-by-line reveal: each visual line triggers independently as you scroll down
      lines.forEach((lineItems) => {
        const lineImgs = [];

        lineItems.forEach((el) => {
          if (el.classList.contains('inline-media-pill')) {
            gsap.set(el, {
              opacity: 0,
              y: 30,
              scale: 0.76,
              filter: 'blur(14px)',
            });
            const img = el.querySelector('.inline-media-img');
            if (img) {
              gsap.set(img, { scale: 1.28 });
              lineImgs.push(img);
            }
          } else {
            gsap.set(el, {
              opacity: 0,
              y: 28,
              filter: 'blur(12px)',
            });
          }
        });

        const lineTl = gsap.timeline({
          scrollTrigger:
            typeof ScrollTrigger !== 'undefined'
              ? {
                  trigger: lineItems[0],
                  start: 'top 86%',
                  toggleActions: 'play none none reverse',
                }
              : undefined,
        });

        lineTl.to(
          lineItems,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.9,
            stagger: 0.07,
            ease: 'power3.out',
          },
          0
        );

        if (lineImgs.length > 0) {
          lineTl.to(
            lineImgs,
            {
              scale: 1.04,
              duration: 1.25,
              ease: 'power3.out',
            },
            0.1
          );
        }

        if (lineTl.scrollTrigger) {
          lineTriggers.push(lineTl.scrollTrigger);
        }
      });

      // 3. Primary CTA button reveal when scrolling down to the CTA at end of section
      if (ctaWrap) {
        gsap.set(ctaWrap, {
          opacity: 0,
          y: 28,
          filter: 'blur(10px)',
        });

        const ctaTl = gsap.timeline({
          scrollTrigger:
            typeof ScrollTrigger !== 'undefined'
              ? {
                  trigger: ctaWrap,
                  start: 'top 88%',
                  toggleActions: 'play none none reverse',
                }
              : undefined,
        });

        ctaTl.to(ctaWrap, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.95,
          ease: 'power3.out',
        });

        if (ctaTl.scrollTrigger) {
          lineTriggers.push(ctaTl.scrollTrigger);
        }
      }
    }

    setupLineByLineReveal();

    // Re-compute visual line groupings if viewport width changes significantly
    let aiResizeTimer = null;
    let lastAiWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      clearTimeout(aiResizeTimer);
      aiResizeTimer = setTimeout(() => {
        if (Math.abs(window.innerWidth - lastAiWidth) > 15) {
          lastAiWidth = window.innerWidth;
          setupLineByLineReveal();
          if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
          }
        }
      }, 260);
    });
  }

  initAiStatementScrollReveal();

  // Shared helper: split text nodes into .cta-reveal-word spans while preserving child elements
  function splitTextNodesToRevealWords(container) {
    if (!container || container.dataset.wordsSplit === 'true') {
      return container ? Array.from(container.querySelectorAll('.cta-reveal-word')) : [];
    }
    container.dataset.wordsSplit = 'true';
    const childNodes = Array.from(container.childNodes);
    container.innerHTML = '';

    childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const parts = node.textContent.split(/(\s+)/);
        parts.forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            container.appendChild(document.createTextNode(' '));
          } else {
            const span = document.createElement('span');
            span.className = 'cta-reveal-word';
            span.textContent = part;
            container.appendChild(span);
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === 'BR') {
          container.appendChild(node.cloneNode(true));
        } else {
          const elClone = node.cloneNode(true);
          elClone.classList.add('cta-reveal-word');
          container.appendChild(elClone);
        }
      }
    });

    return Array.from(container.querySelectorAll('.cta-reveal-word'));
  }

  // Shared helper: group word elements into visual lines by vertical center
  function groupWordsByVisualLines(elements, threshold = 22) {
    const lines = [];
    let currentLine = [];
    let currentCenterY = null;

    elements.forEach((el) => {
      const rectTop = el.offsetTop + el.offsetHeight / 2;
      if (currentCenterY === null || Math.abs(rectTop - currentCenterY) <= threshold) {
        currentLine.push(el);
        if (currentCenterY === null) currentCenterY = rectTop;
      } else {
        lines.push(currentLine);
        currentLine = [el];
        currentCenterY = rectTop;
      }
    });

    if (currentLine.length > 0) {
      lines.push(currentLine);
    }
    return lines;
  }

  // ==========================================================================
  // GSAP Pinned Stack & Scroll Reveal for "One Studio" Services Section
  // ==========================================================================
  function initServicesPinnedStack() {
    const servicesSection = document.getElementById('services-section');
    const headerStage = document.getElementById('services-header-stage');
    const studioCapsule = document.getElementById('one-studio-capsule');
    const titleWords = Array.from(
      document.querySelectorAll('#services-main-title .services-title-word')
    );
    if (!servicesSection) return;

    // Smooth scroll from navigation #services link to this section
    document.querySelectorAll('a[href="#services"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollToElement(servicesSection);
      });
    });

    gsap.config({ force3D: true });

    // 1. Line-by-Line Word Blur Reveal for "One Studio" Capsule & "Intelligence Built Into Everything"
    if (headerStage && typeof ScrollTrigger !== 'undefined') {
      if (studioCapsule) {
        gsap.set(studioCapsule, {
          opacity: 0,
          y: 26,
          filter: 'blur(10px)',
        });

        gsap.to(studioCapsule, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: studioCapsule,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      if (titleWords.length > 0) {
        const titleLines = groupWordsByVisualLines(titleWords, 26);
        titleLines.forEach((lineItems) => {
          gsap.set(lineItems, {
            opacity: 0,
            y: 28,
            filter: 'blur(12px)',
          });

          gsap.to(lineItems, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            stagger: 0.075,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: lineItems[0],
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          });
        });
      }
    }

    // 2. Full-Width Service Cards: Pinned Stack + Scale/Dim Scrub + Word-by-Word Content & Card Visual Reveal
    if (typeof ScrollTrigger === 'undefined') return;

    const cards = gsap.utils.toArray('.service-stack-card');
    const total = cards.length;

    cards.forEach((card, i) => {
      const inner = card.querySelector('.service-card-inner');
      const overlay = card.querySelector('.dim-overlay');
      const numEl = card.querySelector('.service-card-num');
      const titleEl = card.querySelector('.service-card-title');
      const leadEl = card.querySelector('.service-card-lead');
      const descEl = card.querySelector('.service-card-desc');
      const statementsEl = card.querySelector('.service-card-statements');
      const actionEl = card.querySelector('.service-card-action');
      const visualBox = card.querySelector('.service-card-visual');
      const visualImg = card.querySelector('.service-card-img');
      const color = card.dataset.color || '#2E5FFF';

      if (inner) {
        inner.style.setProperty('--dot', color);
      }

      // Stack order: later cards paint above earlier ones
      card.style.zIndex = i + 1;

      // Split text contents inside each service card into reveal words
      const cardTitleWords = splitTextNodesToRevealWords(titleEl);
      const cardLeadWords = splitTextNodesToRevealWords(leadEl);
      const cardDescWords = splitTextNodesToRevealWords(descEl);
      const statementItems = statementsEl
        ? Array.from(statementsEl.querySelectorAll('.service-statement-line, .service-statement-sep'))
        : [];

      const textLines = [
        ...(numEl ? [[numEl]] : []),
        ...(cardTitleWords.length ? groupWordsByVisualLines(cardTitleWords, 24) : []),
        ...(cardLeadWords.length ? groupWordsByVisualLines(cardLeadWords, 18) : []),
        ...(cardDescWords.length ? groupWordsByVisualLines(cardDescWords, 16) : []),
        ...(statementItems.length ? [statementItems] : []),
      ];

      textLines.forEach((lineEls) => {
        gsap.set(lineEls, {
          opacity: 0,
          y: 28,
          filter: 'blur(12px)',
        });
      });

      if (actionEl) {
        gsap.set(actionEl, {
          opacity: 0,
          y: 26,
          filter: 'blur(10px)',
        });
      }

      if (visualBox) {
        gsap.set(visualBox, {
          opacity: 0,
          y: 30,
          scale: 0.88,
          filter: 'blur(14px)',
        });
      }
      if (visualImg) {
        gsap.set(visualImg, { scale: 1.16 });
      }

      const cardRevealTl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      textLines.forEach((lineEls, lineIdx) => {
        cardRevealTl.to(
          lineEls,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            stagger: 0.055,
            ease: 'power3.out',
          },
          lineIdx * 0.08
        );
      });

      if (actionEl) {
        cardRevealTl.to(
          actionEl,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power3.out',
          },
          textLines.length * 0.075
        );
      }

      if (visualBox) {
        cardRevealTl.to(
          visualBox,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.05,
            ease: 'power3.out',
          },
          0.08
        );
      }
      if (visualImg) {
        cardRevealTl.to(
          visualImg,
          {
            scale: 1,
            duration: 1.25,
            ease: 'power3.out',
          },
          0.08
        );
      }

      const isLast = i === total - 1;
      const stackZ = i + 1;
      card.style.position = 'relative';
      card.style.zIndex = String(stackZ);

      // Pin the card for one viewport of scroll (except the last card, which settles)
      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top top',
        end: isLast ? 'top top' : '+=100%',
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        fastScrollEnd: true,
      });

      if (st && st.spacer) {
        st.spacer.style.zIndex = String(stackZ);
      } else if (card.parentElement && card.parentElement.classList.contains('pin-spacer')) {
        card.parentElement.style.zIndex = String(stackZ);
      }

      if (!isLast && inner && overlay) {
        // Scale down + dim this card over its own pin duration in sync with the pin
        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top top',
            end: '+=100%',
            scrub: 0.6,
          },
        });

        pinTl.fromTo(
          inner,
          { scale: 1, y: 0 },
          { scale: 0.92, y: -30, ease: 'power2.inOut', force3D: true },
          0
        );
        pinTl.fromTo(
          overlay,
          { opacity: 0 },
          { opacity: 0.55, ease: 'power2.inOut' },
          0
        );
      }
    });
  }

  initServicesPinnedStack();

  /**
   * AI Solutions Horizontal Scroll Pin Section (Headline + 6 Tilted Cards + Outro Quote)
   */
  function initAiSolutionsHorizontalPin() {
    const section = document.getElementById('ai-solutions-pin-section');
    const wrap = document.getElementById('aiSolutionsPinWrap');
    const track = document.getElementById('aiSolutionsPinTrack');
    if (!section || !wrap || !track || typeof ScrollTrigger === 'undefined') return;

    const capsule = document.getElementById('ai-solutions-capsule');
    const titleEl = document.getElementById('ai-solutions-pin-title');
    const subEl = document.getElementById('ai-solutions-pin-sub');
    const footerEl = section.querySelector('.ai-solutions-intro-footer');
    const cards = Array.from(track.querySelectorAll('.ai-sol-card'));

    // 1. Line-by-Line Word Blur Reveal for Left Intro Panel (Capsule -> Headline -> Sub-headline -> CTA)
    const introTitleWords = splitTextNodesToRevealWords(titleEl);
    const introSubWords = splitTextNodesToRevealWords(subEl);
    const introTitleLines = groupWordsByVisualLines(introTitleWords, 24);
    const introSubLines = groupWordsByVisualLines(introSubWords, 16);

    if (capsule) {
      gsap.set(capsule, { opacity: 0, y: 26, filter: 'blur(10px)' });
      gsap.to(capsule, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: capsule,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    introTitleLines.forEach((lineItems, idx) => {
      gsap.set(lineItems, { opacity: 0, y: 28, filter: 'blur(12px)' });
      gsap.to(lineItems, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.9,
        stagger: 0.075,
        delay: idx * 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleEl,
          start: 'top 86%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    introSubLines.forEach((lineItems, idx) => {
      gsap.set(lineItems, { opacity: 0, y: 24, filter: 'blur(10px)' });
      gsap.to(lineItems, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.85,
        stagger: 0.045,
        delay: idx * 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: subEl,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    if (footerEl) {
      gsap.set(footerEl, { opacity: 0, y: 28, filter: 'blur(10px)' });
      gsap.to(footerEl, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerEl,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    // 2. Horizontal Pin Scroll Animation
    const getScrollAmount = () => Math.max(0, track.scrollWidth - window.innerWidth);

    const horizontalTween = gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: 'none',
      scrollTrigger: {
        trigger: wrap,
        start: 'top top',
        end: () => '+=' + getScrollAmount(),
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    // 3. Scroll Reveal for All 6 Tilted Cards & Their Internal Text / Visuals
    cards.forEach((card, i) => {
      const baseTilt = parseFloat(card.getAttribute('data-tilt') || '0');
      const baseY = i % 2 === 0 ? 6 : -6;
      const cardVisual = card.querySelector('.ai-sol-card-visual');
      const cardImg = card.querySelector('.ai-sol-card-img');
      const cardTitle = card.querySelector('.ai-sol-card-title');
      const cardDesc = card.querySelector('.ai-sol-card-desc');
      const cardLink = card.querySelector('.ai-sol-card-link');

      const cardTitleWords = splitTextNodesToRevealWords(cardTitle);
      const cardDescWords = splitTextNodesToRevealWords(cardDesc);

      // Initial hidden state matching the site's blur + y + scale reveal language
      gsap.set(card, {
        opacity: 0,
        rotation: baseTilt + (i % 2 === 0 ? -4 : 4),
        y: baseY + 36,
        scale: 0.92,
        filter: 'blur(12px)',
      });

      if (cardImg) {
        gsap.set(cardImg, { scale: 1.22 });
      }
      if (cardTitleWords.length > 0) {
        gsap.set(cardTitleWords, { opacity: 0, y: 20, filter: 'blur(10px)' });
      }
      if (cardDescWords.length > 0) {
        gsap.set(cardDescWords, { opacity: 0, y: 18, filter: 'blur(8px)' });
      }
      if (cardLink) {
        gsap.set(cardLink, { opacity: 0, y: 14, filter: 'blur(8px)' });
      }

      // First 2 cards are visible before horizontal movement begins; cards 3-6 enter during horizontal scrub
      const isInitialViewportCard = i < 2;

      const cardTl = gsap.timeline({
        scrollTrigger: isInitialViewportCard
          ? {
              trigger: section,
              start: 'top 76%',
              toggleActions: 'play none none reverse',
            }
          : {
              trigger: card,
              containerAnimation: horizontalTween,
              start: 'left 92%',
              toggleActions: 'play none none reverse',
            },
      });

      const staggerDelay = isInitialViewportCard ? i * 0.14 : 0;

      cardTl.to(
        card,
        {
          opacity: 1,
          rotation: baseTilt,
          y: baseY,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.95,
          ease: 'power3.out',
        },
        staggerDelay
      );

      if (cardImg) {
        cardTl.to(
          cardImg,
          {
            scale: 1.01,
            duration: 1.25,
            ease: 'power3.out',
          },
          staggerDelay + 0.06
        );
      }

      if (cardTitleWords.length > 0) {
        cardTl.to(
          cardTitleWords,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: 0.045,
            ease: 'power3.out',
          },
          staggerDelay + 0.12
        );
      }

      if (cardDescWords.length > 0) {
        cardTl.to(
          cardDescWords,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.75,
            stagger: 0.02,
            ease: 'power3.out',
          },
          staggerDelay + 0.22
        );
      }

      if (cardLink) {
        cardTl.to(
          cardLink,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.75,
            ease: 'power3.out',
          },
          staggerDelay + 0.32
        );
      }

      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          rotation: 0,
          y: -10,
          scale: 1.02,
          duration: 0.38,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotation: baseTilt,
          y: baseY,
          scale: 1,
          duration: 0.45,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      });
    });

    // 4. Horizontal Scroll-Linked Word-by-Word Reveal for the End Quote & CTA Panel
    const outroPanel = document.getElementById('aiSolutionsOutroPanel');
    if (outroPanel) {
      const quoteMark = outroPanel.querySelector('.ai-solutions-quote-mark');
      const quoteEl = outroPanel.querySelector('.ai-solutions-outro-quote');
      const outroSubEl = outroPanel.querySelector('.ai-solutions-outro-sub');
      const outroCtaEl = outroPanel.querySelector('.ai-solutions-outro-cta');

      const quoteWords = splitTextNodesToRevealWords(quoteEl);
      const outroSubWords = splitTextNodesToRevealWords(outroSubEl);

      if (quoteMark) {
        gsap.set(quoteMark, { opacity: 0, y: 24, filter: 'blur(10px)' });
      }
      if (quoteWords.length > 0) {
        gsap.set(quoteWords, { opacity: 0, y: 28, filter: 'blur(12px)' });
      }
      if (outroSubWords.length > 0) {
        gsap.set(outroSubWords, { opacity: 0, y: 22, filter: 'blur(10px)' });
      }
      if (outroCtaEl) {
        gsap.set(outroCtaEl, { opacity: 0, y: 26, filter: 'blur(10px)' });
      }

      const outroTl = gsap.timeline({
        scrollTrigger: {
          trigger: outroPanel,
          containerAnimation: horizontalTween,
          start: 'left 85%',
          toggleActions: 'play none none reverse',
        },
      });

      if (quoteMark) {
        outroTl.to(
          quoteMark,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.85,
            ease: 'power3.out',
          },
          0
        );
      }

      if (quoteWords.length > 0) {
        outroTl.to(
          quoteWords,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            stagger: 0.05,
            ease: 'power3.out',
          },
          0.08
        );
      }

      if (outroSubWords.length > 0) {
        outroTl.to(
          outroSubWords,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.85,
            stagger: 0.035,
            ease: 'power3.out',
          },
          0.28
        );
      }

      if (outroCtaEl) {
        outroTl.to(
          outroCtaEl,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power3.out',
          },
          0.42
        );
      }
    }
  }

  initAiSolutionsHorizontalPin();

  /**
   * Work Process Section: Award-Winning GSAP Scroll Pin + Accordion Step Details Reveal/Hide + 4:3 Image Stage
   */
  function initWorkProcessSection() {
    const section = document.getElementById('work-process-section');
    const pinWrap = document.getElementById('workProcessPinWrap');
    const leftViewport = document.getElementById('workProcessLeftViewport');
    const stepsTrack = document.getElementById('workProcessStepsTrack');
    const visualStage = document.getElementById('workProcessVisualStage');
    const progressFill = document.getElementById('workProcessProgressFill');
    const rightStickDot = document.getElementById('wpRightStickDot');
    const rightStickCurrent = document.getElementById('wpRightStickCurrent');
    const leftStickDot = document.getElementById('wpLeftStickDot');
    const leftStickTrail = document.getElementById('wpLeftStickTrail');

    if (!section || !pinWrap || !stepsTrack || !visualStage || typeof ScrollTrigger === 'undefined') {
      return;
    }

    const capsule = document.getElementById('work-process-capsule');
    const titleWords = Array.from(
      section.querySelectorAll('#work-process-main-title .wp-title-word')
    );
    const stepItems = Array.from(stepsTrack.querySelectorAll('.wp-step-item'));
    const visualCards = Array.from(visualStage.querySelectorAll('.wp-visual-card'));
    const totalSteps = Math.min(stepItems.length, visualCards.length);
    if (totalSteps === 0) return;

    // 1. Section Header Reveal (Capsule + Headline Words Line-by-Line Blur Reveal)
    if (capsule) {
      gsap.set(capsule, { opacity: 0, y: 26, filter: 'blur(10px)' });
      gsap.to(capsule, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 84%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    if (titleWords.length > 0) {
      const titleLines = groupWordsByVisualLines(titleWords, 26);
      titleLines.forEach((lineItems, idx) => {
        gsap.set(lineItems, { opacity: 0, y: 28, filter: 'blur(12px)' });
        gsap.to(lineItems, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.075,
          delay: idx * 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }

    // 2. Initial Entrance Reveal for Right 4:3 Visual Stage
    gsap.set(visualStage, {
      opacity: 0,
      y: 32,
      scale: 0.94,
      filter: 'blur(14px)',
    });

    gsap.to(visualStage, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1.05,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
    });

    // 3. Initial State Setup for Steps (Step 0 expanded at 100% opacity; Steps 1..5 collapsed at ~44% opacity)
    stepItems.forEach((stepEl, idx) => {
      const detailsEl = stepEl.querySelector('.wp-step-details');
      stepEl.classList.toggle('is-active', idx === 0);
      gsap.set(stepEl, {
        opacity: idx === 0 ? 1 : 0.44,
      });
      if (detailsEl) {
        gsap.set(detailsEl, {
          height: idx === 0 ? 'auto' : 0,
          opacity: idx === 0 ? 1 : 0,
        });
      }
    });

    // Initial State Setup for Right Visual Cards (Card 0 visible, Cards 1..5 ready to reveal)
    visualCards.forEach((cardEl, idx) => {
      const imgEl = cardEl.querySelector('.wp-visual-img');
      const captionEl = cardEl.querySelector('.wp-visual-caption');
      cardEl.style.zIndex = String(idx + 2);
      cardEl.classList.toggle('is-active', idx === 0);

      if (idx === 0) {
        gsap.set(cardEl, {
          clipPath: 'inset(0% 0% 0% 0% round 20px)',
          opacity: 1,
          scale: 1,
          y: 0,
        });
        if (imgEl) {
          gsap.set(imgEl, { scale: 1, filter: 'blur(0px)' });
        }
        if (captionEl) {
          gsap.set(captionEl, { opacity: 1, y: 0 });
        }
      } else {
        gsap.set(cardEl, {
          clipPath: 'inset(100% 0% 0% 0% round 20px)',
          opacity: 0,
          scale: 1,
          y: 20,
        });
        if (imgEl) {
          gsap.set(imgEl, { scale: 1.15, filter: 'blur(10px)' });
        }
        if (captionEl) {
          gsap.set(captionEl, { opacity: 0, y: 16 });
        }
      }
    });

    // Position the Left Vertical Stick's glowing dot & gradient trail beside the active step's title
    function updateLeftStickPosition(floatStepIndex) {
      if (!leftStickDot || !leftViewport) return;
      const lowIdx = Math.max(0, Math.min(totalSteps - 1, Math.floor(floatStepIndex)));
      const highIdx = Math.max(0, Math.min(totalSteps - 1, Math.ceil(floatStepIndex)));
      const frac = floatStepIndex - lowIdx;

      const getStepAnchorY = (idx) => {
        const item = stepItems[idx];
        if (!item) return 0;
        const titleEl = item.querySelector('.wp-step-title');
        const offsetWithinItem = titleEl
          ? titleEl.offsetTop + titleEl.offsetHeight * 0.5
          : 24;
        // Account for the -28px top offset of .wp-left-stick
        return item.offsetTop + offsetWithinItem + 28;
      };

      const yLow = getStepAnchorY(lowIdx);
      const yHigh = getStepAnchorY(highIdx);
      const targetY = yLow + (yHigh - yLow) * frac;

      leftStickDot.style.transform = `translate(-50%, ${targetY}px)`;
      if (leftStickTrail) {
        leftStickTrail.style.transform = `translateY(${targetY - 48}px)`;
      }
    }

    // Helper to keep active CSS class synced with scroll position
    function syncActiveStepState(floatStepIndex) {
      const activeIdx = Math.min(
        totalSteps - 1,
        Math.max(0, Math.round(floatStepIndex))
      );
      stepItems.forEach((el, i) => {
        el.classList.toggle('is-active', i === activeIdx);
      });
      visualCards.forEach((el, i) => {
        el.classList.toggle('is-active', i === activeIdx);
      });
      updateLeftStickPosition(floatStepIndex);
    }

    requestAnimationFrame(() => updateLeftStickPosition(0));

    // 4. Master GSAP Pinned Timeline (Scrubs smoothly through Steps 01 -> 06)
    const transitionsCount = totalSteps - 1;
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: pinWrap,
        start: 'top top',
        end: () => '+=' + Math.round(window.innerHeight * 3.8),
        pin: true,
        scrub: 0.65,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const floatIndex = self.progress * transitionsCount;
          syncActiveStepState(floatIndex);
        },
      },
    });

    // Build step-by-step accordion details reveal/hide (left) and 4:3 image reveal (right)
    for (let i = 1; i < totalSteps; i++) {
      const prevStep = stepItems[i - 1];
      const currStep = stepItems[i];
      const prevDetails = prevStep ? prevStep.querySelector('.wp-step-details') : null;
      const currDetails = currStep ? currStep.querySelector('.wp-step-details') : null;

      const prevCard = visualCards[i - 1];
      const currCard = visualCards[i];
      const prevCaption = prevCard ? prevCard.querySelector('.wp-visual-caption') : null;
      const currImg = currCard ? currCard.querySelector('.wp-visual-img') : null;
      const currCaption = currCard ? currCard.querySelector('.wp-visual-caption') : null;

      const startTime = i - 1;

      // Left Step i-1 dims back to ~44% opacity and collapses its details drawer
      pinTl.to(
        prevStep,
        {
          opacity: 0.44,
          duration: 0.65,
          ease: 'power2.inOut',
        },
        startTime + 0.12
      );

      if (prevDetails) {
        pinTl.to(
          prevDetails,
          {
            height: 0,
            opacity: 0,
            duration: 0.65,
            ease: 'power2.inOut',
          },
          startTime + 0.12
        );
      }

      // Left Step i illuminates to 100% opacity and reveals its details drawer
      pinTl.fromTo(
        currStep,
        { opacity: 0.44 },
        {
          opacity: 1,
          duration: 0.65,
          ease: 'power2.inOut',
        },
        startTime + 0.12
      );

      if (currDetails) {
        pinTl.fromTo(
          currDetails,
          { height: 0, opacity: 0 },
          {
            height: 'auto',
            opacity: 1,
            duration: 0.65,
            ease: 'power2.inOut',
          },
          startTime + 0.12
        );
      }

      // Right 4:3 Image i reveals with vertical clip-path mask, scale settle, and blur clear
      if (currCard) {
        pinTl.to(
          currCard,
          {
            clipPath: 'inset(0% 0% 0% 0% round 20px)',
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.inOut',
          },
          startTime + 0.08
        );
      }

      if (currImg) {
        pinTl.to(
          currImg,
          {
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power3.out',
          },
          startTime + 0.08
        );
      }

      if (currCaption) {
        pinTl.to(
          currCaption,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power3.out',
          },
          startTime + 0.28
        );
      }

      // Scale down the entire outgoing card cleanly (no inner image shrink, so zero black outline behind)
      if (prevCard) {
        pinTl.to(
          prevCard,
          {
            scale: 0.94,
            opacity: 0,
            filter: 'blur(4px)',
            duration: 0.85,
            ease: 'power2.inOut',
          },
          startTime + 0.08
        );
      }

      if (prevCaption) {
        pinTl.to(
          prevCaption,
          {
            opacity: 0,
            y: -12,
            duration: 0.45,
            ease: 'power2.in',
          },
          startTime + 0.08
        );
      }
    }

    // 5. Click handler on left steps so users can also click any step to jump to its scroll position
    stepItems.forEach((stepEl, idx) => {
      stepEl.addEventListener('click', () => {
        const st = pinTl.scrollTrigger;
        if (!st) return;
        const targetProgress = transitionsCount > 0 ? idx / transitionsCount : 0;
        const targetScroll = st.start + (st.end - st.start) * targetProgress;
        if (lenisInstance) {
          lenisInstance.scrollTo(targetScroll, { duration: 1.05 });
        } else {
          window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
      });
    });
  }

  initWorkProcessSection();

  /**
   * Problem-First Section: ClaPat Hayler-Style GSAP Pinned Rotary Scrolling List
   */
  function initProblemFirstSection() {
    const section = document.getElementById('problem-first-section');
    const pinWrap = document.getElementById('problemFirstPinWrap');
    const leadEl = document.getElementById('problem-first-lead');
    const metaBar = document.getElementById('pfMetaBar');
    const counterCurrent = document.getElementById('pfCounterCurrent');
    const counterFill = document.getElementById('pfCounterFill');
    const markerEl = document.getElementById('problemFirstMarker');
    const rightViewport = document.getElementById('problemFirstRightViewport');
    const listTrack = document.getElementById('problemFirstListTrack');

    if (!section || !pinWrap || !listTrack || typeof ScrollTrigger === 'undefined') {
      return;
    }

    const items = Array.from(listTrack.querySelectorAll('.pf-list-item'));
    const total = items.length;
    if (total === 0) return;

    // 1. Left Progress Bar & Statement Line-by-Line Word Blur Reveal (Matching Other Section Headlines)
    if (metaBar) {
      gsap.set(metaBar, { opacity: 0, y: 18, filter: 'blur(8px)' });
      gsap.to(metaBar, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: metaBar,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    const leadWords = splitTextNodesToRevealWords(leadEl);
    if (leadWords.length > 0) {
      gsap.set(leadWords, { clearProps: 'transform,opacity,filter' });
      const leadLines = groupWordsByVisualLines(leadWords, 26);

      leadLines.forEach((lineItems) => {
        gsap.set(lineItems, {
          opacity: 0,
          y: 28,
          filter: 'blur(12px)',
        });

        const lineTl = gsap.timeline({
          scrollTrigger: {
            trigger: lineItems[0],
            start: 'top 86%',
            toggleActions: 'play none none reverse',
          },
        });

        lineTl.to(lineItems, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.075,
          ease: 'power3.out',
        });
      });
    }

    if (markerEl) {
      gsap.set(markerEl, { yPercent: -50, opacity: 0, scale: 0.4, filter: 'blur(6px)' });
      gsap.to(markerEl, {
        yPercent: -50,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.85,
        delay: 0.12,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: leadEl || section,
          start: 'top 86%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    // 2. Helper: Compute Track Y so that floatIndex (0..total-1) sits exactly at the 50% vertical center line
    function getTrackYForFloatIndex(floatIdx) {
      const lowIdx = Math.max(0, Math.min(total - 1, Math.floor(floatIdx)));
      const highIdx = Math.max(0, Math.min(total - 1, Math.ceil(floatIdx)));
      const frac = floatIdx - lowIdx;

      const getCenterOffset = (idx) => {
        const el = items[idx];
        if (!el) return 0;
        return el.offsetTop + el.offsetHeight * 0.5;
      };

      const offsetLow = getCenterOffset(lowIdx);
      const offsetHigh = getCenterOffset(highIdx);
      const targetOffset = offsetLow + (offsetHigh - offsetLow) * frac;
      return -targetOffset;
    }

    // Graduated opacity curve matching ClaPat Hayler reference (1.0 at center -> 0.42 -> 0.20 -> 0.11 -> 0.06)
    function getOpacityForDistance(dist) {
      const stops = [1, 0.42, 0.2, 0.11, 0.06, 0.04];
      const dLow = Math.min(stops.length - 1, Math.floor(dist));
      const dHigh = Math.min(stops.length - 1, Math.ceil(dist));
      const f = dist - dLow;
      return stops[dLow] + (stops[dHigh] - stops[dLow]) * f;
    }

    const transitionsCount = Math.max(1, total - 1);

    function renderRotaryListState(floatIdx) {
      const clampedIdx = Math.max(0, Math.min(transitionsCount, floatIdx));
      const trackY = getTrackYForFloatIndex(clampedIdx);
      listTrack.style.transform = `translate3d(0, ${trackY}px, 0)`;

      const activeIdx = Math.min(total - 1, Math.max(0, Math.round(clampedIdx)));

      // Synchronized Left Counter + Progress Fill
      if (counterCurrent) {
        counterCurrent.textContent = String(activeIdx + 1).padStart(2, '0');
      }
      if (counterFill) {
        const fillRatio = (clampedIdx + 1) / total;
        counterFill.style.transform = `scaleX(${fillRatio.toFixed(3)})`;
      }

      items.forEach((item, i) => {
        const dist = Math.abs(i - clampedIdx);
        const opacity = getOpacityForDistance(dist);
        const scale = 1 - Math.min(0.045, dist * 0.012);
        item.classList.toggle('is-active', i === activeIdx);
        item.style.opacity = opacity.toFixed(3);
        item.style.transform = `scale(${scale.toFixed(3)})`;
      });

      if (markerEl) {
        if (window.innerWidth <= 960 && rightViewport) {
          const mobileCenterY = rightViewport.offsetTop + rightViewport.offsetHeight * 0.5;
          markerEl.style.top = `${mobileCenterY}px`;
        } else {
          markerEl.style.top = '50%';
        }
      }
    }

    requestAnimationFrame(() => renderRotaryListState(0));

    // 3. GSAP Pinned ScrollTrigger Scrubbing Smoothly Through All 6 Items
    const proxy = { index: 0 };

    const pinSt = gsap.to(proxy, {
      index: transitionsCount,
      ease: 'none',
      onUpdate: () => {
        renderRotaryListState(proxy.index);
      },
      scrollTrigger: {
        trigger: pinWrap,
        start: 'top top',
        end: () => '+=' + Math.round(window.innerHeight * 2.8),
        pin: true,
        scrub: 0.65,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: (self) => {
          renderRotaryListState(self.progress * transitionsCount);
        },
      },
    });

    // 4. Click any item in the list to smoothly scroll to its exact center position
    items.forEach((item, idx) => {
      item.addEventListener('click', () => {
        const st = pinSt.scrollTrigger;
        if (!st) return;
        const targetProgress = transitionsCount > 0 ? idx / transitionsCount : 0;
        const targetScroll = st.start + (st.end - st.start) * targetProgress;
        if (lenisInstance) {
          lenisInstance.scrollTo(targetScroll, { duration: 0.95 });
        } else {
          window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
      });
    });
  }

  initProblemFirstSection();

  /**
   * AI Experience Section: Award-Winning Progressive Scroll-Revealing List with Gliding Astroid Marker
   */
  function initAiExperienceSection() {
    const section = document.getElementById('ai-experience-section');
    const pinWrap = document.getElementById('aiExperiencePinWrap');
    const leadEl = document.getElementById('ai-experience-lead');
    const metaBar = document.getElementById('aiExpMetaBar');
    const counterCurrent = document.getElementById('aiExpCounterCurrent');
    const counterFill = document.getElementById('aiExpCounterFill');
    const ambientGlow = document.getElementById('aiExpAmbientGlow');
    const astroidMarker = document.getElementById('aiExpAstroidMarker');
    const listTrack = document.getElementById('aiExperienceListTrack');

    if (!section || !pinWrap || !listTrack || typeof ScrollTrigger === 'undefined') {
      return;
    }

    const items = Array.from(listTrack.querySelectorAll('.ai-exp-item'));
    const total = items.length;
    if (total === 0) return;

    // 1. Left Headline Line-by-Line Word Blur Reveal (Matching Other Section Headlines)
    if (metaBar) {
      gsap.set(metaBar, { opacity: 0, y: 18, filter: 'blur(8px)' });
      gsap.to(metaBar, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: metaBar,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    const leadWords = splitTextNodesToRevealWords(leadEl);
    if (leadWords.length > 0) {
      gsap.set(leadWords, { clearProps: 'transform,opacity,filter' });
      const leadLines = groupWordsByVisualLines(leadWords, 26);

      leadLines.forEach((lineItems) => {
        gsap.set(lineItems, {
          opacity: 0,
          y: 28,
          filter: 'blur(12px)',
        });

        const lineTl = gsap.timeline({
          scrollTrigger: {
            trigger: lineItems[0],
            start: 'top 86%',
            toggleActions: 'play none none reverse',
          },
        });

        lineTl.to(lineItems, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.075,
          ease: 'power3.out',
        });
      });
    }

    // 2. Split each list item's text into individual .ai-exp-word spans (preserving .ai-exp-item-accent)
    function splitItemTextIntoWords(container) {
      if (!container) return [];
      const childNodes = Array.from(container.childNodes);
      container.innerHTML = '';

      childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const parts = node.textContent.split(/(\s+)/);
          parts.forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              container.appendChild(document.createTextNode(' '));
            } else {
              const wordSpan = document.createElement('span');
              wordSpan.className = 'ai-exp-word';
              wordSpan.textContent = part;
              container.appendChild(wordSpan);
            }
          });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const elClone = node.cloneNode(true);
          splitItemTextIntoWords(elClone);
          container.appendChild(elClone);
        }
      });

      return Array.from(container.querySelectorAll('.ai-exp-word'));
    }

    const itemWordsList = items.map((item) => {
      const textEl = item.querySelector('.ai-exp-item-text');
      return splitItemTextIntoWords(textEl);
    });

    // Helper: Get vertical center Y of item i's text row inside .ai-experience-list-wrap
    function getItemCenterY(idx) {
      const itemEl = items[idx];
      if (!itemEl) return 0;
      const rowEl = itemEl.querySelector('.ai-exp-item-row') || itemEl;
      return itemEl.offsetTop + rowEl.offsetTop + rowEl.offsetHeight * 0.5;
    }

    function getMarkerYForFloatIndex(floatIdx) {
      const lowIdx = Math.max(0, Math.min(total - 1, Math.floor(floatIdx)));
      const highIdx = Math.max(0, Math.min(total - 1, Math.ceil(floatIdx)));
      const frac = floatIdx - lowIdx;
      const yLow = getItemCenterY(lowIdx);
      const yHigh = getItemCenterY(highIdx);
      return yLow + (yHigh - yLow) * frac;
    }

    const transitionsCount = Math.max(1, total - 1);
    const proxy = { index: 0 };
    const item0Entrance = { progress: 0 };

    function renderExperienceListState(floatIdx) {
      const clampedIdx = Math.max(0, Math.min(transitionsCount, floatIdx));
      const activeIdx = Math.min(total - 1, Math.max(0, Math.round(clampedIdx)));
      const frac = clampedIdx - Math.floor(clampedIdx);

      // Gliding & Rotating 4-Cusped Astroid Marker positioned before active list item
      if (astroidMarker) {
        const markerY = getMarkerYForFloatIndex(clampedIdx);
        const rotDeg = clampedIdx * 90;
        const pulseScale = 1 + Math.sin(frac * Math.PI) * 0.22;
        astroidMarker.style.transform = `translate3d(0, ${markerY.toFixed(2)}px, 0) translateY(-50%) rotate(${rotDeg.toFixed(1)}deg) scale(${pulseScale.toFixed(3)})`;
      }

      // Synchronized Left Counter + Progress Fill + Ambient Aura
      if (counterCurrent) {
        counterCurrent.textContent = String(activeIdx + 1).padStart(2, '0');
      }
      if (counterFill) {
        const fillRatio = (clampedIdx + 1) / total;
        counterFill.style.transform = `scaleX(${fillRatio.toFixed(3)})`;
      }
      if (ambientGlow) {
        const glowShiftY = ((clampedIdx / transitionsCount) - 0.5) * 240;
        ambientGlow.style.transform = `translate3d(0, calc(-50% + ${glowShiftY.toFixed(1)}px), 0)`;
      }

      // Progressive GSAP Word Reveal per List Item: Blur + Fade-In + Right-to-Left (x: +38px -> 0px)
      items.forEach((item, i) => {
        item.classList.toggle('is-active', i === activeIdx);

        const words = itemWordsList[i] || [];
        const wordCount = words.length;
        if (wordCount === 0) return;

        // Determine reveal progress (0 -> 1) for item i
        let revealProg = 0;
        if (i === 0) {
          revealProg = Math.max(item0Entrance.progress, Math.min(1, clampedIdx * 2.5));
        } else {
          revealProg = Math.max(0, Math.min(1, clampedIdx - (i - 1)));
        }

        // How far past item i the scroll has moved (0 when active/upcoming, 0..1+ when passed)
        const passedAmount = Math.max(0, Math.min(1, clampedIdx - i));
        const staggerShare = 0.38;
        const wordDur = 1 - staggerShare;

        words.forEach((wordEl, wIdx) => {
          const wordStart = wordCount > 1 ? (wIdx / (wordCount - 1)) * staggerShare : 0;
          const rawWordProg = Math.max(0, Math.min(1, (revealProg - wordStart) / wordDur));
          // Smooth power3.out easing per word
          const easedWordProg = 1 - Math.pow(1 - rawWordProg, 3);

          // Right-to-left motion: starts at +38px on the right and glides left to 0px
          const wordX = (1 - easedWordProg) * 38;
          // Blur to sharp: starts at blur(10px) and resolves to blur(0px)
          const wordBlur = (1 - easedWordProg) * 10;
          // Fade-in: starts at low opacity (0.12 for upcoming, 0 for initial item 0) -> 1.0 when active -> 0.42 when passed
          const startOpacity = i === 0 && clampedIdx === 0 ? 0 : 0.12;
          const revealedOpacity = 1 - passedAmount * 0.58;
          const wordOpacity = startOpacity + (revealedOpacity - startOpacity) * easedWordProg;

          wordEl.style.opacity = wordOpacity.toFixed(3);
          wordEl.style.transform = `translate3d(${wordX.toFixed(2)}px, 0, 0)`;
          wordEl.style.filter = wordBlur > 0.08 ? `blur(${wordBlur.toFixed(2)}px)` : 'blur(0px)';
        });
      });
    }

    // Trigger initial right-to-left + blur + fade-in word reveal for the first list item when entering viewport
    gsap.fromTo(
      item0Entrance,
      { progress: 0 },
      {
        progress: 1,
        duration: 0.95,
        ease: 'none',
        onUpdate: () => {
          renderExperienceListState(proxy.index);
        },
        scrollTrigger: {
          trigger: listTrack,
          start: 'top 86%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    requestAnimationFrame(() => renderExperienceListState(0));

    // 3. GSAP Pinned ScrollTrigger Scrubbing Smoothly Through All 6 Experience Statements
    const pinSt = gsap.to(proxy, {
      index: transitionsCount,
      ease: 'none',
      onUpdate: () => {
        renderExperienceListState(proxy.index);
      },
      scrollTrigger: {
        trigger: pinWrap,
        start: 'top top',
        end: () => '+=' + Math.round(window.innerHeight * 2.8),
        pin: true,
        scrub: 0.65,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: (self) => {
          renderExperienceListState(self.progress * transitionsCount);
        },
      },
    });

    // 4. Click any item to smoothly scroll to its active reveal position
    items.forEach((item, idx) => {
      item.addEventListener('click', () => {
        const st = pinSt.scrollTrigger;
        if (!st) return;
        const targetProgress = transitionsCount > 0 ? idx / transitionsCount : 0;
        const targetScroll = st.start + (st.end - st.start) * targetProgress;
        if (lenisInstance) {
          lenisInstance.scrollTo(targetScroll, { duration: 0.95 });
        } else {
          window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
      });
    });
  }

  initAiExperienceSection();

  /**
   * Orbital CTA Section ScrollTrigger Reveal (Line-by-Line Word Reveal like AI Statement Section)
   */
  function initOrbitalCtaSection() {
    const ctaSection = document.getElementById('cta-section');
    if (!ctaSection) return;

    const centerGlow = ctaSection.querySelector('.cta-center-glow');
    const ring1 = ctaSection.querySelector('.cta-ring-1');
    const ring2 = ctaSection.querySelector('.cta-ring-2');
    const ring3 = ctaSection.querySelector('.cta-ring-3');
    const ring4 = ctaSection.querySelector('.cta-ring-4');
    const ringsOrdered = [ring1, ring2, ring3, ring4].filter(Boolean);

    const capsule = document.getElementById('cta-section-capsule');
    const titleEl = document.getElementById('cta-main-title');
    const subtitleEl = document.getElementById('cta-subtitle');
    const btnWrap = document.getElementById('cta-button-wrap');

    // Continuous subtle counter-rotation on concentric rings
    if (ring1) gsap.to(ring1, { rotation: 360, duration: 46, repeat: -1, ease: 'none' });
    if (ring2) gsap.to(ring2, { rotation: -360, duration: 62, repeat: -1, ease: 'none' });
    if (ring3) gsap.to(ring3, { rotation: 360, duration: 78, repeat: -1, ease: 'none' });
    if (ring4) gsap.to(ring4, { rotation: -360, duration: 96, repeat: -1, ease: 'none' });

    if (typeof ScrollTrigger === 'undefined') return;

    // Split text nodes into individual .cta-reveal-word spans while preserving child elements (e.g. .services-title-recoleta and <br>)
    function wrapWordsInContainer(container) {
      if (!container) return [];
      const childNodes = Array.from(container.childNodes);
      container.innerHTML = '';

      childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const parts = node.textContent.split(/(\s+)/);
          parts.forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              container.appendChild(document.createTextNode(' '));
            } else {
              const span = document.createElement('span');
              span.className = 'cta-reveal-word';
              span.textContent = part;
              container.appendChild(span);
            }
          });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.tagName === 'BR') {
            container.appendChild(node.cloneNode(true));
          } else if (node.classList.contains('cta-title-line')) {
            const lineClone = node.cloneNode(true);
            wrapWordsInContainer(lineClone);
            container.appendChild(lineClone);
          } else {
            const elClone = node.cloneNode(true);
            elClone.classList.add('cta-reveal-word');
            container.appendChild(elClone);
          }
        }
      });

      return Array.from(container.querySelectorAll('.cta-reveal-word'));
    }

    const titleWords = wrapWordsInContainer(titleEl);
    const subtitleWords = wrapWordsInContainer(subtitleEl);
    const allWords = [...titleWords, ...subtitleWords];

    // Group words into visual lines by vertical center position (same algorithm as AI Statement Section)
    function groupIntoVisualLines(elements, threshold = 22) {
      const lines = [];
      let currentLine = [];
      let currentCenterY = null;

      elements.forEach((el) => {
        const rectTop = el.offsetTop + el.offsetHeight / 2;
        if (currentCenterY === null || Math.abs(rectTop - currentCenterY) <= threshold) {
          currentLine.push(el);
          if (currentCenterY === null) currentCenterY = rectTop;
        } else {
          lines.push(currentLine);
          currentLine = [el];
          currentCenterY = rectTop;
        }
      });

      if (currentLine.length > 0) {
        lines.push(currentLine);
      }
      return lines;
    }

    let ctaLineTriggers = [];

    function setupCtaLineByLineReveal() {
      ctaLineTriggers.forEach((st) => st.kill());
      ctaLineTriggers = [];

      gsap.set(allWords, { clearProps: 'transform,opacity,filter' });

      const titleVisualLines = groupIntoVisualLines(titleWords, 24);
      const subtitleVisualLines = groupIntoVisualLines(subtitleWords, 16);

      // 0. Orbital Rings & Center Glow: Fade in and scale up one-by-one from inner ring outward on scroll
      const ringTriggerEl = capsule || ctaSection.querySelector('.cta-orbital-content') || ctaSection;

      if (centerGlow) {
        gsap.set(centerGlow, {
          opacity: 0,
          scale: 0.32,
          filter: 'blur(16px)',
        });
      }

      ringsOrdered.forEach((ring) => {
        gsap.set(ring, {
          opacity: 0,
          scale: 0.36,
          filter: 'blur(10px)',
        });
      });

      const ringsTl = gsap.timeline({
        scrollTrigger: {
          trigger: ringTriggerEl,
          start: 'top 86%',
          toggleActions: 'play none none reverse',
        },
      });

      if (centerGlow) {
        ringsTl.fromTo(
          centerGlow,
          { opacity: 0, scale: 0.32, filter: 'blur(16px)' },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(8px)',
            duration: 1.15,
            ease: 'power3.out',
          },
          0
        );
      }

      // Animate Ring 1 -> Ring 2 -> Ring 3 -> Ring 4 one-by-one (fade + scale-up)
      ringsOrdered.forEach((ring, idx) => {
        ringsTl.fromTo(
          ring,
          {
            opacity: 0,
            scale: 0.36,
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.1,
            ease: 'power3.out',
          },
          0.12 + idx * 0.26
        );
      });

      if (ringsTl.scrollTrigger) {
        ctaLineTriggers.push(ringsTl.scrollTrigger);
      }

      // 1. Capsule reveal when capsule line enters viewport
      if (capsule) {
        gsap.set(capsule, {
          opacity: 0,
          y: 26,
          filter: 'blur(10px)',
        });

        const capTl = gsap.timeline({
          scrollTrigger: {
            trigger: capsule,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });

        capTl.to(capsule, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.95,
          ease: 'power3.out',
        });

        if (capTl.scrollTrigger) {
          ctaLineTriggers.push(capTl.scrollTrigger);
        }
      }

      // 2. Title lines: each visual line reveals its words one-by-one as you scroll to that line
      titleVisualLines.forEach((lineItems) => {
        gsap.set(lineItems, {
          opacity: 0,
          y: 28,
          filter: 'blur(12px)',
        });

        const lineTl = gsap.timeline({
          scrollTrigger: {
            trigger: lineItems[0],
            start: 'top 86%',
            toggleActions: 'play none none reverse',
          },
        });

        lineTl.to(lineItems, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.075,
          ease: 'power3.out',
        });

        if (lineTl.scrollTrigger) {
          ctaLineTriggers.push(lineTl.scrollTrigger);
        }
      });

      // 3. Subtitle lines: each visual line reveals its words one-by-one as you scroll to that line
      subtitleVisualLines.forEach((lineItems) => {
        gsap.set(lineItems, {
          opacity: 0,
          y: 24,
          filter: 'blur(10px)',
        });

        const subLineTl = gsap.timeline({
          scrollTrigger: {
            trigger: lineItems[0],
            start: 'top 87%',
            toggleActions: 'play none none reverse',
          },
        });

        subLineTl.to(lineItems, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.85,
          stagger: 0.055,
          ease: 'power3.out',
        });

        if (subLineTl.scrollTrigger) {
          ctaLineTriggers.push(subLineTl.scrollTrigger);
        }
      });

      // 4. Primary CTA Button reveal when scrolling down to the button
      if (btnWrap) {
        gsap.set(btnWrap, {
          opacity: 0,
          y: 28,
          filter: 'blur(10px)',
        });

        const btnTl = gsap.timeline({
          scrollTrigger: {
            trigger: btnWrap,
            start: 'top 89%',
            toggleActions: 'play none none reverse',
          },
        });

        btnTl.to(btnWrap, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.95,
          ease: 'power3.out',
        });

        if (btnTl.scrollTrigger) {
          ctaLineTriggers.push(btnTl.scrollTrigger);
        }
      }
    }

    setupCtaLineByLineReveal();

    let ctaResizeTimer = null;
    let lastCtaWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      clearTimeout(ctaResizeTimer);
      ctaResizeTimer = setTimeout(() => {
        if (Math.abs(window.innerWidth - lastCtaWidth) > 15) {
          lastCtaWidth = window.innerWidth;
          setupCtaLineByLineReveal();
          if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
          }
        }
      }, 260);
    });
  }

  initOrbitalCtaSection();

  /**
   * Pre-Footer Wordmark ("DENZO Studio") & Footer Card ScrollTrigger Reveal
   */
  function initFooterScrollReveal() {
    if (typeof ScrollTrigger === 'undefined') return;

    const wordmarkSection = document.getElementById('wordmark-section');
    const wordmarkTitle = document.getElementById('pre-footer-wordmark');

    if (wordmarkSection && wordmarkTitle) {
      let wordTargets = [];

      if (typeof SplitText !== 'undefined') {
        const splitWordmark = new SplitText(wordmarkTitle, {
          type: 'words',
          wordsClass: 'wordmark-word',
        });
        wordTargets = splitWordmark.words;
      } else {
        const rawWords = wordmarkTitle.textContent.trim().split(/\s+/);
        wordmarkTitle.innerHTML = rawWords
          .map((w) => `<span class="wordmark-word">${w}</span>`)
          .join(' ');
        wordTargets = wordmarkTitle.querySelectorAll('.wordmark-word');
      }

      if (wordTargets.length > 0) {
        gsap.set(wordTargets, {
          opacity: 0,
          y: 36,
          filter: 'blur(12px)',
        });

        gsap.to(wordTargets, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.15,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wordmarkSection,
            start: 'top 86%',
            end: 'bottom 25%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }

    const footerCard = document.getElementById('footer-card');
    if (footerCard) {
      gsap.set(footerCard, {
        opacity: 0,
        y: 44,
      });

      gsap.to(footerCard, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerCard,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      });
    }
  }

  initFooterScrollReveal();

  // Debounced window resize handler to adapt positions on mobile orientation change
  let resizeTimer = null;
  let lastWindowWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
      // Only rebuild preloader timeline if width actually changed while preloader is still active
      if (!hasPreloaderCompleted && Math.abs(window.innerWidth - lastWindowWidth) > 10) {
        lastWindowWidth = window.innerWidth;
        const chars = wordEl.querySelectorAll('.char');
        if (chars.length > 0) {
          buildTimeline(chars);
        }
      }
    }, 250);
  });
});
