<?php 
/**
 * 工具类
 */
class UtilTool{
	
	/**
	 * 时间格式
	 */
	static public function format_date($time){
		$t=time()-$time;
		$f=array(
			'31536000'=>'年',
			'2592000'=>'个月',
			'604800'=>'周',
			'86400'=>'天',
			'3600'=>'小时',
			'60'=>'分钟',
			'1'=>'秒'
		);
		foreach ($f as $k=>$v)    {
			if (0 !=$c=floor($t/(int)$k)) {
				if($v == '秒'){
					return '刚刚';
				}
				return $c.$v.'前';
			}
		}
	}
	
	/**
 * 格式化时间字符串 [标准时间|时间戳=>文字时间]
 * 一分钟内=>刚刚
 * 一小时内=>n分钟前
 * 大于一小时且在当天=>H:i
 * 昨天=>昨天H:i
 * 大于昨天但=>m月d日
 * @param  [type] $stamp 时间戳（秒）|时间字符串
 * @return [type]        [description]
 */
function format_timestamp($stamp)
{
    $time   = empty($stamp)?time():(is_numeric($stamp)?intval($stamp):strtotime($stamp));
    $mix    = abs(time() - $stamp);
    $today  = strtotime(date("Y-m-d 00:00:00", time()));
    $lastday = $today - (24*60*60);
    if ($time > $today) {
        if ( $mix <= 60) {
            return '刚刚';
        }elseif ( $mix <= 60*60 ) {
            return intval($mix/60)."分钟前";
        }elseif( $mix > 60*60 ){
            return date("H:i", $time);
        }
    }elseif ( $time < $lastday ) {
    	echo "n:$mix\n";
        return date("m月d日", $time);
    }elseif ( $time < $today) {
    	echo "z:$mix\n";
        return date("昨天H:i", $time);
    }
    return "刚刚";
}

	
	/**
	 * 将含有制表符的字段打断并根据逻辑组合成指定的搜索条件语句
	 * @param  [type] $str   搜索字符串
	 * @param  [type] $field 数据字段
	 * @param  [type] $logic or|and
	 * @param  [type] $max   最大兼容条数
	 * @param  [type] $regx  分词正则,默认
	 * @return [type]        [description]
	 */
	function dividWordsForSql($str,$field,$logic,$max,$regx = '/[\f\n\r\t\s .\'\"]+/'){
	    $preg = "";
	    $words = array_unique(explode(',',preg_replace($regx, ",",$str)));
	    foreach ($words as $key=>$value) {
		if (!empty($value)) {
		    if ($key == 0) {
			$preg .= " ".$field." like '%".$value."%' ";
		    }elseif ($key >= $max) {//zh
			break;
		    }else{
			$preg .= " ".$logic." ".$field." like '%".$value."%' ";
		    }
		}
	    }
	    return $preg;
	}

	
	
	//对emoji表情转义
	static function emoji_encode($str){
	    $strEncode = '';

	    $length = mb_strlen($str,'utf-8');

	    for ($i=0; $i < $length; $i++) {
		$_tmpStr = mb_substr($str,$i,1,'utf-8');
		if(strlen($_tmpStr) >= 4){
		    $strEncode .= '[[EMOJI:'.rawurlencode($_tmpStr).']]';
		}else{
		    $strEncode .= $_tmpStr;
		}
	    }
	    return $strEncode;
	}

	//对emoji表情转反义
	static function emoji_decode($str){
	    $strDecode = preg_replace_callback('|\[\[EMOJI:(.*?)\]\]|', function($matches){
		return rawurldecode($matches[1]);
	    }, $str);
	    return $strDecode;
	}
}
