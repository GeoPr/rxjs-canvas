// import { fromEvent } from 'rxjs'
// import {
//   map,
//   switchMap,
//   takeUntil,
//   pairwise,
//   withLatestFrom,
//   startWith,
// } from 'rxjs/operators'

const canvas = document.getElementById('canvas')
const button = document.getElementById('button')
const color = document.getElementById('color')
const range = document.getElementById('range')

const ctx = canvas.getContext('2d')
const rect = canvas.getBoundingClientRect()
const scale = window.devicePixelRatio

canvas.width = rect.width * scale
canvas.height = rect.height * scale
ctx.scale(scale, scale)

// const mouseMove$ = fromEvent(canvas, 'mousemove')
// const mouseDown$ = fromEvent(canvas, 'mousedown')
// const mouseUp$ = fromEvent(canvas, 'mouseup')
// const mouseOut$ = fromEvent(canvas, 'mouseout')

// const createInputStream = inp => {
//   return fromEvent(inp, 'input').pipe(
//     map(e => e.target.value),
//     startWith(inp.value),
//   )
// }

// const lineWidth$ = createInputStream(range)
// const color$ = createInputStream(color)

// const stream$ = mouseDown$.pipe(
//   withLatestFrom(lineWidth$, color$, (_, lineWidth, color) => ({
//     // _ - mouseDown$
//     lineWidth,
//     color,
//   })),
//   switchMap(options => {
//     return mouseMove$.pipe(
//       map(e => ({ x: e.offsetX, y: e.offsetY, options })),
//       pairwise(),
//       takeUntil(mouseUp$),
//       takeUntil(mouseOut$),
//     )
//   }),
// )

// stream$.subscribe(([from, to]) => {
//   const { lineWidth, color } = from.options

//   ctx.strokeStyle = color
//   ctx.lineWidth = lineWidth

//   ctx.beginPath()

//   ctx.moveTo(from.x, from.y)
//   ctx.lineTo(to.x, to.y)
//   ctx.stroke()

//   ctx.closePath()
// })

// fromEvent(button, 'click').subscribe(() => {
//   ctx.clearRect(0, 0, canvas.width, canvas.height)
// })

import { fromEvent } from 'rxjs'
import {
  switchMap,
  map,
  pairwise,
  takeUntil,
  withLatestFrom,
  startWith,
} from 'rxjs/operators'

const mouseMove$ = fromEvent(canvas, 'mousemove')
const mouseDown$ = fromEvent(canvas, 'mousedown')
const mouseUp$ = fromEvent(canvas, 'mouseup')
const mouseOut$ = fromEvent(canvas, 'mouseout')

const createInputStream = node => {
  return fromEvent(node, 'input').pipe(
    map(e => e.target.value),
    startWith(node.value),
  )
}

const lineWidth$ = createInputStream(range)
const color$ = createInputStream(color)

const stream$ = mouseDown$.pipe(
  withLatestFrom(lineWidth$, color$, (_, lineWidth, color) => ({
    lineWidth,
    color,
  })),
  switchMap(options => {
    return mouseMove$.pipe(
      map(e => ({ x: e.offsetX, y: e.offsetY, options })),
      pairwise(),
      takeUntil(mouseUp$),
      takeUntil(mouseOut$),
    )
  }),
)

stream$.subscribe(([from, to]) => {
  const { lineWidth, color } = from.options

  ctx.lineWidth = lineWidth
  ctx.strokeStyle = color

  ctx.beginPath()

  ctx.moveTo(from.x, from.y)
  ctx.lineTo(to.x, to.y)
  ctx.stroke()

  ctx.closePath()
})

fromEvent(button, 'click').subscribe(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
})
