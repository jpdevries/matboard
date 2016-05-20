var actions = require('./../model/actions');
var store = require('./../model/store');

var ResourceTitle = function(props) {
  return (
    <h1>{props.pagetitle}</h1>
  );
};

var ButtonBar = function(props) {
  return (
    <div className="button-bar">
      <div>
        <button disabled={!props.save} type="submit">Save</button>
      </div>
      <div>
        <button formaction="/resource/duplicate">Duplicate</button>
      </div>
      <div>
        <button>Delete</button>
      </div>
      <div>
        <button formaction="/resource/preview" formtaget="_blank">View</button>
      </div>
    </div>
  );
};

var ResourceFieldsetMeta = function(props) {
  var meta = props.meta;

  var templateOptions = [{
    name:'Base Template',
    value:'0'
  },{
    name:'Blog Post',
    value:'1'
  },{
    name:'Product',
    value:'2'
  }];

  var options = templateOptions.map(function(option){
    var selected = option.value == meta.template;
    return <option selected={selected} key={option.value} value={option.value}>{option.name}</option>;
  });

  return (
    <fieldset>
      <legend>Document</legend>
      <div className="field-group">
        <div className="pagetitle-field">
          <label for="pagetitle">Pagetitle</label>
          <input type="text" name="pagetitle" value={meta.pagetitle} onChange={(event) => (
            store.dispatch(actions.updateMeta({
              pagetitle: event.target.value
            }))
          )} required />
        </div>

        <div className="longtitle-field">
          <label for="longtitle">Long Title</label>
          <input type="text" name="longtitle" value={meta.longtitle} onChange={(event) => (
            store.dispatch(actions.updateMeta({
              longtitle: event.target.value
            }))
          )} />
        </div>

        <div className="description-field">
          <label for="description">Description</label>
          <textarea type="text" name="description" value={meta.description} onChange={(event) => (
            store.dispatch(actions.updateMeta({
              description: event.target.value
            }))
          )}></textarea>
        </div>

        <div className="introtext-field">
          <label for="introtext">Intro Text</label>
          <textarea type="text" name="introtext" value={meta.introtext} onChange={(event) => (
            store.dispatch(actions.updateMeta({
              introtext: event.target.value
            }))
          )}></textarea>
        </div>

      </div>
      <div className="field-group">
        <div>
          <label for="template">Template {meta.template}</label>
          <select name="template" onChange={(event) => (
            store.dispatch(actions.updateMeta({
              template: event.target.value
            }))
          )}>
            {options}
          </select>
        </div>

        <div className="alias-field">
          <label for="alias">Alias</label>
          <input type="text" name="alias" value={meta.alias} onChange={(event) => (
            store.dispatch(actions.updateMeta({
              alias: event.target.value
            }))
          )}/>
        </div>

        <div className="menutitle-field">
          <label for="menutitle">Menu Title</label>
          <input type="text" name="menutitle" value={meta.menutitle} onChange={(event) => (
            store.dispatch(actions.updateMeta({
              menutitle: event.target.value
            }))
          )} />
        </div>

        <div className="link-attributes-field">
          <label for="link-attributes">Link Attributes</label>
          <input type="text" name="link-attributes" value={meta.linkAttributes} onChange={(event) => (
            store.dispatch(actions.updateMeta({
              linkAttributes: event.target.value
            }))
          )} />
        </div>

        <div className="menuhide-field">
          <label for="menuhide">Hide From Menus</label>
          <input type="checkbox" name="menuhide" checked={meta.menuhide} onChange={(event) => (
            store.dispatch(actions.updateMeta({
              menuhide: event.target.checked
            }))
          )} />
        </div>

        <div className="published-field">
          <label for="published">Published</label>
          <input type="checkbox" name="published" checked={meta.published} onChange={(event) => (
            store.dispatch(actions.updateMeta({
              published: event.target.checked
            }))
          )} />
        </div>
      </div>
    </fieldset>
  );
};

