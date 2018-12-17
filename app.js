const fields = document.querySelectorAll('.field');
const scoreBoard = document.querySelector('.score');
const bumps = document.querySelectorAll('.mrbump');
const game = document.querySelector('.game');
let score = 0;
let lastField;
let timeUp = false;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

function randomField(fields){
    const random = Math.floor(Math.random() * fields.length);
    const field = fields[random];

    if(field == lastField){
        return randomField(fields)
    }
lastField = field;
return field;

}

function peep(){
    const time = randomTime(400, 1000);
    const field = randomField(fields);
    
    field.classList.add('up');
    setTimeout(()=>{
        field.classList.remove('up');
        if(!timeUp) peep();
        else if (score < 10 && timeUp == true ){
            alert(`Game over! You whacked Mr Bump ${score} times.` )
        }else {alert(`Game over! You whacked Mr Bump ${score} times. You're just beating a dead body at this point.`)}
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    
    peep();
    setTimeout(() => timeUp = true, 10000);
    
  }
  
  function bonk(e) {
      console.log(e);
    if(!e.isTrusted) return;
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
  }
  
  bumps.forEach(bumps => bumps.addEventListener('click', bonk));


