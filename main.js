class Timer {
    constructor() {
        this.time = 0;
        this.element = null;
        this.control = true;
        this.callback = null;
    }
    set(time, id, callback) {
        this.time = time;
        this.element = document.getElementById(id);
        this.callback = callback;
    }
    start(type = 'COUNT_DOWN') {
        this.control = true;

        setTimeout(() => {
            if(type == 'COUNT_DOWN')
                this.countDown();
            else this.countUp();
        }, 1000);

    }

    format() {
        let hours = parseInt(this.time / 3600);
        let timeLeft = this.time - hours * 3600;
        let minutes = parseInt(timeLeft / 60);
        timeLeft = timeLeft - minutes * 60;
        let seconds = timeLeft;
    
        hours = hours.toString();
        minutes = minutes.toString();
        seconds = seconds.toString();
    
        if (hours.length == 1)
            hours = '0' + hours;
        if (minutes.length == 1)
            minutes = '0' + minutes;
        if (seconds.length == 1)
            seconds = '0' + seconds;
        
        return hours + ':' + minutes + ':' + seconds;
    }

    setCountUpLimit(limit) {
        this.countUpLimit = limit; 
    }

    countDown() {
        if(!this.control)
            return;
        let timerblock = this.element;
        timerblock.innerHTML = this.format();
        timerblock.style.display = 'block';

        if (this.time <= 59) {
            timerblock.style.color = 'red';
        }
    
        if (this.time <= 0) {
            timerblock.innerHTML = 'Time end!';
            this.callback();
            this.stop();
        }
        else {
            setTimeout(() => {
                this.countDown();
            }, 1000);
            this.time--;
        }
    }

    countUp() {
        if(!this.control)
            return;
        let timerblock = this.element;
        timerblock.innerHTML = this.format();
        timerblock.style.display = 'flex';
    
        if(this.countUpLimit <= this.time) {
            timerblock.innerHTML = 'Time end!';
            this.callback();
            this.stop();
        }
        else {
            setTimeout(() => {
                this.countUp();
            }, 1000);
            this.time++;
        }

    }

    stop() {
        this.control = false;
    }
}


var data = `
America
Balloon
Biscuit
Blanket
Chicken
Chimney
Country
Cupcake
Curtain
Diamond
Eyebrow
Fireman
Florida
Germany
Harpoon
Husband
Morning
Octopus
Popcorn
Printer
Sandbox
Skyline
Spinach 
Backpack
Basement
Building
Campfire
Complete
Elephant
Exercise
Hospital
Internet
Jalapeno
Mosquito
Sandwich
Scissors
Seahorse
Skeleton
Snowball
Sunshade
Treasure
Blueberry
Breakfast
Bubblegum
Cellphone
Dandelion
Hairbrush
Hamburger
Horsewhip
Jellyfish
Landscape
Nightmare
Pensioner
Rectangle
Snowboard
Spaceship
Spongebob
Swordfish
Telephone
Telescope
Broomstick
Commercial
Flashlight
Lighthouse
Lightsaber
Microphone
Photograph
Skyscraper
Strawberry
Sunglasses
Toothbrush
Toothpaste
blackberry
carrom
ludo
zombie
charger
macbook pro
pac-man
chair
bed
eye
ear
sketch book
paintings
fridge
sink
wifi
shorts
hanger
mirror
laptop
pillow
asterix
hashtag
flower
remote
router
Guddi-Chatkade
`;

let jsonData = [];
let words = data.split('\n');
console.log(words);

for(let i=0; i<words.length; i++) {
    let obj = {
        word: words[i]
    }
    jsonData.push(obj);
}
if(!localStorage.getItem('turns')) {
    localStorage.setItem('turns', 0);
}

const callback = () => {
    document.getElementById('timer').innerHTML = 'Stop!';
}

const generateRandomWords = () => {
    let noOfTurns = parseInt(localStorage.getItem('turns'));
    let numberOfWords = document.getElementById('numberOfWords').value;
    if(numberOfWords > 0) {
        let randomWords = [];
        let set = new Set();

        let upperLimit = jsonData.length;
        while(randomWords.length != numberOfWords) {
            let index = parseInt(Math.random()*100);
            if(!set.has(index)) {
                set.add(index);
                randomWords.push(jsonData[index].word);
            }
        }
        let container = document.getElementById('wordsContainer');
        container.innerHTML = '';
        let id = 'timerId' + parseInt(Math.random()*1000);
        let timerContainer = document.getElementById('timerContainer');
        let div = document.createElement('div');
        div.id = id;
        div.className = 'timer';
        timerContainer.innerHTML = '';
        timerContainer.appendChild(div);
        var timer = new Timer();
        let timeInSeconds = document.getElementById('timeInSeconds').value;
        if(timeInSeconds > 0) {
            timer.set(timeInSeconds, id, callback);
            for(let i=0; i<randomWords.length; i++) {
                let div = document.createElement('div');
                div.className = 'word';
                div.innerText = randomWords[i];
                container.appendChild(div);
            }
            noOfTurns++;
            localStorage.setItem('turns', noOfTurns);
            document.getElementById('noOfTurns').innerText = noOfTurns;
            timer.start();
        }
    }
}