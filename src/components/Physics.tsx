
import React, { useEffect, useState, useRef, useContext } from 'react'
import Matter from 'matter-js'
import { TypingCard } from './TypingCard'
import { Button, useTheme } from '@material-ui/core'
import { SettingsContext } from '../utility/context'

const STATIC_DENSITY = 15
const PARTICLE_SIZE = 10
const PARTICLE_BOUNCYNESS = .5 //1.1

export const MatterStepThree = () => {
  const theme = useTheme();
  const {settings, setSettings} = useContext(SettingsContext);
  const randomColor = [
    theme.palette.primary.main,
    theme.palette.text.secondary,
    theme.palette.secondary.main,
    theme.palette.text.primary,
    theme.palette.error.main
  ]
  const boxRef = useRef<any>(null)
  const canvasRef = useRef<any>(null)
  const [constraints, setContraints] = useState<any>()
  const [scene, setScene] = useState<any>()

  const [someStateValue, setSomeStateValue] = useState(false)
  useEffect(()=>{ 
    setSomeStateValue(settings.spawn)
    console.log('called');
  },[settings.spawn])
  const handleResize = () => {
    setContraints(boxRef.current.getBoundingClientRect())
  }

  const handleClick = () => {
    setSomeStateValue(!someStateValue)
  }

  useEffect(() => {
    let Engine = Matter.Engine
    let Render = Matter.Render
    let World = Matter.World
    let Bodies = Matter.Bodies
    let Runner = Matter.Runner

    let engine = Engine.create()

    let render = Render.create({
      element: boxRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        background: 'transparent',
        wireframes: false,
      },
    })

    const floor = Bodies.rectangle(0, 0, 0, STATIC_DENSITY, {
      isStatic: true,
      render: {
        fillStyle: 'blue',
      },
    })
    const leftWall = Bodies.rectangle(200, 0, 0, STATIC_DENSITY, {
      isStatic: true,
      render: {
        fillStyle: 'blue',
      },
    })
    const rightWall = Bodies.rectangle(190, 0, 0, STATIC_DENSITY, {
      isStatic: true,
      render: {
        fillStyle: 'blue',
      },
    })
    setContraints(boxRef.current.getBoundingClientRect())
    setScene(render)
    World.add(engine.world, [floor, leftWall, rightWall])

    Runner.run(engine)
    Render.run(render)
    console.log(boxRef.current.getBoundingClientRect());
    window.addEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (constraints) {
      let { width, height } = constraints

      // Dynamically update canvas and bounds
      scene.bounds.max.x = width
      scene.bounds.max.y = height
      scene.options.width = width
      scene.options.height = height
      scene.canvas.width = width
      scene.canvas.height = height

      // Dynamically update floor
      const floor = scene.engine.world.bodies[0]
      const leftWall = scene.engine.world.bodies[1]
      const rightWall = scene.engine.world.bodies[2]

      Matter.Body.setPosition(floor, {
        x: width / 2,
        y: height,
      })
      Matter.Body.setPosition(leftWall, {
        x: 0,
        y: height/2,
      })
      Matter.Body.setPosition(rightWall, {
        x: width,
        y: height/2,
      })

      Matter.Body.setVertices(floor, [
        { x: 0, y: height },
        { x: width, y: height },
        { x: width, y: height + STATIC_DENSITY },
        { x: 0, y: height + STATIC_DENSITY },
      ])
      // Matter.Body.setVertices(leftWall, [
      //   { x: 0, y: 0 },
      //   { x: 0, y: 0 },
      //   { x: 0, y: 0 + STATIC_DENSITY },
      //   { x: 0, y: 0 + STATIC_DENSITY },
      // ])
      // Matter.Body.setVertices(rightWall, [
      //   { x: width, y: 0 },
      //   { x: width, y: 0 },
      //   { x: 0, y: 0 + STATIC_DENSITY },
      //   { x: width, y: 0 + STATIC_DENSITY },
      // ])
    }
  }, [scene, constraints])
  useEffect(() => {
    // Add a new "ball" everytime `someStateValue` changes
    if (scene) {
      let { width } = constraints!
      let randomX = Math.floor(Math.random() * -width) + width
      Matter.World.add(
        scene.engine.world,
        Matter.Bodies.circle(randomX, -PARTICLE_SIZE, PARTICLE_SIZE, {
          restitution: PARTICLE_BOUNCYNESS,
          render: {
            fillStyle: randomColor[Math.floor(Math.random() * (randomColor.length))],
            opacity: .9,
          }
        }),
      )
    }
  }, [someStateValue])

  return (
    <div
      style={{
        width:'100%',
      }}
    >
      {/* <TypingCard setSpawn={setSomeStateValue} spawn={someStateValue}/> */}
      <div
        ref={boxRef}
        className="App-content"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          pointerEvents: 'none',
        }}
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}