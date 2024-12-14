<?php
$folder = "img/slide/"; // Path to images folder
$images = array_diff(scandir($folder), array('.', '..')); // Get files excluding '.' and '..'

// Make sure only image files are returned (if needed)
$images = array_filter($images, function ($image) {
    return preg_match('/\.(jpg|jpeg|png|gif)$/i', $image); // Filter image files only
});

// Add full path to images
$images = array_map(function ($image) use ($folder) {
    return $folder . $image;
}, $images);

// Output images as JSON
header('Content-Type: application/json');
echo json_encode($images);
