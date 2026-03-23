const API = {
    // Initial Mock Data
    initData: () => {
        if (!localStorage.getItem('listings')) {
            const sampleListings = [
                { id: 1, title: "Modern Apartment", type: "rent", price: "Ksh 45,000", location: "Nairobi", category: "apartment", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400" },
                { id: 2, title: "Prime Office Space", type: "office", price: "Ksh 120,000", location: "Westlands", category: "office", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400" },
                { id: 3, title: "3-Acre Farm Land", type: "leasing", price: "Ksh 200,000", location: "Naivasha", category: "land", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400" }
            ];
            localStorage.setItem('listings', JSON.stringify(sampleListings));
        }
        if (!localStorage.getItem('favorites')) localStorage.setItem('favorites', JSON.stringify([]));
    },

    getListings: () => JSON.parse(localStorage.getItem('listings')),
    
    getFavorites: () => JSON.parse(localStorage.getItem('favorites')),

    toggleFavorite: (id) => {
        let favs = API.getFavorites();
        if (favs.includes(id)) favs = favs.filter(f => f !== id);
        else favs.push(id);
        localStorage.setItem('favorites', JSON.stringify(favs));
    },

    saveListing: (listing) => {
        const listings = API.getListings();
        listings.push({ ...listing, id: Date.now() });
        localStorage.setItem('listings', JSON.stringify(listings));
    }
};

API.initData();
