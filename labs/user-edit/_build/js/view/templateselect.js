var Select = require('./select');
var store = require('./../model/store');

class TemplateSelect extends Select {
  constructor(props) {
    super(props);
  }
}

console.log(store.getState());

TemplateSelect.propTypes = { options: React.PropTypes.array }
TemplateSelect.defaultProps = {
  options:[{
    name:'Base Template',
    value:'0'
  }]
};

module.exports = TemplateSelect;
