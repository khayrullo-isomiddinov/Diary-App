<?php

namespace App\Http\Controllers;

use App\Models\DiaryEntry;
use Illuminate\Http\Request;

class DiaryEntryController extends Controller
{
    public function index()
    {
        return DiaryEntry::orderBy('date', 'desc')->get();
    }

    public function show($id)
    {
        return DiaryEntry::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'date' => 'required|date',
        ]);

        return DiaryEntry::create($validated);
    }

    public function update(Request $request, $id)
    {
        $entry = DiaryEntry::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'date' => 'required|date',
        ]);

        $entry->update($validated);
        return $entry;
    }

    public function destroy($id)
    {
        $entry = DiaryEntry::findOrFail($id);
        $entry->delete();

        return response()->noContent();
    }
}
