/**
 * Actualiza README.md con la URL de GitHub Pages (base + nombre del repo).
 * Se invoca desde `npm run serve`.
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const README_PATH = path.join(ROOT, 'README.md')

const GH_PAGES_BASE = 'https://ecoredsena-santander.github.io/'
const MARKER_START = '<!-- GH_PAGES_LINK_START -->'
const MARKER_END = '<!-- GH_PAGES_LINK_END -->'

function repoSlugFromGitOrigin() {
  try {
    const url = execSync('git remote get-url origin', {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim()
    const match = url.match(/(?:[/:])([^/]+?)(?:\.git)?$/i)
    return match ? match[1] : null
  } catch {
    return null
  }
}

function repoSlugFallback() {
  return path.basename(ROOT)
}

function buildBlock(slug) {
  const url = `${GH_PAGES_BASE}${slug}/`
  return [
    MARKER_START,
    '',
    'Tras publicar en **GitHub Pages**, la URL de referencia suele ser:',
    '',
    `- [${url}](${url})`,
    '',
    '*(Este bloque se actualiza al ejecutar `npm run serve`; el nombre del repo se toma del `origin` de Git o, si no hay remoto, del nombre de la carpeta del proyecto.)*',
    '',
    MARKER_END,
  ].join('\n')
}

function syncReadme() {
  const slug = repoSlugFromGitOrigin() ?? repoSlugFallback()
  const block = buildBlock(slug)

  let raw = fs.readFileSync(README_PATH, 'utf8')

  if (raw.includes(MARKER_START) && raw.includes(MARKER_END)) {
    const re = new RegExp(
      `${MARKER_START}[\\s\\S]*?${MARKER_END}`,
      'm',
    )
    raw = raw.replace(re, block)
  } else {
    raw += `\n\n${block}\n`
  }

  fs.writeFileSync(README_PATH, raw, 'utf8')
  console.info(`[sync-readme-github-pages-link] README actualizado → ${GH_PAGES_BASE}${slug}/`)
}

syncReadme()
