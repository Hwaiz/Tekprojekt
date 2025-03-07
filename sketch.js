// Code written by Jacob Hwaiz and Valdemar Skytte
// Last edit: 07-03-2025

let date = -1;
let time = 0;
let realtime = 0;

let debug = false;

let timelength = 15000;

let mailOpen = false;
let workOpen = false;
let helpOpen = false;

let playerScore = 0;

let inMainGame = false;

let inNightScreen = false;
let fadingToBlack = false;
let fadingToScreen = false;
let screenShutdown = false;
let screenStartup = false;
let inAnimation = false;

let randomTimer = -1;
let shutdownTime = 1000;
let fadeTime = 1000;
let blackScreenTime = 1000;

//posts

let showPost = false;
let shownPostx = 0;
let shownPosti = 0;
let seenPost = [[],[],[],[],[],[],[],[],[],[]];

let postAnswerPRELOAD = [[],[],[],[],[],[],[],[],[],[]];
let postDifficultyPRELOAD = [[],[],[],[],[],[],[],[],[],[]];

let postsTitle = [[],[],[],[],[],[],[],[],[],[]];
let postAnswer = [[],[],[],[],[],[],[],[],[],[]];
let postDifficulty = [[],[],[],[],[],[],[],[],[],[]];
let postDate = [[0,2,4,6,8],[0,3,4,6,7],[2,3,5,7,9],[2,3,5,6,8],[2,3,4,6,7],[0,2,3,6,7],[0,3,4,5,6],[1,5,7,8,8],[3,4,6,7,8],[0,1,2,3,4,5]];

let accesablePosts = [];

//mails

let openMail = -1;
let accesableMail = [false,false,false];
let newMail = [false,false,false];
let sendDate = [-1,-1,-1];
let fiveShownMails = [-1,-1,-1,-1,-1];

let numOfMails = 2; //HUSK AT SKIFTE DETTE!!!!!!
let mailHeader;
let mailAuthor;
let mailText = [];

let anyNewMailBool = false;

let mailTextPRELOAD = [];

//help

let helpTextPRELOAD;
let helpText = "";

//start:
let overskriftFont_startup;
let fyldetekst;
let navn = "";
let underskriftsSkrivning;
let navnSelected = false;
let underskrift = [];
let introAfsluttet = false;

