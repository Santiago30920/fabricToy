<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Product;
use Exception;

class productController extends Controller
{
    public function index(){
        $user = Product::all();
        return response()->json([
            "status" => 200,
            "message" => "user-get succesfully",
            "data" => $user
        ],200);
    }
        /**
     * Store a newly created resource in storage.
     */
    public function save(Request $request)
    {
        try{
            $conductor = new Product();
            $conductor->name = $request->name;
            $conductor->quantity = $request->quantity;
            $conductor->price = $request->price;
            $conductor->state = $request->state;
            $conductor->img1 = $request->img1;
            $conductor->img2 = $request->img2;
            $conductor->img3 = $request->img3;
            $conductor->pdf = $request->pdf;
            $conductor->description = $request->description;
            
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
    public function updateProduct(Request $request, string $id)
    {
        try{

            $response = Product::where('id', '=',$id)->update([
                'name' => $request->name,
                'quantity' => $request->quantity,
                'price' => $request->price,
                'state' => $request->state,
                'img1' => $request->img1,
                'img2' => $request->img2,
                'img3' => $request->img3,
                'pdf' => $request->pdf,
                'description' => $request->description,
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
    public function updateQuantity(Request $request, string $id)
    {
        try{
            $validate = Product::where("id", "=",$id)->get()->first();
            echo($request->quantity);
            $newQuantity =  $validate->quantity - $request->quantity;
            if($newQuantity >= 0){
                $response = Product::where('id', '=',$id)->update([
                    'quantity' => $newQuantity,
                ]);
                return response()->json([
                    "status" => 200,
                    "message" => "Se actualizo correctamente", 
                    "code" => 1
                ],200);
            }else{
                $response = Product::where('id', '=',$id)->update([
                    'quantity' => 0,
                ]);
                return response()->json([
                    "status" => 205,
                    "message" => "El inventario se encuentra vacio, o no hay unidades suficientes para está venta", 
                    "code" => 1
                ],205);
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
