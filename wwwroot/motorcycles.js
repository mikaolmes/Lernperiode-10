// API Base URL - Passe diese an deine Backend-URL an
const API_BASE_URL = 'http://localhost:5151/api/motorcycle';

function goBack() {
    window.location.href = 'index.html';
}

// State Management
let motorcycles = [];
let currentMotorcycle = null;

// DOM Elements
const motorcycleGrid = document.getElementById('motorcycleGrid');
const addBtn = document.getElementById('addBtn');
const modal = document.getElementById('modal');
const motorcycleForm = document.getElementById('motorcycleForm');
const cancelBtn = document.getElementById('cancelBtn');
const modalTitle = document.getElementById('modalTitle');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    loadMotorcycles();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    addBtn.addEventListener('click', () => openModal());
    cancelBtn.addEventListener('click', () => closeModal());
    motorcycleForm.addEventListener('submit', handleSubmit);
    
    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// API Functions mit verbesserter Fehlerbehandlung
async function loadMotorcycles() {
    try {
        console.log(`Lade Motorräder von: ${API_BASE_URL}`);
        showNotification('Lade Motorräder...', 'info');
        
        const response = await fetch(API_BASE_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Response Status:', response.status);
        console.log('Response Headers:', [...response.headers.entries()]);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Empfangene Daten:', data);
        
        motorcycles = data;
        renderMotorcycles();
        showNotification(`${motorcycles.length} Motorräder geladen`, 'success');
        
    } catch (error) {
        console.error('Fehler beim Laden der Motorräder:', error);
        showNotification(`Fehler beim Laden: ${error.message}`, 'error');
        
        // Zeige Debug-Informationen
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            showNotification('Mögliche Ursachen: Backend nicht gestartet oder CORS-Problem', 'error');
        }
    }
}

async function createMotorcycle(motorcycleData) {
    try {
        console.log('Erstelle Motorrad:', motorcycleData);
        
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(motorcycleData)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }
        
        const newMotorcycle = await response.json();
        console.log('Motorrad erstellt:', newMotorcycle);
        
        motorcycles.push(newMotorcycle);
        renderMotorcycles();
        showNotification('Motorrad erfolgreich hinzugefügt!', 'success');
        
    } catch (error) {
        console.error('Fehler beim Erstellen:', error);
        showNotification(`Fehler beim Erstellen: ${error.message}`, 'error');
        throw error;
    }
}

async function updateMotorcycle(id, motorcycleData) {
    try {
        console.log(`Aktualisiere Motorrad ${id}:`, motorcycleData);
        
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({...motorcycleData, id: id})
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }
        
        const index = motorcycles.findIndex(m => m.id === id);
        if (index !== -1) {
            motorcycles[index] = {...motorcycleData, id: id};
        }
        renderMotorcycles();
        showNotification('Motorrad erfolgreich aktualisiert!', 'success');
        
    } catch (error) {
        console.error('Fehler beim Aktualisieren:', error);
        showNotification(`Fehler beim Aktualisieren: ${error.message}`, 'error');
        throw error;
    }
}

async function deleteMotorcycle(id) {
    try {
        console.log(`Lösche Motorrad ${id}`);
        
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }
        
        motorcycles = motorcycles.filter(m => m.id !== id);
        renderMotorcycles();
        showNotification('Motorrad erfolgreich gelöscht!', 'success');
        
    } catch (error) {
        console.error('Fehler beim Löschen:', error);
        showNotification(`Fehler beim Löschen: ${error.message}`, 'error');
    }
}

// UI Functions
function renderMotorcycles() {
    if (motorcycles.length === 0) {
        motorcycleGrid.innerHTML = `
            <div class="no-motorcycles">
                <h3>Keine Motorräder in der Garage</h3>
                <p>Füge dein erstes Motorrad hinzu!</p>
            </div>
        `;
        return;
    }
    
    motorcycleGrid.innerHTML = motorcycles.map(motorcycle => `
        <div class="motorcycle-card">
            <div class="motorcycle-header">
                <h3>${motorcycle.name}</h3>
                <div class="motorcycle-actions">
                    <button class="btn-secondary" onclick="editMotorcycle(${motorcycle.id})">
                        Bearbeiten
                    </button>
                    <button class="btn-danger" onclick="confirmDelete(${motorcycle.id})">
                        Löschen
                    </button>
                </div>
            </div>
            <div class="motorcycle-details">
                <div class="detail-item">
                    <strong>Marke:</strong> ${motorcycle.brand}
                </div>
                <div class="detail-item">
                    <strong>Modell:</strong> ${motorcycle.model}
                </div>
                <div class="detail-item">
                    <strong>Jahr:</strong> ${motorcycle.year}
                </div>
                <div class="detail-item">
                    <strong>Hubraum:</strong> ${motorcycle.cc} ccm
                </div>
                <div class="detail-item price">
                    <strong>Preis:</strong> €${motorcycle.price.toLocaleString()}
                </div>
            </div>
        </div>
    `).join('');
}

function openModal(motorcycle = null) {
    currentMotorcycle = motorcycle;
    modalTitle.textContent = motorcycle ? 'Motorrad bearbeiten' : 'Neues Motorrad hinzufügen';
    
    if (motorcycle) {
        document.getElementById('name').value = motorcycle.name;
        document.getElementById('brand').value = motorcycle.brand;
        document.getElementById('model').value = motorcycle.model;
        document.getElementById('year').value = motorcycle.year;
        document.getElementById('cc').value = motorcycle.cc;
        document.getElementById('price').value = motorcycle.price;
    } else {
        motorcycleForm.reset();
    }
    
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        currentMotorcycle = null;
    }, 300);
}

async function handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(motorcycleForm);
    const motorcycleData = {
        name: formData.get('name'),
        brand: formData.get('brand'),
        model: formData.get('model'),
        year: parseInt(formData.get('year')),
        cc: parseInt(formData.get('cc')),
        price: parseInt(formData.get('price'))
    };
    
    console.log('Form-Daten:', motorcycleData);
    
    try {
        if (currentMotorcycle) {
            await updateMotorcycle(currentMotorcycle.id, motorcycleData);
        } else {
            await createMotorcycle(motorcycleData);
        }
        closeModal();
    } catch (error) {
        // Fehler wird bereits in den API-Funktionen behandelt
    }
}

function editMotorcycle(id) {
    const motorcycle = motorcycles.find(m => m.id === id);
    if (motorcycle) {
        openModal(motorcycle);
    }
}

function confirmDelete(id) {
    const motorcycle = motorcycles.find(m => m.id === id);
    if (motorcycle && confirm(`Möchtest du "${motorcycle.name}" wirklich löschen?`)) {
        deleteMotorcycle(id);
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
    
    console.log(`${type.toUpperCase()}: ${message}`);
}