const dataSource = './travel_recommendation_api.json'

function getData(keyword, hasSubArray) {
        fetch(dataSource)
        .then(data => data.json())
        .then(destinations => {
            generateList(destinations[keyword], hasSubArray)
            })  
            .catch(e => console.log(`Error: ${e}`))
}

function keywordSearch() {
    const userInput = searchbarInput.value 
    console.log(userInput)

    const keyword = userInput.toLowerCase()
    switch(keyword) {
        case("beach"):
        case("beaches"):
            getData("beaches", false)
            break
        case("country"):
        case("countries"):
            getData("countries", true)
            break
        case("temple"):
        case("temples"):
            getData("temples", false)
            break
        default:
            break
    }
}

const searchBtn = document.getElementById('searchBtn')
searchBtn.addEventListener('click', keywordSearch)

const clearBtn = document.getElementById('clearBtn')
clearBtn.addEventListener('click', destroyList)

const searchbarInput = document.getElementById('searchbarInput')
searchbarInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') keywordSearch()
})

function generateList(list, hasSubArray) {
    destroyList()
    const listElem = document.createElement('div')
    listElem.className = 'resultList'
    
    console.log('- - - - - - -')
    console.log(list)

    if (list.length === 0) {
        console.log('nothing found, tell user somehow')
        return
    }

    if (hasSubArray) { // country
        for (country of list) {
            console.log('& & & ', country)
            let cityList = country.cities
            console.log('^ ^ ^ ', cityList)

            for (city of cityList) {
                const data = {
                    name: city.name, 
                    img: city.imageUrl,
                    description: city.description
                }
                console.log('--> ', data) 

                let newCard = document.createElement('div')
                newCard.className = 'destinationCard'

                let newDestName = document.createElement('div')
                newDestName.className = 'destinationName'
                newDestName.textContent = data.name
                

                let newDestImg = document.createElement('img')
                newDestImg.className = 'destinationImg'
                newDestImg.setAttribute('src', data.img)

                let newDestDesc = document.createElement('div')
                newDestDesc.className = 'destinationDesc'
                newDestDesc.textContent = data.description
                

                let newDestBtn = document.createElement('button')
                newDestBtn.className = 'destinationBtn'
                newDestBtn.textContent = 'Visit'
                

                newCard.append(newDestImg)
                newCard.append(newDestName)
                newCard.append(newDestDesc)
                newCard.append(newDestBtn)
                listElem.append(newCard)

                document.body.appendChild(listElem)

                listElem.style.visibility = 'visible'
            }
        }
    } else {
        for (city of list) {
            const data = {
                name: city.name ,
                img: city.imageUrl,
                description: `<p>${city.description}</p>`
            } 

            let newCard = document.createElement('div')
            newCard.className = 'destinationCard'

            let newDestName = document.createElement('div')
            newDestName.className = 'destinationName'
            newDestName.textContent = data.name
           

            let newDestImg = document.createElement('img')
            newDestImg.className = 'destinationImg'
            newDestImg.setAttribute('src', data.img)

            let newDestDesc = document.createElement('div')
            newDestDesc.className = 'destinationDesc'
            newDestDesc.innerHTML = data.description
            

            let newDestBtn = document.createElement('button')
            newDestBtn.className = 'destinationBtn'
            newDestBtn.textContent = 'Visit'
            

            newCard.append(newDestImg)
            newCard.append(newDestName)
            newCard.append(newDestDesc)
            newCard.append(newDestBtn)
            listElem.append(newCard)

            document.body.append(listElem)

            listElem.style.visibility = 'visible'
        }
    }
     
}

function destroyList() {
    const listCreated = document.getElementsByClassName('resultList')
    if (listCreated.length > 0) {
        listCreated[0].remove()
    }
    searchbarInput.value = ""
}