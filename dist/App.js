"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
require("./App.css");
const react_redux_1 = require("react-redux");
const userSlice_1 = require("./features/userSlice");
const Messenger_1 = require("./screens/MessengerScreen/Messenger");
const settingsSlice_1 = require("./features/settingsSlice");
const SettingsScreen_1 = require("./screens/SettingsScreen/SettingsScreen");
const react_redux_2 = require("react-redux");
const react_1 = require("react");
const choosedThreadSlice_1 = require("./features/choosedThreadSlice");
const LoginScreen_1 = require("./screens/LoginScreen/LoginScreen");
const react_2 = __importDefault(require("react"));
const App = () => {
    const user = (0, react_redux_1.useSelector)(userSlice_1.selectUser);
    const settings = (0, react_redux_1.useSelector)(settingsSlice_1.selectSettings);
    const dispatch = (0, react_redux_2.useDispatch)();
    (0, react_1.useEffect)(() => {
        try {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                const user = JSON.parse(savedUser);
                dispatch((0, userSlice_1.setUser)(user));
            }
        }
        catch (error) {
            console.log('[NO USERS IN LOCAL STORAGE]');
        }
        dispatch((0, choosedThreadSlice_1.removeChoosedThread)(null));
    }, []);
    return (react_2.default.createElement("div", { className: 'App' }, user.user ? (settings.settings ? (react_2.default.createElement(SettingsScreen_1.SettingsScreen, null)) : (react_2.default.createElement(Messenger_1.Messenger, null))) : (react_2.default.createElement(LoginScreen_1.LoginScreen, null))));
};
exports.App = App;
//# sourceMappingURL=App.js.map