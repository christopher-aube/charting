export default () => {
    let buttons:NodeListOf<HTMLButtonElement> = document.querySelectorAll('.button')

    function setRippleCoors(
        ev:MouseEvent
    ) {
        let x = ev.offsetX + 'px'
        let y = ev.offsetY + 'px'
        this.style.setProperty('--mouse-x', x)
        this.style.setProperty('--mouse-y', y)
    }

    buttons.forEach((
        btn:HTMLButtonElement
    ) => {
        btn.addEventListener('mousemove', setRippleCoors)
    })
}