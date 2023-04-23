<?php
require_once __DIR__ . '/Config.php';


class DbAbstract
{

    /**
     * @var PDO $db
     */
    protected PDO $db;

    /**
     * @var $stmt
     */
    protected PDOStatement $stmt;

    /**
     * @var string $ConnectionError
     */
    private string $ConnectionError;

    //content to database use pdo class

    function __construct()
    {
        try {
            //code...
            $this->db = new PDO("mysql:host=" . host . ";dbname=" . dbname, username, password);
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (Exception $th) {
            //throw $th;
            $this->ConnectionError = $th->getMessage();
        }
    }


    /**
     * @param string $query
     * @return DbAbstract
     */
    public function query(string $query): DbAbstract
    {
        $this->stmt = $this->db->prepare($query);
        return $this;
    }

    /**
     * @return int
     */
    public function count(): int
    {
        return $this->stmt->rowCount();
    }


    public function exec($data = null)
    {
        if ($data) {
            return $this->stmt->execute($data);
        }
        return $this->stmt->execute();
    }


    //set single value by name(:name)
    function setValueByname($name, $value)
    {
        $this->stmt->bindValue(":{$name}", $value);
    }

    //set single value by ? number (?)
    function setValueBynum($num, $value)
    {
        $this->stmt->bindValue($num, $value);
    }

    //set multe value 
    public function setValueList(array $list): bool|DbAbstract
    {

        if (!is_array($list)) {
            return false;
        }

        for ($i = 0; $i < count($list); $i++) {
            $this->stmt->bindValue(($i + 1), $list[$i]);
        }
        return true;
    }


    /**
     * @return object|DbAbstract
     */
    public function getSingleRow(): object|array
    {
        self::exec();
        return $this->stmt->fetch(PDO::FETCH_OBJ);
    }


    /**
     * @return object|DbAbstract
     */
    public function getAllRow(): object|array
    {
        self::exec();
        return $this->stmt->fetchAll(PDO::FETCH_OBJ);
    }


    /**
     * run sql file
     * @param string $filename if file not
     */

    public function RunSqlFile(string $filename): void
    {


        //error hanlder
        try {
//            $filename = "" . $filename;
            $hanlder = fopen($filename, "r+");
            $sqlCommand = fread($hanlder, filesize($filename));

            $this->query($sqlCommand);
            $this->exec();
        } catch (\Exception $th) {
            //throw $th;
            echo "error found: " . $th->getMessage();
        }
    }
}


// $openFile =  fopen(__DIR__ . '/sql.sql', 'r+');
// $command = (fread($openFile, filesize("sql.sql")));

// $query =  $this->db->prepare($command);
// $query->execute();
// $com = exec("explorer.exe .");
// $com = exec("mysql -u root -p test < sql.sql");
// var_dump($com);

//$db = new DbAbstract();
//
//// $db->query("insert into hello1(name) values (?),(?),(?)");
//// $db->setValueList(array('ahmed', 'ali', 'abdo'));
//// $db->exec();
//
//$db->query('select * from hello1');
//$db->exec();
//echo $db->count();
//var_dump($db->getSingleRow());
//
//
//echo "<pre>";
//var_dump($db->getAllRow());
//echo "</pre>";
//echo "//////////////////////////////////////////////////////////////////////////////////////////";
//echo "<pre>";
//var_dump($db->Get("hello1 where name='ali'"));
//echo "</pre>";
//
//
//echo "//////////////////////////////////////////////////////////////////////////////////////////";
//echo "<pre>";
//var_dump($db->RunSqlFile("sql.sql"));
//echo "</pre>";