function preload() {
    overskriftFont_startup = loadFont('assets/Radley-Regular.ttf');
    fyldetekst = loadStrings("assets/yapsesh.txt");

    postsTitle[0] = loadStrings("/assets/posts/Reuters/postTitels.txt",handleData,handleFailure);
    postsTitle[1] = loadStrings("/assets/posts/DR/postTitels.txt",handleData,handleFailure);
    postsTitle[2] = loadStrings("/assets/posts/Sukkerbloggen/postTitels.txt",handleData,handleFailure);
    postsTitle[3] = loadStrings("/assets/posts/JoeRogan/postTitels.txt",handleData,handleFailure);
    postsTitle[4] = loadStrings("/assets/posts/LiveNews/postTitels.txt",handleData,handleFailure);
    postsTitle[5] = loadStrings("/assets/posts/Chanel87/postTitels.txt",handleData,handleFailure);
    postsTitle[6] = loadStrings("/assets/posts/BillionareBen/postTitels.txt",handleData,handleFailure);
    postsTitle[7] = loadStrings("/assets/posts/WakeUpDK/postTitels.txt",handleData,handleFailure);
    postsTitle[8] = loadStrings("/assets/posts/C5aT71f/postTitels.txt",handleData,handleFailure);
    postsTitle[9] = loadStrings("/assets/posts/Onion/postTitels.txt",handleData,handleFailure);

    postAnswerPRELOAD[0] = loadStrings("/assets/posts/Reuters/postAnswer.txt",handleData,handleFailure);
    postAnswerPRELOAD[1] = loadStrings("/assets/posts/DR/postAnswer.txt",handleData,handleFailure);
    postAnswerPRELOAD[2] = loadStrings("/assets/posts/Sukkerbloggen/postAnswer.txt",handleData,handleFailure);
    postAnswerPRELOAD[3] = loadStrings("/assets/posts/JoeRogan/postAnswer.txt",handleData,handleFailure);
    postAnswerPRELOAD[4] = loadStrings("/assets/posts/LiveNews/postAnswer.txt",handleData,handleFailure);
    postAnswerPRELOAD[5] = loadStrings("/assets/posts/Chanel87/postAnswer.txt",handleData,handleFailure);
    postAnswerPRELOAD[6] = loadStrings("/assets/posts/BillionareBen/postAnswer.txt",handleData,handleFailure);
    postAnswerPRELOAD[7] = loadStrings("/assets/posts/WakeUpDK/postAnswer.txt",handleData,handleFailure);
    postAnswerPRELOAD[8] = loadStrings("/assets/posts/C5aT71f/postAnswer.txt",handleData,handleFailure);
    postAnswerPRELOAD[9] = loadStrings("/assets/posts/Onion/postAnswer.txt",handleData,handleFailure);

    postDifficultyPRELOAD[0] = loadStrings("/assets/posts/Reuters/postDifficulty.txt",handleData,handleFailure);
    postDifficultyPRELOAD[1] = loadStrings("/assets/posts/DR/postDifficulty.txt",handleData,handleFailure);
    postDifficultyPRELOAD[2] = loadStrings("/assets/posts/Sukkerbloggen/postDifficulty.txt",handleData,handleFailure);
    postDifficultyPRELOAD[3] = loadStrings("/assets/posts/JoeRogan/postDifficulty.txt",handleData,handleFailure);
    postDifficultyPRELOAD[4] = loadStrings("/assets/posts/LiveNews/postDifficulty.txt",handleData,handleFailure);
    postDifficultyPRELOAD[5] = loadStrings("/assets/posts/Chanel87/postDifficulty.txt",handleData,handleFailure);
    postDifficultyPRELOAD[6] = loadStrings("/assets/posts/BillionareBen/postDifficulty.txt",handleData,handleFailure);
    postDifficultyPRELOAD[7] = loadStrings("/assets/posts/WakeUpDK/postDifficulty.txt",handleData,handleFailure);
    postDifficultyPRELOAD[8] = loadStrings("/assets/posts/C5aT71f/postDifficulty.txt",handleData,handleFailure);
    postDifficultyPRELOAD[9] = loadStrings("/assets/posts/Onion/postDifficulty.txt",handleData,handleFailure);

    mailHeader = loadStrings("/assets/mails/mailHeader.txt",handleData,handleFailure);
    mailAuthor = loadStrings("/assets/mails/mailAuthor.txt",handleData,handleFailure);

    helpTextPRELOAD = loadStrings("/assets/helpscreen.txt",handleData,handleFailure);

    //load mailTexts
    for (let i = 0; i < numOfMails; i++) {
        mailTextPRELOAD.push(loadStrings(`/assets/mails/mailText${i}.txt`,handleData,handleFailure));
    }
}

function setup() {
	createCanvas(windowWidth, windowHeight); textFont('Verdana');

    reWritePostAnsAndDif();
    reWriteMailText();
    reWriteHelpText();

    sendMails();
    anyNewMail();
}

function draw() {
    background(255);

    if(!introAfsluttet) {
        startup();
    }
    
    if (inMainGame) {
        mainGame();
    }

    if (randomTimer != -1) {
        randomTimer = randomTimer+deltaTime;
        dayShift();
    }

    if (debug) {
        drawDebug();
    }

    if (fadingToBlack === true) {
        fill(0,255*fadeInFunc((randomTimer+2)/fadeTime));
        rect(0,0,windowWidth,windowHeight);
    } else if (fadingToScreen === true) {
        fill(0,255*fadeOutFunc((randomTimer+2)/fadeTime));
        rect(0,0,windowWidth,windowHeight);
    } else if (inNightScreen === true) {
        fill(0);
        rect(0,0,windowWidth,windowHeight);
    }
}

