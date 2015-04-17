# [OKC Hack Spots](http://adamveld12.github.io/hack-spots-okc)


This is the code for a website that shows spots where programmers, artists, students or anyone needing a workspace, can go to hack on their projects in the Oklahoma City area. This site was inspired by and forked from [jlord's](http://www.github.com/jlord) hack spots site. Check out some of her other awesome projects!


### Contribute

Pull requests are welcome, and please use the issues as a place of discussion for features and improvements, as well as bug and code issues.

If you would like to add a new hack spot on the site, you can suggest an edit to the [Google sheet](https://docs.google.com/spreadsheets/d/1IP_0vxifIw6cW6UP-vH0l-GvWBPA1NDG7j4cT17AKKs/edit?usp=sharing) and it will get merged in ASAP.


### Fork -n- Go!

GitHub gives free hosting for every repository (see [GitHub Pages](http://pages.github.com)). This repo only has a **gh-pages** branch, the branch GitHub hosts, which means as soon as you **fork** it, you have a hosted and live version of it yourself! Read more about [fork-n-go](http://jlord.github.io/forkngo) type of projects.

Next, create a spreadsheet with the same column headers as [the original](https://docs.google.com/spreadsheets/d/1IP_0vxifIw6cW6UP-vH0l-GvWBPA1NDG7j4cT17AKKs/edit?usp=sharing).

Click on the `js/main.js` file, click edit and change **line 5** (or thereabouts) it looks like: 

```javascript
    document.addEventListener('DOMContentLoaded', function() {
	  	var gData
	  	var URL = "0Ao5u1U6KYND7dFVkcnJRNUtHWUNKamxoRGg4ZzNiT3c"
			Tabletop.init( { key: URL, callback: showInfo, simpleSheet: true } ) 
    }) 
```

Replace the existing spreadsheet URL key with your spreadsheet's key. You'll find that by clicking (in Google Spreadsheets) File > Publish to the Web > Start Publishing, it will then display the key in a window. ![get key](https://raw.github.com/jllord/sheetsee-cache/master/img/key.png)

Commit those changes and **LIKE WOAH** you now have a version of this website hooked to a spreadsheet that you can distrubute however you'd like.

You can find your version at **yourGitHubName.github.io/theReposName** (in this case /hack-spots).

### But How?

A Google Spreadsheet holds all the data and it is connected to this website using the goodies in [sheetsee.js](http://www.github.com/jlord/sheetsee.js). Everytime you visit the website, you'll have the most up to date data that has been entered into the spreadsheet. 

