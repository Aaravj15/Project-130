song1 = "";
song2 = "";
leftWristX = 0;
lefttWristY = 0;
rightWristX = 0;
rightWrsitY = 0;
song1_status = "";
song2_status = "";
function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("modelLoaded");
}

    if(score_leftWrist > 0.2)
    {
    circle(leftWristX, leftWristY, 20);
    song1.stop();
    if(song2_status == false)
    {
        song2.play();
        document.getElementById("song").innerHTML = "Playing Peter Pan song";
    }
    }

function draw()
{
    image(video, 0, 0, 600, 500);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    fill('#FF0000');
    stroke('#000000');
    if(score_rightWrist > 0.2)
    {
    circle(rightWristX, rightWrsitY, 20);
    song2.stop();
    if(song1_status == false)
    {
        song1.play();
        document.getElementById("song").innerHTML = "Playing Harry Potter song";
    }
    }
    if(score_rightWrist > 0.2)
    {
    circle(rightWristX, rightWristY, 20);
    circle(rightWristX, rightWrsitY, 20);
    song2.stop();
    if(rightWristY > 0 && rightWristY <= 100)
    {
         document.getElementById("speed").innerHTML = "speed = 0.5x";
         song.rate(0.5);
    }

    else if(rightWristY > 100 && rightWristY <= 200)
    {
        document.getElementById("speed").innerHTML = "speed = 1x";
        song.rate(1);
    }

    else if(rightWristY > 200 && rightWristY <= 300)
    {
        document.getElementById("speed").innerHTML = "speed = 1.5x";
        song.rate(1.5);
    }

    else if(rightWristY > 300 && rightWristY <= 400)
    {
        document.getElementById("speed").innerHTML = "speed = 2x";
        song.rate(2);
    }

    else if(rightWristY > 400 && rightWristY <= 500)
    {
        document.getElementById("speed").innerHTML = "speed = 2.5x";
        song.rate(2.5);
    }
    }

    if(score_leftWrist > 0.2)
    {
    circle(leftWristX, leftWristY, 20);
    song1.stop();
    if(song2_status == false)
    {
        song2.play();
        document.getElementById("song").innerHTML = "Playing Peter Pan song";
    }
    }

}


function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results)
{
      if(results.length>0)
      {
          console.log(results);
           
           score_leftWrist = results[0].pose.keypoints[9].score;
           console.log("score_leftWrist = " + score_leftWrist);

           score_rightWrist = results[0].pose.keypoints[10].score;
           console.log("score_rightWrist = " + score_rightWrist);

          leftWristX = results[0].pose.leftWrist.x;
          leftWristY = results[0].pose.leftWrist.y;
          console.log("leftWristX" + leftWristX + "leftWristY" + leftWristY);

          console.log(results);
          rightWristX = results[0].pose.rightWrist.x;
          rightWristY = results[0].pose.rightWrist.y;
          console.log("rightWristX" + rightWristX + "rightWristY" + rightWristY);
      }
}