function startup() { //ansættelse
    //UI
        fill(255);
        centerRect(windowWidth/2, windowHeight/2, 580, 800);
        fill(0); textAlign(CENTER, CENTER); textSize(75); textFont(overskriftFont_startup);
        text("ANSØGNING", windowWidth/2, windowHeight/2-310);
        textSize(18); textFont('Courier New'); textStyle(ITALIC);
        for(let i = 0; i < fyldetekst.length; i++) { text(fyldetekst[i], windowWidth/2, windowHeight/2-145+i*40); }
        textAlign(LEFT, CENTER); textSize(20);
        text("NAVN:", windowWidth/2-250, windowHeight/2-210);
        text("UNDERSKRIFT:", windowWidth/2-250, windowHeight/2+200);
        fill(245, 251, 255);
        centerRect(windowWidth/2+40, windowHeight/2-210, 420, 30); //navn boks
        centerRect(windowWidth/2, windowHeight/2+280, 500, 100); //ansøgning boks
 
    //clicks
        if(mouseX > windowWidth/2+290+100-80 && mouseX < windowWidth/2+290+100+80 && mouseY > windowHeight/2+400-25-25 && mouseY < windowHeight/2+400-25+25) {
            fill(255,50,50)
            if(mouseIsPressed) {
                inAnimation = true;
                screenShutdown = true;
                randomTimer = 0;
            }
        } else { fill(255,100,100);}
 
        centerRect(windowWidth/2+290+100, windowHeight/2+400-25, 160, 50); //indsend knap
        fill(0); textFont("Verdana"); textStyle(NORMAL); textAlign(CENTER, CENTER);
        text("INDSEND", windowWidth/2+290+100, windowHeight/2+400-25);
 
        if(mouseX > windowWidth/2+40-210 && mouseX < windowWidth/2+40+210 && mouseY > windowHeight/2-210-15 && mouseY < windowHeight/2-210+15 && mouseIsPressed) {
            navnSelected = true;
        } else if (mouseIsPressed) {
            navnSelected = false;
        }
        if(mouseX > windowWidth/2-250 && mouseX < windowWidth/2+250 && mouseY > windowHeight/2+280-50 && mouseY < windowHeight/2+280+50 && mouseIsPressed) {
            navnSelected = false;
            underskriftsSkrivning = true;
            underskrift.push([mouseX, mouseY]);
        } if(!mouseIsPressed) {
            if(underskriftsSkrivning === true) {underskrift.push("break")}
            underskriftsSkrivning = false;
        }
 
    //Navn tekstboks
        fill(0); textFont("Verdana"); textStyle(NORMAL); textAlign(LEFT,CENTER);
        if(navnSelected) { line(windowWidth/2+44-210, windowHeight/2-210-10, windowWidth/2+44-210, windowHeight/2-210+10); }
        text(navn, windowWidth/2+44-207, windowHeight/2-210+1);
 
    //tegn underskrift
        for(let i = 0; i < underskrift.length; i++) {  if(i !== 0) {
                if(underskrift[i] === "break") {} else if(underskrift[i-1] === "break") {} else {
                line(underskrift[i][0],underskrift[i][1], underskrift[i-1][0],underskrift[i-1][1]); }
           }}
        strokeWeight(1);
}
 
function keyPressed() {
    if(navnSelected === true) {
        if(key === "Backspace") { navn = navn.slice(0,-1);
        } else if(key.split("").length === 1) { navn+=key;}
    }
}

function mainGame() {
    introAfsluttet = true;
    textSize(12);
    drawScreen();

    realtime = realtime+deltaTime;
    time = (realtime-(realtime%timelength))/timelength;

    if(time === 18){
        powerButtonClicked();
    }
}

function drawDebug() {
    textAlign(LEFT,TOP);
    fill(0);

    text("playerScore: " + playerScore,50,30);
    text("realtime: " + realtime,50,45);
    text("timer: " + randomTimer,50,60);
    text("inNightScreen: " + inNightScreen,50,75);
    text("fadingToBlack: " + fadingToBlack,50,90);
    text("fadingToScreen: " + fadingToScreen,50,105);
    text("screenShutdown: " + screenShutdown,50,120);
    text("screenStartup: " + screenStartup,50,135);
    text("inAnimation: " + inAnimation,50,150);
    text("inMainGame: " + inMainGame,50,165);
    text("introAfsluttet: " + introAfsluttet,50,180);
}

