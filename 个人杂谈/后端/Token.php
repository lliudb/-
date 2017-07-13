<?php
/*
---------------------------------------

使用方法：
//初始化对象
$Token = new Token(124, false, "JWT");
//获取token值
$token = $Token->fetchToken();
//判断token是否有效
list($signature_flag, $expire_flag) = $Token->checkToken($token);
if($signature_flag && $expire_flag) {
    //获取token和用户值
    $token = Token::getToken();
    $UUid = Token::getUuid();
}elseif($signature_flag && !$expire_flag){
    //过期token重新获取
    echo "Expiry date is out";
}else{
    //token不合法
    echo "signature is illegal";
}
---------------------------------------
 */

namespace \LDB\Token;

class Token
{
    //是否尽心Redis操作,默认关闭
    static private $SWITCH_REDIS = false;
    static private $EXPIRE;
    //盐:你吃饱了么?
    private $salt = '1N7c8b6L8m';
    private $signature_flag = false;
    private $expire_flag    = false;
    //对象存储值
    private $header;
    private $payload;
    private $signature;
    private $encode_string;
    //全局可取的数据
    static private $token;
    static private $Uuid;
    //加密方式
    private $alg_selector = [
        'JWT'=> 'sha256',
        'JMD'=> 'md5',
        'SHA'=> 'sha1',
    ];

    private function getExpire($exp = NULL)
    {
        if(isset($exp)){
            self::$EXPIRE = $exp;
        }
        return time() + (self::$EXPIRE*60);
    }


    function __construct(
        $Uuid,
        $admin = false,
        $type = 'JWT',
        array $ext=[],
        $iss = "",
        $expire = 1 //单位分钟
    )
    {
        //初始化
        $this->signature_flag   = false;
        $this->expire_flag      = false;
        //如果检测到token的存在或不存在uuid时跳过初始化部分
        if (empty(self::$token) || !empty($Uuid)) {
            self::$Uuid = $Uuid;
            $this->header = [
                'type'  => $type,
                'alg'   => $this->alg_selector[$type]
            ];
            //获取生成过期时间
            $exp    = $this->getExpire($expire);
            $this->payload = [
                'exp'   => $exp,
                'iss'   => $iss,
                'Uuid'  => $Uuid,
                'admin' => $admin
            ];
            foreach ($ext as $key => $value) {
                $this->payload[$key] = $value;
            }
        }
    }

    /**
     * 生成token
     * @return [type] [description]
     */
    public function getSignature()
    {
        $base64_header  = urlsafe_encode(json_encode($this->header));
        $base64_payload = urlsafe_encode(json_encode($this->payload));
        //拼接header和payload
        $this->encode_string  = $base64_header . "." . $base64_payload;
        //生成signature
        $this->signature      = hash_hmac($this->header['alg'], $this->encode_string, $this->salt);
    }

    /**
     * 生成signature和encode_string,并将其拼接成token
     * @return [type] [description]
     */
    public function createToken()
    {
        $this->getSignature();
        self::$token = $this->encode_string . "." . $this->signature;
    }

    /**
     * 第一次或重新获取Token时使用
     * @return [type] [description]
     */
    public function fetchToken()
    {
        //先判断是否检查过
        if(!$this->signature_flag || !$this->expire_flag) {
            //签名不通过或有效期超时
            return throw new Exception("token failed!", 123);
        }elseif (!isset(self::$token)){
           $this->createToken();
        }
        return self::$token;
    }

    /**
     * 直接获取token时使用该静态方法
     * @return [type] [description]
     */
    static public function getToken()
    {
        if (!isset(self::$token)) {
            return throw new Exception("token is not exist",123);
        }
        return self::$token;
    }


    static public function getUuid()
    {
        if (!isset(self::$Uuid)) {
            return throw new Exception("uuid is not exist",123);
        }
        return self::$Uuid;
    }

    /**
     * [checkToken description]
     * @param  [type] $token_string [description]
     * @return [type]               [description]
     */
    public function checkToken($token_string)
    {
        $token = explode('.',$token_string);
        //初始化所需的参数
        $this->header   = json_decode(urlsafe_decode($token[0]),true);
        $this->payload  = json_decode(urlsafe_decode($token[1]),true);
        $signature      = $token[2];
        //根据传入字符串生成签名
        $this->getSignature();
        //比较签名和相关信息
        $flag = $this->signature_flag;
        if ($signature == $this->signature) {
            //签名匹配，检查参数是否过期或无效
            $flag = TRUE;
        }else{
            $flag = FALSE;
        }
        $this->signature_flag = $flag;
        $this->checkExpire();
        return [$this->signature_flag, $this->expire_flag];
    }

    private function checkExpire()
    {
        $flag = $this->expire_flag;
        //当签名通过时，才允许判断是否过期
        if ($this->signature_flag && $this->payload['exp'] > time()) {
            $flag = TRUE;
        }else{
            //过期后重新授权续 +1s
            $flag = FALSE;
        }
        $this->expire_flag = $flag;
    }

    /**
     * 对base64进行二次转码
     * @param  [type] $data [description]
     * @return [type]       [description]
     */
    public function urlsafe_encode($data) {
        return str_replace(['+', '/'], ['-', '_'], base64_encode($data));
    }

    /**
     * 对进行二次转码的base64进行解码
     * @param  [type] $data [description]
     * @return [type]       [description]
     */
    public function urlsafe_decode($data) {
        return base64_decode(str_replace(['-', '_'], ['+', '/'], $data));
    }

}
