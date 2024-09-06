document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    // Get the genre from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const genre = urlParams.get('genre');
    if (genre) {
        const genreTitle = document.getElementById('genre-title');
        if (genreTitle) {
            genreTitle.textContent = `${genre.charAt(0).toUpperCase() + genre.slice(1)} Albums`;
        }
        displayAlbumImages(genre);
    }
});


function displayAlbumImages(genre) {
    "use strict";
    fetch('collection.json')
        .then(response => response.json())
        .then(data => {
            if (!data.album_collection[genre]) {
                throw new Error(`${genre.charAt(0).toUpperCase() + genre.slice(1)} albums data is missing`);
            }
            const albums = data.album_collection[genre];
            const albumCollectionDiv = document.getElementById('album-collection');
            albumCollectionDiv.innerHTML = ''; // Clear existing content
            const genreTitle = document.getElementById('genre-title');
            if (genreTitle) {
                genreTitle.textContent = `${genre.charAt(0).toUpperCase() + genre.slice(1)} Albums`;
            }
            albums.forEach(album => {
                const albumElement = document.createElement('div');
                albumElement.classList.add('album');
                albumElement.innerHTML = `
                <a href="album.html?album=${album.id}">
                        <img src="${album.image}" alt="${album.album}">
                    </a>
                    <p>${album.artist}<br>${album.album}</p>
                    
                `;
                albumCollectionDiv.appendChild(albumElement);
            });
        })
        .catch(error => console.log('Error fetching albums: ', error));
}