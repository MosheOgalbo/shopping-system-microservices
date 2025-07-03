# Use the official .NET 8.0 SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution file and project files
COPY *.sln ./
COPY ShoppingApp.API/*.csproj ./ShoppingApp.API/
COPY ShoppingApp.Core/*.csproj ./ShoppingApp.Core/
COPY ShoppingApp.Infrastructure/*.csproj ./ShoppingApp.Infrastructure/

# Restore dependencies
RUN dotnet restore

# Copy the rest of the source code
COPY . .

# Build the application
WORKDIR /src/ShoppingApp.API
RUN dotnet build -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

# Final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=publish /app/publish .

# Expose port 8080 (internal container port)
EXPOSE 8080

# Set environment variables
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "ShoppingApp.API.dll"]
