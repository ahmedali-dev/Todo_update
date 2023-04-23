<?php

header('Access-Control-Allow-Origin: *');

header('Content-Type: application/json; charset=UTF-8');

header("Access-Control-Allow-Methods: POST,DELETE");

header("Access-Control-Max-Age:3600");

header("Access-Control-Allow-Headers:*");

require_once __DIR__ . '/app/bootstrap.php';




Router::$controllerNotFound = function () {
    echo 'page not found';
};

$_ENV['key'] = "todoListKeySecurity";
$_ENV['secret_key'] = 'key--||--key';
$_ENV['hashing'] = function ($value) {
    return password_hash($value, PASSWORD_BCRYPT, ['cost' => 13]);
};

function random($length = 10)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $randomString;
}

function verifyUser($token): bool
{
    $dataToken = base64_decode($token);
    $dataToken = json_decode($dataToken);
    if (!$dataToken) {
        echo json_encode([
            'status' => 'request de',
            'message' => "token not valid"
        ]);
        return false;
    }

    $checkToken = function () use ($dataToken) {
        $name = $dataToken->name;
        $email = $dataToken->email;
        $id = $name . $_ENV['-'] . $email;
        return $id;
    };

    $checkValidToken = DB::crud()
        ->select(
            'signup_todo',
            'email,id_user as id',
            "email='{$dataToken->email}'",
            null,
            "1"
        );

    //    var_dump($checkValidToken);
    $count = count($checkValidToken);
    if ($count == 0) {
        echo json_encode([
            'status' => 'request de',
            'message' => "token not valid"
        ]);
        return false;
    }

    if (!password_verify($checkToken(), $checkValidToken[0]->id)) {
        echo json_encode([
            'status' => 'request de',
            'message' => "token not valid"
        ]);
        return false;
    }

    return true;
}

function parseingToken($token)
{
    $dataToken = base64_decode($token);
    $dataToken = json_decode($dataToken);
    return $dataToken;
}

// $users->createNewUser('ahmedali', 'ahmedali1@gmail.com', '123456');

//getuser data by email
function getUser($data, $error)
{
    $users = new userStore('users.json');


    if (!$user = $users->getUser($data)) {
        echo json_encode([
            'status' => 400,
            'error' => $error
        ]);
        return null;
    }

    return $user;
}

//validation input requests
function ValidationInput($rules, $extra = false)
{
    $request = Request::CheckInput('post', $rules);

    //check request empty error
    if ($request->getAllError() !== true) {
        echo json_encode([
            'status' => 400,
            'error' => $extra ? ['request' => $request->getAllError()] : $request->getAllError()
        ]);
        return false;
    }

    return $request;
}

// user is valid token send
// user is valid token send
function CheckTokenValid($token)
{
    if (!$token) {
        echo json_encode([
            'status' => 'request de',
            'error' => [
                'token' => "token not valid"
            ]
        ]);
        return false;
    }


    if (is_null(getUser(['id' => $token->token], 'token not valid'))) {
        return false;
    }
    $user = getUser(['id' => $token->token], '');
    $checkToken = function ($name, $email) {
        return $name . $_ENV['secret_key'] . $email;
    };


    if (!password_verify($checkToken($user['name'], $user['email']), $token->token)) {
        echo json_encode([
            'status' => 400,
            'error' => [
                'token' => 'token not valid'
            ]
        ]);
        return false;
    }


    return true;
}




Router::post('/signup', function () {

    $data = [
        'name.string' => "required|min:3|max:50",
        'email.email' => "required|min:3|max:50|ex:gmail.com",
        'password.string' => "required|min:8|max:50"
    ];

    $request = Request::CheckInput('POST', $data);
    //check request empty error
    if ($request->getAllError() !== true) {
        echo json_encode([
            'status' => 400,
            'error' => $request->getAllError()
        ]);
        return;
    }

    $users = new userStore('users.json');

    if (!$users->createNewUser(
        $request->value('name'),
        $request->value('email'),
        $request->value('password')
    )) {
        echo json_encode([
            'status' => 400,
            'error' => 'signup fieled'
        ]);
        return;
    }

    echo json_encode([
        'status' => 200,
        'message' => 'SignUp successfully'
    ]);
});

Router::post('/signin', function () {

    $data = [
        'email.email' => "required|min:3|max:50|ex:gmail.com",
        'password.string' => "required|min:8|max:50"
    ];

    $request = Request::CheckInput('POST', $data);

    //check request empty error
    if ($request->getAllError() !== true) {
        echo json_encode([
            'status' => 400,
            'error' => $request->getAllError()
        ]);
        return;
    }

    $users = new userStore('users.json');


    if (!$user = $users->getUser(['email' => $request->value('email')])) {
        echo json_encode([
            'status' => 400,
            'error' => 'sign in fialed'
        ]);
        return;
    }


    $checkPassword = password_verify($request->value('password'), $user['password']);
    if (!$checkPassword) {
        echo json_encode([
            'status' => 400,
            'error' => 'SignUp Failed'
        ]);
        return;
    }


    echo json_encode([
        'status' => 200,
        'avatar' => $user['avatar'],
        'token' => base64_encode(json_encode(
            [
                'token' => $user['id'],
                "name" => $user['name'],
                "email" => $user['email']
            ]
        )),
        'message' => 'SignUp successfully'
    ]);
});

