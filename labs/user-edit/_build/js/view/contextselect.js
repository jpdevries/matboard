var Select = require('./select');

class ContextSelect extends Select {
  constructor(props) {
    super(props);
  }
}

ContextSelect.propTypes = { options: React.PropTypes.array }
ContextSelect.defaultProps = {
  options:[{
    name:'web',
    value:'0'
  },{
    name:'api',
    value:'1'
  }]
};

module.exports = ContextSelect;
