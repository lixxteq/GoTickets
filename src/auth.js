const proxy = 'http://localhost:3005'

const attachHandlers = () => {
    let errorField = document.querySelector('.error_field')
    let [emailField, passwordField] = document.querySelectorAll('input')
    let loginButton = document.querySelector('.main button')
    loginButton.onclick = async () => {
        let data = {email: emailField.value, password: passwordField.value}
        const response = await fetch(`${proxy}/api/auth?email=${data.email}&password=${data.password}`)
        const rdata = await response.json()
        if (rdata.values != 'NOT_FOUND') {
            localStorage.setItem('token', rdata.values.token)
            localStorage.setItem('email', rdata.values.Email)
        }
    }
}

window.onload = () => {
    attachHandlers()
}