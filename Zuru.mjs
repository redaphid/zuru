import { html } from "./html.mjs"
import { useEffect, useState, useRef } from "preact/hooks"
import { make } from "wish"

export const Zuru = ({ shader, features }) => {
  const [render, setRender] = useState(null)
  const canvas = useRef(null)
  const [frameId, setFrameId] = useState(0)

  // Effect for creating renderer and cleanup on unmount
  useEffect(async () => {
    if (!shader || !canvas.current) return
    render?.cleanup()
    const r = await make({
      canvas: canvas.current,
      fragmentShader: shader,
    })
    setRender(() => r)


    // Cleanup function runs on unmount
    return () => {
      r?.cleanup()
      cancelAnimationFrame(frameId)
    }
  }, [shader, canvas]) // Depend on shader and canvas

  // Effect for animation
  useEffect(() => {
    if (!render) return
    setFrameId(requestAnimationFrame(() => render(features)))

    // No need for cleanup here, handled by the first effect's unmount
  }, [render, frameId, features]) // Only depends on render instance

  return html` <canvas key=${shader} class="Zuru" ref=${canvas}></canvas> `
}

export default Zuru
