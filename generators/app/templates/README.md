# <%= appName %>

> Project generated with generator-remix

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deploy

### Automatic

If you fork this repo the application and database will automatically deploy on [Fly.io](https://fly.io) through the [deploy workflow](/.github/workflows/deploy.yml) once `FLY_API_TOKEN` secret is set.

### Manual

#### Fly Setup

1. [Install `flyctl`](https://fly.io/docs/getting-started/installing-flyctl/)

2. Sign up and log in to Fly

```sh
flyctl auth signup
```

3. Setup Fly. It might ask if you want to deploy, say no since you haven't built the app yet.

```sh
flyctl launch
```

#### Deployment

If you've followed the setup instructions already, all you need to do is run this:

```sh
npm run deploy
```

You can run `flyctl info` to get the url and ip address of your server.

Check out the [fly docs](https://fly.io/docs/getting-started/node/) for more information.