function drawScreen() {
    if (inAnimation === false) {
        textAlign(CENTER, CENTER);

        //draw screen outer edge
        fill(50);
        centerRect(windowWidth/2,windowHeight/2,850,650);
        
        //draw screen background
        fill(211, 224, 230);
        centerRect(windowWidth/2,windowHeight/2,800,600);
        
        //draw taskbar
        fill(169, 190, 199);
        centerRect(windowWidth/2,windowHeight/2+260,800,80);

        //draw powerbutton
        fill(152, 170, 179);
        centerRect(windowWidth/2-360,windowHeight/2+260,80,80);
        fill(0);
        text("power",windowWidth/2-360,windowHeight/2+260);

        //draw mailbutton
        fill(152, 170, 179);
        centerRect(windowWidth/2-160,windowHeight/2+260,80,80);
        fill(0);
        text("mail",windowWidth/2-160,windowHeight/2+260);

        //draw workbutton
        fill(152, 170, 179);
        centerRect(windowWidth/2,windowHeight/2+260,80,80);
        fill(0);
        text("work",windowWidth/2,windowHeight/2+260);

        //draw helpbutton
        fill(152, 170, 179);
        centerRect(windowWidth/2+160,windowHeight/2+260,80,80);
        fill(0);
        text("help",windowWidth/2+160,windowHeight/2+260);

        //draw dates
        fill(152, 170, 179);
        centerRect(windowWidth/2+360,windowHeight/2+260,80,80);
        fill(0);
        text("day " + str(date+1),windowWidth/2+360,windowHeight/2+255);
        text(timeNumToStr(time),windowWidth/2+360,windowHeight/2+270);

        //draw mailScreen
        if (mailOpen === true) {
            //draw topbar
            fill(152, 170, 179);
            centerRect(windowWidth/2,windowHeight/2-280,800,40);
            fill(222, 80, 92);
            centerRect(windowWidth/2+380,windowHeight/2-280,20,20);
            fill(0);
            text("X",windowWidth/2+380,windowHeight/2-280);
            fill(0);
            text("Mail",windowWidth/2,windowHeight/2-280);

            //draw main screen
            fill(169, 190, 199);
            rect(windowWidth/2-400,windowHeight/2-260,800,480);

            if(openMail === -1){
                for (let i = 0; i < numOfMailsShownOnScreen(); i++) {
                    fill(152, 170, 179);
                    centerRect(windowWidth/2,windowHeight/2-200+(i*85),500,75);

                    if (newMail[fiveShownMails[i]] === true) {
                        fill(222, 80, 92);
                        circle(windowWidth/2+250,windowHeight/2-237+(i*85),20);
                    }
    
                    textAlign(LEFT,CENTER);
                    textSize(18);
                    fill(0);
                    text(mailHeader[fiveShownMails[i]],windowWidth/2-235,windowHeight/2-200+(i*85)-15);
    
                   textSize(12);
                    text(mailAuthor[fiveShownMails[i]],windowWidth/2-235,windowHeight/2-200+(i*85)+15);
                }
            } else {
                fill(152, 170, 179);
                centerRect(windowWidth/2,windowHeight/2-20,500,400);

                centerRect(windowWidth/2-300,windowHeight/2-205,30,30);

                fill(0);

                textAlign(CENTER, TOP);
                textSize(18);
                text(mailHeader[openMail],windowWidth/2,windowHeight/2-200);

                textSize(14);
                textAlign(LEFT, TOP);
                text(mailText[openMail],windowWidth/2-220,windowHeight/2-140,450,310);

                textAlign(CENTER, CENTER);
                textSize(12);
                text("Sent by: " + mailAuthor[openMail],windowWidth/2,windowHeight/2-170);

                text("back",windowWidth/2-300,windowHeight/2-205);
            
            }
        }

        //draw workScreen
        if (workOpen === true) {
            //draw topbar
            textAlign(CENTER, CENTER);
            fill(152, 170, 179);
            centerRect(windowWidth/2,windowHeight/2-280,800,40);
            fill(222, 80, 92);
            centerRect(windowWidth/2+380,windowHeight/2-280,20,20);
            fill(0);
            text("X",windowWidth/2+380,windowHeight/2-280);
            fill(0);
            text("Work",windowWidth/2,windowHeight/2-280);

            //draw main screen
            fill(169, 190, 199);
            rect(windowWidth/2-400,windowHeight/2-260,800,480);

            //if no post is shown:
            if (showPost === false) {
                if (JSON.stringify(avalablePosts()) === JSON.stringify([])) {
                    fill(0);
                    text("No posts left. Click power and come back tomorrow",windowWidth/2,windowHeight/2);
                } else {
                    fill(152, 170, 179);
                    centerRect(windowWidth/2,windowHeight/2,100,80);
                    fill(0);
                    text("New Post",windowWidth/2,windowHeight/2);
                }
            } else {
                fill(152, 170, 179);
                centerRect(windowWidth/2,windowHeight/2,500,300);
                fill(222, 80, 92);
                centerRect(windowWidth/2-120,windowHeight/2+185,200,40);
                fill(0);
                text("Fake",windowWidth/2-120,windowHeight/2+185)
                fill(79, 219, 107);
                centerRect(windowWidth/2+120,windowHeight/2+185,200,40);
                fill(0);
                text("Real",windowWidth/2+120,windowHeight/2+185)
                
                textAlign(CENTER, TOP);
                text(postsTitle[shownPostx][shownPosti],windowWidth/2-200,windowHeight/2-110,400);
                text(postxToAuthor(shownPostx),windowWidth/2,windowHeight/2-130);
            }
        }

        //draw helpScreen
        if (helpOpen === true) {
            //draw topbar
            fill(152, 170, 179);
            centerRect(windowWidth/2,windowHeight/2-280,800,40);
            fill(222, 80, 92);
            centerRect(windowWidth/2+380,windowHeight/2-280,20,20);
            fill(0);
            text("X",windowWidth/2+380,windowHeight/2-280);
            fill(0);
            text("Help",windowWidth/2,windowHeight/2-280);

            //draw main screen
            textAlign(LEFT, TOP);
            fill(169, 190, 199);
            rect(windowWidth/2-400,windowHeight/2-260,800,480);
            fill(0);
            text(helpText,windowWidth/2-380,windowHeight/2-240,380*2,240*2);
        }

        if (anyNewMailBool === true) {
            fill(222, 80, 92);
            circle(windowWidth/2-120,windowHeight/2+220,20);
            // windowWidth/2-160 windowHeight/2+260
        }

    } else if (screenShutdown === true || fadingToBlack === true) {
        //draw screen outer edge
        fill(50);
        centerRect(windowWidth/2,windowHeight/2,850,650);
        
        //draw screen background
        fill(152, 170, 179);
        centerRect(windowWidth/2,windowHeight/2,800,600);

        fill(0);
        textAlign(CENTER, CENTER);
        text("Shuting down...",windowWidth/2,windowHeight/2);
    } else if (screenStartup === true || fadingToScreen === true) {
        //draw screen outer edge
        fill(50);
        centerRect(windowWidth/2,windowHeight/2,850,650);
        
        //draw screen background
        fill(152, 170, 179);
        centerRect(windowWidth/2,windowHeight/2,800,600);

        fill(0);
        textAlign(CENTER, CENTER);
        text("Starting up...",windowWidth/2,windowHeight/2);
    } 
}

