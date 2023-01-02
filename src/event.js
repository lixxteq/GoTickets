const proxy = 'http://localhost:3005'

const transpileDate = (sqlDateString) => {
    let s1 = sqlDateString.split(/[- : T Z]/)
    let s2 = (new Date(Date(s1[0], s1[1]-1, s1[2], s1[3], s1[4], s1[5]))).toDateString()
    return s2
}

const loadEventData = async () => {
    const idEvent = new URLSearchParams(window.location.search).get('id')
    const response = await fetch(`${proxy}/api/event/${idEvent}`)
    const data = await response.json()
    const eventData = data.values.eventInfo[0]
    const seatsData = data.values.seats


    console.log(eventData, seatsData)
    fillEventBlock(eventData)
    seatsData.forEach((seat) => createSeatBlock(seat))
}

const fillEventBlock = (eventData) => {
    const eventBlock = document.querySelector('.event_info')
    const eventPoster = eventBlock.querySelector('.event_poster')
    const eventName = eventBlock.querySelector('.event_name')
    const eventDate = eventBlock.querySelector('.event_date')
    const eventPlace = eventBlock.querySelector('.event_place')
    const eventSeatamount = eventBlock.querySelector('.event_seatamount')
    const eventDescription = eventBlock.querySelector('.description')

    eventPoster.src = `assets/posters/${eventData.Poster}`
    eventName.textContent = eventData.EventName
    eventDate.textContent = 'Дата проведения: ' + transpileDate(eventData.Date)
    eventPlace.textContent = `${eventData.CityName}, ${eventData.EventPlaceName}, ${eventData.Address}`
    eventSeatamount.textContent = `Количество мест в зале: ${eventData.SeatAmount}`
    eventDescription.textContent = eventData.Description
}

const createSeatBlock = (seatData) => {
    const seatsBlock = document.querySelector('.seats_info')
    const seatInfo = document.createElement('div')
    const info = document.createElement('h3')
    const book = document.createElement('button')
    book.textContent = 'Забронировать место'
    const clickHandler = (e) => {
        const idEvent = new URLSearchParams(window.location.search).get('id')
        console.log(seatData);
        let data = {
            sector: seatData.Sector,
            row: seatData.Row,
            number: seatData.Number,
            eventplace_id: seatData.EventPlace_id,
            event_id: idEvent,
            token: localStorage.getItem('token')
        }

        console.log(data);
        console.log(JSON.stringify(data));

        fetch(`${proxy}/api/booking`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        alert('Место успешно забронировано')
    }
    book.onclick = clickHandler

    info.textContent = `Сектор: ${seatData.Sector}, Ряд: ${seatData.Row}, Место: ${seatData.Number}, Цена: ${seatData.Price}`
    seatInfo.append(info)
    seatInfo.append(book)

    seatsBlock.append(seatInfo)
}

window.onload = () => {
    loadEventData()
}