# <State-Park-Excursion>


## Description

Is it time to get outside, but you're not sure where to go? Do you need to "touch grass" but need some inspiration? Explore our U.S. National Park system! Here, you can get crucial park information on how to plan ahead for your future visit or run out the door right now. Discover pertinent travel details right from where you are.

The motivation behind this project is to help people who live in or who visit the United States connect (or reconnect) with the great outdoors. Travelers from abroad, newly settled families, and even established folks oftentimes shy away from the amazing natural world right at our fingertips despite wanting to go on an excursion.

This project was founded by three creators: Mia, Mike, and Josh. We learned how to better follow Agile workflow. We learned the importance of staying in touch and maintaining open lines of communication. It was crucial to meet in person at times and work in tandem. We also learned how to plan, organize, and execute stages of a larger project as well as how to look out for interdependencies. Lastly and very importantly, we delved deeper into understanding GitHub workflows:
- creating new branches and setting upstream
- opening PRs
- testing and reviewing code before approval
- adding comments into reviews
- merging branches
- resolving merge conflicts locally


## Table of Contents (Optional)

- [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Credits](#credits)
- [License](#license)


## Installation

N/A. [Deployed site here!](https://miacias.github.io/state-park-excursion)


## Usage

The opening screen welcomes users to explore United States National Parks. The navigation sidebar contains controls while the main page shows a carousel of enticing nature-filled images from the nation's parks.

As the user reads the page, they are alerted with a tooltip on a button to first save their map key supplied by Google Maps.

To use:
1. Type or paste in a Google Maps API key into the input field then click "Save." This box should disappear from view once the key is saved. NOTE: If a mistake is made, you can refresh the page to return this box to view and input a new key.
2. Now that a Google Maps API key is saved, return to the top of the navigation sidebar.
3. Input a starting address.
4. Select a state of interest.
5. Select a park of interest.
6. Click "GO" to open up a map and access more info!
7. After viewing the map and manipulating it as desired, click the "More Details" button for details on the park and travel.

Search in any park and any state, just be sure to add in your starting address!

The main page looks like this:

![hazy green background and lichen-pink navbar surrounds a carousel of outdoorsy images](./assets/images/planning/screencapture-Explore-our-National-Parks.png)


## Roadmap

Content will be added and adjusted as new coding projects are available! Some projects may phase out over time as my work becomes more specialized. Some desired features and functionality to be added in the future:
- refactor of UI that controls adding the Google Maps API key
	- hide after key is saved
	- check that key is valid before hide
- search history feature for easy access to most recent searches
- add in more park details to explore (videos, battles and history, etc.)
- persistent home/starting address for travel so user no longer needs to retype address repeatedly


## Credits

Documentation referenced:

- Mozilla Developer Network
- Materialize CSS & Materialize JS
- [National Parks Services API](https://www.nps.gov/subjects/developer/api-documentation.htm#/visitorcenters/getVisitorCenters)
- Google Maps Directions API
- Stack Overflow forums
- W3 Schools

Tutorials referenced:

- Web Tech In Depth on [YouTube](https://www.youtube.com/watch?v=XCC-K6Q9h7M) - initializing a Materialize CSS select option menu
- {RhymBil} on [YouTube](https://www.youtube.com/watch?v=2hJ1rTANVnk) - accessing array of objects from localStorage
- Sam Codes on [YouTube](https://www.youtube.com/watch?v=BkGtNBrOhKU) - Google Maps Directions API help

Tutor(s):

- [Alexis San Javier](https://github.com/code-guy21) - ternary operator, Materialize CSS troubleshooting
- [Marc Calache](https://github.com/CalacheMarc) - HTML defer, Google Maps API

U. Penn Bootcamp group project members:

- [Mia Ciasullo](https://github.com/miacias)
- [Mike Stem](https://github.com/mikestem)
- [Josh Ricefield](https://github.com/JSR5404)

U. Penn Bootcamp instructors:

- [Dan Gross](https://github.com/DanielWGross) - HTML defer, initializing Materialize CSS
- [Andrew Hojnowski](https://github.com/aHojo) - For Of loop
- Ross King - template literal

Artist(s):

- Color palette by dhzuehlke on [ColourLovers.com](https://www.colourlovers.com/palette/4893136/Die_Krabbe%C2%B2)
- Jamie Street on [Unsplash.com](https://unsplash.com/photos/_94HLr_QXo8) - photograph entitled "Compass overlooking the valley below"
- Chris Lawton on [Unsplash.com](https://unsplash.com/photos/o0l-M8W_7wA) - photograph entitled "Let the adventures begin"
- Kal Visuals on [Unsplash.com](Unsplash.com) 
	- [photograph](https://unsplash.com/photos/IG1m3RomhPI) entitled "Maps are greater than phones"
	- [photograph](https://unsplash.com/photos/3sVhudiAl84) entitled "Planning the day at Crater Lake National Park"
- Josh Carter on [Unsplash.com](https://unsplash.com/photos/5kk7fGDdGFM) - photograph entitled "National parks patches"


## License

Please refer to the LICENSE in the repo.