function dayShift() {
    if (randomTimer >= shutdownTime) {
        if (screenStartup === true) {
            screenStartup = false;
            inAnimation = false;
            randomTimer = -1;
        } else if (fadingToScreen === true) {
            fadingToScreen = false;
            screenStartup = true;
            randomTimer = 0;
        } else if (inNightScreen === true) {
            if (inMainGame = true) {
                inNightScreen = false;
                fadingToScreen = true;
                randomTimer = 0;
                realtime = 0;
                date++;
            } else {
                inMainGame = true;
            }
        } else if (fadingToBlack === true) {
            fadingToBlack = false;
            inNightScreen = true;
            randomTimer = 0;
        } else if(screenShutdown === true) {
            screenShutdown = false;
            fadingToBlack = true;
            randomTimer = 0;
        } 
    }
}

function scorePlayer(answer,x,i) {
    let score = 0;

    if (answer === postAnswer[x][i]) {
        score = postDifficulty[x][i];
    } else {
        score = postDifficulty[x][i]-6;
    }

    playerScore = playerScore+score;
}

function choosePost() {
    let p = [];

    p = random(avalablePosts());

    shownPostx = p[0];
    shownPosti = p[1];
}

function avalablePosts() {
    let l = [];

    for (let x = 0; x < 10; x++) {
        for (let i = 0; i < 5; i++) {
            if (postDate[x][i] <= date) {
                if (seenPost[x][i] === false) {
                    l.push([x,i]);
                }
            }
        }
    }

    return(l);
}

