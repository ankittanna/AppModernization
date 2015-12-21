// Tab Switch Logic
function switchTabStyle(tab)
{
    var currentActiveTab = tab.id;
    
    if(tab.id === 'bookTab')
    {
        document.getElementById(currentActiveTab).className = 'active';
        document.getElementById('searchTab').className = '';
    } else if(tab.id === 'searchTab')
    {
        document.getElementById(currentActiveTab).className = 'active';
        document.getElementById('bookTab').className = '';
    }
    
}

// Date Not Previous Day
Date.prototype.notPreviousDay = function(d) {
  return !(d.getFullYear() >= this.getFullYear()
    && d.getDate() >= this.getDate()
    && d.getMonth() >= this.getMonth());
};