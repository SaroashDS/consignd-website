import { Renderer, Program, Mesh, Triangle } from 'ogl'
import { useEffect, useRef } from 'react'

const VERT = /* glsl */ `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAG = /* glsl */ `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

vec3 ramp(float factor) {
  factor = clamp(factor, 0.0, 1.0);
  if (factor < 0.5) return mix(uColorA, uColorB, factor * 2.0);
  return mix(uColorB, uColorC, (factor - 0.5) * 2.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  vec3 rampColor = ramp(uv.x);

  /* two drifting noise layers make the band shimmer */
  float n1 = snoise(vec2(uv.x * 2.2 + uTime * 0.10, uTime * 0.25));
  float n2 = snoise(vec2(uv.x * 3.6 - uTime * 0.06, uTime * 0.18 + 40.0));
  float height = (n1 * 0.5 + n2 * 0.25) * uAmplitude;
  height = exp(height);

  /* aurora band hangs from the top of the screen (uv.y = 1 at top) */
  float d = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * d;

  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity)
                    * (1.0 - smoothstep(0.6, 1.6, intensity)); /* soften toward the very top */

  vec3 auroraColor = intensity * rampColor;
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`

const hexToRgb = (hex) => {
  const v = parseInt(hex.slice(1), 16)
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255]
}

export default function Aurora({
  colorStops = ['#1E3A8A', '#3B82F6', '#60A5FA'],
  amplitude = 1.0,
  blend = 0.5,
  speed = 0.5,
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const container = containerRef.current
    if (!container) return undefined

    let renderer
    try {
      renderer = new Renderer({
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, 1.5),
      })
    } catch {
      return undefined /* no WebGL: the CSS grid/glow background still stands */
    }

    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    gl.canvas.style.width = '100%'
    gl.canvas.style.height = '100%'
    container.appendChild(gl.canvas)

    const geometry = new Triangle(gl)
    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uBlend: { value: blend },
        uResolution: { value: [1, 1] },
        uColorA: { value: hexToRgb(colorStops[0]) },
        uColorB: { value: hexToRgb(colorStops[1]) },
        uColorC: { value: hexToRgb(colorStops[2]) },
      },
    })
    const mesh = new Mesh(gl, { geometry, program })

    const resize = () => {
      renderer.setSize(container.offsetWidth, container.offsetHeight)
      program.uniforms.uResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight]
    }
    resize()
    window.addEventListener('resize', resize)

    let raf = 0
    let running = true
    const loop = (t) => {
      if (!running) return
      raf = requestAnimationFrame(loop)
      program.uniforms.uTime.value = (t / 1000) * speed
      renderer.render({ scene: mesh })
    }
    raf = requestAnimationFrame(loop)

    const onVisibility = () => {
      running = !document.hidden
      if (running) raf = requestAnimationFrame(loop)
      else cancelAnimationFrame(raf)
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      container.removeChild(gl.canvas)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [amplitude, blend, speed, colorStops])

  return <div ref={containerRef} className="aurora" aria-hidden="true" />
}
