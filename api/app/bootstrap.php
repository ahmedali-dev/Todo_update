<?php
define('br', "<br>");




class autoload
{
    public $dirs = [];
    public $oldDirs  = [];
    public $dir = __DIR__;

    public function __construct()
    {
        self::getFoldersNameFromRoot();
        self::getSharedFolder();
        self::hanlderDirs();
        self::getAutoLoad();
    }

    function scanFolders()
    {

        // Get a list of all files and directories in the directory
        $files = @scandir($this->dir);

        return $files;
    }


    function getFoldersNameFromRoot()
    {

        // init scan folder from root dir
        $root = self::scanFolders();
        $dirs = [];
        foreach ($root as $key => $value) {
            # code...
            // $value != . or .. and is dir
            if ($value !== ".." && $value !== ".") {
                // echo $value;
                $dirs['root'][$value] = '';
            }
        }

        $this->dirs = $dirs;
    }


    function getAutoLoad()
    {
        return spl_autoload_register(function ($class) {
            $paths = $this->dirs['root'];


//            echo $class.br;
//            $this->print($paths['library']);

            foreach ($paths as $path => $value) {
                # code...
//                echo $path . br;
                $p = __DIR__ . '/' . $path;
                if ($open = opendir($p)) {
                    while (($file = readdir($open)) !== false) {


                        $extension = explode(".", $file);
                        $ext = end($extension);
                        $extensionType = ['php'];
                        // echo $file . br;
                        if (($class === $extension[0]) && in_array($ext, $extensionType)) {
                            $fileReq =  $p . '/' . $file;

                            if (file_exists($fileReq)) {

                                require_once $fileReq;
                            }
                        }
                    }
                }
            }


        });
    }

    function addSharedFolder($key)
    {
        try {
            $this->dir = __DIR__ . '/' . $key;
            $files = self::scanFolders();
            // $dirs = [];
            if (is_array($files)) {
                foreach ($files as $val) {
                    $sharedpath = $key . '/' . $val;
                    if ($val !== ".." && $val !== ".") {
                        if (!in_array($sharedpath, $this->dirs)) {
                            $this->dirs['root'][$sharedpath] = '';
                        }
                    }
                }
            } else {
                $this->dirs['root'][$key] = false;
            }
        } catch (Exception $e) {
        } catch (Throwable $e) {
        } catch (ErrorException $e) {
        }

        // $this->dirs['root'][$key] = $dirs;
    }

    function getSharedFolder()
    {
        $this->oldDirs = $this->dirs;
        foreach ($this->dirs['root'] as $key => $value) {
            self::addSharedFolder($key);
        }



        if ($this->oldDirs !== $this->dirs) {

            self::getSharedFolder();
        }
    }

    function hanlderDirs()
    {
        foreach ($this->dirs['root'] as $key => $value) {
            # code...
            if ($value === false) {
                unset($this->dirs['root'][$key]);
            }
        }
    }

    function print ($p) {
        echo "<pre>";
        var_dump($p);
        echo "</pre>";

    }
}

$autoload = new autoload();



