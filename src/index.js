const proxy = 'http://localhost:3001'

const transpileDate = (sqlDateString) => {
    let s1 = sqlDateString.split(/[- : T Z]/)
    let s2 = (new Date(Date(s1[0], s1[1]-1, s1[2], s1[3], s1[4], s1[5]))).toDateString()
    return s2
}

const loadEvents = async () => {
    const response = await fetch(`${proxy}/api/events`)
    const events = await response.json()
    console.log(events);
    events.values.forEach((event) => {
        createEventBlock(event)
    })
}

const createEventBlock = (event) => {
    const eventsList = document.querySelector('.events')
    const eventBlock = document.createElement('div')
    eventBlock.classList.add('event')
    const eventPoster = document.createElement('img')
    const eventName = document.createElement('h1')
    const eventDate = document.createElement('h2')
    const eventPlace = document.createElement('h2')
    const reserveButton = document.createElement('button')
    eventPlace.textContent = event.CityName + ' ' + event.Address
    eventName.textContent = event.EventName
    eventDate.textContent = 'Дата проведения: ' + transpileDate(event.Date)
    eventPoster.src = `assets/posters/${event.Poster}`
    reserveButton.onclick = () => {location.href = `event.html?id=${event.idEvent}`}
    reserveButton.textContent = 'Подробнее / приобрести билет'
    eventBlock.append(eventPoster, eventName, eventDate, eventPlace, reserveButton)
    eventsList.append(eventBlock)
}

const searchEvents = () => {
    const searchBar = document.querySelector('#search_bar')
    const submitButton = document.querySelector('.search > form > button')
    const eventsList = document.querySelector('.events')
    const clickHandler = async (e) => {
        e.preventDefault()
        const eventQuery = searchBar.value
        const response = await fetch(`${proxy}/api/events/search?query=${eventQuery}`)
        const events = await response.json()
        console.log(events);
        eventsList.innerHTML = ''
        events.values.forEach((event) => {
            createEventBlock(event)
        })
    }
    submitButton.onclick = clickHandler
}

window.onload = () => {
    loadEvents()
    searchEvents()
}