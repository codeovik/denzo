/**
 * ============================================================================
 * DENZO STUDIO — UNIFIED EXPERIENCE & ARCHITECTURE ENGINE
 * ============================================================================
 * Properly organized modular architecture:
 * - PART 1: Continuous WebGL Genesis Stage & Hero Architecture Engine
 * - PART 2: Interactive 3D Brand Logo Engine
 * - PART 3: Preloader Timeline, Minimalist Odometer, Lenis Smooth Scroll & Orchestration
 * ============================================================================
 */

// ==========================================================================
// CONFIGURATION: 2D Canvas Continuous Services Flow Upgrades
// ==========================================================================
const CONFIG = {
  dotCounts: { desktop: 380, tablet: 280, mobile: 200 },
  linkDistances: [0, 0.17, 0.105, 0.105, 0.115],
  holdRatio: 0.22,
  arcAmount: 0.12,
  staggerSpread: 0.25,
  rotationAmount: 0.12,
  perspective: 0.35,
  pulseCount: { desktop: 12, mobile: 6 },
  grainOpacity: 0.025,
  baseHalftonePitch: { desktop: 7, mobile: 6 },
  halftonePitch: { desktop: 7, mobile: 6 },
  halftoneMaxRadius: 2.6,
  glassTopAlpha: 0.55,
  hatchSpacing: 6,
  hatchAlpha: 0.28,
  fillCoverageMax: 0.25,
  contourColor: '#1B3CC4',
  insetPx: 1.5,
  cornerSegments: 8,
  debugAlign: false,
};

/* ==========================================================================
   PART 1: Continuous WebGL Genesis Stage & Hero Architecture Engine
   ========================================================================== */
/**
 * Denzo Studio — Continuous Living Structure Genesis Engine
 *
 * Core Principle:
 * "একই নোড → একই কাঠামো → ধারাবাহিক রূপান্তর → DENZO → আকর্ষণীয় ব্র্যান্ড-এক্সিট → সম্পূর্ণ অদৃশ্য → একই পরিবেশ থেকে হিরো।"
 *
 * Strictest Constraint:
 * NO new nodes created. NO existing nodes deleted or faded out.
 * The EXACT same 18 nodes and their connecting lines continuously morph and adapt across all phases:
 *
 * 0.0s – 1.0s: Origin Luminous Point emerges from void
 * 1.0s – 2.0s: The 18 nodes blossom outward into sacred polyhedral symmetry
 * 2.0s – 3.5s: Hairline connection lines draw between the 18 nodes
 * 3.5s – 5.0s: Calm data currents glide through the conduits
 * 5.0s – 6.5s: [Structural Morph] The 18 nodes & lines morph into a crisp, powerful crystalline prism
 * 6.5s – 7.5s: [Centering] Outer lines feel inward magnetic pull, organizing into a centralized geometric monogram
 * 7.5s – 8.5s: [DENZO Emergence] The 18 nodes form a precise typographic frame around the emerging DENZO wordmark
 * 8.5s – 9.5s: [Brand Exit] DENZO & the 18 nodes contract into a razor-sharp horizontal horizon laser pulse
 * 9.5s – 10.5s: [Brand Resolution] DENZO vanishes completely; the 18 nodes & lines glide to become the architectural runway beacons
 * 10.5s – 12.0s: [Hero Entrance] Camera dollies into the futuristic hall; hero editorial copy fades in. (DENZO is NOT in the hero)
 */

