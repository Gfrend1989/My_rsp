/**
 * 1. Зробити відкриття модального вікна
 *  -зробити клік по кнопці правила
 *  -додати клас блоку <div class="modal modal--isActive">
 *  2.Зробити закриття модального віена правил блоку
 *      -div class, прибравши modal--isActive
 *  3. При обранні фігури
 *      - додати клас gameContent gameContent--isActive
 *    <!-- GAME CHOICES-->
 *      при виборі паперу   ---gameContent__gameChoice gameContent__gameChoice--isPaper gameContent__gameChoice--isActive
 *      при виборі камінь   ---gameContent__gameChoice gameContent__gameChoice--isScissors gameContent__gameChoice--isActive
 *      при виборі ножиці   ---gameContent__gameChoice gameContent__gameChoice--isRock gameContent__gameChoice--isActive
 *
 *   -gameContent__gameChoice gameContent__gameChoice--isComputer
 *        -запустити таймер
 *        - після закінчення таймеру
 *                   обрати випадкову фігуру і додати клас:
 *        -додати клас, що обрак компютер
 *        -gameContent__image прописати src шлях до картинки
 *
 * gameContent__gameChoice--isScissors
 *
 *
 *  4. Після завершення гри додати клас gameContent gameContent--isActive gameContent--revealResult
 *      - прописати текст в gameContent__result
 *          Перемога
 *          Програш
 *          Нічия
 *      -header змінювати очки :додавати чи віднімати
 *
 *
 *  5. Після перезапуску гри (натискання кнопки "Спробувати знову" )
 *          прибрати всі класи" блоку div.gameContent
 */
/**
 * modal functionality
 */

//Зони для закриття модвльного вікна//

let btnCloseModal = document.querySelector(".modal__closeIcon")
let modalOverlay = document.querySelector(".modal__overlay")

let btnOpenModal = document.querySelector(".container__rules");
btnOpenModal.onclick = function ()  {
    let modalWindow = document.querySelector(".modal");
    modalWindow.classList.add("modal--isActive");
}
btnCloseModal.onclick = CloseModal;
modalOverlay.onclick = CloseModal;

function CloseModal() {
    let modalWindow = document.querySelector(".modal");
    modalWindow.classList.remove("modal--isActive");
}

/**
 * Робимо клік по фігурах
 *
 * -----------------
 * Обираємо фігури
 * ------------------
 */
let gameChoicePaper = document.querySelector(".gameContent__gameChoice--isPaper");
let gameChoiceScissors = document.querySelector(".gameContent__gameChoice--isScissors");
let gameChoiceRock = document.querySelector(".gameContent__gameChoice--isRock");
let playerChoice = 0;    //вибір гравця
let computerChoice = 0;   //вибір компютера
let gameContent = document.querySelector('.gameContent');
let gameScore = 0;   //рахунок

//-------------------
// Функціонал кліків по фігурах
//----------------------
// Робимо клік по папері
gameChoicePaper.onclick = function () {
    startChoice();
    gameChoicePaper.classList.add("gameContent__gameChoice--isActive");
    playerChoice = 1;
}
//Робимо клік по ножиці
gameChoiceScissors.onclick = function () {
    startChoice();
    gameChoiceScissors.classList.add("gameContent__gameChoice--isActive");
    playerChoice = 2;
}
//Робимо клік по камінь
gameChoiceRock.onclick = function () {
    startChoice();
    gameChoiceRock.classList.add("gameContent__gameChoice--isActive");
    playerChoice = 3;
}
function startChoice() {       //оголошуємо функцію для  кліку по фігурі
    gameContent.classList.add('gameContent--isActive');
    ///---------------
    // Запускаємо таймер
    ///----------------------
    let countdownText = document.querySelector('.gameContent__countdownText');
    let timer = 3;
    let timerID = setInterval(function (){
        timer = timer - 1;
        countdownText.innerText = timer;
        if (timer == 0) {
            countdownText.innerText = "";
            finish();
            clearInterval(timerID);  //після закінчення прибрати таймер
        }
    },500);
}
///// -------------
//Закінчення гри
//// -------------
function finish () {
    choiceComputer();
    result();
    gameContent.classList.add("gameContent--revealResult");
}

function result () {  //результат гри
    let resultText = document.querySelector(".gameContent__resultText");
    if(playerChoice == computerChoice) {   //нічия
        resultText.innerText = "Draw";
    } else if(
        (playerChoice == 1 && computerChoice == 3) ||
        (playerChoice == 2 && computerChoice == 1) ||
        (playerChoice == 3 && computerChoice == 2)
    ) {
        resultText.innerText = "Win";  //гравець переміг
        changeScore(1);
    } else {
        resultText.innerText = "Loses";  //компютер переміг
        changeScore(-1);
    }
}
//зміна балів у блоку очки
function changeScore (score) {
    if (score < 0 && gameScore == 0) {
        return 0;
    }
    gameScore = gameScore + score;
    let scoreBlockText = document.querySelector('.header__scoreNumber');
    scoreBlockText.innerText = gameScore;
}


//Функція вибору фігури комп’ютером
function choiceComputer() {
    computerChoice = random(1,3);
    let image = "";
    let className = "";

    if (computerChoice == 1) {
        image = "images/icon-paper.svg";
        className = "gameContent__gameChoice--isPaper";
    } else if (computerChoice == 2) {
            image = "images/icon-scissors.svg";
            className = "gameContent__gameChoice--isScissors";
    }
    else if (computerChoice == 3){
            image = "images/icon-rock.svg";
            className = "gameContent__gameChoice--isRock";
    }



    let gameChoiceComputer = document.querySelector(".gameContent__gameChoice--isComputer");
    gameChoiceComputer.classList.add(className);

    let gameChoiceComputerImage = document.querySelector(".gameContent__gameChoiceImage");
    console.dir (gameChoiceComputerImage);
    gameChoiceComputerImage.src = image;

}
function random(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

let reloadButton = document.querySelector(".gameContent__resultButton");
console.dir(reloadButton);
reloadButton.onclick = reload


    //Функція перезапуску гри
    function reload () {
        gameContent.classList.remove("gameContent--isActive", "gameContent--revealResult");
        let activeElement = document.querySelector(".gameContent__gameChoice--isActive");
        activeElement.classList.remove("gameContent__gameChoice--isActive");

        let gameChoiceComputerImage = document.querySelector(".gameContent__gameChoiceImage");
        console.dir (gameChoiceComputerImage);
        gameChoiceComputerImage.src = "";

        let gameChoiceComputer = document.querySelector(".gameContent__gameChoice--isComputer");
        //gameChoiceComputer.classList.add(className);
        gameChoiceComputer.className = ("gameContent__gameChoice gameContent__gameChoice--isComputer")

        let countdownText = document.querySelector('.gameContent__countdownText');
        countdownText.innerText = 3;

        console.dir("restart")

    }