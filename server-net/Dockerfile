FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ShoppingApp.Core/ShoppingApp.Core.csproj ShoppingApp.Core/
COPY ShoppingApp.Infrastructure/ShoppingApp.Infrastructure.csproj ShoppingApp.Infrastructure/
COPY ShoppingApp.API/ShoppingApp.API.csproj ShoppingApp.API/
RUN dotnet restore ShoppingApp.API/ShoppingApp.API.csproj

COPY . .
RUN dotnet publish ShoppingApp.API/ShoppingApp.API.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "ShoppingApp.API.dll"]
