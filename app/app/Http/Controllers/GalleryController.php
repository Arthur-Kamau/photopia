<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    //
    //get all album and photos
    public function gallery(Request $request)
    {

        $email =$request->user()->email;

        $photo_groups = DB::table('photo_groups')
            ->where('email', '=', $email)
            ->get();
        $user_photos = DB::table('user_photos')
            ->where('email', '=', $email)
            ->get();


        return response()->json([
            'ok' => true,
            'reason' => '',
            'albums' => $photo_groups,
            'photos' => $user_photos
        ]);
    }
}