Router::post('/collections', function () {
    if (!ValidationInput([
        'token.string' => 'required|min:3'
    ])) {
        return false;
    }

    $request = ValidationInput([
        'token.string' => 'required|min:3'
    ]);

    $token = parseingToken($request->value('token'));

    if (!CheckTokenValid($token)) {
        return false;
    }


    $collections = new collections("collections.json");
    // $collections->createCollection('javascript', $token->token, 'https://unsplash.com/photos/uZoBuZN4tjc');




    echo '<pre>';
    var_dump(empty($collections->getCollections(['id_user' => $token->token])[0]) ? [] : $collections->getCollections(['id_user' => $token->token]));
    echo '</pre>';
});
Router::post('/collections/add', function () {
    if (!ValidationInput([
        'token.string' => 'required|min:3',
        'name.string' => 'required|min:3|max:32',
        'image.url' => 'required|min:3'
    ])) {
        return false;
    }

    $request = ValidationInput(
        [
            'token.string' => 'required|min:3',
            'name.string' => 'required|min:3|max32',
            'image.url' => 'required|min:3'
        ]
    );

    $token = parseingToken($request->value('token'));

    if (!CheckTokenValid($token)) {
        return false;
    }


    $collections = new collections("collections.json");
    $add = null;
    // echo '<pre>';
    // var_dump();
    // echo '</pre>';

    try {
        $add = $collections->createCollection($request->value('name'), $token->token, $request->value('image'));
    } catch (Exception $e) {
        echo json_encode([
            'status' => 400,
            'error' => 'can\'nt add collection'
        ]);
        return;
    }

    echo json_encode([
        'status' => 200,
        'message' => 'collection added',
    ]);
});


Router::post('/collections/delete', function () {

    if (!ValidationInput([
        'id.string' => 'required|min:3',
        'token.string' => 'required|min:3'
    ])) {
        return false;
    }

    $request = ValidationInput([
        'id.string' => 'required|min:3',
        'token.string' => 'required|min:3'
    ]);

    $token = parseingToken($request->value('token'));

    if (!CheckTokenValid($token)) {
        return false;
    }


    $collections = new collections("collections.json");

    // echo  ? 'remove' : 'not found';
    $collections->removeCollections(['id' => $request->value('id'), 'id_user' => $token->token]);

    echo json_encode([
        'status' => 200,
        'message' => 'collection removed'
    ]);
});

Router::post('/collections/edit', function () {

    if (!ValidationInput([
        'id.string' => 'required|min:3',
        'name.string' => 'required|min:3|max:32',
        'image.url' => 'required|min:10',
        'token.string' => 'required|min:3'
    ])) {
        return false;
    }

    $request = ValidationInput([
        'id.string' => 'required|min:3',
        'name.string' => 'required|min:3|max:32',
        'image.url' => 'required|min:10',
        'token.string' => 'required|min:3'
    ]);

    $token = parseingToken($request->value('token'));

    if (!CheckTokenValid($token)) {
        return false;
    }


    $collections = new collections("collections.json");

    // echo  ? 'remove' : 'not found';
    // $collections->removeCollections(['id' => $request->value('id'), 'id_user' => $token->token]);
    $collections->editeCollectionsName(
        ['id' => $request->value('id'), 'id_user' => $token->token],
        ['name' => $request->value('name'), 'urlImage' => $request->value('image')]
    );
    echo json_encode([
        'status' => 200,
        'message' => 'collection removed'
    ]);
});


Router::post('/task', function () {
    if (!ValidationInput([
        'id_collection.string' => 'required|min:3',
        'token.string' => 'required|min:3'
    ], true)) {
        return false;
    }

    $request = ValidationInput([
        'id_collection.string' => 'required|min:3',
        'token.string' => 'required|min:3'
    ], true);

    $token = parseingToken($request->value('token'));

    if (!CheckTokenValid($token)) {
        return false;
    }


    $collections = new collections("collections.json");

    echo json_encode([
        'status' => 200,
        'data' => $collections->getTasks($token->token, $request->value('id_collection'))
    ]);
});


Router::post('/task/add', function () {
    if (!ValidationInput([
        'id_collection.string' => 'required|min:3',
        'task.string' => 'required|min:3|max:32',
        'token.string' => 'required|min:3'
    ], true)) {
        return false;
    }

    $request = ValidationInput([
        'id_collection.string' => 'required|min:3',
        'task.string' => 'required|min:3|max:32',
        'token.string' => 'required|min:3'
    ], true);

    $token = parseingToken($request->value('token'));

    if (!CheckTokenValid($token)) {
        return false;
    }


    $collections = new collections("collections.json");

    //add task
    $name = $request->value('task');
    $id = $request->value("id_collection");
    $collections->addTask($id, $token->token, $name);

    echo json_encode([
        'status' => 200,
        'message' => 'task added'
    ]);
});

Router::post('/task/update', function () {
    if (!ValidationInput([
        'id_collection.string' => 'required|min:3',
        'id_task.string' => 'required|min:3',
        'status.string' => 'required|min:4',
        'token.string' => 'required|min:3'
    ], true)) {
        return false;
    }

    $request = ValidationInput([
        'id_collection.string' => 'required|min:3',
        'id_task.string' => 'required|min:3',
        'status.string' => 'required|min:4',
        'token.string' => 'required|min:3'
    ], true);

    $token = parseingToken($request->value('token'));

    if (!CheckTokenValid($token)) {
        return false;
    }


    $collections = new collections("collections.json");

    //add task
    $status = $request->value('status');
    $id_coll = $request->value("id_collection");
    $id_task = $request->value("id_task");
    // $collections->addTask($id, $token->token, $name);
    // echo '<pre>';
    // var_dump([json_decode(htmlspecialchars_decode($data)), $id]);
    // echo '</pre>';

    $collections->taskStatus($id_coll, $token->token, $id_task, $status);

    echo json_encode([
        'status' => 200,
        'message' => 'task added'
    ]);
});

Router::Dispatch();
