import { html } from "./html.mjs"
import { useEffect, useState, useRef } from "preact/hooks"
import { make } from "wish"

export const Zuru = ({ shader }) => {
  const [render, setRender] = useState(null)
  const canvas = useRef(null)
  useEffect(async () => {
    if (!shader) return
    if (!canvas.current) return
    const render = await make({
      canvas: canvas.current,
      fragmentShader: shader,
    })
    setRender(() => render)
  }, [shader, canvas])
  useEffect(() => {
    render()
  }, [render])
  return html` <canvas ref=${canvas}></canvas> `
}

export default Zuru
