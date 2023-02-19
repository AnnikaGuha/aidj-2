song="";
rightwristx=0,
rightwristy=0;
leftwristx=0;
leftwristy=0;
rightwristscore=0;
leftwristscore=0;
function preload(){
    song=loadSound("music.mp3");
    }
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide()
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("modelLoaded");
}
function gotPoses(results){
    if(gotPoses.length>0){
        console.log(gotPoses);
        rightwristscore=results[0].pose.keypoints[10].score;
        leftwristscore=results[0].pose.keypoints[9].score;
        console.log("leftwristscore"+leftwristscore+"rightwristscore"+ rightwristscore);
        leftwristx=results[0].pose.leftwrist.x;
        leftwristy=results[0].pose.leftwrist.y;
        console.log(leftwristx+"=leftwristx"+leftwristy+"=leftwristy");
        rightwristx=results[0].pose.rightwrist.x;
        rightwristy=results[0].pose.rightwrist.y;
        console.log(rightwristx+"=rightwristx"+rightwristy+"=rightwristy");


    }
}

function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(rightwristscore>0.2){

    if(rightwristy>0 && rightwristy<=100){
        document.getElementById("speed").innerHTML=" speed=0.5x";
song.rate(0.5);
    }
    else if(rightwristy>100 &&rightwristy<=200 ){
        document.getElementById("speed").innerHTML="speed=1.0x";
        song.rate(1.0);
    }
    else if(rightwristy>200 &&rightwristy<=300 ){
        document.getElementById("speed").innerHTML="speed=1.5x";
        song.rate(1.5);
    }
    else if(rightwristy>300 &&rightwristy<=400 ){
        document.getElementById("speed").innerHTML="speed=2.0x";
        song.rate(2.0);
    }
    else if(rightwristy>400 &&rightwristy<=500 ){
        document.getElementById("speed").innerHTML="speed=2.5x";
        song.rate(2.5);
    }

    }
if(leftwristscore>0.2){

    circle(leftwristx,leftwristy,20);
    In_number=Number(leftwristy);
    new_leftwristy=floor(In_number*2);
    new_leftwristybythousand=remove_decimal/1000;
    volume=leftwristy/1000*2;
    document.getElementById("vol").innerHTML="volume"+new_leftwristybythousand;
    song.setVolume(new_leftwristybythousand);
}
}
function play(){
song.play();
song.setVolume(1);
song.rate(1);
}



