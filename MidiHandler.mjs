import { useEffect } from "preact/hooks"

export const useMidiHandler = () => {
  useEffect(() => {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess()
        .then((midiAccess) => {
          midiAccess.inputs.forEach((input) => {
            input.addEventListener("midimessage", (message) => {
              const [command, control, value] = message.data

              // Check if it's a Control Change message (0xB0 to 0xBF)
              const isCC = (command & 0xf0) === 0xb0
              if (!isCC) return // Only handle CC messages

              // Extract channel (1-16) from the command byte
              const channel = (command & 0x0f) + 1

              // Generate knob name based on control and correct channel
              const knobName = channel === 1 ? `knob_${control}` : `knob_${control}_${channel}`

              // Normalize value to 0-1 range
              const normalizedValue = value / 127

              // Post as a feature update
              window.postMessage({
                type: "features",
                features: {
                  [knobName]: normalizedValue
                }
              }, "*")
            })
          })
        })
        .catch((error) => {
          console.error("MIDI failed to start", error)
        })
    }
  }, [])
}
