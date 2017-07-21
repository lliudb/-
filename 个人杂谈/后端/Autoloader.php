<?php


class Autoloader{

	protected $NAMESPACE_DIR_MAP = [


	];


	function __construct($basepath = '' ,$prepend = true)
	{
		if (empty($basepath)) {
			$basepath = __DIR__;
		}
		spl_autoload_register(array($this, 'loader'), true, $prepend);
	}


	public function loader($classname)
	{
		if (file_exists($classname.".php")) {

		}
	}
}
