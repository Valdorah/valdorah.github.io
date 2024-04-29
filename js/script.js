window.onload = () => {
    prepareNavbar()
}

const prepareNavbar = () => {
    const btn = document.querySelector('#btn-menu')
    const menuPanel = document.querySelector('#menu-panel')

    btn.addEventListener('click', () => {
        const { classList } = menuPanel

        if(classList.contains('hidden')) {
            classList.remove('hidden')
        } else {
            classList.add('hidden')
        }
    })
}