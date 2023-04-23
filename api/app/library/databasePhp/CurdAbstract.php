<?php
require_once "DbAbstract.php";

class CurdAbstract extends DbAbstract
{

    /**
     *Get this method get all row from table
     * @param String $table
     * @param String $columns
     * @param string|null $where
     * @param string|null $orderBy
     * @param string|null $limit
     * @param string|null $join
     * @param string|null $joinType
     * @return null|Object|array data from table
     */
    public function select(
        string      $table,
        string      $columns = '*',
        string|null $where = null,
        string|null $orderBy = null,
        string|null $limit = null,
        string|null $join = null, string|null $joinType = null
    ): null|object|array
    {
        $query = "SELECT {$columns} FROM {$table} ";

        if ($join) {
            if ($joinType) {
                $query .= "{$joinType} JOIN {$join} ";
            } else {
                $query .= " JOIN $join ";
            }
        }

        if ($where) {
            if (str_contains(strtolower($where), "like")) {
                $query .= "WHERE {$where} ";
            } else {
                $query .= "WHERE {$where} ";
            }
        }


        if ($orderBy) {
            $query .= "ORDER BY {$orderBy} ";
        }

        if ($limit) {
            $query .= "LIMIT {$limit}";
        }

        try {
            $this->query($query);
            return $this->getAllRow();
        } catch (PDOException $e) {
            echo ucwords("<br> error in PDO query");
            return null;
        }
    }

    /**
     *Get this method get all row from table
     * @param String $table
     * @param array $data
     * @return bool|string
     */
    public function insert(string $table, array $data): bool|string
    {
        try {
            $name = implode(",", array_keys($data));
            $value = implode(",", array_fill(0, count($data), '?'));
            $query = "INSERT INTO {$table} ({$name}) VALUES ({$value})";
            $this->query($query);
            $this->exec(array_values($data));

            return true;
        } catch (PDOException $e) {
            return false;
        }

    }


    /**
     *Get this method get all row from table
     * @param String $table
     * @param array $data
     * @param string|null $where
     * @return bool|string
     */
    function update(string $table, array $data, string $where = null): string|bool
    {
        try {
            $set = [];
            foreach ($data as $key => $val) {
                $set[] = "{$key}=?";
            }
            $set = implode(',', $set);
            $query = "UPDATE {$table} SET {$set}";
            if ($where) {
                $query .= " WHERE {$where}";
            }

            $this->query($query);
            $this->exec(array_values($data));
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }

    /**
     *Get this method get all row from table
     * @param String $table
     * @param string|null $where
     * @return bool|string
     */
    function delete(string $table, string|null $where = null): string|bool
    {
        try {
            $query = "DELETE FROM {$table}";
            if ($where) {
                $query .= " WHERE {$where}";
            }

            $this->query($query);
            $this->exec();
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }

    public function print($r)
    {
        echo "<pre>";
        var_dump($r);
        echo "</pre>";
    }

}