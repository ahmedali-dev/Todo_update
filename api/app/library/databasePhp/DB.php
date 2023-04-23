<?php
require_once __DIR__ . '/DbAbstract.php';
require_once __DIR__ . '/CurdAbstract.php';

class DB
{
    /**
     * @return CurdAbstract
     */
    static function crud(): CurdAbstract
    {
        return new CurdAbstract();
    }

    /**
     * @return DbAbstract
     */
    static function db(): DbAbstract
    {
        return new DbAbstract();
    }
}