function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = cookie.substring(name.length + 1);
                    break;
                }
            }
        }
        return cookieValue;
    }
const csrftoken = getCookie('csrftoken');
// Show modal on chat icon click
document.getElementById('chat-icon').onclick = function() {
    document.getElementById('chat-modal').style.display = 'flex';
};

// Hide modal on close button click or outside click
document.getElementById('close-chat').onclick = function() {
    document.getElementById('chat-modal').style.display = 'none';
};
window.onclick = function(event) {
    const modal = document.getElementById('chat-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

document.getElementById("send-btn").addEventListener("click", function () {
    const userInput = document.getElementById("chat-input").value.trim();
    if (userInput === "") return;

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    fetch(askUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json",
            'X-CSRFToken': csrftoken },
        body: JSON.stringify({ query: userInput })
    })
    .then(response => response.json())
    .then(data => {
        chatBox.innerHTML += `<p><strong>Assistant:</strong> ${data.response}</p>`;
    })
    .catch(error => console.error("Error:", error));

    document.getElementById("chat-input").value = "";
});