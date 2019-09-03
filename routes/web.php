<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('layouts.view');
});

if (config('app.env') === 'local') {
    Route::get('/generate', function () {
        file_put_contents(public_path('index.html'), view('layouts.generate'));

        return 'Done';
    });
}

//Auth::routes();

//Route::get('/home', 'HomeController@index')->name('home');
