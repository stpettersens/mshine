/*
 Moonshine environment for Lua-based
 services in Mozilla Firefox web browser
 Copyright (c) 2007 Sam Saint-Pettersen
      
 This program is released "as is" under
 the GNU General Public License V3.
*/
// display main window
function dialog()
{
    var mshd = window.openDialog("chrome://moonshine/content/msh.xul",
    "mshd","chrome,centerscreen,width=570,height=350");
}
// load moonshine application
function load()
{
    var nsIFilePicker = Components.interfaces.nsIFilePicker;
    var fp = Components.classes["@mozilla.org/filepicker;1"]
    .createInstance(nsIFilePicker);
    fp.init(window, "Load a Moonshine application", nsIFilePicker.modeOpen);
    fp.appendFilter("MSH applications (*.msh)","*.msh");
    var res = fp.show();  
    if(res == nsIFilePicker.returnOK)
    {
        var file = fp.file;
        //install(file);
        execute(file); //!
    }    
}
/*
// install application in mshapps directory
function install(file)
{
    // if it doesn't exist, create a new mshapps dir
    var folder = Components.classes["@mozilla.org/file/directory_service;1"]
    .getService(Components.interfaces.nsIProperties)
    .get("ProfD", Components.interfaces.nsIFile);
    folder.append("msh_apps");
    if(!folder.exists() || !folder.isDirectory())
    {
        folder.create(Components.interfaces.nsIFile.DIRECTORY_TYPE, 0777);
    } 
    // if it doesn't exist, create a new apps.xml,
    var appsxml = Components.classes["@mozilla.org/file/directory_service;1"]
    .getService(Components.interfaces.nsIProperties)
    .get(//!!!, Components.interfaces.nsIFile);
    appsxml.append("apps.xml");
    if(!appsmxl.exists())
    {
        appsxml.create(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 0666);
        
        // open and write base structure for newly created apps.xml
    }        
    // copy metadata for application to apps.xml
    
}
*/
// execute application using moonshine core interpreter
function execute(file)
{
    // create an nsILocalFile for the executable
    var mshc = Components.classes["@mozilla.org/file/local;1"]
    .createInstance(Components.interfaces.nsILocalFile);
    
    // specify executable, depending on platform
    if(navigator.appVersion.indexOf("Win") != -1) 
    {
	    // for windows
        mshc.initWithPath("c://windows//notepad.exe"); 
    }
    else if(navigator.appVersion.indexOf("Linux") != -1)
    {	
	    // for linux
        mshc.initWithPath("/usr/bin/gedit");
    }
    else
    {
	    // error message for unsupported platforms
		alert("Could not execute application.\n" +
		"Because a version of the MSH core intepreter\n" +
		"does not exist for your platform.");   
	}
    // create an nsIProcess 
    var process = Components.classes["@mozilla.org/process/util;1"]
    .createInstance(Components.interfaces.nsIProcess);
    
    // initialize the process
    process.init(mshc);

    // run the process with specified arguments
    var args = [file.path];
    process.run(false, args, args.length)
}

