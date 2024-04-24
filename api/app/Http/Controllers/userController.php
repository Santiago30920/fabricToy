<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Exception;

class userController extends Controller
{
    public function index(){
        $users = User::select('name', 'lastName', 'typeDocument', 'numberDocument', 'mail', 'state', 'rol')->get();
        return response()->json([
            "status" => 200,
            "message" => "user-get succesfully",
            "data" => $users
        ],200);
    }
    public function Verificar(Request $request) {
        try {
            $user = User::select('name', 'lastName', 'typeDocument', 'numberDocument', 'mail', 'state', 'rol')
                        ->where('mail', '=', $request->mail)
                        ->where('password', '=', hash('sha256', $request->password))
                        ->get();
    
            if ($user->isEmpty()) {
                return response()->json([
                    "status" => 404,
                    "message" => "No se encontró ningún usuario",
                ], 404);
            } else {
                return response()->json([
                    "status" => 200,
                    "message" => "Usuario obtenido exitosamente",
                    "data" => $user
                ], 200);
            }
        } catch (Exception $e) {
            return response()->json([
                "status" => 500,
                "message" => "Ha ocurrido un error",
                "messageLog" => $e->getMessage(),
            ], 500);
        }
    }
        /**
     * Store a newly created resource in storage.
     */
    public function save(Request $request)
    {
        try{
            $conductor = new User();
            $conductor->name = $request->name;
            $conductor->lastName = $request->lastName;
            $conductor->typeDocument = $request->typeDocument;
            $conductor->numberDocument = $request->numberDocument;
            $conductor->mail = $request->mail;
            $conductor->password = hash('sha256', $request->password);
            $conductor->state = $request->state;
            $conductor->rol = $request->rol;
            
            $conductor->save();
            
            return response()->json([
                "status" => 200,
                "message" => "Se almaceno correctamente", 
                "code" => 1
            ],200);
        }catch(Exception $e){
            return response()->json([
                "status" => 500,
                "message" => "Ha ocurrido un error",
                "messageLog" => $e->getMessage(),
            ],500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateUser(Request $request, string $id)
    {
        try{

            $response = User::where('numberDocument', '=',$id)->update([
                'name' => $request->name,
                'lastName' => $request->lastName,
                'typeDocument' => $request->typeDocument,
                'mail' => $request->mail,
                'state' => $request->state,
                'rol' => $request->rol
            ]);
            if($response === 1){
                return response()->json([
                    "status" => 200,
                    "message" => "Se actualizo correctamente", 
                    "code" => 1
                ],200);
            }
        }catch(Exception $e){
            return response()->json([
                "status" => 500,
                "message" => "Ha ocurrido un error",
                "messageLog" => $e->getMessage(),
            ],500);
        }
    }
    /**
     * Update the specified resource in storage.
     */
    public function updateLogin(Request $request, string $id)
    {
        try{

            $response = User::where('numberDocument', '=',$id)->update([
                'mail' => $request->mail,
                'password' => hash('sha256', $request->password),
            ]);
            if($response === 1){
                return response()->json([
                    "status" => 200,
                    "message" => "Se actualizo correctamente", 
                    "code" => 1
                ],200);
            }
        }catch(Exception $e){
            return response()->json([
                "status" => 500,
                "message" => "Ha ocurrido un error",
                "messageLog" => $e->getMessage(),
            ],500);
        }
    }
}
