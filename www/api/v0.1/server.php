<?php

define("FILE", __DIR__ . "/data.json");
header("Content-Type: application/json");


if (array_key_exists('data', $_POST) && $_POST['data']) {
  var_dump($_POST['data']);
}

readfile(constant("FILE"));
