<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('employee_id')
                ->unique()
                ->nullable()
                ->after('id');

            $table->foreignId('role_id')
                ->nullable()
                ->after('employee_id');

            $table->foreign('employee_id')
                ->references('id')
                ->on('employees');

            $table->foreign('role_id')
                ->references('id')
                ->on('roles');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['employee_id']);
            $table->dropForeign(['role_id']);
            $table->dropColumn(['employee_id', 'role_id']);
        });
    }
};