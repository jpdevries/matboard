// browser compatibility check
if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {
    // protect the code
	(function(savebutton) {
		
			resourceForm = document.getElementById("resource");
			resourceSaveButton = document.getElementById("save");
			resourceFormPagetitle = document.getElementById("pagetitle");
			resourceHeaderTitle = document.getElementById("header-title");

			resourceSaveButton.disabled=true;
			initValues = serialize(resourceForm);
	
			resourceForm.onkeyup = function(){
				pressValues = serialize(resourceForm);
				if (pressValues != initValues) {
					resourceSaveButton.disabled=false;
				} else {
					resourceSaveButton.disabled=true;
				}
		 };
 
		 resourceForm.onclick = function(){
				pressValues = serialize(resourceForm);
				if (pressValues != initValues) {
					resourceSaveButton.disabled=false;
				} else {
					resourceSaveButton.disabled=true;
				}
		 };
 
		resourceFormPagetitle.onkeyup = function() {
			resourceHeaderTitle.innerHTML = resourceFormPagetitle.value;
		};
		
		resourceSaveButtononpaste="setTimeout(function() {showSample()}, 30)"
			 
	}(window.savebutton = window.savebutton || {}));    
}