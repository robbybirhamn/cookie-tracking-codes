<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string $script_content
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property-read User $user
 */
class TrackingCode extends Model
{
    /** @use HasFactory<\Database\Factories\TrackingCodeFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'script_content',
    ];

    /**
     * Get the attributes that should be cast.
     */
    public function casts(): array
    {
        return [
            //
        ];
    }

    /**
     * Get the user that owns the tracking code.
     *
     * @phpstan-ignore-next-line
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
