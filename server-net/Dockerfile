FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# העתקת קבצי .csproj לפני ה־restore
COPY ShoppingApp.sln .
COPY ShoppingApp.Core/ShoppingApp.Core.csproj ShoppingApp.Core/
COPY ShoppingApp.Infrastructure/ShoppingApp.Infrastructure.csproj ShoppingApp.Infrastructure/
COPY ShoppingApp.API/ShoppingApp.API.csproj ShoppingApp.API/

RUN dotnet restore ShoppingApp.sln

# העתקת יתר הקבצים
COPY . .

WORKDIR /src/ShoppingApp.API
RUN dotnet publish -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .
EXPOSE 80
ENTRYPOINT ["dotnet", "ShoppingApp.API.dll"]
