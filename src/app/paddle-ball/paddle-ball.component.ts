import { Component, EventEmitter, HostListener, OnInit } from '@angular/core';
import { Bodies, Body, Composite, Engine, Render, Runner, Constraint, MouseConstraint, Mouse, Vector, Events, World, Collision, IEventCollision} from 'matter-js';

@Component({
  selector: 'app-paddle-ball',
  templateUrl: './paddle-ball.component.html',
  styleUrls: ['./paddle-ball.component.css']
})
export class PaddleBallComponent implements OnInit {
  gameWidth: number = 1300;
  gameHeight: number = 700;

  paddle: Body = Bodies.rectangle(this.gameWidth/2, this.gameHeight-50, 200, 20, {inertia: Infinity, inverseInertia: 1/Infinity, isStatic: true});
  ball: Body = Bodies.circle(this.gameWidth/2, 500, 10, {restitution: 1, frictionAir: 0, friction: 0, inertia: Infinity, inverseInertia: 1/Infinity});
  box: Body = Bodies.rectangle(this.gameWidth/4, 200, 40,40,{isStatic: true});

  runner: Runner = Runner.create();
  
  //TODO: implement controls
  @HostListener("document:keypress", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === "a") {
      Body.setPosition(this.paddle, Vector.create(this.paddle.position.x -100, this.paddle.position.y));
    }
    if (event.key === "d") {
      Body.setPosition(this.paddle, Vector.create(this.paddle.position.x + 100, this.paddle.position.y));
    }
    if (event.key === "w") {
      Body.applyForce(this.ball, Vector.create(0, -1), Vector.create(0, -0.01));
    }
  }

  constructor() {}

  ngOnInit(): void {
    let gameBox = this.box;
    let gameBall = this.ball;

    //create engine and disable gravity
    const engine: Engine = Engine.create();
    engine.gravity.y = 0;

    //create render and set with and height
    const render: Render = Render.create({
      canvas: document.getElementById("game-canvas") as HTMLCanvasElement,
      engine,
      options: {
        width: this.gameWidth,
        height: this.gameHeight
      }
    });

    //create components array
    const components: Array<Body | Composite | Constraint | MouseConstraint> = [];

    //create boundaries and push then to the components array
    const ceiling: Body = Bodies.rectangle(this.gameWidth/2, 0, this.gameWidth, 60, {isStatic: true});
    const floor: Body = Bodies.rectangle(this.gameWidth/2, this.gameHeight, this.gameWidth, 60, {isStatic: true, isSensor: true,});
    const leftWall: Body = Bodies.rectangle(0, this.gameHeight/2, 60, this.gameHeight, {isStatic: true});
    const rightWall: Body = Bodies.rectangle(this.gameWidth, this.gameHeight/2, 60, this.gameHeight, {isStatic: true});

    components.push(ceiling, floor, leftWall, rightWall);

    // push ball and paddle to the components array
    components.push(this.ball, this.paddle, this.box);

    //create mouseConstraint and push it to the components array
    const mouseConstraint: MouseConstraint = MouseConstraint.create(engine, {mouse: Mouse.create(render.canvas)});
    components.push(mouseConstraint);

    // add components to the world
    Composite.add(engine.world, components);

    //run the render
    Render.run(render);

    // run the engine
    Runner.run(this.runner, engine);

    Events.on(engine, 'collisionEnd', function(e: IEventCollision<Engine>) {
      var i, pair,
      length = e.pairs.length;
      for(i = 0; i<length; i++){
        pair = e.pairs[i];
        if(pair.bodyA === gameBall && pair.bodyB === gameBox ){
          World.remove(engine.world, pair.bodyB);
        }
      }
    });
  }
}
