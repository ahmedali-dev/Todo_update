<?php

class collections
{

    private $collection;

    public function __construct($name)
    {
        $this->collection = new JsonStore($name);
    }

    public function createCollection($name, $id_user, $urlImage)
    {
        $id = $this->collection->random(20);
        $collection = [
            'id' => $id,
            'id_user' => $id_user,
            'name' => $name,
            'urlImage' => $urlImage,
            'tasks' => []
        ];

        $this->collection->setFileData($collection);

        return $this;
    }


    public function getCollections($data)
    {
        // return array_map(function ($value) use ($data) {
        //     // $result = [];
        //     foreach ($data as $key => $dvalue) {
        //         $value = (array) $value;
        //         if ($value[$key] == $dvalue) {
        //             return $value;
        //         }
        //     }
        // }, (array) $this->collection->getFileData());

        return array_filter((array)$this->collection->getFileData(), function ($value) use ($data) {
            foreach ($data as $key => $dvalue) {
                $value = (array) $value;
                if ($value[$key] == $dvalue) {
                    return $value;
                }
            }
        });
    }

    public function editeCollectionsName($search, $record)
    {
        $result = array_map(function ($data) use ($search, $record) {

            $data = (array) $data;


            if ($data['id'] == $search['id'] && $data['id_user'] == $search['id_user']) {
                foreach ($record as $rkey => $rvalue) {
                    $data[$rkey] = $rvalue;
                }
            }

            return $data;
        }, $this->collection->getFileData());

        var_dump($result);

        $this->collection->setFileDataEdit($result);
    }

    public function removeCollections($id)
    {
        return $this->collection->removeData($id);
    }

    function getTasks($id_user, $id_collection)
    {
        return array_filter($this->collection->getFileData(), function ($task) use ($id_user, $id_collection) {
            if ($task->id_user == $id_user && $task->id == $id_collection) {
                return true;
            }
        });
    }

    public function addTask($id, $id_user, $name)
    {
        $task = [
            'id' => $this->collection->random(10),
            'name' => $name,
            'star' => false,
            'status' => false
        ];

        $result = array_map(function ($data) use ($id, $id_user, $task) {
            if ($data->id == $id && $data->id_user == $id_user) {
                $data->tasks = [...$data->tasks, $task];
            }

            return $data;
        }, $this->collection->getFileData());

        $this->collection->setFileDataEdit($result);
    }

    public function editeTask($id, $task_id, $taskname)
    {
        $result = array_map(function ($data) use ($id, $task_id, $taskname) {
            if ($data->id == $id) {
                foreach ($data->tasks as $key => $task) {
                    if ($task->id == $task_id) {
                        $task->name = $taskname;
                    }
                }
            }

            return $data;
        }, $this->collection->getFileData());

        $this->collection->setFileDataEdit($result);
    }

    public function updateTask($id, $id_user, $datasend)
    {
        $result = array_map(function ($data) use ($id, $id_user, $datasend) {
            if ($data->id == $id) {
                if ($data->id == $id && $data->id_user == $id_user) {
                    $data->tasks = $datasend;
                }
            }

            return $data;
        }, $this->collection->getFileData());


        $this->collection->setFileDataEdit($result);
    }

    function addTaskStar($id, $id_task)
    {
        $result = array_map(function ($data) use ($id, $id_task) {
            if ($data->id == $id) {
                foreach ($data->tasks as $key => $task) {
                    if ($task->id == $id_task) {
                        $task->star = !$task->star;
                    }
                }
            }

            return $data;
        }, $this->collection->getFileData());

        $this->collection->setFileDataEdit($result);
    }

    function taskStatus($id, $id_user, $id_task, $status)
    {
        $result = array_map(function ($data) use ($id, $id_user, $id_task, $status) {
            if ($data->id == $id && $data->id_user == $id_user) {
                foreach ($data->tasks as $key => $task) {
                    if ($task->id == $id_task) {
                        $task->status = $status;
                    }
                }
            }

            return $data;
        }, $this->collection->getFileData());

        echo '<pre>';
        var_dump($result);
        echo '</pre>';
        $this->collection->setFileDataEdit($result);
    }


    public function removeTask($id, $id_task)
    {
        $result = array_map(function ($data) use ($id, $id_task) {
            if ($data->id == $id) {
                foreach ($data->tasks as $key => $task) {
                    $data->tasks = array_filter($data->tasks, function ($task) use ($id_task) {
                        return $task->id !== $id_task;
                    });
                }
            }

            return $data;
        }, $this->collection->getFileData());
        $this->collection->setFileDataEdit($result);
    }
}
