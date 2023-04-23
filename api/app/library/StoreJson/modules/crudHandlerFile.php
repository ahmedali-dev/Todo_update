<?php

//require_once __DIR__ . '/../JsonStore.php';

abstract class crudHandlerFile
{
    abstract function getSingle(array $record);

    abstract function getAll();

    abstract function editeData(string $id, array $data);

    abstract function removeData(array $filter);
}
