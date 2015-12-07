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