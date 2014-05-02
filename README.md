matboard
========

WIP. A Conceptual Proof demonstrated with several different toolkits.

## Discuss
Join the converation in our public Gitter chat room.
[![Gitter chat](https://badges.gitter.im/jpdevries/matboard.png)](https://gitter.im/jpdevries/matboard)
 
## Assignment
### Part 1
Each proof should create a basic Admin page with a responsive save button and post data over AJAX and meet the below requirements:
 * Create title, alias, and content inputs along with a save button that is only active when appropriate
 * `h1` should initially read 'New Resource'
 * Whenever the value of the title changes update the `h1` to reflect the change  
 * Until interacted with by the user, the value of the alias field should be set based off the title appropriately 
 * If changes are pending and the window is closed, a confirm alert should be invoked
 * When the save button is clicked the form data should be posted over AJAX (to static html file is fine)  

## Proofs
The following proofs are in progress:
 - ~~Angular~~ _(Turned in [v0.1.0](https://github.com/jpdevries/matboard/releases/tag/v0.1.0))_
 - Ember
 - Backbone
 - VanillaJS

The following frameworks are being considered for future proofs:
 - CanJS
 - OneJS

[Contact JP DeVries](mailto:jp@modx.com) to request a framework or inquire about contributing.

## Resources
![](http://jpdevries.s3.amazonaws.com/assets/uploads/matboard/assignment/pt1/graphic2.png)

In `_build/templates/default` you will find an `index.html` file with a sample layout of the required elements. Base styles are included in `assets/default/` if you choose to use them. 

## See Also
 * [Roadmap](https://github.com/jpdevries/matboard/wiki/Roadmap)
