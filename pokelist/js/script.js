var contenu = document.getElementById('contenu');

function fillPage(url){
    ajaxGet(url, response => {
    var page = JSON.parse(response);
    page.results.forEach(pokemon => {
        var pokeDiv = document.createElement('section');
        var pokeName = document.createElement('p');
        var imgElt = document.createElement('img');
        var types = document.createElement('div');
        var text = document.createElement('p');
        var find = false;

        pokeDiv.setAttribute('class', 'nes-container with-title');

        ajaxGet(pokemon.url, response_2 =>{
            var details = JSON.parse(response_2);
            imgElt.setAttribute('src', details.sprites.front_default);
            
            details.types.forEach(index => {
                var type = document.createElement('span');

                type.setAttribute('class', index.type.name);
                type.textContent = index.type.name;

                types.appendChild(type);
            });

            ajaxGet(details.species.url, response_3 =>{
                var details = JSON.parse(response_3);
                details.flavor_text_entries.forEach(element => {
                    if(element.language.name == 'en' && find == false){
                        text.textContent = element.flavor_text;
                        find = true;
                    }
                });
            });
        });

        pokeName.setAttribute('class', 'title');
        pokeName.textContent = pokemon.name;

        imgElt.style.cssFloat = 'left';

        types.setAttribute('class', 'types');

        pokeDiv.appendChild(pokeName);
        pokeDiv.appendChild(imgElt);
        pokeDiv.appendChild(types);
        pokeDiv.appendChild(text);

        contenu.appendChild(pokeDiv);
        });

        var navigationElt = document.createElement('div');
        navigationElt.setAttribute('class', 'buttonsPage');

        if(page.previous != null){
            var buttonPrevious = document.createElement('button');

            buttonPrevious.setAttribute('class', 'nes-btn');
            buttonPrevious.textContent = 'Previous page';

            navigationElt.appendChild(buttonPrevious);

            buttonPrevious.addEventListener('click', function (e) {
                e.preventDefault();
                contenu.innerHTML='';
                fillPage(page.previous);
            });
        }
        
        if(page.next != null){
            var buttonNext = document.createElement('button');

            buttonNext.setAttribute('class', 'nes-btn');
            buttonNext.textContent = 'Next page';

            navigationElt.appendChild(buttonNext);

            buttonNext.addEventListener('click', function (e) {
                e.preventDefault();
                contenu.innerHTML='';
                fillPage(page.next);
            });
        }

        contenu.appendChild(navigationElt);
    });
}

fillPage('https://pokeapi.co/api/v2/pokemon/');