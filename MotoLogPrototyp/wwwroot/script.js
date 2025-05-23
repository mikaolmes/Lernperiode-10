// Einfaches Script, das nur das Laden und Anzeigen von Motorrädern implementiert
document.addEventListener("DOMContentLoaded", function() {
    // Prüfe, ob wir auf der Motorrad-Seite sind
    const motorcycleCards = document.getElementById("motorcycleCards");
    if (motorcycleCards) {
        console.log("Lade Motorräder...");
        
        // Hole alle Motorräder von der API
        fetch('/api/Motorcycle')
            .then(response => {
                console.log("API-Antwort erhalten:", response.status);
                if (!response.ok) {
                    throw new Error(`HTTP Fehler: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Motorräder geladen:", data);
                displayMotorcycles(data);
            })
            .catch(error => {
                console.error("Fehler beim Laden der Motorräder:", error);
                motorcycleCards.innerHTML = `
                    <div class="error">
                        <p>Fehler beim Laden der Motorräder:</p>
                        <p>${error.message}</p>
                    </div>
                `;
            });
    }
    
    // Einfache Funktion zum Anzeigen der Motorräder
    function displayMotorcycles(motorcycles) {
        motorcycleCards.innerHTML = '';
        
        if (!motorcycles || motorcycles.length === 0) {
            motorcycleCards.innerHTML = '<p class="no-items">Keine Motorräder gefunden.</p>';
            return;
        }
        
        motorcycles.forEach(motorcycle => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${motorcycle.name || 'Unbenanntes Motorrad'}</h3>
                <div class="bike-details">
                    <p><strong>Marke:</strong> ${motorcycle.brand || '-'}</p>
                    <p><strong>Modell:</strong> ${motorcycle.model || '-'}</p>
                    <p><strong>Baujahr:</strong> ${motorcycle.year || '-'}</p>
                    <p><strong>ccm:</strong> ${motorcycle.cc || '-'}</p>
                    <p><strong>Preis:</strong> ${motorcycle.price || '-'} CHF</p>
                </div>
            `;
            motorcycleCards.appendChild(card);
        });
    }
    
    // Einfacher Event-Listener für das Hinzufügen eines Motorrads
    const motorcycleForm = document.getElementById("motorcycleForm");
    const motorcycleModal = document.getElementById("motorcycleModal");
    
    if (motorcycleForm) {
        motorcycleForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Daten aus dem Formular sammeln
            const formData = {
                name: document.querySelector('input[name="name"]').value,
                brand: document.querySelector('input[name="brand"]').value,
                model: document.querySelector('input[name="model"]').value,
                year: parseInt(document.querySelector('input[name="year"]').value),
                cc: parseInt(document.querySelector('input[name="cc"]').value),
                price: parseInt(document.querySelector('input[name="price"]').value)
            };
            
            console.log("Sende Daten an API:", formData);
            
            // POST-Anfrage an die API senden
            fetch('/api/Motorcycle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                console.log("API-Antwort erhalten:", response.status);
                if (!response.ok) {
                    throw new Error(`HTTP Fehler: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Motorrad hinzugefügt:", data);
                motorcycleModal.classList.remove("show");
                alert("Motorrad erfolgreich hinzugefügt!");
                window.location.reload(); // Seite neu laden
            })
            .catch(error => {
                console.error("Fehler beim Hinzufügen des Motorrads:", error);
                alert(`Fehler beim Hinzufügen des Motorrads: ${error.message}`);
            });
        });
    }
    
    // Event-Listener für das Öffnen und Schließen des Modals
    const addBtn = document.getElementById("addMotorcycleBtn");
    const closeBtn = document.getElementById("closeModal");
    
    if (addBtn) {
        addBtn.addEventListener("click", function() {
            motorcycleModal.classList.add("show");
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener("click", function() {
            motorcycleModal.classList.remove("show");
        });
    }
});