console.log('Init app');

const app = {
  apiBaseURL: 'https://hp-api.onrender.com/api/',
  fetcOption: {
    method: 'GET',
    cache: 'no-cache',
  },

  init: function () {
    app.selectorByName = document.querySelector('#characters');
    app.selectorByName.addEventListener('change', app.selectOneChars);

    app.review = document.querySelector('.review');
    app.charTemplate = document.querySelector('#charTemplate');

    app.loadCharacters();
  },

  loadCharacters: function () {
    fetch(app.apiBaseURL + 'characters', app.fetchOption)
      .then(function (response) {
        if (response.ok)
          return response.json();
        else
          alert('Une erreur est survenue lors du chargement des personnages : ' + response.status + ' ' + response.statusText);
      })
      .then(app.initCharacters)
      .catch(function (error) {
        console.log(error);
      });
  },

  initCharacters: function (chars) {
    for (let index = 0; index < chars.length; index++) {
      let optionSelector = document.createElement('option');
      optionSelector.textContent = chars[index].name;
      optionSelector.value = chars[index].id;

      app.selectorByName.appendChild(optionSelector);
    }
  },

  selectOneChars: function (evt) {
    console.log(evt.currentTarget.value);
    app.review.innerHTML = '';
    fetch(app.apiBaseURL + 'character/' + evt.currentTarget.value, app.fetchOption)
      .then(function (response) {
        if (response.ok)
          return response.json();
        else
          alert('Une erreur est survenue lors du chargement du personnage : ' + response.status + ' ' + response.statusText);
      })
      .then(app.onlyOneChar)
      .catch(function (error) {
        console.log(error);
      });
  },

  onlyOneChar: function (char) {

    let charReviewTemplate = app.charTemplate.content.cloneNode(true);
    let character = charReviewTemplate.querySelector('#character');
    console.log(character);

    let name = charReviewTemplate.querySelector('.name');
    name.textContent = char[0].name;

    let species = charReviewTemplate.querySelector('.species');
    if (char[0].species !== 'undefined')
      species.innerHTML += char[0].species;
    else
      species.classList.add('false');

    let gender = charReviewTemplate.querySelector('.gender');
    if (char[0].gender !== 'undefined')
      gender.innerHTML += char[0].gender;
    else
      gender.classList.add('false');

    let house = charReviewTemplate.querySelector('.house');
    if (typeof char[0].house !== 'undefined')
      house.innerHTML += char[0].house;
    else
      house.classList.add('false');

    let patronus = charReviewTemplate.querySelector('.patronus');
    if (typeof char[0].patronus !== 'undefined')
      patronus.innerHTML += char[0].patronus;
    else
      patronus.classList.add('false');

    let dateOfBirth = charReviewTemplate.querySelector('.dateOfBirth');
    if (typeof char[0].dateOfBirth !== 'undefined')
      dateOfBirth.innerHTML += char[0].dateOfBirth;
    else
      dateOfBirth.classList.add('false');

    let yearOfBirth = charReviewTemplate.querySelector('.yearOfBirth');
    if (typeof char[0].yearOfBirth !== 'undefined')
      yearOfBirth.innerHTML += char[0].yearOfBirth;
    else
      yearOfBirth.classList.add('false');

    let ancestry = charReviewTemplate.querySelector('.ancestry');
    if (typeof char[0].ancestry !== 'undefined')
      ancestry.innerHTML += char[0].ancestry;
    else
      ancestry.classList.add('false');

    let eyeColour = charReviewTemplate.querySelector('.eyeColour');
    if (typeof char[0].eyeColour !== 'undefined')
      eyeColour.innerHTML += char[0].eyeColour;
    else
      eyeColour.classList.add('false');

    let hairColour = charReviewTemplate.querySelector('.hairColour');
    if (typeof char[0].hairColour !== 'undefined')
      hairColour.innerHTML += char[0].hairColour;
    else
      hairColour.classList.add('false');

    let picture = charReviewTemplate.querySelector('.img-thumbnail');
    picture.src = char[0].image;

    let wood = charReviewTemplate.querySelector('.wood');
    if (typeof char[0].wand['wood'] !== 'undefined')
      wood.innerHTML += char[0].wand['wood'];
    else
      wood.classList.add('false');

    let core = charReviewTemplate.querySelector('.core');
    if (typeof char[0].wand['core'] !== 'undefined')
      core.innerHTML += char[0].wand['core'];
    else
      core.classList.add('false');

    let length = charReviewTemplate.querySelector('.length');
    if (typeof char[0].wand['length'] !== 'undefined')
      length.innerHTML += char[0].wand['length'];
    else
      length.classList.add('false');




    if (char[0].alive === true) {
      let alive = charReviewTemplate.querySelector('.alive');
      alive.classList.remove('false');
      alive.classList.add('true');
      alive.textContent = 'Alive'
      alive.classList.remove('badge-secondary')
      alive.classList.add('badge-primary')
      character.classList.add('border-primary');
    } else {
      let alive = charReviewTemplate.querySelector('.alive');
      alive.classList.remove('false');
      alive.classList.add('true');
      alive.textContent = 'Dead'
      alive.classList.remove('badge-primary')
      alive.classList.add('badge-secondary')
      character.classList.add('border-secondary');
    }

    if (char[0].wizard === true) {
      let wizard = charReviewTemplate.querySelector('.wizard');
      wizard.classList.remove('false');
      wizard.classList.add('true');
      wizard.textContent = 'Wizard'
      wizard.classList.remove('badge-light')
      wizard.classList.add('badge-success')
    } else {
      let wizard = charReviewTemplate.querySelector('.wizard');
      wizard.classList.remove('false');
      wizard.classList.add('true');
      wizard.textContent = 'Muggle'
      wizard.classList.remove('badge-success')
      wizard.classList.add('badge-light')
    }

    if (char[0].hogwartsStudent === true) {
      let hogwartsStudent = charReviewTemplate.querySelector('.hogwartsStudent');
      hogwartsStudent.classList.remove('false');
      hogwartsStudent.classList.add('true');
      hogwartsStudent.textContent = 'Student'
      hogwartsStudent.classList.add('badge-info')
    }

    if (char[0].hogwartsStaff === true) {
      let hogwartsStaff = charReviewTemplate.querySelector('.hogwartsStaff');
      hogwartsStaff.classList.remove('false');
      hogwartsStaff.classList.add('true');
      hogwartsStaff.textContent = 'Staff'
      hogwartsStaff.classList.add('badge-dark')
    }


    app.review.appendChild(charReviewTemplate);

  }

};

/** Initialisaiton de l'app au chargement du dom  */

document.addEventListener('DOMContentLoaded', app.init);

