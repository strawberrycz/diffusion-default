import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';

import chokidar from 'chokidar';
import { exec } from 'child_process';

const IRFAN_PATH = 'C:\\Program Files\\IrfanView\\i_view64.exe';
const FOTOS_DIR = 'G:\\My Drive\\txt2img-images';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute()]);

app.listen();
// initializeWatcher();

function initializeWatcher() {
  // Initialize watcher.
  const watcher = chokidar.watch(FOTOS_DIR, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
  });

  // Add event listeners.
  watcher.on('add', path => runIrfan(path));
}

function runIrfan(path: string) {
  console.log(`File ${path} has been added`);
  exec(`."${IRFAN_PATH}" ${path} /one /fs`, { shell: 'powershell.exe' });
}
