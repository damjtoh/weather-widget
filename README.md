# Weather widget

Weather widget written as a code challenge.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

1. Clone this repository

```sh
git clone
cd weather-widget
```

2. Install dependencies, for server and client.

```sh
npm install && cd client/ && npm install
```

3. Rename `.env.example` file to `.env`

4. Set up your OpenWeather API KEY as shown

```sh
OPENWEATHER_API_KEY=HERE_GOES_YOUR_API_KEY
```

5. Build and run the aplication.

```sh
npm run start
```

This command will transpile the nodejs app and make a production build of the react app and serve it on 8080 port.

6. Go to `http://localhost:8080`

## Running the tests

For testing the NodeJS app run the script

```sh
npm run test
```

For testing the React app run

```sh
npm run test-client
```

Check out others script at the root `package.json` file

## License

MIT
