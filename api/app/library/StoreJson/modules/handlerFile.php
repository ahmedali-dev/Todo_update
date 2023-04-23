<?php

trait handlerFile
{
    public function setFileData($data)
    {
        $allData = !empty($this->getFileData()) ? $this->getFileData() : [];
        try {
            $open = fopen($this->filename, 'w+');
            $allData[] = $data;
            $allData = json_encode($allData, JSON_PRETTY_PRINT);
            $data = fwrite($open, $allData);
            fclose($open);
        } catch (Throwable $th) {
            echo 'getfiledata function error: ' . $th->getMessage();
        }

        return $allData;
    }

    public function getFileData()
    {
//       $data;
        try {
            $open = fopen($this->filename, 'a+');
            $data = fread($open, filesize($this->filename) == 0 ? 1 : filesize($this->filename));
            fclose($open);
        } catch (Throwable $th) {
            echo 'getfiledata function error: ' . $th->getMessage();
        }

        return json_decode($data);
    }

    public function setFileDataEdit($data)
    {
        try {
            $open = fopen($this->filename, 'w+');
            $data = json_encode($data, JSON_PRETTY_PRINT);
            $dataSet = fwrite($open, $data);
            fclose($open);
        } catch (Throwable $th) {
            echo 'getfiledata function error: ' . $th->getMessage();
        }

        return $data;
    }

    private function createFile()
    {
        try {
            // open file if file not exist created
            $open = fopen($this->filename, 'w+');
            // initialize file
            fwrite($open, '[]');

            //close opening file
            fclose($open);
        } catch (Throwable $th) {
            //throw $th;
            echo 'error file can not created';
        }
    }
}
