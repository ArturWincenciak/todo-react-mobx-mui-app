using TodoApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

var todos = new List<Todo>
{
    new() { Id = 1, Title = "Buy milk", Done = false },
    new() { Id = 2, Title = "Buy eggs", Done = true },
    new() { Id = 3, Title = "Buy bread", Done = false }
};

app.MapGet("/todos", () => todos);

app.Run();