class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {options: props.options,value:props.defaultValue}
  }
  render() {
    var optionsMarkup = this.state.options.map((option) => (
      <option value={option.value} key={option.value}>{option.name}</option>
    ));

    return(
      <select {...this.props} onChange={(event) => {
        this.setState({value:event.target.value});
        if(this.props.onChange) this.props.onChange(event);
      }}>
        {optionsMarkup}
      </select>
    );
  }
}

Select.propTypes = { options: React.PropTypes.array }
Select.defaultProps = {
  options:[]
};

module.exports = Select;
