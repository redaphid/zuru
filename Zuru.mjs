import { html } from "./html.mjs"
import { useEffect, useState, useRef } from "preact/hooks"
import { make } from "wish"

export const Zuru = ({ shader }) => {
  const [render, setRender] = useState(null)
  const canvas = useRef(null)
  const frameId = useRef(null)

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
      cancelAnimationFrame(frameId.current)
    }
  }, [shader, canvas]) // Depend on shader and canvas

  // Effect for animation
  useEffect(() => {
    if (!render) return

    const animate = () => {
      render()
      frameId.current = requestAnimationFrame(animate)
    }

    frameId.current = requestAnimationFrame(animate)

    // No need for cleanup here, handled by the first effect's unmount
  }, [render]) // Only depends on render instance

  return html` <canvas key=${shader} class="Zuru" ref=${canvas}></canvas> `
}

export default Zuru


