using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using TodoApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors();

var todos = new List<Todo>
{
    new() { Id = 1, Title = "Buy milk", Done = false },
    new() { Id = 2, Title = "Buy eggs", Done = true },
    new() { Id = 3, Title = "Buy bread", Done = false }
};

app.MapGet("/api/todos", async () =>
{
    await Task.Delay(1500);
    return todos;
});

app.MapPost("/api/todos", async ([FromBody] Todo newTodo) =>
{
    await Task.Delay(1500);
    newTodo.Id = todos.Any() ? todos.Max(t => t.Id) + 1 : 1;
    todos.Add(newTodo);
    return Results.Ok(newTodo);
});

app.MapPatch("/api/todos/{id:int}/toggle", async (int id) =>
{
    await Task.Delay(1500);
    var todo = todos.FirstOrDefault(t => t.Id == id);
    if (todo is null)
        return Results.NotFound();
    
    todo.Done = !todo.Done;
    return Results.Ok(todo);
});

app.MapDelete("/api/todos/{id:int}", async (int id) =>
{
    await Task.Delay(1500);
    var todo = todos.FirstOrDefault(t => t.Id == id);
    if (todo is null)
        return Results.NotFound();

    todos.Remove(todo);
    return Results.NoContent();
});

app.Run();