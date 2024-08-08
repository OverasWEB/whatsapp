// Inisialisasi basis data IndexedDB
var db;
var request = window.indexedDB.open('ChatDB', 1);

request.onupgradeneeded = function(event) {
    // Buat objek penyimpanan 'messages'
    db = event.target.result;
    var objectStore = db.createObjectStore('messages', { keyPath: 'id', autoIncrement:true });
};

request.onsuccess = function(event) {
    db = event.target.result;
    loadMessages(); // Muat pesan saat basis data siap
};

request.onerror = function(event) {
    console.log('Error opening IndexedDB');
};

// Fungsi untuk mengirim pesan
function sendMessage() {
    var messageInput = document.getElementById('messageInput');
    var messageText = messageInput.value.trim();

    if (messageText === '') {
        return;
    }

    var chat = document.querySelector('.chat');
    var message = document.createElement('div');
    message.className = 'message sent';
    var currentTime = getCurrentTime();
    message.innerHTML = `
        <div class="message-content">${messageText}</div>
        <div class="message-timestamp">${currentTime}</div>
    `;
    chat.appendChild(message);

    // Clear the input field after sending message
    messageInput.value = '';

    // Scroll to the bottom of the chat container
    chat.scrollTop = chat.scrollHeight;

    // Simpan pesan ke IndexedDB
    var transaction = db.transaction(['messages'], 'readwrite');
    var objectStore = transaction.objectStore('messages');
    var newMessage = {
        text: messageText,
        timestamp: currentTime
    };
    objectStore.add(newMessage);

    // Atur kembali tinggi textarea ke nilai awal
    textarea.style.height = 'auto';
}

// Fungsi untuk memuat pesan dari IndexedDB
function loadMessages() {
    var transaction = db.transaction(['messages'], 'readonly');
    var objectStore = transaction.objectStore('messages');
    var request = objectStore.openCursor();
    
    request.onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            var message = document.createElement('div');
            message.className = 'message sent';
            message.innerHTML = `
                <div class="message-content">${cursor.value.text}</div>
                <div class="message-timestamp">${cursor.value.timestamp}</div>
            `;
            var chat = document.querySelector('.chat');
            chat.appendChild(message);
            cursor.continue();
        }
    };
}

// Fungsi untuk mendapatkan waktu saat ini
function getCurrentTime() {
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Ambil elemen textarea
var textarea = document.getElementById('messageInput');

// Tambahkan event listener untuk menangkap perubahan input
textarea.addEventListener('input', function() {
    // Atur tinggi textarea agar memadai untuk konten yang ada
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

// Panggil fungsi loadMessages saat halaman dimuat
window.onload = function() {
    loadMessages();
};
