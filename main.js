class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'lotto-generator');

        const title = document.createElement('h1');
        title.textContent = '로또 번호 추첨기';

        const numberContainer = document.createElement('div');
        numberContainer.setAttribute('class', 'number-container');

        const button = document.createElement('button');
        button.textContent = '번호 생성';
        button.addEventListener('click', () => this.generateNumbers(numberContainer));

        const style = document.createElement('style');
        style.textContent = `
            .lotto-generator {
                display: flex;
                flex-direction: column;
                align-items: center;
                font-family: sans-serif;
                background-color: var(--container-bg, #ffffff);
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .number-container {
                display: flex;
                gap: 10px;
                margin: 20px 0;
            }
            button {
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
                background-color: var(--button-bg, #007bff);
                color: var(--button-text, #ffffff);
                border: none;
                border-radius: 5px;
            }
            h1 {
                margin-top: 0;
                color: var(--text-color, #333);
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(title);
        wrapper.appendChild(numberContainer);
        wrapper.appendChild(button);

        this.generateNumbers(numberContainer);
    }

    generateNumbers(container) {
        container.innerHTML = '';
        const numbers = this.getRandomNumbers();
        for (const number of numbers) {
            const lottoBall = document.createElement('lotto-ball');
            lottoBall.setAttribute('number', number);
            container.appendChild(lottoBall);
        }
    }

    getRandomNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }
}

class LottoBall extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const ball = document.createElement('div');
        ball.setAttribute('class', 'ball');
        ball.textContent = this.getAttribute('number');

        const style = document.createElement('style');
        style.textContent = `
            .ball {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 20px;
                font-weight: bold;
                color: white;
                background-color: ${this.getColor(this.getAttribute('number'))};
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(ball);
    }

    getColor(number) {
        if (number <= 10) return '#fbc400'; // 노란색
        if (number <= 20) return '#69c8f2'; // 파란색
        if (number <= 30) return '#ff7272'; // 빨간색
        if (number <= 40) return '#aaa'; // 회색
        return '#b0d840'; // 녹색
    }
}

customElements.define('lotto-generator', LottoGenerator);
customElements.define('lotto-ball', LottoBall);

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
});