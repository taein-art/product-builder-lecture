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

class ContactForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .contact-form {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    background-color: var(--container-bg, #ffffff);
                    padding: 30px;
                    border-radius: 15px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    width: 320px;
                    margin-top: 40px;
                    font-family: sans-serif;
                }
                h2 {
                    margin-top: 0;
                    color: var(--text-color, #333);
                    font-size: 20px;
                    text-align: center;
                }
                .field {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }
                label {
                    font-size: 14px;
                    color: var(--text-color, #333);
                }
                input, textarea {
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    background-color: var(--bg-color, #f0f0f0);
                    color: var(--text-color, #333);
                    font-size: 14px;
                }
                button {
                    padding: 12px;
                    background-color: var(--button-bg, #007bff);
                    color: var(--button-text, #ffffff);
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                    margin-top: 10px;
                }
                button:hover {
                    opacity: 0.9;
                }
            </style>
            <form class="contact-form" action="https://formspree.io/f/xpqekgrp" method="POST">
                <h2>제휴 문의</h2>
                <div class="field">
                    <label>이름</label>
                    <input type="text" name="name" required placeholder="성함을 입력하세요">
                </div>
                <div class="field">
                    <label>이메일</label>
                    <input type="email" name="_replyto" required placeholder="email@example.com">
                </div>
                <div class="field">
                    <label>메시지</label>
                    <textarea name="message" rows="4" required placeholder="문의하실 내용을 적어주세요"></textarea>
                </div>
                <button type="submit">문의 보내기</button>
            </form>
        `;
    }
}

customElements.define('contact-form', ContactForm);

class DisqusComments extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="disqus-wrapper">
                <div id="disqus_thread"></div>
            </div>
            <style>
                .disqus-wrapper {
                    background-color: var(--container-bg, #ffffff);
                    padding: 30px;
                    border-radius: 15px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    width: 100%;
                    max-width: 800px;
                    margin-top: 40px;
                    box-sizing: border-box;
                }
            </style>
        `;
        this.loadDisqus();
    }

    loadDisqus() {
        if (window.DISQUS) {
            window.DISQUS.reset({
                reload: true
            });
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://taein-1.disqus.com/embed.js';
        script.setAttribute('data-timestamp', +new RegExp());
        (document.head || document.body).appendChild(script);
    }
}

customElements.define('disqus-comments', DisqusComments);

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
});