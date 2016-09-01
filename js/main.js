$(document).ready(function() {
	seticon();
    getData(function(data){
		if(data.taskarray.length > 0){
			insertDBdata(data.taskarray);
		};
	});

	$('.insert').click(function(){
	insertInTable($('.text_f').val(),$('.time_f').val());
	var port = chrome.runtime.connect({name: "knockknock"});
	sendTaskArray(port,insert($('.info')));
	});
});

function insert(data){
	var arr = [];

	for(var i=0;i<data.length;i++){
		var taskObj = {
		"done":false,
		"text": $(data[i]).find(".text").text(),
		"time":$(data[i]).find(".time").text()
		};
		arr.push(taskObj);
	}
	return arr;
};

function insertInTable(text,time){
	$('table tr:last').after('<tr class="info"><td>1</td><td class="text">'+text+'</td><td class="time">'+time+'</td></tr>');
};

function sendTaskArray(port,arr){
	port.postMessage({data: arr});	
};


function getData(callback){
 chrome.storage.sync.get({taskarray:[]},callback);
};

function insertDBdata(data){
	data.forEach(function(item){
		insertInTable(item.text,item.time);
	});
};

function seticon(){
	chrome.browserAction.setIcon({
        path: 'icon2.png',
    });
};

