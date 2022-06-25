<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AlbumController extends Controller
{
    //create a new album
    public function albums(Request $request)
    {

        return response()->json([
            'ok' => true,
            'reason' => '',
        ]);
    }

    //create a new album
    public function addAlbum(Request $request)
    {

        return response()->json([
            'ok' => true,
            'reason' => '',
        ]);
    }


    //add photo to album
    public function addPhotoToAlbum(Request $request)
    {

        return response()->json([
            'ok' => true,
            'reason' => '',
        ]);
    }

    //remove a photo to an album
    public function removePhotoToAlbum(Request $request)
    {

        return response()->json([
            'ok' => true,
            'reason' => '',
        ]);
    }
    //delet a  album
    public function deleteAlbum(Request $request)
    {

        return response()->json([
            'ok' => true,
            'reason' => '',
        ]);
    }

    //update share  album
    public function shareAlbum(Request $request)
    {

        return response()->json([
            'ok' => true,
            'reason' => '',
        ]);
    }
}
