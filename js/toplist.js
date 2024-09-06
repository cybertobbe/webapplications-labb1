function displayFavoriteAlbums() {
    "use strict";
    fetch('collection.json')
        .then(response => response.json())
        .then(data => {
            if (!data.album_collection) {
                throw new Error('Album collection data is missing');
            }
            const albumCollectionDiv = document.getElementById('album-collection');
            
            // Iterate over all genres and filter favorite albums
            for (const genre in data.album_collection) {
                if (data.album_collection.hasOwnProperty(genre)) {
                    const albums = data.album_collection[genre];
                    const favoriteAlbums = albums.filter(album => album.favorite === true);

                    favoriteAlbums.forEach(album => {
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
                }
            }
        })
        .catch(error => console.log('Error fetching albums: ', error));
}

displayFavoriteAlbums();



