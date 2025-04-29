import { useContext, useState, useEffect } from "preact/hooks"
import { createContext } from "preact"
import { html } from "./html.mjs"

const FeatureContext = createContext()

export const useFeatures = () => {
  const context = useContext(FeatureContext)
  if (!context) {
    throw new Error("useFeatures must be used within a FeatureProvider")
  }
  return context
}

export const FeatureProvider = ({ children }) => {
  const [features, setFeatures] = useState({ blue: 0.035 })

  // Handle feature updates
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "features") {
        setFeatures(prev => ({
          ...prev,
          ...event.data.features
        }))
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  const value = {
    features,
    updateFeatures: (newFeatures) => {
      setFeatures(prev => ({
        ...prev,
        ...newFeatures
      }))
    }
  }

  return html`
    <${FeatureContext.Provider} value=${value}>
      ${children}
    <//>
  `
}
