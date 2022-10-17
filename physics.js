
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(0,0,200);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  // your code here
    propeller=Bodies.rectangle(150,480,200,15,{isStatic: true, angle:0});
    
    World.add(engine.world,[propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
   
push();
Body.setAngle(propeller,angle);
Body.setAngularVelocity(propeller,angleSpeed);
fill(255);
angle += angleSpeed;
drawVertices(propeller.vertices);
pop();
    
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
    for(var i=0; i<birds.length; i++){
        drawVertices(birds[i].vertices);
        if(isOffScreen(birds[i])){
            World.remove(engine.world,birds[i]);
            birds.splice(i,1);
        }
    }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
 
   boxes = Composites.stack(650,100,3,6,0,0,function(x,y){
                            return Bodies.rectangle(x,y,80,80,{                         
                            render:{fillStyle:color(0,random(23,255),0)}
                            });
    });
    
    World.add(engine.world,[boxes]);
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
     push();
  for(var i=boxes.bodies.length-1;i>=0;i--)
  {     
        fill(boxes.bodies[i].render.fillStyle);
        drawVertices(boxes.bodies[i].vertices);
      if(isOffScreen(boxes.bodies[i]))
      {
          boxes.bodies.splice(i,1);
      }
      
    }
    pop();

}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
//your code here
     slingshotBird = Bodies.circle(230, 160, 30, {friction: 0,
                                                  restitution: 0.95 });
     Matter.Body.setMass(slingshotBird, slingshotBird.mass*10);
  
  slingshotConstraint = Constraint.create({
    pointA: { x: 200, y: 140 },
    bodyB: slingshotBird,
    pointB: { x: 0, y: 0 },
      stiffness: 0.01,
      damping: 0.0001});
  World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
    push();
    fill(200,0,0);
    drawVertices(slingshotBird.vertices);
    stroke(100);
    strokeWeight(10);
    drawConstraint(slingshotConstraint);  
    pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}

   
        

