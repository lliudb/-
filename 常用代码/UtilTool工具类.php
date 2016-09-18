<?php 
/**
 * 工具类
 */
class UtilTool{
	
	/**
	 * 作品 时间格式
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
	
}