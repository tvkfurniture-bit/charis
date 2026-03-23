document.addEventListener('DOMContentLoaded', () => {
    const listingGrid = document.getElementById('listing-grid');
    const path = window.location.pathname;

    // Render Listings Logic
    const renderListings = (filterType = 'all') => {
        if (!listingGrid) return;
        const listings = API.getListings();
        listingGrid.innerHTML = '';

        const filtered = filterType === 'all' 
            ? listings 
            : listings.filter(item => item.type === filterType);

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${item.img}" class="card-img" alt="${item.title}" loading="lazy">
                <div class="card-content">
                    <h3>${item.title}</h3>
                    <p>${item.location}</p>
                    <p class="price">${item.price}</p>
                    <div class="actions">
                        <a href="tel:0727469119" class="btn btn-call">Call</a>
                        <a href="https://wa.me/254727469119?text=Interested in ${item.title}" class="btn btn-wa">WhatsApp</a>
                    </div>
                    <button onclick="toggleFav(${item.id})" class="btn" style="width:100%; margin-top:10px; background:#eee">
                        ❤️ Favorite
                    </button>
                </div>
            `;
            listingGrid.appendChild(card);
        });
    };

    // Determine which page we are on
    if (path.includes('buy.html')) renderListings('buy');
    else if (path.includes('rent.html')) renderListings('rent');
    else if (path.includes('offices.html')) renderListings('office');
    else if (path.includes('leasing.html')) renderListings('leasing');
    else renderListings('all');

    // Handle Loan Simulation
    const loanForm = document.getElementById('loan-form');
    if (loanForm) {
        loanForm.onsubmit = (e) => {
            e.preventDefault();
            const amount = document.getElementById('amount').value;
            const result = amount * 0.12; // Simple 12% interest simulation
            alert(`Estimated Monthly Repayment: Ksh ${((parseInt(amount) + result) / 12).toFixed(2)}`);
        };
    }
});

// Global favorite toggle
window.toggleFav = (id) => {
    API.toggleFavorite(id);
    alert('Favorites Updated!');
};
