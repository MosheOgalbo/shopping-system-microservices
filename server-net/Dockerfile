FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# העתקת קבצי .csproj לפני ה־restore
COPY . .

RUN dotnet restore ShoppingApp.sln

# העתקת יתר הקבצים
COPY . .

WORKDIR /src/ShoppingApp.API

RUN dotnet publish -c Release -o /app/out

RUN apt-get update && apt-get install -y curl

FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

COPY --from=build /app/out .

EXPOSE 8080

ENTRYPOINT ["dotnet", "ShoppingApp.API.dll"]
