window.addEventListener('load',function(){

    const game=document.querySelector("#game");
    const gameBoard=document.querySelector("#gameBoard");
    const rang=document.querySelector("#rang");
    const menu=document.querySelector("#menu");
    const score=document.querySelector("#score");
    const best=document.querySelector("#best");
    const play=document.querySelector("#play");

    const width=window.innerWidth;
    const height=window.innerHeight;

    gameBoard.style.height=height-100+'px';

    var status=false;
    var timeBird=100;
    const birdStep=5;
    var timePip=100;
    const pipStep=5;
    var birdInterval;
    var pipeInterval;
    var RANG=0;
    var xBird=50;
    var yBird=50;
    const wBird=35;
    const hBird=30;

    var xPip1,yPip1;
    var xPip2,yPip2;
    var xPip3,yPip3;
    var wPip=50;
    var hPip1u,hPip1d;
    var hPip2u,hPip2d;
    var hPip3u,hPip3d;



    const bird=document.createElement("div");
        bird.classList.add("bird");

    const pip_up1=document.createElement("div");
        pip_up1.classList.add("pip-up");
    const pip_up2=document.createElement("div");
        pip_up2.classList.add("pip-up");
    const pip_up3=document.createElement("div");
        pip_up3.classList.add("pip-up");

    const pip_down1=document.createElement("div");
        pip_down1.classList.add("pip-down");
    const pip_down2=document.createElement("div");
        pip_down2.classList.add("pip-down");
    const pip_down3=document.createElement("div");
        pip_down3.classList.add("pip-down");

        

    play.addEventListener("click",function(){
        menu.classList.add("hidden");
        game.classList.remove("blur");
        rang.innerText=RANG;
        status=true;

        startGame();

        addPip();
        
    });

    function addPip(){
     

        //pip-1
        xPip1=-50;
        hPip1u=Math.floor(50+Math.random()*((height-100)/2-50))-25;
        pip_up1.style.height=`${hPip1u}px`;
        pip_up1.style.right=`${xPip1}px`;
        gameBoard.appendChild(pip_up1);

        hPip1d=Math.floor(50+Math.random()*((height-100)/2-50))-25;
        pip_down1.style.height=`${hPip1d}px`;
        pip_down1.style.right=`${xPip1}px`;
        gameBoard.appendChild(pip_down1);


        //pip-2
        xPip2=-200;
        hPip2u=Math.floor(50+Math.random()*((height-100)/2-50))-25;
        pip_up2.style.height=`${hPip2u}px`;
        pip_up2.style.right=`${xPip2}px`;
        gameBoard.appendChild(pip_up2);
        hPip2d=Math.floor(50+Math.random()*((height-100)/2-50))-25;
        pip_down2.style.height=`${hPip2d}px`;
        pip_down2.style.right=`${xPip2}px`;
        gameBoard.appendChild(pip_down2);

        //pip-3
        xPip3=-350;
        hPip3u=Math.floor(50+Math.random()*((height-100)/2-50))-25;
        pip_up3.style.height=`${hPip3u}px`;
        pip_up3.style.right=`${xPip3}px`;
        gameBoard.appendChild(pip_up3);
        hPip3d=Math.floor(50+Math.random()*((height-100)/2-50))-25;
        pip_down3.style.height=`${hPip3d}px`;
        pip_down3.style.right=`${xPip3}px`;
        gameBoard.appendChild(pip_down3);
       

    }

    function flapPipLeft(){
        
        pipeInterval=setInterval(function(){

            
            if(width-xPip1<=(-1*wPip)){
                xPip1=-50;
                hPip1u=Math.floor(50+Math.random()*((height-100)/2-50))-25;
                pip_up1.style.height=`${hPip1u}px`;
                hPip1d=Math.floor(50+Math.random()*((height-100)/2-50))-25;
                pip_down1.style.height=`${hPip1d}px`;
            }else{
                xPip1+=pipStep;
            }

            pip_up1.style.right=`${xPip1}px`;
            pip_down1.style.right=`${xPip1}px`;

            if(width-xPip2<=(-1*wPip)){
                xPip2=-50;
                hPip2u=Math.floor(50+Math.random()*((height-100)/2-50))-25;
                pip_up2.style.height=`${hPip2u}px`;
                hPip2d=Math.floor(50+Math.random()*((height-100)/2-50))-25;
                pip_down2.style.height=`${hPip2d}px`;
            }else{
                xPip2+=pipStep;
            }

            pip_up2.style.right=`${xPip2}px`;
            pip_down2.style.right=`${xPip2}px`;

            if(width-xPip3<=(-1*wPip)){
                xPip3=-50;
                hPip3u=Math.floor(50+Math.random()*((height-100)/2-50))-25;
                pip_up3.style.height=`${hPip3u}px`;
                hPip3d=Math.floor(50+Math.random()*((height-100)/2-50))-25;
                pip_down3.style.height=`${hPip3d}px`;
                
            }else{
                xPip3+=pipStep;
            }

            pip_up3.style.right=`${xPip3}px`;
            pip_down3.style.right=`${xPip3}px`;

            if(RANG<10){
                RANG++;
            }else{
                rang.innerText=parseInt(rang.innerText)+Math.floor(RANG/10);
                RANG=0;
            }

            Control();


        },timePip);
    }


    function Control(){
        if((xBird+wBird)==width-(xPip1+wPip) && (yBird+hBird<=hPip1u || yBird+hBird>=height-100-hPip1d)){
                    gameOver();
                }
        if((xBird+wBird)==width-(xPip2+wPip) && (yBird+hBird<=hPip2u || yBird+hBird>=height-100-hPip2d)){
                    gameOver();
                }
        if((xBird+wBird)==width-(xPip3+wPip) && (yBird+hBird<=hPip3u || yBird+hBird>=height-100-hPip3d)){
                    gameOver();
                }

    }

    window.addEventListener("click",function(){

        if(status){
            flapUp();
        }
    });

    function startGame(){
        birdCords(xBird,yBird);
        gameBoard.appendChild(bird);

        flapDown();
        flapPipLeft();
    }

    function birdCords(x,y){
        bird.style.transform=`translate(${x}px, ${y}px)`;
    }

    
    function flapDown(){

        birdInterval=setInterval(function(){

            if(yBird<= height-hBird-100){
                yBird+=birdStep;
                birdCords(xBird,yBird);
            }else{
                gameOver();
            }

        }, timeBird);
       
    }

    function flapUp(){

            if(yBird>hBird){
                yBird-=(birdStep*5);
                birdCords(xBird,yBird);
            }
  
    }

    function gameOver(){
        clearInterval(birdInterval);
        clearInterval(pipeInterval);
        menu.classList.remove("hidden");
        game.classList.add("blur");
        score.innerText=rang.innerText;
    }

});