function sendMails() {
    if (date >= 0 && accesableMail[0] === false) {
        accesableMail[0] = true;
        newMail[0] = true;
        sendDate[0] = date;
    }

    if (playerScore < -3 && accesableMail[1] === false) {
        accesableMail[1] = true;
        newMail[1] = true;
        sendDate[1] = date;
    }
}

function anyNewMail() {
    anyNewMailBool = false;

    for (let i = 0; i < newMail.length; i++) {
        if (newMail[i] === true) {
            anyNewMailBool = true;
        }
    }
}

function postxToAuthor(x){
    let s = "ERROR WITH AUTHOR";

    if (x === 0) { s = "Reuters"; }
    else if (x === 1) { s = "DR"; }
    else if (x === 2) { s = "Sukkerbloggen"; }
    else if (x === 3) { s = "JoeRogan"; }
    else if (x === 4) { s = "LiveNews"; }
    else if (x === 5) { s = "Chanel87"; }
    else if (x === 6) { s = "Billionare Ben"; }
    else if (x === 7) { s = "WakeUpDK"; }
    else if (x === 8) { s = "C5aT71f"; }
    else if (x === 9) { s = "Onion"; }

    return(s);
}

function sortMails() {
    let b = [-1,-1,-1,-1,-1];
    let e = [accesableMail[0]];
    
    for (let i = 1; i < accesableMail.length; i++) {
        e.push(accesableMail[i]);
    }

    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < e.length; i++) {
            if (b[j] === -1 && e[i] === true) {
                b[j] = i;
            } else if (e[i] === true) {
                if (sendDate[i] > sendDate[b[j]]) {
                    b[j] = i;
                }
            }
        }
        e[b[j]] = false;
    }

    fiveShownMails[0] = b[0];
    fiveShownMails[1] = b[1];
    fiveShownMails[2] = b[2];
    fiveShownMails[3] = b[3];
    fiveShownMails[4] = b[4];
}

function timeNumToStr (t) {
    let s1 = 0;
    let s2 = "";

    s1 = ((t-(t % 2))/2)+7;

    if (t % 2 === 1) {
        s2 = ":30";
    } else {
        s2 = ":00";
    }

    return(str(s1) + s2);
}

function reWritePostAnsAndDif() {
    for (let x = 0; x < 10; x++ ) {

        let l1 = [false,false,false,false,false];
        let l2 = [1,1,1,1,1];

        for (let i = 0; i < postsTitle[x].length; i++ ) {
            if(postAnswerPRELOAD[x][i] === "f"){
                l1[i] = false;
            } else {
                l1[i] = true;
            }
    
            if(postDifficultyPRELOAD[x][i] === "1"){
                l2[i] = 1;
            } else if (postDifficultyPRELOAD[x][i] === "2") {
                l2[i] = 2;
            } else if (postDifficultyPRELOAD[x][i] === "3") {
                l2[i] = 3;
            } else if (postDifficultyPRELOAD[x][i] === "4") {
                l2[i] = 4;
            } else {
                l2[i] = 5;
            }
        }

        postAnswer[x] = l1;
        postDifficulty[x] = l2;
    }

    for (let x = 0; x < 10; x++) {
        for(let i = 0; i < 5; i++) {
            seenPost[x][i] = false;
        }
    }
}

function reWriteMailText() {
    for (let i = 0; i < numOfMails; i++){
        let s = "";

        for (let u = 0; u < mailTextPRELOAD[i].length; u++) {
            s = s + mailTextPRELOAD[i][u] + `\n`;
        }

        mailText.push(s);
    }
}

function reWriteHelpText() {
    let s = "";

    for (let i = 0; i < helpTextPRELOAD.length; i++) {
        s = s + helpTextPRELOAD[i] + `\n`;
    }

    helpText = s;
}