var ResourceFieldSettings = function(props) {
  var settings = props.settings;

  var parentResources = [{
    name:'',
    value:'0'
  },{
    name:'Blog (1)',
    value:'1'
  },{
    name:'Products (2)',
    value:'2'
  }];

  var resourceTypes = [{
    name:'Resource',
    value:'modResource'
  },{
    name:'Symlink',
    value:'modSymlink'
  },{
    name:'WebLink',
    value:'modWebLink'
  }];

  var contentTypes = [
    {
      name:'Content',
      types:[{
          name:'HTML',
          value:'html'
      },{
        name:'JSON',
        value:'json'
      },{
        name:'PDF',
        value:'pdf'
      },{
        name:'RSS',
        value:'rss'
      },{
        name:'Text',
        value:'text'
      },{
        name:'XML',
        value:'xml'
      }]
    },{
      name:'Assets',
      types:[{
        name:'CSS',
        value:'css'
      },{
        name:'JavaScript',
        value:'js'
      }]
    }
  ];

  var parentResourceOptions = parentResources.map((option) => (
    <option selected={option.value == settings.parent} key={option.value} value={option.value}>{option.name}</option>
  ));

  var resourceTypeOptions = resourceTypes.map((option) => (
    <option selected={option.value == settings.resourceType} key={option.value} value={option.value}>{option.name}</option>
  ));

  var contentTypesOptions = contentTypes.map((optgroup) => {
    var optgOptions = optgroup.types.map((option) => (
      <option selected={option.value == settings.contentType} key={option.value} value={option.value}>{option.name}</option>
    ));
    return (<optgroup label={optgroup.name}>{optgOptions}</optgroup>);
  });

  return (
    <fieldset>
      <legend>Settings</legend>
      <div className="field-group">
        <div className="parent-resource-field">
          <label for="parent-resource">Parent Resource</label>
          <select name="parent-resource" onChange={(event) => (
            store.dispatch(actions.updateSettings({
              parent: event.target.value
            }))
          )}>
            {parentResourceOptions}
          </select>
        </div>

        <div className="resource-type-field">
          <label for="resource-type">Resource Type</label>
          <select name="resource-type" onChange={(event) => (
            store.dispatch(actions.updateSettings({
              resourceType: event.target.value
            }))
          )}>
            {resourceTypeOptions}
          </select>
        </div>

        <div className="field content-type-field">
          <label for="content_type">Content Type</label>
          <select name="content_type" onChange={(event) => (
            store.dispatch(actions.updateSettings({
              contentType: event.target.value
            }))
          )}>
            {contentTypesOptions}
          </select>
        </div>

        <div className="field field-content_disposition">
          <label for="content_disposition">Content Disposition</label>
          <input type="radio" checked={settings.contentDisposition == "inline"} value="inline" name="content_disposition" onChange={(event) => (
            store.dispatch(actions.updateSettings({
              contentDisposition: event.target.value
            }))
          )} />Inline<br />
          <input type="radio" checked={settings.contentDisposition == "attachment"} value="attachment" name="content_disposition" onChange={(event) => (
            store.dispatch(actions.updateSettings({
              contentDisposition: event.target.value
            }))
          )} />Attachment
        </div>

        <div className="field field-menuindex">
          <label for="menuindex">Menu Index</label>
          <input type="number" name="menuindex" value={settings.menuindex} min="0" step="1" onChange={(event) => (
            store.dispatch(actions.updateSettings({
              menuindex: event.target.value
            }))
          )} />
        </div>

      </div>

      <div className="field-group">
        <fieldset className="checbox-field">
          <legend>Booleans</legend>
          <label for="container"><input name="container" checked={settings.container} type="checkbox" onChange={(event) => (
            store.dispatch(actions.updateSettings({
              container: event.target.checked
            }))
          )} />&nbsp; Container</label>
          <label for="searchable"><input name="searchable" checked={settings.searchable} type="checkbox" onChange={(event) => (
            store.dispatch(actions.updateSettings({
              searchable: event.target.checked
            }))
          )} />&nbsp; Searchable</label>
          <label for="richText"><input name="richText" checked={settings.richText} type="checkbox"onChange={(event) => (
            store.dispatch(actions.updateSettings({
              richText: event.target.checked
            }))
          )} />&nbsp; Rich Text</label>
          <label for="freezeURI"><input name="freezeURI" checked={settings.freezeURI} type="checkbox"onChange={(event) => (
            store.dispatch(actions.updateSettings({
              freezeURI: event.target.checked
            }))
          )} />&nbsp; Freeze URI</label>
          <label for="cacheable"><input name="cacheable" checked={settings.cacheable} type="checkbox"onChange={(event) => (
            store.dispatch(actions.updateSettings({
              cacheable: event.target.checked
            }))
          )} />&nbsp; Cacheable</label>
          <label for="emptyCache"><input name="emptyCache" checked={settings.emptyCache} type="checkbox" onChange={(event) => (
            store.dispatch(actions.updateSettings({
              emptyCache: event.target.checked
            }))
          )} />&nbsp; Empty Cache</label>
          <label for="deleted"><input name="deleted" checked={settings.deleted} type="checkbox" onChange={(event) => (
            store.dispatch(actions.updateSettings({
              deleted: event.target.checked
            }))
          )} />&nbsp; Deleted</label>
        </fieldset>
      </div>

    </fieldset>
  );
};

