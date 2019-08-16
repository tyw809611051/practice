<?php

$data = [
    ['id' => 1,'name' => 'yi'],
    ['id' => 2,'name' => 'wen'],
    ['id' => 3,'name' => 'jia'],
    ['id' => 4,'name' => 'tang'],
];

if (empty($_GET['id'])) {
  echo json_encode($data);;
} else {
    foreach($data as $k => $v) {
        if ($v['id'] == $_GET['id']) {
            echo json_encode($v);
        }
    }
}
?>