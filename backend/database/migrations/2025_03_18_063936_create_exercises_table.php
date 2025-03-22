<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exercises', function (Blueprint $table) {
            $table->id('idExercice');
            $table->string('nom');
            $table->text('description');
            $table->string('image')->nullable();
            $table->string('urlVido')->nullable();
            $table->string('niveauDifficult');
            $table->string('partieCorps');
            $table->string('partieCorpsPic')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exercises');
    }
};