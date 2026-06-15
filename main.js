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
    static get observedAttributes() {
        return ['number'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'number' && oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const number = this.getAttribute('number');
        const color = this.getColor(number);
        this.shadowRoot.innerHTML = `
            <style>
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
                    background-color: ${color};
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    animation: pop 0.3s ease-out;
                }
                @keyframes pop {
                    0% { transform: scale(0.5); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
            </style>
            <div class="ball">${number}</div>
        `;
    }

    getColor(number) {
        const n = parseInt(number);
        if (n <= 10) return '#fbc400';
        if (n <= 20) return '#69c8f2';
        if (n <= 30) return '#ff7272';
        if (n <= 40) return '#aaa';
        return '#b0d840';
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