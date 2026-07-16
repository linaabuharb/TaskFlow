<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return Task::latest()->get();
    }

    public function store(Request $request)
    {
        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'completed' => false,
            'category' => $request->category ?? 'General',
            'priority' => $request->priority ?? 'Medium',
            'due_date' => $request->due_date,
        ]);

        return response()->json($task, 201);
    }

  public function update(Request $request, Task $task)
{
    $task->update([
        'title' => $request->title,
        'description' => $request->description,
        'completed' => $request->boolean('completed'),
        'category' => $request->category ?? 'General',
        'priority' => $request->priority ?? 'Medium',
        'due_date' => $request->due_date,
    ]);

    return response()->json($task->fresh());
}

    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json(['message' => 'Task deleted']);
    }
}