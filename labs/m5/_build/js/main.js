let hidePageComponents = true;

document.querySelector('html').classList.remove('no-js');
document.querySelector('html').classList.add('js');

const radios = document.querySelectorAll('input[type="radio"]');
for(let i = 0; i < radios.length; i++) {
  const radio = radios[i];
  radio.addEventListener('change', function(event) {
    hidePageComponents = event.target.value ==1 ? true : false;
    //doFilterPageComponents(hidePageComponents);
    (hidePageComponents) ? document.querySelector('html').classList.add('hide-unmatched-elements') :  document.querySelector('html').classList.remove('hide-unmatched-elements') ;
  });
}

document.getElementById('ubersearch').addEventListener('input', function(event) {
  if(event.target.value) event.target.classList.add('dirty');
  if(hidePageComponents) {
    doFilterPageComponents(event.target.value);
  }
});

document.getElementById('ubersearch').addEventListener('focus', function(event) {
  if(event.target.value) event.target.classList.add('dirty');
});

document.getElementById('ubersearch').addEventListener('blur', function(event) {
  if(!event.target.value) event.target.classList.remove('dirty');
});

function doFilterPageComponents(filter) {
  filter = filter.trim().toLowerCase();

  const filterWords = filter.split(' ');

  const pageComponents = document.querySelectorAll('#mainnav__nav li');
  for(let i = 0; i < pageComponents.length; i++) {
    const pageComponent = pageComponents[i];

    let match = (function(){
      let found = false;

      for(let i = 0; i < filterWords.length; i++) {
        const filterWord = filterWords[i];

        try {
          if(
          pageComponent.querySelector('h3 > a').innerHTML.toLowerCase().includes(filterWord) ||
          pageComponent.querySelector('p').innerHTML.toLowerCase().includes(filterWord)
          )  {
          console.log('match');
          return true;
          }
        } catch(e) { }

      }

      return found;
    })();

    if(!match && filter) {
        pageComponent.setAttribute('hidden','true');
        pageComponent.setAttribute('aria-hidden','true');
      } else {
      pageComponent.removeAttribute('hidden');
      pageComponent.removeAttribute('aria-hidden');
    }
  }
}
