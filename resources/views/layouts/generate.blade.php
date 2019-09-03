@extends('layouts.app')

@section('styles')
    <style>
        {!! file_get_contents(public_path('css/app.css')) !!}
    </style>
@endsection

@section('scripts')
    <script>
        {!! file_get_contents(public_path('js/app.js')) !!}
    </script>
@endsection
