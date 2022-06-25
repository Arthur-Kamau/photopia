<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GalleryController extends Controller
{
    //
    //get all album and photos
    public function gallery(Request $request)
    {

        return response()->json([
            'ok' => true,
            'reason' => '',
        ]);
    }
}
