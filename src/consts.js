const TEXT_EFFECTS = [
  "leftToRight",
  "rotateExitRight",
  "fadeInItem",
  "easingLeftToRight",
  "spellTowardsTheScreen",
  "shrinkToCanvas",
  "opacityFadeOut",
  "opacityFadeIn",
  "typewriting",
  "blurFadeIn",
  "fallingAndBouncing",
  "twistyFallingAndBouncing",
  "backEasingMiddleToTop",
  "middleToTopAndRotateClassicNegative",
  "middleToTopAndRotateClassicPositive",
  "middleToTopAndRotateNegative",
  "middleToTopAndRotatePositive",
  "twistyRotatedRightToTheLeft",
  "centeredResizingAndRotationingOnTheMiddle",
  "centeredResizingOnTheMiddle",
  "easingRightToTheLeft",
]

const data = {
  frameGroup: {
    x: 0,
    y: 0,
    width: 1080,
    height: 1080,
  },
  fadeImage: { opacity: 1 },
}

const templateWidth = 1080
const templateHeight = 1080
const videoFps = 25 // 1 vayrkyanum kadreri qanak

module.exports = {
  TEXT_EFFECTS,
  data,
  templateWidth,
  templateHeight,
  videoFps,
}
