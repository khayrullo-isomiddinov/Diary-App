<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DiaryEntry>
 */
class DiaryEntryFactory extends Factory
{
    /**
     * The name of the factory’s corresponding model.
     *
     * @var string
     */
    protected $model = \App\Models\DiaryEntry::class;

    /**
     * Define the model’s default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // A “slug‐like” random title, e.g. “Wistful Musings” or “Tech Ramble”
            'title'   => ucfirst($this->faker->words(2, true)),

            // 2–4 paragraphs of lorem‐ipsum text as content
            'content' => $this->faker->paragraphs(rand(2, 4), true),

            // Any date within the last 3 months
            'date'    => $this->faker
                              ->dateTimeBetween('-3 months', 'now')
                              ->format('Y-m-d'),
        ];
    }
}
