const liczba1 = document.querySelector('#liczba1')
const liczba2 = document.querySelector('#liczba2')
const liczba3 = document.querySelector('#liczba3')
const liczba4 = document.querySelector('#liczba4')

const btnPrzelicz = document.querySelector('#Przelicz')

const suma = document.querySelector('#suma')
const srednia = document.querySelector('#srednia')
const min = document.querySelector('#min')
const max = document.querySelector('#max')

btnPrzelicz.addEventListener('click', () => {
    suma.innerHTML = 'suma: '+ (parseInt(liczba1.value) + parseInt(liczba2.value) + parseInt(liczba3.value) + parseInt(liczba4.value)) 
    srednia.innerHTML = 'srednia: ' + (parseInt(liczba1.value) + parseInt(liczba2.value) + parseInt(liczba3.value) + parseInt(liczba4.value))/4
    min.innerHTML = 'min: ' + Math.min(parseInt(liczba1.value), parseInt(liczba2.value), parseInt(liczba3.value), parseInt(liczba4.value))
    max.innerHTML = 'max: ' + Math.max(parseInt(liczba1.value), parseInt(liczba2.value), parseInt(liczba3.value), parseInt(liczba4.value))
})