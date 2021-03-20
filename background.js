/* Background script */
/* responsible for creating new folders, saving links in the folders and maintaing the desirec max tab number */

var bkname = "save";
var bkid;
var bknum = 7;
var deletedTab;
var tabTitle;
var deleteid;


/* function that retrieves folder and tab information and creates new folder if need be */
chrome.runtime.onMessage.addListener (function(request, sender, sendResponse) {
    bkname = request.x;
    bknum = request.y;
    chrome.bookmarks.search({'title': request.x}, function(newfolder) {
        if(newfolder.length == 0) {
            chrome.bookmarks.create( {'parentId': '1','title': request.x}, function(newFolder) {
            });
        }
        else {
            bkid = newfolder[0].id;
        }
    });
});

/* retrives the current tab to save in the desired folder */
chrome.tabs.query({windowType:'normal'}, function(tabs) {
    chrome.tabs.getSelected(null, function(tab) {
        deletedTab = tab.url;
        tabTitle = tab.title;
        deleteid = tab.id;
    });
});

/* alerts user of tab being saved and deletes that tab, saving it in the folder */
function alertme() { 
    chrome.tabs.query({windowType:'normal'}, function(tabs) {
        if(tabs.length > bknum) {
            var tabConfirm= confirm(tabTitle + " is being saved in folder " + bkname);
            if(tabConfirm == true){
                chrome.tabs.getSelected(null, function(tab){
                    chrome.bookmarks.create({ 'parentId': bkid, 'title': tabTitle,'url': deletedTab});
                    chrome.tabs.remove(deleteid);
                });
            }
            else {
                chrome.tabs.query({ active: true, currentWindow: true }, ([currentTab]) => {
                    chrome.bookmarks.create({ 'parentId': currentTab.parentId, 'title': currentTab.title,'url': currentTab.url});
                    chrome.tabs.remove(currentTab.id);
                  });

            }
        }
    });
}
chrome.tabs.onCreated.addListener(alertme);

/* onclick activated function to insure the current tab is correct */
function tabid() {
    chrome.tabs.query({windowType:'normal'}, function(tabs) {
        chrome.tabs.getSelected(null, function(tab){
            deletedTab = tab.url;
            tabTitle = tab.title;
            deleteid = tab.id;
        });
    });
}
chrome.tabs.onActivated.addListener(tabid);

  

