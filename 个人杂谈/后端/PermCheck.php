<?php
include_once __dir__."/config.php";

namespace LDB\Prem;

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
    private $MappingPermList  = [
        'P_NS_SA1' => 1,
        'P_NS_SA2' => 2,
        'P_NS_SA3' => 4,
        'P_NS_SA4' => 8,
        'P_NS_SA5' => 16,
        'P_NS_SA6' => 32,
        'P_NS_SA7' => 64,
        'P_NS_SA8' => 128,
        'P_NS_SA9' => 256,
        'P_NS_SA10'=> 512,
        'P_NS_SA11' => 1024,
        'P_NS_SA12' => 2048,
        'P_NS_SA13' => 4096,
        'P_NS_SA14' => 8192,
        'P_NS_SA15' => 16384,
        'P_NS_SA16' => 32768,
        'P_NS_SA17' => 65536,
        'P_NS_SA18' => 131072,
        'P_NS_SA19' => 262144,
        'P_NS_SA20' => 524288,
    ];
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
            return throw new Exceptions('', 123);
        }
    }

    /**
     * 根据权限列表获取权限值
     * @param  array  $perms [description]
     * @return [type]        [description]
     */
    public function getPermissionVal(array $perms = [], int &$perm = 0)
    {
        $perm = $this->PermissonVal;

        $tempTable = [];
        foreach ($perms as $key => $value) {
            if (isset($this->MappingTable[$key])) {
                $key = $this->MappingTable[$key];
            }
            $this->PermListVal[$key] = $value;
            $this->MappingPermList[$key] = self::$PERM_LIST[$value];
            if (isset(self::$PERM_LIST[$key])) {//查找权限列表累加获取权限值
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
                if ($permVal & $value == $value) {//
                    $perms[$key] = true;
                }else{
                    $perms[$key] = false;
                }
            }
            $permVal_bak = 0;
            if (empty($perms)) {
                $obj->getPermissionVal($perms, $permVal_bak);
                if ($permVal_bak == ord($permVal)) {
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
