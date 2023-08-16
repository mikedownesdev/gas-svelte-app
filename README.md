# About

This is a proof-of-concept project to create a template for new web
applications that run on Google Apps Script. It uses...

- [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) for the front end
- [DaisyUI] / [TailwindCSS] for components & styling
- [Google Apps Script] for the back end
- [JSDoc] type definitions
- [Vite] for the build process

Whereas a "boilerplate" may produce the bare minimum to get a new web app off
the ground, this project provides a few extra opinions, UI elements, type definitions, etc that I would consider useful for most applications, rather than just an app skeleton.

# How to Use

# Other Notable Dependncies

- [clasp]
- [clasp.env]

# Features


# Critical Decisions

```
"timeZone": "America/New_York"
```
```
"webapp": {
    "executeAs": "USER_DEPLOYING" vs "executeAs": "USER_ACCESSING",
    "access": "ANYONE" vs "access": "ANYONE_ANONYMOUS"
}
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)

## Technical considerations

**Why use this over SvelteKit?**

- It brings its own routing solution which might not be preferable for some users.
- It is first and foremost a framework that just happens to use Vite under the hood, not a Vite app.

This template contains as little as possible to get started with Vite + Svelte, while taking into account the developer experience with regards to HMR and intellisense. It demonstrates capabilities on par with the other `create-vite` templates and is a good starting point for beginners dipping their toes into a Vite + Svelte project.

Should you later need the extended capabilities and extensibility provided by SvelteKit, the template has been structured similarly to SvelteKit so that it is easy to migrate.

**Why `global.d.ts` instead of `compilerOptions.types` inside `jsconfig.json` or `tsconfig.json`?**

Setting `compilerOptions.types` shuts out all other types not explicitly listed in the configuration. Using triple-slash references keeps the default TypeScript setting of accepting type information from the entire workspace, while also adding `svelte` and `vite/client` type information.

**Why include `.vscode/extensions.json`?**

Other templates indirectly recommend extensions via the README, but this file allows VS Code to prompt the user to install the recommended extension upon opening the project.

**Why enable `checkJs` in the JS template?**

It is likely that most cases of changing variable types in runtime are likely to be accidental, rather than deliberate. This provides advanced typechecking out of the box. Should you like to take advantage of the dynamically-typed nature of JavaScript, it is trivial to change the configuration.

**Why is HMR not preserving my local component state?**

HMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/sveltejs/svelte-hmr/tree/master/packages/svelte-hmr#preservation-of-local-state).

If you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.

```js
// store.js
// An extremely simple external store
import { writable } from 'svelte/store'
export default writable(0)
```
