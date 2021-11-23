
import React, { useEffect, useState, useRef, useContext } from 'react'
import Matter from 'matter-js'
import { TypingCard } from './TypingCard'
import { Button, useTheme } from '@material-ui/core'
import { SettingsContext } from '../utility/context'
import { spawn } from 'child_process'

const STATIC_DENSITY = 2
const PARTICLE_SIZE = 25
const PARTICLE_BOUNCYNESS = .99 //1.1

export const MatterStepThree = () => {
  // var Engine = Matter.Engine,
  // Render = Matter.Render,
  // World = Matter.World,
  // Bodies = Matter.Bodies,
  // Mouse = Matter.Mouse,
  // Runner = Matter.Runner,
  // MouseConstraint = Matter.MouseConstraint;

  // const canvasRef = useRef<any>(null)
  // const boxRef = useRef<any>(null)
  // const [constraints, setConstraints] = useState<any>(null);
  // var engine = Engine.create();
  // var ballA = Bodies.circle(210, 100, 30, { restitution: 0.5 });
  // var ballB = Bodies.circle(110, 50, 30, { restitution: 0.5 });
  // World.add(engine.world, [ballA, ballB]);

  // const handleResize = () => {
  //   console.log('resize called');
  //   setConstraints(boxRef.current.getBoundingClientRect())
  // }
  // const setFloorAndWalls = () => {
  //   const {height, width} = constraints;
  //   console.log(height, width);
  //     World.add(engine.world, [
  //       // walls & floor
  //         Bodies.rectangle(-10, height / 2, 20, height, {
  //         isStatic: true,
  //         render: {
  //           fillStyle: 'blue',
  //         },
  //       })
  //     ]);
  // }
  // const animate = () => {
  //   var render = Render.create(
  //     {
  //     element: boxRef.current,
  //     canvas: canvasRef.current,
  //     engine: engine,
  //     options: {
  //       wireframes: false,
  //       background: 'transparent',
  //     }
  //   });
  //   setFloorAndWalls();
  //   // add mouse control
  //   var mouse = Mouse.create(render.canvas),
  //     mouseConstraint = MouseConstraint.create(engine, {
  //       mouse: mouse,
  //       constraint: {
  //         stiffness: 0.2,
  //         render: {
  //           visible: false
  //         }
  //       }
  //     });

  //   World.add(engine.world, mouseConstraint);

  //   Matter.Events.on(mouseConstraint, "mousedown", function(event) {
  //     World.add(engine.world, Bodies.circle(150, 50, 30, { restitution: 0.7 }));
  //   });
  //   Runner.run(engine);
  //   Render.run(render);
  //   window.addEventListener('resize', handleResize)
  //   window.addEventListener('scroll', handleResize)
  // }
  // useEffect(()=>{
  //   handleResize();
  //   animate();
    
  //   console.log('animate called')
  // },[])
  // return(
  //   <>
  //         <div
  //     style={{
  //       width:'100%',
  //     }}
  //   >
  //     <div className="App-typingCard" >
  //     </div>
  //     <div
  //       ref={boxRef}
  //       className="App-content"
  //       style={{
  //         position: 'absolute',
  //         top: 0,
  //         left: 0,
  //         width: '100%',
  //       }}
  //     >
  //       <canvas ref={canvasRef} />
  //     </div>
  //   </div>
  //     </>
  // )

  const theme = useTheme();
  const {settings, setSettings} = useContext(SettingsContext);

  let Engine = Matter.Engine
  let Render = Matter.Render
  let World = Matter.World
  let Bodies = Matter.Bodies
  let Runner = Matter.Runner
  let Body = Matter.Body
  let Mouse = Matter.Mouse
  let MouseConstraint = Matter.MouseConstraint
  
  const randomColor = [
    theme.palette.primary.main,
    theme.palette.text.secondary,
    theme.palette.secondary.main,
    theme.palette.text.primary,
    theme.palette.error.main
  ]
  const boxRef = useRef<any>(null)
  const canvasRef = useRef<any>(null)
  const [constraints, setConstraints] = useState<any>()
  const [scene, setScene] = useState<any>()
  const [someStateValue, setSomeStateValue] = useState({spawn: false, num: 0})

  const handleResize = () => {
    setConstraints(boxRef.current.getBoundingClientRect())
  }
  const createWorld = () => {
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
    let boundaryOptions = {
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    }
    const floor = Bodies.rectangle(0, 0, 0, STATIC_DENSITY, boundaryOptions)
    const leftWall = Bodies.rectangle(0, 0, STATIC_DENSITY, 0, boundaryOptions)
    const rightWall = Bodies.rectangle(0, 0, STATIC_DENSITY, 0, boundaryOptions)
    //const peg = Bodies.circle(0,0,50, {...boundaryOptions, isSensor: true})
    setConstraints(boxRef.current.getBoundingClientRect())
    setScene(render)
    World.add(engine.world, [floor, leftWall, rightWall])
    Runner.run(engine)
    Render.run(render)
    setSomeStateValue({spawn: !spawn, num: 1})
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleResize)
  }
  const updateBoundaries = () => {
    if (constraints) {
      let { width, height, top } = constraints
      //console.log(boxRef.current.getBoundingClientRect());
      // Dynamically update canvas and bounds
      scene.bounds.max.x = width
      scene.bounds.max.y = height - top
      scene.options.width = width
      scene.options.height = height - top
      scene.canvas.width = width
      scene.canvas.height = height - top

      // Dynamically update floor
      const floor = scene.engine.world.bodies[0]
      const leftWall = scene.engine.world.bodies[1]
      const rightWall = scene.engine.world.bodies[2]
      const peg = scene.engine.world.bodies[3]

      Body.setPosition(floor, {x: width / 2, y: height - top})
      Body.setPosition(leftWall, {x: 0, y: height / 2})
      Body.setPosition(rightWall, {x: width,y: height / 2})
      //Body.setPosition(peg, {x: width/2, y: height/2})
      Body.setVertices(floor, [
        { x: 0, y: height },
        { x: width, y: height },
        { x: width, y: height + STATIC_DENSITY },
        { x: 0, y: height + STATIC_DENSITY },
      ])
      Body.setVertices(leftWall, [
        { x: STATIC_DENSITY, y: 0},
        { x: 0, y: 0 },
        { x: 0, y: height },
        { x: STATIC_DENSITY, y: height },
      ])
      Body.setVertices(rightWall, [
        { x: width + STATIC_DENSITY, y: 0},
        { x: width, y: 0},
        { x: width, y: height },
        { x: width  + STATIC_DENSITY, y: height},

        
      ])
    }
  }
  const addBalls = () => {
    if (scene) {
      let { width } = constraints!;
      for(let i = 0; i < someStateValue.num; i++){
        let timeout = someStateValue.num === 1 ? 0 : 100;
        let randomX = Math.floor(Math.random() * -width) + width
        let randomSize = Math.floor(Math.random() * (PARTICLE_SIZE - 10 + 1) + 10)
        setTimeout(()=>
          World.add(scene.engine.world, 
          Bodies.circle(randomX, -randomSize, randomSize, {
          restitution: PARTICLE_BOUNCYNESS,
          render: {
            fillStyle: 'transparent',
            lineWidth: 1.5,
            opacity: .9,
            strokeStyle: randomColor[Math.floor(Math.random() * (randomColor.length))],
          }})), timeout * i)
      }
    }
  }
  useEffect(() => {
    createWorld();
    console.log('Creating Physics World....')
  }, [])
  useEffect(() => {
    updateBoundaries();
    console.log('Updating Screen Boundaries....')
  }, [scene, constraints])
  // useEffect(()=>{
  //   window.addEventListener('scroll', handleScroll)
  // }, [])
  // useEffect(() => {
  //   return () => {
  //     window.removeEventListener('resize', handleResize)
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [])
  useEffect(() => addBalls(), [someStateValue])

  return (
    <div style={{width:'100%'}}>
      <div className="App-typingCard" >
      <TypingCard setSpawn={setSomeStateValue} spawn={someStateValue.spawn}/>
      </div>
      <div ref={boxRef} className="App-content" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }}
      >
      <canvas ref={canvasRef} />
      </div>
    </div>
  )
}