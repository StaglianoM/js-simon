// Quando il Dom carica la pagina parte l'eventlistener

document.addEventListener("DOMContentLoaded", function () {
    const countdownElement = document.getElementById('countdown');
    const numbersListElement = document.getElementById('numbers-list');
    const answersForm = document.getElementById('answers-form');
    const inputGroup = document.getElementById('input-group');
    const messageElement = document.getElementById('message');
    let countdown = 5;

    // Genera 5 numeri casuali
    function generateRandomNumbers() {
        randomNumbers = [];
        for (let i = 0; i < 5; i++) {
            const randomNumber = Math.floor(Math.random() * 50) + 1;
            randomNumbers.push(randomNumber);
        }

        // ogni elemento (numero) verrà aggiungo ad una lista html
        // creo con const la lista "li"
        // gli elementi dentro "li" devono essere di testo 
        // assegno il numero casuale ad ogni elemento "li"

        randomNumbers.forEach((num) => {
            const li = document.createElement('li');
            li.textContent = num;
            numbersListElement.appendChild(li);
        });
    }

    // Inizia il countdown di cadenza 1 secondo
    // se il cntdown và a 0 stampa scritta tempo scaduto e nascondi i numeri nella lista answersForm 
    function startCountdown() {
        const interval = setInterval(() => {
            countdown--;
            countdownElement.textContent = `Tempo rimanente: ${countdown} sec`;

            if (countdown === 0) {
                clearInterval(interval);
                countdownElement.textContent = "Tempo scaduto!";
                numbersListElement.innerHTML = ''; // Nascondo i numeri
                answersForm.classList.remove('d-none');
            }
        }, 1000);
    }

// answersform è il form in display none dove verranno aggiunti gli input dell'utente e con il comando submit inizia l'"evento" di quando il form viene inviato (cliccando sul bottone)
    answersForm.addEventListener('submit', function (evento) {
        // evita che la pagina venga ricaricata quando l utente invia i dati di input
        evento.preventDefault();

        // Prendo tutti gli input dove l'utente ha inserito i numeri
        let userInputs = Array.from(inputGroup.querySelectorAll('input'));

        // Creo un nuovo array con i numeri che l'utente ha scritto (convertendo da testo a numero)
        let userNumbers = userInputs.map(input => parseInt(input.value));

        // Confronta i numeri dell'utente con quelli casuali e "filtro" gli elementi di un array per restituirne un altro con solo gli elementi che soddisfano la condizione 
        // se i numeri filtrati sono presenti quel numero verrà mantenuto nell'array finale chiamato correctNumbers.
        let correctNumbers = randomNumbers.filter(numero => userNumbers.includes(numero));

        // Mostra quanti e quali numeri l'utente ha indovinato
        messageElement.textContent = `Hai indovinato ${correctNumbers.length} numero/i: ${correctNumbers.join(', ')}`;
    });

    // le funzioni di inizio gioco
    generateRandomNumbers();
    startCountdown();
});