const proxy = 'http://localhost:3005'

const attachDelete = () => {
    const deleteId = document.querySelector('.deleteEvent input')
    const deleteBtn = document.querySelector('.deleteEvent button')

    const deleteEvent = () => {
        const data = {
            idEvent: deleteId.value
        }
        fetch(`${proxy}/api/event/delete`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
    }

    deleteBtn.onclick = deleteEvent
}

const attachEdit = () => {
    const editId = document.querySelector('.editEvent .id')
    const editDesc = document.querySelector('.editEvent .desc')
    const editBtn = document.querySelector('.editEvent button')

    const editEvent = () => {
        const data = {
            idEvent: editId.value,
            description: editDesc.value
        }
        console.log(data);
        fetch(`${proxy}/api/event/edit`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    editBtn.onclick = editEvent
}

window.onload = () => {
    attachDelete()
    attachEdit()
}