# Icarus Interactive Map

[Icarus](https://surviveicarus.com) is a session-based PvE survival game for up to eight co-op players or solo.

For this game, there is a very good third-party interactive map web application called [Icarus Intel](https://icarusintel.com). However, instead of being very informative, this application loses the opportunity for a discovery experience by myself. In addition, the in-game features do not allow you to keep track on the map without using certain items.

Therefore, I created an interactive map where you can add your own records from zero.

## How to use and customize

Feel free to clone or customize this project.

If you want to add another map, provide map assets in `static/map/XXX` and add map data to `src/lib/data.ts`.

### Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## License

This project is open source and available under the MIT License. See the [LICENSE](LICENSE) file for details.
