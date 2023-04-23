<?php

$_ENV['secret_key'] = 'key--||--key';
$_ENV['hashing'] = function ($value) {
    return password_hash($value, PASSWORD_BCRYPT, ['cost' => 13]);
};


class userStore
{

    private $users;


    public function __construct($name)
    {
        $this->users = new JsonStore($name);
    }

    function createNewUser($name, $email, $password)
    {
        $id_user = $_ENV['hashing']($name . $_ENV['secret_key'] . $email);
        $user_ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '1';
        if (!empty($this->getUser(['email' => $email]))) {
            echo false;
            return;
        }


        $this->users->setFileData([
            'id' => $id_user,
            'name' => $name,
            'email' => $email,
            'password' => $_ENV['hashing']($password),
            'avatar' => 'https://images.unsplash.com/photo-1679669693237-74d556d6b5ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
            'ip' => $user_ip,
            'user_created' => time(),
            'user_updated' => time()
        ]);
        return true;
    }

    function getUser(array $data)
    {
        return $this->users->getSingle($data);
    }


    function editeUser(string $id, $data)
    {
        return $this->users->editeData($id, $data);
    }

    function removeUser($id)
    {
        return $this->users->removeData($id);
    }
}
