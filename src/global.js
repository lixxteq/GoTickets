const checkAuth = () => {
    if (localStorage.getItem('token') && localStorage.getItem('email')) {
        let accountTitle = document.querySelector('.account a')
        accountTitle.textContent = `Вы вошли как ${localStorage.getItem('email')}`
    }
}

window.addEventListener('load', () => {
    checkAuth()
})