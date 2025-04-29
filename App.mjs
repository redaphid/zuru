import Zuru from "./Zuru.mjs"
import { html } from "./html.mjs"
import { useState, useEffect } from "preact/hooks"
const defaultShader = `vec3 render(vec2 uv, vec3 last) {
  return rgb2hsl(vec3(.0, 0., blue));
}`
const App = () => {
  const [shader, setShader] = useState(defaultShader)
  const [features, setFeatures] = useState({ blue: 0.035 })

  useEffect(() => {
    const interval = setInterval(() => {
      setFeatures(prev => ({
        ...prev,
        blue: (prev.blue + 0.01) % 1
      }))
    }, 10)

    return () => clearInterval(interval)
  }, [])

  return html`<div id="App"><${Zuru} shader=${shader} features=${features} /><textarea value=${shader} onInput=${(e) => setShader(e.target.value)} /></div>`
}

export default App
