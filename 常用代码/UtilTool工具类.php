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
	 * 将含有制表符的字段打断并根据逻辑组合成模糊搜索指定的搜索条件语句
	 * @param  [type] $str   搜索字符串
	 * @param  [type] $field 数据字段
	 * @param  [type] $logic or|and
	 * @param  [type] $max   最大兼容条数
	 * @return [type]        [description]
	 */
	static function dividWordsForSql($str,$field,$logic,$max){
	    $preg = "";
	    $words = array_unique(explode(',',preg_replace('/[\f\n\r\t\v ]+/', ",",$str)));
	    foreach ($words as $key=>$value) {
		if (!empty($value)) {
		    if ($key == 0) {
			$preg .= " ".$field." like '%".$value."%' ";
		    }elseif ($key >= $max) {
			break;
		    }else{
			$preg .= " ".$logic." ".$field." like '%".$value."%' ";
		    }
		}
	    }
	    return $preg;
	}
}
