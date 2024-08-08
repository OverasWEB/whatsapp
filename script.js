function sendMessage() {
    var messageInput = document.getElementById('messageInput');
    var messageText = messageInput.value.trim();

    if (messageText === '') {
        return;
    }

    var chat = document.querySelector('.chat');
    var message = document.createElement('div');
    message.className = 'message sent';
    message.innerHTML = `
        <div class="message-content">${messageText}</div>
        <div class="message-timestamp">${getCurrentTime()}</div>
    `;
    chat.appendChild(message);

    // Clear the input field after sending message
    messageInput.value = '';

    // Scroll to the bottom of the chat container
    chat.scrollTop = chat.scrollHeight;

    // Setel kembali tinggi textarea ke nilai awal
    textarea.style.height = 'auto';
}

function getCurrentTime() {
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}


// Ambil elemen textarea
var textarea = document.getElementById('messageInput');

// Tambahkan event listener untuk menangkap perubahan input
// textarea.addEventListener('input', function() {
//     // Atur tinggi textarea agar memadai untuk konten yang ada
//     this.style.height = 'auto';
//     this.style.height = (this.scrollHeight) + 'px';
// });



// Tambahkan event listener untuk menangkap perubahan input
textarea.addEventListener('input', function() {
    // Atur tinggi textarea agar memadai untuk konten yang ada
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

