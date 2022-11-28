require("konva-node")
const Konva = require("konva")
const { loadImage } = require("canvas")

const {
  TEXT_EFFECTS,
  data,
  templateWidth,
  templateHeight,
  videoFps,
} = require("./consts")
const {
  // loadBackgroundImage,
  saveFrame,
  createVideo,
  combineAnimations,
} = require("./videoUtils")

const renderText = (stage, layer, TEXT_EFFECTS) => {
  const animationType = {
    leftToRight: (el, duration) => {
      let time = duration

      !time ? (time = 2) : (time = duration)

      let initX = el[0].attrs.x
      let initY = el[0].attrs.y

      el.position({
        x: 0,
        y: stage.height() / 2,
      })

      el.to({
        x: initX,
        duration: time,
      })
    },
    rotateExitRight: (el) => {
      let initX = el[0].attrs.x
      let initY = el[0].attrs.y

      let animRotate = new Konva.Animation((frame) => {
        el.rotation(frame.time % 360)
      }, layer)

      let animMove = new Konva.Animation((frame) => {
        el.x(initX + frame.time)
      }, layer)

      animInit = true
      animRotate.start()
      animMove.start()

      setTimeout(() => {
        animRotate.stop()
        animMove.stop()
        el.setAttrs({
          x: initX,
          y: initY,
          rotation: 0,
        })
        layer.draw()
      }, 2000)
    },

    fadeInItem: (el, duration) => {
      !duration && (duration = 3)

      let initItemProps = el[0].attrs
      el[0].opacity(0)

      new Konva.Tween({
        node: el[0],
        easing: Konva.Easings.EaseIn,
        duration: duration,
        opacity: 1,
      }).play()
    },

    easingLeftToRight: (el, duration) => {
      !duration && (duration = 2)

      let initX = el[0].attrs.x
      let initY = el[0].attrs.y

      el.position({
        x: -el[0].attrs.x / 2,
        y: stage.height() / 2,
      })

      el.tween = new Konva.Tween({
        node: el[0],
        x: initX,
        easing: Konva.Easings.StrongEaseOut,
        duration: duration,
      })

      el.tween.play()
    },

    spellTowardsTheScreen: (el, duration) => {
      !duration && (duration = 2)

      el[0].tween = new Konva.Tween({
        node: el[0],
        easing: Konva.Easings.StrongEaseIn,
        duration: duration,
        scaleX: 12,
        scaleY: 12,
        opacity: 0,
        onFinish: function () {
          el[0].tween.reset()
        },
      })

      el[0].tween.play()
    },

    shrinkToCanvas: (el, duration) => {
      !duration && (duration = 2)

      el[0].scale({
        x: 12,
        y: 12,
      })

      el[0].tween = new Konva.Tween({
        node: el[0],
        easing: Konva.Easings.StrongEaseOut,
        duration: duration,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
      })

      el[0].tween.play()
    },

    opacityFadeOut: (el, duration) => {
      !duration && (duration = 2)

      el[0].tween = new Konva.Tween({
        node: el[0],
        duration: duration,
        opacity: 0,
        onFinish: function () {
          el[0].tween.reset()
        },
      })

      el[0].tween.play()
    },

    opacityFadeIn: (el, duration) => {
      !duration && (duration = 3)

      el[0].opacity(0)
      el[0].tween = new Konva.Tween({
        node: el[0],
        duration: duration,
        opacity: 1,
      })

      el[0].tween.play()
    },

    typewriting: (el, duration) => {
      !duration && (duration = 3)

      if (el[0].attrs.name != "text") return

      const textValue = el[0].getText()

      let i = 0

      const  typeWriter = () => {
        if (i <= textValue.length) {
          el[0].setAttrs({
            text: textValue.substr(0, i),
          })
          layer.draw()
          i++
          setTimeout(typeWriter, 50)
        }
      }
      typeWriter()
    },   

    fallingAndBouncing: (el, duration) => {
      !duration && (duration = 2)

      let initX = el[0].attrs.x
      let initY = el[0].attrs.y

      el[0].position({
        x: stage.width() / 2,
        y: 0,
      })

      el[0].tween = new Konva.Tween({
        node: el[0],
        x: initX,
        y: initY,
        easing: Konva.Easings.BounceEaseOut,
        duration,
      })

      el[0].tween.play()
    },

    twistyFallingAndBouncing: (el, duration) => {
      !duration && (duration = 1)

      let initX = el[0].attrs.x
      let initY = el[0].attrs.y

      el[0].rotate(-30)

      el[0].position({
        x: stage.width() / 2,
        y: 0,
      })

      el[0].tween = new Konva.Tween({
        node: el[0],
        x: initX,
        y: initY,
        easing: Konva.Easings.BounceEaseOut,
        duration,
      })

      el[0].tween.play()

      el[0].tween = new Konva.Tween({
        node: el[0],
        easing: Konva.Easings.EaseInOut,
        duration: duration,
        rotation: 0,
      })

      el[0].tween.play()
    },

    backEasingMiddleToTop: (el, duration) => {
      !duration && (duration = 0.75)

      let initX = el[0].attrs.x
      let initY = el[0].attrs.y

      el[0].position({
        x: stage.width() / 2,
        y: stage.height(),
      })

      el[0].tween = new Konva.Tween({
        node: el[0],
        x: initX,
        y: initY,
        easing: Konva.Easings.BackEaseOut,
        duration,
      })

      el[0].tween.play()
    },

    middleToTopAndRotateClassicNegative: (el, duration) => {
      !duration && (duration = 2)

      let initX = el[0].attrs.x
      let initY = el[0].attrs.y

      el[0].rotate(-30)
      el[0].opacity(0)

      el[0].position({
        x: stage.width() / 2,
        y: stage.height(),
      })

      el[0].tween = new Konva.Tween({
        node: el[0],
        x: initX,
        y: initY,
        easing: Konva.Easings.StrongEaseOut,
        duration,
        rotation: 0,
        opacity: 1,
      })

      el[0].tween.play()
    },

    middleToTopAndRotateClassicPositive: (el, duration) => {
      !duration && (duration = 2)

      let initX = el[0].attrs.x
      let initY = el[0].attrs.y

      el[0].rotate(30)
      el[0].opacity(0)

      el[0].position({
        x: stage.width() / 2,
        y: stage.height(),
      })

      el[0].tween = new Konva.Tween({
        node: el[0],
        x: initX,
        y: initY,
        easing: Konva.Easings.StrongEaseOut,
        duration,
        rotation: 0,
        opacity: 1,
      })

      el[0].tween.play()
    },

    middleToTopAndRotateNegative: (el, duration) => {
      !duration && (duration = 2.45)

      let initX = el[0].attrs.x
      let initY = el[0].attrs.y

      el[0].rotate(-30)
      el[0].opacity(0)

      el[0].position({
        x: stage.width() / 2,
        y: stage.height(),
      })

      el[0].tween = new Konva.Tween({
        node: el[0],
        x: initX,
        y: initY,
        easing: Konva.Easings.ElasticEaseOut,
        duration,
        rotation: 0,
        opacity: 1,
      })

      el[0].tween.play()
    },

    middleToTopAndRotatePositive: (el, duration) => {
      !duration && (duration = 2.45)

      let initX = el[0].attrs.x
      let initY = el[0].attrs.y

      el[0].rotate(30)
      el[0].opacity(0)

      el[0].position({
        x: stage.width() / 2,
        y: stage.height(),
      })

      el[0].tween = new Konva.Tween({
        node: el[0],
        x: initX,
        y: initY,
        easing: Konva.Easings.ElasticEaseOut,
        duration,
        rotation: 0,
        opacity: 1,
      })

      el[0].tween.play()
    },

    twistyRotatedRightToTheLeft: (el, duration) => {
      !duration && (duration = 1.8)

      let initX = el[0].attrs.x
      let initY = el[0].attrs.y

      el[0].rotate(30)

      el[0].position({
        x: stage.width(),
        y: initY,
      })

      el[0].tween = new Konva.Tween({
        node: el[0],
        x: initX,
        easing: Konva.Easings.BackEaseOut,
        duration,
      })

      el[0].tween.play()

      el[0].tween = new Konva.Tween({
        node: el[0],
        easing: Konva.Easings.ElasticEaseOut,
        duration: duration + 1.5,
        rotation: 0,
      })

      el[0].tween.play()
    },

    centeredResizingAndRotationingOnTheMiddle: (el, duration) => {
      !duration && (duration = 1)

      el[0].scale({
        x: 0,
        y: 0,
      })

      el[0].rotate(30)

      el[0].tween = new Konva.Tween({
        node: el[0],
        easing: Konva.Easings.BackEaseOut,
        duration,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
      })

      el[0].tween.play()
    },

    centeredResizingOnTheMiddle: (el, duration) => {
      !duration && (duration = 1)

      el[0].scale({
        x: 0,
        y: 0,
      })

      el[0].tween = new Konva.Tween({
        node: el[0],
        easing: Konva.Easings.BackEaseOut,
        duration,
        scaleX: 1,
        scaleY: 1,
      })

      el[0].tween.play()
    },

    easingRightToTheLeft: (el, duration) => {
      !duration && (duration = 2)

      let initX = el[0].attrs.x
      let initY = el[0].attrs.y

      el[0].position({
        x: stage.width() + el[0].attrs.x / 2,
        y: stage.height() / 2,
      })

      el[0].tween = new Konva.Tween({
        node: el[0],
        x: initX,
        easing: Konva.Easings.StrongEaseOut,
        duration,
      })

      el[0].tween.play()
    },
  }

  const itemType = {
    text: () => {
      let el = new Konva.Text({
        width: 350,
        height: 106,
        x: stage.width() / 2,
        y: stage.height() / 2,
        text: "Simple Text",
        fontSize: 50,
        fontFamily: "Calibri",
        fill: "red",
        name: "text",
      })
      el.setAttr("offset", {
        x: el.width() / 2,
        y: el.height() / 2,
      })
      layer.add(el)
      layer.draw()
    },
  }

  itemType["text"]()

  const textRandomEffect =
    TEXT_EFFECTS[Math.floor(Math.random() * TEXT_EFFECTS.length)]

  //To select shapes by name with Konva, we can use the find() method using the . selector.
  // The find() method returns an array of nodes that match the selector string.
  animationType[textRandomEffect](stage.find("." + "text"))
 
}

