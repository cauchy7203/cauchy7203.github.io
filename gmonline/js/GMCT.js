
/**
 *  构造函数创建 GMCT 对象 ,创建实例后通过getResults方法返回一个二维数组,
 *  二维数组里包含了 :1,拟合和模拟后的序列   2, 误差数组   3, 相对误差数组
 * @param array 原始序列
 * @param numOfBuild 用于建模的数据的个数
 * @param numOfPrediction 需要预测的数据的个数
 * @param method 选择用于计算背景值的方法
 *
 * getResults method returns a two-dimensional array holding: 0: a array of fiting and predicting data 1: error array 2: relative error array
 * */
var GMCT = function(array,numOfBuild,numOfPrediction,method){

    this.array = array;
    this.numOfBuild = numOfBuild;
    this.numOfPrediction = numOfPrediction;
    this.method = method;

    /**
     * 所有实例可且仅可以通过这个方法返回计算结果
     * */
    GMCT.prototype.getResults = function(){
        var output = [];
        var original = [];
        for(var i=0;i<this.numOfBuild;i++){
            original[i]=this.array[i];
        }
        var accumuOrder =  BasicCal.accumuOrder(original);
        var resArr = restoreData(original,accumuOrder,this.numOfPrediction);
        var restore = BasicCal.invAccumulOrder(resArr);
		//模拟和预测序列
        output[0] = BasicCal.dateFormat(restore);
		//残差
		output[1] = [];
		//相对误差
		output[2] = [];
		
		if((this.numOfBuild+this.numOfPrediction)<this.array.length){
			for(let i=0;i<this.numOfBuild+this.numOfPrediction;i++){
				output[1][i] = this.array[i] - output[0][i];
				output[2][i] = (Math.abs(output[1][i])/this.array[i])*100;
			}
		}
		else{
			for(let i=0;i<this.array.length;i++){
				output[1][i] = this.array[i] - output[0][i];
				output[2][i] = (Math.abs(output[1][i])/this.array[i])*100;
			}
		}
		output[1] = BasicCal.dateFormat(output[1]);
		output[2] = BasicCal.dateFormat(output[2]);
        return output;
    };

	

    /**
     * 构造函数里定义的function，即为私有方法；而且在构造函数里用var声明的变量，也相当于是私有变量
     * @param originalOrder 原始序列
     * @param accumuOrder 一次累加序列
     * @param n  预测个数
     * @return 时间响应序列
    * */
    function restoreData(originalOrder,accumuOrder,n,method){
        var b = BasicCal.getBwithT(originalOrder, accumuOrder);
        var y = BasicCal.getY(originalOrder);
        var a = BasicCal.getA(y,b);
        var restore = BasicCal.gmtimeRespOrder(originalOrder,a,n);
        restore=BasicCal.dateFormat(restore);
        return restore;
    }

	
	

    /*------------------------------------------------------------------------------*/
    /*---------------------------基础运算--------------------------------------------------*/
    /*------------------------------------------------------------------------------*/

    /**
     * 定义一个私有对象 ,此对象里添加各种与基础运算(如生成一次累加/累减运算)相关的方法
     *
     * 且这些方法只有在构造函数里定义的function可以调用 实现了封装
     * 最终只将用于输出运算结果的function绑定到原型对象上 并实现了代码的复用
     *
     * 其他如bgValue对象也用了类似的方法
     */
    var BasicCal = {};

    /**
     * @param originalOrder 原始序列
     *  @return 一次累加序列
     * */
    BasicCal.accumuOrder =function(originalOrder){
        var result = [];
        for(var i=0;i<originalOrder.length;i++){
            result[i] = originalOrder.slice(0,i+1).reduce(function(x,y){
                return x+y;
            });
        }
        return result;
    };


    /**
     * @param accumulOrder 累加序列
     *  @return 还原序列
     * */
    BasicCal.invAccumulOrder=function(accumulOrder){
        var result = [];
        result[0] = accumulOrder[0];
        for(var i=1;i<accumulOrder.length;i++){
            result[i] = accumulOrder.slice(i-1,i+1).reduce(function(x,y){
                return y-x;
            });
        }
        return result;
    };


    /*数据格式化*/
    BasicCal.dateFormat=function(arr){
        return arr.map(BasicCal.format).map(Number);
    };

    BasicCal.format=function(value){
        return math.format(value,6);
    };

    /**
     *@param originalOrder 原始序列
     */
    BasicCal.getY=function(originalOrder){;
        var arr=[];
        for(var i=0;i<originalOrder.length-1;i++){
            arr[i] = [originalOrder[i+1]];
        }
        return arr;
    };


    /**
	 * @param accumuOrder 一次累加序列
	 */
    BasicCal.getBwithT=function(originalOrder, accumuOrder){
        var b = bgValue.gm11WithCT(originalOrder, accumuOrder, 8);
        var matrix = [];
        for(var i=0;i<b.length;i++){
            matrix[i] = [-b[i],1];
        }
        return matrix;
    };

    /*解出a,b参数矩阵*/
    BasicCal.getA=function(y,b){
        var transB = math.transpose(b);
        var temp = math.multiply(transB,b);
        temp = math.inv(temp);
        temp = math.multiply(temp,transB);
        temp = math.multiply(temp,y);
        return temp;
    };

    /*GM11时间响应序列*/
    BasicCal.gmtimeRespOrder=function(originalOrder,a,n){
        var timeArr = [];
        for(var i=0;i<originalOrder.length+n;i++){
            var a1 = a[1][0]/a[0][0];
            timeArr[i] = (originalOrder[0]-a1)*Math.exp(-a[0][0]*i)+a1;
        }
        return timeArr;
    };



    /*------------------------------------------------------------------------------*/
    /*---------------------------背景值--------------------------------------------------*/
    /*------------------------------------------------------------------------------*/


    var bgValue={};


    bgValue.gm11WithComplexTrapezoid = 'ComplexTrapezoid';


	/**
	 * 基于复化梯形公式计算背景值，能够较好的拟合高增长指数序列
	 * @param originalOrder 原始序列
	 * @param accuOrder	一次累加序列
	 * @param n 区间等分数
	 */
	bgValue.gm11WithCT = function(originalOrder, accuOrder, n){
		var len = originalOrder.length;
		var h = 1/n;
		var arr = [];
		for(let j = 0; j < len -1; j++){
			arr[j] = (h/2) *(accuOrder[j] + accuOrder[j+1]+bgValue.func(originalOrder, n, h, j+1));
		}
		return arr;
	};
	
	
	bgValue.func = function(originalOrder, n, h, k){
		var sum = 0;
		for(let i = 1; i <= n - 1; i++){
			sum = sum + bgValue.DynaAccuOrder(originalOrder, k, i*h);
		}
		sum = 2*sum;
		return sum;
	};
	
	
	//用非齐次指数函数拟合一次累加序列并返回相应的函数值
	bgValue.DynaAccuOrder = function(originalOrder, k, i){
		var x = Math.log(originalOrder[k]/originalOrder[k-1]);
		var a1 = originalOrder[k];
		var a2 = Math.pow(originalOrder[k]/originalOrder[k-1], k);
		var a3 = 1- (originalOrder[k-1]/originalOrder[k]);
		var a = a1/(a2*a3);
		var b = originalOrder[0] - a;
		var result = (a*(Math.exp(x*(k-1+i))))+ b;
		return result;
	};
    
};