var person_img,personstop_img,corona_img,vaccine_img,bg_img,sanitizer_img, gameOver_img, restart_img, doctorstop_img;
var corona,vaccine,invisibleGround,sanitizer,score,gameOver,restart,doctorstop,personstop;
var PLAY = 1;
var END = 0;

var gameState = 1;



function preload(){
person_img = loadAnimation("person1.png","person2.png","person3.png","person4.png","person5.png",
"person6.png","person7.png","person8.png","person9.png");

bg_img = loadImage("bg4.jpg")

doctor_img = loadAnimation("doctor 1.png","doctor 2.png","doctor 3.png","doctor 4.png","doctor 5.png",
"doctor 6.png")

corona_img = loadImage("covid - 19 animated.png");

sanitizer_img = loadImage("sanitizer.png")

gameOver_img = loadImage("gameover.png")

restart_img = loadImage("restart.png")

doctorstop_img = loadImage("doctor 3.png")

personstop_Img = loadImage("person1.png")
}


function setup(){
  createCanvas(1500,600)


  bg = createSprite(750,300,1500,600)
  bg.addImage("bg",bg_img)
  //bg.x = bg.width /2;
  bg.scale = 1.5
  bg.velocityX = -3;

doctor = createSprite(100,500,120,30)
doctor.addAnimation("doctor",doctor_img)
doctor.addImage("stop",doctorstop_img)
doctor.scale = 1.3;

invisibleGround = createSprite(750,590,1500,50);
invisibleGround.visible = false;

gameOver = createSprite(680,200)
gameOver.addImage("gameover",gameOver_img)
gameOver.scale = 1.5

restart = createSprite(680,400)
restart.scale = 0.55;
restart.addImage("restart",restart_img)

sanitizerGroup = new Group()
coronaGroup = new Group()
personGroup = new Group()

score = 0;
score.depth = bg.depth;
score.depth = score.depth+1;

}

function draw(){
  background("white")
  text("Score: "+ score, 1100,100);
  score = score + Math.round(getFrameRate()/60);


  console.log(bg.width/2)
  if(gameState === PLAY){

  bg.velocityX = -3;
  console.log(bg.x)
  // if (bg.x < 350){
   // bg = createSprite(bg.width/2,300,1500,600)
    //bg.addImage("bg",bg_img)
    //bg.x = bg.width/2;
  


  if(keyDown("space")&& doctor.y >= 500) {
    doctor.velocityY = -12;
    
  }

  if(keyWentDown("UP_ARROW")){
  spawnSanitizer()
    
  }


  if (sanitizerGroup.isTouching(coronaGroup)) {
    coronaGroup.destroyEach();
    sanitizerGroup.destroyEach();
  }

  doctor.velocityY = doctor.velocityY + 0.35

  gameOver.visible = false;
  restart.visible = false;
  
  spawnCovid()
  spawnPerson()

  if (doctor.isTouching(coronaGroup)|| doctor.isTouching(personGroup)){
    gameState = END;
  }
}
  
  else if(gameState === END){
    
    gameOver.visible = true;
    restart.visible = true;

    bg.velocityX = 0;
    doctor.velocityY = 0;

    coronaGroup.setLifetimeEach(-1);
    personGroup.setLifetimeEach(-1);

    doctor.changeImage("stop",doctorstop_img)
    //person.changeImage("personstop",personstop_img)


    coronaGroup.setVelocityXEach(0);
    personGroup.setVelocityXEach(0); 

    

     if (mousePressedOver(restart)) {
      console.log("restart the game");
      reset();
    }
  }
  doctor.collide(invisibleGround);
  drawSprites()
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  coronaGroup.destroyEach();
  personGroup.destroyEach();
  doctor.changeAnimation("doctor",doctor_img)
  //person.changeAnimation("movement",person_img)
  score = 0;
}
function spawnCovid(){
  if (frameCount % 220 === 0) {
    var corona = createSprite(1500,500,40,10);
    corona.y = Math.round(random(365,500));
    corona.addImage(corona_img);
    corona.scale = 0.6;
    corona.velocityX = -3;

    corona.lifetime = 500;
    
    corona.depth = doctor.depth;
    doctor.depth = doctor.depth + 1;
    coronaGroup.add(corona)
    
}
}
function spawnPerson(){
  if (frameCount % 120 === 0) {
    var person = createSprite(1500,500,120,30)
    person.addAnimation("movement",person_img)
    person.scale = 1
    person.velocityX = -4;

    person.lifetime = 500;
    
    person.depth = doctor.depth;
    doctor.depth = doctor.depth + 1;
    personGroup.add(person)
    
}
}

function spawnSanitizer(){
  var sanitizer = createSprite(100, 100, 60, 10);
  sanitizer.addImage(sanitizer_img);
  sanitizer.x = 100;
  sanitizer.y = doctor.y;
  sanitizer.velocityX = 8;
  sanitizer.lifetime = 500;
  sanitizer.scale = 0.05;
  sanitizerGroup.add(sanitizer)
}