const renderTextEffect = async ({ outputDir, output }) => {
  const stage = new Konva.Stage({
    width: templateWidth,
    height: templateHeight,
  })

  const start = Date.now()
  const frames = 2 * videoFps

  try {
    let layer = new Konva.Layer({})
    let group = new Konva.Group({ clip: data.frameGroup })

    let image = new Konva.Image({ draggable: false })
    let fadeImage = null
    let imageObj = await loadImage(
      "https://assets.codepen.io/255591/nasa_sat.png"
    )

    stage.add(layer)

    // Use the html image object to load the image and handle when laoded.
    const renderBackground = (
      image,
      imageObj,
      group,
      fadeImage,
      layer,
      data
    ) => {
      image.image(imageObj) // set the Konva image content to the html image content

      // set the Konva image attributes as needed
      image.setAttrs({
        x: data.frameGroup.x,
        y: data.frameGroup.y,
        width: data.frameGroup.width,
        height: data.frameGroup.height,
      })

      group.add(image) // add the image to the frame group

      // make a clone of the image to be used as the fade image.
      fadeImage = image.clone({
        draggable: false,
        opacity: data.fadeImage.opacity,
      })
      layer.add(fadeImage)
    }
    renderBackground(image, imageObj, group, fadeImage, layer, data)

    const animate = combineAnimations(renderText(stage, layer, TEXT_EFFECTS))

    console.log("generating frames...")

    let frame = 0
    while (frame < frames) {
      animate(frame)
      layer.draw()

      await saveFrame({ stage, outputDir, frame })

      if ((frame + 1) % videoFps === 0) {
        console.log(`rendered ${(frame + 1) / videoFps} second(s)`)
      }
      ++frame
    }
  } finally {
    stage.destroy()
  }
  console.log("creating video")
  createVideo({ fps: videoFps, outputDir, output })
  const time = Date.now() - start
  console.log(`done in ${time} ms. ${(frames * 1000) / (time || 0.01)} FPS`)
}

module.exports = {
  renderTextEffect,
}