var ResourcePublicationFieldset = function(props) {
  var publication = props.publication;

  return (
    <fieldset>
      <legend>Publication</legend>
      <div className="field-group">
        <div className="field field-publishedon">
          <label for="publishedon">Published On</label>
          <input type="datetime" name="publishedon" value={publication.publishedon} onChange={(event) => (
            store.dispatch(actions.updatePublication({
              publishedon: event.target.value
            }))
          )} />
        </div>
        <div className="field field-pubdate">
          <label for="pubdate">Published Date</label>
          <input type="datetime" name="pubdate" value={publication.pubdate} onChange={(event) => (
            store.dispatch(actions.updatePublication({
              pubdate: event.target.value
            }))
          )} />
        </div>
        <div>
          <label for="unpubdate">Unpublish date</label>
          <input type="datetime" name="unpubdate" onChange={(event) => (
            store.dispatch(actions.updatePublication({
              unpubdate: event.target.value
            }))
          )} />
        </div>
      </div>
    </fieldset>
  );
};

var ResourceGroupFieldset = function(props) {
  var resourceGroups = props.resourceGroups;

  var groupsData = [{
    name:'Group 1',
    id:0,
    active:false
  },{
    name:'Group 2',
    id:1,
    active:true
  },{
    name:'Group 3',
    id:2,
    active:false
  }];

  var groups = resourceGroups.map((group,index) => (
    <tr>
      <td>{group.name}</td>
      <td><label for={'rsgrp-' + group.id + '-access'}><input type="checkbox" checked={group.active} name={'rsgrp-' + group.id + '-access'} onChange={(event) => (
        store.dispatch(actions.updateResourceGroup(index,event.target.checked))
      )} /></label></td>
    </tr>
  ));

  return (
    <fieldset>
      <legend>Resource Groups</legend>
      <p>Here you can select which Resource Group this Resource belongs&nbsp;to.</p>
      <table className="resource-groups">
        <thead>
          <tr>
            <th>Name</th>
            <th>Access</th>
          </tr>
        </thead>
        {groups}
      </table>
    </fieldset>
  );
}

var ResourceContentFieldset = function(props) {
  return (
    <fieldset className="content">
      <legend>Content</legend>
      <label for="content">Content</label>
      <textarea name="content" cols="30" rows="10" onChange={(event) => (
        store.dispatch(actions.updateContent(event.target.value))
      )}>{props.content}</textarea>
    </fieldset>
  );
};

var ResourceEditForm = React.createClass({
  render:function(){
    return (
      <div>
        <ResourceTitle pagetitle={this.props.meta.pagetitle} />
        <form>
          <ButtonBar save={this.props.meta.pagetitle.length > 0} />
          <ResourceFieldsetMeta meta={this.props.meta} />
          <ResourceFieldSettings settings={this.props.settings} />
          <ResourcePublicationFieldset publication={this.props.publication} />
          <ResourceGroupFieldset resourceGroups={this.props.resourceGroups} />
          <ResourceContentFieldset content={this.props.content} />
          <footer>
            <ButtonBar save={this.props.meta.pagetitle.length > 0} />
          </footer>
        </form>
      </div>
    );
  }
});

module.exports = ResourceEditForm;
