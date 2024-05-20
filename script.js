document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const historyList = document.getElementById('history');
    let history = JSON.parse(localStorage.getItem('history')) || [];

    const updateHistory = () => {
        historyList.innerHTML = '';
        history.slice(-3).forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            historyList.appendChild(li);
        });
    };

    const addToHistory = (operation) => {
        history.push(operation);
        localStorage.setItem('history', JSON.stringify(history));
        updateHistory();
    };

    updateHistory();

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.id;

            if (value === 'clear') {
                display.textContent = '';
            } else if (value === 'backspace') {
                display.textContent = display.textContent.slice(0, -1);
            } else if (value === 'equals') {
                try {
                    const result = eval(display.textContent.replace(/x/g, '*'));
                    display.textContent = result;
                    addToHistory(display.textContent);
                } catch {
                    display.textContent = 'Erreur';
                }
            } else {
                display.textContent += value === 'multiply' ? 'x' : 
                                         value === 'divide' ? '/' : 
                                         value === 'subtract' ? '-' : 
                                         value === 'add' ? '+' : 
                                         value === 'percent' ? '%' :
                                         button.textContent;
            }
        });
    });
});
