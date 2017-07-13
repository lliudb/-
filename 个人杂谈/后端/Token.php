<?php
/*
---------------------------------------

使用方法：
//初始化对象
$Token = new Token(124, false, "JWT");
//获取token值
$token = $Token->fetchToken();
//判断token是否有效
if($Token->checkToken($token)) {
    //判断token是否过期
    if(!Token->checkExpire()){
        //过期token重新获取
        $token = $Token->fetchToken();
    }
}

---------------------------------------
 */

namespace \LDB\Token;

class Token
{
    private $salt = '1N7c8b6L8m'; //你吃饱了么?
    static private $SWITCH_REDIS = true;
    static private $EXPIRE;
    private $flag = false;

    private $header;
    private $payload;
    private $signature;
    private $encode_string;

    private $token;

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
        $UUID,
        $admin = false,
        $type = 'JWT',
        array $ext=[],
        $iss = "",
        $expire = 1 //单位分钟
    )
    {
        if (empty($this->token)) {
            $this->header = [
                'type'  => $type,
                'alg'   => $this->alg_selector[$type]
            ];
            //获取过期时间
            $exp    = $this->getExpire($expire);
            $this->payload = [
                'exp'   => $exp,
                'iss'   => $iss,
                'UUID'  => $UUID,
                'admin' => $admin
            ];
            foreach ($ext as $key => $value) {
                $this->payload[$key] = $value;
            }
        }else{
            throw new Exception("",13);
        }
    }


    /**
     * 生成token
     * @return [type] [description]
     */
    public function getSignature()
    {
        $base64_header  = base64_encode(json_encode($this->header));
        $base64_payload = base64_encode(json_encode($this->payload));
        //拼接header和payload
        $this->encode_string  = $base64_header . "." . $base64_payload;
        //生成signature
        $this->signature      = hash_hmac($this->header['alg'], $this->encode_string, $this->salt);
    }

    public function createToken()
    {
        $this->getSignature();
        return $this->encode_string . "." . $this->signature;
    }

    /**
     * 获取Token值
     * @return [type] [description]
     */
    public function fetchToken()
    {
        return $this->createToken();
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
        $this->header   = json_decode(base64_decode($token[0]),true);
        $this->payload  = json_decode(base64_decode($token[1]),true);
        $signature      = $token[2];
        //根据传入字符串生成签名
        $this->getSignature();
        //比较签名和相关信息
        if ($signature == $this->signature) {
            //签名匹配，检查参数是否过期或无效
            $this->flag = TRUE;
        }else{
            $this->flag = FALSE;
        }
        return $this->flag;
    }

    public function checkExpire()
    {
        if ($this->flag && $this->payload['exp'] > time()) {
            return TRUE;
        }else{
            //过期后重新授权续 +1s
            $this->payload['exp'] = $this->getExpire();
            return FALSE;
        }
    }

}
