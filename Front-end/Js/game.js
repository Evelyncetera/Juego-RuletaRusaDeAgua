const BASE = "http://localhost:8080";
let jugadores = [];
let rotacionActual = 0;

document.getElementById("startGame").addEventListener("click", () => {
    
    const nombre1 = document.getElementById("player1").value.trim();
    const nombre2 = document.getElementById("player2").value.trim();
    
    if (nombre1 === "" || nombre2 === "") {
        mostrarAlerta("⚠️ Debes ingresar los nombres de ambos jugadores.");
        return;
    }
    
    jugadores = [nombre1, nombre2];
    
    fetch(`${BASE}/api/iniciar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jugadores)
    })
    .then(response => {
        if (response.ok) return response.text();
        throw new Error("Error en la conexión");
    })
    .then(msg => {
        document.getElementById("intro").style.display = "none";
        document.getElementById("game").style.display = "block";
        document.getElementById("score1").innerText = `${jugadores[0]}: Vivo`;
        document.getElementById("score2").innerText = `${jugadores[1]}: Vivo`;
        document.getElementById("messages").innerText = "¡Juego iniciado! Buena suerte 🍀";
    })
    .catch(error => {
        console.error(error);
        alert("No se pudo conectar con el servidor.");
    });
});

// btn disparar
document.getElementById("trigger").addEventListener("click", () => {
    
    const btn = document.getElementById("trigger");
    const msgDiv = document.getElementById("messages");
    
    btn.disabled = true;
    
    msgDiv.innerText = "GIRANDO EL TAMBOR... 🤞";
    msgDiv.style.color = "#aaa";

    fetch(`${BASE}/api/disparar`)
    .then(response => response.json())
    .then(data => {animarDisparo(data, btn); })
    .catch(error => {
        console.error(error);
        btn.disabled = false;
        msgDiv.innerText = "Error de conexión ⚠️";
    });
});

function animarDisparo(data, btn) {
    const cylinder = document.getElementById("cylinder");
    const msgDiv = document.getElementById("messages");
    const restartBtn = document.getElementById("restartBtn");

    
    const posicionIndex = data.posicionTambor - 1;
    const anguloDestino = posicionIndex * 60; 
    
    const vueltasExtra = 1800; 
    

    const cicloActual = Math.ceil(Math.abs(rotacionActual) / 360) * 360;
    

    rotacionActual = -(cicloActual + vueltasExtra + anguloDestino);

    cylinder.style.transform = `rotate(${rotacionActual}deg)`;
    cylinder.style.transition = "transform 3s cubic-bezier(0.25, 1, 0.5, 1)";

    setTimeout(() => {
        
        msgDiv.innerHTML = data.mensaje;

        if (data.juegoTerminado) {
            msgDiv.style.color = "#ff4444";
            document.getElementById("eventLog").innerHTML += `<p>💀 ${data.mensaje}</p>`;
            
            const camaras = document.querySelectorAll(".chamber");
            camaras.forEach(c => c.classList.remove("wet"));
            if(camaras[posicionIndex]) {
                camaras[posicionIndex].classList.add("wet");
            }

            
            btn.style.display = 'none';
            restartBtn.style.display = 'block';
            
        } else {
            msgDiv.style.color = "white";
            document.getElementById("eventLog").innerHTML += `<p>🔫 ${data.mensaje}</p>`;
            
            
            btn.disabled = false;
        }

    }, 3000);
}
document.getElementById("restartBtn").addEventListener("click", () => {

    document.getElementById("game").style.display = "none";
    document.getElementById("intro").style.display = "block";
    
    document.getElementById("player1").value = "";//limpiar campos
    document.getElementById("player2").value = "";
    
    document.getElementById("eventLog").innerHTML = "";
    document.getElementById("messages").innerText = "";
    document.getElementById("trigger").style.display = "block";
    document.getElementById("trigger").disabled = false;
    document.getElementById("restartBtn").style.display = "none";
    
    
    const camaras = document.querySelectorAll(".chamber");
    camaras.forEach(c => c.classList.remove("wet"));
    
    rotacionActual = 0;
    document.getElementById("cylinder").style.transform = "rotate(0deg)";
    document.getElementById("cylinder").style.transition = "none"; // Reset sin animación
});


function mostrarAlerta(mensaje) {
    const modal = document.getElementById("customModal");
    const texto = document.getElementById("modalMessage");
    
    texto.innerText = mensaje;
    modal.style.display = "flex";
}


document.getElementById("closeModalBtn").addEventListener("click", () => {
    document.getElementById("customModal").style.display = "none";
});