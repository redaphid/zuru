import Zuru from "./Zuru.mjs"
import { html } from "./html.mjs"
import { useState, useEffect } from "preact/hooks"
const defaultShader = `vec3 render(vec2 uv, vec3 last) {
  vec3 allRed = rgb2hsl(vec3(1.0, sin(time), 0.0));
  return allRed;
}`
const App = () => {
  const [shader, setShader] = useState(defaultShader)
  useEffect(() => {
    console.log(`updated shader: ${shader}`)
  }, [shader])
  return html`<div id="App"><${Zuru} shader=${shader} /><textarea value=${shader} onInput=${(e) => setShader(e.target.value)} /></div>`
}

export default App
