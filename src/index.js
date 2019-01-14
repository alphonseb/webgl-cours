import './css/style.styl'

console.log('loaded')




if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => {
    })
}
