

document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    // Get the album id from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get('album');
    if (albumId) {
        displayAlbumDetails(albumId);
    }
});

function displayAlbumDetails(albumId) {
    "use strict";
    fetch('collection.json')
        .then(response => response.json())
        .then(data => {
            // Find the album with the matching id
            let album;
            for (const genre in data.album_collection) {
                album = data.album_collection[genre].find(a => a.id == albumId);
                if (album) break;
            }
            if (!album) {
                throw new Error(`Album with id ${albumId} not found`);
            }

            const albumDetailsDiv = document.getElementById('album-details');


            // Create the tracklist
            let tracklistHTML = '<ul>';
            let trackNumber = 0;
            album.tracklist.forEach(track => {
                trackNumber++;
                tracklistHTML += `<li>${trackNumber}. ${track}</li>`;
            });
            tracklistHTML += '</ul>';

            albumDetailsDiv.innerHTML = `
            <div class="album-details-container">
            <div class="album-content-container">
                <ul>
                    <li>Artist: <label>${album.artist}</label></li>
                    <li>Album: <label>${album.album}</label></li>
                    <li>Year: <label>${album.year}</label</li>
                </ul>
            
                <li>Tracklist:
                    <label>${tracklistHTML}</label>
                </li>
            </div>
            <div class="img-cover-container">
                <img src="${album.image}" alt="${album.album}">
            </div>
            `;
        })
        .catch(error => console.log('Error fetching album details: ', error));
}