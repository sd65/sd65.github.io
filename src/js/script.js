//Piwik

 var _paq = _paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//46.101.251.79/";
    _paq.push(['setTrackerUrl', u+'piwik.php']);
    _paq.push(['setSiteId', '1']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
  })();

// Do not polute the global scope
(function (){
  
  // Global vars  
  var projects = document.getElementsByClassName("project")
  var selectedTagsDiv = document.getElementById('selectedTags');  
  var nbOfProjectsMatching = document.getElementById('nbOfProjectsMatching');  
  var tagsMatchingInfo = document.getElementById('tagsMatchingInfo');  
  
  var tagOnClick = function () {
    // Do the main action, remove or add in selected Tags
    if (this.parentNode.id === "tags" || this.parentNode.className === "info") {
      var tags = selectedTagsDiv.children
      for (var i = 0; i < tags.length; i++) {
        if (tags[i].innerText === this.innerText) {
          // Duplicate
          return
        }
      }
      var copy = this.cloneNode(true)
      copy.onclick = this.onclick
      selectedTagsDiv.appendChild(copy)
    } else if (this.parentNode.id === "selectedTags") { // Glossary
      this.remove()
    }
    // Update the selected Tags
    var tagsElements = selectedTagsDiv.children
    var selectedTags = Array()
    for (var i = 0; i < tagsElements.length; i++) {
      selectedTags.push(tagsElements[i].innerText)
    }
    // Hide projects without those tags
    if (selectedTags.length === 0) {
      for (var i = 0; i < projects.length; i++) {
          projects[i].style.display = "block"
      }
      tagsMatchingInfo.style.display = "none"
    }
    else {
      var nbOfMatch = 0
      for (var i = 0; i < projects.length; i++) {
        var projectTags = projects[i].getElementsByClassName("tag")
        var foundOneMatching = false
        for (var j = 0; j < projectTags.length; j++) {
          if (selectedTags.indexOf(projectTags[j].innerText) >= 0) {
            foundOneMatching = true
            nbOfMatch++
          }
        }
        if (foundOneMatching) {
          projects[i].style.display = "block"
        } else {
          projects[i].style.display = "none"
        }
      }
      tagsMatchingInfo.style.display = "block"
      nbOfProjectsMatching.innerText = nbOfMatch
    }
  }

  // Get all the tags defined in Projects
  var uniqTagsSet = new Set()
  var tags = document.getElementsByClassName("tag")
  for (var i = 0; i < tags.length; i++) {
    uniqTagsSet.add(tags[i].innerText)
  }
  var uniqTags = Array.from(uniqTagsSet).sort()
  
  // Format them
  var html = uniqTags.map(function (e) {
    return "<span class='tag'>" + e + "</span>" 
  }).join("")
  document.getElementById("nbProjects").innerText = projects.length
  document.getElementById("tags").innerHTML = html
  
  // Bind the tagOnClick function
  tags = document.getElementsByClassName("tag")
  for (var i = 0; i < tags.length; i++) {
    tags[i].onclick = tagOnClick
  }
  

})()
