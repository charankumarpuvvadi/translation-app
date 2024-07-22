document.addEventListener('DOMContentLoaded', () => {
    const fromSelect = document.getElementById("translator-from-select");
    const toSelect = document.getElementById("translator-to-select");
    const exchangeBtn = document.querySelector(".translator-exchange-btn");
    const translateBtn = document.querySelector(".translator-translate-btn");
    const fromTextArea = document.querySelector(".translator-from-text");
    const toTextArea = document.querySelector(".translator-to-text");
    const readFromBtn = document.querySelector(".read-from-text");
    const readToBtn = document.querySelector(".read-to-text");

    const defaultLanguages = {
        from: "en-GB",
        to: "ur-PK"
    };

    const populateSelectOptions = () => {
        Object.entries(countries).forEach(([code, name]) => {
            const option = new Option(name, code);
            fromSelect.add(option.cloneNode(true));
            toSelect.add(option);
        });
        fromSelect.value = defaultLanguages.from;
        toSelect.value = defaultLanguages.to;
    };

    const swapLanguages = () => {
        const tempText = fromTextArea.value;
        const tempLang = fromSelect.value;

        fromTextArea.value = toTextArea.value;
        toTextArea.value = tempText;

        fromSelect.value = toSelect.value;
        toSelect.value = tempLang;
    };

    const translateText = async () => {
        const text = fromTextArea.value;
        const fromLang = fromSelect.value;
        const toLang = toSelect.value;

        if (!text.trim()) return;

        toTextArea.placeholder = "Translating...";

        try {
            const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`);
            const data = await response.json();
            toTextArea.value = data.responseData.translatedText;
            toTextArea.placeholder = "Translation";
        } catch (error) {
            console.error("Translation error:", error);
            toTextArea.value = "Translation failed";
            toTextArea.placeholder = "Translation";
        }
    };

    const readText = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };

    exchangeBtn.addEventListener('click', swapLanguages);
    translateBtn.addEventListener('click', translateText);
    readFromBtn.addEventListener('click', () => readText(fromTextArea.value));
    readToBtn.addEventListener('click', () => readText(toTextArea.value));

    populateSelectOptions();
});
