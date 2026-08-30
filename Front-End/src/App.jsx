import { useState, useEffect } from "react"

import "prismjs/themes/prism-tomorrow.css"
import axios from "axios"
import EditorImport from "react-simple-code-editor"
const Editor = EditorImport.default ?? EditorImport

import { highlight, languages } from "prismjs/components/prism-core"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-javascript"
import prism from "prismjs"
import Markdown from "react-markdown"

import "./App.css"

function App() {
  const [count, setCount] = useState(0)
  const [code, setCode] = useState(`Add your code here to get a review from the AI code reviewer.`)

  useEffect(() => {
    prism.highlightAll()
  })

  async function reviewCode() {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code })
    setReview(response.data)
  }

  const [ review, setReview ] = useState(``)

  return (
    <>
    <div className="main">
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) => prism.highlight(code, prism.languages.javascript)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              width: "100%"
            }}
          />
        </div>
        <div 
        className="review-button" onClick={reviewCode}>
          Review
        </div>
      </div>
      <div className="right">
        <div className="review">
          <Markdown>{review}</Markdown>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
