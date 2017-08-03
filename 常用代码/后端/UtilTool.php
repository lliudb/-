<?php
/**
 * 工具类
 */
class UtilTool{

    /**
     * -----------------格式化时间戳---------------
     * 1.一分钟内            展示为：刚刚
     * 2.一分钟至一小时之间   展示为：多久之前
     * 3.一小时到今天之内     展示为：XX：XX
     * 4.昨天之内            展示为：昨天XX：XX
     * 5.昨天之前            展示为：XX月XX号
     * -----------------格式化时间戳---------------
     * @param  [type] $stamp [description]
     * @return [type]        [description]
     */
    public function format_timestamp($stamp)
    {
        $time   = empty($stamp)?time():(is_numeric($stamp)?intval($stamp):strtotime($stamp));
        $mix    = abs(time() - $time);
        $today  = strtotime(date("Y-m-d 00:00:00", time())); //今天凌晨
        $lastday = $today - (24*60*60);                      //昨天凌晨
        $toYear = strtotime(date('Y-01-01 00:00:00',time()));               //今年年初

        if ($time >= $today) {
            if ( $mix <= 60) {
                return '刚刚';
            }elseif ( $mix <= 60*60 ) {
                return intval($mix/60)."分钟前";
            }elseif( $mix > 60*60 ){
                return date("今天H:i", $time);
            }
        }elseif ($time < $toYear) {
            return date("Y年m月d日", $time);
        }elseif ( $time < $lastday ) {
            return date("m月d日", $time);
        }elseif ( $time < $today) {
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
