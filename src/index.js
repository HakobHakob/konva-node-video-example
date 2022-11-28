// node src/index.js
require("konva-node")
const path = require("path")
const { renderTextEffect } = require("./renderTextEffects")

const run =  async() => {
  const outputDir = path.join(__dirname, "../out")
  const output = path.join(__dirname, "../tmpVideo/output.mp4")

  await renderTextEffect({outputDir,output})
}

run().catch(console.error)
