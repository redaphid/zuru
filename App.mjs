import Zuru from "./Zuru.mjs"
import { html } from "./html.mjs"
import { useState } from "preact/hooks"
import { FeatureProvider, useFeatures } from "./FeatureProvider.mjs"
import { useMidiHandler } from "./MidiHandler.mjs"

const defaultShader = `vec3 render(vec2 uv, vec3 last) {
  return rgb2hsl(vec3(.0, 0., blue));
}`

const ZuruApp = () => {
  const [shader, setShader] = useState(defaultShader)
  const { features } = useFeatures()

  // Initialize MIDI handler
  useMidiHandler()

  return html`
    <div id="App">
      <${Zuru} shader=${shader} features=${features} />
      <div class="controls">
        <textarea value=${shader} onInput=${(e) => setShader(e.target.value)} />
      </div>
    </div>
  `
}

const App = () => {
  return html`
    <${FeatureProvider}>
      <${ZuruApp} />
    <//>
  `
}

export default App
