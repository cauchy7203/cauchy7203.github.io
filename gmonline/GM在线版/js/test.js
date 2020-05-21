$(function(){
    var initData = [0,0,0,0,0,0,0,0];
    var initLen = [0,0,0,0,0,0,0,0];
    
    $.jqplot('chart1', [initData, initData],{
		title: "Grey System Simulation and Prediction",
		axesDefaults: {
			labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
			tickOptions:{
				showLabel: true
			}
		},
		axes: {
			xaxis: {
				label: 'No. of Data',
				tickOptions: {
					formatString: '%d'
				},
				min: 1,
				ticks:initLen
			},
			yaxis: {
				label: 'Value'
			}
		},
		grid: {
                drawBorder: false,
                shadow: false,
                //The background color of the whole chart.
                background: '#FFFFFF'
            },
			legend: {
				renderer: $.jqplot.EnhancedLegendRenderer,
				show: true,
				location: 'nw'
			},
            highlighter: { show: true },
            seriesDefaults: { 
                shadowAlpha: 0.2,
                shadowDepth: 2,
                fillToZero: true
            },
            series: [
                {
					label: 'simulation',
                    color: 'red',
                    showMarker: true,
                    showLine: true,
                    markerOptions: {
                        style: 'filledCircle',
                        size: 5
                    },
                    rendererOptions: {
                        smooth: true
                    }
                },
                {
					label: 'original',
                    color: 'yellow',
                    showMarker: true,
                    showLine: true,
                    rendererOptions: {
                        smooth: true,
                    },
                    markerOptions: {
                        style: 'filledSquare',
                        size: 5
                    },
                }
            ],
			 cursor : {  
                show : true,  
                showTooltip: true, // 是否显示提示信息栏   
                followMouse: true, //光标的提示信息栏是否随光标（鼠标）一起移动   
                zoom : true,  
                looseZoom : true,  
                showTooltip : true,  
                tooltipOffset: 6,    
                showTooltipUnitPosition: true,  
                ooltipFormatString: '%.2f',    
            }
		});
    
	var output=[];
	var original;
	//jQuery 事件响应 
	$('#get').on('click',function(){
		var arr = ["","",""];
		arr[0] = $('#input').val();
		arr[1] = $('#build').val();
		arr[2] = $('#predict').val();
		var type = $('#type').val();
		console.log('type');
		console.log(type);
		//console.log(arr);
		original = arr[0]; 
		
	original = original.trim();
	
	//检查输入
	//检查输入是否为空白字符
	if(original == ""){
		alert("请输入数据！");
		location.reload();
		return;
	}
	
	//分隔符是否正确
	if(original.search(",") != -1){
		original = original.split(",");
	}else if(original.search(/\s+/) != -1){
		original = original.split(/\s+/);
	}else{
		alert("请以正确的格式分隔数据!");
		location.reload();
		return;
	}
	
	//是否包含数字字符
	for(let i = 0; i < original.length; i++){
		if(isNaN(original[i])){
			alert("输入非法！ 输入包含非数字字符！");
			location.reload();
			return;
		}
	}

	original = original.map(Number);
	console.log('original order:');
	console.log(original);
	var numofBuild = parseInt(arr[1]);
	
	
	try{
		if(numofBuild>original.length){
			alert("建模数据个数应小于或等于原始数据个数！");
			location.reload();
			return;
		}
	
		var numofPredi = 0;
		if(arr[2] !== ""){
		numofPredi = parseInt(arr[2])
		}
		var simpleGM;
		//判断模型
		if(type=="gm11"){
			simpleGM = new GM(original,numofBuild,numofPredi);
		}else if(type == "gmct"){
			simpleGM = new GMCT(original, numofBuild, numofPredi);
		}else if(type == "gms"){
			simpleGM = new GMS(original, numofBuild, numofPredi);
		}else if(type == "gmi"){
			simpleGM = new GMI(original, numofBuild, numofPredi);
		}else if(type == "gmnc3"){
			simpleGM = new GMNC3(original, numofBuild, numofPredi);
		}else if(type == "gmc"){
			simpleGM = new GMC(original, numofBuild, numofPredi);
		}else if(type == "gmg2"){
			simpleGM = new GMG2(original, numofBuild, numofPredi);
		}
		
		output = simpleGM.getResults();
	}catch(e){
		alert('运算出错！点击确认重新加载页面！');
		location.reload(); 
        return;
	}
	console.log('output:');
	console.log(output);
	console.log(' fiting and prediction:');
	console.log(output[0]);
	console.log(' error:');
	console.log(output[1]);
	console.log('relative error:');
	console.log(output[2]);
	
	}).on('click',function(){
		// 折线图
		$('#chart1').html("");
		len = [];
		for(i = 0; i < output[0].length;i++){
			len.push(i+1);
		}
		$.jqplot('chart1', [output[0], original],{
			title: "Grey System Simulation and Prediction",
		axesDefaults: {
			labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
			tickOptions:{
				showLabel: true
			}
		},
		axes: {
			xaxis: {
				label: 'No. of Data',
				tickOptions: {
					formatString: '%d'
				},
				min: 1,
				ticks:len
			},
			yaxis: {
				label: 'Value'
			}
		},
		grid: {
                drawBorder: false,
                shadow: false,
                //The background color of the whole chart.
                background: '#FFFFFF'
            },
			legend: {
				renderer: $.jqplot.EnhancedLegendRenderer,
				show: true,
				location: 'nw'
			},
            highlighter: { show: true },
            seriesDefaults: { 
                shadowAlpha: 0.2,
                shadowDepth: 2,
                fillToZero: true
            },
            series: [
                {
					label: 'simulation',
                    color: 'red',
                    showMarker: true,
                    showLine: true,
                    markerOptions: {
                        style: 'filledCircle',
                        size: 5
                    },
                    rendererOptions: {
                        smooth: true
                    }
                },
                {
					label: 'original',
                    color: 'yellow',
                    showMarker: true,
                    showLine: true,
                    rendererOptions: {
                        smooth: true,
                    },
                    markerOptions: {
                        style: 'filledSquare',
                        size: 5
                    },
                }
            ],
			 cursor : {  
                show : true,  
                showTooltip: true, // 是否显示提示信息栏   
                followMouse: true, //光标的提示信息栏是否随光标（鼠标）一起移动   
                zoom : true,  
                looseZoom : true,  
                showTooltip : true,  
                tooltipOffset: 6,    
                showTooltipUnitPosition: true,  
                ooltipFormatString: '%.2f',    // 同Highlighter的tooltipFormatString    
            }
		});
		
		//$('#output').text(output[0].join('----')+'(共'+output[0].length+'个数据)')
	}).on('click',function(){
		// 表格
		var dataSet = [];
		for(i = 0; i < output[0].length; i++){
			var temp = [0,0,0,0];
			temp[0] = i + 1;
			if(i < original.length){
				temp[1] = original[i];
				temp[2] = output[0][i];
				temp[3] = output[2][i];
			}else{
				temp[1] = '-';
				temp[2] = output[0][i];
				temp[3] = '-';
			}
			dataSet.push(temp);
		}
		if ( $.fn.dataTable.isDataTable( '#example' ) ) {
			table.destroy();
			table = $('#example').DataTable({
			data: dataSet,
			columns: [
			{title: "NO."},
			{title: "original"},
			{title: "simulation"},
			{title: "error(%)"}
			]
			});
		}
		else {

			table = $('#example').DataTable( {
			paging: false,
			data: dataSet,
			columns: [
			{title: "NO."},
			{title: "original"},
			{title: "simulation"},
			{title: "error(%)"}
			]
		} );
}
	});
	function restoreTable(restore){
		var results = '<p><table id="table1" border=1><tr>还原值序列</tr><tr>';
		console.log(restore.length);
		for(let i=0;i<restore.length;i++){
			results=results+'<td>'+restore[i]+'</td>';
		}
		results=results+'</tr><table></p>';
		return results;
		
	}
});