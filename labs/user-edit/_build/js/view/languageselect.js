var Select = require('./select');
var store = require('./../model/store');

class LanguageSelect extends Select {
  constructor(props) {
    super(props);
  }
}

console.log(store.getState());

LanguageSelect.propTypes = { options: React.PropTypes.array }
LanguageSelect.defaultProps = {
  options:(function(){
    return store.getState().data.languages.map((language) => {
      return {
        name:language.English,
        value:language.alpha2
      }
    });
  })()
};

module.exports = LanguageSelect;
