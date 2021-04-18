let playing = false;
let currentPlayer = 1;
const timerPanel = document.querySelector('.jogador');
const buttons = document.querySelectorAll('.bttn');
//efeitos sonoros
const timesUp = new Audio('audio/450617__breviceps__8-bit-time-s-up.wav');
const click = new Audio('audio/523087__magnuswaker__gun-hammer-click.wav');


// add a leading zero to numbers less than 10
const padZero = (number) => {
    if (number < 10){
        return '0' + number;
    }
    return number;
}

//avisa o jogador se o timer cair abaixo de 30 segundos
const timeWarning = (player, min, sec) => {
    if (min < 1 && sec <= 30){
        if (player === 1){
            document.querySelector('.jogador_one .digitos_timer').style.color = '#cc0000';
        } else{
            document.querySelector('.jogador_two .digitos_timer').style.color = '#cc0000';
        }
    }
}

//classe do timer
class Timer{
    constructor(player, minutes) {
        this.player = player;
        this.minutos = minutes;
    }
    getMinutes(timeId) {
        return document.getElementById(timeId).textContent;
    }
}

// cria uma instancia do timer para cada jogador
let p1time = new Timer('min1', document.getElementById('min1').textContent);
let p2time = new Timer('min2', document.getElementById('min2').textContent);

//troca os timer dos jogadores apos um movimento
const swapPlayer = () => {
    if (!playing) return;
    //sinal para o jogador atual
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    //toca o som de clique
    click.play();
}

//começa o timer do 0
const startTimer = () => {
    playing = true;
    let p1sec = 60;
    let p2sec = 60;

    let timerId = setInterval(function(){
        //jodador 1
        if (currentPlayer === 1){
            if (playing){
                buttons[0].disabled = true;
                p1time.minutes = parseInt(p1time.getMinutes('min1'), 10);
                if(p1sec === 60){
                    p1time.minutes = p1time.minutes - 1;
                }
                p1sec = p1sec - 1;
                timeWarning(currentPlayer, p1time.minutes, p1sec);
                document.getElementById('sec1').textContent = padZero(p1sec);
                document.getElementById('min1').textContent = padZero(p1time.minutes);
                if (p1sec === 0){
                    // se o timer chegar a zero ele tem que parar
                     if (p1sec === 0 && p1time.minutes === 0){
                         // toca um sinal
                         timesUp.play();
                         //para o contador
                         clearInterval(timerId);
                         playing = false;
                     }
                     p1sec = 60;
                    }
                }
            } else {
                //jogador 2
                if (playing){
                    p2time.minutes = parseInt(p2time.getMinutes('min2'), 10);
                    if(p2sec === 60){
                        p2time.minutes = p2time.minutes - 1;
                    }
                    p2sec = p2sec - 1;
                    timeWarning(currentPlayer, p2time.minutes, p2sec);
                    document.getElementById('sec2').textContent = padZero(p2sec);
                    document.getElementById('min2').textContent = padZero(p2time.minutes);
                    if (p2sec === 0){
                        // se o timer chegar a zero ele tem que parar
                         if (p2sec === 0 && p2time.minutes === 0){
                             // toca um sinal
                             timesUp.play();
                             //para o contador
                             clearInterval(timerId);
                             playing = false;
                         }
                         p2sec = 60;
                    }
            }
        }
    }, 1000);
}

// procura um clique do mouse ou toque na tela para trocar de timer
timerPanel.addEventListener('click', swapPlayer);

// repete entre os botoes start e reset
for (let i =0; i < buttons.length; i++){
    buttons[i].addEventListener('click', () => {
        if (buttons[i].textContent === 'START') {
            // torna o botao para cinza significando desabilitado
            buttons[i].style.color = '#eee';
            buttons[i].style.backgroundColor = '#606060';
            startTimer();
        }else{
            //reseta tudo atualizando a pagina
            location.reload(true);
        }
    });
}

// procura o apertar da barra de espaço
document.addEventListener('keypress', event => {
    if (event.KeyCode === 32 || event.which === 32){
        swapPlayer();
    }
})




