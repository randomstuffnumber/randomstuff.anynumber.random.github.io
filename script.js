let lastClickTime = 0;
let customNumbers = [];
let customNumbersVisible = false;
let history = [];
let specialIndex = 0; // Индекс для отслеживания текущего заданного числа

document.getElementById('generateButton').addEventListener('click', function() {
    const currentTime = new Date().getTime();
    const randomNumberElement = document.getElementById('randomNumber');
    const minRange = parseInt(document.getElementById('minRange').value);
    const maxRange = parseInt(document.getElementById('maxRange').value);

    // Очищаем предыдущий интервал, если он был
    clearInterval(window.interval);

    // Быстрая смена чисел в течение 3 секунд
    let count = 0;
    const startTime = new Date().getTime();
    window.interval = setInterval(() => {
        if (new Date().getTime() - startTime < 3000) {
            randomNumberElement.textContent = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
        } else {
            clearInterval(window.interval);
            // Проверяем, прошло ли более 5 секунд с последнего нажатия
            if (currentTime - lastClickTime > 5000 && customNumbers.length > 0) {
                // Генерируем следующее заданное число по порядку
                randomNumberElement.textContent = customNumbers[specialIndex % customNumbers.length];
                specialIndex++; // Увеличиваем индекс для следующего числа
            } else {
                randomNumberElement.textContent = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
            }
            // Добавляем число в историю
            history.unshift(randomNumberElement.textContent);
            if (history.length > 5) history.pop();
            updateHistory();
        }
    }, 100);

    lastClickTime = currentTime;
});

function updateHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = history.map(num => `<li>${num}</li>`).join('');
}

// Управление отображением истории
let historyVisible = false;
document.getElementById('starsToggle').addEventListener('dblclick', function() {
    const historyElement = document.getElementById('history');
    historyVisible = !historyVisible;
    historyElement.style.display = historyVisible ? 'block' : 'none';
});

// Управление отображением заданных чисел
document.getElementById('aboutToggle').addEventListener('dblclick', function() {
    const customNumbersElement = document.getElementById('customNumbers');
    customNumbersVisible = !customNumbersVisible;
    customNumbersElement.style.display = customNumbersVisible ? 'block' : 'none';
});

// Обновление заданных чисел
document.getElementById('customNumbers').addEventListener('input', function() {
    customNumbers = [
        parseInt(document.getElementById('customNumber1').value) || 0,
        parseInt(document.getElementById('customNumber2').value) || 0,
        parseInt(document.getElementById('customNumber3').value) || 0
    ].filter(num => num !== 0); // Убираем нули, если поле пустое
});
