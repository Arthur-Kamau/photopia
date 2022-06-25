<?php

namespace App\Http\Controllers;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class PhotosController extends Controller
{
    //get all album and photos
    public function photos(Request $request)
    {

        return response()->json([
            'ok' => true,
            'reason' => '',
        ]);
    }

    //create a new photo
    public function addPhoto(Request $request)
    {

        $request->validate([
            'file' => 'required|mimes:png,jpeg,csv|max:2048',
        ]);

        $fileName = time() . '.' . $request->file->extension();

        $userDir = public_path('uploads') . "/" . $request->user()->id;
        if (!file_exists($userDir)) {

            mkdir('path/to/directory', 0777, true);
        }

        $request->file->move($userDir, $fileName);

        DB::table('user_photos')->insert([
            'path' => "uploads" . "/" . $request->user()->id . "/" . $fileName,
            'email' => $request->user()->email,
            'photo_groups' => "",
            'sharable' => false,
            'updated_at' => Carbon::now(),
            'created_at' => Carbon::now()
        ]);

        return response()->json([
            'ok' => true,
            'reason' => 'heeee...',
        ]);
    }


    //delete a photo
    public function deletePhoto(Request $request)
    {

        return response()->json([
            'ok' => true,
            'reason' => '',
        ]);
    }


    //update a photo is sharable
    public function sharePhoto(Request $request)
    {

        return response()->json([
            'ok' => true,
            'reason' => '',
        ]);
    }
}
