// Script für Motorcycles Entrys
document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById("addMotorcycleBtn");
    const modal = document.getElementById("motorcycleModal");
    const closeBtn = document.getElementById("closeModal");

    addBtn.addEventListener("click", () => {
        modal.classList.add("show");
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("show");
    });


    document.getElementById("motorcycleForm").addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Motorrad wurde hinzugefügt! (Noch nicht implementiert)");
        modal.classList.remove("show");
    });
});




// Script für Service Entrys
document.addEventListener("DOMContentLoaded", () => {
    const addServiceBtn = document.getElementById("addServiceBtn");
    const serviceModal = document.getElementById("serviceModal");
    const closeServiceModal = document.getElementById("closeServiceModal");

// Öffnen des Modals
document.getElementById('openServiceModal').addEventListener('click', function () {
  document.getElementById('serviceModal').classList.add('show');
});

// Schließen des Modals
document.getElementById('closeServiceModal').addEventListener('click', function () {
  document.getElementById('serviceModal').classList.remove('show');
});



    document.getElementById("serviceForm").addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Serviceeintrag wurde hinzugefügt! (Noch nicht implementiert)");
        serviceModal.classList.remove("show");
    });
});

