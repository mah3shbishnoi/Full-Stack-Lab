let count = 0;

function result() {
    const displayElement = document.getElementById('result');
    displayElement.innerText = count;
    displayElement.classList.add('pop');
    setTimeout(() => {
        displayElement.classList.remove('pop');
    }, 150);
}

function showMessage(msg) {
    const errorElement = document.getElementById('error-message');
    if (msg) {
        errorElement.innerText = msg;
        errorElement.classList.add('show');
    } else {
        errorElement.classList.remove('show');
    }
}

function increase() {
    count++;
    showMessage('');
    result();
}

function decrease() {
    if (count > 0) {
        count--;
        showMessage('');
        result();
    } else {
        showMessage('Counter cannot be less than zero');
    }
}
result();