function mouseClicked() {
    if (mouseY > windowHeight/2+220 && mouseY < windowHeight/2+300 && inMainGame) {
        if (mouseX > windowWidth/2-400 && mouseX < windowWidth/2-320) {powerButtonClicked();}
        else if (mouseX > windowWidth/2-200 && mouseX < windowWidth/2-120) {mailButtonClicked();}
        else if (mouseX > windowWidth/2-40 && mouseX < windowWidth/2+40) {workButtonClicked();}
        else if (mouseX > windowWidth/2+120 && mouseX < windowWidth/2+200) {helpButtonClicked();}
    }

    if(mailOpen === true) {
        if (mouseX < windowWidth/2+390 && mouseX > windowWidth/2+370 && mouseY < windowHeight/2-270 && mouseY > windowHeight/2-290) {
            mailOpen = false;
        }

        if (openMail === -1) {
            for(let i = 0; i < 5; i++){
                if (inCenterRect(mouseX,mouseY,windowWidth/2,windowHeight/2-200+(i*85),500,75)) {
                    openMail = fiveShownMails[i];
                    newMail[fiveShownMails[i]] = false;
                    anyNewMail();
                }
            }
        } else {
            if (inCenterRect(mouseX,mouseY,windowWidth/2-300,windowHeight/2-205,30,30)) {
                openMail = -1;
            }
        }
    }

    if(workOpen === true) {
        if (mouseX < windowWidth/2+390 && mouseX > windowWidth/2+370 && mouseY < windowHeight/2-270 && mouseY > windowHeight/2-290) {
            workOpen = false;
        }

        if (showPost === false) {   
            if (mouseX < windowWidth/2+50 && mouseX > windowWidth/2-50 && mouseY < windowHeight/2+40 && mouseY > windowHeight/2-40 && JSON.stringify(avalablePosts()) != JSON.stringify([])) {
                showPost = true;
                choosePost();
            }
        } else {
            if (inCenterRect(mouseX,mouseY,windowWidth/2-120,windowHeight/2+185,200,40)) { //player clicked 'Fake'
                showPost = false;
                scorePlayer(false,shownPostx,shownPosti);
                seenPost[shownPostx][shownPosti] = true;
            }

            if (inCenterRect(mouseX,mouseY,windowWidth/2+120,windowHeight/2+185,200,40)) { //player clicked 'Real'
                showPost = false;
                scorePlayer(true,shownPostx,shownPosti);
                seenPost[shownPostx][shownPosti] = true;
            }
        }
    }
    
    if(helpOpen === true) {
        if (mouseX < windowWidth/2+390 && mouseX > windowWidth/2+370 && mouseY < windowHeight/2-270 && mouseY > windowHeight/2-290) {
            helpOpen = false;
        }
    }
}

function fadeInFunc(t) {
    return(t);
}

function fadeOutFunc(t) {
    return(-t+1);
}

function numOfAccMail(){
    let n = 0;

    for(let i = 0; i < accesableMail.length; i++){
        if (accesableMail[i] === true){
            n++;
        }
    }

    return(n);
}

function numOfMailsShownOnScreen() {
    let n = 0;
    
    for(let i = 0; i < 5; i++){
        if (fiveShownMails[i] != -1) {
            n++;
        }
    }

    return(n);
}

function powerButtonClicked() {
    //load next day
    inAnimation = true;
    screenShutdown = true;
    randomTimer = 0;
    sendMails();
    anyNewMail();

    mailOpen = false;
    workOpen = false;
    helpOpen = false;
}

function mailButtonClicked() {
    mailOpen = true;
    helpOpen = false;
    workOpen = false;
    openMail = -1;

    sortMails();
}

function workButtonClicked() {
    workOpen = true;
    helpOpen = false;
    mailOpen = false;
}

function helpButtonClicked() {
    helpOpen = true;
    workOpen = false;
    mailOpen = false;
}

function inCenterRect(X,Y,x,y,w,h) {
    let k = false;

    if (X < x+(w/2) && X > x-(w/2) && Y < y+(h/2) && Y > y-(h/2)) {k = true;}

    return (k);
}

function handleData(data) {
    console.log("succesfully loaded posts")
}

function handleFailure(Error) {
    console.error('ERROR: ', Error);
}

function centerRect(x,y,w,h) { rect(x-(w/2),y-(h/2),w,h); }