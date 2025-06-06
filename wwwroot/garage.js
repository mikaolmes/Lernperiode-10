// API Base URL - Korrigierte URLs basierend auf funktionierendem Code
const API_BASE_URL = 'http://localhost:5151/api'; // HTTP statt HTTPS wie im funktionierenden Code

// Debug-Modus aktivieren
const DEBUG = true;

// State Management
let motorcycles = [];
let serviceEntries = [];

// DOM Elements
const serviceModal = document.getElementById('serviceModal');
const serviceForm = document.getElementById('serviceForm');
const serviceCardsContainer = document.getElementById('serviceCards');
const openServiceModalBtn = document.getElementById('openServiceModal');
const closeServiceModalBtn = document.getElementById('closeServiceModal');
const motorcycleSelect = document.querySelector('select[name="motorcycle"]');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded, initializing garage app...');
    init();
    setupEventListeners();
});

// Event Listeners Setup
function setupEventListeners() {
    console.log('🔧 Setting up event listeners...');
    
    // Modal controls
    openServiceModalBtn.addEventListener('click', () => openServiceModal());
    closeServiceModalBtn.addEventListener('click', () => closeServiceModal());
    
    // Form submission
    serviceForm.addEventListener('submit', handleServiceSubmit);
    
    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeServiceModal();
    });
    
    // Close modal when clicking outside
    serviceModal.addEventListener('click', (e) => {
        if (e.target === serviceModal) closeServiceModal();
    });
}

// Initialisierung
async function init() {
    console.log('🚀 Initialisierung gestartet...');
    
    try {
        // Loading-Nachricht anzeigen
        serviceCardsContainer.innerHTML = '<div class="loading">Lade Daten...</div>';
        
        // Parallel laden für bessere Performance
        await Promise.all([
            loadMotorcycles(),
            loadServiceEntries()
        ]);
        
        // UI aktualisieren
        populateMotorcycleDropdown();
        renderServiceEntries();
        
        console.log('✅ Initialisierung abgeschlossen');
        
    } catch (error) {
        console.error('❌ Fehler bei der Initialisierung:', error);
        showNotification('Fehler beim Laden der Daten', 'error');
    }
}

