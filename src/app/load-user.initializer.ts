import { find } from 'rxjs/operators';
import { StateManager } from './state-manager';
import { loggedInKey } from './state-manager/auth.service';

export function loadEmployee(
  stateManager: StateManager
): () => Promise<boolean> {
  return () => {
    const loggedInUsername = localStorage.getItem(loggedInKey);
    if (!loggedInUsername) {
      return Promise.resolve(true);
    }
    return stateManager.auth
      .getAuthenticated()
      .pipe(find(Boolean))
      .toPromise();
  };
}
