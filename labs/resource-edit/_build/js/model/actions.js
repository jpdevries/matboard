var UPDATE_META = 'updatemeta';
var updateMeta = function(meta) {
  return {
    type:UPDATE_META,
    meta:meta
  }
}

exports.UPDATE_META = UPDATE_META;
exports.updateMeta = updateMeta;



var UPDATE_SETTINGS = 'updatesettings';
var updateSettings = function(settings) {
  return {
    type:UPDATE_SETTINGS,
    settings:settings
  }
}

exports.UPDATE_SETTINGS = UPDATE_SETTINGS;
exports.updateSettings = updateSettings;



var UPDATE_PUBLICATION = 'udpatepublication';
var updatePublication = function(publication) {
  return {
    type:UPDATE_PUBLICATION,
    publication:publication
  }
}

exports.UPDATE_PUBLICATION = UPDATE_PUBLICATION;
exports.updatePublication = updatePublication;

var UPDATE_RESOURCE_GROUP = 'updateresourcegroup';
var updateResourceGroup = function(index,active) {
  console.log('updateResourceGroup',index,active);
  return {
    type:UPDATE_RESOURCE_GROUP,
    index:index,
    active:active
  }
}

exports.UPDATE_RESOURCE_GROUP = UPDATE_RESOURCE_GROUP;
exports.updateResourceGroup = updateResourceGroup;


var UPDATE_RESOURCE_GROUPS = 'updateresourcegroups';
var updateResourceGroups = function(resourceGroups) {
  return {
    type:UPDATE_RESOURCE_GROUPS,
    resourceGroups:resourceGroups
  }
}

exports.UPDATE_RESOURCE_GROUPS = UPDATE_RESOURCE_GROUPS;
exports.updateResourceGroups = updateResourceGroups;



var UPDATE_CONTENT = 'updatecontent';
var updateContent = function(content) {
  return {
    type:UPDATE_CONTENT,
    content:content
  }
}

exports.UPDATE_CONTENT = UPDATE_CONTENT;
exports.updateContent = updateContent;
