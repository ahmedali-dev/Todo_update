<?php
spl_autoload_register(function ($classname) {
    $dir = __DIR__ . "/";
    $paths = ["./Request/File/", "./Request/Init/", "./Request/Input/"];

    foreach ($paths as $path) {
        $url = $dir . $path . $classname . ".php";
        if (file_exists($url)) {
            require_once $url;
        }
    }
});

class Request
{
    /**
     * @param string $method
     * @param array $rules
     * @return HandlerFiles
     */
    public static function CheckFiles(string $method, array $rules)
    {
        return new HandlerFiles($method, $rules);
    }

    public static function CheckInput(string $method, array $rules)
    {
        return new HanlderInputValidator($method, $rules);
    }

    public static function print($p): void
    {
        echo "<pre>";
        var_dump($p);
        echo "</pre>";
    }
}

