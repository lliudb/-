<?php
// namespace LDB\Prem;

// require __DIR__."/config.php";


/**
*
*/
class PremCheck
{
    //权限对象列表
    static private $Permissons = [];

    private $PermissonVal = 0;
    private $PermissonTag = '';
    private $MappingTable = [];
    private $PermListVal  = [];

    //这两个
    private $MappingPermList  = [];
    static public $PERM_LIST = [
        'PERM0' => 1,
        'PERM1' => 2,
        'PERM2' => 4,
        'PERM3' => 8,
        'PERM4' => 16,
        'PERM5' => 32,
        'PERM6' => 64,
        'PERM7' => 128,
        'PERM8' => 256,
        'PERM9' => 512,
        'PERM10' => 1024,
        'PERM11' => 2048,
        'PERM12' => 4096,
        'PERM13' => 8192,
        'PERM14' => 16384,
        'PERM15' => 32768,
        'PERM16' => 65536,
        'PERM17' => 131072,
        'PERM18' => 262144,
        'PERM19' => 524288,
        // 'PERM20' => 1048576,
    ];

    /**
     * 根据权限配置项初始化权限值，默认为0，全关闭
     * @param array $perms  ['PERM13' => false|ture]
     * @param string $tag   "权限别名"
     * @param array  $table ['映射后'=> '未映射' ]
     */
    function __construct(array $perms = [], string $tag = '', array $table = [])
    {
        if (!isset(self::$Permissons[$tag])) {
            $this->PermissonTag = $tag;
            $this->MappingTable = $table;
            $perm_val = 0;
            $this->getPermissionVal($perms, $perm_val);
            self::$Permissons[$tag] = $this;
        }
    }

    /**
     * 根据tag获取权限对象
     * @param  string $tag [description]
     * @return [type]      [description]
     */
    static public function getPCObjByTag($tag = '')
    {
        if (empty($tag) && isset(self::$Permissons[$tag])) {
            return self::$Permissons[$tag];
        }else{
            throw new Exceptions('', 123);
        }
    }

    /**
     * 根据权限列表获取权限值
     * @param  array  $perms [description]
     * @return [type]        [description]
     */
    public function getPermissionVal(array $perms = [], int &$perm = 0)
    {
        $perm = 0;
        $tempTable = [];
        $this->MappingPermList = self::$PERM_LIST;
        foreach ($perms as $key => $value) {
            if (isset($this->MappingTable[$key])) {
                $key = $this->MappingTable[$key];
            }
            $this->PermListVal[$key] = $value;
            // $this->MappingPermList[$key] = self::$PERM_LIST[$key];
            if (isset(self::$PERM_LIST[$key]) && $value) {//查找权限列表累加获取权限值
                $perm += self::$PERM_LIST[$key];
            }
        }
        $this->PermissonVal = $perm;
        return $this;
    }

    /**
     * 设置指定权限值
     * @param string $perm_name [description]
     */
    static public function setPermissonValByPerm(int $permVal = 0b00000000000000101011, string $tag = '')
    {
        if (!empty($tag)) {
            $obj = self::$Permissons[$tag];
            $perms = [];
            foreach ($obj->MappingPermList as $key => $value) {
                // echo "$key ===> $value:",($permVal & $value)," \n";
                if (($permVal & $value) == $value) {//
                    $perms[$key] = true;
                }else{
                    $perms[$key] = false;
                }
            }
            $permVal_bak = 0;
            var_dump($perms);
            if (!empty($perms)) {
                $obj->getPermissionVal($perms, $permVal_bak);
                if ($permVal_bak == $permVal) {
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }
        return false;
    }


}

/**
*
* 使用方法
* 初始化对象，可使用配置项
*     位数为非固定值，可根据自身情况按需配置，建议写人配置文件
*
*
    $config = [
        'P_NS_SA1' =>'PERM0' ,
        'P_NS_SA2' =>'PERM1' ,
        'P_NS_SA3' =>'PERM2' ,
        'P_NS_SA4' =>'PERM3' ,
        'P_NS_SA5' =>'PERM4' ,
        'P_NS_SA6' =>'PERM5' ,
        'P_NS_SA7' =>'PERM6' ,
        'P_NS_SA8' =>'PERM7' ,
        'P_NS_SA9' =>'PERM8' ,
        'P_NS_SA10' =>'PERM9' ,
        'P_NS_SA11' =>'PERM10',
        'P_NS_SA12' =>'PERM11',
        'P_NS_SA13' =>'PERM12',
        'P_NS_SA14' =>'PERM13',
        'P_NS_SA15' =>'PERM14',
        'P_NS_SA16' =>'PERM15',
        'P_NS_SA17' =>'PERM16',
        'P_NS_SA18' =>'PERM17',
        'P_NS_SA19' =>'PERM18',
        'P_NS_SA20' =>'PERM19',
    ];
*
*   初始化，设置别名，该对象将被保存到静态数据中，可通过别名直接访问
*   PremCheck::getPCObjByTag(tag)
*
    $Perm = new PremCheck([], 'les', $config);
    $p = 0;
*
*   $p为返回值，已引用方式传递，
*
    $perms = [
        'P_NS_SA1' => true,
        'P_NS_SA2' => false,
        'P_NS_SA5' => true,
        'P_NS_SA6' => true,
    ];

*
*   获取权限值
*
    $Perm->getPermissionVal($perms , $p);
    echo "perm val is: '0b",decbin($p),"'\n";

    var_dump(PremCheck::$PERM_LIST);

    var_dump(PremCheck::setPermissonValByPerm($p+1024, 'les'));

*
*/
