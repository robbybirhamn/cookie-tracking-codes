<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\StoreTrackingCodeRequest;
use App\Http\Requests\Settings\UpdateTrackingCodeRequest;
use App\Models\TrackingCode;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TrackingCodeController extends Controller
{
    /**
     * Display a listing of the tracking codes.
     */
    public function index(#[CurrentUser] \App\Models\User $user, Request $request): Response
    {
        $query = $user->trackingCodes()->latest();

        // Search/filter by name
        if ($request->has('search') && $request->string('search')->isNotEmpty()) {
            $search = $request->string('search')->toString();
            $query->where('name', 'like', "%{$search}%");
        }

        $trackingCodes = $query->get()->map(function ($trackingCode) {
            return [
                'id' => $trackingCode->id,
                'name' => $trackingCode->name,
                'script_content' => $trackingCode->script_content,
                'created_at' => $trackingCode->created_at->format('M j, Y'),
                'updated_at' => $trackingCode->updated_at->format('M j, Y'),
            ];
        });

        return Inertia::render('settings/tracking-codes/index', [
            'trackingCodes' => $trackingCodes,
            'filters' => [
                'search' => $request->string('search')->toString(),
            ],
        ]);
    }

    /**
     * Show the form for creating a new tracking code.
     */
    public function create(): Response
    {
        return Inertia::render('settings/tracking-codes/create');
    }

    /**
     * Store a newly created tracking code.
     */
    public function store(
        StoreTrackingCodeRequest $request,
        #[CurrentUser] \App\Models\User $user
    ): RedirectResponse {
        $user->trackingCodes()->create($request->validated());

        return redirect()->route('settings.tracking-codes.index')
            ->with('success', 'Tracking code created successfully.');
    }

    /**
     * Show the form for editing the specified tracking code.
     */
    public function edit(
        TrackingCode $trackingCode,
        #[CurrentUser] \App\Models\User $user
    ): Response {
        abort_unless($user->id === $trackingCode->user_id, 404);

        return Inertia::render('settings/tracking-codes/edit', [
            'trackingCode' => [
                'id' => $trackingCode->id,
                'name' => $trackingCode->name,
                'script_content' => $trackingCode->script_content,
            ],
        ]);
    }

    /**
     * Update the specified tracking code.
     */
    public function update(
        UpdateTrackingCodeRequest $request,
        TrackingCode $trackingCode,
        #[CurrentUser] \App\Models\User $user
    ): RedirectResponse {
        abort_unless($user->id === $trackingCode->user_id, 404);

        $trackingCode->update($request->validated());

        return redirect()->route('settings.tracking-codes.index')
            ->with('success', 'Tracking code updated successfully.');
    }

    /**
     * Remove the specified tracking code.
     */
    public function destroy(
        TrackingCode $trackingCode,
        #[CurrentUser] \App\Models\User $user
    ): RedirectResponse {
        abort_unless($user->id === $trackingCode->user_id, 404);

        $trackingCode->delete();

        return redirect()->route('settings.tracking-codes.index')
            ->with('success', 'Tracking code deleted successfully.');
    }
}
