<?php

require_once __DIR__ . '/modules/handlerFile.php';
require_once __DIR__ . '/modules/crudHandlerFile.php';

class JsonStore extends crudHandlerFile
{


    use
        handlerFile;

    // file name
    private $filename;
    // file name directory
    // default directory path __DIR__
    private $directory = __DIR__;
    // data reseve from file opened
    private $data;

    public function __construct($filename)
    {
        $this->filename = $this->directory . '/' . $filename;
        $this->data = [];

        if (!file_exists($this->filename)) {
            $this->createFile();
            return;
        }
    }

    public function setDirectory($directory)
    {
        $this->directory = $directory;
    }

    public function data()
    {
        return $this->data;
    }

    function getSingle(array $record)
    {


        if ($data = $this->getFileData()) {
            foreach ($data as $key => $value) {
                $value = (array)$value;
                if ($this->status($value, $record)) {
                    return $value;
                }
            }
            return;
        }

        return false;
    }

    function status($value, $record)
    {

        $status = false;

        $record_key = array_keys($record);
        $record_value = array_values($record);
        foreach ($record_key as $index => $item) {
            if ($value[$item] == $record_value[$index]) {
                $status = true;
            }
        }

        return $status;
    }

    function getAll()
    {
        // TODO: Implement getAll() method.
    }

    function editeData(string $id, array $dataEdit)
    {
        $editeRecored = null;
        $recores = null;
        $data_key = array_keys($dataEdit);
        $data_value = array_values($dataEdit);
        try {
            if ($data = $this->getFileData()) {
                $recores = array_filter($data, function ($key) use ($id) {
                    return $key->id !== $id;
                });

                foreach ($data as $key => $value) {
                    if ($value->id === $id) {
                        $editeRecored = (array)$value;
                        foreach ($data_key as $index => $dataEditeReceive) {
                            $editeRecored[$dataEditeReceive] = $data_value[$index];
                        }
                    }

                    $data[$key] = $editeRecored;
                }
                $this->setFileDataEdit([...$recores, $editeRecored]);
                return true;
            }
        } catch (Exception $e) {
            echo $e->getMessage();
        }

        return false;
    }

    public function removeData(array $filter)
    {
        // TODO: Implement removeData() method.
        try {
            if ($data = $this->getFileData()) {
                $result = [];
                $recores = array_filter((array) $data, function ($key) use ($filter) {
                    $key = (array) $key;
                    foreach ($filter as $index => $value) {
                        // var_dump($key[$index] . "--" . $value);
                        if ($key[$index] != $value) {
                            return true;
                        }
                    }
                });

                // var_dump($recores);

                $this->setFileDataEdit([...$recores]);
                return true;
            } else {
                return false;
            }
        } catch (Exception $e) {
            return false;
        }
    }

    function random($length = 10)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }
        return $randomString;
    }

    function js($data)
    {
        echo json_encode($data);
    }
}
