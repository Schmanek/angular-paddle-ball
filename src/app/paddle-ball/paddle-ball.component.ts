import { Component, OnInit } from '@angular/core';
import { Bodies, Body, Composite, Engine, Render, Runner } from 'matter-js';

@Component({
  selector: 'app-paddle-ball',
  templateUrl: './paddle-ball.component.html',
  styleUrls: ['./paddle-ball.component.css']
})
export class PaddleBallComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.setup()
  }

  public setup(): void {
    const engine: Engine = Engine.create();

    const render: Render = Render.create({canvas: document.getElementById("game-canvas") as HTMLCanvasElement, engine});

    const circle: Body = Bodies.circle(500, 500, 50);

    Composite.add(engine.world, circle);

    Render.run(render);

    const runner: Runner = Runner.create();

    Runner.run(runner, engine);


  }

}
