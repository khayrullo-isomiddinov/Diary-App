<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\DiaryEntry;

class DiaryEntrySeeder extends Seeder
{
    public function run(): void
    {
        DiaryEntry::insert([
            [
                'title' => 'First one',
                'content' => 'Welcome to my diarryyyyy.',
                'date' => '2024-06-02',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'JS writer Mr Harry',
                'content' => 'I finally know Rest APIs',
                'date' => '2024-06-02',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'React pro ',
                'content' => 'Dear diary, this is my story of how I learned react xD',
                'date' => '2024-06-03',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
