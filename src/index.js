console.log('%c HI', 'color: firebrick')

let breeds = [];

document.addEventListener("DOMContentLoaded", function () {
    fetchImages()
    fetchBreeds()
    changeColorOfBreedClicked()
    addBreedsEventListener()
})





function fetchImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const imageContainer = document.querySelector("#dog-image-container")
            data.message.forEach(function (element) {
                const img = document.createElement("img")
                img.src = element
                imageContainer.appendChild(img)
            })
        })
};

function fetchBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            breeds = Object.keys(data.message)
            console.log(breeds)
            const breedList = document.querySelector("#dog-breeds")
            breeds.forEach(function (element){
                const breed = document.createElement("li")
                breed.textContent = element
                breedList.appendChild(breed)
            })
        })
};

function changeColorOfBreedClicked () {
    let breedListSection = document.querySelector("#dog-breeds")
    breedListSection.addEventListener("click", function (e) {
        if (e.target.matches("li")) {
            e.target.style.color = "blue"
        }
    });
};

function sortBreedsByFirstLetter(letter) {
    const breedListSection = document.querySelector("#dog-breeds")
    let filteredBreeds = breeds.filter(breed => breed.startsWith(letter))
    removeAllChildren(breedListSection)
    filteredBreeds.forEach(function (breed) {
        let relBreed = document.createElement("li")
        relBreed.textContent = breed
        breedListSection.appendChild(relBreed)
    })
};

function addBreedsEventListener() {
    const breedLetterSelector = document.querySelector("#breed-dropdown")
    breedLetterSelector.addEventListener('change', function (e) {
        sortBreedsByFirstLetter(e.target.value)
    
    })
}

function removeAllChildren(element) {
    let child = element.lastElementChild
    while (child) {
        element.removeChild(child)
        child = element.lastElementChild
    }
}