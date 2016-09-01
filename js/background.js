(function() {
	//window.setInterval(function(){
//}, 5000);
check();
chrome.runtime.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(msg) {
		//console.log(msg.data);
		saveData(msg.data);
	});
	/*port.onDisconnect.addListener(function(port){ 
		//console.log(views[0].document);
	});*/
});

})();


function saveData(data){
	chrome.storage.sync.set({taskarray : data});
};

function check(){
	window.setInterval(function(){
		if(chrome.extension.getViews({ type: "popup" }).length > 0){
			getDataFormDB(function(data){
				if(data.taskarray.length > 0){
					var nowDate = new Date().setMilliseconds(0);
					data.taskarray.forEach(function(item,index){
						if(convertDate(item.time) == nowDate){
							doNotifi(item,index);
						};
						
					});
				};
			});
		};
	},1000);

};

function doNotifi(task,index){
	var options = {
		type: "basic",
  		title: "Внимание!!!! "+task.time,
  		message: task.text,
  		iconUrl: "2.png"
	};

	chrome.notifications.create(index.toString(), options);

	chrome.browserAction.setIcon({
            path: '2.png',
    });

};

function getDataFormDB(callback){
	chrome.storage.sync.get({taskarray:[]},callback);
};


function convertDate(date){
	var a=date.split(' ');
	var t =a[1].split(':');
	return new Date(reverseDate(a[0].split(".").join("-"))).setHours(t[0],t[1],0,0);
};

function reverseDate(string){
	var a=string.split('-');
	return a[2]+"-"+a[1]+"-"+a[0];
}