const appContainer = document.getElementById('app');

const images = [
  './assets/images/02.jpg'
];

let keys = [
    'AUF',
    'DEM',
    'LAUFENDEN',
    'SEIN',
    'UND',
    'NUR',
    'GUTE',
    'IDEEN',
    'HABEN'
];

const winnerIs = [
    'https://giphy.com/embed/bb0Xwo6UoHTPy',
    'https://giphy.com/embed/4sB8nMxENT9y8'
];

const typedProperKeys = [];

let triesCount = 0;

const usedBoxNumbers = [];

const app = () => {
    const boxes = [];
    let resultsBoard;

    const createImage = () => {
        const img = document.createElement('img');
        img.setAttribute('src', images[0]);
        img.classList.add('img');

        appContainer.appendChild(img);
    };

    const createBlackout = () => {
      const blackoutBox = document.createElement('div');
      blackoutBox.classList.add('blackout-box');

      for (let i = 0; i < 100; i++) {

          const box = document.createElement('div');
          box.classList.add('box');
          box.classList.add(`box-delay-${Math.ceil(Math.random() * 3)}`);
          boxes.push(box);
          blackoutBox.appendChild(box);
      }

      appContainer.appendChild(blackoutBox);
    };

    const findRandomBoxes = (amount) => {
        const randomValue = Math.ceil(Math.random() * 100);

        if (usedBoxNumbers.length !== amount) {
            if (usedBoxNumbers.indexOf(randomValue) === -1) {
                usedBoxNumbers.push(randomValue);
            }
            findRandomBoxes(10 * triesCount);
        }
    };

    const showRandomBoxes = () => {
        for (let i = 0; i < usedBoxNumbers.length; i++) {
            boxes[usedBoxNumbers[i] - 1].classList.add('is-hidden');
        }
    };

    const prepareList = (elements) => {
        const ul = document.createElement('ul');
        elements.forEach(element => {
            const li = document.createElement('li');
            li.innerText = element;
            ul.appendChild(li);
        });

        return ul;
    };

    const removeElementFromKeys = (value) => {
        const index = keys.indexOf(value);
        const updatedKeys = keys.filter((key, number) => {
            if (index !== number) {
                return key;
            }
        });

        keys = updatedKeys;
    };

    const createForm = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'Wpisz hasło i naciśnij ENTER');
        input.classList.add('input');

        input.addEventListener('change', (e) => {
            const value = e.target.value.toUpperCase().split(" ").join("");

            if (keys.indexOf(value) !== -1) {
                typedProperKeys.push(e.target.value);
                const text = e.target.value.toUpperCase();
                const answerBox = document.querySelector(`.answer-box[data-key="${text}"]`);

                answerBox.innerHTML = text;
                // resultsBoard.innerHTML = '';
                // resultsBoard.appendChild(prepareList(typedProperKeys));
                triesCount += 1;
                removeElementFromKeys(value);
                findRandomBoxes(10 * triesCount);
                showRandomBoxes();
            }

            if (keys.length === 0) {
                const winnerIsItem = Math.ceil(Math.random() * winnerIs.length);
                const winnerBox = document.createElement('div');
                winnerBox.classList.add('winner-box');
                winnerBox.innerHTML = `<iframe src="${winnerIs[winnerIsItem - 1]}" width="480" height="331" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`

                appContainer.appendChild(winnerBox);

                setTimeout(() => {
                    appContainer.removeChild(winnerBox)
                }, 5000);
            }

            e.target.value = '';
        });



        appContainer.appendChild(input);
    };

    const createPlacesForAnswers = () => {
        for (let key in keys) {
            const box = document.createElement('div');
            box.classList.add('answer-box');
            box.dataset.key = keys[key];
            box.style.width = (keys[key].length * 20) + 'px';

            resultsBoard.appendChild(box);
        }
    };

    const createResultsBoard = () => {
        resultsBoard = document.createElement('div');
        resultsBoard.classList.add('results');

        createPlacesForAnswers();

        appContainer.appendChild(resultsBoard);
    };

    createImage();
    createBlackout();
    createResultsBoard();
    createForm();
};

app();