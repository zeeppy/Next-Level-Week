

    function populateUFs() {
        const ufSelect = document.querySelector("select[name=uf]")

        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json())
        .then( states => {

            for(const state of states) {
                ufSelect.innerHTML +=  `<option value="${state.id}">${state.nome}</option>`
            }
        })
    }

    populateUFs()
    


    function getCities(event){
        const citySelect = document.querySelector("select[name=city]")
        const stateInput = document.querySelector("input[name=state]")

        const ufValue = event.target.value

        const indexOfSelectedState = event.target.selectedIndex
        stateInput.value = event.target.options[indexOfSelectedState].text

        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

        citySelect.innerHTML = "<option value=>Selecione a Cidade</option>"
        citySelect.disabled = true
        



        fetch(url)
        .then( res => res.json())
        .then( cities => {

            for(const city of cities) {
                citySelect.innerHTML +=  `<option value="${city.nome}">${city.nome}</option>`

            }
            citySelect.disabled = false
        })
    }


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)
// Itens de coleta

// pegar todos os li's (botões)

const itemstoc = document.querySelectorAll(".itemsgrid li")

for(const item of itemstoc) {
    item.addEventListener("click", handleSelectedItem)

}
    const collectedItems =  document.querySelector("input[name=items]")
    let selectedItems = [] //ficou como array por ser um conjunto de dados
function handleSelectedItem(event) {

    //adicionar ou remover uma classe com js
    const itemLi = event.target
    itemLi.classList.toggle("selected") //toggle para adicionar e remover a classe

    const itemId = itemLi.dataset.id
    console.log('ITEM ID:', itemId)



    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item === itemId // isso retornará true ou false
        return itemFound
    })

    if (alreadySelected >= 0){

        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        
        selectedItems = filteredItems

    } else{
        selectedItems.push(itemId)
    }

    console.log('selectedItems:', selectedItems)
    collectedItems.value = selectedItems
       
    
}


