$(document).ready(function () {
    const words = {
        easy: [
            { word: "cat", translation: "кіт" },
            { word: "dog", translation: "пес" },
            { word: "sun", translation: "сонце" },
            { word: "book", translation: "книга" },
            { word: "pen", translation: "ручка" },
            { word: "apple", translation: "яблуко" },
            { word: "milk", translation: "молоко" },
            { word: "fish", translation: "риба" },
            { word: "car", translation: "авто" },
            { word: "house", translation: "дім" }
        ],
        medium: [
            { word: "river", translation: "річка" },
            { word: "mountain", translation: "гора" },
            { word: "window", translation: "вікно" },
            { word: "forest", translation: "ліс" },
            { word: "chair", translation: "стілець" },
            { word: "table", translation: "стіл" },
            { word: "computer", translation: "комп'ютер" },
            { word: "phone", translation: "телефон" },
            { word: "sky", translation: "небо" },
            { word: "bread", translation: "хліб" }
        ],
        hard: [
            { word: "knowledge", translation: "знання" },
            { word: "philosophy", translation: "філософія" },
            { word: "university", translation: "університет" },
            { word: "government", translation: "уряд" },
            { word: "responsibility", translation: "відповідальність" },
            { word: "opportunity", translation: "можливість" },
            { word: "environment", translation: "середовище" },
            { word: "technology", translation: "технологія" },
            { word: "communication", translation: "спілкування" },
            { word: "management", translation: "управління" }
        ]
    };

    let currentWords = [];
    let currentStep = 0;
    let correctCount = 0;
    let incorrectCount = 0;

    function updateCard() {
        if (currentStep < currentWords.length) {
            const currentWord = currentWords[currentStep];
            $("#word").text(currentWord.word);
            $("#translationInput").val("").focus();
            $("#currentStep").text(currentStep + 1);
        } else {
            showResults();
        }
    }

    function showResults() {
        const percentage = (correctCount / currentWords.length) * 100;
        let level = "";

        if (percentage === 100) {
            level = "Відмінно! Ви справжній поліглот!";
        } else if (percentage >= 70) {
            level = "Добре! Ви добре володієте мовою.";
        } else if (percentage >= 40) {
            level = "Задовільно. Вам варто ще попрацювати.";
        } else {
            level = "Слабкий рівень. Потрібно більше практики.";
        }

        alert(`Результати тесту:\n\nПравильно: ${correctCount}\nНеправильно: ${incorrectCount}\n\nВаш рівень: ${level}`);
        resetApp();
    }

    function resetApp() {
        currentWords = [];
        currentStep = 0;
        correctCount = 0;
        incorrectCount = 0;

        $("#progress").hide();
        $("#cardContainer").hide();
        $("#difficultySelection").show();
    }

    $("#startButton").click(function () {
        const selectedDifficulty = $("#difficulty").val();
        currentWords = words[selectedDifficulty].sort(() => Math.random() - 0.5);

        $("#totalSteps").text(currentWords.length);
        $("#correctCount").text(0);
        $("#incorrectCount").text(0);

        $("#difficultySelection").hide();
        $("#progress").show();
        $("#cardContainer").show();

        updateCard();
    });

    $("#checkButton").click(function () {
        const userTranslation = $("#translationInput").val().trim();

        if (userTranslation === "") {
            alert("Будь ласка, введіть переклад перед перевіркою!");
            return;
        }

        const correctTranslation = currentWords[currentStep].translation.toLowerCase();

        if (userTranslation.toLowerCase() === correctTranslation) {
            correctCount++;
        } else {
            incorrectCount++;
        }

        $("#correctCount").text(correctCount);
        $("#incorrectCount").text(incorrectCount);

        currentStep++;
        updateCard();
    });

    resetApp();
});