(function () {
  'use strict';

  window.initGenesisHeroStage = function () {
    const canvas = document.getElementById('hero-universe-canvas');
    if (!canvas) return;

    const startScene = () => {
      const THREE = window.THREE;
      if (!THREE) return;

      // 1. Scene & Depth Configuration
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x040508, 0.022);

      const isMobile = window.innerWidth < 768;
      const camera = new THREE.PerspectiveCamera(
        46,
        window.innerWidth / window.innerHeight,
        0.1,
        220
      );
      camera.position.set(0, 0, 14.2);

      const maxDpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.25);
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: false,
        antialias: !isMobile,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      });

      renderer.setPixelRatio(maxDpr);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x040508, 1);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;

      const worldGroup = new THREE.Group();
      scene.add(worldGroup);

      // ========================================================================
      // 1. Horizon Sky & Twilight Dawn Glow Quad
      // ========================================================================
      const skyVertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.9999, 1.0);
        }
      `;

      const skyFragmentShader = `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uAspect;
        uniform float uProgress;
        uniform vec2 uMouse;

        void main() {
          vec2 p = vUv - 0.5;
          p.x *= uAspect;

          // Pure obsidian dark void base
          vec3 voidCol = vec3(0.016, 0.020, 0.028);

          // Horizon Twilight Dawn (Ramps in from 8.8s to 12.0s)
          float horizonProg = smoothstep(0.7333, 1.0, uProgress);

          float horizonY = -0.06 + uMouse.y * 0.035;
          float distToHorizon = abs(p.y - horizonY);

          // Razor-sharp horizon boundary streak + soft diffused platinum dawn
          float razorLine = exp(-distToHorizon * 85.0);
          float diffusedGlow = exp(-distToHorizon * 3.8);
          float lateralFalloff = exp(-dot(p.x, p.x) * 0.22);

          vec3 horizonPlatinum = vec3(0.88, 0.93, 1.0);
          vec3 twilightBlue = vec3(0.08, 0.15, 0.32);

          vec3 horizonCol = mix(twilightBlue, horizonPlatinum, razorLine * 0.75 + diffusedGlow * 0.25);
          float glowAlpha = (razorLine * 0.65 + diffusedGlow * 0.45) * lateralFalloff * horizonProg;

          // Subtle Genesis Center Core Halo (Active during 0s - 7.5s)
          float genesisCenterGlow = exp(-dot(p, p) * 14.0) * (1.0 - horizonProg * 0.75);
          vec3 genesisGlowCol = vec3(0.12, 0.18, 0.30) * genesisCenterGlow * smoothstep(0.0, 0.15, uProgress);

          vec3 finalSky = voidCol + horizonCol * glowAlpha + genesisGlowCol;

          // Vignette
          vec2 vigP = (vUv - 0.5) * vec2(1.15, 1.25);
          float vig = smoothstep(1.35, 0.25, length(vigP));
          finalSky *= mix(0.42, 1.0, vig);

          gl_FragColor = vec4(max(finalSky, vec3(0.0)), 1.0);
        }
      `;

      const skyMaterial = new THREE.ShaderMaterial({
        vertexShader: skyVertexShader,
        fragmentShader: skyFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uAspect: { value: window.innerWidth / window.innerHeight },
          uProgress: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
        },
        depthWrite: false,
        depthTest: false,
      });

      const skyMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), skyMaterial);
      skyMesh.frustumCulled = false;
      skyMesh.renderOrder = -100;
      scene.add(skyMesh);

      // ========================================================================
      // 2. Reflective Obsidian Architectural Runway Floor
      // ========================================================================
      const floorVertexShader = `
        varying vec2 vUv;
        varying vec3 vWorldPos;
        void main() {
          vUv = uv;
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPos = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `;

      const floorFragmentShader = `
        varying vec2 vUv;
        varying vec3 vWorldPos;
        uniform float uTime;
        uniform float uProgress;
        uniform vec2 uMouse;

        void main() {
          // Reveals smoothly between 9.0s and 12s
          float floorReveal = smoothstep(0.75, 0.95, uProgress);
          if (floorReveal <= 0.001) discard;

          vec3 p = vWorldPos;

          // Longitudinal architectural runway perspective vectors
          float centerLine = exp(-abs(p.x) * 1.8);
          float laneLines = exp(-abs(abs(p.x) - 5.8) * 5.0) + exp(-abs(abs(p.x) - 10.5) * 4.0);

          // Longitudinal hairline stripes receding to horizon
          float longitudinalStripes = exp(-abs(fract(p.x * 0.35 + 0.5) - 0.5) * 28.0) * 0.35;

          // Soft reflective gloss catching distant horizon glow
          float fresnel = clamp(1.0 - abs(p.y) / length(p), 0.0, 1.0);
          float floorReflection = exp(-abs(p.x * 0.18)) * pow(fresnel, 2.2) * 0.72;

          vec3 baseFloor = vec3(0.025, 0.032, 0.045);
          vec3 platinumLine = vec3(0.75, 0.82, 0.95);
          vec3 sapphireGlow = vec3(0.18, 0.32, 0.65);

          vec3 col = baseFloor;
          col += sapphireGlow * floorReflection;
          col += platinumLine * (laneLines * 0.28 + centerLine * 0.38 + longitudinalStripes * 0.18);

          // Distance fog fade
          float fogAlpha = smoothstep(55.0, 5.0, -p.z);
          float alpha = floorReveal * fogAlpha * (0.55 + floorReflection * 0.4);

          gl_FragColor = vec4(col, alpha);
        }
      `;

      const floorMaterial = new THREE.ShaderMaterial({
        vertexShader: floorVertexShader,
        fragmentShader: floorFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uProgress: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      });

      const floorGeo = new THREE.PlaneGeometry(80, 80, 1, 1);
      floorGeo.rotateX(-Math.PI / 2);
      const floorMesh = new THREE.Mesh(floorGeo, floorMaterial);
      floorMesh.position.set(0, -2.4, -15);
      floorMesh.renderOrder = -10;
      worldGroup.add(floorMesh);

      // ========================================================================
      // 3. Monolithic Architectural Colonnade Pillars
      // ========================================================================
      const pillarsGroup = new THREE.Group();
      worldGroup.add(pillarsGroup);

      const pillarMat = new THREE.MeshStandardMaterial({
        color: 0x07090e,
        roughness: 0.35,
        metalness: 0.85,
        transparent: true,
        opacity: 0,
      });

      const pillarEdgeMat = new THREE.LineBasicMaterial({
        color: 0x64748b,
        transparent: true,
        opacity: 0,
      });

      const pillarGeom = new THREE.BoxGeometry(0.38, 14.0, 1.8);
      const pillarEdgesGeom = new THREE.EdgesGeometry(pillarGeom);

      const pillarPositions = [
        // Left flank
        { x: -5.8, z: -32 },
        { x: -5.8, z: -22 },
        { x: -5.8, z: -12 },
        { x: -5.8, z: -2 },
        { x: -5.8, z: 8 },
        { x: -10.5, z: -28 },
        { x: -10.5, z: -16 },
        { x: -10.5, z: -4 },
        // Right flank
        { x: 5.8, z: -32 },
        { x: 5.8, z: -22 },
        { x: 5.8, z: -12 },
        { x: 5.8, z: -2 },
        { x: 5.8, z: 8 },
        { x: 10.5, z: -28 },
        { x: 10.5, z: -16 },
        { x: 10.5, z: -4 },
      ];

      const pillarMeshes = [];
      pillarPositions.forEach((pos) => {
        const pillar = new THREE.Mesh(pillarGeom, pillarMat.clone());
        pillar.position.set(pos.x, 3.8, pos.z);

        const edges = new THREE.LineSegments(pillarEdgesGeom, pillarEdgeMat.clone());
        pillar.add(edges);

        pillarsGroup.add(pillar);
        pillarMeshes.push({ mesh: pillar, edges, baseX: pos.x, baseY: 3.8, baseZ: pos.z });
      });

      // Ambient & directional illumination
      const ambLight = new THREE.AmbientLight(0x0e1320, 1.4);
      scene.add(ambLight);

      const keyLight = new THREE.DirectionalLight(0xdce7f5, 1.6);
      keyLight.position.set(4, 8, 6);
      scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
      rimLight.position.set(-6, 2, -18);
      scene.add(rimLight);

      // ========================================================================
      // 4. The Exact 18 Living Nodes — Master Kinematic Coordinates
      // ========================================================================
      const genesisGroup = new THREE.Group();
      worldGroup.add(genesisGroup);

      const phi = (1 + Math.sqrt(5)) / 2;
      const R_BASE = 2.3;

      // 1. Initial 18 Sacred Coordinates (0s - 5.0s)
      const rawInitial = [
        [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
        [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
        [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
        // 6 cardinal poles
        [0, phi * 1.15, 0], [0, -phi * 1.15, 0],
        [phi * 1.15, 0, 0], [-phi * 1.15, 0, 0],
        [0, 0, phi * 1.15], [0, 0, -phi * 1.15],
      ];

      const posInitial = rawInitial.map((v) =>
        new THREE.Vector3(v[0], v[1], v[2]).normalize().multiplyScalar(R_BASE)
      );

      const numNodes = posInitial.length; // Exactly 18

      // 2. Crystal Prism Coordinates (5.0s - 6.5s: কাঠামোর রূপান্তর)
      // Taut, architectural diamond/prism with sharp vertical apexes & tight facets
      const posCrystal = [
        // Upper crystalline ring (4 nodes)
        new THREE.Vector3(-1.4, 1.25, 1.4),
        new THREE.Vector3(1.4, 1.25, 1.4),
        new THREE.Vector3(1.4, 1.25, -1.4),
        new THREE.Vector3(-1.4, 1.25, -1.4),
        // Lower crystalline ring (4 nodes)
        new THREE.Vector3(-1.4, -1.25, 1.4),
        new THREE.Vector3(1.4, -1.25, 1.4),
        new THREE.Vector3(1.4, -1.25, -1.4),
        new THREE.Vector3(-1.4, -1.25, -1.4),
        // Equatorial tension belt (4 nodes)
        new THREE.Vector3(-2.2, 0.0, 0.0),
        new THREE.Vector3(2.2, 0.0, 0.0),
        new THREE.Vector3(0.0, 0.0, 2.2),
        new THREE.Vector3(0.0, 0.0, -2.2),
        // Top & bottom sharp apex poles (2 nodes)
        new THREE.Vector3(0.0, 2.85, 0.0),
        new THREE.Vector3(0.0, -2.85, 0.0),
        // Inner depth anchors (4 nodes)
        new THREE.Vector3(-0.85, 0.5, 0.85),
        new THREE.Vector3(0.85, 0.5, -0.85),
        new THREE.Vector3(0.85, -0.5, 0.85),
        new THREE.Vector3(-0.85, -0.5, -0.85),
      ];

      // 3. Centered Inward Monogram Coordinates (6.5s - 7.5s: কেন্দ্রীভবন)
      // Outer nodes pulled by magnetic center tension, forming an elegant compact emblem
      const posCentered = [
        new THREE.Vector3(-1.3, 0.8, 0.0),
        new THREE.Vector3(-0.65, 0.95, 0.0),
        new THREE.Vector3(0.0, 1.05, 0.0),
        new THREE.Vector3(0.65, 0.95, 0.0),
        new THREE.Vector3(1.3, 0.8, 0.0),

        new THREE.Vector3(-1.3, -0.8, 0.0),
        new THREE.Vector3(-0.65, -0.95, 0.0),
        new THREE.Vector3(0.0, -1.05, 0.0),
        new THREE.Vector3(0.65, -0.95, 0.0),
        new THREE.Vector3(1.3, -0.8, 0.0),

        new THREE.Vector3(-1.65, 0.0, 0.0),
        new THREE.Vector3(1.65, 0.0, 0.0),
        new THREE.Vector3(0.0, 0.45, 0.4),
        new THREE.Vector3(0.0, -0.45, -0.4),

        new THREE.Vector3(-0.8, 0.0, 0.25),
        new THREE.Vector3(0.8, 0.0, -0.25),
        new THREE.Vector3(-0.4, 0.0, -0.25),
        new THREE.Vector3(0.4, 0.0, 0.25),
      ];

      // 4. Typographic Frame Coordinates (7.5s - 8.5s: ডেনজো প্রকাশ)
      // The nodes form a bespoke architectural frame embracing the DENZO letters
      const posTypoFrame = [
        // Top frame rail (5 nodes)
        new THREE.Vector3(-2.8, 0.92, 0.0),
        new THREE.Vector3(-1.4, 0.92, 0.0),
        new THREE.Vector3(0.0, 0.92, 0.0),
        new THREE.Vector3(1.4, 0.92, 0.0),
        new THREE.Vector3(2.8, 0.92, 0.0),

        // Bottom frame rail (5 nodes)
        new THREE.Vector3(-2.8, -0.92, 0.0),
        new THREE.Vector3(-1.4, -0.92, 0.0),
        new THREE.Vector3(0.0, -0.92, 0.0),
        new THREE.Vector3(1.4, -0.92, 0.0),
        new THREE.Vector3(2.8, -0.92, 0.0),

        // Left & right flank brackets (4 nodes)
        new THREE.Vector3(-3.4, 0.45, 0.0),
        new THREE.Vector3(-3.4, -0.45, 0.0),
        new THREE.Vector3(3.4, 0.45, 0.0),
        new THREE.Vector3(3.4, -0.45, 0.0),

        // 4 corner depth accents
        new THREE.Vector3(-3.0, 1.1, 0.25),
        new THREE.Vector3(3.0, 1.1, -0.25),
        new THREE.Vector3(-3.0, -1.1, -0.25),
        new THREE.Vector3(3.0, -1.1, 0.25),
      ];

      // 5. Horizontal Laser Beam Coordinates (8.5s - 9.5s: চূড়ান্ত ব্র্যান্ড মুহূর্ত ও সংকুচিত সংকেত)
      // All 18 nodes compress into the horizontal horizon axis line y = 0, z = 0
      const posHorizonLaser = [];
      for (let i = 0; i < 18; i++) {
        const xSpan = ((i - 8.5) / 8.5) * 4.6; // Distributed along horizontal beam
        posHorizonLaser.push(new THREE.Vector3(xSpan, 0.0, 0.0));
      }

      // 6. Architectural Runway Rails Coordinates (9.5s - 12.0s: রানওয়ে পরিপ্রেক্ষিত ও হিরো পরিবেশ)
      // The 18 nodes smoothly settle as the ground perspective beacons of the architectural hall
      const posRunwayRails = [];
      const zWaypoints = [-32, -26, -20, -15, -10, -6, -2, 2, 6];
      // 9 nodes on left rail (x = -5.8, y = -2.25)
      for (let i = 0; i < 9; i++) {
        posRunwayRails.push(new THREE.Vector3(-5.8, -2.25, zWaypoints[i]));
      }
      // 9 nodes on right rail (x = 5.8, y = -2.25)
      for (let i = 0; i < 9; i++) {
        posRunwayRails.push(new THREE.Vector3(5.8, -2.25, zWaypoints[i]));
      }

      // Fixed edge topology (exactly 38 edges connecting neighbor vertices throughout the entire experience)
      const edgePairs = [];
      for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
          const d = posInitial[i].distanceTo(posInitial[j]);
          if (d > 1.35 && d < 2.85) {
            edgePairs.push({ i, j, phase: ((i * 7 + j * 13) % 100) / 100 });
          }
        }
      }

      // 4A. Origin Luminous Point Sprite (0.0s – 1.0s and anchor)
      const originPointVertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      const originPointFragmentShader = `
        varying vec2 vUv;
        uniform float uOpacity;
        void main() {
          vec2 p = vUv - 0.5;
          float d = length(p);
          float core = exp(-d * d * 320.0);
          float halo = exp(-d * 18.0) * 0.38;
          float a = (core + halo) * uOpacity;
          if (a < 0.005) discard;
          vec3 col = mix(vec3(0.72, 0.85, 1.0), vec3(1.0, 1.0, 1.0), core);
          gl_FragColor = vec4(col, a);
        }
      `;

      const originPointMat = new THREE.ShaderMaterial({
        vertexShader: originPointVertexShader,
        fragmentShader: originPointFragmentShader,
        uniforms: { uOpacity: { value: 0 } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const originPointMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 0.85), originPointMat);
      genesisGroup.add(originPointMesh);

      // 4B. The 18 Constellation Living Nodes (Continuous Geometry)
      const nodePosArray = new Float32Array(numNodes * 3);
      const nodeScaleArray = new Float32Array(numNodes);
      const nodeGeo = new THREE.BufferGeometry();
      nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePosArray, 3));
      nodeGeo.setAttribute('aScale', new THREE.BufferAttribute(nodeScaleArray, 1));

      const nodeVertexShader = `
        attribute float aScale;
        uniform float uPixelRatio;
        void main() {
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = max(1.0, (14.0 * aScale * uPixelRatio) * (14.0 / -mvPos.z));
          gl_Position = projectionMatrix * mvPos;
        }
      `;

      const nodeFragmentShader = `
        uniform float uOpacity;
        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float d = length(coord);
          if (d > 0.5) discard;
          float core = exp(-d * d * 45.0);
          float halo = exp(-d * 10.0) * 0.35;
          float alpha = (core + halo) * uOpacity;
          vec3 col = mix(vec3(0.65, 0.82, 1.0), vec3(1.0, 1.0, 1.0), core);
          gl_FragColor = vec4(col, alpha);
        }
      `;

      const nodeMat = new THREE.ShaderMaterial({
        vertexShader: nodeVertexShader,
        fragmentShader: nodeFragmentShader,
        uniforms: {
          uOpacity: { value: 0 },
          uPixelRatio: { value: maxDpr },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const nodePointsMesh = new THREE.Points(nodeGeo, nodeMat);
      genesisGroup.add(nodePointsMesh);

      // 4C. The Hairline Living Network Edges (Continuous Geometry)
      const linePositions = new Float32Array(edgePairs.length * 2 * 3);
      const lineDrawT = new Float32Array(edgePairs.length * 2);
      const linePhase = new Float32Array(edgePairs.length * 2);

      for (let e = 0; e < edgePairs.length; e++) {
        const edge = edgePairs[e];
        lineDrawT[e * 2] = 0.0;
        lineDrawT[e * 2 + 1] = 1.0;
        linePhase[e * 2] = edge.phase;
        linePhase[e * 2 + 1] = edge.phase;
      }

      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      lineGeo.setAttribute('aLineT', new THREE.BufferAttribute(lineDrawT, 1));
      lineGeo.setAttribute('aPhase', new THREE.BufferAttribute(linePhase, 1));

      const lineVertexShader = `
        attribute float aLineT;
        attribute float aPhase;
        varying float vLineT;
        varying float vPhase;
        void main() {
          vLineT = aLineT;
          vPhase = aPhase;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      const lineFragmentShader = `
        varying float vLineT;
        varying float vPhase;
        uniform float uTime;
        uniform float uDrawProgress;
        uniform float uPulseIntensity;
        uniform float uLineAlpha;

        void main() {
          // Animated hairline drawing from node A to B
          if (vLineT > uDrawProgress) discard;

          // Traveling data flow pulse (3.5s - 5.0s)
          float pulseHead = fract(uTime * 0.95 + vPhase);
          float distToHead = abs(vLineT - pulseHead);
          float dataPulse = exp(-distToHead * distToHead * 140.0) * uPulseIntensity;

          vec3 baseLineCol = vec3(0.72, 0.82, 0.95);
          vec3 pulseCol = vec3(1.0, 1.0, 1.0);

          vec3 finalCol = mix(baseLineCol, pulseCol, dataPulse);
          float alpha = clamp(uLineAlpha * (0.55 + dataPulse * 0.45), 0.0, 1.0);

          gl_FragColor = vec4(finalCol, alpha);
        }
      `;

      const lineMat = new THREE.ShaderMaterial({
        vertexShader: lineVertexShader,
        fragmentShader: lineFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uDrawProgress: { value: 0 },
          uPulseIntensity: { value: 0 },
          uLineAlpha: { value: 0 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const lineSegmentsMesh = new THREE.LineSegments(lineGeo, lineMat);
      genesisGroup.add(lineSegmentsMesh);

      // 4D. Concentric Technical Reticle Rings
      const ringGeom1 = new THREE.RingGeometry(R_BASE * 1.08, R_BASE * 1.09, 64);
      const ringGeom2 = new THREE.RingGeometry(R_BASE * 1.35, R_BASE * 1.358, 64);

      const reticleMat = new THREE.MeshBasicMaterial({
        color: 0x94a3b8,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });

      const reticleRing1 = new THREE.Mesh(ringGeom1, reticleMat);
      const reticleRing2 = new THREE.Mesh(ringGeom2, reticleMat.clone());
      reticleRing1.rotation.x = Math.PI * 0.35;
      reticleRing2.rotation.y = Math.PI * 0.28;
      genesisGroup.add(reticleRing1);
      genesisGroup.add(reticleRing2);

      // 4E. Center Core Horizontal Flare for DENZO reveal & laser signature
      const flareMat = new THREE.ShaderMaterial({
        vertexShader: originPointVertexShader,
        fragmentShader: `
          varying vec2 vUv;
          uniform float uOpacity;
          uniform float uScaleY;
          void main() {
            vec2 p = vUv - 0.5;
            float streak = exp(-abs(p.y * uScaleY) * 65.0) * exp(-abs(p.x) * 1.8);
            float a = streak * uOpacity;
            if (a < 0.005) discard;
            vec3 col = vec3(0.85, 0.94, 1.0);
            gl_FragColor = vec4(col, a);
          }
        `,
        uniforms: {
          uOpacity: { value: 0 },
          uScaleY: { value: 1.0 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const flareMesh = new THREE.Mesh(new THREE.PlaneGeometry(10.0, 1.4), flareMat);
      flareMesh.position.set(0, 0, 0.05);
      genesisGroup.add(flareMesh);

      // ========================================================================
      // 5. Interactive Mouse Parallax Tracking
      // ========================================================================
      let targetMouseX = 0;
      let targetMouseY = 0;
      let currentMouseX = 0;
      let currentMouseY = 0;

      const onPointerMove = (clientX, clientY) => {
        targetMouseX = (clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = (clientY / window.innerHeight - 0.5) * -2;
      };

      window.addEventListener(
        'mousemove',
        (e) => onPointerMove(e.clientX, e.clientY),
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

      const handleResize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const mobileNow = w < 768;
        const targetDpr = Math.min(
          window.devicePixelRatio || 1,
          mobileNow ? 1.0 : 1.25
        );
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(targetDpr);
        renderer.setSize(w, h);
        skyMaterial.uniforms.uAspect.value = w / h;
        nodeMat.uniforms.uPixelRatio.value = targetDpr;

        // Ensure 3D structure scales harmoniously on narrow portrait devices so it's always centered
        const aspect = w / h;
        const responsiveScale = aspect < 1.0 ? Math.min(1.0, Math.max(0.48, aspect * 0.95)) : 1.0;
        genesisGroup.scale.set(responsiveScale, responsiveScale, responsiveScale);
      };

      window.addEventListener('resize', handleResize);
      handleResize(); // Initial pass ensures immediate responsive scaling

      // Warm-up render frame
      renderer.render(scene, camera);

      // ========================================================================
      // 6. Kinematic Interpolator: Evaluates position of the SAME 18 nodes
      // ========================================================================
      const currentNodePos = [];
      for (let i = 0; i < numNodes; i++) {
        currentNodePos.push(new THREE.Vector3());
      }

      function computeContinuousNodePos(i, p) {
        // Phase 1: 0.0s – 1.0s (0 <= p < 0.0833): Collapsed at origin
        if (p < 0.0833) {
          return currentNodePos[i].set(0, 0, 0);
        }

        // Phase 2: 1.0s – 2.0s (0.0833 <= p < 0.1666): Blossom from origin to posInitial
        if (p < 0.1666) {
          const t = (p - 0.0833) / 0.0833;
          const ease = t * t * (3.0 - 2.0 * t);
          return currentNodePos[i].copy(posInitial[i]).multiplyScalar(ease);
        }

        // Phase 3 & 4: 2.0s – 5.0s (0.1666 <= p < 0.4166): Polyhedral sacred geometry
        if (p < 0.4166) {
          return currentNodePos[i].copy(posInitial[i]);
        }

        // Phase 5: 5.0s – 6.5s (0.4166 <= p < 0.5416): [কাঠামোর রূপান্তর]
        // Same nodes morph continuously into sharp crystalline prism
        if (p < 0.5416) {
          const t = (p - 0.4166) / 0.125;
          const ease = t * t * (3.0 - 2.0 * t);
          return currentNodePos[i].copy(posInitial[i]).lerp(posCrystal[i], ease);
        }

        // Phase 6: 6.5s – 7.5s (0.5416 <= p < 0.625): [কেন্দ্রীভবন]
        // Same nodes pull inward toward center into a clean, unified geometric monogram
        if (p < 0.625) {
          const t = (p - 0.5416) / 0.0833;
          const ease = t * t * (3.0 - 2.0 * t);
          return currentNodePos[i].copy(posCrystal[i]).lerp(posCentered[i], ease);
        }

        // Phase 7: 7.5s – 8.5s (0.625 <= p < 0.7083): [ডেনজো প্রকাশ]
        // Same nodes adjust into a bespoke typographic frame enclosing DENZO
        if (p < 0.7083) {
          const t = (p - 0.625) / 0.0833;
          const ease = t * t * (3.0 - 2.0 * t);
          return currentNodePos[i].copy(posCentered[i]).lerp(posTypoFrame[i], ease);
        }

        // Phase 8: 8.5s – 9.5s (0.7083 <= p < 0.7916): [চূড়ান্ত ব্র্যান্ড মুহূর্ত ও অনুভূমিক সংকেতে রূপান্তর]
        // Same nodes compress horizontally into the center horizon laser line
        if (p < 0.7916) {
          if (p < 0.7333) {
            // 8.5s - 8.8s: Steady typographic frame
            return currentNodePos[i].copy(posTypoFrame[i]);
          } else {
            // 8.8s - 9.5s: Compression into horizon laser line
            const t = (p - 0.7333) / 0.0583;
            const ease = t * t * (3.0 - 2.0 * t);
            return currentNodePos[i].copy(posTypoFrame[i]).lerp(posHorizonLaser[i], ease);
          }
        }

        // Phase 9: 9.5s – 10.5s (0.7916 <= p < 0.875): [ব্র্যান্ড সমাপ্তি ও স্থাপত্য রানওয়েতে বিস্তার]
        // Same nodes glide outward from horizontal axis onto the reflective runway floor
        if (p < 0.875) {
          const t = (p - 0.7916) / 0.0833;
          const ease = t * t * (3.0 - 2.0 * t);
          return currentNodePos[i].copy(posHorizonLaser[i]).lerp(posRunwayRails[i], ease);
        }

        // Phase 10: 10.5s – 12.0s+ (0.875 <= p): [হিরো সেকশনে প্রবেশ]
        // Same nodes remain as the longitudinal perspective boundary beacons of the architectural hall
        return currentNodePos[i].copy(posRunwayRails[i]);
      }

      // ========================================================================
      // 7. Main 60/120fps Animation & Morphing Engine
      // ========================================================================
      const clock = new THREE.Clock();

      function animateGenesisStage() {
        requestAnimationFrame(animateGenesisStage);
        if (document.hidden) return;

        const elapsed = clock.getElapsedTime();
        const p = (window.genesisState && window.genesisState.progress) || 0;

        // Smooth damped cursor physics
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        // Update uniforms for shaders
        skyMaterial.uniforms.uTime.value = elapsed;
        skyMaterial.uniforms.uProgress.value = p;
        skyMaterial.uniforms.uMouse.value.set(currentMouseX, currentMouseY);

        floorMaterial.uniforms.uTime.value = elapsed;
        floorMaterial.uniforms.uProgress.value = p;
        floorMaterial.uniforms.uMouse.value.set(currentMouseX, currentMouseY);

        lineMat.uniforms.uTime.value = elapsed;

        // ----------------------------------------------------------------------
        // Step A: Evaluate positions of all 18 nodes (Zero creation/deletion)
        // ----------------------------------------------------------------------
        const posArr = nodeGeo.attributes.position.array;
        const scaleArr = nodeGeo.attributes.aScale.array;

        for (let i = 0; i < numNodes; i++) {
          const pt = computeContinuousNodePos(i, p);
          posArr[i * 3] = pt.x;
          posArr[i * 3 + 1] = pt.y;
          posArr[i * 3 + 2] = pt.z;

          // Subtle organic size modulation
          if (p < 0.0833) {
            scaleArr[i] = 0;
          } else if (p < 0.1666) {
            scaleArr[i] = (p - 0.0833) / 0.0833;
          } else if (p < 0.7333) {
            scaleArr[i] = 1.0;
          } else if (p < 0.7916) {
            // Sharp brilliant focus during laser compression
            scaleArr[i] = 1.35;
          } else {
            // Architectural runway beacon scale
            scaleArr[i] = 0.85;
          }
        }
        nodeGeo.attributes.position.needsUpdate = true;
        nodeGeo.attributes.aScale.needsUpdate = true;

        // ----------------------------------------------------------------------
        // Step B: Update line endpoints between the exact same 18 nodes
        // ----------------------------------------------------------------------
        const linePos = lineGeo.attributes.position.array;
        for (let e = 0; e < edgePairs.length; e++) {
          const edge = edgePairs[e];
          const pA = currentNodePos[edge.i];
          const pB = currentNodePos[edge.j];
          linePos[e * 6] = pA.x;
          linePos[e * 6 + 1] = pA.y;
          linePos[e * 6 + 2] = pA.z;
          linePos[e * 6 + 3] = pB.x;
          linePos[e * 6 + 4] = pB.y;
          linePos[e * 6 + 5] = pB.z;
        }
        lineGeo.attributes.position.needsUpdate = true;

        // ----------------------------------------------------------------------
        // Step C: Phase-Specific Opacity, Lines, Reticles & Camera Motion
        // ----------------------------------------------------------------------
        // 0.0s – 1.0s: Origin point appears
        if (p < 0.0833) {
          const t1 = Math.max(0, p / 0.0833);
          originPointMat.uniforms.uOpacity.value = t1 * 0.95;
          nodeMat.uniforms.uOpacity.value = 0;
          lineMat.uniforms.uDrawProgress.value = 0;
          lineMat.uniforms.uLineAlpha.value = 0;
          lineMat.uniforms.uPulseIntensity.value = 0;
          flareMat.uniforms.uOpacity.value = 0;
          pillarMat.opacity = 0;
          pillarEdgeMat.opacity = 0;
          reticleRing1.material.opacity = 0;
          reticleRing2.material.opacity = 0;
          camera.position.z = 14.2;
          camera.position.y = 0.0;
        }
        // 1.0s – 2.0s: Nodes emerge
        else if (p < 0.1666) {
          const t2 = (p - 0.0833) / 0.0833;
          originPointMat.uniforms.uOpacity.value = 0.95;
          nodeMat.uniforms.uOpacity.value = t2 * 0.95;
          lineMat.uniforms.uDrawProgress.value = 0;
          lineMat.uniforms.uLineAlpha.value = 0;
        }
        // 2.0s – 3.5s: Lines draw
        else if (p < 0.2916) {
          const t3 = (p - 0.1666) / 0.125;
          nodeMat.uniforms.uOpacity.value = 0.95;
          lineMat.uniforms.uDrawProgress.value = t3;
          lineMat.uniforms.uLineAlpha.value = t3 * 0.72;
          lineMat.uniforms.uPulseIntensity.value = 0;
          reticleRing1.material.opacity = t3 * 0.22;
          reticleRing2.material.opacity = t3 * 0.16;
        }
        // 3.5s – 5.0s: Data flow pulses
        else if (p < 0.4166) {
          const t4 = (p - 0.2916) / 0.125;
          nodeMat.uniforms.uOpacity.value = 0.95;
          lineMat.uniforms.uDrawProgress.value = 1.0;
          lineMat.uniforms.uLineAlpha.value = 0.75;
          lineMat.uniforms.uPulseIntensity.value = Math.sin(t4 * Math.PI) * 0.85;
          reticleRing1.material.opacity = 0.22;
          reticleRing2.material.opacity = 0.16;
        }
        // 5.0s – 6.5s: [কাঠামোর রূপান্তর] Sharp crystalline morph
        else if (p < 0.5416) {
          const t5 = (p - 0.4166) / 0.125;
          nodeMat.uniforms.uOpacity.value = 0.95;
          lineMat.uniforms.uDrawProgress.value = 1.0;
          lineMat.uniforms.uPulseIntensity.value = 0; // Pulses dissolve cleanly
          lineMat.uniforms.uLineAlpha.value = 0.78;
          reticleRing1.material.opacity = 0.22 * (1.0 - t5);
          reticleRing2.material.opacity = 0.16 * (1.0 - t5);
          originPointMat.uniforms.uOpacity.value = 0.85;
          flareMat.uniforms.uOpacity.value = 0;
        }
        // 6.5s – 7.5s: [কেন্দ্রীভবন] Inward magnetic centering
        else if (p < 0.625) {
          const t6 = (p - 0.5416) / 0.0833;
          nodeMat.uniforms.uOpacity.value = 0.95;
          lineMat.uniforms.uLineAlpha.value = 0.82;
          lineMat.uniforms.uPulseIntensity.value = 0;
          originPointMat.uniforms.uOpacity.value = 0.95;
          flareMat.uniforms.uOpacity.value = t6 * 0.18; // Soft core aura begins
        }
        // 7.5s – 8.5s: [ডেনজো প্রকাশ] Framing around emerging DENZO
        else if (p < 0.7083) {
          const t7 = (p - 0.625) / 0.0833;
          nodeMat.uniforms.uOpacity.value = 0.95;
          lineMat.uniforms.uLineAlpha.value = 0.85;
          // Core horizontal flare shines behind the letters
          flareMat.uniforms.uOpacity.value = 0.35 + Math.sin(t7 * Math.PI) * 0.25;
          flareMat.uniforms.uScaleY.value = 1.0;
          originPointMat.uniforms.uOpacity.value = 0.6;
        }
        // 8.5s – 9.5s: [চূড়ান্ত ব্র্যান্ড মুহূর্ত ও অনুভূমিক সংকেতে সংকোচন]
        else if (p < 0.7916) {
          if (p < 0.7333) {
            // 8.5s - 8.8s: Clear, stable DENZO presentation
            nodeMat.uniforms.uOpacity.value = 0.95;
            lineMat.uniforms.uLineAlpha.value = 0.85;
            flareMat.uniforms.uOpacity.value = 0.35;
          } else {
            // 8.8s - 9.5s: Razor-sharp laser line collapse
            const t8 = (p - 0.7333) / 0.0583;
            nodeMat.uniforms.uOpacity.value = 1.0;
            lineMat.uniforms.uLineAlpha.value = 0.95;
            // Flare compresses vertically into a razor laser pulse
            flareMat.uniforms.uScaleY.value = 1.0 + t8 * 14.0;
            flareMat.uniforms.uOpacity.value = (1.0 - t8) * 0.75;
          }
        }
        // 9.5s – 10.5s: [ব্র্যান্ড সমাপ্তি ও স্থাপত্য রানওয়েতে রূপান্তর]
        else if (p < 0.875) {
          const t9 = (p - 0.7916) / 0.0833;
          flareMat.uniforms.uOpacity.value = 0;
          originPointMat.uniforms.uOpacity.value = 0;

          // Monolithic architectural pillars rise as the 18 nodes reach the runway
          pillarMat.opacity = t9 * 0.95;
          pillarEdgeMat.opacity = t9 * 0.45;

          pillarMeshes.forEach((pItem) => {
            pItem.mesh.position.y = pItem.baseY - (1.0 - t9) * 5.0;
          });

          nodeMat.uniforms.uOpacity.value = 0.75;
          lineMat.uniforms.uLineAlpha.value = 0.45;

          // Camera begins cinematic forward dolly
          camera.position.z = 14.2 - t9 * 3.8;
          camera.position.y = t9 * 0.65;
        }
        // 10.5s – 12.0s+: [হিরো সেকশনে প্রবেশ] Full Architectural Hall
        else {
          const t10 = Math.min(1.0, (p - 0.875) / 0.125);
          pillarMat.opacity = 0.95;
          pillarEdgeMat.opacity = 0.45;

          pillarMeshes.forEach((pItem) => {
            pItem.mesh.position.y = pItem.baseY;
          });

          // Nodes & lines remain as subtle runway perspective markers
          nodeMat.uniforms.uOpacity.value = 0.65;
          lineMat.uniforms.uLineAlpha.value = 0.35;

          // Eye-level monumental perspective
          camera.position.z = 10.4 - t10 * 0.8;
          camera.position.y = 0.65 + t10 * 0.07;
        }

        // ----------------------------------------------------------------------
        // Step D: Rotations & Parallax
        // ----------------------------------------------------------------------
        if (p < 0.625) {
          // Serene slow axial rotation during genesis & crystal phase (0.0s – 7.5s)
          const rotSpeed = p < 0.5416 ? 0.04 : 0.02;
          genesisGroup.rotation.y = elapsed * rotSpeed + currentMouseX * 0.1;
          genesisGroup.rotation.x = Math.sin(elapsed * 0.03) * 0.025 - currentMouseY * 0.06;
          reticleRing1.rotation.z = elapsed * 0.05;
          reticleRing2.rotation.z = -elapsed * 0.04;
        } else if (p < 0.7916) {
          // Frontal zero-rotation during DENZO emergence (7.5s - 8.5s) and laser collapse (8.5s - 9.5s)
          // Ensures the typographic frame squarely embraces the centered DENZO wordmark on all responsive breakpoints
          genesisGroup.rotation.set(0, 0, 0);
          genesisGroup.position.set(0, 0, 0);
          worldGroup.rotation.set(0, 0, 0);
          worldGroup.position.set(0, 0, 0);
          camera.position.set(0, 0, 14.2);
          camera.lookAt(0, 0, 0);
        } else {
          // Living architectural space parallax
          worldGroup.rotation.y = currentMouseX * 0.035;
          camera.position.x = currentMouseX * 0.85;
          camera.position.y = 0.72 + currentMouseY * 0.35;
          camera.lookAt(currentMouseX * 0.22, 0.35 + currentMouseY * 0.12, -18);
        }

        renderer.render(scene, camera);
      }

      animateGenesisStage();
    };

    if (window.THREE) {
      startScene();
    } else {
      window.addEventListener('three-ready', startScene, { once: true });
    }
  };
})();


/* ==========================================================================
   PART 2: Interactive 3D Brand Logo Engine
   ========================================================================== */
/**
 * Denzo Studio — Interactive 3D Brand Logo Engine
 * High-performance, luxury 3D sculptural lettermark centered on the hero section.
 * Smoothly tilts, rotates, and translates in 3D space tracking mouse cursor with physics-based inertia.
 * Features asynchronous zero-lag loading, GPU shader pre-warming, and off-screen pause.
 */

(function () {
  'use strict';

  let scene, camera, renderer;
  let modelGroup;
  let logoMesh = null;
  let canvas = null;
  let container = null;
  let isInitialized = false;
  let isModelLoaded = false;
  let isHeroVisible = false;
  let animationFrameId = null;
  let isRenderingActive = true;

  // Normalized cursor coordinates [-1, 1]
  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;

  // Rotational & translational state with damping
  let currentRotX = 0;
  let currentRotY = 0;
  let currentTransX = 0;
  let currentTransY = 0;

  const clock = {
    start: performance.now(),
    getElapsedTime: function () {
      return (performance.now() - this.start) * 0.001;
    },
  };

  const MODEL_URLS = [
    './assets/d-letter-logo-3d.glb',
    'https://raw.githubusercontent.com/codeovik/Denzo-files/refs/heads/main/d-letter-logo-3d.glb',
  ];

  function initHero3DLogo() {
    if (isInitialized) return;
    canvas = document.getElementById('hero-3d-brand-canvas');
    container = document.getElementById('hero-3d-brand-wrap');
    if (!canvas || !container) return;

    const THREE = window.THREE;
    if (!THREE) {
      window.addEventListener('three-ready', initHero3DLogo, { once: true });
      return;
    }

    isInitialized = true;

    // 1. Scene & Depth Configuration
    scene = new THREE.Scene();

    const rect = container.getBoundingClientRect();
    const width = Math.max(rect.width || 360, 200);
    const height = Math.max(rect.height || 360, 200);

    camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 50);
    camera.position.set(0, 0, 3.35);

    const isMobile = window.innerWidth < 768;
    const maxDpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.35);

    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    });

    renderer.setPixelRatio(maxDpr);
    renderer.setSize(width, height, false);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.20;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // 2. Multi-point Curated Architectural Lighting
    // Tuned for deep dark blue sculptural alloy
    const ambientLight = new THREE.AmbientLight(0x07111e, 1.8);
    scene.add(ambientLight);

    // Key front-top light: highlights bevels and front facet
    const keyLight = new THREE.DirectionalLight(0xe2e8f0, 2.5);
    keyLight.position.set(3.2, 3.8, 3.2);
    scene.add(keyLight);

    // Sapphire rim light: Denzo brand sapphire accent catching edge silhouettes
    const rimLight = new THREE.DirectionalLight(0x1d4ed8, 2.4);
    rimLight.position.set(-3.6, -1.8, -2.4);
    scene.add(rimLight);

    // Cool secondary fill light
    const fillLight = new THREE.DirectionalLight(0x2563eb, 1.5);
    fillLight.position.set(-2.8, 3.2, 1.8);
    scene.add(fillLight);

    // Deep ocean underside reflection light
    const bounceLight = new THREE.DirectionalLight(0x0c1b33, 1.2);
    bounceLight.position.set(0, -3.5, 2.0);
    scene.add(bounceLight);

    // 3. Model Parent Group
    modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // 4. Asynchronous Non-blocking Model Loader
    loadModelSafely();

    // 5. Interaction Listeners
    setupInteractions();

    // 6. Viewport Resize & Visibility Observers
    setupObservers();

    // 7. Start Render Loop
    requestAnimationFrame(renderLoop);
  }

  function loadModelSafely() {
    function tryLoad(urlIndex) {
      if (urlIndex >= MODEL_URLS.length) {
        console.warn('Hero 3D Logo: Could not load model from provided sources.');
        return;
      }

      const url = MODEL_URLS[urlIndex];
      const GLTFLoaderClass = window.GLTFLoader;

      if (!GLTFLoaderClass) {
        // Wait briefly for GLTFLoader to be ready
        window.addEventListener(
          'gltf-loader-ready',
          () => tryLoad(urlIndex),
          { once: true }
        );
        setTimeout(() => {
          if (!window.GLTFLoader && urlIndex === 0) tryLoad(urlIndex);
        }, 500);
        return;
      }

      const loader = new GLTFLoaderClass();
      loader.load(
        url,
        (gltf) => {
          onModelLoaded(gltf);
        },
        undefined,
        (err) => {
          console.warn(`Hero 3D Logo: Failed to load from ${url}, trying fallback...`, err);
          tryLoad(urlIndex + 1);
        }
      );
    }

    // Defer loading slightly to give immediate priority to genesis preloader
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => tryLoad(0), { timeout: 1200 });
    } else {
      setTimeout(() => tryLoad(0), 150);
    }
  }

  function onModelLoaded(gltf) {
    const THREE = window.THREE;
    if (!THREE) return;

    let targetMesh = null;
    gltf.scene.traverse((child) => {
      if (child.isMesh && !targetMesh) {
        targetMesh = child;
      }
    });

    if (!targetMesh) return;

    const geometry = targetMesh.geometry;

    // 1. Ensure smooth surface normals if missing in raw CAD export
    if (!geometry.attributes.normal) {
      geometry.computeVertexNormals();
    }

    // 2. Center geometry around local origin (0, 0, 0)
    geometry.center();

    // 3. Compute normalized bounding scale
    geometry.computeBoundingBox();
    const bbox = geometry.boundingBox;
    const size = new THREE.Vector3();
    bbox.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetDim = 2.05; // Generously framed sculptural presence
    const scale = targetDim / (maxDim || 1);

    // 4. Denzo Luxury Darker Blue Alloy Material
    // Darker blue finish: rich deep cobalt / navy sapphire with metallic luster
    const logoMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f2f5c, // Refined dark blue
      metalness: 0.66, // Metallic sheen bringing out beveled facets
      roughness: 0.24, // Polished surface with clean specular reflections
      envMapIntensity: 1.5,
    });

    targetMesh.material = logoMaterial;
    targetMesh.scale.set(scale, scale, scale);

    // Store reference and add to group
    logoMesh = targetMesh;
    modelGroup.add(logoMesh);
    isModelLoaded = true;

    // Pre-warm WebGL shader compilation in idle callback
    try {
      renderer.compile(scene, camera);
    } catch (_) {}

    // If hero section has already unfolded or preloader completed, reveal immediately
    if (isHeroVisible || document.body.classList.contains('preloader-completed')) {
      revealHero3DLogo();
    }
  }

  function setupInteractions() {
    function onPointerMove(e) {
      // Normalize cursor coordinates from -1 to 1 across viewport
      const cx = (e.clientX / window.innerWidth) * 2.0 - 1.0;
      const cy = (e.clientY / window.innerHeight) * 2.0 - 1.0;
      targetMouseX = Math.max(-1.0, Math.min(1.0, cx));
      targetMouseY = Math.max(-1.0, Math.min(1.0, cy));
    }

    function onTouchMove(e) {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        const cx = (touch.clientX / window.innerWidth) * 2.0 - 1.0;
        const cy = (touch.clientY / window.innerHeight) * 2.0 - 1.0;
        targetMouseX = Math.max(-1.0, Math.min(1.0, cx * 1.2));
        targetMouseY = Math.max(-1.0, Math.min(1.0, cy * 1.2));
      }
    }

    function onPointerLeave() {
      // Return gently toward center when pointer exits window
      targetMouseX = 0;
      targetMouseY = 0;
    }

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave, { passive: true });
  }

  function setupObservers() {
    function handleResize() {
      if (!renderer || !camera || !container) return;
      const rect = container.getBoundingClientRect();
      const w = Math.max(rect.width || 360, 160);
      const h = Math.max(rect.height || 360, 160);

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      const isMobile = window.innerWidth < 768;
      const targetDpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.35);
      renderer.setPixelRatio(targetDpr);
      renderer.setSize(w, h, false);
    }

    window.addEventListener('resize', handleResize, { passive: true });

    // Performance Guard: Pause render loop when scrolled away from Hero stage
    if ('IntersectionObserver' in window) {
      const stageEl = document.getElementById('stage') || container;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isRenderingActive = entry.isIntersecting;
            if (isRenderingActive && !animationFrameId) {
              animationFrameId = requestAnimationFrame(renderLoop);
            }
          });
        },
        { threshold: 0.05 }
      );
      if (stageEl) observer.observe(stageEl);
    }
  }

  function renderLoop() {
    if (!isRenderingActive) {
      animationFrameId = null;
      return;
    }

    const elapsed = clock.getElapsedTime();

    // 1. Mouse following with smooth inertia damping (lerp)
    currentMouseX += (targetMouseX - currentMouseX) * 0.055;
    currentMouseY += (targetMouseY - currentMouseY) * 0.055;

    // 2. Multi-axis interactive rotation based on cursor
    // Yaw (Y-axis tilt): tilts left/right up to ~42 degrees
    const targetRotY = currentMouseX * 0.72;
    // Pitch (X-axis tilt): tilts up/down up to ~30 degrees
    const targetRotX = -currentMouseY * 0.52;

    currentRotY += (targetRotY - currentRotY) * 0.065;
    currentRotX += (targetRotX - currentRotX) * 0.065;

    // 3. Subtle floating translation (Parallax glide)
    const targetTransX = currentMouseX * 0.16;
    const targetTransY = -currentMouseY * 0.14;

    currentTransX += (targetTransX - currentTransX) * 0.065;
    currentTransY += (targetTransY - currentTransY) * 0.065;

    // 4. Subtle organic idle breathing / hovering
    const idleHoverY = Math.sin(elapsed * 1.5) * 0.05;
    const idleRotZ = Math.sin(elapsed * 1.1) * 0.02;

    if (modelGroup) {
      modelGroup.rotation.y = currentRotY;
      modelGroup.rotation.x = currentRotX;
      modelGroup.rotation.z = idleRotZ;

      modelGroup.position.x = currentTransX;
      modelGroup.position.y = currentTransY + idleHoverY;
    }

    renderer.render(scene, camera);
    animationFrameId = requestAnimationFrame(renderLoop);
  }

  function revealHero3DLogo() {
    isHeroVisible = true;
    if (!container) container = document.getElementById('hero-3d-brand-wrap');
    if (!container) return;

    if (window.gsap) {
      window.gsap.to(container, {
        opacity: 1,
        visibility: 'visible',
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    } else {
      container.style.opacity = '1';
      container.style.visibility = 'visible';
    }
  }

  function hideHero3DLogo() {
    isHeroVisible = false;
    if (!container) container = document.getElementById('hero-3d-brand-wrap');
    if (!container) return;

    if (window.gsap) {
      window.gsap.set(container, {
        opacity: 0,
        visibility: 'hidden',
        scale: 0.95,
      });
    } else {
      container.style.opacity = '0';
      container.style.visibility = 'hidden';
    }
  }

  // Expose global methods for preloader orchestration
  window.DenzoHero3D = {
    init: initHero3DLogo,
    reveal: revealHero3DLogo,
    hide: hideHero3DLogo,
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHero3DLogo);
  } else {
    initHero3DLogo();
  }
})();


