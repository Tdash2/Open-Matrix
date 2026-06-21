using BiampMatrixController.Models;
using BiampMatrixController.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<TesiraService>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

var tesira =
    app.Services.GetRequiredService<TesiraService>();

await tesira.InitializeAsync();

app.MapGet("/api/matrix", () =>
{
    return Results.Ok(new
    {
        outputs = tesira.Outputs,
        inputs = tesira.Inputs
    });
});

app.MapGet(
    "/api/output/{output:int}",
    async (
        int output) =>
{
    return Results.Ok(
        await tesira.GetOutputStateAsync(output));
});

app.MapPost(
    "/api/crosspoint",
    async (
        CrosspointRequest request) =>
{
    await tesira.SetCrosspointAsync(
        request.Input,
        request.Output,
        request.Connected);

    return Results.Ok();
});
app.MapGet("/api/labels", () =>
{
    return Results.Ok(new
    {
        inputs = tesira.Inputs,
        outputs = tesira.Outputs
    });
});
app.MapPost(
    "/api/inputlabel",
    async (
        LabelRequest request) =>
    {
        await tesira.SetInputLabelAsync(
            request.Number,
            request.Name);

        return Results.Ok();
    });
app.MapPost(
    "/api/outputlabel",
    async (
        LabelRequest request) =>
    {
        await tesira.SetOutputLabelAsync(
            request.Number,
            request.Name);

        return Results.Ok();
    });

app.Run("http://0.0.0.0:5000");