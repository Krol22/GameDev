import { GameUIComponent } from './GameUIComponent';
import { ButtonComponent } from './Components/ButtonComponent';

export class UIManager {
    constructor() {
        customElements.define('game-ui', GameUIComponent);
        customElements.define('gameui-button', ButtonComponent);
    }
}