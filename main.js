const URL = "https://teachablemachine.withgoogle.com/models/uhKUL3BIa/";

let model, labelContainer, maxPredictions;

async function loadModel() {
    if (!model) {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
    }
}

async function handleImageUpload(event) {
    const input = event.target;
    if (!input.files || !input.files[0]) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = async function(e) {
        const imageElement = document.getElementById("face-image");
        imageElement.src = e.target.result;
        imageElement.style.display = "block";
        
        // Show loading state or text
        const resultMessage = document.getElementById("result-message");
        resultMessage.textContent = "분석 중...";
        resultMessage.style.color = "var(--text-color)";

        await loadModel();
        await predict(imageElement);
    };

    reader.readAsDataURL(file);
}

async function predict(imageElement) {
    const prediction = await model.predict(imageElement);
    let highestProb = 0;
    let winner = "";

    labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = '';

    for (let i = 0; i < maxPredictions; i++) {
        const animalName = prediction[i].className;
        const probability = (prediction[i].probability * 100).toFixed(0);
        
        const barContainer = document.createElement("div");
        barContainer.className = "prediction-bar-container";
        barContainer.innerHTML = `
            <div class="prediction-label">
                <span class="animal-name">${animalName}</span>
                <span class="probability">${probability}%</span>
            </div>
            <div class="prediction-bar-outer">
                <div class="prediction-bar-inner" style="width: ${probability}%"></div>
            </div>
        `;
        labelContainer.appendChild(barContainer);

        if (prediction[i].probability > highestProb) {
            highestProb = prediction[i].probability;
            winner = animalName;
        }
    }

    const resultMessage = document.getElementById("result-message");
    if (winner === "강아지") {
        resultMessage.textContent = "당신은 귀여운 강아지상입니다! 🐶";
        resultMessage.style.color = "#ffc107";
    } else if (winner === "고양이") {
        resultMessage.textContent = "당신은 도도한 고양이상입니다! 🐱";
        resultMessage.style.color = "#007bff";
    }
}

// Contact Form Component
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
                    display: flex; flex-direction: column; gap: 15px;
                    background-color: var(--container-bg, #ffffff); padding: 30px;
                    border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                    width: 100%; max-width: 500px; margin-top: 40px; box-sizing: border-box;
                    font-family: sans-serif;
                }
                h2 { margin-top: 0; color: var(--text-color, #333); font-size: 20px; text-align: center; }
                .field { display: flex; flex-direction: column; gap: 5px; }
                label { font-size: 14px; color: var(--text-color, #333); }
                input, textarea {
                    padding: 10px; border: 1px solid #ccc; border-radius: 5px;
                    background-color: var(--bg-color, #f0f0f0); color: var(--text-color, #333);
                }
                button {
                    padding: 12px; background-color: var(--button-bg, #007bff);
                    color: var(--button-text, #ffffff); border: none; border-radius: 5px;
                    cursor: pointer; font-weight: bold; margin-top: 10px;
                }
            </style>
            <form class="contact-form" action="https://formspree.io/f/xpqekgrp" method="POST">
                <h2>제휴 및 제작 문의</h2>
                <div class="field"><label>이름</label><input type="text" name="name" required></div>
                <div class="field"><label>이메일</label><input type="email" name="_replyto" required></div>
                <div class="field"><label>메시지</label><textarea name="message" rows="4" required></textarea></div>
                <button type="submit">문의 보내기</button>
            </form>
        `;
    }
}
customElements.define('contact-form', ContactForm);

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
});
