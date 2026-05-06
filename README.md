
## Requisitos mínimos

- **Node.js**: `>= 20` (según `package.json`)
- **npm**: recomendado (el repo incluye `package-lock.json`)

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

Inicia el servidor de desarrollo con recarga en caliente:

```bash
npm run serve
```

Por defecto Vite suele levantar en `http://localhost:5173` (si el puerto está ocupado, usará otro y lo mostrará en consola).



## Lint

Ejecuta ESLint sobre el proyecto:

```bash
npm run lint
```

## Empaquetar material (ZIP)

Si necesitas generar el paquete comprimido (usa `scripts/build-material-zip.mjs`):

```bash
npm run zip
```


## Tip: usar NVM (manejar múltiples versiones de Node)

Este proyecto requiere **Node.js `>= 20`**. Si en tu máquina usas varias versiones de Node, NVM te facilita cambiar entre ellas.

### macOS / Linux (nvm)

#### Instalar `nvm`

- **Opción A (recomendada, script oficial)**: ver repositorio `nvm-sh/nvm` (sección *Install & Update Script*).
- **Opción B (Homebrew en macOS)**:

```bash
brew install nvm
mkdir -p ~/.nvm
```

Luego configura tu shell para que cargue `nvm` (instrucciones en `brew info nvm`).

#### Usar Node 20 (ejemplo)

```bash
nvm install 20
nvm use 20
node -v
```

### Windows (nvm-windows)

En Windows se usa normalmente **nvm-windows** (no es el mismo `nvm` de macOS/Linux).

#### Instalar `nvm-windows`

1) Descarga e instala el instalador `.exe` desde los releases de `coreybutler/nvm-windows`.
2) Cierra y vuelve a abrir la terminal.

#### Usar Node 20 (ejemplo)

```powershell
nvm install 20
nvm use 20
node -v
```
