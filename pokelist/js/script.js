var contenu = document.getElementById('contenu');
var navigationElt = document.createElement('span');

function fillPage(url){
    ajaxGet(url, response => {
    var page = JSON.parse(response);
    page.results.forEach(pokemon => {
        var pokeDiv = document.createElement('div');
        var pokeName = document.createElement('p');
        var imgElt = document.createElement('img');
        var types = document.createElement('div');
        var description = document.createElement('p');
        var find = false;

        pokeDiv.setAttribute('class', 'nes-container with-title');

        ajaxGet(pokemon.url, response_2 =>{
            var details = JSON.parse(response_2);
            imgElt.setAttribute('src', details.sprites.front_default);
            
            details.types.forEach(index => {
                var type = document.createElement('p');

                type.setAttribute('class', index.type.name);
                type.textContent = index.type.name;

                types.appendChild(type);
            });

            ajaxGet(details.species.url, response_3 =>{
                var details = JSON.parse(response_3);
                details.flavor_text_entries.forEach(element => {
                    if(element.language.name == 'en' && find == false){
                        description.textContent = element.flavor_text;
                        find = true;
                    }
                });
            });
        });

        pokeName.setAttribute('class', 'title');
        pokeName.textContent = pokemon.name;

        imgElt.style.cssFloat = 'left';

        pokeDiv.appendChild(pokeName);
        pokeDiv.appendChild(imgElt);
        pokeDiv.appendChild(types);
        pokeDiv.appendChild(description);

        contenu.appendChild(pokeDiv);
        });

        if(page.previous != null){
            var buttonPrevious = document.createElement('button');
            var lienPrevious = document.createElement('a');

            lienPrevious.setAttribute('href', page.previous);
            buttonPrevious.setAttribute('class', 'nes-btn');
            buttonPrevious.textContent = 'Previous page';
            lienPrevious.appendChild(buttonPrevious);

            contenu.appendChild(lienPrevious);

            buttonPrevious.addEventListener('click', function (e) {
                e.preventDefault();
                contenu.innerHTML='';
                fillPage(page.previous);
            });
        }
        
        if(page.next != null){
            var buttonNext = document.createElement('button');
            var lienNext = document.createElement('a');

            lienNext.setAttribute('href', page.next);
            buttonNext.setAttribute('class', 'nes-btn');
            buttonNext.textContent = 'Next page';
            lienNext.appendChild(buttonNext);

            contenu.appendChild(lienNext);

            buttonNext.addEventListener('click', function (e) {
                e.preventDefault();
                contenu.innerHTML='';
                fillPage(page.next);
            });
        }
    });
}

fillPage('https://pokeapi.co/api/v2/pokemon/');