/* ==========================================================================
   PART 3: Preloader Timeline, Minimalist Odometer, Lenis Smooth Scroll & Orchestration
   ========================================================================== */
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
  let hasBelowFoldInitialized = false;
  let lenis = null;
  let lenisInstance = null;

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
    lenisInstance = lenis;
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
    document.body.classList.add('preloader-completed');
    document.documentElement.style.overflowY = '';
    document.body.style.overflowY = '';
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    document.getElementById('nav')?.classList.remove('scrolled');

    window.DenzoHero3D?.reveal?.();

    if (typeof window.upgradeUniverseResolution === 'function') {
      window.upgradeUniverseResolution();
    }

    if (!hasBelowFoldInitialized) {
      hasBelowFoldInitialized = true;
      requestAnimationFrame(() => {
        initBelowFoldSections();
        if (lenis) {
          lenis.resize();
          lenis.scrollTo(0, { immediate: true, force: true });
          lenis.start();
        }
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      });
    } else {
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
  }

  lockScrollForPreloader();

  // ==========================================================================
  // DOM Element References
  // ==========================================================================
  const canvas = document.getElementById('hero-universe-canvas');
  const wordmarkEl = document.getElementById('denzo-genesis-wordmark');
  const genesisChars = wordmarkEl ? Array.from(wordmarkEl.querySelectorAll('.genesis-char')) : [];
  const skipBtn = document.getElementById('genesis-skip-btn');
  const replayBtn = document.getElementById('genesis-replay-btn');
  const soundToggle = document.getElementById('sound-toggle');
  const heroEyebrow = document.getElementById('hero-eyebrow');
  const heroHeading = document.getElementById('hero-heading');
  const heroSubheading = document.getElementById('hero-subheading');
  const heroCtaPanel = document.getElementById('hero-cta-panel');
  const heroScrollIndicator = document.getElementById('hero-scroll-indicator');
  const navBrand = document.querySelector('.nav-brand');
  const navActionItems = document.querySelectorAll('.nav-action-item');

  // ==========================================================================
  // Preloader Odometer Loading Percentage Counter (Placed down of dot nodes)
  // ==========================================================================
  const odoCounterEl = document.getElementById('genesis-preloader-counter');
  const odoSlotHundreds = document.getElementById('odoSlotHundreds');
  const odoSlotTens = document.getElementById('odoSlotTens');
  const odoSlotOnes = document.getElementById('odoSlotOnes');
  const odoReelHundreds = document.getElementById('odoReelHundreds');
  const odoReelTens = document.getElementById('odoReelTens');
  const odoReelOnes = document.getElementById('odoReelOnes');
  const odoMeasureSpan = document.getElementById('odoMeasureSpan');

  let odoCharHeight = 44;
  let odoCharWidth = 24;
  let isOdometerInitialized = false;
  const odometerState = { value: 0 };

  function initOdometerReels() {
    if (isOdometerInitialized || !odoReelOnes) return;
    isOdometerInitialized = true;

    // Populate ones reel with 101 continuous rolling digits (0..9 repeated to 100)
    let onesHtml = '';
    for (let i = 0; i <= 100; i++) {
      onesHtml += `<span class="odometer-char">${i % 10}</span>`;
    }
    odoReelOnes.innerHTML = onesHtml;

    measureOdometerDimensions();
    updateOdometer(0);

    window.addEventListener('resize', () => {
      measureOdometerDimensions();
      updateOdometer(odometerState.value);
    }, { passive: true });
  }

  function measureOdometerDimensions() {
    if (odoMeasureSpan) {
      const rect = odoMeasureSpan.getBoundingClientRect();
      if (rect.height > 0) odoCharHeight = rect.height;
      if (rect.width > 0) odoCharWidth = rect.width;
    }
  }

  function updateOdometer(rawVal) {
    measureOdometerDimensions();
    const val = Math.max(0, Math.min(100, rawVal));

    // 1. Continuous physical roll for ones reel
    const onesTranslate = -val * odoCharHeight;
    if (odoReelOnes) {
      odoReelOnes.style.transform = `translate3d(0, ${onesTranslate.toFixed(2)}px, 0)`;
    }

    // 2. Mechanical odometer tens reel translation and smooth slot width expansion
    const baseTen = Math.floor(val / 10);
    const rem = val % 10;
    let tensPos = baseTen;
    if (baseTen < 10) {
      if (rem > 8.0) {
        tensPos = baseTen + (rem - 8.0) / 2.0;
      }
    } else {
      tensPos = 10;
    }
    const tensTranslate = -tensPos * odoCharHeight;
    if (odoReelTens) {
      odoReelTens.style.transform = `translate3d(0, ${tensTranslate.toFixed(2)}px, 0)`;
    }
    if (odoSlotTens) {
      if (val < 8.0) {
        odoSlotTens.style.width = '0px';
        odoSlotTens.style.opacity = '0';
      } else if (val < 10.0) {
        const factor = (val - 8.0) / 2.0;
        odoSlotTens.style.width = `${(factor * odoCharWidth).toFixed(2)}px`;
        odoSlotTens.style.opacity = factor.toFixed(2);
      } else {
        odoSlotTens.style.width = `${odoCharWidth.toFixed(2)}px`;
        odoSlotTens.style.opacity = '1';
      }
    }

    // 3. Mechanical odometer hundreds reel translation and smooth slot width expansion
    let hundredsPos = 0;
    if (val > 98.0) {
      hundredsPos = (val - 98.0) / 2.0;
    }
    const hundredsTranslate = -hundredsPos * odoCharHeight;
    if (odoReelHundreds) {
      odoReelHundreds.style.transform = `translate3d(0, ${hundredsTranslate.toFixed(2)}px, 0)`;
    }
    if (odoSlotHundreds) {
      if (val < 98.0) {
        odoSlotHundreds.style.width = '0px';
        odoSlotHundreds.style.opacity = '0';
      } else if (val < 100.0) {
        const factor = (val - 98.0) / 2.0;
        odoSlotHundreds.style.width = `${(factor * odoCharWidth).toFixed(2)}px`;
        odoSlotHundreds.style.opacity = factor.toFixed(2);
      } else {
        odoSlotHundreds.style.width = `${odoCharWidth.toFixed(2)}px`;
        odoSlotHundreds.style.opacity = '1';
      }
    }

    // 4. Update aria accessibility value
    if (odoCounterEl) {
      odoCounterEl.setAttribute('aria-valuenow', Math.round(val).toString());
    }
  }

  let masterTl = null;

  // Global Genesis State Driver
  window.genesisState = {
    progress: 0,
    hasCompleted: false,
    chime1: false,
    chime2: false,
    chime3: false,
    chime4: false,
    chime5: false,
  };

  // Safe startup
  let hasStartedExperience = false;
  function safeStartExperience() {
    if (hasStartedExperience) return;
    hasStartedExperience = true;
    initOdometerReels();
    resetAllInitialStates();
    buildTimeline();
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(safeStartExperience).catch(safeStartExperience);
    setTimeout(safeStartExperience, 250);
  } else {
    safeStartExperience();
  }

  // Fail-safe watchdog
  setTimeout(() => {
    if (!hasPreloaderCompleted) {
      if (masterTl) masterTl.progress(1);
      unlockScrollAfterPreloader();
    }
  }, 14000);

  function resetAllInitialStates() {
    window.DenzoHero3D?.hide?.();
    const wordmarkWrap = document.getElementById('denzo-genesis-wordmark-wrap');
    if (wordmarkWrap) {
      gsap.set(wordmarkWrap, {
        display: 'flex',
        visibility: 'visible',
        opacity: 1,
      });
    }

    if (wordmarkEl) {
      gsap.set(wordmarkEl, {
        clearProps: 'top,left,right,bottom,xPercent,yPercent,letterSpacing',
        x: 0,
        y: 0,
        xPercent: 0,
        yPercent: 0,
        scaleX: 1,
        scaleY: 1,
        scale: 1,
        opacity: 1,
        display: 'inline-flex',
        visibility: 'visible',
      });
    }

    gsap.set(genesisChars, {
      opacity: 0,
      filter: 'blur(14px)',
    });

    gsap.set(skipBtn, {
      opacity: 0,
      pointerEvents: 'none',
    });
    gsap.set(replayBtn, {
      opacity: 0,
      y: -8,
    });

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

    if (heroCtaPanel) {
      gsap.set(heroCtaPanel, {
        opacity: 0,
        y: 18,
      });
    }

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

    // Reset Odometer Preloader Counter
    if (odoCounterEl) {
      odoCounterEl.style.display = 'flex';
      gsap.set(odoCounterEl, {
        opacity: 0,
        y: 16,
        filter: 'blur(0px)',
      });
      odometerState.value = 0;
      updateOdometer(0);
    }

    // Reveal skip button gently after 1.2s
    gsap.to(skipBtn, {
      opacity: 1,
      pointerEvents: 'auto',
      duration: 0.6,
      delay: 1.2,
    });
  }

  // ==========================================================================
  // Web Audio Luxury Binaural Ambient Soundscape Engine
  // ==========================================================================
  let audioContext = null;
  let masterGain = null;
  let isSoundMuted = true;
  let droneOsc1 = null;
  let droneOsc2 = null;

  function initWebAudioEngine() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContext) {
        audioContext = new AudioCtx();
        masterGain = audioContext.createGain();
        masterGain.gain.setValueAtTime(0, audioContext.currentTime);
        masterGain.connect(audioContext.destination);

        // Sub bass warm drone (55Hz / A1)
        droneOsc1 = audioContext.createOscillator();
        droneOsc1.type = 'sine';
        droneOsc1.frequency.setValueAtTime(55, audioContext.currentTime);

        const filter1 = audioContext.createBiquadFilter();
        filter1.type = 'lowpass';
        filter1.frequency.setValueAtTime(140, audioContext.currentTime);
        filter1.Q.setValueAtTime(2.0, audioContext.currentTime);

        const drone1Gain = audioContext.createGain();
        drone1Gain.gain.setValueAtTime(0.35, audioContext.currentTime);

        droneOsc1.connect(filter1);
        filter1.connect(drone1Gain);
        drone1Gain.connect(masterGain);
        droneOsc1.start();

        // 5th harmony ethereal overtone (82.4Hz / E2)
        droneOsc2 = audioContext.createOscillator();
        droneOsc2.type = 'sine';
        droneOsc2.frequency.setValueAtTime(82.4, audioContext.currentTime);

        const drone2Gain = audioContext.createGain();
        drone2Gain.gain.setValueAtTime(0.18, audioContext.currentTime);

        droneOsc2.connect(drone2Gain);
        drone2Gain.connect(masterGain);
        droneOsc2.start();
      }

      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
    } catch (e) {}
  }

  window.playHarmonicChime = function (freq, duration = 1.2, vol = 0.15) {
    if (!audioContext || isSoundMuted) return;
    try {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);

      gain.gain.setValueAtTime(vol, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      osc.stop(audioContext.currentTime + duration);
    } catch (e) {}
  };

  function toggleSound() {
    isSoundMuted = !isSoundMuted;
    soundToggle?.setAttribute('aria-pressed', isSoundMuted ? 'false' : 'true');
    soundToggle?.setAttribute('title', isSoundMuted ? 'Enable sound' : 'Mute sound');
    if (isSoundMuted) {
      soundToggle?.classList.remove('is-active');
      if (masterGain && audioContext) {
        masterGain.gain.setTargetAtTime(0, audioContext.currentTime, 0.15);
      }
    } else {
      initWebAudioEngine();
      soundToggle?.classList.add('is-active');
      if (masterGain && audioContext) {
        masterGain.gain.setTargetAtTime(0.16, audioContext.currentTime, 0.25);
      }
      window.playHarmonicChime(523.25, 0.8, 0.2); // C5
    }
  }

  if (soundToggle) {
    soundToggle.addEventListener('click', toggleSound);
  }

  // ==========================================================================
  // Master GSAP Timeline Orchestration (0s -> 12s)
  // ==========================================================================
  function buildTimeline() {
    if (masterTl) {
      masterTl.kill();
    }

    genesisState.progress = 0;
    genesisState.hasCompleted = false;
    genesisState.chime1 = false;
    genesisState.chime2 = false;
    genesisState.chime3 = false;
    genesisState.chime4 = false;
    genesisState.chime5 = false;

    masterTl = gsap.timeline({
      defaults: { ease: 'none' },
      onComplete: () => {
        genesisState.hasCompleted = true;
        unlockScrollAfterPreloader();
        gsap.to(skipBtn, { opacity: 0, pointerEvents: 'none', duration: 0.4 });
        gsap.to(replayBtn, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
      },
    });

    // Continuous 12.0s timeline driver
    masterTl.to(genesisState, {
      progress: 1.0,
      duration: 12.0,
      ease: 'none',
    }, 0);

    // Odometer Counter: Fade in below dot nodes at 0.3s
    if (odoCounterEl) {
      masterTl.to(odoCounterEl, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, 0.3);

      // Smooth mechanical count-up from 0 to 100 synchronized with the genesis phases
      odometerState.value = 0;
      updateOdometer(0);
      masterTl.to(odometerState, {
        value: 100,
        duration: 7.2,
        ease: 'power1.inOut',
        onUpdate: () => {
          updateOdometer(odometerState.value);
        },
      }, 0.4);

      // Fade out counter at 8.6s (Brand exit contraction)
      masterTl.to(odoCounterEl, {
        opacity: 0,
        y: 12,
        duration: 0.55,
        ease: 'power2.in',
        onComplete: () => {
          if (odoCounterEl) odoCounterEl.style.display = 'none';
        },
      }, 8.6);
    }

    // Harmonic Audio Triggers synced to each storyboard phase
    masterTl.call(() => { if (!genesisState.chime1) { genesisState.chime1 = true; window.playHarmonicChime?.(329.63, 1.4, 0.12); } }, null, 1.0); // 1.0s: Constellation nodes emerge (E4)
    masterTl.call(() => { if (!genesisState.chime2) { genesisState.chime2 = true; window.playHarmonicChime?.(440.0, 1.5, 0.14); } }, null, 2.0);  // 2.0s: Hairline lines connect (A4)
    masterTl.call(() => { if (!genesisState.chime3) { genesisState.chime3 = true; window.playHarmonicChime?.(659.25, 1.2, 0.12); } }, null, 3.5); // 3.5s: Data flow commences (E5)
    masterTl.call(() => { if (!genesisState.chime4) { genesisState.chime4 = true; window.playHarmonicChime?.(554.37, 1.8, 0.16); } }, null, 5.0); // 5.0s: Geometric morph (C#5)
    masterTl.call(() => { window.playHarmonicChime?.(440.0, 1.6, 0.15); }, null, 6.5);  // 6.5s: Inward centering (A4)
    masterTl.call(() => { if (!genesisState.chime5) { genesisState.chime5 = true; window.playHarmonicChime?.(880.0, 2.2, 0.20); } }, null, 7.5);  // 7.5s: DENZO emerges (A5)
    masterTl.call(() => { window.playHarmonicChime?.(1174.66, 1.4, 0.22); window.playHarmonicChime?.(220.0, 2.8, 0.25); }, null, 8.8); // 8.8s: Signature exit contraction (D6 + A3)

    // 7.5s - 8.5s: DENZO letters emerge from within centered typographic frame
    masterTl.to(
      genesisChars,
      {
        opacity: 1,
        filter: 'blur(0px)',
        stagger: 0.1,
        duration: 0.85,
        ease: 'power2.out',
      },
      7.5
    );

    // 8.8s - 9.45s: Brand Signature Exit — DENZO contracts into a razor-sharp horizontal signal line and dissolves completely
    if (wordmarkEl) {
      masterTl.to(
        wordmarkEl,
        {
          scaleX: 0.02,
          scaleY: 0.04,
          transformOrigin: '50% 50%',
          duration: 0.65,
          ease: 'power3.in',
        },
        8.8
      );
      masterTl.to(
        genesisChars,
        {
          filter: 'blur(4px)',
          opacity: 0.8,
          duration: 0.45,
          ease: 'power3.in',
        },
        8.8
      );
      masterTl.to(
        wordmarkEl,
        {
          opacity: 0,
          scale: 0,
          transformOrigin: '50% 50%',
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => {
            gsap.set(wordmarkEl, { display: 'none', visibility: 'hidden' });
            const wordmarkWrap = document.getElementById('denzo-genesis-wordmark-wrap');
            if (wordmarkWrap) gsap.set(wordmarkWrap, { display: 'none', visibility: 'hidden' });
          },
        },
        9.35
      );
    }

    // 10.5s+: Interactive 3D Brand Logo smoothly reveals at hero center
    masterTl.call(() => {
      window.DenzoHero3D?.reveal?.();
    }, null, 10.5);

    // 10.5s - 12.0s: Hero editorial typography & navigation softly fade in
    // (DENZO is NOT in the hero section)
    masterTl.to(
      [heroEyebrow, heroHeading],
      {
        opacity: 1,
        y: 0,
        stagger: 0.14,
        duration: 1.2,
        ease: 'power3.out',
      },
      10.5
    );

    if (heroSubheading) {
      masterTl.to(
        heroSubheading,
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
        },
        10.8
      );
    }

    if (heroCtaPanel) {
      masterTl.to(
        heroCtaPanel,
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
        },
        11.0
      );
    }

    if (heroScrollIndicator) {
      masterTl.to(
        heroScrollIndicator,
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
        },
        11.1
      );
    }

    masterTl.to(
      navBrand,
      {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      },
      10.6
    );

    masterTl.to(
      navActionItems,
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
      },
      10.7
    );

    return masterTl;
  }

  // Fast-forward / Skip handler (smooth 0.5s ease directly to 12s)
  function skipSequence() {
    window.DenzoHero3D?.reveal?.();
    if (genesisState.hasCompleted) return;
    if (odoCounterEl) {
      odometerState.value = 100;
      updateOdometer(100);
      gsap.to(odoCounterEl, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          odoCounterEl.style.display = 'none';
        },
      });
    }
    if (masterTl) {
      masterTl.timeScale(8.0);
    }
    gsap.to(genesisState, {
      progress: 1.0,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        if (masterTl) masterTl.progress(1.0);
      },
    });
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', skipSequence);
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Escape') {
      if (!genesisState.hasCompleted) skipSequence();
    }
  });

  // Replay Genesis handler
  function replaySequence() {
    lockScrollForPreloader();
    resetAllInitialStates();
    buildTimeline();
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', replaySequence);
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
          playAudioChime(240, 'sine');
        } else {
          soundToggle.classList.add('is-active');
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

    // Keyboard Escape key dismisses modals and drawers
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (isContactOpen) closeContactModal();
        if (isDesktopMenuOpen) closeDesktopMenu();
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
  // Interactive 3D Animated Universe Background (Clean Dark & Cinematic Awwwards Stage)
  // ==========================================================================
  function initHeroUniverseBackground() {
    if (typeof window.initGenesisHeroStage === 'function') {
      window.initGenesisHeroStage();
      return;
    }
    const canvas = document.getElementById('hero-universe-canvas');
    if (!canvas) return;

    const startUniverseScene = () => {
      const THREE = window.THREE;
      if (!THREE) return;

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        52,
        window.innerWidth / window.innerHeight,
        0.1,
        200
      );
      camera.position.set(0, 0, 13.5);

      const isMobileDevice = window.innerWidth < 768;
      const fullDpr = Math.min(window.devicePixelRatio || 1, isMobileDevice ? 1.0 : 1.25);
      const preloaderDpr = Math.min(fullDpr, isMobileDevice ? 0.65 : 0.75);

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: false,
        antialias: !isMobileDevice,
        powerPreference: 'high-performance',
        stencil: false,
        depth: false,
      });
      renderer.setPixelRatio(hasPreloaderCompleted ? fullDpr : preloaderDpr);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x010308, 1);

      // ========================================================================
      // 1. Full-Screen Volumetric Deep-Space Nebula & Horizon GLSL Shader Quad
      //    (Zero-NaN GPU-safe math + 3-octave fast FBM for locked 60/120fps)
      // ========================================================================
      const backdropVertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `;

      const backdropFragmentShader = `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uAspect;
        uniform float uWarpBoost;
        uniform vec2 uMouse;
        uniform float uPulse;

        float hash(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
            u.y
          );
        }

        float fbm3(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          mat2 rot = mat2(0.80, -0.60, 0.60, 0.80);
          for (int i = 0; i < 3; i++) {
            v += a * noise(p);
            p = rot * p * 2.03 + vec2(1.7, 9.2);
            a *= 0.5;
          }
          return v;
        }

        void main() {
          vec2 uv = vUv - 0.5;
          vec2 p = vec2(uv.x * uAspect, uv.y);

          vec2 mouseP = vec2(uMouse.x * 0.5 * uAspect, uMouse.y * 0.5);
          vec2 toMouse = p - mouseP;
          float mouseDistSq = dot(toMouse, toMouse);
          float mouseDist = sqrt(mouseDistSq + 0.0001);

          // Gravitational lens distortion around cursor + warp expansion
          float lensPull = exp(-mouseDistSq * 3.8) * (0.065 + uPulse * 0.08);
          vec2 warpedP = p - (toMouse / mouseDist) * lensPull;
          warpedP *= (1.0 - uWarpBoost * 0.14);

          float t = uTime * 0.045;

          // Fast 3-octave domain-warped volumetric cosmic silk clouds
          vec2 q = vec2(
            fbm3(warpedP * 1.35 + vec2(0.0, t * 0.8)),
            fbm3(warpedP * 1.35 + vec2(5.2, 1.3 - t * 0.6))
          );

          float f = fbm3(warpedP * 1.95 + 1.9 * q + vec2(1.7 + t * 0.4, 2.8 - t * 0.35));

          // Diagonal galactic plane & anamorphic horizon band
          float rotAngle = -0.36 + uMouse.x * 0.04;
          float ca = cos(rotAngle);
          float sa = sin(rotAngle);
          vec2 gp = mat2(ca, -sa, sa, ca) * warpedP;

          float galacticBand = exp(-abs(gp.y + sin(gp.x * 1.4 + t) * 0.08) * 3.6);
          vec2 coreVec = gp * vec2(0.65, 2.2);
          float galacticCore = exp(-dot(coreVec, coreVec) * 1.8);

          // Dark interstellar dust rift carving through the galactic plane
          float dustRift = smoothstep(0.34, 0.68, q.x * 0.55 + f * 0.55);

          // Base abyssal space void
          vec3 col = vec3(0.006, 0.012, 0.032);

          vec3 deepNavy = vec3(0.022, 0.062, 0.195);
          vec3 royalSapphire = vec3(0.065, 0.195, 0.540);
          vec3 electricCyan = vec3(0.140, 0.420, 0.880);
          vec3 celestialIce = vec3(0.550, 0.760, 1.000);

          float cloudDensity = smoothstep(0.18, 0.88, f);
          col = mix(col, deepNavy, cloudDensity * 0.85);

          // Pure multiplication instead of pow() to guarantee zero NaN on all mobile/desktop GPUs
          float fSq = clamp(f * f * 1.35, 0.0, 1.0);
          col += royalSapphire * (fSq * fSq) * (0.42 + galacticBand * 0.58);

          float qLen = clamp(length(q) * 0.76, 0.0, 1.0);
          float qPow = qLen * qLen * qLen;
          col += electricCyan * qPow * galacticBand * (1.0 - dustRift * 0.72) * 0.38;

          // Anamorphic center-stage horizon light bloom
          float anamorphicStreak = exp(-abs(gp.y) * 14.0) * exp(-abs(gp.x) * 1.15);
          col += mix(royalSapphire, celestialIce, 0.45) * anamorphicStreak * (0.18 + uWarpBoost * 0.25);

          // Galactic core glow attenuated by dark dust veins
          col += mix(deepNavy, electricCyan, 0.35) * galacticCore * (1.0 - dustRift * 0.55) * 0.24;

          // Interactive cursor volumetric light aura & shockwave ripple (100% NaN-free)
          float cursorGlow = exp(-mouseDistSq * 4.5);
          float ringDelta = mouseDist - (1.0 - uPulse) * 0.65;
          float pulseRing = exp(-ringDelta * ringDelta * 65.0) * uPulse;
          col += mix(royalSapphire, celestialIce, 0.5) * (cursorGlow * 0.14 + pulseRing * 0.22);

          // Cinematic optical vignette
          vec2 vigUv = uv * vec2(1.08, 1.18);
          float vig = smoothstep(1.32, 0.22, sqrt(dot(vigUv, vigUv)));
          col *= mix(0.32, 1.0, vig);

          // Subtle 35mm cinema film grain
          float grain = (hash(uv * 850.0 + fract(uTime * 17.0)) - 0.5) * 0.012;
          col += grain;

          gl_FragColor = vec4(max(col, vec3(0.0)), 1.0);
        }
      `;

      const backdropMaterial = new THREE.ShaderMaterial({
        vertexShader: backdropVertexShader,
        fragmentShader: backdropFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uAspect: { value: window.innerWidth / window.innerHeight },
          uWarpBoost: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uPulse: { value: 0 },
        },
        depthWrite: false,
        depthTest: false,
      });

      const backdropMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), backdropMaterial);
      backdropMesh.frustumCulled = false;
      backdropMesh.renderOrder = -10;
      scene.add(backdropMesh);

      // ========================================================================
      // Universe 3D Root Hierarchy
      // ========================================================================
      const universeGroup = new THREE.Group();
      scene.add(universeGroup);

      // ========================================================================
      // 2. 3D Sculptural Gyroscopic Astrolabe & Event-Horizon Light Rings
      // ========================================================================
      const orbitalRingsGroup = new THREE.Group();
      universeGroup.add(orbitalRingsGroup);

      const ringVertexShader = `
        varying vec2 vUv;
        varying vec3 vPos;
        void main() {
          vUv = uv;
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      const ringFragmentShader = `
        varying vec2 vUv;
        varying vec3 vPos;
        uniform float uTime;
        uniform float uSpeed;
        uniform float uTickCount;
        uniform float uOpacity;
        uniform vec3 uColorA;
        uniform vec3 uColorB;

        void main() {
          float angle = atan(vPos.y, vPos.x);

          float radialCenter = abs(vUv.y - 0.5) * 2.0;
          float coreLine = exp(-radialCenter * radialCenter * 28.0);
          float softHalo = exp(-radialCenter * radialCenter * 5.5) * 0.35;

          float w1 = max(0.0, 0.5 + 0.5 * sin(angle * 2.0 - uTime * uSpeed));
          float wave1 = w1 * w1 * w1 * w1;
          float w2 = max(0.0, 0.5 + 0.5 * cos(angle * 3.0 + uTime * uSpeed * 0.72));
          float w2Sq = w2 * w2;
          float wave2 = w2Sq * w2Sq * w2Sq;
          float arcMask = 0.16 + 0.84 * max(wave1, wave2 * 0.85);

          float tickPattern = 0.0;
          if (uTickCount > 0.0) {
            float tickWave = abs(sin(angle * uTickCount));
            float tickSharp = smoothstep(0.965, 0.998, tickWave);
            float tickRadial = smoothstep(0.85, 0.25, radialCenter);
            tickPattern = tickSharp * tickRadial * 0.55;
          }

          vec3 col = mix(uColorA, uColorB, wave1);
          float alpha = (coreLine * arcMask + softHalo * arcMask + tickPattern) * uOpacity;

          gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
        }
      `;

      function createOrbitalLightRing({
        radius,
        thickness,
        rotX,
        rotY,
        rotZ,
        speed,
        tickCount,
        opacity,
        colorA,
        colorB,
      }) {
        const geom = new THREE.RingGeometry(radius - thickness * 0.5, radius + thickness * 0.5, 180, 1);
        // Ensure UVs map inner->outer cleanly from 0 to 1
        const pos = geom.attributes.position;
        const uvs = geom.attributes.uv;
        const innerR = radius - thickness * 0.5;
        for (let i = 0; i < pos.count; i++) {
          const vx = pos.getX(i);
          const vy = pos.getY(i);
          const r = Math.hypot(vx, vy);
          const normR = (r - innerR) / thickness;
          uvs.setXY(i, 0, normR);
        }

        const mat = new THREE.ShaderMaterial({
          vertexShader: ringVertexShader,
          fragmentShader: ringFragmentShader,
          uniforms: {
            uTime: { value: 0 },
            uSpeed: { value: speed },
            uTickCount: { value: tickCount },
            uOpacity: { value: opacity },
            uColorA: { value: new THREE.Color(colorA) },
            uColorB: { value: new THREE.Color(colorB) },
          },
          transparent: true,
          depthWrite: false,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
        });

        const mesh = new THREE.Mesh(geom, mat);
        mesh.rotation.set(rotX, rotY, rotZ);
        orbitalRingsGroup.add(mesh);
        return { mesh, mat, baseRotX: rotX, baseRotY: rotY, baseRotZ: rotZ, speed };
      }

      const orbitalRings = [
        createOrbitalLightRing({
          radius: 4.85,
          thickness: 0.14,
          rotX: 1.12,
          rotY: -0.22,
          rotZ: 0.15,
          speed: 0.65,
          tickCount: 90.0,
          opacity: 0.52,
          colorA: '#1E40AF',
          colorB: '#93C5FD',
        }),
        createOrbitalLightRing({
          radius: 6.75,
          thickness: 0.18,
          rotX: 1.24,
          rotY: 0.18,
          rotZ: -0.28,
          speed: -0.48,
          tickCount: 140.0,
          opacity: 0.38,
          colorA: '#1D4ED8',
          colorB: '#E0F2FE',
        }),
        createOrbitalLightRing({
          radius: 9.2,
          thickness: 0.24,
          rotX: 1.02,
          rotY: -0.08,
          rotZ: 0.42,
          speed: 0.34,
          tickCount: 0.0,
          opacity: 0.26,
          colorA: '#0F297A',
          colorB: '#60A5FA',
        }),
      ];

      // ========================================================================
      // 3. 3D Flowing Cosmic Energy Filaments / Curved Spline Light Streams
      // ========================================================================
      const filamentsGroup = new THREE.Group();
      universeGroup.add(filamentsGroup);

      const filamentVertexShader = `
        attribute float aProgress;
        attribute float aPhase;
        attribute vec3 aColor;
        uniform float uTime;
        uniform vec2 uMouse3D;
        varying float vProgress;
        varying float vPhase;
        varying vec3 vColor;

        void main() {
          vProgress = aProgress;
          vPhase = aPhase;
          vColor = aColor;

          vec3 pos = position;
          // Gentle 3D wave undulation & cursor magnetic deflection
          pos.y += sin(aProgress * 8.0 + uTime * 0.9 + aPhase) * 0.18;
          pos.x += cos(aProgress * 6.0 - uTime * 0.7 + aPhase) * 0.14;

          vec2 diff = pos.xy - uMouse3D * 7.0;
          float influence = exp(-dot(diff, diff) * 0.08);
          pos.xy += normalize(diff + vec2(0.0001)) * influence * 0.42;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `;

      const filamentFragmentShader = `
        varying float vProgress;
        varying float vPhase;
        varying vec3 vColor;
        uniform float uTime;
        uniform float uWarpBoost;

        void main() {
          float edgeFade = sin(vProgress * 3.14159265);

          float speed = 0.32 + uWarpBoost * 0.85;
          float head1 = fract(vProgress * 1.5 - uTime * speed + vPhase);
          float p1 = max(0.0, smoothstep(0.0, 0.92, head1) * (1.0 - smoothstep(0.92, 1.0, head1)));
          float pulse1 = p1 * p1 * p1;

          float head2 = fract(vProgress * 2.5 - uTime * (speed * 1.35) + vPhase * 1.7);
          float p2 = max(0.0, smoothstep(0.0, 0.9, head2) * (1.0 - smoothstep(0.9, 1.0, head2)));
          float p2Sq = p2 * p2;
          float pulse2 = p2Sq * p2Sq;

          float baseThread = 0.065;
          float intensity = (baseThread + pulse1 * 0.68 + pulse2 * 0.45) * edgeFade;
          float alpha = clamp(intensity * (0.48 + uWarpBoost * 0.45), 0.0, 0.88);

          vec3 finalCol = vColor + vec3(pulse1 * 0.35 + pulse2 * 0.25);
          gl_FragColor = vec4(finalCol, alpha);
        }
      `;

      const filamentMaterial = new THREE.ShaderMaterial({
        vertexShader: filamentVertexShader,
        fragmentShader: filamentFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uWarpBoost: { value: 0 },
          uMouse3D: { value: new THREE.Vector2(0, 0) },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const filamentPalette = [
        new THREE.Color('#3B82F6'),
        new THREE.Color('#60A5FA'),
        new THREE.Color('#93C5FD'),
        new THREE.Color('#38BDF8'),
        new THREE.Color('#818CF8'),
      ];

      const numFilaments = 18;
      const ptsPerFilament = 90;

      for (let f = 0; f < numFilaments; f++) {
        const baseAngle = (f / numFilaments) * Math.PI * 2;
        const curvePoints = [];
        const radiusStart = 2.4 + (f % 4) * 0.85;
        const radiusEnd = 12.5 + (f % 3) * 2.8;
        const zOffset = (Math.random() - 0.5) * 8.0;
        const yTilt = (Math.random() - 0.5) * 4.5;

        for (let j = 0; j < 6; j++) {
          const t = j / 5;
          const r = radiusStart + (radiusEnd - radiusStart) * Math.pow(t, 1.15);
          const theta = baseAngle + t * 2.35;
          const x = Math.cos(theta) * r;
          const z = Math.sin(theta) * r * 0.65 - 3.5 + zOffset * (1 - t * 0.5);
          const y =
            Math.sin(theta * 1.5) * 1.4 +
            (t - 0.5) * yTilt;
          curvePoints.push(new THREE.Vector3(x, y, z));
        }

        const curve = new THREE.CatmullRomCurve3(curvePoints);
        const sampled = curve.getPoints(ptsPerFilament - 1);

        const geom = new THREE.BufferGeometry();
        const posArr = new Float32Array(ptsPerFilament * 3);
        const progArr = new Float32Array(ptsPerFilament);
        const phaseArr = new Float32Array(ptsPerFilament);
        const colArr = new Float32Array(ptsPerFilament * 3);

        const phaseVal = Math.random();
        const col = filamentPalette[f % filamentPalette.length];

        for (let i = 0; i < ptsPerFilament; i++) {
          posArr[i * 3] = sampled[i].x;
          posArr[i * 3 + 1] = sampled[i].y;
          posArr[i * 3 + 2] = sampled[i].z;
          progArr[i] = i / (ptsPerFilament - 1);
          phaseArr[i] = phaseVal;
          colArr[i * 3] = col.r;
          colArr[i * 3 + 1] = col.g;
          colArr[i * 3 + 2] = col.b;
        }

        geom.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
        geom.setAttribute('aProgress', new THREE.BufferAttribute(progArr, 1));
        geom.setAttribute('aPhase', new THREE.BufferAttribute(phaseArr, 1));
        geom.setAttribute('aColor', new THREE.BufferAttribute(colArr, 3));

        const line = new THREE.Line(geom, filamentMaterial);
        filamentsGroup.add(line);
      }

      // ========================================================================
      // 4. 3D Logarithmic Spiral Galaxy & Anamorphic Optical Lens-Flare Stars
      // ========================================================================
      const flareVertexShader = `
        attribute float aSize;
        attribute float aPhase;
        attribute float aBrightness;
        attribute float aFlareType;
        attribute vec3 aColor;
        uniform float uTime;
        uniform float uPixelRatio;
        uniform float uWarpBoost;
        uniform vec2 uMouse3D;
        varying vec3 vColor;
        varying float vAlpha;
        varying float vFlareType;

        void main() {
          vColor = aColor;
          vFlareType = aFlareType;
          vec3 pos = position;

          // Differential orbital spiral rotation around galaxy center
          float r = length(pos.xz);
          float orbitAngle = uTime * (0.035 / (1.0 + r * 0.12));
          float cs = cos(orbitAngle);
          float sn = sin(orbitAngle);
          pos.xz = mat2(cs, -sn, sn, cs) * pos.xz;

          // Subtle interactive 3D cursor wave
          vec2 diff = pos.xy - uMouse3D * 7.5;
          float influence = exp(-dot(diff, diff) * 0.09);
          pos.xy += normalize(diff + vec2(0.0001)) * influence * 0.36;
          pos.z += influence * 0.55;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          float dist = max(-mvPosition.z, 0.1);

          float shimmer = 0.76 + 0.24 * sin(uTime * (1.2 + aBrightness * 1.8) + aPhase);
          vAlpha = clamp(aBrightness * shimmer * (1.0 + uWarpBoost * 0.4), 0.08, 1.0);

          float scale = aSize * (34.0 / dist) * uPixelRatio * (1.0 + uWarpBoost * 0.5);
          gl_PointSize = clamp(scale, 1.2, 34.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `;

      const flareFragmentShader = `
        varying vec3 vColor;
        varying float vAlpha;
        varying float vFlareType;

        void main() {
          vec2 uv = (gl_PointCoord - vec2(0.5)) * 2.0;
          float d = length(uv);
          if (d > 1.0) discard;

          float core = exp(-d * d * 18.0);
          float invD = max(0.0, 1.0 - d);
          float bloom = (invD * invD * invD) * 0.42;

          float anamorphicHoriz = exp(-abs(uv.y) * 28.0) * exp(-abs(uv.x) * 2.6) * 0.85;
          float diffractionVert = exp(-abs(uv.x) * 28.0) * exp(-abs(uv.y) * 4.2) * 0.55;
          float spikes = (anamorphicHoriz + diffractionVert) * vFlareType;

          float intensity = clamp(core + bloom + spikes, 0.0, 1.0);
          vec3 finalCol = mix(vColor, vec3(1.0), core * 0.65 + spikes * 0.35);

          gl_FragColor = vec4(finalCol, intensity * vAlpha);
        }
      `;

      function createSpiralGalaxyField(count) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const phases = new Float32Array(count);
        const brightness = new Float32Array(count);
        const flareTypes = new Float32Array(count);
        const colors = new Float32Array(count * 3);

        const coreColor = new THREE.Color('#E0F2FE');
        const armColorA = new THREE.Color('#60A5FA');
        const armColorB = new THREE.Color('#38BDF8');
        const outerColor = new THREE.Color('#818CF8');
        const starWhite = new THREE.Color('#FFFFFF');
        const tempColor = new THREE.Color();

        const arms = 3;

        for (let i = 0; i < count; i++) {
          const isAmbientHalo = i > count * 0.78;
          let x, y, z, rRatio;

          if (!isAmbientHalo) {
            // Logarithmic 3D spiral galaxy accretion arms
            rRatio = Math.pow(Math.random(), 1.35);
            const radius = 1.6 + rRatio * 22.0;
            const armIndex = i % arms;
            const branchAngle = (armIndex / arms) * Math.PI * 2;
            const spinAngle = radius * 0.42;

            const scatterScale = (0.35 + rRatio * 1.85);
            const randX = Math.pow(Math.random(), 2.2) * (Math.random() < 0.5 ? 1 : -1) * scatterScale;
            const randY = Math.pow(Math.random(), 2.6) * (Math.random() < 0.5 ? 1 : -1) * (scatterScale * 0.42);
            const randZ = Math.pow(Math.random(), 2.2) * (Math.random() < 0.5 ? 1 : -1) * scatterScale;

            x = Math.cos(branchAngle + spinAngle) * radius + randX;
            y = randY;
            z = Math.sin(branchAngle + spinAngle) * radius * 0.72 - 4.0 + randZ;
          } else {
            // Deep 3D celestial vault surrounding the spiral galaxy
            rRatio = Math.random();
            x = (Math.random() - 0.5) * 52.0;
            y = (Math.random() - 0.5) * 32.0;
            z = -28.0 + Math.random() * 32.0;
          }

          positions[i * 3] = x;
          positions[i * 3 + 1] = y;
          positions[i * 3 + 2] = z;

          const isBeacon = Math.random() < 0.14;
          flareTypes[i] = isBeacon ? 1.0 : 0.15;

          sizes[i] = isBeacon
            ? 2.2 + Math.random() * 3.4
            : 0.65 + Math.pow(Math.random(), 2.2) * 1.65;

          phases[i] = Math.random() * Math.PI * 2;
          brightness[i] = isBeacon
            ? 0.72 + Math.random() * 0.28
            : 0.24 + Math.pow(Math.random(), 1.6) * 0.64;

          if (isBeacon && Math.random() < 0.5) {
            tempColor.copy(starWhite);
          } else if (rRatio < 0.3) {
            tempColor.copy(coreColor).lerp(armColorA, rRatio / 0.3);
          } else if (rRatio < 0.7) {
            tempColor.copy(armColorA).lerp(armColorB, (rRatio - 0.3) / 0.4);
          } else {
            tempColor.copy(armColorB).lerp(outerColor, (rRatio - 0.7) / 0.3);
          }

          colors[i * 3] = tempColor.r;
          colors[i * 3 + 1] = tempColor.g;
          colors[i * 3 + 2] = tempColor.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
        geometry.setAttribute('aBrightness', new THREE.BufferAttribute(brightness, 1));
        geometry.setAttribute('aFlareType', new THREE.BufferAttribute(flareTypes, 1));
        geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.ShaderMaterial({
          vertexShader: flareVertexShader,
          fragmentShader: flareFragmentShader,
          uniforms: {
            uTime: { value: 0 },
            uPixelRatio: { value: hasPreloaderCompleted ? fullDpr : preloaderDpr },
            uWarpBoost: { value: 0 },
            uMouse3D: { value: new THREE.Vector2(0, 0) },
          },
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });

        const points = new THREE.Points(geometry, material);
        points.rotation.x = 0.58;
        points.rotation.z = -0.24;
        return { points, material };
      }

      const spiralGalaxy = createSpiralGalaxyField(isMobileDevice ? 1150 : 1750);
      universeGroup.add(spiralGalaxy.points);

      // ========================================================================
      // 5. High-Velocity Deep-Space Meteor / Light-Speed Streaks
      // ========================================================================
      const shootingStarsGroup = new THREE.Group();
      universeGroup.add(shootingStarsGroup);

      function createShootingStar() {
        const geom = new THREE.BufferGeometry();
        const trailLen = 3.6;
        const pts = new Float32Array([0, 0, 0, -trailLen, -trailLen * 0.32, 0]);
        geom.setAttribute('position', new THREE.BufferAttribute(pts, 3));
        const mat = new THREE.LineBasicMaterial({
          color: 0xe0f2fe,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
        });
        const line = new THREE.Line(geom, mat);
        shootingStarsGroup.add(line);
        return {
          line,
          mat,
          active: false,
          vx: 0,
          vy: 0,
          life: 0,
          maxLife: 1.0,
          nextSpawn: 2.0 + Math.random() * 4.5,
        };
      }

      const shootingStars = [createShootingStar(), createShootingStar()];

      // ========================================================================
      // Preloader -> Hero Expansion Warp Choreography & Click Pulse
      // ========================================================================
      const warpState = {
        camZ: 13.5,
        boost: 0,
        pulse: 0,
      };

      window.resetUniverseWarp = () => {
        warpState.camZ = 13.5;
        warpState.boost = 0;
        camera.position.z = 13.5;
      };

      window.triggerUniverseWarp = () => {
        gsap.killTweensOf(warpState);
        warpState.camZ = 15.2;
        warpState.boost = 1.15;
        gsap.to(warpState, {
          camZ: 8.4,
          boost: 0,
          duration: 1.65,
          ease: 'power3.out',
        });
      };

      // Interactive pointer tracking & click gravitational wave
      let targetMouseX = 0;
      let targetMouseY = 0;
      let currentMouseX = 0;
      let currentMouseY = 0;
      let isHeroVisible = true;

      const stageEl = document.getElementById('stage');
      if (stageEl && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              isHeroVisible = entry.isIntersecting;
            });
          },
          { threshold: 0.02 }
        );
        observer.observe(stageEl);
      }

      const onPointerMove = (clientX, clientY) => {
        if (!isHeroVisible) return;
        targetMouseX = (clientX / window.innerWidth) * 2 - 1;
        targetMouseY = -((clientY / window.innerHeight) * 2 - 1);
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

      window.addEventListener(
        'pointerdown',
        (e) => {
          if (!isHeroVisible) return;
          onPointerMove(e.clientX, e.clientY);
          gsap.fromTo(
            warpState,
            { pulse: 1.0 },
            { pulse: 0.0, duration: 1.15, ease: 'power2.out', overwrite: 'auto' }
          );
        },
        { passive: true }
      );

      document.addEventListener('mouseleave', () => {
        targetMouseX = 0;
        targetMouseY = 0;
      });

      const handleResize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const mobileNow = w < 768;
        const targetDpr = Math.min(
          window.devicePixelRatio || 1,
          hasPreloaderCompleted ? (mobileNow ? 1.0 : 1.25) : mobileNow ? 0.65 : 0.75
        );
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(targetDpr);
        renderer.setSize(w, h);
        backdropMaterial.uniforms.uAspect.value = w / h;
        spiralGalaxy.material.uniforms.uPixelRatio.value = targetDpr;
      };

      window.upgradeUniverseResolution = () => {
        handleResize();
      };

      window.addEventListener('resize', handleResize);

      // Pre-compile shaders & render 1 warm-up frame immediately so preloader reveal never stutters
      renderer.render(scene, camera);

      const clock = new THREE.Clock();
      let prevTime = 0;

      function animateUniverse() {
        requestAnimationFrame(animateUniverse);
        if (!isHeroVisible || document.hidden) return;

        // Skip GPU rendering during the earliest preloader wordmark phase (0.0s - 1.65s) while videoWrapper is invisible
        if (
          !hasPreloaderCompleted &&
          videoWrapper &&
          parseFloat(gsap.getProperty(videoWrapper, 'opacity') || 0) < 0.01
        ) {
          return;
        }

        const elapsed = clock.getElapsedTime();
        const dt = Math.min(elapsed - prevTime, 0.1);
        prevTime = elapsed;

        // Silky damped cursor inertia
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        // 1. Update Volumetric Nebula Shader Uniforms
        backdropMaterial.uniforms.uTime.value = elapsed;
        backdropMaterial.uniforms.uWarpBoost.value = warpState.boost;
        backdropMaterial.uniforms.uMouse.value.set(currentMouseX, currentMouseY);
        backdropMaterial.uniforms.uPulse.value = warpState.pulse;

        // 2. Update 3D Gyroscopic Orbital Light Rings
        for (let i = 0; i < orbitalRings.length; i++) {
          const r = orbitalRings[i];
          r.mat.uniforms.uTime.value = elapsed;
          r.mesh.rotation.x = r.baseRotX + Math.sin(elapsed * 0.22 + i) * 0.06 - currentMouseY * (0.14 + i * 0.03);
          r.mesh.rotation.y = r.baseRotY + Math.cos(elapsed * 0.18 + i) * 0.06 + currentMouseX * (0.18 + i * 0.04);
          r.mesh.rotation.z = r.baseRotZ + elapsed * r.speed * 0.08;
        }

        // 3. Update 3D Flowing Energy Filaments
        filamentMaterial.uniforms.uTime.value = elapsed;
        filamentMaterial.uniforms.uWarpBoost.value = warpState.boost;
        filamentMaterial.uniforms.uMouse3D.value.set(currentMouseX, currentMouseY);
        filamentsGroup.rotation.z = elapsed * 0.024;
        filamentsGroup.rotation.y = Math.sin(elapsed * 0.15) * 0.08 + currentMouseX * 0.12;
        filamentsGroup.rotation.x = -currentMouseY * 0.08;

        // 4. Update 3D Spiral Galaxy & Anamorphic Optical Beacons
        spiralGalaxy.material.uniforms.uTime.value = elapsed;
        spiralGalaxy.material.uniforms.uWarpBoost.value = warpState.boost;
        spiralGalaxy.material.uniforms.uMouse3D.value.set(currentMouseX, currentMouseY);

        // 5. Multi-depth 3D Camera Orbit & Banking Roll
        camera.position.z = warpState.camZ;
        camera.position.x = currentMouseX * 1.05;
        camera.position.y = currentMouseY * 0.68;
        camera.lookAt(currentMouseX * 0.28, currentMouseY * 0.2, 0);
        camera.rotation.z += -currentMouseX * 0.035;

        // Global subtle universe breath & parallax
        universeGroup.rotation.y = elapsed * 0.014 + currentMouseX * 0.12;
        universeGroup.rotation.x = Math.sin(elapsed * 0.12) * 0.03 - currentMouseY * 0.09;

        // 6. Animate Occasional Deep-Space Meteor Streaks
        for (let i = 0; i < shootingStars.length; i++) {
          const s = shootingStars[i];
          if (!s.active) {
            s.nextSpawn -= dt;
            if (s.nextSpawn <= 0) {
              s.active = true;
              s.life = 0;
              s.maxLife = 0.55 + Math.random() * 0.4;
              s.line.position.set(
                (Math.random() - 0.15) * 24,
                3.5 + Math.random() * 9,
                -10 - Math.random() * 10
              );
              const speed = 25 + Math.random() * 14;
              s.vx = -speed;
              s.vy = -speed * 0.32;
            }
          } else {
            s.life += dt;
            const p = s.life / s.maxLife;
            if (p >= 1) {
              s.active = false;
              s.mat.opacity = 0;
              s.nextSpawn = 3.5 + Math.random() * 6.5;
            } else {
              s.line.position.x += s.vx * dt;
              s.line.position.y += s.vy * dt;
              s.mat.opacity = Math.sin(p * Math.PI) * 0.72;
            }
          }
        }

        renderer.render(scene, camera);
      }

      animateUniverse();
    };

    if (window.THREE) {
      startUniverseScene();
    } else {
      window.addEventListener('three-ready', startUniverseScene, { once: true });
    }
  }

  initHeroUniverseBackground();

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

        // Start worker download after preloader finishes (5.8s) so preloader timeline has zero CPU/GPU contention
        setTimeout(() => {
          worker.postMessage({ urls: GLB_URLS });
        }, 5800);
      }

      loadAndOptimizeGlbInWorker();

      // Pre-warm 3D D-logo shader compilation upfront so t=4.85s hero reveal has zero frame drop
      renderer.render(scene, camera);

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
  initServicesContinuousExperience();

  // ==========================================================================
  // Defer Below-The-Fold Section Initialization Until Preloader Completes
  // (Eliminates synchronous DOM layout reflows & offscreen tweens during preloader)
  // ==========================================================================
  function initBelowFoldSections() {
    initAiStatementScrollReveal();
    initServicesContinuousExperience();
    initAiSolutionsHorizontalPin();
    initWorkProcessSection();
    initProblemFirstSection();
    initAiExperienceSection();
    initOrbitalCtaSection();
    initFooterScrollReveal();
  }

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
  // Full-Page Scroll-Driven Continuous Services Experience (One Canvas Universe)
  // AI -> Technology -> Applications -> Automation (Crisp Persistent Dots)
  // ==========================================================================
  function initServicesContinuousExperience() {
    const section = document.getElementById('services-section');
    const stage = document.getElementById('servicesStickyStage');
    const canvas = document.getElementById('services-canvas');
    const titleEl = document.getElementById('services-copy-title');
    const descEl = document.getElementById('services-copy-desc');
    const railFillEl = document.getElementById('services-rail-fill');
    const railCols = Array.from(document.querySelectorAll('.services-rail-col'));

    if (!section || !canvas) return;
    if (section.dataset.continuousInit === 'true') return;
    section.dataset.continuousInit = 'true';

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Prefers-reduced-motion check
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Editorial STORY array
    const STORY = [
      {
        title: 'Everything starts as data.',
        desc: 'Scroll to watch it become intelligence, websites, applications and automation.',
      },
      {
        title: 'AI that understands your business.',
        desc: 'Custom AI solutions that read information, assist teams, talk to customers and analyze data.',
      },
      {
        title: 'Technology that people can use.',
        desc: 'Websites and platforms built on top of that intelligence: fast, clear and ready for customers.',
      },
      {
        title: 'Applications for every day.',
        desc: 'Web and mobile apps that turn the same data into products people open again and again.',
      },
      {
        title: 'Automation that keeps it moving.',
        desc: 'Systems connected end to end, so repetitive work runs on its own.',
      },
    ];

    // Math helpers
    function clamp(val, min, max) {
      return Math.min(max, Math.max(min, val));
    }

    function easeInOutCubic(x) {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    // Performance Monitoring State (Performance Rules)
    let slowFramesCount = 0;
    let performanceTierReduced = false;
    let lastFrameTimestamp = performance.now();
    let isIntersectingViewport = true;

    // Determine target dot count by viewport width (Upgrade 1)
    function getActiveDotCount() {
      if (performanceTierReduced) return CONFIG.dotCounts.mobile;
      const w = window.innerWidth;
      if (w < 768) return CONFIG.dotCounts.mobile;
      if (w < 1024) return CONFIG.dotCounts.tablet;
      return CONFIG.dotCounts.desktop;
    }

    let activePointCount = getActiveDotCount();
    const MAX_POINTS = CONFIG.dotCounts.desktop;

    // Helper: distributes exactly N points in 3D along polylines
    function distributePointsAlongPathsWithZ(polylines, totalCount, contourPolyIndices = [], structurePolyIndices = []) {
      const polyData = [];
      let totalLength = 0;

      for (let p = 0; p < polylines.length; p++) {
        const poly = polylines[p];
        if (!poly || poly.length < 2) continue;
        const segLens = [];
        let polyLen = 0;
        for (let i = 0; i < poly.length - 1; i++) {
          const dx = poly[i + 1][0] - poly[i][0];
          const dy = poly[i + 1][1] - poly[i][1];
          const dz = (poly[i + 1][2] || 0) - (poly[i][2] || 0);
          const len = Math.hypot(dx, dy, dz);
          segLens.push(len);
          polyLen += len;
        }
        if (polyLen > 0.00001) {
          polyData.push({ poly, segLens, len: polyLen, polyIdx: p });
          totalLength += polyLen;
        }
      }

      if (totalLength === 0 || polyData.length === 0) {
        return {
          points: Array.from({ length: totalCount }, () => [0, 0, 0]),
          contourEdges: [],
          structureEdges: [],
        };
      }

      const points = [];
      const pointPolyMap = new Int16Array(totalCount);
      const step = totalLength / totalCount;
      let currentPolyIdx = 0;
      let currentSegIdx = 0;
      let distInSeg = 0;
      let distAlongTotal = 0;

      for (let i = 0; i < totalCount; i++) {
        const targetDist = (i + 0.5) * step;

        while (
          currentPolyIdx < polyData.length &&
          distAlongTotal + (polyData[currentPolyIdx].segLens[currentSegIdx] - distInSeg) < targetDist
        ) {
          const remainingInSeg = polyData[currentPolyIdx].segLens[currentSegIdx] - distInSeg;
          distAlongTotal += remainingInSeg;
          distInSeg = 0;
          currentSegIdx++;
          if (currentSegIdx >= polyData[currentPolyIdx].segLens.length) {
            currentSegIdx = 0;
            currentPolyIdx++;
            if (currentPolyIdx >= polyData.length) {
              currentPolyIdx = polyData.length - 1;
              currentSegIdx = polyData[currentPolyIdx].segLens.length - 1;
              break;
            }
          }
        }

        const neededInSeg = targetDist - distAlongTotal;
        const segLen = polyData[currentPolyIdx].segLens[currentSegIdx];
        const frac = segLen > 0 ? Math.min(1, Math.max(0, (distInSeg + neededInSeg) / segLen)) : 0;

        const p0 = polyData[currentPolyIdx].poly[currentSegIdx];
        const p1 = polyData[currentPolyIdx].poly[currentSegIdx + 1];

        const x = p0[0] + (p1[0] - p0[0]) * frac;
        const y = p0[1] + (p1[1] - p0[1]) * frac;
        const z = (p0[2] || 0) + ((p1[2] || 0) - (p0[2] || 0)) * frac;
        points.push([x, y, z]);
        pointPolyMap[i] = polyData[currentPolyIdx].polyIdx;
      }

      while (points.length < totalCount) {
        points.push([0, 0, 0]);
      }

      const contourEdges = [];
      const structureEdges = [];
      const contourSet = new Set(contourPolyIndices);
      const structureSet = new Set(structurePolyIndices);

      for (let i = 0; i < totalCount - 1; i++) {
        const pIdx = pointPolyMap[i];
        if (pIdx === pointPolyMap[i + 1]) {
          if (contourSet.has(pIdx)) {
            contourEdges.push({ a: i, b: i + 1, baseAlpha: 0.90 });
          } else if (structureSet.has(pIdx)) {
            structureEdges.push({ a: i, b: i + 1, baseAlpha: 0.75 });
          }
        }
      }

      return {
        points: points.slice(0, totalCount),
        contourEdges,
        structureEdges,
      };
    }

    function createCirclePolyline3D(cx, cy, r, z = 0, segments = 32) {
      const pts = [];
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        pts.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, z]);
      }
      return pts;
    }

    // ------------------------------------------------------------------------
    // Scene Generators (Exact count N in 3D: z in -0.5..0.5)
    // ------------------------------------------------------------------------
    function createScene0(count) {
      const pts = [];
      const cols = Math.round(Math.sqrt(count * 1.75));
      const rows = Math.ceil(count / cols);
      const dx = 1.9 / Math.max(1, cols - 1);
      const dy = 1.1 / Math.max(1, rows - 1);
      for (let r = 0; r < rows && pts.length < count; r++) {
        for (let c = 0; c < cols && pts.length < count; c++) {
          const x = -0.95 + c * dx;
          const y = -0.55 + r * dy;
          const z = Math.sin(x * 3.2 + y * 2.8) * 0.28;
          pts.push([x, y, z]);
        }
      }
      while (pts.length < count) pts.push([0, 0, 0]);
      return {
        points: pts.slice(0, count),
        contourEdges: [],
        structureEdges: [],
      };
    }

    // Helper to evaluate Catmull-Rom spline at parameter t in [0, 1]
    function catmullRomSpline(points, closed = false, samplesPerSeg = 8, zVal = 0) {
      const pts = [];
      const n = points.length;
      if (n < 2) return points.map((p) => [p[0], p[1], zVal]);

      const count = closed ? n : n - 1;
      for (let i = 0; i < count; i++) {
        const p0 = closed ? points[(i - 1 + n) % n] : points[Math.max(0, i - 1)];
        const p1 = points[i];
        const p2 = points[(i + 1) % n];
        const p3 = closed ? points[(i + 2) % n] : points[Math.min(n - 1, i + 2)];

        for (let s = 0; s < samplesPerSeg; s++) {
          const t = s / samplesPerSeg;
          const t2 = t * t;
          const t3 = t2 * t;

          const f1 = -0.5 * t3 + t2 - 0.5 * t;
          const f2 = 1.5 * t3 - 2.5 * t2 + 1.0;
          const f3 = -1.5 * t3 + 2.0 * t2 + 0.5 * t;
          const f4 = 0.5 * t3 - 0.5 * t2;

          const x = p0[0] * f1 + p1[0] * f2 + p2[0] * f3 + p3[0] * f4;
          const y = p0[1] * f1 + p1[1] * f2 + p2[1] * f3 + p3[1] * f4;
          pts.push([x, y, zVal]);
        }
      }
      if (!closed) {
        const last = points[n - 1];
        pts.push([last[0], last[1], zVal]);
      } else if (pts.length > 0) {
        pts.push([pts[0][0], pts[0][1], zVal]);
      }
      return pts;
    }

    function createScene1(count) {
      function withZ(poly, zVal) {
        return poly.map((pt) => [pt[0], pt[1], zVal]);
      }

      // Brain side-profile (facing LEFT toward the copy)
      // 1. Cerebrum contour: organic dome, frontal lobe on the left, temporal lobe bulge, occipital rear on the right
      const cerebrumCtrl = [
        [-0.88, -0.16], // Frontal pole (leftmost)
        [-0.84, -0.42], // Frontal dome slope
        [-0.56, -0.66], // Superior frontal
        [-0.14, -0.74], // Vertex (top dome peak)
        [0.34, -0.68],  // Parietal curve
        [0.72, -0.46],  // Superior occipital
        [0.86, -0.18],  // Occipital rear pole (rightmost)
        [0.76, 0.08],   // Lower occipital
        [0.44, 0.16],   // Underside arch above cerebellum
        [0.18, 0.18],   // Junction above brain stem
        [-0.04, 0.28],  // Temporal lower rear
        [-0.38, 0.34],  // Temporal lobe ventral bulge
        [-0.64, 0.24],  // Temporal pole (lower front)
        [-0.72, 0.06],  // Pre-frontal lower notch
      ];
      const cerebrumPoly = catmullRomSpline(cerebrumCtrl, true, 8, 0.02);

      // 2. Cerebellum contour: rounded bulge at lower rear (tucked under occipital)
      const cerebellumCtrl = [
        [0.30, 0.18],
        [0.48, 0.15],
        [0.70, 0.18],
        [0.78, 0.32],
        [0.68, 0.46],
        [0.48, 0.48],
        [0.32, 0.38],
        [0.26, 0.26],
      ];
      const cerebellumPoly = catmullRomSpline(cerebellumCtrl, true, 8, -0.06);

      // 3. Cerebellum inner folia / concentric groove arches (structure)
      const cerebGroove1 = catmullRomSpline([[0.34, 0.24], [0.52, 0.23], [0.68, 0.27]], false, 6, -0.04);
      const cerebGroove2 = catmullRomSpline([[0.34, 0.32], [0.52, 0.31], [0.68, 0.36]], false, 6, -0.04);
      const cerebGroove3 = catmullRomSpline([[0.38, 0.40], [0.50, 0.40], [0.62, 0.42]], false, 6, -0.04);

      // 4. Brain stem: tapered cylinder descending from underside
      const stemLeft = catmullRomSpline([[0.06, 0.18], [0.08, 0.36], [0.09, 0.56]], false, 6, -0.02);
      const stemRight = catmullRomSpline([[0.24, 0.18], [0.22, 0.36], [0.20, 0.56]], false, 6, -0.02);
      const stemBase = withZ([[0.09, 0.56], [0.20, 0.56]], -0.02);

      // 5. Sulci (cortical fold lines / gyri logic running across the brain):
      // Sylvian / lateral fissure (runs from front-lower back and up)
      const sulcusSylvian = catmullRomSpline([
        [-0.60, 0.06],
        [-0.42, 0.02],
        [-0.18, 0.00],
        [0.08, -0.04],
        [0.32, -0.10],
      ], false, 8, 0.08);

      // Central sulcus (from top dome downward-forward toward Sylvian fissure)
      const sulcusCentral = catmullRomSpline([
        [-0.10, -0.70],
        [-0.08, -0.50],
        [-0.05, -0.32],
        [-0.04, -0.14],
      ], false, 8, 0.08);

      // Precentral sulcus
      const sulcusPrecentral = catmullRomSpline([
        [-0.34, -0.62],
        [-0.32, -0.46],
        [-0.26, -0.28],
        [-0.22, -0.12],
      ], false, 8, 0.08);

      // Postcentral sulcus
      const sulcusPostcentral = catmullRomSpline([
        [0.14, -0.66],
        [0.16, -0.48],
        [0.18, -0.30],
        [0.16, -0.16],
      ], false, 8, 0.08);

      // Superior frontal sulcus (front dome)
      const sulcusFrontalSup = catmullRomSpline([
        [-0.72, -0.34],
        [-0.56, -0.42],
        [-0.38, -0.46],
      ], false, 6, 0.08);

      // Inferior frontal sulcus (anterior/orbital)
      const sulcusFrontalInf = catmullRomSpline([
        [-0.78, -0.12],
        [-0.62, -0.18],
        [-0.44, -0.20],
      ], false, 6, 0.08);

      // Parieto-occipital / calcarine fold
      const sulcusOccipital = catmullRomSpline([
        [0.44, -0.56],
        [0.54, -0.38],
        [0.68, -0.24],
      ], false, 6, 0.08);

      // Superior temporal sulcus (lower middle fold)
      const sulcusTemporal = catmullRomSpline([
        [-0.48, 0.16],
        [-0.24, 0.15],
        [0.02, 0.13],
        [0.22, 0.08],
      ], false, 6, 0.08);

      // 6. Tiny rectangular chip / circuit marks inside the brain (intelligent architecture)
      // Chip 1 (Frontal cortex processor, center ~[-0.48, -0.24], 0.14 x 0.12)
      const chip1Rect = withZ([
        [-0.54, -0.30],
        [-0.40, -0.30],
        [-0.40, -0.18],
        [-0.54, -0.18],
        [-0.54, -0.30],
      ], 0.15);
      const chip1Lead1 = withZ([[-0.54, -0.24], [-0.62, -0.24]], 0.15);
      const chip1Lead2 = withZ([[-0.40, -0.24], [-0.32, -0.24]], 0.15);
      const chip1Lead3 = withZ([[-0.47, -0.30], [-0.47, -0.38]], 0.15);

      // Chip 2 (Core neural processor, center ~[0.02, -0.28], 0.14 x 0.12)
      const chip2Rect = withZ([
        [-0.04, -0.34],
        [0.10, -0.34],
        [0.10, -0.22],
        [-0.04, -0.22],
        [-0.04, -0.34],
      ], 0.15);
      const chip2Lead1 = withZ([[0.03, -0.34], [0.03, -0.42]], 0.15);
      const chip2Lead2 = withZ([[0.10, -0.28], [0.18, -0.28]], 0.15);

      // Chip 3 (Parieto-occipital memory bank, center ~[0.42, -0.26], 0.12 x 0.10)
      const chip3Rect = withZ([
        [0.36, -0.31],
        [0.48, -0.31],
        [0.48, -0.21],
        [0.36, -0.21],
        [0.36, -0.31],
      ], 0.15);
      const chip3Lead1 = withZ([[0.42, -0.21], [0.42, -0.12]], 0.15);

      // 7. Synaptic links connecting circuit chips across folds
      const synapse1 = withZ([[-0.32, -0.24], [-0.18, -0.25], [-0.04, -0.26]], 0.12);
      const synapse2 = withZ([[0.10, -0.28], [0.22, -0.28], [0.36, -0.27]], 0.12);
      const synapse3 = withZ([[-0.47, -0.18], [-0.46, -0.04], [-0.36, 0.08]], 0.12);

      const polylines = [
        cerebrumPoly,       // 0: CONTOUR (outer cortex silhouette)
        cerebellumPoly,     // 1: CONTOUR (cerebellum rear bulge)
        stemLeft,           // 2: CONTOUR (brain stem left edge)
        stemRight,          // 3: CONTOUR (brain stem right edge)
        stemBase,           // 4: STRUCTURE (brain stem bottom)
        cerebGroove1,       // 5: STRUCTURE (cerebellum folia)
        cerebGroove2,       // 6: STRUCTURE
        cerebGroove3,       // 7: STRUCTURE
        sulcusSylvian,      // 8: STRUCTURE (gyri fold)
        sulcusCentral,      // 9: STRUCTURE
        sulcusPrecentral,   // 10: STRUCTURE
        sulcusPostcentral,  // 11: STRUCTURE
        sulcusFrontalSup,   // 12: STRUCTURE
        sulcusFrontalInf,   // 13: STRUCTURE
        sulcusOccipital,    // 14: STRUCTURE
        sulcusTemporal,     // 15: STRUCTURE
        chip1Rect,          // 16: CONTOUR (chip 1)
        chip1Lead1,         // 17: STRUCTURE
        chip1Lead2,         // 18: STRUCTURE
        chip1Lead3,         // 19: STRUCTURE
        chip2Rect,          // 20: CONTOUR (chip 2)
        chip2Lead1,         // 21: STRUCTURE
        chip2Lead2,         // 22: STRUCTURE
        chip3Rect,          // 23: CONTOUR (chip 3)
        chip3Lead1,         // 24: STRUCTURE
        synapse1,           // 25: STRUCTURE (synaptic cross-fold link)
        synapse2,           // 26: STRUCTURE (synaptic cross-fold link)
        synapse3,           // 27: STRUCTURE (synaptic cross-fold link)
      ];

      const contourIndices = [0, 1, 2, 3, 16, 20, 23];
      const structureIndices = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 21, 22, 24, 25, 26, 27];

      return distributePointsAlongPathsWithZ(polylines, count, contourIndices, structureIndices);
    }

    function createScene2(count) {
      function withZ(poly, zVal) {
        return poly.map((pt) => [pt[0], pt[1], zVal]);
      }
      const polylines = [
        // Polyline 0 (Layer 1, z = -0.3): Outer browser frame (CONTOUR)
        withZ([[-0.92, -0.68], [0.92, -0.68], [0.92, 0.68], [-0.92, 0.68], [-0.92, -0.68]], -0.3),
        // Polyline 1 (Layer 2, z = -0.1): Header line (STRUCTURE)
        withZ([[-0.92, -0.46], [0.92, -0.46]], -0.1),
        // Polyline 2: Sidebar line (STRUCTURE)
        withZ([[-0.46, -0.46], [-0.46, 0.68]], -0.1),
        // Polyline 3 (Layer 3, z = 0.1): Hero content block (CONTOUR)
        withZ([[-0.36, -0.34], [0.82, -0.34], [0.82, -0.06], [-0.36, -0.06], [-0.36, -0.34]], 0.1),
        // Polyline 4 & 5: Lower content blocks (STRUCTURE)
        withZ([[-0.36, 0.08], [0.18, 0.08], [0.18, 0.54], [-0.36, 0.54], [-0.36, 0.08]], 0.1),
        withZ([[0.28, 0.08], [0.82, 0.08], [0.82, 0.54], [0.28, 0.54], [0.28, 0.08]], 0.1),
        // Polylines 6-13 (Layer 4, z = 0.3): UI details (STRUCTURE)
        createCirclePolyline3D(-0.80, -0.57, 0.026, 0.3, 12),
        createCirclePolyline3D(-0.72, -0.57, 0.026, 0.3, 12),
        createCirclePolyline3D(-0.64, -0.57, 0.026, 0.3, 12),
        withZ([[-0.45, -0.57], [0.45, -0.57]], 0.3),
        withZ([[-0.78, -0.30], [-0.56, -0.30]], 0.3),
        withZ([[-0.78, -0.14], [-0.56, -0.14]], 0.3),
        withZ([[-0.78, 0.02], [-0.56, 0.02]], 0.3),
        withZ([[-0.78, 0.18], [-0.56, 0.18]], 0.3),
      ];
      return distributePointsAlongPathsWithZ(polylines, count, [0, 3], [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
    }

    function createScene3(count) {
      const tiltAngle = -14 * (Math.PI / 180);
      function phoneZ(y, offset = 0) {
        const z = y * Math.sin(tiltAngle) * 0.45 + offset;
        return clamp(z, -0.5, 0.5);
      }
      function mapPoly(pts2d, offset = 0) {
        return pts2d.map(([x, y]) => [x, y, phoneZ(y, offset)]);
      }
      const polylines = [
        // Polyline 0: Phone frame (CONTOUR)
        mapPoly([[-0.48, -0.86], [0.48, -0.86], [0.48, 0.86], [-0.48, 0.86], [-0.48, -0.86]], 0),
        // Polyline 1: Notch / speaker (STRUCTURE)
        mapPoly([[-0.15, -0.78], [0.15, -0.78]], 0.05),
        // Polyline 2: App header block (STRUCTURE)
        mapPoly([[-0.36, -0.68], [0.36, -0.68], [0.36, -0.52], [-0.36, -0.52], [-0.36, -0.68]], 0.14),
        // Polyline 3: Metric card line (STRUCTURE)
        mapPoly([[-0.36, -0.42], [0.36, -0.42]], 0.12),
        // Polyline 4: Chart baseline (STRUCTURE)
        mapPoly([[-0.36, 0.38], [0.36, 0.38]], 0.12),
        // Polyline 5, 6, 7: 3 bar chart pillars (STRUCTURE)
        mapPoly([[-0.28, 0.38], [-0.28, 0.14], [-0.16, 0.14], [-0.16, 0.38]], 0.18),
        mapPoly([[-0.06, 0.38], [-0.06, -0.06], [0.06, -0.06], [0.06, 0.38]], 0.18),
        mapPoly([[0.16, 0.38], [0.16, -0.24], [0.28, -0.24], [0.28, 0.38]], 0.18),
        // Polyline 8: Rising trend line (CONTOUR)
        mapPoly([[-0.34, 0.22], [-0.22, 0.10], [0.0, -0.12], [0.22, -0.32], [0.36, -0.40]], 0.22),
        // Polyline 9: Bottom nav line (STRUCTURE)
        mapPoly([[-0.36, 0.62], [0.36, 0.62]], 0.12),
        // Polyline 10 & 11: Home indicator pill & dot (STRUCTURE)
        mapPoly([[-0.14, 0.76], [0.14, 0.76]], 0.14),
        createCirclePolyline3D(0, 0.76, 0.02, phoneZ(0.76, 0.14), 8),
      ];
      return distributePointsAlongPathsWithZ(polylines, count, [0, 8], [1, 2, 3, 4, 5, 6, 7, 9, 10, 11]);
    }

    function createScene4(count) {
      function tilt1(x, y) {
        return clamp((x * 0.28 - y * 0.22) * 0.45, -0.5, 0.5);
      }
      function tilt2(x, y) {
        return clamp((-x * 0.32 + y * 0.25) * 0.45, -0.5, 0.5);
      }
      function mapT1(pts) { return pts.map(([x, y]) => [x, y, tilt1(x, y)]); }
      function mapT2(pts) { return pts.map(([x, y]) => [x, y, tilt2(x, y)]); }

      const polylines = [
        // Polyline 0: Outer ring (CONTOUR)
        mapT1(createCirclePolyline3D(0, 0, 0.80, 0, 48)),
        // Polyline 1: Inner ring (STRUCTURE)
        mapT2(createCirclePolyline3D(0, 0, 0.36, 0, 36)),
        // Polyline 2: Center hub (STRUCTURE)
        mapT2(createCirclePolyline3D(0, 0, 0.11, 0, 16)),
        // Polyline 3-6: 4 spokes (STRUCTURE)
        [[0, 0.11, tilt2(0, 0.11)], [0, 0.80, tilt1(0, 0.80)]],
        [[0, -0.11, tilt2(0, -0.11)], [0, -0.80, tilt1(0, -0.80)]],
        [[0.11, 0, tilt2(0.11, 0)], [0.80, 0, tilt1(0.80, 0)]],
        [[-0.11, 0, tilt2(-0.11, 0)], [-0.80, 0, tilt1(-0.80, 0)]],
        // Polyline 7-10: 4 small hub circles at N, E, S, W (CONTOUR)
        mapT1(createCirclePolyline3D(0, 0.80, 0.075, 0, 16)),
        mapT1(createCirclePolyline3D(0.80, 0, 0.075, 0, 16)),
        mapT1(createCirclePolyline3D(0, -0.80, 0.075, 0, 16)),
        mapT1(createCirclePolyline3D(-0.80, 0, 0.075, 0, 16)),
        // Polyline 11-14: Diagonal bridge connections (STRUCTURE)
        [[0.24, 0.24, tilt2(0.24, 0.24)], [0.57, 0.57, tilt1(0.57, 0.57)]],
        [[-0.24, 0.24, tilt2(-0.24, 0.24)], [-0.57, 0.57, tilt1(-0.57, 0.57)]],
        [[-0.24, -0.24, tilt2(-0.24, -0.24)], [-0.57, -0.57, tilt1(-0.57, -0.57)]],
        [[0.24, -0.24, tilt2(0.24, -0.24)], [0.57, -0.57, tilt1(0.57, -0.57)]],
      ];
      return distributePointsAlongPathsWithZ(polylines, count, [0, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 11, 12, 13, 14]);
    }

    // Precompute hairline edge connections
    function buildHairlineEdges(scenePts, maxDist, contourEdges = [], structureEdges = []) {
      if (maxDist <= 0.001) return [];
      const existing = new Set();
      contourEdges.forEach((e) => existing.add(`${Math.min(e.a, e.b)}_${Math.max(e.a, e.b)}`));
      structureEdges.forEach((e) => existing.add(`${Math.min(e.a, e.b)}_${Math.max(e.a, e.b)}`));

      const edges = [];
      const maxDist2 = maxDist * maxDist;
      const count = scenePts.length;
      for (let a = 0; a < count; a++) {
        const pa = scenePts[a];
        for (let b = a + 1; b < count; b++) {
          if (existing.has(`${a}_${b}`)) continue;
          const pb = scenePts[b];
          const dx = pb[0] - pa[0];
          if (Math.abs(dx) > maxDist) continue;
          const dy = pb[1] - pa[1];
          if (Math.abs(dy) > maxDist) continue;
          const dz = pb[2] - pa[2];
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 <= maxDist2) {
            const d = Math.sqrt(d2);
            const baseAlpha = clamp(0.18 + (1 - d / maxDist) * 0.34, 0.18, 0.52);
            edges.push({ a, b, baseAlpha });
          }
        }
      }
      return edges;
    }

    // Dot container and pre-computed kinematics
    const dots = [];
    const dotStaggers = new Float32Array(MAX_POINTS);
    const dotArcSigns = new Float32Array(MAX_POINTS);
    const depthOrder = new Uint16Array(MAX_POINTS);

    for (let i = 0; i < MAX_POINTS; i++) {
      // Deterministic noise for stagger & arc
      const hash = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
      const normHash = hash - Math.floor(hash);
      dotStaggers[i] = normHash * CONFIG.staggerSpread;
      dotArcSigns[i] = (i % 2 === 0 ? 1 : -1) * (normHash > 0.5 ? 1 : -1);

      // Color scheme: every ~8th is black (#000), ~4% light tint #8FA9FF, rest #2E5FFF
      // Normal dot radius at depth 0: 3.0px, accent: 4.2px, spark: 2.4px
      let col = '#2E5FFF';
      let r = 3.0;
      if (i % 8 === 0) {
        col = '#000000';
        r = 4.2;
      } else if (i % 25 === 1) {
        col = '#8FA9FF';
        r = 2.4;
      }

      dots.push({
        x: 0,
        y: 0,
        z: 0,
        xRot: 0,
        yRot: 0,
        zRot: 0,
        screenX: 0,
        screenY: 0,
        scale: 1,
        depthAlpha: 1,
        scaledRadius: r,
        baseRadius: r,
        color: col,
        pulse: 0,
      });
      depthOrder[i] = i;
    }

    // Precomputed Scenes & Classified Edge Sets
    let scenes = [];
    let sceneEdges = [];

    function rebuildScenes(count) {
      activePointCount = count;
      const rawScenes = [
        createScene0(count),
        createScene1(count),
        createScene2(count),
        createScene3(count),
        createScene4(count),
      ];
      scenes = rawScenes.map((s) => s.points);
      sceneEdges = rawScenes.map((s, idx) => {
        const hairline = buildHairlineEdges(s.points, CONFIG.linkDistances[idx], s.contourEdges, s.structureEdges);
        return {
          hairline,
          structure: s.structureEdges,
          contour: s.contourEdges,
        };
      });
    }

    rebuildScenes(activePointCount);

    // Pre-allocated edge buckets for batched hairline strokes (Upgrade 5)
    const bucket0 = [];
    const bucket1 = [];
    const bucket2 = [];
    const bucket3 = [];

    // Pre-rendered offscreen sprite for comet pulse glow (Upgrade 6)
    function createPulseSprite() {
      const sprite = document.createElement('canvas');
      sprite.width = 24;
      sprite.height = 24;
      const sctx = sprite.getContext('2d');
      if (!sctx) return null;
      sctx.strokeStyle = '#1B3CC4';
      sctx.lineWidth = 1.2;
      sctx.beginPath();
      sctx.arc(12, 12, 5.5, 0, Math.PI * 2);
      sctx.stroke();
      sctx.fillStyle = '#8FA9FF';
      sctx.beginPath();
      sctx.arc(12, 12, 3.2, 0, Math.PI * 2);
      sctx.fill();
      return sprite;
    }

    const pulseSprite = createPulseSprite();

    // Comet pulse packets pool (Upgrade 6)
    const MAX_PACKETS = CONFIG.pulseCount.desktop;
    const pulsePackets = [];
    for (let i = 0; i < MAX_PACKETS; i++) {
      pulsePackets.push({
        active: false,
        edgeA: 0,
        edgeB: 0,
        progress: 0,
        speed: 0.02,
        trail: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
      });
    }
    const activePacketHeads = [];

    // Cached offscreen ring sprites for expanding ring pulses (Upgrade C)
    const ringSprites = [];
    const NUM_RING_SPRITES = 6;
    function initRingSprites(S) {
      ringSprites.length = 0;
      const maxRPx = Math.max(12, 0.12 * S);
      for (let k = 0; k < NUM_RING_SPRITES; k++) {
        const prog = (k + 1) / NUM_RING_SPRITES;
        const r = Math.max(2, maxRPx * prog);
        const spriteSize = Math.ceil((r + 6) * 2);
        const sprite = document.createElement('canvas');
        sprite.width = spriteSize;
        sprite.height = spriteSize;
        const sctx = sprite.getContext('2d');
        if (!sctx) continue;
        const alpha = (1 - prog) * 0.75;
        sctx.strokeStyle = `rgba(46, 95, 255, ${alpha.toFixed(3)})`;
        sctx.lineWidth = 1.4;
        sctx.beginPath();
        sctx.arc(spriteSize / 2, spriteSize / 2, r, 0, Math.PI * 2);
        sctx.stroke();
        ringSprites.push({ canvas: sprite, size: spriteSize });
      }
    }

    // Static 256x256 film grain generation once (2.5% opacity, Upgrade E)
    function initGrainOverlay() {
      const grainEl = document.getElementById('services-grain-overlay');
      if (!grainEl) return;
      const grainCanvas = document.createElement('canvas');
      grainCanvas.width = 256;
      grainCanvas.height = 256;
      const gctx = grainCanvas.getContext('2d');
      if (!gctx) return;
      const imgData = gctx.createImageData(256, 256);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const val = (Math.random() * 255) | 0;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 255;
      }
      gctx.putImageData(imgData, 0, 0);
      try {
        const dataUrl = grainCanvas.toDataURL('image/png');
        grainEl.style.backgroundImage = `url(${dataUrl})`;
        grainEl.style.opacity = `${CONFIG.grainOpacity}`;
      } catch (e) {}
    }

    initGrainOverlay();

    // ------------------------------------------------------------------------
    // Offscreen Fill Canvases: Pre-rendered ONCE at init & resize (DPR-aware)
    // Techniques: Halftone, Glass Pane, Hatch. Max coverage <= 25%.
    // ------------------------------------------------------------------------
    const fillCanvases = [
      document.createElement('canvas'),
      document.createElement('canvas'),
      document.createElement('canvas'),
      document.createElement('canvas'),
      document.createElement('canvas'),
    ];

    function drawHalftoneGrid(fctx, bounds, densityFn, pitch) {
      const minX = bounds.x;
      const minY = bounds.y;
      const maxX = bounds.x + bounds.w;
      const maxY = bounds.y + bounds.h;
      const maxR = CONFIG.halftoneMaxRadius;
      let row = 0;
      for (let py = minY; py <= maxY; py += pitch * 0.866) {
        const offsetX = (row % 2 === 1) ? pitch * 0.5 : 0;
        for (let px = minX + offsetX; px <= maxX; px += pitch) {
          const d = densityFn(px, py);
          if (d <= 0.03) continue;
          const r = Math.max(0.3, maxR * d);
          const alpha = 0.50 + 0.40 * d;
          fctx.fillStyle = `rgba(46, 95, 255, ${alpha.toFixed(3)})`;
          fctx.beginPath();
          fctx.arc(px, py, r, 0, Math.PI * 2);
          fctx.fill();
        }
        row++;
      }
    }

    function drawGlassPane(fctx, x, y, w, h, r, topAlpha, botAlpha, contourWeight, contourColor) {
      fctx.save();
      fctx.beginPath();
      fctx.roundRect(x, y, w, h, r);

      const grad = fctx.createLinearGradient(x, y, x, y + h);
      grad.addColorStop(0, `rgba(255, 250, 244, ${topAlpha})`);
      grad.addColorStop(1, `rgba(255, 250, 244, ${botAlpha})`);
      fctx.fillStyle = grad;
      fctx.fill();

      fctx.strokeStyle = contourColor || 'rgba(46, 95, 255, 0.35)';
      fctx.lineWidth = contourWeight || 1.0;
      fctx.stroke();

      // 1px inner top highlight line (#fffaf4 alpha 0.9)
      fctx.beginPath();
      fctx.roundRect(x + 1, y + 1, w - 2, Math.min(h - 2, 8), [r, r, 0, 0]);
      fctx.clip();
      fctx.strokeStyle = 'rgba(255, 250, 244, 0.9)';
      fctx.lineWidth = 1;
      fctx.beginPath();
      fctx.moveTo(x + r, y + 1);
      fctx.lineTo(x + w - r, y + 1);
      fctx.stroke();

      fctx.restore();
    }

    function drawHatchInPath(fctx, pathFn, bounds, spacing, alpha) {
      fctx.save();
      fctx.beginPath();
      pathFn(fctx);
      fctx.clip();

      fctx.strokeStyle = `rgba(46, 95, 255, ${alpha || CONFIG.hatchAlpha})`;
      fctx.lineWidth = 1.0;
      fctx.beginPath();

      const minX = bounds.x;
      const minY = bounds.y;
      const maxX = bounds.x + bounds.w;
      const maxY = bounds.y + bounds.h;
      const total = (maxX - minX) + (maxY - minY);

      for (let d = -total; d <= total; d += (spacing || CONFIG.hatchSpacing)) {
        fctx.moveTo(minX + d, minY);
        fctx.lineTo(minX + d + (maxY - minY), maxY);
      }
      fctx.stroke();
      fctx.restore();
    }

    function buildFillCanvases(baseCx, baseCy, S, isMobile) {
      const pitch = isMobile ? CONFIG.halftonePitch.mobile : CONFIG.halftonePitch.desktop;

      for (let s = 0; s < 5; s++) {
        const fc = fillCanvases[s];
        fc.width = Math.round(width * dpr);
        fc.height = Math.round(height * dpr);
        const fctx = fc.getContext('2d');
        if (!fctx) continue;
        fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        fctx.clearRect(0, 0, width, height);

        if (s === 0) {
          // Scene 0: Intro (data)
          // Diagonal halftone ramp behind lattice (dense bottom-right, fading to nothing toward center-left, ~35% coverage)
          const lx = baseCx - 0.95 * S;
          const rx = baseCx + 0.95 * S;
          const ty = baseCy - 0.55 * S;
          const by = baseCy + 0.55 * S;
          const lw = rx - lx;
          const lh = by - ty;

          drawHalftoneGrid(fctx, { x: lx, y: ty, w: lw, h: lh }, (px, py) => {
            const u = ((px - lx) / lw + (py - ty) / lh) * 0.5;
            if (u < 0.62) return 0;
            return clamp((u - 0.62) / 0.38, 0, 1);
          }, pitch);

          // 3 rounded-square data-cell outlines (1.6px #2E5FFF) at lattice positions
          const cells = [
            { x: baseCx - 0.42 * S, y: baseCy - 0.22 * S, size: 0.14 * S },
            { x: baseCx + 0.12 * S, y: baseCy - 0.24 * S, size: 0.14 * S },
            { x: baseCx + 0.46 * S, y: baseCy + 0.12 * S, size: 0.16 * S },
          ];

          cells.forEach((cell, ci) => {
            fctx.strokeStyle = 'rgba(46, 95, 255, 0.75)';
            fctx.lineWidth = 1.6;
            fctx.beginPath();
            fctx.roundRect(cell.x, cell.y, cell.size, cell.size, 6);
            fctx.stroke();

            // Tiny bar-sparkline of 4 dots in cell 3
            if (ci === 2) {
              const sparkVals = [0.25, 0.65, 0.42, 0.88];
              const step = (cell.size - 16) / 3;
              for (let k = 0; k < 4; k++) {
                const sx = cell.x + 8 + k * step;
                const sy = cell.y + cell.size - 8 - sparkVals[k] * (cell.size - 18);
                fctx.strokeStyle = 'rgba(46, 95, 255, 0.40)';
                fctx.lineWidth = 1.0;
                fctx.beginPath();
                fctx.moveTo(sx, cell.y + cell.size - 6);
                fctx.lineTo(sx, sy);
                fctx.stroke();

                fctx.fillStyle = k === 3 ? '#000000' : '#2E5FFF';
                fctx.beginPath();
                fctx.arc(sx, sy, 2.4, 0, Math.PI * 2);
                fctx.fill();
              }
            }
          });
        } else if (s === 1) {
          // Scene 1: AI (side-profile brain)
          // Hero halftone density fill on the front cortex (frontal lobe), clipped to the brain profile
          // Centered at frontal lobe region (-0.54 * S, -0.26 * S relative to baseCx, baseCy)
          const heroCx = baseCx - 0.54 * S;
          const heroCy = baseCy - 0.26 * S;
          const R = 0.38 * S;

          // Clip fill to front cortex region of the cerebrum profile so it never bleeds outside the dots
          const cerebrumCtrl2D = [
            [-0.88, -0.16],
            [-0.84, -0.42],
            [-0.56, -0.66],
            [-0.14, -0.74],
            [0.34, -0.68],
            [0.72, -0.46],
            [0.86, -0.18],
            [0.76, 0.08],
            [0.44, 0.16],
            [0.18, 0.18],
            [-0.04, 0.28],
            [-0.38, 0.34],
            [-0.64, 0.24],
            [-0.72, 0.06],
          ];

          fctx.save();
          fctx.beginPath();
          const nCtrl = cerebrumCtrl2D.length;
          for (let i = 0; i < nCtrl; i++) {
            const p0 = cerebrumCtrl2D[(i - 1 + nCtrl) % nCtrl];
            const p1 = cerebrumCtrl2D[i];
            const p2 = cerebrumCtrl2D[(i + 1) % nCtrl];
            const p3 = cerebrumCtrl2D[(i + 2) % nCtrl];

            for (let st = 0; st < 6; st++) {
              const t = st / 6;
              const t2 = t * t;
              const t3 = t2 * t;
              const f1 = -0.5 * t3 + t2 - 0.5 * t;
              const f2 = 1.5 * t3 - 2.5 * t2 + 1.0;
              const f3 = -1.5 * t3 + 2.0 * t2 + 0.5 * t;
              const f4 = 0.5 * t3 - 0.5 * t2;
              const sx = baseCx + (p0[0] * f1 + p1[0] * f2 + p2[0] * f3 + p3[0] * f4) * S;
              const sy = baseCy + (p0[1] * f1 + p1[1] * f2 + p2[1] * f3 + p3[1] * f4) * S;
              if (i === 0 && st === 0) fctx.moveTo(sx, sy);
              else fctx.lineTo(sx, sy);
            }
          }
          fctx.closePath();
          fctx.clip();

          // Render halftone grid across frontal cortex hero area
          drawHalftoneGrid(fctx, { x: heroCx - R, y: heroCy - R, w: R * 2, h: R * 2 }, (px, py) => {
            const dist = Math.hypot(px - heroCx, py - heroCy);
            if (dist > R) return 0;
            return clamp(1 - (dist / R) * 1.1, 0, 1);
          }, pitch);

          fctx.restore();
        } else if (s === 2) {
          // Scene 2: Technology (browser)
          // Body = glass pane
          drawGlassPane(fctx, baseCx - 0.92 * S, baseCy - 0.68 * S, 1.84 * S, 1.36 * S, 10, CONFIG.glassTopAlpha, 0.08, 1.0, 'rgba(46, 95, 255, 0.35)');

          // Header bar = thin halftone strip (dense left, fading right) with 3 window-control dots
          const hbx = baseCx - 0.92 * S;
          const hby = baseCy - 0.68 * S;
          const hbw = 1.84 * S;
          const hbh = 0.22 * S;
          fctx.save();
          fctx.beginPath();
          fctx.roundRect(hbx, hby, hbw, hbh, [10, 10, 0, 0]);
          fctx.clip();
          drawHalftoneGrid(fctx, { x: hbx, y: hby, w: hbw, h: hbh }, (px) => {
            const u = (px - hbx) / (hbw * 0.75);
            return clamp(1 - u, 0, 1) * 0.65;
          }, pitch);
          fctx.restore();

          const winDots = [baseCx - 0.80 * S, baseCx - 0.72 * S, baseCx - 0.64 * S];
          const winY = baseCy - 0.57 * S;
          for (let k = 0; k < 3; k++) {
            fctx.fillStyle = k === 2 ? '#000000' : '#2E5FFF';
            fctx.beginPath();
            fctx.arc(winDots[k], winY, 3.0, 0, Math.PI * 2);
            fctx.fill();
          }

          // Hero block = rounded-rect contour (1.6px #1B3CC4) with diagonal halftone fill (HERO AREA)
          const hx = baseCx - 0.36 * S;
          const hy = baseCy - 0.34 * S;
          const hw = 1.18 * S;
          const hh = 0.28 * S;
          fctx.strokeStyle = CONFIG.contourColor;
          fctx.lineWidth = 1.6;
          fctx.beginPath();
          fctx.roundRect(hx, hy, hw, hh, 8);
          fctx.stroke();

          fctx.save();
          fctx.beginPath();
          fctx.roundRect(hx, hy, hw, hh, 8);
          fctx.clip();
          drawHalftoneGrid(fctx, { x: hx, y: hy, w: hw, h: hh }, (px, py) => {
            const u = ((px - hx) / hw + (py - hy) / hh) * 0.5;
            return clamp(1 - u * 1.1, 0, 1);
          }, pitch);
          fctx.restore();

          // Two content blocks: secondary block = 45° hatch fill with 1px #2E5FFF alpha 0.5 rounded outline
          const secondaryBlock = { x: baseCx - 0.36 * S, y: baseCy + 0.08 * S, w: 0.54 * S, h: 0.46 * S };
          drawHatchInPath(fctx, (ctx) => { ctx.roundRect(secondaryBlock.x, secondaryBlock.y, secondaryBlock.w, secondaryBlock.h, 8); }, secondaryBlock, CONFIG.hatchSpacing, CONFIG.hatchAlpha);
          fctx.strokeStyle = 'rgba(46, 95, 255, 0.50)';
          fctx.lineWidth = 1.0;
          fctx.beginPath();
          fctx.roundRect(secondaryBlock.x, secondaryBlock.y, secondaryBlock.w, secondaryBlock.h, 8);
          fctx.stroke();

          // Lower right block stays open with subtle 1px stroke (keeps coverage < 25%)
          const openBlock = { x: baseCx + 0.28 * S, y: baseCy + 0.08 * S, w: 0.54 * S, h: 0.46 * S };
          fctx.strokeStyle = 'rgba(46, 95, 255, 0.25)';
          fctx.lineWidth = 1.0;
          fctx.beginPath();
          fctx.roundRect(openBlock.x, openBlock.y, openBlock.w, openBlock.h, 8);
          fctx.stroke();

          // Sidebar items = 3 dotted pills (single row of 8–10 dots per pill, last dot #000)
          const pillYs = [baseCy - 0.22 * S, baseCy - 0.04 * S, baseCy + 0.14 * S];
          const pillX0 = baseCx - 0.78 * S;
          const pillX1 = baseCx - 0.56 * S;
          const dotCount = 9;
          const pStep = (pillX1 - pillX0) / (dotCount - 1);
          pillYs.forEach((py) => {
            for (let k = 0; k < dotCount; k++) {
              const px = pillX0 + k * pStep;
              fctx.fillStyle = k === dotCount - 1 ? '#000000' : '#2E5FFF';
              fctx.beginPath();
              fctx.arc(px, py, k === dotCount - 1 ? 2.5 : 1.8, 0, Math.PI * 2);
              fctx.fill();
            }
          });
        } else if (s === 3) {
          // Scene 3: Applications (phone)
          // Phone body = glass pane with 2px #2E5FFF contour
          drawGlassPane(fctx, baseCx - 0.48 * S, baseCy - 0.86 * S, 0.96 * S, 1.72 * S, 28, 0.55, 0.08, 2.0, 'rgba(46, 95, 255, 0.85)');

          // Header card: sparse halftone card (top 15% of screen)
          const hcx = baseCx - 0.36 * S;
          const hcy = baseCy - 0.72 * S;
          const hcw = 0.72 * S;
          const hch = 0.22 * S;
          fctx.save();
          fctx.beginPath();
          fctx.roundRect(hcx, hcy, hcw, hch, 8);
          fctx.clip();
          drawHalftoneGrid(fctx, { x: hcx, y: hcy, w: hcw, h: hch }, () => 0.32, pitch);
          fctx.restore();
          fctx.strokeStyle = 'rgba(46, 95, 255, 0.35)';
          fctx.lineWidth = 1.0;
          fctx.beginPath();
          fctx.roundRect(hcx, hcy, hcw, hch, 8);
          fctx.stroke();

          // 3 vertical bars with vertical halftone gradients (dense at bottom, fading up to single dots)
          const yBase = baseCy + 0.38 * S;
          const bars = [
            { x: baseCx - 0.28 * S, y: baseCy + 0.14 * S, w: 0.12 * S, h: 0.24 * S, maxD: 0.65 },
            { x: baseCx - 0.06 * S, y: baseCy - 0.06 * S, w: 0.12 * S, h: 0.44 * S, maxD: 0.80 },
            { x: baseCx + 0.16 * S, y: baseCy - 0.24 * S, w: 0.12 * S, h: 0.62 * S, maxD: 1.00 }, // HERO AREA
          ];

          bars.forEach((bar, bIdx) => {
            fctx.save();
            fctx.beginPath();
            fctx.roundRect(bar.x, bar.y, bar.w, bar.h, 6);
            fctx.clip();
            drawHalftoneGrid(fctx, bar, (px, py) => {
              const v = clamp((yBase - py) / bar.h, 0, 1);
              return v * bar.maxD;
            }, pitch);
            fctx.restore();
            fctx.strokeStyle = bIdx === 2 ? 'rgba(46, 95, 255, 0.85)' : 'rgba(46, 95, 255, 0.50)';
            fctx.lineWidth = bIdx === 2 ? 1.4 : 1.0;
            fctx.beginPath();
            fctx.roundRect(bar.x, bar.y, bar.w, bar.h, 6);
            fctx.stroke();
          });

          // Thin 1px trend line through bar tops
          fctx.strokeStyle = 'rgba(46, 95, 255, 0.55)';
          fctx.lineWidth = 1.0;
          fctx.beginPath();
          fctx.moveTo(baseCx - 0.34 * S, baseCy + 0.24 * S);
          fctx.lineTo(baseCx - 0.22 * S, baseCy + 0.14 * S);
          fctx.lineTo(baseCx, baseCy - 0.06 * S);
          fctx.lineTo(baseCx + 0.22 * S, baseCy - 0.24 * S);
          fctx.lineTo(baseCx + 0.36 * S, baseCy - 0.38 * S);
          fctx.stroke();

          // End node
          fctx.fillStyle = '#2E5FFF';
          fctx.beginPath();
          fctx.arc(baseCx + 0.36 * S, baseCy - 0.38 * S, 2.5, 0, Math.PI * 2);
          fctx.fill();
        } else if (s === 4) {
          // Scene 4: Automation (orbital)
          // Outer orbital: stippled band between two concentric radii (r=0.48 to 0.54), dots sampled on concentric rings, fading at the poles
          const rMin = 0.48 * S;
          const rMax = 0.54 * S;
          const numRings = 4;
          const radStep = (rMax - rMin) / Math.max(1, numRings - 1);
          for (let ri = 0; ri < numRings; ri++) {
            const r = rMin + ri * radStep;
            const circum = 2 * Math.PI * r;
            const numDots = Math.floor(circum / pitch);
            for (let ai = 0; ai < numDots; ai++) {
              const angle = (ai / numDots) * Math.PI * 2 + (ri % 2 === 1 ? Math.PI / numDots : 0);
              const poleFade = clamp(Math.abs(Math.cos(angle)), 0.05, 1.0);
              const px = baseCx + Math.cos(angle) * r;
              const py = baseCy + Math.sin(angle) * r;
              const dotR = Math.max(0.3, CONFIG.halftoneMaxRadius * 0.85 * poleFade);
              const dotA = (0.50 + 0.40 * poleFade) * poleFade;
              fctx.fillStyle = `rgba(46, 95, 255, ${dotA.toFixed(3)})`;
              fctx.beginPath();
              fctx.arc(px, py, dotR, 0, Math.PI * 2);
              fctx.fill();
            }
          }

          // Inner core: small dense radial halftone disc (r=0.08) at center (HERO AREA)
          const Rcore = 0.08 * S;
          drawHalftoneGrid(fctx, { x: baseCx - Rcore, y: baseCy - Rcore, w: Rcore * 2, h: Rcore * 2 }, (px, py) => {
            const dist = Math.hypot(px - baseCx, py - baseCy);
            if (dist > Rcore) return 0;
            return clamp(1 - dist / Rcore, 0, 1);
          }, pitch);

          // 3 larger orbital nodes: small glass circles (r=0.035) with 1px #2E5FFF ring and 1 white spark dot inside
          const nodeRadius = 0.035 * S;
          const orbitR = 0.51 * S;
          const nodeAngles = [ -Math.PI / 6, Math.PI / 2, 7 * Math.PI / 6 ];
          nodeAngles.forEach((ang) => {
            const nx = baseCx + Math.cos(ang) * orbitR;
            const ny = baseCy + Math.sin(ang) * orbitR;

            fctx.save();
            fctx.beginPath();
            fctx.arc(nx, ny, nodeRadius, 0, Math.PI * 2);
            const grad = fctx.createLinearGradient(nx, ny - nodeRadius, nx, ny + nodeRadius);
            grad.addColorStop(0, 'rgba(255, 250, 244, 0.70)');
            grad.addColorStop(1, 'rgba(255, 250, 244, 0.15)');
            fctx.fillStyle = grad;
            fctx.fill();

            fctx.strokeStyle = 'rgba(46, 95, 255, 0.85)';
            fctx.lineWidth = 1.0;
            fctx.stroke();

            fctx.fillStyle = '#fffaf4';
            fctx.beginPath();
            fctx.arc(nx, ny, 2.0, 0, Math.PI * 2);
            fctx.fill();
            fctx.restore();
          });
        }
      }
    }

    // Dynamic State
    let targetProgress = 0;
    let smoothProgress = 0;
    let currentDisplayedScene = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Pointer Parallax (Upgrade 3)
    let pointerX = 0;
    let targetPointerX = 0;
    let isTouch = false;

    window.addEventListener('mousemove', (e) => {
      if (isTouch) return;
      const norm = (e.clientX / (width || window.innerWidth)) * 2 - 1;
      targetPointerX = clamp(norm, -1, 1);
    }, { passive: true });

    window.addEventListener('touchstart', () => {
      isTouch = true;
      targetPointerX = 0;
    }, { passive: true });

    // Scroll Velocity for Dot Streaks (Upgrade 4)
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let streakAmount = 0;

    // Responsive Canvas Resize
    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = width < 768;
      const S = isMobile ? Math.min(width * 0.4, height * 0.26) : Math.min(width * 0.3, height * 0.4);
      const baseCx = isMobile ? width * 0.5 : width * 0.67;
      const baseCy = isMobile ? height * 0.32 : height * 0.5;

      const targetCount = getActiveDotCount();
      if (targetCount !== activePointCount) {
        rebuildScenes(targetCount);
      }

      buildFillCanvases(baseCx, baseCy, S, isMobile);
      initRingSprites(S);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    // Scroll Progress Calculation
    function updateScrollTarget() {
      const rect = section.getBoundingClientRect();
      const scrollRange = rect.height - window.innerHeight;
      if (scrollRange > 0) {
        targetProgress = clamp(-rect.top / scrollRange, 0, 1);
      } else {
        targetProgress = 0;
      }
    }

    window.addEventListener('scroll', updateScrollTarget, { passive: true });
    if (window.lenis) {
      window.lenis.on('scroll', updateScrollTarget);
    }
    updateScrollTarget();

    // Service words highlight helper (#2E5FFF)
    function highlightServiceWords(text) {
      if (!text) return '';
      return text.replace(/\b(AI|Technology|Applications?|Automation)\b/gi, (match) => {
        return `<span class="service-word-highlight">${match}</span>`;
      });
    }

    // Masked headline generator: line-by-line reveal with overflow-hidden mask (Upgrade 7)
    function formatMaskedTitle(text) {
      const words = text.split(' ');
      let lines = [];
      if (words.length <= 4) {
        lines = [words.join(' ')];
      } else {
        const mid = Math.ceil(words.length / 2);
        lines = [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
      }
      return lines.map((line, idx) => {
        const highlighted = highlightServiceWords(line);
        return `<span class="services-mask-line"><span class="services-mask-inner" style="transition-delay: ${idx * 70}ms">${highlighted}</span></span>`;
      }).join('');
    }

    // Cross-fade copy block on active scene transition
    function updateCopy(activeIdx) {
      if (activeIdx === currentDisplayedScene || !STORY[activeIdx]) return;
      currentDisplayedScene = activeIdx;

      if (titleEl && descEl) {
        const inners = titleEl.querySelectorAll('.services-mask-inner');
        if (inners.length > 0) {
          inners.forEach((el) => {
            el.classList.remove('is-in');
            el.classList.add('is-out');
          });
        }
        descEl.classList.add('is-shifting');

        setTimeout(() => {
          titleEl.innerHTML = formatMaskedTitle(STORY[activeIdx].title);
          descEl.innerHTML = highlightServiceWords(STORY[activeIdx].desc);
          descEl.classList.remove('is-shifting');
          requestAnimationFrame(() => {
            const newInners = titleEl.querySelectorAll('.services-mask-inner');
            newInners.forEach((el) => el.classList.add('is-in'));
          });
        }, 160);
      }
    }

    // Progress Rail Interaction
    railCols.forEach((col) => {
      col.addEventListener('click', () => {
        const targetScene = parseInt(col.dataset.scene, 10);
        if (isNaN(targetScene) || targetScene < 1 || targetScene > 4) return;
        const rect = section.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const scrollRange = rect.height - window.innerHeight;
        const targetScroll = sectionTop + ((targetScene / (scenes.length - 1)) * scrollRange);
        if (window.lenis) {
          window.lenis.scrollTo(targetScroll, { duration: 1.1 });
        } else {
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth',
          });
        }
      });
    });

    document.querySelectorAll('a[href="#services"], a[href="#services-section"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const rect = section.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        if (window.lenis) {
          window.lenis.scrollTo(sectionTop, { duration: 1.2 });
        } else {
          window.scrollTo({
            top: sectionTop,
            behavior: 'smooth',
          });
        }
      });
    });

    // Draw Pre-rendered Offscreen Fills with Crossfade, Tiny Scale-in, and Parallax (Technique B)
    function drawFillCanvases(activeIdx, fracMorph, cx, cy, baseCx, baseCy, tGlobal) {
      const outgoingWeight = 1 - tGlobal;
      const incomingWeight = tGlobal;

      const scaleOut = 1.0 - 0.03 * fracMorph;
      const scaleIn = 0.97 + 0.03 * fracMorph;

      const parallaxDx = cx - baseCx;
      const parallaxDy = cy - baseCy;

      if (outgoingWeight > 0.01 && fillCanvases[activeIdx]) {
        ctx.save();
        ctx.globalAlpha = outgoingWeight;
        ctx.translate(baseCx + parallaxDx, baseCy + parallaxDy);
        ctx.scale(scaleOut, scaleOut);
        ctx.translate(-baseCx, -baseCy);
        ctx.drawImage(fillCanvases[activeIdx], 0, 0, width, height);
        ctx.restore();
      }

      if (incomingWeight > 0.01 && fillCanvases[activeIdx + 1]) {
        ctx.save();
        ctx.globalAlpha = incomingWeight;
        ctx.translate(baseCx + parallaxDx, baseCy + parallaxDy);
        ctx.scale(scaleIn, scaleIn);
        ctx.translate(-baseCx, -baseCy);
        ctx.drawImage(fillCanvases[activeIdx + 1], 0, 0, width, height);
        ctx.restore();
      }
    }

    // Expanding Ring Pulses (Upgrade C)
    function drawRingPulses(posVal, cxVal, cyVal, sVal, curTime, N) {
      if (prefersReducedMotion || ringSprites.length === 0) return;

      // AI mesh active neurons
      const w1 = clamp(1 - Math.abs(posVal - 1.0), 0, 1);
      if (w1 > 0.02) {
        const neuronIdxs = [12, 38, 72, 110];
        for (let ni = 0; ni < neuronIdxs.length; ni++) {
          const dot = dots[neuronIdxs[ni] % N];
          const prog = (curTime * 0.75 + ni * 0.25) % 1.0;
          const sprIdx = clamp(Math.floor(prog * NUM_RING_SPRITES), 0, NUM_RING_SPRITES - 1);
          const spr = ringSprites[sprIdx];
          if (spr) {
            ctx.save();
            ctx.globalAlpha = w1 * (1 - prog);
            ctx.drawImage(spr.canvas, dot.screenX - spr.size / 2, dot.screenY - spr.size / 2);
            ctx.restore();
          }
        }
      }

      // Applications phone trend line end node
      const w3 = clamp(1 - Math.abs(posVal - 3.0), 0, 1);
      if (w3 > 0.02) {
        const nx = cxVal + 0.36 * sVal;
        const ny = cyVal - 0.40 * sVal;
        const prog = (curTime * 0.9) % 1.0;
        const sprIdx = clamp(Math.floor(prog * NUM_RING_SPRITES), 0, NUM_RING_SPRITES - 1);
        const spr = ringSprites[sprIdx];
        if (spr) {
          ctx.save();
          ctx.globalAlpha = w3 * (1 - prog);
          ctx.drawImage(spr.canvas, nx - spr.size / 2, ny - spr.size / 2);
          ctx.restore();
        }
      }

      // Automation orbital 3 nodes
      const w4 = clamp(1 - Math.abs(posVal - 4.0), 0, 1);
      if (w4 > 0.02) {
        const orbitR = 0.51 * sVal;
        const nodeAngles = [ -Math.PI / 6, Math.PI / 2, 7 * Math.PI / 6 ];
        for (let hi = 0; hi < 3; hi++) {
          const nx = cxVal + Math.cos(nodeAngles[hi]) * orbitR;
          const ny = cyVal + Math.sin(nodeAngles[hi]) * orbitR;
          const prog = (curTime * 1.0 + hi * 0.33) % 1.0;
          const sprIdx = clamp(Math.floor(prog * NUM_RING_SPRITES), 0, NUM_RING_SPRITES - 1);
          const spr = ringSprites[sprIdx];
          if (spr) {
            ctx.save();
            ctx.globalAlpha = w4 * (1 - prog);
            ctx.drawImage(spr.canvas, nx - spr.size / 2, ny - spr.size / 2);
            ctx.restore();
          }
        }
      }
    }

    // Helper to draw structure/contour edge lists
    function drawEdgeList(edgeList, weight, colorStr, lineWidth, N) {
      if (!edgeList || edgeList.length === 0 || weight <= 0.02) return;
      ctx.save();
      ctx.globalAlpha = weight;
      ctx.strokeStyle = colorStr;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      for (let i = 0; i < edgeList.length; i++) {
        const e = edgeList[i];
        if (e.a < N && e.b < N) {
          const dotA = dots[e.a];
          const dotB = dots[e.b];
          ctx.moveTo(dotA.screenX, dotA.screenY);
          ctx.lineTo(dotB.screenX, dotB.screenY);
        }
      }
      ctx.stroke();
      ctx.restore();
    }

    // IntersectionObserver to pause RAF when stage is offscreen
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isIntersectingViewport = entry.isIntersecting;
          if (isIntersectingViewport && !animFrameId) {
            lastFrameTimestamp = performance.now();
            animFrameId = requestAnimationFrame(render);
          }
        });
      }, { threshold: 0.01 });
      io.observe(section);
    }

    // Main Kinetic 60fps Render Loop
    let animFrameId = null;

    function render(timeMs) {
      if (!isIntersectingViewport) {
        animFrameId = null;
        return;
      }

      const now = performance.now();
      const frameDelta = now - lastFrameTimestamp;
      lastFrameTimestamp = now;

      // Frame time monitoring: drop tier if > 20ms for 60 consecutive frames
      if (frameDelta > 20) {
        slowFramesCount++;
        if (slowFramesCount >= 60 && !performanceTierReduced) {
          performanceTierReduced = true;
          rebuildScenes(CONFIG.dotCounts.mobile);
        }
      } else {
        slowFramesCount = Math.max(0, slowFramesCount - 1);
      }

      const time = timeMs * 0.001;

      // Smooth progress with 0.09 easing
      smoothProgress += (targetProgress - smoothProgress) * 0.09;
      const pos = smoothProgress * (scenes.length - 1);

      // Determine scene transition segment
      const idx = Math.min(Math.floor(pos), scenes.length - 2);
      const frac = pos - idx;

      // Hold-then-morph timing
      const fracMorph = clamp((frac - CONFIG.holdRatio) / 0.56, 0, 1);
      const tGlobal = easeInOutCubic(fracMorph);

      // Parallax easing
      if (!isTouch && !performanceTierReduced) {
        pointerX += (targetPointerX - pointerX) * 0.08;
      } else {
        pointerX = 0;
      }

      // Scroll velocity calculation for streak effect (Upgrade 4)
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      scrollVelocity += (scrollDiff - scrollVelocity) * 0.25;
      streakAmount = (!performanceTierReduced && !prefersReducedMotion)
        ? Math.min(4.0, Math.abs(scrollVelocity) * 0.12)
        : 0;

      // Responsive layout sizing
      const isMobile = width < 768;
      const S = isMobile ? Math.min(width * 0.4, height * 0.26) : Math.min(width * 0.3, height * 0.4);
      const baseCx = isMobile ? width * 0.5 : width * 0.67;
      const baseCy = isMobile ? height * 0.32 : height * 0.5;
      let cx = baseCx;
      let cy = baseCy;

      // Pointer parallax offset (up to 2% on desktop, eased)
      if (!isTouch && !isMobile && !performanceTierReduced) {
        cx += pointerX * (width * 0.02);
      }

      // Global rotation around Y axis (Upgrade 3)
      const rotY = prefersReducedMotion ? 0 : (Math.sin(time * 0.2) * CONFIG.rotationAmount + pointerX * 0.04);
      const cosRot = Math.cos(rotY);
      const sinRot = Math.sin(rotY);

      // Scale breathing (4% compression at mid-transition)
      const breathScale = prefersReducedMotion ? 1.0 : (1.0 - 0.04 * Math.sin(Math.PI * fracMorph));

      // Global pulse strength
      const pulseStrength = Math.max(
        clamp((pos - 3.2) / 0.8, 0, 1),
        (1 - clamp(Math.abs(pos - 1.0), 0, 1)) * 0.5
      );

      const N = activePointCount;

      // Update dot coordinates, 3D math & kinematics
      for (let n = 0; n < N; n++) {
        const p0 = scenes[idx][n];
        const p1 = scenes[idx + 1][n];

        let tDot = tGlobal;
        let arcX = 0;
        let arcY = 0;

        if (!prefersReducedMotion) {
          // Curved, staggered transition (Upgrade 4)
          const stagger = dotStaggers[n];
          const localT = clamp((fracMorph - stagger) / (1 - CONFIG.staggerSpread), 0, 1);
          let easedT = easeInOutCubic(localT);

          // Gentle settle (tiny overshoot under 3%)
          if (localT > 0.7 && localT < 1.0) {
            const st = (localT - 0.7) / 0.3;
            easedT += Math.sin(st * Math.PI) * 0.025;
          }
          tDot = clamp(easedT, 0, 1);

          // Perpendicular arc offset
          const dx = p1[0] - p0[0];
          const dy = p1[1] - p0[1];
          let perpX = -dy;
          let perpY = dx;
          const len = Math.hypot(perpX, perpY);
          if (len > 0.0001) {
            perpX /= len;
            perpY /= len;
          } else {
            perpX = 0;
            perpY = 1;
          }
          const arcVal = Math.sin(Math.PI * tDot) * CONFIG.arcAmount * dotArcSigns[n];
          arcX = perpX * arcVal;
          arcY = perpY * arcVal;
        }

        let baseX = p0[0] + (p1[0] - p0[0]) * tDot + arcX;
        let baseY = p0[1] + (p1[1] - p0[1]) * tDot + arcY;
        let baseZ = (p0[2] || 0) + ((p1[2] || 0) - (p0[2] || 0)) * tDot;

        // Apply scale breathing
        baseX *= breathScale;
        baseY *= breathScale;
        baseZ *= breathScale;

        // Idle drift (disabled in prefers-reduced-motion)
        if (!prefersReducedMotion) {
          baseX += Math.sin(time * 1.6 + n * 0.35) * 0.006;
          baseY += Math.cos(time * 1.3 + n * 0.28) * 0.006;
        }

        // Kinetic pulse
        let pulse = 0;
        if (!prefersReducedMotion) {
          pulse = Math.max(0, Math.sin(time * 2.6 - n * 0.12)) * pulseStrength;
          if (pos > 3.0) {
            const theta = Math.atan2(baseY, baseX);
            const rotPulse = Math.max(0, Math.sin(time * 3.2 - theta * 2.0));
            pulse = Math.max(pulse, rotPulse * clamp((pos - 3.0) / 0.8, 0, 1));
          }
        }

        // 3D Rotation around Y-axis (Upgrade 3)
        const xRot = baseX * cosRot + baseZ * sinRot;
        const zRot = -baseX * sinRot + baseZ * cosRot;
        const yRot = baseY;

        // Perspective projection: scale = 1 / (1 - zRot * 0.35)
        const perspScale = 1 / Math.max(0.2, 1 - zRot * CONFIG.perspective);
        const screenX = cx + xRot * S * perspScale;
        const screenY = cy + yRot * S * perspScale;

        // Depth alpha: lerp(0.35, 1, normalized nearness)
        const nearness = clamp((zRot + 0.5) / 1.0, 0, 1);
        const depthAlpha = 0.35 + 0.65 * nearness;

        const baseR = dots[n].baseRadius;
        const scaledRadius = Math.max(1.2, (baseR + pulse * 2.0) * perspScale);

        dots[n].x = baseX;
        dots[n].y = baseY;
        dots[n].z = baseZ;
        dots[n].xRot = xRot;
        dots[n].yRot = yRot;
        dots[n].zRot = zRot;
        dots[n].screenX = screenX;
        dots[n].screenY = screenY;
        dots[n].scale = perspScale;
        dots[n].depthAlpha = depthAlpha;
        dots[n].scaledRadius = scaledRadius;
        dots[n].pulse = pulse;
      }

      // ======================================================================
      // Z-ORDER RENDERING PIPELINE (Upgrade F)
      // 1) Fills -> 2) Hairlines -> 3) Structure -> 4) Contours ->
      // 5) Ring Pulses -> 6) Pulse Trails -> 7) Dots -> 8) Pulse Heads
      // ======================================================================

      // Clear Canvas (#f4eee8 stage)
      ctx.clearRect(0, 0, width, height);

      // 1) Pre-rendered fill canvases (back to front, crossfaded with tiny scale-in and parallax)
      drawFillCanvases(idx, fracMorph, cx, cy, baseCx, baseCy, tGlobal);

      // 2) Hairline edges (1px, alpha 0.3 - 0.55)
      const outgoingWeight = 1 - tGlobal;
      const incomingWeight = tGlobal;

      bucket0.length = 0;
      bucket1.length = 0;
      bucket2.length = 0;
      bucket3.length = 0;

      function pushHairlineEdge(e, weight) {
        if (e.a >= N || e.b >= N) return;
        const avgPulse = (dots[e.a].pulse + dots[e.b].pulse) * 0.5;
        const alpha = e.baseAlpha * weight * (1 + avgPulse * 0.5);
        if (alpha < 0.04) return;
        if (alpha < 0.18) bucket0.push(e);
        else if (alpha < 0.29) bucket1.push(e);
        else if (alpha < 0.42) bucket2.push(e);
        else bucket3.push(e);
      }

      const edgesOut = sceneEdges[idx];
      const edgesIn = sceneEdges[idx + 1];

      if (outgoingWeight > 0.01 && edgesOut && edgesOut.hairline) {
        for (let i = 0; i < edgesOut.hairline.length; i++) {
          pushHairlineEdge(edgesOut.hairline[i], outgoingWeight);
        }
      }
      if (incomingWeight > 0.01 && edgesIn && edgesIn.hairline) {
        for (let i = 0; i < edgesIn.hairline.length; i++) {
          pushHairlineEdge(edgesIn.hairline[i], incomingWeight);
        }
      }

      function drawBucket(bucket, colorStr) {
        if (bucket.length === 0) return;
        ctx.strokeStyle = colorStr;
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        for (let i = 0; i < bucket.length; i++) {
          const e = bucket[i];
          const dotA = dots[e.a];
          const dotB = dots[e.b];
          ctx.moveTo(dotA.screenX, dotA.screenY);
          ctx.lineTo(dotB.screenX, dotB.screenY);
        }
        ctx.stroke();
      }

      drawBucket(bucket0, 'rgba(46, 95, 255, 0.14)');
      drawBucket(bucket1, 'rgba(46, 95, 255, 0.22)');
      drawBucket(bucket2, 'rgba(46, 95, 255, 0.28)');
      drawBucket(bucket3, 'rgba(46, 95, 255, 0.35)');

      // 3) Structure edges (1.4px, #2E5FFF, alpha 0.55)
      if (edgesOut && edgesOut.structure) drawEdgeList(edgesOut.structure, outgoingWeight, 'rgba(46, 95, 255, 0.55)', 1.4, N);
      if (edgesIn && edgesIn.structure) drawEdgeList(edgesIn.structure, incomingWeight, 'rgba(46, 95, 255, 0.55)', 1.4, N);

      // 4) Contour edges (2.0px, #2E5FFF, alpha 0.85)
      if (edgesOut && edgesOut.contour) drawEdgeList(edgesOut.contour, outgoingWeight, 'rgba(46, 95, 255, 0.85)', 2.0, N);
      if (edgesIn && edgesIn.contour) drawEdgeList(edgesIn.contour, incomingWeight, 'rgba(46, 95, 255, 0.85)', 2.0, N);

      // 5) Ring pulses
      drawRingPulses(pos, cx, cy, S, time, N);

      // 6) Pulse trails
      activePacketHeads.length = 0;
      if (!prefersReducedMotion && pulseSprite && pos >= 0.5) {
        const activePool = incomingWeight > 0.5
          ? (edgesIn && edgesIn.hairline && edgesIn.hairline.length > 0 ? edgesIn.hairline : edgesIn?.structure)
          : (edgesOut && edgesOut.hairline && edgesOut.hairline.length > 0 ? edgesOut.hairline : edgesOut?.structure);

        if (activePool && activePool.length > 0) {
          const targetPackets = isMobile
            ? CONFIG.pulseCount.mobile
            : (pos > 3.2 ? CONFIG.pulseCount.desktop : pos > 1.2 ? 8 : 4);

          for (let p = 0; p < targetPackets; p++) {
            const packet = pulsePackets[p];
            if (!packet.active) {
              const edge = activePool[(Math.floor(Math.random() * activePool.length))];
              if (edge && edge.a < N && edge.b < N) {
                packet.active = true;
                packet.edgeA = edge.a;
                packet.edgeB = edge.b;
                packet.progress = 0;
                packet.speed = pos > 3.0 ? 0.035 : 0.02;
              }
            } else {
              packet.progress += packet.speed;
              if (packet.progress >= 1.0) {
                packet.active = false;
                continue;
              }

              const dotA = dots[packet.edgeA];
              const dotB = dots[packet.edgeB];
              const px = dotA.screenX + (dotB.screenX - dotA.screenX) * packet.progress;
              const py = dotA.screenY + (dotB.screenY - dotA.screenY) * packet.progress;

              // Update trail
              packet.trail.pop();
              packet.trail.unshift({ x: px, y: py });

              // Draw fading trail segments
              ctx.strokeStyle = 'rgba(143, 169, 255, 0.35)';
              ctx.lineWidth = 1.0;
              ctx.beginPath();
              ctx.moveTo(px, py);
              for (let tr = 0; tr < packet.trail.length; tr++) {
                ctx.lineTo(packet.trail[tr].x, packet.trail[tr].y);
              }
              ctx.stroke();

              activePacketHeads.push({ x: px, y: py });
            }
          }
        }
      }

      // 7) Dots (far to near sorted)
      for (let i = 0; i < N; i++) depthOrder[i] = i;
      depthOrder.subarray(0, N).sort((a, b) => dots[a].zRot - dots[b].zRot);

      for (let i = 0; i < N; i++) {
        const n = depthOrder[i];
        const dot = dots[n];

        ctx.fillStyle = dot.color;
        ctx.globalAlpha = dot.depthAlpha;

        if (streakAmount > 0.8) {
          const dirY = Math.sign(scrollVelocity) * streakAmount;
          ctx.strokeStyle = dot.color;
          ctx.lineWidth = dot.scaledRadius * 1.8;
          ctx.beginPath();
          ctx.moveTo(dot.screenX, dot.screenY - dirY);
          ctx.lineTo(dot.screenX, dot.screenY + dirY);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(dot.screenX, dot.screenY, dot.scaledRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0;

      // 8) Pulse heads
      if (activePacketHeads.length > 0 && pulseSprite) {
        for (let h = 0; h < activePacketHeads.length; h++) {
          ctx.drawImage(pulseSprite, activePacketHeads[h].x - 12, activePacketHeads[h].y - 12);
        }
      }

      // Sync Progress Rail
      if (railFillEl) {
        const fillPct = pos <= 1.0 ? 0 : pos >= 4.0 ? 100 : ((pos - 1.0) / 3.0) * 100;
        railFillEl.style.width = `${fillPct.toFixed(2)}%`;
      }

      // Active rail label
      const activeColIdx = pos < 0.5 ? -1 : pos < 1.5 ? 0 : pos < 2.5 ? 1 : pos < 3.5 ? 2 : 3;
      railCols.forEach((col, cIdx) => {
        if (cIdx === activeColIdx) {
          col.classList.add('is-active');
        } else {
          col.classList.remove('is-active');
        }
      });

      // Update Copy Block
      const activeSceneIdx = Math.min(4, Math.max(0, Math.round(pos)));
      updateCopy(activeSceneIdx);

      animFrameId = requestAnimationFrame(render);
    }

    animFrameId = requestAnimationFrame(render);
  }

  /**
   * AI Solutions: Award-Winning Cinematic Continuous Scroll Experience (Awwwards / FWA Caliber)
   * Master GSAP + ScrollTrigger scrubbed 700vh experience:
   * Act 1 (0% -> 12%): Atmospheric cross-fade from #f3eee8 to deep navy #070b18, text inversion, glowing "think?".
   * Act 2 (12% -> 25%): 3D particle intelligence core wakes up, ambient heartbeat breathing, mouse repulsion/attraction.
   * Act 3 (25% -> 90%): 6 dynamic chapters with live particle morphing & camera choreography:
   *   1. Assistant: Sub-particles reconfigure into neural synapse network / constellation
   *   2. CX: Dual orbiting harmonic particle rings
   *   3. Team: Interconnected 3D cluster node lattice
   *   4. Data: Multi-tiered streaming data bands / helix
   *   5. Automation: Torus accelerator with rapid high-speed flow
   *   6. Learning: Compounding double-helix / expanding Fibonacci field
   * Act 4 (90% -> 100%): Core expands into full unified matrix, finale title & CTA reveal.
   */
  function initAiSolutionsHorizontalPin() {
    const section = document.getElementById('ai-solutions-pin-section');
    const stage = document.getElementById('aiSolutionsPinnedStage');
    const canvas = document.getElementById('ai-core-canvas');
    const darkBg = document.getElementById('aiCinematicBgDark');
    const vignette = document.getElementById('aiCinematicVignette');
    const header = document.getElementById('aiCinematicHeader');
    const thinkSpan = document.getElementById('aiTitleThink');
    const rail = document.querySelector('.ai-cinematic-rail');
    const railFill = document.getElementById('aiRailFill');
    const railDots = Array.from(document.querySelectorAll('.ai-rail-dot'));
    const hud = document.getElementById('aiSystemHud');
    const hudStatus = document.getElementById('aiHudStatus');
    const hudMode = document.getElementById('aiHudMode');
    const finale = document.getElementById('aiCinematicFinale');
    const cards = [0, 1, 2, 3, 4, 5].map((i) => document.getElementById(`aiChapterCard${i}`));

    if (!section || !stage || !canvas) return;

    // Check reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = motionQuery.matches;
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', (e) => {
        prefersReducedMotion = e.matches;
      });
    }

    // Interactive mouse tracking relative to stage
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false };
    window.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        mouse.isHovering = true;
      } else {
        mouse.isHovering = false;
      }
    }, { passive: true });

    // Click jump on rail dots
    railDots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const stepIdx = parseInt(dot.getAttribute('data-step'), 10) || 0;
        const targetProgress = 0.25 + (stepIdx + 0.5) * (0.65 / 6);
        const scrollDist = section.offsetHeight - window.innerHeight;
        const targetScrollY = section.offsetTop + targetProgress * scrollDist;

        if (window.lenis && typeof window.lenis.scrollTo === 'function') {
          window.lenis.scrollTo(targetScrollY, { duration: 1.2 });
        } else {
          window.scrollTo({
            top: targetScrollY,
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
          });
        }
      });
    });

    // -------------------------------------------------------------
    // THREE.JS 3D PARTICLE ENGINE (SINGLE SOURCE OF TRUTH REFERENCE)
    // -------------------------------------------------------------
    const PARTICLE_CONFIG = {
      count: 16000,
      baseSize: 1.8,         // Base size in CSS pixels
      minSize: 1.0,          // Minimum size in CSS pixels
      maxSize: 3.5,          // Max size for normal particles in CSS pixels
      sparkMaxSize: 6.0,     // Max size for sparks in CSS pixels
      opacity: 0.35,         // Max alpha for normal particles (never blown-out)
      sparkOpacity: 0.90,    // Max alpha for sparks (~3% of particles)
      bloomStrength: 0.25,   // Restrained bloom strength
      bloomThreshold: 0.90,  // Bloom threshold (only core center & sparks glow)
      bloomRadius: 0.40,     // Subtle bloom radius
      cameraDistance: 7.5,   // Fixed camera distance across all devices
      fov: 50,               // Fixed vertical FOV
    };

    let renderer = null;
    let threeScene = null;
    let camera = null;
    let particleMesh = null;
    let particleMaterial = null;
    let positionsAttr = null;
    let colorsAttr = null;
    let sizesAttr = null;
    let sparksAttr = null;
    let composer = null;
    let bloomPass = null;

    const PARTICLE_COUNT = PARTICLE_CONFIG.count;
    // Buffer arrays for positions and target state morphing
    const baseCoords = new Float32Array(PARTICLE_COUNT * 3);
    const targetCoords = new Float32Array(PARTICLE_COUNT * 3);
    const currentCoords = new Float32Array(PARTICLE_COUNT * 3);
    const particleColors = new Float32Array(PARTICLE_COUNT * 3);
    const particleScales = new Float32Array(PARTICLE_COUNT);
    const particleSparks = new Float32Array(PARTICLE_COUNT);

    // Chapter mode targets
    // Mode 0: Core Sphere
    // Mode 1: Constellation / Synapse Web (AI Assistant)
    // Mode 2: Dual Harmonic Orbit Rings (Customer Experience)
    // Mode 3: Distributed Cluster Lattice (Team Intelligence)
    // Mode 4: Layered Streaming Data Helix (Data Signals)
    // Mode 5: High-Velocity Torus Accelerator (Automation)
    // Mode 6: Expanding Fibonacci / Neural DNA (Compounding Learning)
    // Mode 7: Unified Matrix Explosion (Finale)

    function initShapeCoordinates() {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        // Seed sphere base shape with Fibonacci sphere distribution
        const phi = Math.acos(1 - (2 * (i + 0.5)) / PARTICLE_COUNT);
        const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
        const r = 2.4 + (Math.random() - 0.5) * 0.45;

        baseCoords[i3] = r * Math.sin(phi) * Math.cos(theta);
        baseCoords[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        baseCoords[i3 + 2] = r * Math.cos(phi);

        currentCoords[i3] = baseCoords[i3];
        currentCoords[i3 + 1] = baseCoords[i3 + 1];
        currentCoords[i3 + 2] = baseCoords[i3 + 2];

        targetCoords[i3] = baseCoords[i3];
        targetCoords[i3 + 1] = baseCoords[i3 + 1];
        targetCoords[i3 + 2] = baseCoords[i3 + 2];

        // Strict Palette:
        // ~97% brand accent #2E5FFF (rgb 0.18, 0.37, 1.0) with varied subtle intensity
        // ~3% pure white sparks (rgb 1.0, 1.0, 1.0)
        // No cyan, teal, or other hues
        const rnd = Math.random();
        if (rnd > 0.97) {
          // Pure white spark (~3% of particles)
          particleColors[i3] = 1.0;
          particleColors[i3 + 1] = 1.0;
          particleColors[i3 + 2] = 1.0;
          particleScales[i] = 1.35;
          particleSparks[i] = 1.0;
        } else if (rnd > 0.85) {
          // Highlight brand accent #2E5FFF
          particleColors[i3] = 0.22;
          particleColors[i3 + 1] = 0.42;
          particleColors[i3 + 2] = 1.0;
          particleScales[i] = 1.0;
          particleSparks[i] = 0.0;
        } else {
          // Base brand accent #2E5FFF
          particleColors[i3] = 0.18;
          particleColors[i3 + 1] = 0.37;
          particleColors[i3 + 2] = 1.0;
          particleScales[i] = 0.85;
          particleSparks[i] = 0.0;
        }
      }
    }
    initShapeCoordinates();

    // Compute target coordinates based on active chapter
    function computeTargetForMode(modeIdx) {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const norm = i / PARTICLE_COUNT;

        if (modeIdx === 0) {
          // Sphere Core
          const phi = Math.acos(1 - 2 * norm);
          const theta = Math.PI * (1 + Math.sqrt(5)) * i;
          const r = 2.4 + Math.sin(i * 12.3) * 0.25;
          targetCoords[i3] = r * Math.sin(phi) * Math.cos(theta);
          targetCoords[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          targetCoords[i3 + 2] = r * Math.cos(phi);
        } else if (modeIdx === 1) {
          // Chapter 1: Synapse Constellation (Branching network)
          const angle = norm * Math.PI * 18;
          const branch = (i % 6) / 6;
          const r = 0.5 + norm * 3.4;
          targetCoords[i3] = r * Math.cos(angle + branch * Math.PI * 2) * (0.8 + 0.3 * Math.sin(i * 3.5));
          targetCoords[i3 + 1] = (norm - 0.5) * 4.2 + Math.cos(angle) * 0.4;
          targetCoords[i3 + 2] = r * Math.sin(angle + branch * Math.PI * 2) * 0.6;
        } else if (modeIdx === 2) {
          // Chapter 2: Dual Harmonic Orbit Rings (Customer Experience)
          const ring = i % 2;
          const ringAngle = norm * Math.PI * 20;
          const ringR = ring === 0 ? 3.0 : 2.2;
          const tilt = ring === 0 ? 0.65 : -0.75;
          const x = ringR * Math.cos(ringAngle) + (Math.random() - 0.5) * 0.3;
          const z = ringR * Math.sin(ringAngle) + (Math.random() - 0.5) * 0.3;
          targetCoords[i3] = x;
          targetCoords[i3 + 1] = z * Math.sin(tilt) + (Math.random() - 0.5) * 0.4;
          targetCoords[i3 + 2] = z * Math.cos(tilt);
        } else if (modeIdx === 3) {
          // Chapter 3: Team Intelligence - 3D Node Clusters
          const cluster = i % 5;
          const clusterOffsets = [
            [-1.8, 1.2, 0.4],
            [1.8, 1.0, -0.6],
            [-1.2, -1.4, 0.8],
            [1.5, -1.2, 0.2],
            [0, 0, -1.0],
          ];
          const c = clusterOffsets[cluster];
          const localR = 0.75 * Math.cbrt(Math.random());
          const th = Math.random() * Math.PI * 2;
          const ph = Math.acos(2 * Math.random() - 1);
          targetCoords[i3] = c[0] + localR * Math.sin(ph) * Math.cos(th);
          targetCoords[i3 + 1] = c[1] + localR * Math.sin(ph) * Math.sin(th);
          targetCoords[i3 + 2] = c[2] + localR * Math.cos(ph);
        } else if (modeIdx === 4) {
          // Chapter 4: Data Signals - Streaming Helix Bands
          const turns = 10;
          const hAngle = norm * Math.PI * 2 * turns;
          const hR = 2.0 + Math.sin(norm * Math.PI * 4) * 0.5;
          const strand = (i % 3) * ((2 * Math.PI) / 3);
          targetCoords[i3] = hR * Math.cos(hAngle + strand) + (Math.random() - 0.5) * 0.2;
          targetCoords[i3 + 1] = (norm - 0.5) * 6.0;
          targetCoords[i3 + 2] = hR * Math.sin(hAngle + strand) + (Math.random() - 0.5) * 0.2;
        } else if (modeIdx === 5) {
          // Chapter 5: Automation - Torus Accelerator
          const majorR = 2.6;
          const minorR = 0.8;
          const u = norm * Math.PI * 2 * 6;
          const v = ((i % 120) / 120) * Math.PI * 2;
          targetCoords[i3] = (majorR + minorR * Math.cos(v)) * Math.cos(u);
          targetCoords[i3 + 1] = (majorR + minorR * Math.cos(v)) * Math.sin(u) * 0.4;
          targetCoords[i3 + 2] = minorR * Math.sin(v) + (majorR * 0.5) * Math.sin(u);
        } else if (modeIdx === 6) {
          // Chapter 6: Compounding Learning - Expanding Fibonacci Shell
          const fAngle = i * 2.3999632;
          const fR = 0.4 + Math.sqrt(norm) * 3.6;
          targetCoords[i3] = fR * Math.cos(fAngle) * (1 - 0.2 * norm);
          targetCoords[i3 + 1] = fR * Math.sin(fAngle) * (1 - 0.2 * norm);
          targetCoords[i3 + 2] = (norm - 0.5) * 4.0 + Math.sin(fAngle * 3) * 0.3;
        } else {
          // Finale Unification (Matrix expansion)
          const rad = 5.2 + Math.random() * 2.5;
          const ph = Math.acos(2 * Math.random() - 1);
          const th = Math.random() * Math.PI * 2;
          targetCoords[i3] = rad * Math.sin(ph) * Math.cos(th);
          targetCoords[i3 + 1] = rad * Math.sin(ph) * Math.sin(th);
          targetCoords[i3 + 2] = rad * Math.cos(ph);
        }
      }
    }

    let isThreeActive = false;
    let fallback2DContext = null;

    function initBloomComposer() {
      if (
        composer ||
        !window.EffectComposer ||
        !window.RenderPass ||
        !window.UnrealBloomPass ||
        !renderer ||
        !threeScene ||
        !camera
      ) {
        return;
      }
      try {
        const w = stage.clientWidth || window.innerWidth;
        const h = stage.clientHeight || window.innerHeight;
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        const renderPass = new window.RenderPass(threeScene, camera);
        bloomPass = new window.UnrealBloomPass(
          new window.THREE.Vector2(w, h),
          PARTICLE_CONFIG.bloomStrength,   // 0.25
          PARTICLE_CONFIG.bloomRadius,     // 0.4
          PARTICLE_CONFIG.bloomThreshold   // 0.9
        );
        composer = new window.EffectComposer(renderer);
        composer.setPixelRatio(pixelRatio);
        composer.setSize(w, h);
        composer.addPass(renderPass);
        composer.addPass(bloomPass);
      } catch (err) {
        console.warn('Bloom composer init notice:', err);
        composer = null;
      }
    }

    function initThreeEngine() {
      const THREE = window.THREE;
      if (!THREE) {
        init2DFallback();
        return;
      }

      try {
        const w = stage.clientWidth || window.innerWidth;
        const h = stage.clientHeight || window.innerHeight;
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

        threeScene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(PARTICLE_CONFIG.fov, w / h, 0.1, 100);
        camera.position.set(0, 0, PARTICLE_CONFIG.cameraDistance);

        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        });
        renderer.setSize(w, h);
        renderer.setPixelRatio(pixelRatio);

        const geometry = new THREE.BufferGeometry();
        positionsAttr = new THREE.BufferAttribute(currentCoords, 3);
        colorsAttr = new THREE.BufferAttribute(particleColors, 3);
        sizesAttr = new THREE.BufferAttribute(particleScales, 1);
        sparksAttr = new THREE.BufferAttribute(particleSparks, 1);

        geometry.setAttribute('position', positionsAttr);
        geometry.setAttribute('color', colorsAttr);
        geometry.setAttribute('size', sizesAttr);
        geometry.setAttribute('isSpark', sparksAttr);

        // Resolution-independent point sizing & soft sprite shader
        const vertexShader = `
          attribute float size;
          attribute float isSpark;
          varying vec3 vColor;
          varying float vIsSpark;

          uniform float uBaseSize;
          uniform float uMinSize;
          uniform float uMaxSize;
          uniform float uSparkMaxSize;
          uniform float uPixelRatio;
          uniform float uCameraDistance;

          void main() {
            vColor = color;
            vIsSpark = isSpark;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

            // perspectiveScale depends on camera distance only, not on canvas width/height or window.innerHeight
            float perspectiveScale = uCameraDistance / max(0.5, -mvPosition.z);

            // Compute size in CSS pixels:
            float targetCss = size * uBaseSize * perspectiveScale;
            float maxCss = mix(uMaxSize, uSparkMaxSize, isSpark);

            // gl_PointSize in device pixels = clamp(targetCss * uPixelRatio, uMinSize * uPixelRatio, maxCss * uPixelRatio)
            gl_PointSize = clamp(targetCss * uPixelRatio, uMinSize * uPixelRatio, maxCss * uPixelRatio);
            gl_Position = projectionMatrix * mvPosition;
          }
        `;

        const fragmentShader = `
          varying vec3 vColor;
          varying float vIsSpark;

          uniform float uOpacity;
          uniform float uSparkOpacity;

          void main() {
            vec2 coord = gl_PointCoord - vec2(0.5);
            float dist = length(coord);
            if (dist > 0.5) discard;

            // Soft round falloff (smoothstep from center), not a hard square
            float falloff = smoothstep(0.5, 0.05, dist);

            // Per-particle alpha max 0.35 (sparks 0.9, only ~3% of particles)
            float maxAlpha = mix(uOpacity, uSparkOpacity, vIsSpark);
            float alpha = falloff * maxAlpha;

            vec3 col = vColor;
            if (vIsSpark > 0.5) {
              float sparkCore = smoothstep(0.22, 0.0, dist) * 0.35;
              col = mix(col, vec3(1.0), sparkCore);
            }

            // Reduce additive accumulation: cap the final color (col = 1.0 - exp(-col * 0.8) tone-map in fragment shader)
            col = vec3(1.0) - exp(-col * 0.80);

            gl_FragColor = vec4(col, alpha);
          }
        `;

        particleMaterial = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            uBaseSize: { value: PARTICLE_CONFIG.baseSize },
            uMinSize: { value: PARTICLE_CONFIG.minSize },
            uMaxSize: { value: PARTICLE_CONFIG.maxSize },
            uSparkMaxSize: { value: PARTICLE_CONFIG.sparkMaxSize },
            uPixelRatio: { value: pixelRatio },
            uCameraDistance: { value: PARTICLE_CONFIG.cameraDistance },
            uOpacity: { value: PARTICLE_CONFIG.opacity },
            uSparkOpacity: { value: PARTICLE_CONFIG.sparkOpacity },
          },
          transparent: true,
          vertexColors: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });

        particleMesh = new THREE.Points(geometry, particleMaterial);
        threeScene.add(particleMesh);
        isThreeActive = true;

        initBloomComposer();
      } catch (err) {
        console.warn('WebGL initialization failed, falling back to 2D Canvas:', err);
        init2DFallback();
      }
    }

    function init2DFallback() {
      isThreeActive = false;
      fallback2DContext = canvas.getContext('2d');
      handleResize();
    }

    // Try initializing Three or wait for three-ready event
    if (window.THREE) {
      initThreeEngine();
    } else {
      window.addEventListener('three-ready', initThreeEngine, { once: true });
      setTimeout(() => {
        if (!isThreeActive) init2DFallback();
      }, 1500);
    }
    window.addEventListener('three-postprocessing-ready', () => {
      if (renderer && threeScene && camera && !composer) {
        initBloomComposer();
      }
    });

    function handleResize() {
      const w = stage.clientWidth || window.innerWidth;
      const h = stage.clientHeight || window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      if (renderer && camera) {
        camera.aspect = w / h;
        camera.fov = PARTICLE_CONFIG.fov;
        camera.position.z = PARTICLE_CONFIG.cameraDistance;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(pixelRatio);
        renderer.setSize(w, h);
      }

      if (particleMaterial && particleMaterial.uniforms && particleMaterial.uniforms.uPixelRatio) {
        particleMaterial.uniforms.uPixelRatio.value = pixelRatio;
      }

      if (composer) {
        composer.setPixelRatio(pixelRatio);
        composer.setSize(w, h);
      }

      if (canvas) {
        canvas.width = w * pixelRatio;
        canvas.height = h * pixelRatio;
      }
    }
    window.addEventListener('resize', handleResize, { passive: true });

    // -------------------------------------------------------------
    // PROGRESS CALCULATION & GSAP SCROLLTRIGGER MASTER SCRUB
    // -------------------------------------------------------------
    let currentScrollProgress = 0;
    let targetScrollProgress = 0;
    let lastActiveChapter = -1;

    function computeScrollProgress() {
      const rect = section.getBoundingClientRect();
      const scrollDist = rect.height - window.innerHeight;
      if (scrollDist <= 0) return 0;
      const raw = -rect.top / scrollDist;
      return Math.max(0, Math.min(1, raw));
    }

    function onScrollUpdate() {
      targetScrollProgress = computeScrollProgress();
    }
    window.addEventListener('scroll', onScrollUpdate, { passive: true });
    if (window.lenis && typeof window.lenis.on === 'function') {
      window.lenis.on('scroll', onScrollUpdate);
    }

    // Master Timeline Update based on Progress (0.0 to 1.0)
    function applyScrubState(p) {
      // 1. ACT 1 - Darkening & Room Inversion (0% -> 12%)
      const act1P = Math.min(1, Math.max(0, p / 0.12));
      darkBg.style.opacity = act1P.toFixed(3);
      vignette.style.opacity = (act1P * 0.95).toFixed(3);

      if (act1P > 0.4) {
        stage.classList.add('is-dark');
      } else {
        stage.classList.remove('is-dark');
      }

      // Title glow & position with brand accent #2E5FFF
      if (act1P > 0.1) {
        const glowOpacity = Math.min(1, act1P * 1.2);
        thinkSpan.style.textShadow = `0 0 ${20 * glowOpacity}px rgba(46, 95, 255, 0.7), 0 0 ${45 * glowOpacity}px rgba(46, 95, 255, 0.35)`;
      } else {
        thinkSpan.style.textShadow = 'none';
      }

      // During chapters, gently scale header out of way to focus on core & copy
      if (p > 0.22 && p < 0.90) {
        const fadeP = Math.min(1, (p - 0.22) / 0.08);
        header.style.opacity = (1 - fadeP * 0.75).toFixed(3);
        header.style.transform = `translateX(-50%) translateY(${-fadeP * 14}px) scale(${1 - fadeP * 0.06})`;
      } else if (p >= 0.90) {
        header.style.opacity = '0';
      } else {
        header.style.opacity = '1';
        header.style.transform = 'translateX(-50%) translateY(0) scale(1)';
      }

      // 2. ACT 2 - Core Awakening (12% -> 25%)
      let coreScale = 0;
      if (p < 0.12) {
        coreScale = 0;
      } else if (p < 0.25) {
        const act2P = (p - 0.12) / 0.13;
        coreScale = act2P;
      } else if (p >= 0.90) {
        // Finale explosion into matrix
        coreScale = 1.0 + (p - 0.90) * 4.0;
      } else {
        // Pushing in slowly during chapters (camera push 1.0 -> 1.35)
        const chapterP = (p - 0.25) / 0.65;
        coreScale = 1.0 + chapterP * 0.25;
      }

      // 3. ACT 3 - Six Capabilities as Chapters (25% -> 90%)
      const chapterStart = 0.25;
      const chapterEnd = 0.90;
      const chapterSpan = (chapterEnd - chapterStart) / 6;

      let activeChapterIdx = -1;
      let chapterLocalP = 0;

      if (p >= chapterStart && p < chapterEnd) {
        const chProgress = (p - chapterStart) / (chapterEnd - chapterStart);
        const floatIdx = chProgress * 6;
        activeChapterIdx = Math.min(5, Math.floor(floatIdx));
        chapterLocalP = floatIdx - activeChapterIdx; // 0 to 1 inside current chapter

        rail.classList.add('is-visible');
        hud.classList.add('is-visible');
      } else {
        rail.classList.remove('is-visible');
        if (p < chapterStart) {
          hud.classList.remove('is-visible');
        }
      }

      // Update HUD metrics
      const chapterModes = [
        'SYNAPSE CONSTELLATION',
        'HARMONIC DUAL ORBIT',
        'DISTRIBUTED LATTICE',
        'STREAMING DATA HELIX',
        'TORUS ACCELERATOR',
        'FIBONACCI COMPOUNDING',
      ];
      if (activeChapterIdx >= 0) {
        hudMode.textContent = `MODE: ${chapterModes[activeChapterIdx]}`;
        hudStatus.textContent = `0${activeChapterIdx + 1} CAPABILITY ENGAGED`;
      } else if (p >= 0.90) {
        hudMode.textContent = 'MODE: MATRIX EXPANSION';
        hudStatus.textContent = 'SYSTEM UNIFIED 100%';
      } else {
        hudMode.textContent = 'MODE: SPHERE HARMONIC';
        hudStatus.textContent = 'NEURAL CORE ACTIVE';
      }

      // Update Left Rail Fill & Dot States
      if (p >= chapterStart) {
        const railP = Math.min(1, Math.max(0, (p - chapterStart) / (chapterEnd - chapterStart)));
        railFill.style.height = `${(railP * 100).toFixed(1)}%`;
      } else {
        railFill.style.height = '0%';
      }

      railDots.forEach((dot, idx) => {
        if (idx === activeChapterIdx) {
          dot.classList.add('is-active');
        } else {
          dot.classList.remove('is-active');
        }
      });

      // Update Chapter Cards (Fade in / slide in, hold, fade out)
      cards.forEach((card, idx) => {
        if (!card) return;
        if (idx === activeChapterIdx) {
          // Card entry / exit curve inside chapter
          let cardAlpha = 1;
          let translateY = 0;
          if (chapterLocalP < 0.2) {
            // In
            const inP = chapterLocalP / 0.2;
            cardAlpha = inP;
            translateY = (1 - inP) * 35;
          } else if (chapterLocalP > 0.8) {
            // Out
            const outP = (chapterLocalP - 0.8) / 0.2;
            cardAlpha = 1 - outP;
            translateY = -outP * 35;
          } else {
            cardAlpha = 1;
            translateY = 0;
          }

          card.style.opacity = cardAlpha.toFixed(3);
          card.style.pointerEvents = cardAlpha > 0.5 ? 'auto' : 'none';
          if (!prefersReducedMotion) {
            card.style.transform = `translateY(-50%) translate3d(0, ${translateY.toFixed(1)}px, 0)`;
          } else {
            card.style.transform = 'translateY(-50%)';
          }
        } else {
          card.style.opacity = '0';
          card.style.pointerEvents = 'none';
          if (!prefersReducedMotion) {
            card.style.transform = 'translateY(-50%) translate3d(0, 40px, 0)';
          } else {
            card.style.transform = 'translateY(-50%)';
          }
        }
      });

      // Chapter mode morph transition
      const targetMode = p >= 0.90 ? 7 : (activeChapterIdx >= 0 ? activeChapterIdx + 1 : 0);
      if (targetMode !== lastActiveChapter) {
        lastActiveChapter = targetMode;
        computeTargetForMode(targetMode);
      }

      // 4. ACT 4 - Finale Unification (90% -> 100%)
      if (p >= 0.90) {
        finale.classList.add('is-visible');
        rail.classList.remove('is-visible');
      } else {
        finale.classList.remove('is-visible');
      }
    }

    // -------------------------------------------------------------
    // RENDER ANIMATION FRAME (INTERPOLATION & PARTICLE PHYSICS)
    // -------------------------------------------------------------
    let clockTime = 0;
    let animId = null;

    function renderScene() {
      clockTime += 0.016;

      // Smooth scroll lerp (expo/lerp feel)
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.09;
      if (Math.abs(targetScrollProgress - currentScrollProgress) < 0.0003) {
        currentScrollProgress = targetScrollProgress;
      }

      applyScrubState(currentScrollProgress);

      // Mouse lerp for particle repulsion / attraction
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const p = currentScrollProgress;

      // Particle visibility & scaling based on Act 2 awakening
      let overallScale = 0;
      if (p < 0.12) {
        overallScale = 0;
      } else if (p < 0.25) {
        overallScale = (p - 0.12) / 0.13;
      } else if (p >= 0.90) {
        overallScale = 1.0 + (p - 0.90) * 3.5;
      } else {
        overallScale = 1.0 + ((p - 0.25) / 0.65) * 0.25;
      }

      // Particle morph step (lerp currentCoords toward targetCoords)
      const morphSpeed = prefersReducedMotion ? 0.15 : 0.065;
      const breathe = prefersReducedMotion ? 1 : (1 + 0.035 * Math.sin(clockTime * 2.2));
      const rotY = clockTime * (prefersReducedMotion ? 0.05 : 0.35) + mouse.x * 0.45;
      const rotX = mouse.y * 0.35;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Aspect ratio fitting:
      // When viewport is wider than tall (aspect >= 1.0), scale factor remains 1.0 (never inflated or camera brought closer)
      // When narrower than tall (aspect < 1.0, e.g. portrait tablet or phone), gently fit cloud within viewport
      const currentW = stage.clientWidth || window.innerWidth;
      const currentH = stage.clientHeight || window.innerHeight;
      const aspect = currentW / (currentH || 1);
      const aspectFit = aspect < 1.0 ? Math.max(0.72, Math.min(1.0, aspect / 0.95)) : 1.0;

      // Camera lateral displacement to complement right-side chapter cards on widescreen
      let targetCamX = 0;
      if (p >= 0.25 && p < 0.90) {
        targetCamX = currentW <= 900 ? 0 : -1.35;
      }

      if (isThreeActive && renderer && particleMesh) {
        // Update Three.js particle positions
        const posArr = positionsAttr.array;
        const count = PARTICLE_COUNT;

        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          // Morph lerp
          currentCoords[i3] += (targetCoords[i3] - currentCoords[i3]) * morphSpeed;
          currentCoords[i3 + 1] += (targetCoords[i3 + 1] - currentCoords[i3 + 1]) * morphSpeed;
          currentCoords[i3 + 2] += (targetCoords[i3 + 2] - currentCoords[i3 + 2]) * morphSpeed;

          // Subtle organic displacement noise
          const disp = Math.sin(clockTime * 1.5 + i * 0.1) * 0.06;
          const finalScale = overallScale * breathe * aspectFit;
          const px = currentCoords[i3] * finalScale + disp;
          const py = currentCoords[i3 + 1] * finalScale;
          const pz = currentCoords[i3 + 2] * finalScale;

          // Mouse proximity push
          const dx = px - mouse.x * 2.5;
          const dy = py - mouse.y * 2.5;
          const distSq = dx * dx + dy * dy;
          let pushX = 0;
          let pushY = 0;
          if (distSq < 2.5 && mouse.isHovering) {
            const factor = (2.5 - distSq) * 0.15;
            pushX = dx * factor;
            pushY = dy * factor;
          }

          posArr[i3] = px + pushX;
          posArr[i3 + 1] = py + pushY;
          posArr[i3 + 2] = pz;
        }

        positionsAttr.needsUpdate = true;

        if (camera) {
          camera.position.x += (targetCamX - camera.position.x) * 0.08;
          camera.position.z = PARTICLE_CONFIG.cameraDistance;
          camera.fov = PARTICLE_CONFIG.fov;
          camera.lookAt(targetCamX * 0.4, 0, 0);
        }

        particleMesh.rotation.y = rotY;
        particleMesh.rotation.x = rotX;
        particleMesh.visible = overallScale > 0.01;

        if (composer) {
          composer.render();
        } else {
          renderer.render(threeScene, camera);
        }
      } else if (fallback2DContext) {
        // Elegant 2D Canvas Fallback
        const ctx = fallback2DContext;
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        if (overallScale > 0.01) {
          const cx = w * 0.5 + targetCamX * (w * 0.08);
          const cy = h * 0.5;
          const radiusBase = Math.min(w, h) * 0.22 * overallScale * breathe * aspectFit;

          ctx.save();
          // Sample 1200 points for smooth 60fps 2D fallback
          const step = Math.floor(PARTICLE_COUNT / 1200);
          for (let i = 0; i < PARTICLE_COUNT; i += step) {
            const i3 = i * 3;
            currentCoords[i3] += (targetCoords[i3] - currentCoords[i3]) * morphSpeed;
            currentCoords[i3 + 1] += (targetCoords[i3 + 1] - currentCoords[i3 + 1]) * morphSpeed;
            currentCoords[i3 + 2] += (targetCoords[i3 + 2] - currentCoords[i3 + 2]) * morphSpeed;

            // 3D rotation projection
            const x0 = currentCoords[i3];
            const y0 = currentCoords[i3 + 1];
            const z0 = currentCoords[i3 + 2];

            const x1 = x0 * cosY + z0 * sinY;
            const z1 = -x0 * sinY + z0 * cosY;
            const y2 = y0 * cosX - z1 * sinX;
            const z2 = y0 * sinX + z1 * cosX;

            const scaleProj = 5.5 / (5.5 + z2);
            const screenX = cx + x1 * radiusBase * 0.35 * scaleProj;
            const screenY = cy + y2 * radiusBase * 0.35 * scaleProj;
            const isSpark = (i % 33 === 0);
            const maxCss = isSpark ? PARTICLE_CONFIG.sparkMaxSize : PARTICLE_CONFIG.maxSize;
            const pSize = Math.max(
              PARTICLE_CONFIG.minSize,
              Math.min(maxCss, particleScales[i] * PARTICLE_CONFIG.baseSize * scaleProj)
            );

            ctx.beginPath();
            ctx.arc(screenX, screenY, pSize, 0, Math.PI * 2);
            const alpha = isSpark
              ? PARTICLE_CONFIG.sparkOpacity
              : Math.min(PARTICLE_CONFIG.opacity, Math.max(0.10, (z2 + 3) / 6));
            ctx.fillStyle = isSpark
              ? `rgba(255, 255, 255, ${alpha.toFixed(2)})`
              : `rgba(46, 95, 255, ${alpha.toFixed(2)})`;
            ctx.fill();
          }
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(renderScene);
    }

    // Initial calculation & kick off loop
    onScrollUpdate();
    renderScene();
  }

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
