<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('resident')->after('password');
            $table->foreignId('barangay_id')->nullable()->after('role')->constrained()->nullOnDelete();
            $table->string('address')->nullable()->after('barangay_id');
            $table->string('avatar')->nullable()->after('address');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['barangay_id']);
            $table->dropColumn(['role', 'barangay_id', 'address', 'avatar']);
        });
    }
};
