import Zuru from "./Zuru.mjs"
import { html } from "./html.mjs"
import { useState, useEffect } from "preact/hooks"
const defaultShader = `vec3 render(vec2 uv, vec3 last) {
  vec3 lrgb = hsl2rgb(last);
  vec3 allRed = rgb2hsl(vec3(1.0, sin(time), sin(lrgb.b + blue)));
  return allRed;
}`
const features = {
  blue: 0.1
}
const App = () => {
  const [shader, setShader] = useState(defaultShader)
  return html`<div id="App"><${Zuru} shader=${shader} features=${features} /><textarea value=${shader} onInput=${(e) => setShader(e.target.value)} /></div>`
}

export default App