// Motorräder laden - angepasst an funktionierende Version
async function loadMotorcycles() {
    try {
        console.log(`🔗 Lade Motorräder von: ${API_BASE_URL}/motorcycle`); // Korrigierte URL
        
        const response = await fetch(`${API_BASE_URL}/motorcycle`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        console.log('📡 Response Status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('📦 Empfangene Motorräder:', data);
        
        motorcycles = data;
        console.log(`✅ ${motorcycles.length} Motorräder geladen`);
        
        return motorcycles;
        
    } catch (error) {
        console.error('❌ Fehler beim Laden der Motorräder:', error);
        showNotification(`Fehler beim Laden der Motorräder: ${error.message}`, 'error');
        
        // Debug-Informationen
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            console.error('🔍 Mögliche Ursachen: Backend nicht gestartet oder CORS-Problem');
            showNotification('Mögliche Ursachen: Backend nicht gestartet oder CORS-Problem', 'error');
        }
        
        return [];
    }
}

// Service-Einträge laden
async function loadServiceEntries() {
    try {
        console.log(`🔗 Lade Service-Einträge von: ${API_BASE_URL}/ServiceEntry`);
        
        const response = await fetch(`${API_BASE_URL}/ServiceEntry`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        console.log('📡 Service Response Status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('📦 Empfangene Service-Einträge:', data);
        
        serviceEntries = data;
        console.log(`✅ ${serviceEntries.length} Service-Einträge geladen`);
        
        return serviceEntries;
        
    } catch (error) {
        console.error('❌ Fehler beim Laden der Service-Einträge:', error);
        showNotification(`Fehler beim Laden der Service-Einträge: ${error.message}`, 'error');
        return [];
    }
}

// Neuen Service-Eintrag erstellen
async function createServiceEntry(serviceData) {
    try {
        console.log('🔧 Erstelle Service-Eintrag:', serviceData);
        
        const response = await fetch(`${API_BASE_URL}/ServiceEntry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(serviceData)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }
        
        const newService = await response.json();
        console.log('✅ Service-Eintrag erstellt:', newService);
        
        serviceEntries.push(newService);
        renderServiceEntries();
        showNotification('Service-Eintrag erfolgreich hinzugefügt!', 'success');
        
        return newService;
        
    } catch (error) {
        console.error('❌ Fehler beim Erstellen des Service-Eintrags:', error);
        showNotification(`Fehler beim Erstellen: ${error.message}`, 'error');
        throw error;
    }
}

// Service-Eintrag löschen
async function deleteServiceEntry(id) {
    try {
        console.log(`🗑️ Lösche Service-Eintrag ${id}`);
        
        const response = await fetch(`${API_BASE_URL}/ServiceEntry/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }
        
        serviceEntries = serviceEntries.filter(s => s.id !== id);
        renderServiceEntries();
        showNotification('Service-Eintrag erfolgreich gelöscht!', 'success');
        
    } catch (error) {
        console.error('❌ Fehler beim Löschen:', error);
        showNotification(`Fehler beim Löschen: ${error.message}`, 'error');
    }
}

// Motorrad-Dropdown befüllen
function populateMotorcycleDropdown() {
    console.log('🔧 Befülle Motorrad-Dropdown...');
    console.log('Verfügbare Motorräder:', motorcycles);
    
    if (!motorcycleSelect) {
        console.error('❌ Motorrad-Select Element nicht gefunden!');
        return;
    }
    
    motorcycleSelect.innerHTML = '<option value="">Bitte wählen...</option>';
    
    motorcycles.forEach(motorcycle => {
        const option = document.createElement('option');
        option.value = motorcycle.id;
        option.textContent = `${motorcycle.name} (${motorcycle.brand} ${motorcycle.model})`;
        motorcycleSelect.appendChild(option);
    });
    
    console.log(`✅ ${motorcycles.length} Motorräder in Dropdown eingefügt`);
}

// Service-Einträge rendern
function renderServiceEntries() {
    console.log('🎨 Rendere Service-Einträge...');
    
    if (!serviceCardsContainer) {
        console.error('❌ Service Cards Container nicht gefunden!');
        return;
    }
    
    if (serviceEntries.length === 0) {
        serviceCardsContainer.innerHTML = `
            <div class="no-services">
                <h3>Keine Service-Einträge vorhanden</h3>
                <p>Füge den ersten Service-Eintrag hinzu!</p>
            </div>
        `;
        return;
    }
    
    serviceCardsContainer.innerHTML = serviceEntries.map(service => {
        const motorcycle = motorcycles.find(m => m.id === service.motorcycleId);
        const motorcycleName = motorcycle ? `${motorcycle.name} (${motorcycle.brand})` : 'Unbekanntes Motorrad';
        const serviceDate = new Date(service.last_Service).toLocaleDateString('de-DE');
        
        return `
            <div class="service-card">
                <div class="service-header">
                    <h3>🏍️ ${motorcycleName}</h3>
                    <button class="btn-danger" onclick="confirmDeleteService(${service.id})">
                        Löschen
                    </button>
                </div>
                <div class="service-details">
                    <div class="service-date">
                        <strong>📅 Datum:</strong> ${serviceDate}
                    </div>
                    <div class="service-description">
                        <strong>📝 Beschreibung:</strong>
                        <p>${service.description}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    console.log(`✅ ${serviceEntries.length} Service-Einträge gerendert`);
}

// Modal Functions
function openServiceModal() {
    console.log('📝 Öffne Service Modal...');
    
    // Datum auf heute setzen
    const dateInput = document.querySelector('input[name="date"]');
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }
    
    serviceModal.style.display = 'block';
    setTimeout(() => serviceModal.classList.add('show'), 10);
}

function closeServiceModal() {
    console.log('❌ Schließe Service Modal...');
    serviceModal.classList.remove('show');
    setTimeout(() => {
        serviceModal.style.display = 'none';
        serviceForm.reset();
    }, 300);
}

// Form Handling
async function handleServiceSubmit(e) {
    e.preventDefault();
    console.log('📤 Service-Formular wird verarbeitet...');
    
    const formData = new FormData(serviceForm);
    const serviceData = {
        last_Service: formData.get('date'),
        description: formData.get('description'),
        motorcycleId: parseInt(formData.get('motorcycle'))
    };
    
    console.log('📋 Service-Daten:', serviceData);
    
    // Validierung
    if (!serviceData.motorcycleId) {
        showNotification('Bitte wähle ein Motorrad aus!', 'error');
        return;
    }
    
    try {
        await createServiceEntry(serviceData);
        closeServiceModal();
    } catch (error) {
        // Fehler wird bereits in createServiceEntry behandelt
        console.error('❌ Fehler beim Speichern:', error);
    }
}

// Delete Confirmation
function confirmDeleteService(id) {
    const service = serviceEntries.find(s => s.id === id);
    const motorcycle = motorcycles.find(m => m.id === service?.motorcycleId);
    const motorcycleName = motorcycle ? motorcycle.name : 'Unbekanntes Motorrad';
    
    if (service && confirm(`Möchtest du den Service-Eintrag für "${motorcycleName}" wirklich löschen?`)) {
        deleteServiceEntry(id);
    }
}

// Notification System - kopiert aus funktionierendem Code
function showNotification(message, type = 'info') {
    console.log(`📢 ${type.toUpperCase()}: ${message}`);
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Styling für Notifications
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Farben je nach Typ
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#28a745';
            break;
        case 'error':
            notification.style.backgroundColor = '#dc3545';
            break;
        case 'info':
        default:
            notification.style.backgroundColor = '#17a2b8';
            break;
    }
    
    document.body.appendChild(notification);
    
    // Animation einblenden
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Nach 3 Sekunden ausblenden
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}